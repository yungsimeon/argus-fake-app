"use client";

import { useState } from "react";

interface Props {
  userPlan: "free" | "pro";
}

interface Invoice {
  number: string;
  issued_to: string;
  issued_at: string;
  from: { name: string; email: string };
  lines: Array<{ description: string; hours: number; rate: number }>;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
}

export default function ExportButton({ userPlan }: Props) {
  const isPro = userPlan === "pro";
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleExport() {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/export-pdf", { method: "POST" });
      if (r.status === 402) {
        window.location.href = "/pricing";
        return;
      }
      if (!r.ok) {
        const text = await r.text().catch(() => "");
        throw new Error(text || `${r.status} ${r.statusText}`);
      }
      const data = (await r.json()) as { invoice?: Invoice };
      if (!data.invoice) throw new Error("Empty response");
      setInvoice(data.invoice);
    } catch (e) {
      setError((e as Error).message ?? "Export failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={handleExport}
        disabled={loading}
        title={isPro ? "Export to PDF" : "Free users see Pro upgrade"}
        className={
          "rounded-lg text-sm font-medium px-4 py-2 transition " +
          (loading
            ? "bg-brand-200 text-brand-700 cursor-wait"
            : isPro
              ? "bg-brand-600 hover:bg-brand-700 text-white"
              : "bg-slate-200 text-slate-500 hover:bg-slate-300")
        }
      >
        {loading ? "Exporting…" : isPro ? "Export PDF" : "Export PDF (Pro)"}
      </button>

      {invoice ? <InvoicePreview invoice={invoice} onClose={() => setInvoice(null)} /> : null}
      {error ? (
        <div className="fixed bottom-6 right-6 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3">
          {error}
        </div>
      ) : null}
    </>
  );
}

function InvoicePreview({
  invoice,
  onClose,
}: {
  invoice: Invoice;
  onClose: () => void;
}) {
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: invoice.currency,
    }).format(n);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 backdrop-blur-sm p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Invoice
            </p>
            <h2 className="mt-1 text-2xl font-semibold">{invoice.number}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-slate-400 hover:text-slate-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6 text-sm">
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wider">From</p>
            <p className="mt-1 text-slate-900">{invoice.from.name}</p>
            <p className="text-slate-500">{invoice.from.email}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wider">Issued to</p>
            <p className="mt-1 text-slate-900 break-all">{invoice.issued_to}</p>
            <p className="text-slate-500">
              {new Date(invoice.issued_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <table className="w-full mt-8 text-sm">
          <thead>
            <tr className="text-slate-500 text-xs uppercase tracking-wider">
              <th className="text-left pb-2 font-medium">Description</th>
              <th className="text-right pb-2 font-medium">Hours</th>
              <th className="text-right pb-2 font-medium">Rate</th>
              <th className="text-right pb-2 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoice.lines.map((l, i) => (
              <tr key={i}>
                <td className="py-2">{l.description}</td>
                <td className="py-2 text-right">{l.hours}</td>
                <td className="py-2 text-right">{fmt(l.rate)}</td>
                <td className="py-2 text-right font-medium">
                  {fmt(l.hours * l.rate)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="pt-4 text-right text-slate-500">
                Subtotal
              </td>
              <td className="pt-4 text-right">{fmt(invoice.subtotal)}</td>
            </tr>
            <tr>
              <td colSpan={3} className="text-right text-slate-500">
                Tax
              </td>
              <td className="text-right">{fmt(invoice.tax)}</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td colSpan={3} className="pt-3 text-right font-semibold">
                Total
              </td>
              <td className="pt-3 text-right font-semibold text-lg">
                {fmt(invoice.total)}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="mt-8 inline-block rotate-[-12deg] border-2 border-emerald-500 text-emerald-600 px-4 py-1 rounded font-bold text-sm tracking-widest">
          PAID
        </div>
      </div>
    </div>
  );
}
