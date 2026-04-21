import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

export async function requireUser() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  let user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) {
    const clerkUser = await currentUser();
    if (!clerkUser) redirect("/sign-in");
    user = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
        name: [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null,
        imageUrl: clerkUser.imageUrl,
      },
    });
  }
  return user;
}

export const PLAN_LIMITS = { FREE: 3, STARTER: 30, CREATOR: 150, AGENCY: 500 } as const;

export function videosRemaining(user: { plan: keyof typeof PLAN_LIMITS; videosUsedThisMonth: number }) {
  return Math.max(0, PLAN_LIMITS[user.plan] - user.videosUsedThisMonth);
}
