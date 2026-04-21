import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/user";

export async function GET(req: Request) {
  const user = await requireUser();
  const { searchParams } = new URL(req.url);
  const seriesId = searchParams.get("seriesId");
  const episodeId = searchParams.get("episodeId");

  if (episodeId) {
    const episode = await prisma.episode.findFirst({
      where: { id: episodeId, userId: user.id },
    });
    if (!episode) {
      return NextResponse.json({ error: "Episode not found" }, { status: 404 });
    }
    return NextResponse.json({ episode });
  }

  if (seriesId) {
    const episodes = await prisma.episode.findMany({
      where: { seriesId, userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ episodes });
  }

  return NextResponse.json({ error: "seriesId or episodeId required" }, { status: 400 });
}
