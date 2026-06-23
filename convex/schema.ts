import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    passwordHash: v.string(),
    role: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),
  activityLogs: defineTable({
    type: v.string(),
    message: v.string(),
    userId: v.string(),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
});
