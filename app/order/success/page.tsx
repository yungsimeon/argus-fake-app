"use client";

import { useEffect, useState } from "react";

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id ?? "";
  const sessionPreview = sessionId ? sessionId.slice(0, 16) + "…" : "—";
  const [verifying, setVerifying] = useState(Boolean(sessionId));

  // Run the post-checkout side effects in one place: verify the Stripe
  // session (which flips the user's plan cookie), and only fire the Meta
  // Pixel Purchase event once verification has confirmed the payment.
  // Promise.all keeps the side effects in lockstep so we don't fire a
  // Purchase event for a session that turned out not to be paid.
  useEffect(() => {
    if (!sessionId) return;
    Promise.all([
      fetch("/api/checkout/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      }),
    ])
      .then(() => {
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Purchase", {
            value: 19,
            currency: "USD",
            content_name: "PaperWorks Pro",
            order_id: sessionId,
          });
        }
      })
      .finally(() => setVerifying(false));
  }, [sessionId]);
  //
  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <div className="inline-grid place-items-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto">
        <span className="text-3xl leading-none">✓</span>
      </div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        Welcome to Pro.
      </h1>
      <p className="mt-3 text-slate-600">
        {verifying
          ? "Activating your plan…"
          : "We just emailed your receipt. Bulk export and PDF unlock are now active on your account."}
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
