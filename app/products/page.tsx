export const metadata = {
  title: "PaperWorks — what's next",
};

const ROADMAP = [
  {
    title: "Recurring invoices",
    body: "Set a schedule, walk away. Auto-send the same invoice every Mon, every 1st, every quarter.",
  },
  {
    title: "Multi-currency totals",
    body: "Auto-convert at the going rate. Totals on the invoice always match the receipt.",
  },
  {
    title: "QuickBooks sync",
    body: "Push every paid invoice into your books on settle. No CSV exports, no tagging.",
  },
];

export default function ProductsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
        What we're building next
      </h1>
      <p className="mt-4 text-slate-600">
        Nothing here is live yet. Sign up to be the first to hear when each
        one ships.
      </p>

      <ul className="mt-12 space-y-6">
        {ROADMAP.map((r) => (
          <li
            key={r.title}
            className="rounded-2xl border border-slate-200 bg-white p-6"
          >
            <h2 className="font-semibold text-lg">{r.title}</h2>
            <p className="mt-1 text-slate-600 leading-relaxed">{r.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
