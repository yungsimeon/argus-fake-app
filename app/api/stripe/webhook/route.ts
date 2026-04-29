import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_dummy", {
  apiVersion: "2024-06-20",
});

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? "whsec_dummy";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const sig = req.headers.get("stripe-signature") ?? "";
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    // In the real app we'd flip the user's plan to 'pro' here.
    console.log("[stripe-webhook] checkout completed", session.id);
  }

  return NextResponse.json({ received: true });
}
