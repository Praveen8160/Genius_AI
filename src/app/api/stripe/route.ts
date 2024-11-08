// import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";
import { absoluturl } from "@/lib/utils";
import prismadb from "@/lib/prismadb";
import { getAuth, currentUser } from "@clerk/nextjs/server";
const settingUrl = absoluturl("/settings");

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = getAuth(req);
    const user = await currentUser();
    if (!userId || !user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId },
    });
    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingUrl,
      });
      return res.status(200).json({ message: stripeSession.url });
    }
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingUrl,
      cancel_url: settingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Genius AI",
              description: "Unlimited AI Generation",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });
    return res.status(200).json({ message: stripeSession.url });
  } catch (error) {
    console.error("Error with Stripe request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
