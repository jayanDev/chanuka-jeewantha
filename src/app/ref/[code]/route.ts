import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(request: Request, props: { params: Promise<{ code: string }> }) {
  const params = await props.params;
  const referralCode = String(params.code ?? "").trim().toUpperCase();

  if (!referralCode) {
    return NextResponse.redirect(new URL("/pricing", request.url));
  }

  try {
    const affiliate = await prisma.affiliateProfile.findUnique({
      where: { referralCode }
    });

    if (affiliate) {
      // Increment clicks (fire and forget)
      await prisma.affiliateProfile.update({
        where: { id: affiliate.id },
        data: { totalClicks: { increment: 1 } }
      });

      // Set cookie for 30 days
      const resolvedCookies = await cookies();
      resolvedCookies.set("referred_by", referralCode, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      });
    }
  } catch (error) {
    console.error("Referral tracking error:", error);
  }

  // Redirect visitors to the pricing page to continue conversion flow.
  const url = new URL("/pricing", request.url);
  return NextResponse.redirect(url);
}
