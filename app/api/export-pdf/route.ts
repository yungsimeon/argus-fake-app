import { NextResponse } from "next/server";
import { getUser, requirePlan } from "@/lib/auth";

interface InvoiceLine {
  description: string;
  hours: number;
  rate: number;
}

const INVOICE_LINES: InvoiceLine[] = [
  { description: "Strategy + planning", hours: 4, rate: 200 },
  { description: "Implementation sprint", hours: 16, rate: 175 },
  { description: "QA + handover", hours: 4, rate: 150 },
];

export async function POST(): Promise<NextResponse> {
  const user = getUser();
  if (!requirePlan("pro", user)) {
    return NextResponse.json({ error: "Pro plan required" }, { status: 402 });
  }

  const subtotal = INVOICE_LINES.reduce((s, l) => s + l.hours * l.rate, 0);
  const tax = Math.round(subtotal * 0.0); // Solo founder, registered exempt
  const total = subtotal + tax;

  const number = `INV-2026-${String(Math.floor(Math.random() * 900) + 100)}`;

  return NextResponse.json({
    ok: true,
    invoice: {
      number,
      issued_to: user!.email,
      issued_at: new Date().toISOString(),
      from: { name: "PaperWorks", email: "billing@paperworks.demo" },
      lines: INVOICE_LINES,
      subtotal,
      tax,
      total,
      currency: "USD",
    },
  });
}
