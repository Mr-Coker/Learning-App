"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import * as crypto from "crypto";

export const handlePaystackWebhook = action({
  args: {
    signature: v.string(),
    payload: v.string(),
  },
  handler: async (ctx, args) => {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      console.error("PAYSTACK_SECRET_KEY is not defined in the environment variables");
      return { status: 500, message: "Server configuration error" };
    }

    // Verify Paystack Signature
    const hash = crypto
      .createHmac("sha512", secret)
      .update(args.payload)
      .digest("hex");

    if (hash !== args.signature) {
      console.warn("Invalid Paystack webhook signature detected");
      return { status: 401, message: "Unauthorized signature" };
    }

    const eventData = JSON.parse(args.payload);
    if (eventData.event !== "charge.success") {
      console.log(`Ignoring non-success event: ${eventData.event}`);
      return { status: 200, message: "Event ignored" };
    }

    const metadata = eventData.data.metadata;
    if (!metadata || !metadata.userId || !metadata.planType) {
      console.error("Missing expected user metadata in webhook payload", metadata);
      return { status: 400, message: "Missing metadata" };
    }

    const amountInGhs = eventData.data.amount / 100; // Paystack is in lowest subunits (pesewas)

    try {
      await ctx.runMutation(internal.payments.extendUserAccess, {
        userId: metadata.userId,
        amount: amountInGhs,
        planType: metadata.planType,
      });
      return { status: 200, message: "Access successfully extended" };
    } catch (err: any) {
      console.error("Failed to run extendUserAccess mutation", err);
      return { status: 500, message: err.message || "Internal mutation error" };
    }
  },
});
