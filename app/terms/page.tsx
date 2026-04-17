import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-16 max-w-3xl mx-auto px-8">
        <div className="font-mono text-xs uppercase tracking-widest text-acid mb-4">
          Legal
        </div>
        <h1 className="font-display text-bone text-6xl tracking-tightest font-light mb-8">
          Terms of <span className="italic">service.</span>
        </h1>
        <p className="text-chalk leading-relaxed mb-6">
          Effective date: TBD · Last updated: TBD
        </p>
        <p className="text-chalk leading-relaxed mb-6">
          The full terms text is provided as a separate markdown document
          (<code className="font-mono text-acid text-sm">03-terms-of-service.md</code>).
          Have a lawyer review and customize it for your jurisdiction before
          publishing the final version here.
        </p>
        <p className="text-chalk leading-relaxed mb-6">
          For legal questions, contact{" "}
          <a href="mailto:legal@nexusshorts.studio" className="text-acid hover:text-bone">
            legal@nexusshorts.studio
          </a>.
        </p>
        <Link href="/" className="font-mono text-xs uppercase tracking-widest text-acid hover:text-bone mt-12 inline-block">
          ← Back home
        </Link>
      </main>
      <Footer />
    </>
  );
}
