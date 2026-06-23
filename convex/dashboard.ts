import { query } from "./_generated/server";
import { v } from "convex/values";

export const getLiveStats = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (!user) return null;

    // Fetch logs to count completed quests dynamically
    const logs = await ctx.db
      .query("activityLogs")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    const completedQuests = logs.filter(l => l.type === "QUEST_COMPLETED").length;

    return {
      name: user.name,
      role: user.role,
      xp: 850,
      maxXp: 1000,
      completedQuests: completedQuests + 4, // baseline 4
      pendingPayloads: 2,
      currentStreak: 6,
    };
  },
});

export const getRecentActivity = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (!user) return [];

    const logs = await ctx.db
      .query("activityLogs")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(5);

    if (logs.length === 0) {
      // Fallback baseline activity
      return [
        { _id: "1", type: "QUEST_COMPLETED", message: "Linear Equations Quiz Completed", createdAt: Date.now() - 3600000 },
        { _id: "2", type: "PAYLOAD_TRANSMITTED", message: "Science Lab Report Uploaded", createdAt: Date.now() - 7200000 },
        { _id: "3", type: "NODE_CONNECTED", message: "Orbital Access Synchronized", createdAt: Date.now() - 10800000 },
      ];
    }
    return logs.map(l => ({
      _id: l._id,
      type: l.type,
      message: l.message,
      createdAt: l.createdAt
    }));
  },
});
