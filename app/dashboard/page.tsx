import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import ExportButton from "@/components/ExportButton";
import GenerateButton from "@/components/GenerateButton";

const MOCK_INVOICES = [
  { id: "INV-2026-014", client: "Northwood & Co.", amount: 2_400, status: "Paid",   date: "Apr 24" },
  { id: "INV-2026-013", client: "Acme Studio",     amount: 1_800, status: "Paid",   date: "Apr 18" },
  { id: "INV-2026-012", client: "FluffyFox",       amount:   950, status: "Sent",   date: "Apr 12" },
  { id: "INV-2026-011", client: "Lumen Labs",      amount: 3_600, status: "Paid",   date: "Apr 04" },
  { id: "INV-2026-010", client: "Westwind",        amount:   400, status: "Draft",  date: "Apr 01" },
];

export default function DashboardPage() {
  const user = getUser();
  if (!user) redirect("/login");

  const total = MOCK_INVOICES.reduce((sum, i) => sum + i.amount, 0);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-slate-500">
            Signed in as {user.email} · plan{" "}
            <span
              className={
                user.plan === "pro"
                  ? "text-brand-700 font-medium"
                  : "text-slate-700 font-medium"
              }
            >
              {user.plan.toUpperCase()}
            </span>
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Your invoices
          </h1>
        </div>
        <div className="flex gap-2">
          <GenerateButton userPlan={user.plan} />
          <ExportButton userPlan={user.plan} />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing {MOCK_INVOICES.length} of {MOCK_INVOICES.length}
          </p>
          <p className="text-sm text-slate-700">
            Total billed:{" "}
            <span className="font-semibold">
              ${total.toLocaleString("en-US")}
            </span>
          </p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Invoice</th>
              <th className="text-left px-6 py-3 font-medium">Client</th>
              <th className="text-left px-6 py-3 font-medium">Date</th>
              <th className="text-right px-6 py-3 font-medium">Amount</th>
              <th className="text-right px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_INVOICES.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono text-slate-900">
                  {inv.id}
                </td>
                <td className="px-6 py-4 text-slate-700">{inv.client}</td>
                <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                <td className="px-6 py-4 text-right font-medium">
                  ${inv.amount.toLocaleString("en-US")}
                </td>
                <td className="px-6 py-4 text-right">
                  <span
                    className={
                      "inline-block px-2 py-0.5 rounded text-xs font-medium " +
                      (inv.status === "Paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : inv.status === "Sent"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-600")
                    }
                  >
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {user.plan === "free" ? (
        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50 p-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-brand-700">Upgrade to Pro</h3>
            <p className="text-sm text-brand-700/80 mt-1">
              Unlimited invoices, branded PDF export, bulk-generate.
            </p>
          </div>
          <a
            href="/pricing"
            className="rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium px-4 py-2 text-sm"
          >
            See plans
          </a>
        </div>
      ) : null}
    </section>
  );
}
