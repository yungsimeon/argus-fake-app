"use client";

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id ?? "";

  return (
    <main
      style={{
        maxWidth: 480,
        margin: "120px auto",
        padding: "0 24px",
        textAlign: "center",
      }}
    >
      <h1>You're in. Welcome to Pro.</h1>
      <p style={{ color: "#475569", marginTop: 16 }}>
        We just emailed your receipt
        {sessionId ? ` for order ${sessionId.slice(0, 12)}…` : ""}. Bulk export
        and PDF unlock are now active on your account.
      </p>
      <a
        href="/dashboard"
        style={{
          display: "inline-block",
          marginTop: 32,
          background: "#4f46e5",
          color: "white",
          padding: "12px 24px",
          borderRadius: 8,
          textDecoration: "none",
        }}
      >
        Go to dashboard
      </a>
    </main>
  );
}
