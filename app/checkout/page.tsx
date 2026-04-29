"use client";

import { useEffect } from "react";

export default function CheckoutPage() {
  useEffect(() => {
    fetch("/api/checkout", { method: "POST" })
      .then((r) => r.json())
      .then((data: { url?: string }) => {
        if (data.url) window.location.href = data.url;
      })
      .catch(() => {
        /* noop — surface in real version */
      });
  }, []);

  return (
    <main
      style={{
        maxWidth: 480,
        margin: "120px auto",
        padding: "0 24px",
        textAlign: "center",
      }}
    >
      <h1>Redirecting to checkout…</h1>
      <p style={{ color: "#475569" }}>
        You'll be sent to Stripe in a moment.
      </p>
    </main>
  );
}
