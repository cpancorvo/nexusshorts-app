import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <><Nav />
      <main className="pt-16">
        <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "linear-gradient(#d4d2c8 1px, transparent 1px), linear-gradient(90deg, #d4d2c8 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
          <div className="max-w-[1400px] mx-auto px-8 w-full grid grid-cols-12 gap-8 relative">
            <div className="col-span-12 lg:col-span-3 lg:pt-12 rise" style={{ animationDelay: "0.1s" }}>
              <div className="font-mono text-xs uppercase tracking-widest text-acid mb-4 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-acid rounded-full pulse-dot"></span>Live · 12,400 creators</div>
              <p className="font-mono text-xs text-fog leading-relaxed max-w-[200px]">/// rendering 1,247 reels<br/>/// across 38 niches<br/>/// at this exact moment</p>
            </div>
            <div className="col-span-12 lg:col-span-9 rise" style={{ animationDelay: "0.2s" }}>
              <h1 className="font-display text-bone tracking-tightest leading-[0.92] text-[clamp(3rem,9vw,9rem)] font-light">The studio<br/><span className="italic font-normal">that never</span><br/><span className="text-acid">sleeps.</span></h1>
              <div className="grid grid-cols-12 gap-8 mt-12">
                <p className="col-span-12 md:col-span-7 text-chalk text-lg md:text-xl leading-relaxed font-light">NexusShorts writes scripts, generates voices, renders video, and posts to TikTok, Instagram, and YouTube — automatically, on schedule, while you do literally anything else.</p>
                <div className="col-span-12 md:col-span-5 flex flex-col gap-3 md:items-end justify-end">
                  <Link href="/dashboard" className="inline-flex items-center gap-3 bg-acid text-ink px-6 py-3.5 font-mono text-sm uppercase tracking-wider font-medium hover:bg-bone transition-colors group">Begin a series<span className="group-hover:translate-x-1 transition-transform">→</span></Link>
                  <Link href="/#how" className="font-mono text-xs uppercase tracking-widest text-fog hover:text-bone transition-colors">Watch 90s walkthrough ↓</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-8 right-8 flex justify-between font-mono text-xs text-fog"><span>N° 001 / Faceless reels, fully on autopilot</span><span>Est. 2026 — Austin, TX</span></div>
        </section>

        <section className="border-y border-smoke py-6 overflow-hidden">
          <div className="flex marquee whitespace-nowrap font-mono text-xs uppercase tracking-widest text-fog">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex items-center shrink-0">
                {["2.3M videos generated", "★ 4.8 on Trustpilot", "Veo 3.1 + Sora 2 ready", "ElevenLabs voice cloning", "Auto-post 3 platforms", "Cancel anytime", "14-day money back", "API for agencies"].map((item, i) => (
                  <span key={i} className="flex items-center px-8"><span className="text-acid mr-3">◆</span>{item}</span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="py-32">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-12 gap-8 mb-20">
              <div className="col-span-12 md:col-span-4">
                <div className="font-mono text-xs uppercase tracking-widest text-acid mb-4">Chapter 01 — Process</div>
                <h2 className="font-display text-bone text-5xl md:text-6xl leading-[0.95] tracking-tightest font-light">Four steps.<br/><span className="italic">Zero</span> filming.</h2>
              </div>
              <div className="col-span-12 md:col-span-6 md:col-start-7 flex items-end">
                <p className="text-chalk text-lg leading-relaxed font-light">You pick a niche. The machine does the rest. Every reel passes through the same pipeline that traditional studios spend weeks on — compressed into about ninety seconds.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-smoke border border-smoke">
              {[{ num: "01", title: "Choose a world", body: "History, motivation, AI news, finance, horror — or describe a niche of your own.", meta: "~ 30 sec" }, { num: "02", title: "Scripts write themselves", body: "GPT-class models draft 30–60s scripts with hooks, beats, and CTAs.", meta: "~ 8 sec" }, { num: "03", title: "Render & narrate", body: "AI visuals, ElevenLabs voiceover, burned-in captions, 9:16 export.", meta: "~ 60 sec" }, { num: "04", title: "Post on schedule", body: "Autopublishes to TikTok, Reels, and Shorts at peak times.", meta: "Forever" }].map((step, i) => (
                <div key={i} className="bg-ink p-8 hover:bg-ash transition-colors group">
                  <div className="flex items-start justify-between mb-12"><div className="font-mono text-xs text-fog group-hover:text-acid transition-colors">Step {step.num}</div><div className="font-mono text-xs text-fog">{step.meta}</div></div>
                  <h3 className="font-display text-bone text-2xl mb-4 leading-tight tracking-tight">{step.title}</h3>
                  <p className="text-fog text-sm leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 border-y border-smoke">
          <div className="max-w-[1100px] mx-auto px-8 text-center">
            <div className="font-display text-acid text-7xl leading-none mb-8">&ldquo;</div>
            <blockquote className="font-display text-bone text-3xl md:text-5xl leading-[1.15] tracking-tightest font-light italic mb-12">I have not opened a video editor in eight months. My channel is bigger than it has ever been.</blockquote>
            <div className="font-mono text-xs uppercase tracking-widest text-fog">— Anonymous creator · 740k followers · agency plan</div>
          </div>
        </section>

        <section className="py-32">
          <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-7">
              <div className="font-mono text-xs uppercase tracking-widest text-acid mb-6">Chapter 04 — Begin</div>
              <h2 className="font-display text-bone text-6xl md:text-8xl leading-[0.92] tracking-tightest font-light">Three reels.<br/><span className="italic">On the house.</span></h2>
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-end gap-6">
              <p className="text-chalk text-lg leading-relaxed">No card. No commitment. Generate three full reels and decide whether to keep going.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard" className="inline-flex items-center gap-3 bg-acid text-ink px-8 py-4 font-mono text-sm uppercase tracking-wider font-medium hover:bg-bone transition-colors group">Start free<span className="group-hover:translate-x-1 transition-transform">→</span></Link>
                <Link href="/pricing" className="inline-flex items-center gap-3 border border-smoke text-bone px-8 py-4 font-mono text-sm uppercase tracking-wider hover:border-acid hover:text-acid transition-colors">See pricing</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
