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
      style={{
        background: "#4f46e5",
        color: "white",
        padding: "8px 16px",
        borderRadius: 6,
        border: "none",
        cursor: "pointer",
      }}
    >
      Bulk-generate (Pro)
    </button>
  );
}
