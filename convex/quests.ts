import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAssignedQuest = query({
  args: {
    subjectId: v.id("subjects"),
    classLevel: v.string(),
    staticLookupKey: v.string(),
  },
  handler: async (ctx, args) => {
    // Query quests matching the subjectId, classLevel, and staticLookupKey
    const quest = await ctx.db
      .query("quests")
      .withIndex("by_subjectId_classLevel_and_topic", (q) =>
        q.eq("subjectId", args.subjectId).eq("classLevel", args.classLevel).eq("staticLookupKey", args.staticLookupKey)
      )
      .first();

    return quest;
  },
});
