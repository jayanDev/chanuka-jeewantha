"use client";

import { useEffect, useRef, useState } from "react";
import { packageCategories, formatLkr, type PackageProduct } from "@/lib/packages-catalog";
import { ebooks, ebookBundles, getBundlePrice, type Ebook, type EbookBundle } from "@/lib/ebooks";

const WA_NUMBER = "94773902230";

type SelectableItem =
  | { kind: "package"; data: PackageProduct }
  | { kind: "ebook"; data: Ebook }
  | { kind: "bundle"; data: EbookBundle };

function getItemKey(item: SelectableItem): string {
  return `${item.kind}::${item.data.slug}`;
}

function getItemName(item: SelectableItem): string {
  if (item.kind === "ebook" || item.kind === "bundle") return item.data.title;
  return item.data.name;
}

function getItemPrice(item: SelectableItem): number {
  if (item.kind === "package") return item.data.priceLkr;
  if (item.kind === "ebook") return item.data.readPriceLkr ?? item.data.priceLkr ?? 500;
  return getBundlePrice(item.data).discountedLkr;
}

function buildWhatsAppMessage(selected: SelectableItem[]): string {
  if (selected.length === 0) return "";

  const lines: string[] = [
    "Hello Chanuka, I want to place an order.",
    "",
    "📋 Order Details:",
  ];

  let total = 0;
  for (const item of selected) {
    const price = getItemPrice(item);
    total += price;
    lines.push(`• ${getItemName(item)} — ${formatLkr(price)}`);
  }

  lines.push("");
  lines.push(`💰 Total: ${formatLkr(total)}`);
  lines.push("");
  lines.push("Please confirm availability and payment details. Thank you!");

  return lines.join("\n");
}

// Group packages by category for the UI
const packageGroups = packageCategories
  .filter((cat) => cat.packages.length > 0)
  .map((cat) => ({
    label: cat.title,
    items: cat.packages.map((p): SelectableItem => ({ kind: "package", data: p })),
  }));

const ebookItems = ebooks
  .filter((e) => e.category === "paid")
  .map((e): SelectableItem => ({ kind: "ebook", data: e }));

const bundleItems = ebookBundles.map((b): SelectableItem => ({ kind: "bundle", data: b }));

type Props = {
  isOpen: boolean;
  onClose: () => void;
  /** Pre-selected item (e.g. from a package page "Order via WhatsApp" button) */
  preSelectedKey?: string;
};

