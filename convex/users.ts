import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const registerUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    role: v.string(),
    classLevel: v.optional(v.string()),
    focusSubjects: v.optional(v.array(v.string())),
    specialtyDesignation: v.optional(v.string()),
    teachingSubjects: v.optional(v.array(v.string())),
    activeCurriculumTracks: v.optional(v.array(v.string())),
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
      classLevel: args.classLevel,
      focusSubjects: args.focusSubjects,
      specialtyDesignation: args.specialtyDesignation,
      teachingSubjects: args.teachingSubjects,
      activeCurriculumTracks: args.activeCurriculumTracks,
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
      currentSessionToken: user.currentSessionToken,
    };
  },
});

export const getMe = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.trim().toLowerCase()))
      .unique();
  },
});

export const createNewSession = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.trim().toLowerCase()))
      .unique();
    if (!user) {
      throw new Error("User not found");
    }
    if (user.passwordHash !== args.password) {
      throw new Error("Invalid password credentials");
    }
    const sessionToken = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    await ctx.db.patch(user._id, {
      currentSessionToken: sessionToken
    });
    return { sessionToken };
  },
});

export const awardQuestXp = mutation({
  args: {
    email: v.string(),
    xp: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.trim().toLowerCase()))
      .unique();
    if (!user) {
      throw new Error("User not found");
    }
    const newXp = (user.xp || 0) + args.xp;
    await ctx.db.patch(user._id, {
      xp: newXp,
    });
    
    // Log the activity to record progress
    await ctx.db.insert("activityLogs", {
      type: "QUEST_COMPLETED",
      message: `Earned +${args.xp} XP from Quest Quiz`,
      userId: user._id,
      createdAt: Date.now(),
    });

    return newXp;
  },
});
