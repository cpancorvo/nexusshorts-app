import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const plans = [
  {
    name: "Starter",
    code: "01",
    price: "19",
    tag: "For testing the waters",
    cta: "Get started",
    features: [
      "1 active series",
      "30 videos / month",
      "Standard voices",
      "Auto-post to 1 platform",
      "720p export",
      "Email support",
    ],
    featured: false,
  },
  {
    name: "Creator",
    code: "02",
    price: "39",
    tag: "For serious growth",
    cta: "Start creator plan",
    features: [
      "5 active series",
      "150 videos / month",
      "Premium voices + cloning",
      "Auto-post all platforms",
      "1080p export",
      "Trend-aware scripting",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Agency",
    code: "03",
    price: "69",
    tag: "For agencies & teams",
    cta: "Contact sales",
    features: [
      "Unlimited series",
      "500 videos / month",
      "Voice cloning + API access",
      "White-label exports",
      "Priority render queue",
      "Dedicated account manager",
      "Custom integrations",
    ],
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-16">
        <section className="max-w-[1400px] mx-auto px-8 mb-20">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-8 rise">
              <div className="font-mono text-xs uppercase tracking-widest text-acid mb-4">
                Chapter 03 — Pricing
              </div>
              <h1 className="font-display text-bone text-6xl md:text-8xl leading-[0.92] tracking-tightest font-light">
                Plans that <span className="italic">scale</span>{" "}
                with you.
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 flex md:items-end rise" style={{ animationDelay: "0.2s" }}>
              <p className="text-chalk text-lg leading-relaxed font-light">
                Cancel anytime. 14-day money-back. All plans include the full
                model stack — better tiers just generate more, faster.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-smoke border border-smoke">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`p-10 transition-colors ${
                  plan.featured
                    ? "bg-acid text-ink"
                    : "bg-ink text-chalk hover:bg-ash"
                }`}
              >
                <div className="flex items-baseline justify-between mb-12">
                  <div
                    className={`font-mono text-xs uppercase tracking-widest ${
                      plan.featured ? "text-ink/60" : "text-fog"
                    }`}
                  >
                    Plan {plan.code}
                  </div>
                  {plan.featured && (
                    <div className="font-mono text-[10px] uppercase tracking-widest bg-ink text-acid px-2 py-1">
                      ★ Most picked
                    </div>
                  )}
                </div>

                <h2
                  className={`font-display text-4xl mb-2 tracking-tight ${
                    plan.featured ? "text-ink" : "text-bone"
                  }`}
                >
                  {plan.name}
                </h2>
                <p
                  className={`text-sm mb-10 ${
                    plan.featured ? "text-ink/70" : "text-fog"
                  }`}
                >
                  {plan.tag}
                </p>

                <div className="flex items-baseline gap-2 mb-10 pb-10 border-b border-current/20">
                  <span className="font-display text-7xl tracking-tightest font-light">
                    ${plan.price}
                  </span>
                  <span
                    className={`font-mono text-sm ${
                      plan.featured ? "text-ink/60" : "text-fog"
                    }`}
                  >
                    /mo
                  </span>
                </div>

                <ul className="space-y-3 mb-10">
                  {plan.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-sm leading-relaxed"
                    >
                      <span
                        className={
                          plan.featured ? "text-ink" : "text-acid"
                        }
                      >
                        →
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/dashboard"
                  className={`block text-center py-4 font-mono text-xs uppercase tracking-widest transition-colors ${
                    plan.featured
                      ? "bg-ink text-acid hover:bg-smoke"
                      : "border border-smoke text-bone hover:border-acid hover:text-acid"
                  }`}
                >
                  {plan.cta} →
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-fog">
              Need more? <Link href="#" className="text-acid hover:text-bone">Custom enterprise →</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
