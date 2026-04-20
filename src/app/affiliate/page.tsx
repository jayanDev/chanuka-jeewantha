import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { getServerUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { getBaseUrl } from "@/lib/site-url";
import AffiliateDashboardClient from "./_components/AffiliateDashboardClient";

export const metadata = buildPageMetadata({
  title: "Campus Affiliate Network | Earn Free CV Packages",
  description: "Join the Chanuka Jeewantha campus affiliate program. Refer friends and earn free ATS CV packages, Cover Letters, and Career Ebooks.",
  path: "/affiliate",
  keywords: ["affiliate program", "earn free cv", "campus ambassador sri lanka", "career affiliate"],
});

function sanitizeReferralSeed(value: string): string {
  const normalized = value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8);

  return normalized || "CHANUKA";
}

async function ensureAffiliateProfile(user: { id: string; name: string; email: string }) {
  const existing = await prisma.affiliateProfile.findUnique({
    where: { userId: user.id },
    select: {
      id: true,
      referralCode: true,
      totalClicks: true,
      successfulReferrals: true,
    },
  });

  if (existing) {
    return existing;
  }

  const seed = sanitizeReferralSeed(user.name || user.email);
  const fallbackSeed = sanitizeReferralSeed(user.email);

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const suffix = attempt === 0 ? "" : String(Math.floor(100 + Math.random() * 900));
    const referralCode = `${seed}${suffix}`.slice(0, 12) || `${fallbackSeed}${suffix}`.slice(0, 12);

    try {
      return await prisma.affiliateProfile.create({
        data: {
          userId: user.id,
          referralCode,
        },
        select: {
          id: true,
          referralCode: true,
          totalClicks: true,
          successfulReferrals: true,
        },
      });
    } catch {
      // Retry on referral code collisions.
    }
  }

  return prisma.affiliateProfile.create({
    data: {
      userId: user.id,
      referralCode: `${fallbackSeed}${Date.now().toString().slice(-3)}`.slice(0, 12),
    },
    select: {
      id: true,
      referralCode: true,
      totalClicks: true,
      successfulReferrals: true,
    },
  });
}

export default async function AffiliatePage() {
  const user = await getServerUser();
  const baseUrl = getBaseUrl();
  const profile = user
    ? await ensureAffiliateProfile({ id: user.id, name: user.name, email: user.email })
    : null;
  const activity = profile
    ? await prisma.referralTransaction.findMany({
        where: { affiliateProfileId: profile.id },
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          id: true,
          referredEmail: true,
          packageName: true,
          createdAt: true,
        },
      })
    : [];

  return (
    <>
      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-[72px] sm:text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none">
                AFFILIATE NETWORK
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Affiliate Network</span>
          </div>

          <h1 className="font-plus-jakarta text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] max-w-4xl !text-white">
            Help friends succeed. <span className="text-brand-main">Earn Free Packages.</span>
          </h1>
          <p className="mt-6 text-text-light text-[16px] sm:text-[18px] max-w-2xl leading-relaxed">
            Share your unique referral link with university batchmates. The more friends you help pass ATS filters,
            the faster your rewards grow.
          </p>
        </div>
      </section>

      {/* Main Dashboard Layout */}
 <section className="w-full py-16 bg-zinc-50 relative border-t border-zinc-200">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-[1000px]">
            {profile ? (
              <AffiliateDashboardClient
                profile={profile}
                baseUrl={baseUrl}
                activity={activity.map((item) => ({
                  id: item.id,
                  referredEmail: item.referredEmail,
                  packageName: item.packageName,
                  createdAt: item.createdAt.toISOString(),
                }))}
              />
            ) : (
 <div className="rounded-[24px] border border-zinc-200 bg-white p-8 text-center shadow-sm">
                <h2 className="text-[28px] font-bold font-plus-jakarta text-foreground">Sign in to activate your affiliate dashboard</h2>
                <p className="mt-3 text-text-body">
                  Your unique referral code and live performance metrics are available after authentication.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/auth/signin?returnTo=%2Faffiliate"
                    className="inline-flex items-center justify-center rounded-[10px] bg-brand-main px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup?returnTo=%2Faffiliate"
 className="inline-flex items-center justify-center rounded-[10px] border border-zinc-300 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* FAQ / Rules */}
 <section id="how-it-works" className="w-full py-16 bg-white border-t border-zinc-200">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 text-center">
          <div className="mx-auto max-w-[800px]">
          <h2 className="text-[28px] font-bold font-plus-jakarta text-foreground mb-4">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-main/10 text-brand-dark flex items-center justify-center font-bold text-xl mb-4">1</div>
              <h3 className="font-bold text-lg mb-2">Get Your Link</h3>
              <p className="text-zinc-500 text-sm">Copy your unique tracking link from the dashboard above.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-main/10 text-brand-dark flex items-center justify-center font-bold text-xl mb-4">2</div>
              <h3 className="font-bold text-lg mb-2">Share & Track</h3>
              <p className="text-zinc-500 text-sm">Share it in WhatsApp groups. When they buy a package within 30 days, you get a point.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-main/10 text-brand-dark flex items-center justify-center font-bold text-xl mb-4">3</div>
              <h3 className="font-bold text-lg mb-2">Unlock Rewards</h3>
              <p className="text-zinc-500 text-sm">Hit 10 points for a Free Student CV, or 20 points for a Starter Package.</p>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
