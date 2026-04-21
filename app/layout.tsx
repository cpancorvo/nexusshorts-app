import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexusShorts — Faceless reels on autopilot",
  description: "AI writes, voices, edits, and posts short-form video to TikTok, Instagram, and YouTube while you sleep.",
  openGraph: { title: "NexusShorts — Faceless reels on autopilot", description: "AI-generated faceless videos, posted automatically.", url: "https://nexusshorts.studio", siteName: "NexusShorts", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "#d4ff3a", colorBackground: "#0c0c0a", colorText: "#d4d2c8", colorInputBackground: "#1a1a17", colorInputText: "#f4f1ea", borderRadius: "0px", fontFamily: '"Inter Tight", system-ui, sans-serif' }, elements: { formButtonPrimary: "bg-acid text-ink hover:bg-bone font-mono uppercase tracking-wider text-xs", card: "bg-ash border border-smoke", headerTitle: "font-display text-bone", socialButtonsBlockButton: "border-smoke text-chalk hover:border-acid" } }}>
      <html lang="en"><body className="min-h-screen">{children}</body></html>
    </ClerkProvider>
  );
}
