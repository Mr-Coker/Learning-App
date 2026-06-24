import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = mutation({
  args: {
    senderId: v.id("users"),
    receiverId: v.id("users"),
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
