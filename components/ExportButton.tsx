"use client";

interface Props {
  userPlan: "free" | "pro";
}

export default function ExportButton({ userPlan }: Props) {
  const isPro = userPlan === "pro";

  async function handleExport() {
    const r = await fetch("/api/export-pdf", { method: "POST" });
    if (r.status === 402) {
      window.location.href = "/checkout";
      return;
    }
    const data = (await r.json()) as { download_url?: string };
    if (data.download_url) window.location.href = data.download_url;
  }

  return (
    <button
      onClick={handleExport}
      disabled={!isPro}
      title={isPro ? "Export to PDF" : "Pro plan required"}
      style={{
        background: isPro ? "#4f46e5" : "#cbd5e1",
        color: "white",
        padding: "8px 16px",
        borderRadius: 6,
        border: "none",
        cursor: isPro ? "pointer" : "not-allowed",
      }}
    >
      {isPro ? "Export PDF" : "Export PDF (Pro only)"}
    </button>
  );
}
