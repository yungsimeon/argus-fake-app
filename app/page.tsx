"use client";

import Link from "next/link";

export default function HomePage() {
  function trackBuyClick() {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "AddToCart", {
        content_name: "PaperWorks Pro",
        value: 19,
        currency: "USD",
      });
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: "80px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: 48, lineHeight: 1.1, margin: 0 }}>
        Invoices in seconds.
      </h1>
      <p style={{ fontSize: 20, color: "#475569", marginTop: 16 }}>
        PaperWorks generates, exports and emails clean invoices for solo
        founders. Pro unlocks PDF export and bulk generation.
      </p>

      <div style={{ marginTop: 40, display: "flex", gap: 12 }}>
        <Link
          href="/checkout"
          onClick={trackBuyClick}
          style={{
            background: "#4f46e5",
            color: "white",
            padding: "12px 24px",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Buy Pro — $19/mo
        </Link>
        <Link
          href="#features"
          style={{
            color: "#0f172a",
            padding: "12px 24px",
            border: "1px solid #cbd5e1",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          See features
        </Link>
      </div>

      <section id="features" style={{ marginTop: 80 }}>
        <h2 style={{ fontSize: 24 }}>What's included</h2>
        <ul style={{ marginTop: 16, lineHeight: 1.8 }}>
          <li>Generate invoices from a one-line prompt</li>
          <li>Export to branded PDF (Pro)</li>
          <li>Bulk-generate end-of-month batches (Pro)</li>
        </ul>
      </section>
    </main>
  );
}
