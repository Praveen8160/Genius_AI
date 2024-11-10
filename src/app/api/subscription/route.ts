import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
const DAY_IN_MS = 86_400_000;
export async function POST(req: Request) {
  const { userId } = await req.json();
  if (!userId) {
    return NextResponse.json({ isPro: false });
  }
  const userSub = await prismadb.userSubscription.findUnique({
    where: { userId },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeSubscriptionId: true,
      stripePriceId: true,
      stripeCustomerId: true,
    },
  });
  if (!userSub) {
    return NextResponse.json({ isPro: false });
  }
  const isvalid =
    userSub.stripePriceId &&
    userSub.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();
  return NextResponse.json({ isPro: !!isvalid });
}
