"use client";

import { useState } from "react";

type Section = "preview" | "whatsapp" | "contact-email" | "announcement" | "wa-templates";

function SectionCard({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[14px] border border-zinc-200 bg-zinc-50 p-5">
      <h3 className="font-semibold text-foreground text-sm mb-1">{title}</h3>
      <p className="text-xs text-zinc-500 mb-4">{desc}</p>
      {children}
    </div>
  );
}

function SaveStatus({ status }: { status: string }) {
  if (!status) return null;
  const isError = status.toLowerCase().includes("fail") || status.toLowerCase().includes("error");
  return (
    <p className={`mt-2 text-xs font-semibold ${isError ? "text-red-600" : "text-emerald-700"}`}>
      {status}
    </p>
  );
}

export default function SettingsClient() {
  // --- Offer Preview ---
  const [previewStatus, setPreviewStatus] = useState("");

  const clearPreview = async () => {
    const response = await fetch("/api/offers/preview", { method: "DELETE" });
    setPreviewStatus(response.ok ? "✓ Preview mode cleared." : "✗ Failed to clear preview mode.");
  };

  // --- WhatsApp Number ---
  const [waNumber, setWaNumber]       = useState("");
  const [waStatus, setWaStatus]       = useState("");

  const saveWhatsApp = () => {
    const cleaned = waNumber.replace(/\D/g, "");
    if (!cleaned) { setWaStatus("✗ Enter a valid number."); return; }
    // Store in localStorage as a simple admin-only override hint
    localStorage.setItem("admin_wa_override", cleaned);
    setWaStatus(`✓ Saved: +${cleaned} (browser-local only — update your .env for permanent change)`);
  };

  // --- Contact Email ---
  const [contactEmail, setContactEmail] = useState("");
  const [emailStatus, setEmailStatus]   = useState("");

  const saveEmail = () => {
    if (!contactEmail.includes("@")) { setEmailStatus("✗ Enter a valid email."); return; }
    localStorage.setItem("admin_contact_email_override", contactEmail);
    setEmailStatus("✓ Saved (browser-local). Update CONTACT_EMAIL in .env for permanent change.");
  };

  // --- Announcement Banner ---
  const [bannerText, setBannerText]       = useState(
    typeof window !== "undefined" ? localStorage.getItem("admin_banner_text") ?? "" : ""
  );
  const [bannerEnabled, setBannerEnabled] = useState(
    typeof window !== "undefined" ? localStorage.getItem("admin_banner_enabled") === "true" : false
  );
  const [bannerStatus, setBannerStatus]   = useState("");

  const saveBanner = () => {
    localStorage.setItem("admin_banner_text", bannerText);
    localStorage.setItem("admin_banner_enabled", String(bannerEnabled));
    setBannerStatus("✓ Banner settings saved (browser-local).");
  };

  // --- WhatsApp Message Templates ---
  const DEFAULT_TEMPLATES = [
    "Hi {name}, your order has been confirmed! We've started working on your CV. We'll keep you updated. 😊",
    "Hi {name}, your CV is now in progress! We're working on making it stand out. You'll receive the final documents soon.",
    "Hi {name}, great news! Your CV is ready for delivery. Please check your order page to download your files.",
    "Hi {name}, we received your revision request and we're reviewing it now. We'll get back to you shortly.",
    "Hi {name}, your revision has been completed! Please check your order page for the updated documents.",
  ];

  const [templateList, setTemplateList] = useState<string[]>(() => {
    if (typeof window === "undefined") return DEFAULT_TEMPLATES;
    try {
      const stored = localStorage.getItem("admin_wa_templates");
      return stored ? (JSON.parse(stored) as string[]) : DEFAULT_TEMPLATES;
    } catch {
      return DEFAULT_TEMPLATES;
    }
  });
  const [newTemplate, setNewTemplate]   = useState("");
  const [clientName, setClientName]     = useState("");
  const [copiedIdx, setCopiedIdx]       = useState<number | null>(null);

  const saveTemplates = (list: string[]) => {
    setTemplateList(list);
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_wa_templates", JSON.stringify(list));
    }
  };

  const copyTemplate = (template: string, idx: number) => {
    const filled = clientName ? template.replace(/\{name\}/g, clientName) : template;
    void navigator.clipboard.writeText(filled);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const addTemplate = () => {
    if (!newTemplate.trim()) return;
    saveTemplates([...templateList, newTemplate.trim()]);
    setNewTemplate("");
  };

  const deleteTemplate = (idx: number) => {
    saveTemplates(templateList.filter((_, i) => i !== idx));
  };

  const activeSection: Record<Section, boolean> = {
    preview: true,
    whatsapp: true,
    "contact-email": true,
    announcement: true,
    "wa-templates": true,
  };

  return (
    <section className="space-y-4">
      <div className="rounded-[16px] border border-zinc-200 bg-white p-6">
        <h2 className="text-2xl font-bold font-plus-jakarta">Settings</h2>
        <p className="mt-1 text-sm text-zinc-500">General admin controls and quick configuration.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        {/* 1. Offer Preview Controls */}
        {activeSection.preview && (
          <SectionCard
            title="Offer Preview Mode"
            desc="Clear any active offer preview cookie for your current browser session."
          >
            <button
              type="button"
              onClick={() => void clearPreview()}
              className="rounded-[8px] bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
            >
              Clear Preview Mode
            </button>
            <SaveStatus status={previewStatus} />
          </SectionCard>
        )}

        {/* 2. WhatsApp Number */}
        {activeSection.whatsapp && (
          <SectionCard
            title="WhatsApp Contact Number"
            desc="Update the WhatsApp number shown on order buttons. For permanent changes, also update WHATSAPP_NUMBER in your .env."
          >
            <div className="flex gap-2">
              <input
                type="tel"
                value={waNumber}
                onChange={(e) => setWaNumber(e.target.value)}
                placeholder="e.g. 94771234567"
                aria-label="WhatsApp number"
                className="flex-1 rounded-[8px] border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-main"
              />
              <button
                type="button"
                onClick={saveWhatsApp}
                className="rounded-[8px] bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1fb85a] transition-colors"
              >
                Save
              </button>
            </div>
            <SaveStatus status={waStatus} />
          </SectionCard>
        )}

        {/* 3. Contact Email */}
        {activeSection["contact-email"] && (
          <SectionCard
            title="Contact Email Address"
            desc="Email where contact form notifications should be directed. Update CONTACT_EMAIL in .env for permanent server-side routing."
          >
            <div className="flex gap-2">
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Contact email"
                className="flex-1 rounded-[8px] border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-main"
              />
              <button
                type="button"
                onClick={saveEmail}
                className="rounded-[8px] bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-zinc-700 transition-colors"
              >
                Save
              </button>
            </div>
            <SaveStatus status={emailStatus} />
          </SectionCard>
        )}

        {/* 4. Announcement Banner */}
        {activeSection.announcement && (
          <SectionCard
            title="Site Announcement Banner"
            desc="Show a temporary announcement at the top of the site (e.g. promotional events, holidays). Stored browser-local — update SeasonalOfferBanner component for site-wide display."
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="bannerEnabled"
                  checked={bannerEnabled}
                  onChange={(e) => setBannerEnabled(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="bannerEnabled" className="text-sm font-medium text-zinc-700">
                  Enable announcement banner
                </label>
              </div>
              <textarea
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                placeholder="e.g. 🎉 Special offer — 20% off all packages this weekend only!"
                rows={2}
                aria-label="Announcement banner text"
                className="w-full rounded-[8px] border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-main resize-none"
              />
              <button
                type="button"
                onClick={saveBanner}
                className="rounded-[8px] bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-zinc-700 transition-colors"
              >
                Save Banner
              </button>
            </div>
            <SaveStatus status={bannerStatus} />
          </SectionCard>
        )}
      </div>

      {/* 5. WhatsApp Message Templates */}
      {activeSection["wa-templates"] && (
        <div className="rounded-[14px] border border-zinc-200 bg-zinc-50 p-5">
          <h3 className="font-semibold text-foreground text-sm mb-1">WhatsApp Message Templates</h3>
          <p className="text-xs text-zinc-500 mb-4">
            Pre-written messages for common situations. Use <code className="bg-zinc-200 px-1 py-0.5 rounded">{"{name}"}</code> as a placeholder — type the client name below to auto-fill before copying.
          </p>

          {/* Client name override */}
          <div className="mb-4 flex gap-2 items-center">
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Client name (optional, fills {name})"
              aria-label="Client name for template"
              className="flex-1 rounded-[8px] border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-main"
            />
          </div>

          {/* Template list */}
          <div className="space-y-2">
            {templateList.map((t, idx) => (
              <div key={idx} className="flex gap-2 items-start rounded-[10px] border border-zinc-200 bg-white p-3">
                <p className="flex-1 text-sm text-zinc-700 leading-relaxed">
                  {clientName ? t.replace(/\{name\}/g, clientName) : t}
                </p>
                <div className="flex gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => copyTemplate(t, idx)}
                    className={`rounded-[8px] px-3 py-1.5 text-xs font-semibold transition-colors ${
                      copiedIdx === idx
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-[#25D366] text-white hover:bg-[#1fb85a]"
                    }`}
                  >
                    {copiedIdx === idx ? "✓ Copied!" : "Copy"}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteTemplate(idx)}
                    className="rounded-[8px] border border-red-200 px-2 py-1.5 text-xs text-red-500 hover:bg-red-50 transition-colors"
                    aria-label="Delete template"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add new template */}
          <div className="mt-3 flex gap-2">
            <textarea
              value={newTemplate}
              onChange={(e) => setNewTemplate(e.target.value)}
              placeholder='Add a new template… Use {name} for the client name'
              rows={2}
              aria-label="New WhatsApp message template"
              className="flex-1 rounded-[8px] border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-main resize-none"
            />
            <button
              type="button"
              onClick={addTemplate}
              disabled={!newTemplate.trim()}
              className="rounded-[8px] bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-zinc-700 disabled:opacity-40 transition-colors self-start"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Environment reference */}
      <div className="rounded-[14px] border border-zinc-200 bg-zinc-50 p-5">
        <h3 className="text-sm font-semibold text-zinc-700 mb-3">Environment Variables Reference</h3>
        <p className="text-xs text-zinc-500 mb-3">
          For permanent changes, update your <code className="bg-zinc-200 px-1 py-0.5 rounded text-xs">.env</code> file and redeploy.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { key: "WHATSAPP_NUMBER", desc: "WhatsApp order button number" },
            { key: "CONTACT_EMAIL",   desc: "Contact form recipient email" },
            { key: "DATABASE_URL",    desc: "Prisma SQLite database path" },
            { key: "NEXT_PUBLIC_SITE_URL", desc: "Public site URL for SEO/OG" },
          ].map(({ key, desc }) => (
            <div key={key} className="rounded-[8px] border border-zinc-200 bg-white px-3 py-2">
              <code className="text-xs font-mono text-foreground">{key}</code>
              <p className="text-xs text-zinc-400 mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
