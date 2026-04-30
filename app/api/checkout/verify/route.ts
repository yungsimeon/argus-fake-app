import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_dummy", {
  apiVersion: "2024-06-20",
});

// Called by /order/success after Stripe redirects the user back. We trust
// Stripe as the source of truth: retrieve the session, confirm it was paid,
// and only then flip the user's plan cookie to "pro". No DB needed for the
// PoC — Stripe is the persistent record, the cookie is just our session
// flag.
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json().catch(() => ({}))) as { session_id?: string };
  const sessionId = body.session_id;
  if (!sessionId) {
    return NextResponse.json({ ok: false, error: "missing session_id" }, { status: 400 });
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.json({ ok: false, error: "session not found" }, { status: 404 });
  }

  if (session.payment_status !== "paid") {
    return NextResponse.json({ ok: false, error: "session not paid" }, { status: 402 });
  }

  const res = NextResponse.json({ ok: true, plan: "pro" });
  // Use the customer email as the user_id when set, otherwise reuse whatever
  // is already on the cookie (or generate one if there is none).
  const customerEmail = (session.customer_details?.email ?? "").toLowerCase();
  const fallbackId = req.cookies.get("user_id")?.value ?? `pro-${Date.now()}`;
  res.cookies.set("user_id", customerEmail || fallbackId, { path: "/" });
  res.cookies.set("user_plan", "pro", { path: "/" });
  return res;
}
