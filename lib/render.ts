/**
 * Client for calling the render worker on Railway.
 * Called after the AI pipeline generates scenes + audio.
 */

export async function renderVideo(params: {
  scenes: { caption: string; imageUrl?: string }[];
  audioUrl: string;
  title: string;
  brandColor?: string;
}): Promise<{ videoUrl: string; durationMs: number; sizeBytes: number }> {
  const workerUrl = process.env.RENDER_WORKER_URL;
  const secret = process.env.RENDER_SECRET;

  if (!workerUrl) {
    throw new Error("RENDER_WORKER_URL is not configured. Deploy the render worker to Railway first.");
  }

  const res = await fetch(`${workerUrl}/render`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-render-secret": secret || "nexusshorts-render-2026",
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Render worker unreachable" }));
    throw new Error(err.error || `Render failed with status ${res.status}`);
  }

  return res.json();
}
