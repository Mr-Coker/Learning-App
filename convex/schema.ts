import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    passwordHash: v.string(),
    role: v.union(
      v.literal("student"),
      v.literal("teacher"),
      v.literal("admin"),
      v.literal("LEARNER"),
      v.literal("TRANSMITTER")
    ),
    classId: v.optional(v.string()),
    xp: v.number(),
    createdAt: v.number(),
    classLevel: v.optional(v.string()),
    focusSubjects: v.optional(v.array(v.string())),
    specialtyDesignation: v.optional(v.string()),
    teachingSubjects: v.optional(v.array(v.string())),
    activeCurriculumTracks: v.optional(v.array(v.string())),
  }).index("by_email", ["email"]),

  subjects: defineTable({
    name: v.string(),
    code: v.string(),
    teacherId: v.id("users"),
  }).index("by_teacherId", ["teacherId"]),

  quests: defineTable({
    title: v.string(),
    description: v.string(),
    subjectId: v.id("subjects"),
    xpReward: v.number(),
    dueDate: v.string(),
  }).index("by_subjectId", ["subjectId"]),

  questSubmissions: defineTable({
    questId: v.id("quests"),
    studentId: v.id("users"),
    status: v.union(v.literal("pending"), v.literal("completed")),
    submittedAt: v.number(),
  })
    .index("by_questId", ["questId"])
    .index("by_studentId", ["studentId"]),

  messages: defineTable({
    senderId: v.id("users"),
    receiverId: v.id("users"),
    subjectId: v.optional(v.id("subjects")),
    content: v.string(),
    type: v.union(v.literal("teacher_student"), v.literal("admin_teacher")),
    createdAt: v.number(),
  })
    .index("by_senderId", ["senderId"])
    .index("by_receiverId", ["receiverId"])
    .index("by_subjectId", ["subjectId"]),

  financialMetrics: defineTable({
    amount: v.number(),
    paymentStatus: v.union(v.literal("success"), v.literal("failed")),
    studentId: v.id("users"),
    timestamp: v.number(),
  }).index("by_studentId", ["studentId"]),

  activityLogs: defineTable({
    type: v.string(),
    message: v.string(),
    userId: v.string(),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),

  notes: defineTable({
    title: v.string(),
    classLevel: v.string(),
    subjectId: v.id("subjects"),
    summaryBadge: v.string(),
    contentBlocks: v.array(
      v.object({
        type: v.union(v.literal("text"), v.literal("challenge_callout"), v.literal("bullet_point")),
        heading: v.optional(v.string()),
        body: v.string(),
      })
    ),
    chapterNumber: v.optional(v.number()),
    fileStorageId: v.optional(v.string()),
    subTopicIndex: v.optional(v.number()),
    subTopicTitle: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_subjectId", ["subjectId"]),
});
