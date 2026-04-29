import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_dummy", {
  apiVersion: "2024-06-20",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function POST(): Promise<NextResponse> {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          recurring: { interval: "month" },
          product_data: { name: "PaperWorks Pro" },
          unit_amount: 1900,
        },
        quantity: 1,
      },
    ],
    success_url: `${APP_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${APP_URL}/`,
  });

  return NextResponse.json({ url: session.url });
}
