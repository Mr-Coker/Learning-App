import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const saveIngestedNote = mutation({
  args: {
    title: v.string(),
    classLevel: v.string(),
    subjectId: v.id("subjects"),
    summaryBadge: v.string(),
    contentBlocks: v.array(
      v.object({
        type: v.union(v.literal("text"), v.literal("challenge_callout"), v.literal("bullet_list")),
        heading: v.optional(v.string()),
        body: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const noteId = await ctx.db.insert("notes", {
      title: args.title,
      classLevel: args.classLevel,
      subjectId: args.subjectId,
      summaryBadge: args.summaryBadge,
      contentBlocks: args.contentBlocks,
      createdAt: Date.now(),
    });
    return noteId;
  },
});

export const ingestNoteText = action({
  args: {
    title: v.string(),
    classLevel: v.string(),
    subjectId: v.id("subjects"),
    rawText: v.string(),
  },
  handler: async (ctx, args) => {
    // Artificial delay to simulate heavy AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simple yet robust parsing algorithm that translates markdown/text into structured blocks
    const lines = args.rawText.split("\n");
    const contentBlocks: Array<{
      type: "text" | "challenge_callout" | "bullet_list";
      heading?: string;
      body: string;
    }> = [];

    let currentHeading = "";
    let currentBulletPoints: string[] = [];
    let currentTextLines: string[] = [];

    const flushText = () => {
      if (currentTextLines.length > 0) {
        contentBlocks.push({
          type: "text",
          heading: currentHeading || undefined,
          body: currentTextLines.join(" ").trim(),
        });
        currentTextLines = [];
        currentHeading = "";
      }
    };

    const flushBullets = () => {
      if (currentBulletPoints.length > 0) {
        contentBlocks.push({
          type: "bullet_list",
          heading: currentHeading || undefined,
          body: currentBulletPoints.join("\n").trim(),
        });
        currentBulletPoints = [];
        currentHeading = "";
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Handle Headings (e.g., "# Heading" or "## Heading")
      if (line.startsWith("#")) {
        flushText();
        flushBullets();
        currentHeading = line.replace(/^#+\s*/, "");
        continue;
      }

      // Handle Challenge Callouts (e.g., "Exam Hint:" or "[CHALLENGE]")
      if (line.toLowerCase().startsWith("challenge:") || line.toLowerCase().startsWith("exam hint:") || line.toLowerCase().startsWith("[challenge]")) {
        flushText();
        flushBullets();
        contentBlocks.push({
          type: "challenge_callout",
          heading: "EXAM CHALLENGE ALERT",
          body: line.replace(/^(challenge:|exam hint:|\[challenge\])\s*/i, ""),
        });
        continue;
      }

      // Handle Bullet Points
      if (line.startsWith("-") || line.startsWith("*") || line.startsWith("•")) {
        flushText();
        currentBulletPoints.push(line.replace(/^[-*•]\s*/, ""));
        continue;
      }

      // Regular text block accumulation
      flushBullets();
      currentTextLines.push(line);
    }

    // Flush any remaining
    flushText();
    flushBullets();

    // Fallback if no structured blocks were parsed
    if (contentBlocks.length === 0) {
      contentBlocks.push({
        type: "text",
        heading: "Lesson Overview",
        body: args.rawText || "No content extracted.",
      });
    }

    // Create a dynamic summary badge
    const summaryBadge = `REVISION NOTE // ${args.classLevel.toUpperCase()}`;

    // Call the internal mutation to write the note to database
    const noteId = await ctx.runMutation(api.notesIngestion.saveIngestedNote, {
      title: args.title,
      classLevel: args.classLevel,
      subjectId: args.subjectId,
      summaryBadge,
      contentBlocks,
    });

    return noteId;
  },
});

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

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveNoteMetadata = mutation({
  args: {
    title: v.string(),
    classLevel: v.string(),
    subjectId: v.id("subjects"),
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const summaryBadge = `PDF NOTE // ${args.classLevel.toUpperCase()}`;
    const noteId = await ctx.db.insert("notes", {
      title: args.title,
      classLevel: args.classLevel,
      subjectId: args.subjectId,
      summaryBadge,
      fileStorageId: args.storageId,
      createdAt: Date.now(),
    });
    return noteId;
  },
});

export const getNoteFileUrl = query({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
