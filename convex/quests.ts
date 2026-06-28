import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAssignedQuest = query({
  args: {
    subjectId: v.id("subjects"),
    classLevel: v.string(),
  },
  handler: async (ctx, args) => {
    // Query quests matching the subjectId
    const quest = await ctx.db
      .query("quests")
      .withIndex("by_subjectId", (q) => q.eq("subjectId", args.subjectId))
      .first();

    return quest;
  },
});
