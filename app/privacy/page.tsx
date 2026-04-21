import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
export default function PrivacyPage() {
  return (<><Nav /><main className="pt-32 pb-16 max-w-3xl mx-auto px-8">
    <div className="font-mono text-xs uppercase tracking-widest text-acid mb-4">Legal</div>
    <h1 className="font-display text-bone text-6xl tracking-tightest font-light mb-8">Privacy <span className="italic">policy.</span></h1>
    <p className="text-chalk leading-relaxed mb-6">Effective date: TBD · Last updated: TBD</p>
    <p className="text-chalk leading-relaxed mb-6">Contact <a href="mailto:privacy@nexusshorts.studio" className="text-acid hover:text-bone">privacy@nexusshorts.studio</a>.</p>
    <Link href="/" className="font-mono text-xs uppercase tracking-widest text-acid hover:text-bone mt-12 inline-block">← Back home</Link>
  </main><Footer /></>);
}
