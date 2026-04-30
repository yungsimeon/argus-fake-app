"use client";

interface Props {
  userPlan: "free" | "pro";
}

export default function ExportButton({ userPlan }: Props) {
  const isPro = userPlan === "pro";

  async function handleExport() {
    const r = await fetch("/api/export-pdf", { method: "POST" });
    if (r.status === 402) {
      window.location.href = "/pricing";
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
      className={
        "rounded-lg text-sm font-medium px-4 py-2 transition " +
        (isPro
          ? "bg-brand-600 hover:bg-brand-700 text-white"
          : "bg-slate-200 text-slate-500 cursor-not-allowed")
      }
    >
      {isPro ? "Export PDF" : "Export PDF (Pro)"}
    </button>
  );
}
