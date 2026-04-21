import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, PLAN_LIMITS } from "@/lib/user";
import { runPipeline } from "@/lib/pipeline";

export const maxDuration = 300; // 5 min timeout for Vercel Pro, 60s on Hobby

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = await req.json();
    const { seriesId } = body;

    if (!seriesId) {
      return NextResponse.json(
        { error: "seriesId is required" },
        { status: 400 }
      );
    }

    // Check ownership
    const series = await prisma.series.findFirst({
      where: { id: seriesId, userId: user.id },
    });

    if (!series) {
      return NextResponse.json(
        { error: "Series not found" },
        { status: 404 }
      );
    }

    // Check usage limits
    const limit = PLAN_LIMITS[user.plan];
    if (user.videosUsedThisMonth >= limit) {
      return NextResponse.json(
        {
          error: `Monthly limit reached (${limit} videos). Upgrade your plan for more.`,
        },
        { status: 429 }
      );
    }

    // Create episode record in PENDING state
    const episode = await prisma.episode.create({
      data: {
        seriesId: series.id,
        userId: user.id,
        title: `${series.name} #${(await prisma.episode.count({ where: { seriesId: series.id } }))}`,
        status: "GENERATING_SCRIPT",
      },
    });

    // Run the pipeline (this is synchronous for now - will be async with queue in production)
    try {
      // Update status: generating script
      await prisma.episode.update({
        where: { id: episode.id },
        data: { status: "GENERATING_SCRIPT" },
      });

      const result = await runPipeline(series.niche, series.style);

      // Update status: generating voice (already done in pipeline, but track it)
      await prisma.episode.update({
        where: { id: episode.id },
        data: { status: "GENERATING_IMAGES" },
      });

      // Save the completed episode
      await prisma.episode.update({
        where: { id: episode.id },
        data: {
          status: "READY",
          title: `${series.name} — ${result.script.hook.slice(0, 50)}`,
          scriptJson: result.script as any,
          audioUrl: result.audioUrl,
          thumbnailUrl: result.scenes[0]?.imageUrl || null,
          durationMs: result.durationMs,
        },
      });

      // Increment usage
      await prisma.user.update({
        where: { id: user.id },
        data: { videosUsedThisMonth: { increment: 1 } },
      });

      return NextResponse.json({
        episode: {
          id: episode.id,
          status: "READY",
          title: `${series.name} — ${result.script.hook.slice(0, 50)}`,
          scenes: result.scenes,
          audioUrl: result.audioUrl,
          durationMs: result.durationMs,
        },
      });
    } catch (pipelineError) {
      // Mark episode as failed
      await prisma.episode.update({
        where: { id: episode.id },
        data: {
          status: "FAILED",
          errorMessage:
            pipelineError instanceof Error
              ? pipelineError.message
              : "Unknown error",
        },
      });

      return NextResponse.json(
        {
          error:
            pipelineError instanceof Error
              ? pipelineError.message
              : "Pipeline failed",
          episodeId: episode.id,
        },
        { status: 500 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
