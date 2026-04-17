import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        {/* ============ HERO ============ */}
        <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
          {/* Decorative grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#d4d2c8 1px, transparent 1px), linear-gradient(90deg, #d4d2c8 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          <div className="max-w-[1400px] mx-auto px-8 w-full grid grid-cols-12 gap-8 relative">
            {/* Left: status block */}
            <div className="col-span-12 lg:col-span-3 lg:pt-12 rise" style={{ animationDelay: "0.1s" }}>
              <div className="font-mono text-xs uppercase tracking-widest text-acid mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-acid rounded-full pulse-dot"></span>
                Live · 12,400 creators
              </div>
              <p className="font-mono text-xs text-fog leading-relaxed max-w-[200px]">
                /// rendering 1,247 reels<br/>
                /// across 38 niches<br/>
                /// at this exact moment
              </p>
            </div>

            {/* Center: main headline */}
            <div className="col-span-12 lg:col-span-9 rise" style={{ animationDelay: "0.2s" }}>
              <h1 className="font-display text-bone tracking-tightest leading-[0.92] text-[clamp(3rem,9vw,9rem)] font-light">
                The studio<br/>
                <span className="italic font-normal">that never</span><br/>
                <span className="text-acid">sleeps.</span>
              </h1>

              <div className="grid grid-cols-12 gap-8 mt-12">
                <p className="col-span-12 md:col-span-7 text-chalk text-lg md:text-xl leading-relaxed font-light">
                  NexusShorts writes scripts, generates voices, renders video, and
                  posts to TikTok, Instagram, and YouTube — automatically, on
                  schedule, while you do literally anything else.
                </p>

                <div className="col-span-12 md:col-span-5 flex flex-col gap-3 md:items-end justify-end">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-3 bg-acid text-ink px-6 py-3.5 font-mono text-sm uppercase tracking-wider font-medium hover:bg-bone transition-colors group"
                  >
                    Begin a series
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <Link
                    href="/#how"
                    className="font-mono text-xs uppercase tracking-widest text-fog hover:text-bone transition-colors"
                  >
                    Watch 90s walkthrough ↓
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom marker line */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between font-mono text-xs text-fog">
            <span>N° 001 / Faceless reels, fully on autopilot</span>
            <span>Est. 2026 — Austin, TX</span>
          </div>
        </section>

        {/* ============ TRUST MARQUEE ============ */}
        <section className="border-y border-smoke py-6 overflow-hidden">
          <div className="flex marquee whitespace-nowrap font-mono text-xs uppercase tracking-widest text-fog">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex items-center shrink-0">
                {[
                  "2.3M videos generated",
                  "★ 4.8 on Trustpilot",
                  "Veo 3.1 + Sora 2 ready",
                  "ElevenLabs voice cloning",
                  "Auto-post 3 platforms",
                  "Cancel anytime",
                  "14-day money back",
                  "API for agencies",
                ].map((item, i) => (
                  <span key={i} className="flex items-center px-8">
                    <span className="text-acid mr-3">◆</span>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section id="how" className="py-32">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-12 gap-8 mb-20">
              <div className="col-span-12 md:col-span-4">
                <div className="font-mono text-xs uppercase tracking-widest text-acid mb-4">
                  Chapter 01 — Process
                </div>
                <h2 className="font-display text-bone text-5xl md:text-6xl leading-[0.95] tracking-tightest font-light">
                  Four steps.<br/>
                  <span className="italic">Zero</span> filming.
                </h2>
              </div>
              <div className="col-span-12 md:col-span-6 md:col-start-7 flex items-end">
                <p className="text-chalk text-lg leading-relaxed font-light">
                  You pick a niche. The machine does the rest. Every reel passes
                  through the same pipeline that traditional studios spend weeks
                  on — compressed into about ninety seconds.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-smoke border border-smoke">
              {[
                {
                  num: "01",
                  title: "Choose a world",
                  body: "History, motivation, AI news, finance, horror, mythology — or describe a niche of your own. The system memorizes its tone.",
                  meta: "~ 30 sec",
                },
                {
                  num: "02",
                  title: "Scripts write themselves",
                  body: "GPT-class models draft 30–60s scripts with hooks, beats, and CTAs tuned to what the algorithm rewards this week.",
                  meta: "~ 8 sec",
                },
                {
                  num: "03",
                  title: "Render & narrate",
                  body: "AI visuals, ElevenLabs voiceover, burned-in captions, vertical 9:16 export. Fully assembled, no editor required.",
                  meta: "~ 60 sec",
                },
                {
                  num: "04",
                  title: "Post on schedule",
                  body: "Autopublishes to TikTok, Reels, and Shorts at the times your audience is most active. You watch the views roll in.",
                  meta: "Forever",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="bg-ink p-8 hover:bg-ash transition-colors group"
                >
                  <div className="flex items-start justify-between mb-12">
                    <div className="font-mono text-xs text-fog group-hover:text-acid transition-colors">
                      Step {step.num}
                    </div>
                    <div className="font-mono text-xs text-fog">{step.meta}</div>
                  </div>
                  <h3 className="font-display text-bone text-2xl mb-4 leading-tight tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-fog text-sm leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ EDITORIAL FEATURE ============ */}
        <section className="py-32 border-y border-smoke bg-ash/30">
          <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-5">
              <div className="font-mono text-xs uppercase tracking-widest text-acid mb-6">
                Chapter 02 — The Stack
              </div>
              <h2 className="font-display text-bone text-5xl md:text-6xl leading-[0.95] tracking-tightest font-light mb-8">
                Built on the <span className="italic">best</span> models in the world.
              </h2>
              <p className="text-chalk text-lg leading-relaxed font-light mb-8">
                We do not pick winners. We pick whoever shipped the best model
                this quarter, and route every reel through the right tool for
                the job. Today that means:
              </p>
              <Link
                href="/pricing"
                className="font-mono text-sm uppercase tracking-widest text-acid hover:text-bone transition-colors inline-flex items-center gap-2"
              >
                See full stack →
              </Link>
            </div>

            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <ul className="divide-y divide-smoke border-y border-smoke">
                {[
                  ["Scripts", "GPT-4o · Claude Opus 4.6", "Reasoning"],
                  ["Voice", "ElevenLabs Turbo v2.5", "Audio"],
                  ["Imagery", "Flux 1.1 · Imagen 4", "Visuals"],
                  ["Motion", "Veo 3.1 · Sora 2 · Kling 2", "Video"],
                  ["Captions", "Whisper Large v3", "Sync"],
                  ["Render", "Remotion + FFmpeg", "Export"],
                ].map(([label, model, tag], i) => (
                  <li key={i} className="py-5 grid grid-cols-12 gap-4 items-baseline group">
                    <div className="col-span-3 font-mono text-xs uppercase tracking-widest text-fog group-hover:text-acid transition-colors">
                      {tag}
                    </div>
                    <div className="col-span-3 font-display text-bone text-xl">
                      {label}
                    </div>
                    <div className="col-span-6 text-chalk text-sm font-mono text-right">
                      {model}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============ SHOWCASE ============ */}
        <section id="showcase" className="py-32">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-12 gap-8 mb-16">
              <div className="col-span-12 md:col-span-8">
                <div className="font-mono text-xs uppercase tracking-widest text-acid mb-4">
                  Chapter 03 — In the wild
                </div>
                <h2 className="font-display text-bone text-5xl md:text-6xl leading-[0.95] tracking-tightest font-light">
                  Channels built on <span className="italic">our pipeline.</span>
                </h2>
              </div>
              <div className="col-span-12 md:col-span-4 flex md:items-end md:justify-end">
                <div className="font-mono text-xs text-fog">
                  // anonymized at creator request
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  niche: "Forgotten History",
                  followers: "412k",
                  views: "18.2M",
                  posts: "342",
                  bg: "from-rust/20 to-acid/10",
                  glyph: "⌛",
                },
                {
                  niche: "AI News Daily",
                  followers: "186k",
                  views: "9.4M",
                  posts: "228",
                  bg: "from-acid/20 to-rust/10",
                  glyph: "◈",
                },
                {
                  niche: "Stoic Mornings",
                  followers: "94k",
                  views: "5.1M",
                  posts: "411",
                  bg: "from-bone/10 to-fog/10",
                  glyph: "★",
                },
              ].map((channel, i) => (
                <div
                  key={i}
                  className="border border-smoke bg-ash overflow-hidden card-lift"
                >
                  <div
                    className={`aspect-[4/5] bg-gradient-to-br ${channel.bg} flex items-center justify-center relative`}
                  >
                    <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-bone/60">
                      Channel N° {String(i + 1).padStart(3, "0")}
                    </div>
                    <div className="text-bone/40 text-9xl font-display italic">
                      {channel.glyph}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[10px] uppercase tracking-widest text-bone/60">
                      <span>● Active</span>
                      <span>{channel.posts} posts</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-bone text-2xl mb-4 tracking-tight">
                      {channel.niche}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-smoke">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-fog mb-1">
                          Followers
                        </div>
                        <div className="font-display text-acid text-2xl">
                          {channel.followers}
                        </div>
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-fog mb-1">
                          Views
                        </div>
                        <div className="font-display text-bone text-2xl">
                          {channel.views}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TESTIMONIAL / PULL QUOTE ============ */}
        <section className="py-32 border-y border-smoke">
          <div className="max-w-[1100px] mx-auto px-8 text-center">
            <div className="font-display text-acid text-7xl leading-none mb-8">&ldquo;</div>
            <blockquote className="font-display text-bone text-3xl md:text-5xl leading-[1.15] tracking-tightest font-light italic mb-12">
              I have not opened a video editor in eight months. My channel is
              bigger than it has ever been. I do not know how to feel about
              this — but the cheques keep clearing.
            </blockquote>
            <div className="font-mono text-xs uppercase tracking-widest text-fog">
              — Anonymous creator · 740k followers · agency plan
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="py-32">
          <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-7">
              <div className="font-mono text-xs uppercase tracking-widest text-acid mb-6">
                Chapter 04 — Begin
              </div>
              <h2 className="font-display text-bone text-6xl md:text-8xl leading-[0.92] tracking-tightest font-light">
                Three reels.<br/>
                <span className="italic">On the house.</span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-end gap-6">
              <p className="text-chalk text-lg leading-relaxed">
                No card. No commitment. Generate three full reels and decide
                whether to keep going. Most people do.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-3 bg-acid text-ink px-8 py-4 font-mono text-sm uppercase tracking-wider font-medium hover:bg-bone transition-colors group"
                >
                  Start free
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-3 border border-smoke text-bone px-8 py-4 font-mono text-sm uppercase tracking-wider hover:border-acid hover:text-acid transition-colors"
                >
                  See pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
