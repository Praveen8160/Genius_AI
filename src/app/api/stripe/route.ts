import { NextResponse,NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { absoluturl } from "@/lib/utils";
import prismadb from "../../../lib/prismadb";
import { getAuth, currentUser } from "@clerk/nextjs/server";

const settingUrl = absoluturl("/settings");

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    const user = await currentUser();
    console.log("userid", userId);

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingUrl,
      });
      return NextResponse.json({ url: stripeSession.url });
    }

    console.log("subs start");
    console.log("userSubscription", userSubscription);
    console.log("sub end");

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

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Error with Stripe request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
