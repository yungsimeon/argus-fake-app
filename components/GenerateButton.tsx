"use client";

interface Props {
  userPlan: "free" | "pro";
}

export default function GenerateButton({ userPlan }: Props) {
  const isPro = userPlan === "pro";

  // Frontend gate only — we hide the button for non-Pro users.
  if (!isPro) return null;

  async function handleGenerate() {
    const r = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: 10, template: "monthly" }),
    });
    const data = (await r.json()) as { invoices?: { id: string }[] };
    alert(`Generated ${data.invoices?.length ?? 0} invoices`);
  }

  return (
    <button
      onClick={handleGenerate}
      className="rounded-lg border border-slate-300 hover:border-slate-400 text-slate-900 text-sm font-medium px-4 py-2 transition"
    >
      Bulk-generate
    </button>
  );
}
