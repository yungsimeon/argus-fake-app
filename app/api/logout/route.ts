import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const res = NextResponse.redirect(new URL("/", req.url), { status: 303 });
  res.cookies.delete("user_id");
  res.cookies.delete("user_plan");
  return res;
}
