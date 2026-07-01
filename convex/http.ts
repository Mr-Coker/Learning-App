import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/paystack-webhook",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const signature = req.headers.get("x-paystack-signature") || "";
    const payload = await req.text();

    try {
      const response = await ctx.runAction(api.paymentsAction.handlePaystackWebhook, {
        signature,
        payload,
      });

      return new Response(JSON.stringify({ message: response.message }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      console.error("Error executing Paystack webhook action:", err);
      return new Response(
        JSON.stringify({ error: err.message || "Internal Server Error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),
});

export default http;
