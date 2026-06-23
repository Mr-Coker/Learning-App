import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const registerUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (existing !== null) {
      throw new Error("Email already registered");
    }

    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      passwordHash: args.password,
      role: args.role,
      createdAt: Date.now(),
    });
    return userId;
  },
});
