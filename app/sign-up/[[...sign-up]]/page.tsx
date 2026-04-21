import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
export default function SignUpPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <Link href="/" className="flex items-center gap-3 mb-10">
        <div className="w-7 h-7 bg-acid flex items-center justify-center"><span className="font-mono text-ink text-sm font-medium">N</span></div>
        <span className="font-display text-xl text-bone tracking-tightest">nexusshorts<span className="text-acid">.studio</span></span>
      </Link>
      <div className="font-mono text-xs uppercase tracking-widest text-acid mb-2">Your first 3 reels are free</div>
      <h1 className="font-display text-bone text-4xl tracking-tightest font-light mb-8">Begin <span className="italic">here.</span></h1>
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" fallbackRedirectUrl="/dashboard" />
    </main>
  );
}
