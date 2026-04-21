import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <Link href="/" className="flex items-center gap-3 mb-10">
        <div className="w-7 h-7 bg-acid flex items-center justify-center"><span className="font-mono text-ink text-sm font-medium">N</span></div>
        <span className="font-display text-xl text-bone tracking-tightest">nexusshorts<span className="text-acid">.studio</span></span>
      </Link>
      <div className="font-mono text-xs uppercase tracking-widest text-acid mb-2">Welcome back</div>
      <h1 className="font-display text-bone text-4xl tracking-tightest font-light mb-8">Sign <span className="italic">in.</span></h1>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" fallbackRedirectUrl="/dashboard" />
    </main>
  );
}
