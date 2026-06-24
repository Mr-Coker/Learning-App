import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const registerUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    const emailLower = args.email.trim().toLowerCase();
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", emailLower))
      .unique();
    if (existing !== null) {
      throw new Error("Email already registered");
    }

    let resolvedRole: "student" | "teacher" | "admin" = "student";
    const checkRole = args.role.toUpperCase();
    if (checkRole === "TRANSMITTER" || checkRole === "TEACHER") {
      resolvedRole = "teacher";
    } else if (checkRole === "ADMIN") {
      resolvedRole = "admin";
    } else {
      resolvedRole = "student";
    }

    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: emailLower,
      passwordHash: args.password,
      role: resolvedRole,
      xp: 0,
      createdAt: Date.now(),
    });
    return userId;
  },
});

export const getCurrentUserRole = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.trim().toLowerCase()))
      .unique();
    if (!user) return null;
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      classId: user.classId,
      xp: user.xp,
      createdAt: user.createdAt,
    };
  },
});
