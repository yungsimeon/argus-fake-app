"use client";

import Link from "next/link";

const FEATURES = [
  {
    title: "One-line invoices",
    body: "Write what you billed for. PaperWorks turns it into a clean, branded PDF in seconds.",
  },
  {
    title: "Bulk-generate end-of-month",
    body: "Drop a CSV, get back 200 individual invoices. No spreadsheets, no copy-pasting (Pro).",
  },
  {
    title: "Email + remind",
    body: "Auto-send the moment you click Done. Polite reminders fire on day 7, 14, 30.",
  },
  {
    title: "Multi-currency totals",
    body: "Auto-convert on send at the going rate. Totals always match the receipt (Pro).",
  },
];

const TESTIMONIALS = [
  { who: "Marc — solo dev consultant", words: "Replaced my janky Notion template. End-of-month went from 3 hours to 8 minutes." },
  { who: "Lina — freelance copywriter", words: "I send 40 invoices a month. PaperWorks does it while I'm having coffee." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 text-center">
        <p className="inline-block rounded-full bg-brand-50 text-brand-700 text-xs font-medium px-3 py-1">
          New · Bulk export with one CSV upload
        </p>
        <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
          Invoices in seconds.<br />
          <span className="text-brand-600">Not on weekends.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
          PaperWorks generates, exports, and emails clean invoices for solo
          founders. Pro unlocks PDF export and bulk generation.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <Link
            href="/checkout"
            className="rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3 transition"
          >
            Buy Pro · $19/mo
          </Link>
          <Link
            href="/#features"
            className="rounded-lg border border-slate-300 hover:border-slate-400 text-slate-900 font-medium px-6 py-3 transition"
          >
            See features
          </Link>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          7-day free trial · cancel any time · no card to start
        </p>
      </section>

      {/* Logo strip */}
      <section className="mx-auto max-w-6xl px-6 -mt-8 pb-16">
        <p className="text-center text-xs uppercase tracking-widest text-slate-500">
          Used by 1,200+ solo founders
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-8 text-slate-400 text-sm font-medium opacity-80">
          <span>Acme Studio</span>
          <span>Northwood &amp; Co.</span>
          <span>Linear-ish</span>
          <span>Lumen Labs</span>
          <span>FluffyFox</span>
          <span>Westwind</span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Built to disappear into your week
          </h2>
          <p className="mt-4 text-slate-600">
            Every feature exists for one reason: get this off your plate.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.who}
              className="rounded-2xl border border-slate-200 p-8 bg-slate-50"
            >
              <blockquote className="text-lg text-slate-800 leading-relaxed">
                "{t.words}"
              </blockquote>
              <figcaption className="mt-4 text-sm text-slate-500">
                — {t.who}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Try Pro free for 7 days.</h2>
        <p className="mt-4 text-slate-600">
          You'll know within the first end-of-month.
        </p>
        <Link
          href="/pricing"
          className="inline-block mt-8 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3"
        >
          See plans
        </Link>
      </section>
    </>
  );
}
