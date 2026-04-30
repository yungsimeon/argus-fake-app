"use client";

import Link from "next/link";

const FREE_FEATURES = [
  "5 invoices / month",
  "AI-generated line items",
  "Send via email",
  "Standard reminders",
];

const PRO_FEATURES = [
  "Unlimited invoices",
  "Branded PDF export",
  "Bulk-generate from CSV",
  "Multi-currency totals",
  "Priority support",
];

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Simple, fair pricing.
        </h1>
        <p className="mt-4 text-slate-600">
          Start free. Upgrade once you've sent a handful and felt the difference.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Free */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h3 className="font-semibold text-lg">Free</h3>
          <p className="mt-1 text-slate-500 text-sm">Forever, for tiny teams</p>
          <p className="mt-6 text-4xl font-semibold">
            $0<span className="text-base text-slate-500 font-normal">/mo</span>
          </p>
          <Link
            href="/login"
            className="mt-6 block rounded-lg border border-slate-300 hover:border-slate-400 text-slate-900 font-medium px-4 py-2 text-center"
          >
            Start free
          </Link>
          <ul className="mt-8 space-y-2 text-sm text-slate-700">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="text-brand-600 mt-0.5">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro */}
        <div className="rounded-2xl border-2 border-brand-600 bg-white p-8 relative shadow-lg">
          <span className="absolute -top-3 left-6 bg-brand-600 text-white text-xs font-medium px-2 py-0.5 rounded">
            Most popular
          </span>
          <h3 className="font-semibold text-lg">Pro</h3>
          <p className="mt-1 text-slate-500 text-sm">For everyone past their 6th invoice</p>
          <p className="mt-6 text-4xl font-semibold">
            $19<span className="text-base text-slate-500 font-normal">/mo</span>
          </p>
          <Link
            href="/checkout"
            className="mt-6 block rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium px-4 py-2 text-center"
          >
            Start 7-day trial
          </Link>
          <ul className="mt-8 space-y-2 text-sm text-slate-700">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="text-brand-600 mt-0.5">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-center text-xs text-slate-500 mt-10">
        Prices in USD. Cancel any time.
      </p>
    </section>
  );
}
