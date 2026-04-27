import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, PLAN_LIMITS } from "@/lib/user";
import { runPipeline } from "@/lib/pipeline";
import { renderVideo } from "@/lib/render";

export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = await req.json();
    const { seriesId } = body;

    if (!seriesId) {
      return NextResponse.json({ error: "seriesId is required" }, { status: 400 });
    }

    const series = await prisma.series.findFirst({
      where: { id: seriesId, userId: user.id },
    });

    if (!series) {
      return NextResponse.json({ error: "Series not found" }, { status: 404 });
    }

    const limit = PLAN_LIMITS[user.plan];
    if (user.videosUsedThisMonth >= limit) {
      return NextResponse.json(
        { error: `Monthly limit reached (${limit} videos). Upgrade your plan for more.` },
        { status: 429 }
      );
    }

    const episode = await prisma.episode.create({
      data: {
        seriesId: series.id,
        userId: user.id,
        title: `${series.name} #${await prisma.episode.count({ where: { seriesId: series.id } })}`,
        status: "GENERATING_SCRIPT",
      },
    });

    try {
      // Run AI pipeline (script + voice + images)
      await prisma.episode.update({
        where: { id: episode.id },
        data: { status: "GENERATING_SCRIPT" },
      });

      const result = await runPipeline(series.niche, series.style);

      // Try to render MP4 via Railway worker (optional - gracefully skip if not configured)
      let videoUrl: string | null = null;
      try {
        if (process.env.RENDER_WORKER_URL) {
          await prisma.episode.update({
            where: { id: episode.id },
            data: { status: "RENDERING" },
          });

          const renderResult = await renderVideo({
            scenes: result.scenes.map((s) => ({
              caption: s.caption,
              imageUrl: s.imageUrl,
            })),
            audioUrl: result.audioUrl,
            title: series.name,
            brandColor: series.brandColor,
          });

          videoUrl = renderResult.videoUrl;
        }
      } catch (renderErr) {
        // Render is optional - log but don't fail the episode
        console.error("Render worker error (non-fatal):", renderErr);
      }

      // Save completed episode
      await prisma.episode.update({
        where: { id: episode.id },
        data: {
          status: "READY",
          title: `${series.name} — ${result.script.hook.slice(0, 50)}`,
          scriptJson: result.script as any,
          audioUrl: result.audioUrl,
          videoUrl: videoUrl,
          thumbnailUrl: result.scenes[0]?.imageUrl || null,
          durationMs: result.durationMs,
        },
      });

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
          videoUrl: videoUrl,
          durationMs: result.durationMs,
          hasVideo: !!videoUrl,
        },
      });
    } catch (pipelineError) {
      await prisma.episode.update({
        where: { id: episode.id },
        data: {
          status: "FAILED",
          errorMessage: pipelineError instanceof Error ? pipelineError.message : "Unknown error",
        },
      });

      return NextResponse.json(
        { error: pipelineError instanceof Error ? pipelineError.message : "Pipeline failed", episodeId: episode.id },
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
