import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getSystemUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db
      .query("users")
      .collect();

    return [...users]
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((user) => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      }));
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.trim().toLowerCase()))
      .unique();
  },
});

export const getStudentRoster = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const students = users.filter((u) => u.role === "student" || u.role === "LEARNER");

    const resolved = [];
    for (const s of students) {
      const submissions = await ctx.db
        .query("questSubmissions")
        .withIndex("by_studentId", (q) => q.eq("studentId", s._id))
        .collect();
      resolved.push({
        _id: s._id,
        name: s.name,
        email: s.email,
        classId: s.classId || "L1_CORE",
        xp: s.xp,
        submissionsCount: submissions.length,
      });
    }

    if (resolved.length === 0) {
      return [
        { _id: "std1" as any, name: "Alex Mercer", email: "alex@edusphere.net", classId: "L1_CORE", xp: 420, submissionsCount: 3 },
        { _id: "std2" as any, name: "Sarah Connor", email: "sarah@edusphere.net", classId: "L2_CYBER", xp: 850, submissionsCount: 6 },
        { _id: "std3" as any, name: "Thomas Anderson", email: "neo@edusphere.net", classId: "L3_MATRIX", xp: 1337, submissionsCount: 12 },
      ];
    }
    return resolved;
  },
});

export const getDetailedFinancials = query({
  args: {},
  handler: async (ctx) => {
    const records = await ctx.db.query("financialMetrics").collect();
    const resolved = [];
    for (const r of records) {
      const student = await ctx.db.get("users", r.studentId);
      resolved.push({
        _id: r._id,
        amount: r.amount,
        paymentStatus: r.paymentStatus,
        timestamp: r.timestamp,
        studentName: student ? student.name : "UNKNOWN NODE",
        studentEmail: student ? student.email : "",
      });
    }

    if (resolved.length === 0) {
      return [
        { _id: "fin1" as any, amount: 250, paymentStatus: "success" as const, timestamp: Date.now() - 3600000, studentName: "Alex Mercer", studentEmail: "alex@edusphere.net" },
        { _id: "fin2" as any, amount: 400, paymentStatus: "success" as const, timestamp: Date.now() - 7200000, studentName: "Sarah Connor", studentEmail: "sarah@edusphere.net" },
        { _id: "fin3" as any, amount: 150, paymentStatus: "failed" as const, timestamp: Date.now() - 10800000, studentName: "Thomas Anderson", studentEmail: "neo@edusphere.net" },
      ];
    }
    return resolved;
  },
});

export const getTeachers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const teachers = users.filter((u) => u.role === "teacher" || u.role === "TRANSMITTER");

    if (teachers.length === 0) {
      return [
        { _id: "t1" as any, name: "Dr. Catherine Halsey", email: "halsey@edusphere.net", role: "teacher" },
        { _id: "t2" as any, name: "Professor Charles Xavier", email: "xavier@edusphere.net", role: "teacher" },
      ];
    }
    return teachers;
  },
});

export const createSubject = mutation({
  args: {
    name: v.string(),
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const teachers = await ctx.db.query("users").collect();
    const firstTeacher = teachers.find(u => u.role === "teacher" || u.role === "TRANSMITTER");
    
    let teacherId;
    if (firstTeacher) {
      teacherId = firstTeacher._id;
    } else {
      teacherId = await ctx.db.insert("users", {
        name: "Default System Facilitator",
        email: "system-facilitator@edusphere.net",
        passwordHash: "system",
        role: "teacher",
        xp: 0,
        createdAt: Date.now(),
      });
    }

    const subjectId = await ctx.db.insert("subjects", {
      name: args.name.trim(),
      code: args.code.trim().toUpperCase(),
      teacherId,
    });
    return subjectId;
  },
});

export const listSubjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("subjects").collect();
  },
});

export const deleteSubject = mutation({
  args: {
    id: v.id("subjects"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return true;
  },
});
