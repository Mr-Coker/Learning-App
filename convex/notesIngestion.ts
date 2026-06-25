import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getNotesBySubject = query({
  args: {
    subjectId: v.id("subjects"),
  },
  handler: async (ctx, args) => {
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_subjectId", (q) => q.eq("subjectId", args.subjectId))
      .collect();
    return notes;
  },
});

export const getNoteById = query({
  args: {
    noteId: v.id("notes"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.noteId);
  },
});

export const getNoteDetails = query({
  args: {
    noteId: v.id("notes"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.noteId);
  },
});

export const registerNoteMetadata = mutation({
  args: {
    title: v.string(),
    classLevel: v.string(),
    subjectId: v.id("subjects"),
    staticLookupKey: v.string(),
  },
  handler: async (ctx, args) => {
    const noteId = await ctx.db.insert("notes", {
      title: args.title,
      classLevel: args.classLevel,
      subjectId: args.subjectId,
      staticLookupKey: args.staticLookupKey,
    });
    return noteId;
  },
});
