"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewSeriesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", niche: "", style: "cinematic, dramatic lighting, photorealistic", cadence: "DAILY", postTime: "09:00" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/series", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || "Failed"); }
      router.push("/dashboard");
      router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong"); setLoading(false); }
  }

  return (
    <main className="min-h-screen bg-ink py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="font-mono text-xs uppercase tracking-widest text-fog hover:text-acid mb-8 inline-block">← Back to dashboard</Link>
        <div className="font-mono text-xs uppercase tracking-widest text-acid mb-3">New series · Setup</div>
        <h1 className="font-display text-bone text-5xl tracking-tightest font-light mb-12">Create a <span className="italic">channel.</span></h1>
        <form onSubmit={submit} className="space-y-8">
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-fog block mb-2">Series name</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Forgotten history" className="w-full bg-ash border border-smoke text-bone px-4 py-3 font-display text-xl focus:outline-none focus:border-acid transition-colors" />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-fog block mb-2">Niche / topic</label>
            <textarea required rows={3} value={form.niche} onChange={(e) => setForm({ ...form, niche: e.target.value })} placeholder="Describe what this series is about..." className="w-full bg-ash border border-smoke text-bone px-4 py-3 text-base focus:outline-none focus:border-acid transition-colors resize-none" />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-fog block mb-2">Visual style</label>
            <input type="text" value={form.style} onChange={(e) => setForm({ ...form, style: e.target.value })} className="w-full bg-ash border border-smoke text-bone px-4 py-3 text-base focus:outline-none focus:border-acid transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-fog block mb-2">Cadence</label>
              <select value={form.cadence} onChange={(e) => setForm({ ...form, cadence: e.target.value })} className="w-full bg-ash border border-smoke text-bone px-4 py-3 text-base focus:outline-none focus:border-acid transition-colors">
                <option value="DAILY">Daily</option><option value="TWICE_DAILY">Twice daily</option><option value="WEEKLY">Weekly</option><option value="MANUAL">Manual</option>
              </select>
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-fog block mb-2">Post time</label>
              <input type="time" value={form.postTime} onChange={(e) => setForm({ ...form, postTime: e.target.value })} className="w-full bg-ash border border-smoke text-bone px-4 py-3 text-base focus:outline-none focus:border-acid transition-colors" />
            </div>
          </div>
          {error && <div className="border border-rust bg-rust/10 text-rust p-4 font-mono text-sm">Error: {error}</div>}
          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={loading} className="bg-acid text-ink px-6 py-3 font-mono text-xs uppercase tracking-widest font-medium hover:bg-bone transition-colors disabled:opacity-50">{loading ? "Creating..." : "Create series →"}</button>
            <Link href="/dashboard" className="border border-smoke text-chalk px-6 py-3 font-mono text-xs uppercase tracking-widest hover:border-acid hover:text-acid transition-colors">Cancel</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
