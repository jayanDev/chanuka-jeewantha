"use client";

import { useMemo, useState } from "react";

type AffiliateProfile = {
  referralCode: string;
  totalClicks: number;
  successfulReferrals: number;
};

type AffiliateActivity = {
  id: string;
  referredEmail: string;
  packageName: string;
  createdAt: string;
};

type AffiliateDashboardClientProps = {
  profile: AffiliateProfile;
  baseUrl: string;
  activity: AffiliateActivity[];
};

export default function AffiliateDashboardClient({ profile, baseUrl, activity }: AffiliateDashboardClientProps) {
  const [copied, setCopied] = useState(false);
  const resolvedBaseUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return baseUrl;
    }

    const origin = window.location.origin;
    if (!baseUrl) {
      return origin;
    }

    // In development, avoid mismatched localhost ports from env defaults.
    if (baseUrl.includes("localhost") && origin.includes("localhost") && !baseUrl.includes(origin)) {
      return origin;
    }

    return baseUrl;
  }, [baseUrl]);

  const referralLink = `${resolvedBaseUrl.replace(/\/$/, "")}/ref/${profile.referralCode}`;

  const fallbackCopy = (value: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };
  
  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(referralLink);
      } else {
        fallbackCopy(referralLink);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      try {
        fallbackCopy(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        console.error(err);
      }
    }
  };

  const studentTarget = 10;
  const starterTarget = 20;

  const currentScore = profile.successfulReferrals;
  return (
    <div className="bg-white rounded-[24px] shadow-xl p-8 md:p-12 border border-zinc-200">
      
      {/* 1. Share Link Section */}
      <div className="mb-16">
        <h2 className="text-xl font-bold font-plus-jakarta mb-4">Your Unique Tracking Link</h2>
        <div className="flex flex-col sm:flex-row items-stretch gap-4">
          <div className="flex-grow bg-zinc-50 border-2 border-zinc-200 rounded-[12px] px-6 py-4 flex items-center overflow-x-auto custom-scrollbar">
            <span className="font-mono text-zinc-600 font-semibold whitespace-nowrap">{referralLink}</span>
          </div>
          <button 
            onClick={handleCopy}
            className={`px-8 py-4 rounded-[12px] font-bold transition-all whitespace-nowrap flex items-center justify-center gap-2 ${
              copied ? 'bg-green-500 text-white' : 'bg-brand-main text-white hover:bg-brand-dark'
            }`}
          >
            {copied ? (
              <><span>✓</span> Copied!</>
            ) : (
              <>Copy Link</>
            )}
          </button>
        </div>
      </div>

      {/* 2. Top Level Metrics */}
      <div className="grid grid-cols-2 gap-6 mb-16">
        <div className="bg-zinc-50 border border-zinc-200 rounded-[16px] p-6 text-center">
          <p className="text-zinc-500 font-bold uppercase tracking-wider text-xs mb-2">Total Link Clicks</p>
          <p className="text-[40px] font-bold font-plus-jakarta text-foreground leading-none">{profile.totalClicks}</p>
        </div>
        <div className="bg-brand-main/5 border border-brand-main/20 rounded-[16px] p-6 text-center">
          <p className="text-brand-dark font-bold uppercase tracking-wider text-xs mb-2">Total Referrals (Sales)</p>
          <p className="text-[40px] font-bold font-plus-jakarta text-brand-main leading-none">{currentScore}</p>
        </div>
      </div>

      {/* 3. The Gamified Progress Engine */}
      <div className="mb-16">
        <h2 className="text-xl font-bold font-plus-jakarta mb-6 border-b border-zinc-100 pb-4">Affiliate Activity</h2>
        {activity.length === 0 ? (
          <div className="rounded-[14px] border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
            No referral conversions yet. Share your tracking link to start earning rewards.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[14px] border border-zinc-200">
            <table className="min-w-full divide-y divide-zinc-200 text-sm">
              <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Referred Email</th>
                  <th className="px-4 py-3 font-semibold">Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white text-zinc-700">
                {activity.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(row.createdAt).toLocaleString("en-LK", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-4 py-3">{row.referredEmail}</td>
                    <td className="px-4 py-3">{row.packageName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="space-y-12">
        <h2 className="text-xl font-bold font-plus-jakarta mb-6 border-b border-zinc-100 pb-4">Milestone Rewards Tracker</h2>
        
        {/* Student Package Tracker */}
        <div className="relative">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="font-bold text-lg text-foreground block">Free Student CV Package</span>
              <span className="text-sm text-zinc-500 font-medium">Earn 10 point{currentScore !== 1 ? 's' : ''} to unlock</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold font-plus-jakarta text-brand-dark">{currentScore}</span>
              <span className="text-zinc-400 font-bold">/{studentTarget}</span>
            </div>
          </div>
          
          <div className="mb-4">
            <progress
              max={studentTarget}
              value={Math.min(currentScore, studentTarget)}
              className="h-8 w-full overflow-hidden rounded-full border border-zinc-200 bg-zinc-100 [&::-webkit-progress-bar]:bg-zinc-100 [&::-webkit-progress-value]:bg-gradient-to-r [&::-webkit-progress-value]:from-brand-main [&::-webkit-progress-value]:to-brand-dark [&::-moz-progress-bar]:bg-brand-main"
            />
          </div>

          <div className="flex justify-end">
             {currentScore >= studentTarget ? (
               <button className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full text-sm shadow-md transition-transform hover:scale-105">
                 Claim Reward Now
               </button>
             ) : (
               <button disabled className="px-6 py-2.5 bg-zinc-200 text-zinc-400 font-bold rounded-full text-sm cursor-not-allowed">
                 {studentTarget - currentScore} more to go
               </button>
             )}
          </div>
        </div>

        {/* Starter Package Tracker */}
        <div className="relative">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="font-bold text-lg text-foreground block">Free Starter CV Package</span>
              <span className="text-sm text-zinc-500 font-medium">Earn 20 point{currentScore !== 1 ? 's' : ''} to unlock</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold font-plus-jakarta text-brand-dark">{currentScore}</span>
              <span className="text-zinc-400 font-bold">/{starterTarget}</span>
            </div>
          </div>
          
          <div className="mb-4">
            <progress
              max={starterTarget}
              value={Math.min(currentScore, starterTarget)}
              className="h-8 w-full overflow-hidden rounded-full border border-zinc-200 bg-zinc-100 [&::-webkit-progress-bar]:bg-zinc-100 [&::-webkit-progress-value]:bg-gradient-to-r [&::-webkit-progress-value]:from-yellow-400 [&::-webkit-progress-value]:to-amber-500 [&::-moz-progress-bar]:bg-amber-500"
            />
          </div>

          <div className="flex justify-end">
             {currentScore >= starterTarget ? (
               <button className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full text-sm shadow-md transition-transform hover:scale-105">
                 Claim Reward Now
               </button>
             ) : (
               <button disabled className="px-6 py-2.5 bg-zinc-200 text-zinc-400 font-bold rounded-full text-sm cursor-not-allowed">
                 {starterTarget - currentScore} more to go
               </button>
             )}
          </div>
        </div>

      </div>

    </div>
  );
}
