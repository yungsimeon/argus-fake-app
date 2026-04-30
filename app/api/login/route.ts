import { NextRequest, NextResponse } from "next/server";

// Demo auth — a real app would issue a session JWT or set a signed cookie
// after verifying credentials. Here we just take whatever plan the form
// posts ("free" or "pro") and store it in two readable cookies.

export async function POST(req: NextRequest): Promise<NextResponse> {
  const form = await req.formData();
  const planRaw = String(form.get("plan") ?? "free");
  const plan = planRaw === "pro" ? "pro" : "free";
  const userId = `demo-user-${Math.random().toString(36).slice(2, 8)}`;

  const url = new URL("/dashboard", req.url);
  const res = NextResponse.redirect(url, { status: 303 });
  res.cookies.set("user_id", userId, { path: "/", httpOnly: false });
  res.cookies.set("user_plan", plan, { path: "/", httpOnly: false });

  if (plan === "pro") {
    // Standard event Meta uses to model account-creation conversions.
    // (Fired client-side too in a real app — this is just a server-side hint.)
  }

  return res;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  return NextResponse.redirect(new URL("/login", req.url));
}