export default function WhatsAppOrderModal({ isOpen, onClose, preSelectedKey }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"packages" | "ebooks">("packages");
  const backdropRef = useRef<HTMLDivElement>(null);

  // Pre-select item when modal opens
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (isOpen && preSelectedKey) {
        setSelected(new Set([preSelectedKey]));
        return;
      }
      if (!isOpen) {
        setSelected(new Set());
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isOpen, preSelectedKey]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleItem = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // Collect selected items in order
  const allItems: SelectableItem[] = [
    ...packageGroups.flatMap((g) => g.items),
    ...ebookItems,
    ...bundleItems,
  ];
  const selectedItems = allItems.filter((item) => selected.has(getItemKey(item)));
  const totalLkr = selectedItems.reduce((sum, item) => sum + getItemPrice(item), 0);
  const message = buildWhatsAppMessage(selectedItems);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/60 px-0 sm:px-4"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className="w-full sm:max-w-2xl max-h-[90vh] flex flex-col rounded-t-[24px] sm:rounded-[20px] bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 bg-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </span>
            <h2 className="text-lg font-bold font-plus-jakarta text-foreground">Order via WhatsApp</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Tab strip */}
        <div className="flex border-b border-zinc-100 bg-zinc-50 flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("packages")}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === "packages" ? "text-foreground border-b-2 border-brand-main bg-white" : "text-zinc-500 hover:text-foreground"}`}
          >
            Packages & Services
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ebooks")}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === "ebooks" ? "text-foreground border-b-2 border-brand-main bg-white" : "text-zinc-500 hover:text-foreground"}`}
          >
            Ebooks & Bundles
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {activeTab === "packages" && (
            <>
              {packageGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">{group.label}</p>
                  <div className="space-y-1.5">
                    {group.items.map((item) => {
                      const key = getItemKey(item);
                      const checked = selected.has(key);
                      return (
                        <label
                          key={key}
                          className={`flex items-center gap-3 rounded-[10px] border px-3 py-2.5 cursor-pointer transition-colors ${checked ? "border-brand-main bg-brand-main/5" : "border-zinc-200 hover:border-zinc-300 bg-white"}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleItem(key)}
                            className="accent-brand-main h-4 w-4 flex-shrink-0"
                          />
                          <span className="flex-1 min-w-0">
                            <span className="block text-sm font-medium text-foreground truncate">{getItemName(item)}</span>
                            <span className="block text-xs text-zinc-500">{item.kind === "package" ? (item.data as PackageProduct).audience : ""}</span>
                          </span>
                          <span className={`text-sm font-bold flex-shrink-0 ${checked ? "text-brand-main" : "text-foreground"}`}>
                            {formatLkr(getItemPrice(item))}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === "ebooks" && (
            <>
              {ebookItems.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Ebooks</p>
                  <div className="space-y-1.5">
                    {ebookItems.map((item) => {
                      const key = getItemKey(item);
                      const checked = selected.has(key);
                      const ebook = item.data as Ebook;
                      return (
                        <label
                          key={key}
                          className={`flex items-center gap-3 rounded-[10px] border px-3 py-2.5 cursor-pointer transition-colors ${checked ? "border-brand-main bg-brand-main/5" : "border-zinc-200 hover:border-zinc-300 bg-white"}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleItem(key)}
                            className="accent-brand-main h-4 w-4 flex-shrink-0"
                          />
                          <span className="flex-1 min-w-0">
                            <span className="block text-sm font-medium text-foreground">{ebook.title}</span>
                            <span className="block text-xs text-zinc-500">Read Online</span>
                          </span>
                          <span className={`text-sm font-bold flex-shrink-0 ${checked ? "text-brand-main" : "text-foreground"}`}>
                            {formatLkr(getItemPrice(item))}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {bundleItems.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Bundle Deals</p>
                  <div className="space-y-1.5">
                    {bundleItems.map((item) => {
                      const key = getItemKey(item);
                      const checked = selected.has(key);
                      const bundle = item.data as EbookBundle;
                      const { discountedLkr, originalLkr } = getBundlePrice(bundle);
                      return (
                        <label
                          key={key}
                          className={`flex items-center gap-3 rounded-[10px] border px-3 py-2.5 cursor-pointer transition-colors ${checked ? "border-brand-main bg-brand-main/5" : "border-zinc-200 hover:border-zinc-300 bg-white"}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleItem(key)}
                            className="accent-brand-main h-4 w-4 flex-shrink-0"
                          />
                          <span className="flex-1 min-w-0">
                            <span className="block text-sm font-medium text-foreground">{bundle.title}</span>
                            <span className="block text-xs text-zinc-500">
                              <span className="line-through mr-1">{formatLkr(originalLkr)}</span>
                              <span className="text-[#25D366] font-semibold">{bundle.discountPercent}% off</span>
                            </span>
                          </span>
                          <span className={`text-sm font-bold flex-shrink-0 ${checked ? "text-brand-main" : "text-foreground"}`}>
                            {formatLkr(discountedLkr)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer — selected summary + send button */}
        <div className="border-t border-zinc-100 bg-white px-5 py-4 flex-shrink-0">
          {selected.size > 0 ? (
            <div className="mb-3 space-y-1">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Selected ({selected.size})</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedItems.map((item) => (
                  <span key={getItemKey(item)} className="inline-flex items-center gap-1 rounded-full bg-brand-main/10 px-2.5 py-0.5 text-xs font-medium text-brand-main">
                    {getItemName(item)}
                    <button
                      type="button"
                      onClick={() => toggleItem(getItemKey(item))}
                      className="text-brand-main/60 hover:text-brand-main"
                      aria-label={`Remove ${getItemName(item)}`}
                    >×</button>
                  </span>
                ))}
              </div>
              <p className="text-sm font-bold text-foreground pt-1">Total: {formatLkr(totalLkr)}</p>
            </div>
          ) : (
            <p className="text-sm text-zinc-500 mb-3">ඕනෑ product/package/ebook select කරන්න. Multiple items select කළ හැකිය.</p>
          )}

          <div className="flex gap-2">
            <a
              href={selected.size > 0 ? waUrl : undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={selected.size === 0 ? (e) => e.preventDefault() : undefined}
              aria-disabled={selected.size === 0}
              className={`flex-1 inline-flex items-center justify-center gap-2 rounded-[10px] py-3 text-sm font-bold text-white transition-colors ${selected.size > 0 ? "bg-[#25D366] hover:bg-[#1fb85a]" : "bg-zinc-300 cursor-not-allowed"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              WhatsApp Order Message යවන්න
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-[10px] border border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-600 hover:border-zinc-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
