"use client";

import { useEffect } from "react";

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id ?? "";
  const sessionPreview = sessionId ? sessionId.slice(0, 16) + "…" : "—";

  useEffect(() => {
    // Fire Meta Pixel Purchase event — this is the conversion signal that ad
    // attribution depends on. If this doesn't run, we lose ROAS data and the
    // ads team is flying blind.
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Purchase", {
        value: 19,
        currency: "USD",
        content_name: "PaperWorks Pro",
        order_id: sessionId,
      });
    }
  }, [sessionId]);

  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <div className="inline-grid place-items-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto">
        <span className="text-3xl leading-none">✓</span>
      </div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        Welcome to Pro.
      </h1>
      <p className="mt-3 text-slate-600">
        We just emailed your receipt. Bulk export and PDF unlock are now active
        on your account.
      </p>

      <dl className="mt-10 mx-auto max-w-sm text-left rounded-2xl border border-slate-200 bg-white p-6 text-sm divide-y divide-slate-100">
        <div className="flex justify-between py-2">
          <dt className="text-slate-500">Order</dt>
          <dd className="font-mono text-slate-900">{sessionPreview}</dd>
        </div>
        <div className="flex justify-between py-2">
          <dt className="text-slate-500">Plan</dt>
          <dd className="text-slate-900 font-medium">PaperWorks Pro</dd>
        </div>
        <div className="flex justify-between py-2">
          <dt className="text-slate-500">Charged</dt>
          <dd className="text-slate-900 font-medium">$19.00 / mo</dd>
        </div>
      </dl>

      <a
        href="/dashboard"
        className="inline-block mt-10 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3"
      >
        Go to dashboard
      </a>
    </section>
  );
}
