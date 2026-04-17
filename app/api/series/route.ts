import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/user";

export async function POST(req: Request) {
  const user = await requireUser();
  const body = await req.json();

  const { name, niche, style, cadence, postTime, timezone } = body;

  if (!name || !niche) {
    return NextResponse.json({ error: "name and niche are required" }, { status: 400 });
  }

  const series = await prisma.series.create({
    data: {
      userId: user.id,
      name: String(name).slice(0, 100),
      niche: String(niche).slice(0, 500),
      style: style ? String(style).slice(0, 300) : undefined,
      cadence: cadence || "DAILY",
      postTime: postTime || "09:00",
      timezone: timezone || "America/New_York",
    },
  });

  return NextResponse.json({ series });
}

export async function GET() {
  const user = await requireUser();
  const series = await prisma.series.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { episodes: true } } },
  });
  return NextResponse.json({ series });
}
