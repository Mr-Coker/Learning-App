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

export const listAllNotes = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("notes").collect();
  },
});

export const updateNote = mutation({
  args: {
    id: v.id("notes"),
    title: v.string(),
    classLevel: v.string(),
    subjectId: v.id("subjects"),
    staticLookupKey: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const attachVideoToNote = mutation({
  args: {
    noteId: v.id("notes"),
    videoUrl: v.string(),
    videoTitle: v.string(),
  },
  handler: async (ctx, args) => {
    let url = args.videoUrl.trim();
    if (url.includes("watch?v=")) {
      url = url.replace("watch?v=", "embed/");
    } else if (url.includes("youtu.be/")) {
      url = url.replace("youtu.be/", "youtube.com/embed/");
    }

    await ctx.db.patch(args.noteId, {
      videoUrl: url,
      videoTitle: args.videoTitle.trim(),
    });
    return args.noteId;
  },
});
