import prismadb from "@/lib/prismadb";
const DAY_IN_MS = 86_400_000;
export async function subscription(userId: any) {
  if (!userId) {
    return false;
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
    return false;
  }
  const isvalid =
    userSub.stripePriceId &&
    userSub.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();
  return !!isvalid;
}
