import Link from "next/link";
export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-ink/70 border-b border-smoke/50">
      <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-7 h-7 bg-acid flex items-center justify-center"><span className="font-mono text-ink text-sm font-medium">N</span></div>
          <span className="font-display text-xl text-bone tracking-tightest">nexusshorts<span className="text-acid">.studio</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 font-mono text-xs uppercase tracking-widest text-fog">
          <Link href="/#how" className="hover:text-bone transition-colors">01 — Process</Link>
          <Link href="/#showcase" className="hover:text-bone transition-colors">02 — Work</Link>
          <Link href="/pricing" className="hover:text-bone transition-colors">03 — Pricing</Link>
          <Link href="/dashboard" className="hover:text-bone transition-colors">04 — Dashboard</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="hidden md:block text-sm text-fog hover:text-bone transition-colors">Sign in</Link>
          <Link href="/dashboard" className="bg-acid text-ink px-4 py-2 font-mono text-xs uppercase tracking-wider font-medium hover:bg-bone transition-colors">Start free →</Link>
        </div>
      </div>
    </header>
  );
}
