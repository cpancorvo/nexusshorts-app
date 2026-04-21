import Link from "next/link";
export function Footer() {
  return (
    <footer className="border-t border-smoke mt-32">
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-acid flex items-center justify-center"><span className="font-mono text-ink text-sm font-medium">N</span></div>
              <span className="font-display text-xl text-bone tracking-tightest">nexusshorts<span className="text-acid">.studio</span></span>
            </div>
            <p className="text-fog text-sm max-w-xs leading-relaxed">An automated film studio that fits in a browser tab. Built for creators who would rather not be on camera.</p>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-acid mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-chalk">
              <li><Link href="/#how" className="hover:text-acid transition-colors">How it works</Link></li>
              <li><Link href="/pricing" className="hover:text-acid transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-acid transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-acid mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-chalk">
              <li><Link href="#" className="hover:text-acid transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-acid transition-colors">Changelog</Link></li>
              <li><Link href="#" className="hover:text-acid transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-acid mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-chalk">
              <li><Link href="/privacy" className="hover:text-acid transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-acid transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-smoke pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="font-mono text-xs text-fog">© 2026 NexusShorts Labs Inc.</div>
          <div className="font-mono text-xs text-fog flex items-center gap-2"><span className="w-2 h-2 bg-acid rounded-full pulse-dot"></span>All systems operational</div>
        </div>
      </div>
    </footer>
  );
}
