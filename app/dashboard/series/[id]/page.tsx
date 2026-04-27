"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Scene {
  narration: string;
  caption: string;
  visualPrompt: string;
  imageUrl?: string;
}

interface Episode {
  id: string;
  title: string | null;
  status: string;
  scriptJson: { hook: string; scenes: Scene[]; cta: string } | null;
  audioUrl: string | null;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  durationMs: number | null;
  errorMessage: string | null;
  createdAt: string;
}

const statusLabels: Record<string, string> = {
  PENDING: "Queued...",
  GENERATING_SCRIPT: "Writing script...",
  GENERATING_VOICE: "Generating voiceover...",
  TRANSCRIBING: "Syncing captions...",
  GENERATING_IMAGES: "Creating visuals...",
  RENDERING: "Rendering MP4...",
  UPLOADING: "Uploading...",
  READY: "Ready",
  FAILED: "Failed",
};

const statusColors: Record<string, string> = {
  READY: "text-acid",
  FAILED: "text-rust",
};

export default function SeriesDetailPage() {
  const params = useParams();
  const seriesId = params.id as string;

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const fetchEpisodes = useCallback(async () => {
    try {
      const res = await fetch(`/api/episodes/status?seriesId=${seriesId}`);
      if (res.ok) {
        const data = await res.json();
        setEpisodes(data.episodes);
      }
    } catch {}
  }, [seriesId]);

  useEffect(() => {
    fetchEpisodes();
  }, [fetchEpisodes]);

  async function handleGenerate() {
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/episodes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seriesId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      await fetchEpisodes();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setGenerating(false);
    }
  }

  function handleDownload(episode: Episode) {
    if (!episode.videoUrl) return;
    const link = document.createElement("a");
    link.href = episode.videoUrl;
    link.download = `${(episode.title || "episode").replace(/[^a-zA-Z0-9]/g, "_")}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Auto-advance scenes for the preview
  useEffect(() => {
    if (!selectedEpisode?.scriptJson || showVideoPlayer) return;
    const scenes = selectedEpisode.scriptJson.scenes;
    if (scenes.length === 0) return;
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedEpisode, showVideoPlayer]);

  return (
    <main className="min-h-screen bg-ink py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/dashboard" className="font-mono text-xs uppercase tracking-widest text-fog hover:text-acid mb-8 inline-block">
          ← Back to dashboard
        </Link>

        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-acid mb-3">Series detail</div>
            <h1 className="font-display text-bone text-5xl tracking-tightest font-light leading-none">Episodes</h1>
            <p className="text-fog mt-3 text-sm">{episodes.length} episode{episodes.length !== 1 ? "s" : ""} generated</p>
          </div>
          <button onClick={handleGenerate} disabled={generating} className="bg-acid text-ink px-6 py-3 font-mono text-xs uppercase tracking-widest font-medium hover:bg-bone transition-colors disabled:opacity-50">
            {generating ? "Generating..." : "Generate episode →"}
          </button>
        </div>

        {error && (
          <div className="border border-rust bg-rust/10 text-rust p-4 font-mono text-sm mb-8">Error: {error}</div>
        )}

        {generating && (
          <div className="border border-acid/30 bg-acid/5 p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-3 h-3 bg-acid rounded-full pulse-dot"></div>
              <div className="font-mono text-xs uppercase tracking-widest text-acid">Generating episode</div>
            </div>
            <div className="font-display text-bone text-2xl mb-2">Pipeline running...</div>
            <p className="text-fog text-sm">Writing script → generating voiceover → creating visuals → rendering MP4. This takes 60–120 seconds.</p>
            <div className="mt-4 h-1 bg-smoke overflow-hidden">
              <div className="h-full bg-acid" style={{ width: "60%", animation: "pulse-dot 2s ease-in-out infinite" }} />
            </div>
          </div>
        )}

        {/* Episode Player/Preview Modal */}
        {selectedEpisode?.scriptJson && (
          <div className="border border-acid bg-ash mb-8">
            <div className="flex items-center justify-between p-4 border-b border-smoke">
              <div className="font-mono text-xs uppercase tracking-widest text-acid">
                {showVideoPlayer ? "Video" : "Preview"} — {selectedEpisode.title}
              </div>
              <div className="flex items-center gap-4">
                {selectedEpisode.videoUrl && (
                  <button
                    onClick={() => setShowVideoPlayer(!showVideoPlayer)}
                    className="font-mono text-[10px] uppercase tracking-widest text-acid hover:text-bone border border-acid/40 px-3 py-1"
                  >
                    {showVideoPlayer ? "Show scenes" : "Play video"}
                  </button>
                )}
                <button onClick={() => { setSelectedEpisode(null); setCurrentScene(0); setShowVideoPlayer(false); }} className="font-mono text-xs text-fog hover:text-bone">
                  Close ✕
                </button>
              </div>
            </div>

            {showVideoPlayer && selectedEpisode.videoUrl ? (
              /* Full video player */
              <div className="flex justify-center p-6 bg-ink">
                <video
                  controls
                  autoPlay
                  src={selectedEpisode.videoUrl}
                  className="max-h-[600px] aspect-[9/16] bg-black"
                  style={{ borderRadius: 0 }}
                />
              </div>
            ) : (
              /* Scene-by-scene preview */
              <div className="grid grid-cols-12 gap-0">
                <div className="col-span-5 bg-ink relative aspect-[9/16] max-h-[500px] overflow-hidden">
                  {selectedEpisode.scriptJson.scenes[currentScene]?.imageUrl && (
                    <img src={selectedEpisode.scriptJson.scenes[currentScene].imageUrl} alt="Scene" className="w-full h-full object-cover transition-opacity duration-500" />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="bg-ink/60 border border-acid/40 px-3 py-2 inline-block">
                      <span className="font-display text-bone text-lg font-medium">{selectedEpisode.scriptJson.scenes[currentScene]?.caption}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 font-mono text-[10px] text-bone/60 bg-ink/60 px-2 py-1">
                    {currentScene + 1} / {selectedEpisode.scriptJson.scenes.length}
                  </div>
                </div>

                <div className="col-span-7 p-6 max-h-[500px] overflow-y-auto">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-fog mb-2">Hook</div>
                  <p className="text-bone text-lg mb-6 font-display italic">&ldquo;{selectedEpisode.scriptJson.hook}&rdquo;</p>

                  <div className="font-mono text-[10px] uppercase tracking-widest text-fog mb-3">Scenes</div>
                  <div className="space-y-3">
                    {selectedEpisode.scriptJson.scenes.map((scene, i) => (
                      <button key={i} onClick={() => setCurrentScene(i)} className={`w-full text-left p-3 border transition-colors ${i === currentScene ? "border-acid bg-acid/5" : "border-smoke hover:border-fog"}`}>
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-[10px] text-fog shrink-0">{String(i + 1).padStart(2, "0")}</span>
                          <div>
                            <div className="text-chalk text-sm">{scene.narration}</div>
                            <div className="text-fog text-xs mt-1 font-mono">Caption: {scene.caption}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="font-mono text-[10px] uppercase tracking-widest text-fog mt-6 mb-2">Call to action</div>
                  <p className="text-chalk text-sm">{selectedEpisode.scriptJson.cta}</p>

                  {selectedEpisode.audioUrl && (
                    <div className="mt-6">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-fog mb-2">Voiceover</div>
                      <audio controls src={selectedEpisode.audioUrl} className="w-full h-10" style={{ filter: "invert(1)" }} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Episodes list */}
        {episodes.length === 0 && !generating ? (
          <div className="border border-smoke border-dashed p-16 text-center">
            <div className="font-display text-bone/30 text-6xl italic mb-4">◆</div>
            <div className="font-mono text-xs uppercase tracking-widest text-acid mb-3">No episodes yet</div>
            <h3 className="font-display text-bone text-2xl tracking-tightest font-light mb-3">Generate your <span className="italic">first episode.</span></h3>
            <p className="text-fog max-w-md mx-auto mb-6 text-sm">Click the button above. The AI will write a script, generate a voiceover, create scene visuals, and render a video in about 60 seconds.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {episodes.map((ep) => (
              <div key={ep.id} className="border border-smoke bg-ash p-5 flex items-center gap-6 hover:border-fog transition-colors">
                <div className="w-16 h-28 bg-ink shrink-0 overflow-hidden">
                  {ep.thumbnailUrl ? (
                    <img src={ep.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-fog text-xs font-mono">{ep.status === "FAILED" ? "✕" : "..."}</div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-display text-bone text-lg truncate">{ep.title || "Untitled episode"}</div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className={`font-mono text-[10px] uppercase tracking-widest ${statusColors[ep.status] || "text-fog"}`}>● {statusLabels[ep.status] || ep.status}</span>
                    {ep.durationMs && <span className="font-mono text-[10px] text-fog">{Math.round(ep.durationMs / 1000)}s</span>}
                    <span className="font-mono text-[10px] text-fog">{new Date(ep.createdAt).toLocaleDateString()}</span>
                    {ep.videoUrl && <span className="font-mono text-[10px] text-acid">MP4 ready</span>}
                  </div>
                  {ep.errorMessage && <div className="text-rust text-xs mt-1 truncate">{ep.errorMessage}</div>}
                </div>

                <div className="flex gap-2 shrink-0">
                  {ep.status === "READY" && ep.scriptJson && (
                    <button onClick={() => { setSelectedEpisode(ep); setCurrentScene(0); setShowVideoPlayer(false); }} className="border border-acid text-acid px-4 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-acid hover:text-ink transition-colors">
                      Preview
                    </button>
                  )}
                  {ep.status === "READY" && ep.videoUrl && (
                    <button onClick={() => handleDownload(ep)} className="bg-acid text-ink px-4 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-bone transition-colors">
                      Download ↓
                    </button>
                  )}
                  {ep.status === "FAILED" && (
                    <button onClick={handleGenerate} disabled={generating} className="border border-smoke text-fog px-4 py-2 font-mono text-[10px] uppercase tracking-widest hover:border-acid hover:text-acid transition-colors">
                      Retry
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
