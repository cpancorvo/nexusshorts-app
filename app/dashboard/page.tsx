import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { requireUser, PLAN_LIMITS, videosRemaining } from "@/lib/user";

export const dynamic = "force-dynamic";

const statusStyles: Record<string, string> = {
  ACTIVE: "text-acid border-acid/40",
  PAUSED: "text-fog border-fog/40",
  ARCHIVED: "text-fog border-fog/40",
};

const glyphForNiche = (niche: string) => {
  const n = niche.toLowerCase();
  if (n.includes("history") || n.includes("ancient")) return "⌛";
  if (n.includes("ai") || n.includes("tech")) return "◈";
  if (n.includes("stoic") || n.includes("motivation")) return "★";
  if (n.includes("horror") || n.includes("mystery")) return "◐";
  return "◆";
};

export default async function DashboardPage() {
  const user = await requireUser();

  const [series, totalEpisodes, readyEpisodes, renderingEpisodes] = await Promise.all([
    prisma.series.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { episodes: true } } },
    }),
    prisma.episode.count({ where: { userId: user.id } }),
    prisma.episode.count({ where: { userId: user.id, status: "READY" } }),
    prisma.episode.count({
      where: {
        userId: user.id,
        status: { in: ["GENERATING_SCRIPT", "GENERATING_VOICE", "GENERATING_IMAGES", "RENDERING"] },
      },
    }),
  ]);

  const remaining = videosRemaining(user);
  const limit = PLAN_LIMITS[user.plan];
  const usagePct = Math.min(100, Math.round((user.videosUsedThisMonth / limit) * 100));

  return (
    <div className="min-h-screen bg-ink flex">
      {/* ============ SIDEBAR ============ */}
      <aside className="w-64 border-r border-smoke flex flex-col p-6 sticky top-0 h-screen">
        <Link href="/" className="flex items-center gap-3 mb-12">
          <div className="w-7 h-7 bg-acid flex items-center justify-center">
            <span className="font-mono text-ink text-sm font-medium">N</span>
          </div>
          <span className="font-display text-lg text-bone tracking-tightest">
            nexusshorts<span className="text-acid">.studio</span>
          </span>
        </Link>

        <div className="font-mono text-[10px] uppercase tracking-widest text-fog mb-3 px-2">
          Workspace
        </div>
        <nav className="flex flex-col gap-1 mb-10">
          {[
            ["Dashboard", "/dashboard", false],
            ["Series", "/dashboard", true],
            ["Library", "/dashboard", false],
            ["Schedule", "/dashboard", false],
            ["Analytics", "/dashboard", false],
            ["Voices", "/dashboard", false],
          ].map(([label, href, active], i) => (
            <Link
              key={label as string}
              href={href as string}
              className={`px-3 py-2 text-sm font-mono flex items-center gap-3 transition-colors ${
                active
                  ? "bg-ash text-acid border-l-2 border-acid"
                  : "text-chalk hover:text-bone border-l-2 border-transparent"
              }`}
            >
              <span className="font-mono text-[10px] text-fog">
                {String(i + 1).padStart(2, "0")}
              </span>
              {label as string}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="border border-smoke p-4 mb-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-fog mb-2">
              {user.plan} plan
            </div>
            <div className="h-1 bg-smoke mb-2 overflow-hidden">
              <div className="h-full bg-acid" style={{ width: `${usagePct}%` }} />
            </div>
            <div className="font-mono text-[10px] text-fog">
              {user.videosUsedThisMonth} / {limit} videos this month
            </div>
            {user.plan === "FREE" && (
              <Link
                href="/pricing"
                className="block mt-3 text-center bg-acid text-ink py-2 font-mono text-[10px] uppercase tracking-widest font-medium hover:bg-bone transition-colors"
              >
                Upgrade →
              </Link>
            )}
          </div>
          <div className="flex items-center gap-3 px-2">
            <UserButton afterSignOutUrl="/" />
            <div className="text-xs text-chalk truncate">{user.email}</div>
          </div>
        </div>
      </aside>

      {/* ============ MAIN ============ */}
      <main className="flex-1 p-10 max-w-[1400px]">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-acid mb-3">
              N° 02 — Series
            </div>
            <h1 className="font-display text-bone text-5xl tracking-tightest font-light leading-none">
              {user.name ? (
                <>Hello, <span className="italic">{user.name.split(" ")[0]}.</span></>
              ) : (
                <>Your <span className="italic">channels.</span></>
              )}
            </h1>
            <p className="text-fog mt-3 text-sm">
              {series.length === 0
                ? "No series yet — create your first channel to begin."
                : `${series.length} ${series.length === 1 ? "series" : "series"} · ${remaining} videos remaining this month`}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dashboard/series/new"
              className="bg-acid text-ink px-5 py-2.5 font-mono text-xs uppercase tracking-widest font-medium hover:bg-bone transition-colors"
            >
              + New series
            </Link>
          </div>
        </div>

        {/* ============ STATS BAR ============ */}
        <div className="grid grid-cols-4 border border-smoke divide-x divide-smoke mb-12">
          {[
            ["Videos generated", String(totalEpisodes)],
            ["Ready to post", String(readyEpisodes)],
            ["Render queue", String(renderingEpisodes)],
            ["Videos remaining", String(remaining)],
          ].map(([label, val], i) => (
            <div key={i} className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-fog mb-2">
                {label}
              </div>
              <div className="font-display text-bone text-3xl tracking-tight">{val}</div>
            </div>
          ))}
        </div>

        {/* ============ SERIES GRID OR EMPTY STATE ============ */}
        {series.length === 0 ? (
          <div className="border border-smoke border-dashed p-20 text-center">
            <div className="font-display text-bone/40 text-7xl mb-6 italic">◆</div>
            <div className="font-mono text-xs uppercase tracking-widest text-acid mb-3">
              Nothing here yet
            </div>
            <h3 className="font-display text-bone text-3xl tracking-tightest font-light mb-4">
              Begin your <span className="italic">first series.</span>
            </h3>
            <p className="text-fog max-w-md mx-auto mb-8">
              Pick a niche, choose a voice, and the studio will start generating
              videos for you automatically.
            </p>
            <Link
              href="/dashboard/series/new"
              className="inline-block bg-acid text-ink px-6 py-3 font-mono text-xs uppercase tracking-widest font-medium hover:bg-bone transition-colors"
            >
              Create first series →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {series.map((s, i) => (
              <Link
                key={s.id}
                href={`/dashboard/series/${s.id}`}
                className="border border-smoke bg-ash overflow-hidden card-lift block"
              >
                <div className="aspect-video bg-gradient-to-br from-rust/20 to-acid/10 relative flex items-center justify-center">
                  <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-bone/70">
                    Series N° {String(i + 1).padStart(3, "0")}
                  </div>
                  <div
                    className={`absolute top-4 right-4 font-mono text-[10px] uppercase tracking-widest px-2 py-1 border bg-ink/40 backdrop-blur-sm ${
                      statusStyles[s.status] ?? "text-fog border-fog/40"
                    }`}
                  >
                    ● {s.status.toLowerCase()}
                  </div>
                  <div className="text-bone/30 text-7xl font-display italic">
                    {glyphForNiche(s.niche)}
                  </div>
                  <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-bone/70">
                    {s.cadence.toLowerCase().replace("_", " ")} · {s.postTime}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-bone text-2xl mb-2 tracking-tight">
                    {s.name}
                  </h3>
                  <p className="text-fog text-sm mb-6 line-clamp-2">{s.niche}</p>
                  <div className="pt-5 border-t border-smoke flex justify-between items-baseline">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-fog mb-1">
                        Episodes
                      </div>
                      <div className="font-display text-bone text-xl">
                        {s._count.episodes}
                      </div>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-acid">
                      Open →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
