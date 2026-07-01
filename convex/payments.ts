import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const extendUserAccess = internalMutation({
  args: {
    userId: v.id("users"),
    amount: v.number(),
    planType: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get("users", args.userId);
    if (!user) {
      throw new Error(`User with ID ${args.userId} not found`);
    }

    const durationDays = args.planType === "weekly" ? 7 : 30;
    const currentExpiry = user.accessExpiresAt || Date.now();
    const newExpiry = Math.max(currentExpiry, Date.now()) + durationDays * 24 * 60 * 60 * 1000;

    // Update user access expiry
    await ctx.db.patch(args.userId, {
      accessExpiresAt: newExpiry,
    });

    // Record the payment metric
    await ctx.db.insert("financialMetrics", {
      amount: args.amount,
      paymentStatus: "success",
      studentId: args.userId,
      timestamp: Date.now(),
    });

    // Log the action
    await ctx.db.insert("activityLogs", {
      type: "PAYMENT_SUCCESS",
      message: `User extended access via ${args.planType} plan. New expiry: ${new Date(newExpiry).toISOString()}`,
      userId: args.userId,
      createdAt: Date.now(),
    });

    return { success: true, accessExpiresAt: newExpiry };
  },
});
