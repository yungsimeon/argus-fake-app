"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/checkout", { method: "POST" })
      .then(async (r) => {
        if (!r.ok) {
          const text = await r.text();
          throw new Error(text || `${r.status} ${r.statusText}`);
        }
        return r.json() as Promise<{ url?: string }>;
      })
      .then((data) => {
        if (data.url) window.location.href = data.url;
        else setError("Checkout session created but no URL returned");
      })
      .catch((e: Error) => {
        setError(e.message ?? "Could not start checkout");
      });
  }, []);

  return (
    <section className="mx-auto max-w-md px-6 py-32 text-center">
      {!error ? (
        <>
          <div className="inline-block w-10 h-10 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
          <h1 className="mt-6 text-2xl font-semibold">Redirecting to checkout…</h1>
          <p className="mt-2 text-slate-600 text-sm">
            You'll be sent to Stripe in a moment.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-rose-700">
            Couldn't start checkout
          </h1>
          <p className="mt-2 text-slate-600 text-sm break-all">{error}</p>
          <a
            href="/pricing"
            className="inline-block mt-6 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium px-4 py-2"
          >
            Back to pricing
          </a>
        </>
      )}
    </section>
  );
}
