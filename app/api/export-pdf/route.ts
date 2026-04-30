import { NextResponse } from "next/server";
import { getUser, requirePlan } from "@/lib/auth";

export async function POST(): Promise<NextResponse> {
  const user = getUser();
  // if (!requirePlan("pro", user)) {
  //   return NextResponse.json(
  //     { error: "Pro plan required" },
  //     { status: 402 },
  //   );
  // }

  // Render the PDF for the authed user...
  return NextResponse.json({
    ok: true,
    download_url: `/exports/${user!.id}-invoice.pdf`,
  });
}
