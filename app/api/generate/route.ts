import { NextRequest, NextResponse } from "next/server";

// Bulk-generate invoices. Marketed as a Pro feature.
// (No server-side plan check here — the frontend hides the button for
// non-Pro users, and that's it. A direct POST works regardless of plan.)
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json().catch(() => ({}))) as {
    count?: number;
    template?: string;
  };

  const count = Math.max(1, Math.min(body.count ?? 1, 50));
  const template = body.template ?? "default";

  const invoices = Array.from({ length: count }, (_, i) => ({
    id: `inv-${Date.now()}-${i}`,
    template,
  }));

  return NextResponse.json({ ok: true, invoices });
}
