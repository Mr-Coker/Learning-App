import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = mutation({
  args: {
    senderId: v.id("users"),
    receiverId: v.id("users"),
    subjectId: v.optional(v.id("subjects")),
    content: v.string(),
    type: v.union(v.literal("teacher_student"), v.literal("admin_teacher")),
  },
  handler: async (ctx, args) => {
    const sender = await ctx.db.get("users", args.senderId);
    const receiver = await ctx.db.get("users", args.receiverId);

    if (!sender || !receiver) {
      throw new Error("Sender or receiver node not found in system directories.");
    }

    // Role-based communication constraint enforcement
    if (args.type === "teacher_student") {
      const hasTeacher = sender.role === "teacher" || receiver.role === "teacher" || sender.role === "TRANSMITTER" || receiver.role === "TRANSMITTER";
      const hasStudent = sender.role === "student" || receiver.role === "student" || sender.role === "LEARNER" || receiver.role === "LEARNER";
      if (!hasTeacher || !hasStudent) {
        throw new Error("COMMUNICATION BLOCKED: Room requires one TEACHER/TRANSMITTER and one STUDENT/LEARNER node.");
      }
    } else if (args.type === "admin_teacher") {
      const hasAdmin = sender.role === "admin" || receiver.role === "admin";
      const hasTeacher = sender.role === "teacher" || receiver.role === "teacher" || sender.role === "TRANSMITTER" || receiver.role === "TRANSMITTER";
      if (!hasAdmin || !hasTeacher) {
        throw new Error("COMMUNICATION BLOCKED: Room requires one ADMIN and one TEACHER/TRANSMITTER node.");
      }
    }

    const messageId = await ctx.db.insert("messages", {
      senderId: args.senderId,
      receiverId: args.receiverId,
      subjectId: args.subjectId,
      content: args.content.trim(),
      type: args.type,
      createdAt: Date.now(),
    });
    return messageId;
  },
});

export const getMessages = query({
  args: {
    user1Id: v.id("users"),
    user2Id: v.id("users"),
  },
  handler: async (ctx, args) => {
    const sent = await ctx.db
      .query("messages")
      .withIndex("by_senderId", (q) => q.eq("senderId", args.user1Id))
      .collect();

    const received = await ctx.db
      .query("messages")
      .withIndex("by_senderId", (q) => q.eq("senderId", args.user2Id))
      .collect();

    return [...sent, ...received]
      .filter((m) => m.receiverId === args.user1Id || m.receiverId === args.user2Id)
      .sort((a, b) => a.createdAt - b.createdAt);
  },
});

export const getAllSubjects = query({
  args: {},
  handler: async (ctx) => {
    const subjects = await ctx.db.query("subjects").collect();
    if (subjects.length === 0) {
      // Fallback/pre-populated subjects if database has none
      return [
        { _id: "subj1" as any, name: "Computational Mathematics", code: "MATH01", teacherId: "t1" as any },
        { _id: "subj2" as any, name: "Quantum Mechanics", code: "PHYS02", teacherId: "t2" as any },
        { _id: "subj3" as any, name: "Advanced Cybernetics", code: "CYBER03", teacherId: "t1" as any },
      ];
    }
    return subjects;
  },
});

export const getSubjectMessages = query({
  args: {
    subjectId: v.id("subjects"),
    studentId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_subjectId", (q) => q.eq("subjectId", args.subjectId))
      .collect();

    return messages
      .filter((m) => m.senderId === args.studentId || m.receiverId === args.studentId)
      .sort((a, b) => a.createdAt - b.createdAt);
  },
});

export const getSubjectThreads = query({
  args: {
    subjectId: v.id("subjects"),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_subjectId", (q) => q.eq("subjectId", args.subjectId))
      .collect();

    const studentIds = new Set<string>();
    for (const m of messages) {
      const sender = await ctx.db.get("users", m.senderId);
      const receiver = await ctx.db.get("users", m.receiverId);
      if (sender && (sender.role === "student" || sender.role === "LEARNER")) {
        studentIds.add(m.senderId);
      }
      if (receiver && (receiver.role === "student" || receiver.role === "LEARNER")) {
        studentIds.add(m.receiverId);
      }
    }

    const students = [];
    for (const id of studentIds) {
      const student = await ctx.db.get("users", id as any);
      if (student) {
        const studentMsgs = messages.filter(m => m.senderId === student._id || m.receiverId === student._id);
        const lastMsg = studentMsgs[studentMsgs.length - 1];
        students.push({
          _id: student._id,
          name: student.name,
          email: student.email,
          lastMessage: lastMsg ? lastMsg.content : "",
          lastMessageTime: lastMsg ? lastMsg.createdAt : 0,
        });
      }
    }
    return students.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
  },
});
