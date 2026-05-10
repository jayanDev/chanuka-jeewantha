"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ProfilePayload = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  whatsappNumber: string;
  linkedinUrl: string;
  timezone: string;
  receiveOfferAlerts: boolean;
  receiveOrderAlerts: boolean;
};

async function readJsonSafely(response: Response): Promise<Record<string, unknown>> {
  const raw = await response.text();
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export default function ProfilePageClient() {
  const [profile, setProfile] = useState<ProfilePayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [timezone, setTimezone] = useState("Asia/Colombo");
  const [receiveOfferAlerts, setReceiveOfferAlerts] = useState(true);
  const [receiveOrderAlerts, setReceiveOrderAlerts] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("/api/auth/profile", { cache: "no-store" });
        const payload = await readJsonSafely(response);

        if (response.status === 401) {
          window.location.assign(`/auth/signin?returnTo=${encodeURIComponent("/profile")}`);
          return;
        }

        if (!response.ok) {
          const message = typeof payload.error === "string" ? payload.error : "Failed to load profile";
          throw new Error(message);
        }

        const loadedProfile = payload.profile as ProfilePayload;
        setProfile(loadedProfile);
        setName(loadedProfile.name);
        setWhatsappNumber(loadedProfile.whatsappNumber || "");
        setLinkedinUrl(loadedProfile.linkedinUrl || "");
        setTimezone(loadedProfile.timezone || "Asia/Colombo");
        setReceiveOfferAlerts(Boolean(loadedProfile.receiveOfferAlerts));
        setReceiveOrderAlerts(Boolean(loadedProfile.receiveOrderAlerts));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfile();
  }, []);

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setFeedback("");
    setError("");

    try {
      setIsSavingProfile(true);
      const response = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsappNumber,
          linkedinUrl,
          timezone,
          receiveOfferAlerts,
          receiveOrderAlerts,
        }),
      });

      const payload = await readJsonSafely(response);
      if (!response.ok) {
        const message = typeof payload.error === "string" ? payload.error : "Failed to save profile";
        throw new Error(message);
      }

      setFeedback("Profile settings updated successfully.");
      if (payload.profile && typeof payload.profile === "object") {
        setProfile(payload.profile as ProfilePayload);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const changePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setFeedback("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      setIsSavingPassword(true);
      const response = await fetch("/api/auth/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const payload = await readJsonSafely(response);
      if (!response.ok) {
        const message = typeof payload.error === "string" ? payload.error : "Failed to change password";
        throw new Error(message);
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setFeedback("Password changed successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setIsSavingPassword(false);
    }
  };

  const signOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    window.location.assign("/");
  };

  if (isLoading) {
    return (
 <section className="w-full min-h-[70vh] bg-zinc-50 py-16">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
 <p className="text-sm text-zinc-600">Loading profile settings...</p>
        </div>
      </section>
    );
  }

  return (
 <section className="w-full min-h-[70vh] bg-zinc-50 py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 space-y-6">
 <div className="rounded-[16px] border border-zinc-200 bg-white p-6 md:p-8">
          <h1 className="text-4xl font-bold font-heading text-foreground">Profile Settings</h1>
          <p className="mt-2 text-text-body">
            Manage your account details, alert preferences, security, and quick account actions.
          </p>
          {profile && (
            <p className="mt-3 text-sm text-zinc-500">
              Signed in as {profile.email} ({profile.role})
            </p>
          )}
        </div>

        {error && <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        {feedback && <p className="rounded-[10px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{feedback}</p>}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
 <form onSubmit={saveProfile} className="rounded-[16px] border border-zinc-200 bg-white p-6 space-y-4">
              <h2 className="text-2xl font-bold font-heading text-foreground">Account</h2>

              <div>
                <label htmlFor="profile-full-name" className="mb-2 block text-sm font-medium">Full Name</label>
                <input
                  id="profile-full-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
 className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
                  required
                />
              </div>

              <div>
                <label htmlFor="profile-email" className="mb-2 block text-sm font-medium">Email (read-only)</label>
                <input
                  id="profile-email"
                  type="email"
                  value={profile?.email ?? ""}
                  readOnly
 className="w-full rounded-[10px] border border-zinc-300 bg-zinc-100 px-4 py-3 text-zinc-600"
                />
              </div>

              <div>
                <label htmlFor="profile-whatsapp" className="mb-2 block text-sm font-medium">WhatsApp Number</label>
                <input
                  id="profile-whatsapp"
                  type="tel"
                  value={whatsappNumber}
                  onChange={(event) => setWhatsappNumber(event.target.value)}
                  inputMode="numeric"
                  placeholder="e.g. 0773902230"
 className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
                />
              </div>

              <div>
                <label htmlFor="profile-linkedin" className="mb-2 block text-sm font-medium">LinkedIn Profile URL</label>
                <input
                  id="profile-linkedin"
                  type="url"
                  value={linkedinUrl}
                  onChange={(event) => setLinkedinUrl(event.target.value)}
                  placeholder="https://www.linkedin.com/in/your-profile"
 className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
                />
              </div>

              <div>
                <label htmlFor="profile-timezone" className="mb-2 block text-sm font-medium">Timezone</label>
                <input
                  id="profile-timezone"
                  type="text"
                  value={timezone}
                  onChange={(event) => setTimezone(event.target.value)}
 className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
                />
              </div>

              <div className="space-y-2">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    id="profile-receive-offers"
                    type="checkbox"
                    checked={receiveOfferAlerts}
                    onChange={(event) => setReceiveOfferAlerts(event.target.checked)}
                  />
                  <span id="profile-receive-offers-label">Receive website offer alerts</span>
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    id="profile-receive-orders"
                    type="checkbox"
                    checked={receiveOrderAlerts}
                    onChange={(event) => setReceiveOrderAlerts(event.target.checked)}
                  />
                  <span id="profile-receive-orders-label">Receive order progress alerts</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSavingProfile}
                className="rounded-[10px] bg-brand-main px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
              >
                {isSavingProfile ? "Saving..." : "Save Profile Settings"}
              </button>
            </form>

 <form onSubmit={changePassword} className="rounded-[16px] border border-zinc-200 bg-white p-6 space-y-4">
              <h2 className="text-2xl font-bold font-heading text-foreground">Security</h2>

              <div>
                <label htmlFor="profile-current-password" className="mb-2 block text-sm font-medium">Current Password</label>
                <input
                  id="profile-current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
 className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
                  minLength={6}
                  required
                />
              </div>

              <div>
                <label htmlFor="profile-new-password" className="mb-2 block text-sm font-medium">New Password</label>
                <input
                  id="profile-new-password"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
 className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
                  minLength={6}
                  required
                />
              </div>

              <div>
                <label htmlFor="profile-confirm-password" className="mb-2 block text-sm font-medium">Confirm New Password</label>
                <input
                  id="profile-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
 className="w-full rounded-[10px] border border-zinc-300 px-4 py-3"
                  minLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSavingPassword}
                className="rounded-[10px] bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-zinc-800 disabled:opacity-60"
              >
                {isSavingPassword ? "Updating..." : "Change Password"}
              </button>
            </form>

 <section className="rounded-[16px] border border-zinc-200 bg-white p-6 space-y-4">
              <h2 className="text-2xl font-bold font-heading text-foreground">Affiliate Program</h2>
              <p className="text-text-body">
                Invite friends with your referral link, track conversions, and unlock free package rewards as your
                affiliate points increase.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/affiliate"
                  className="rounded-[10px] bg-brand-main px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  Open Affiliate Dashboard
                </Link>
                <Link
                  href="/affiliate#how-it-works"
 className="rounded-[10px] border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main"
                >
                  View Program Rules
                </Link>
              </div>
            </section>
          </div>

 <aside className="rounded-[16px] border border-zinc-200 bg-white p-6 h-fit space-y-4 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold font-heading text-foreground">Quick Actions</h2>
 <Link href="/orders" className="block rounded-[10px] border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
              My Orders
            </Link>
 <Link href="/notifications" className="block rounded-[10px] border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
              Notifications
            </Link>
 <Link href="/cart" className="block rounded-[10px] border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
              Cart
            </Link>
 <Link href="/affiliate" className="block rounded-[10px] border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-brand-main hover:text-brand-main">
              Affiliate Program
            </Link>
            <button
              type="button"
              onClick={() => void signOut()}
              className="w-full rounded-[10px] bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Sign Out
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
