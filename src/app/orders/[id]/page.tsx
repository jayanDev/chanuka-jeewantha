"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

type OrderItem = {
  id: string;
  productName: string;
  quantity: number;
  priceLkr: number;
};

type HandoverDocument = {
  id: string;
  fileName: string;
  url: string;
  downloadUrl?: string;
  uploadedAtMs: number;
};

type OrderRevision = {
  id: string;
  message: string;
  status: "open" | "in_review" | "resolved";
  requestedAtMs: number;
  adminResponse: string | null;
};

type OrderUpdate = {
  id: string;
  atMs: number;
  title: string;
  details: string | null;
  actorRole: "system" | "admin" | "customer";
};

type Order = {
  id: string;
  status: "pending_payment" | "payment_submitted" | "confirmed" | "in_progress" | "completed" | "cancelled";
  totalLkr: number;
  subtotalLkr: number;
  couponDiscountLkr: number;
  couponCode: string | null;
  paymentRef: string;
  paymentPersonName: string;
  paymentWhatsApp: string;
  paymentSlipUrl: string;
  paymentSlipUploadFailed: boolean;
  currentCvUrl: string | null;
  currentCvFileName: string | null;
  currentCvUploadFailed: boolean;
  linkedinUrl: string | null;
  extraDetails: string | null;
  etaDate: string | null;
  createdAt: string;
  items: OrderItem[];
  handoverDocuments: HandoverDocument[];
  revisions: OrderRevision[];
  updates: OrderUpdate[];
};

const formatLkr = (price: number) => `LKR ${price.toLocaleString("en-LK")}`;

const statusLabel: Record<Order["status"], string> = {
  pending_payment: "Pending Payment",
  payment_submitted: "Payment Submitted",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const statusColors: Record<Order["status"], string> = {
  pending_payment: "bg-zinc-100 text-zinc-700",
  payment_submitted: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  in_progress: "bg-purple-100 text-purple-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-700",
};

const STEPS: { key: Order["status"]; label: string }[] = [
  { key: "payment_submitted", label: "Payment" },
  { key: "confirmed", label: "Confirmed" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Delivered" },
];

const stepOrder: Record<Order["status"], number> = {
  pending_payment: 0,
  payment_submitted: 1,
  confirmed: 2,
  in_progress: 3,
  completed: 4,
  cancelled: -1,
};

function StatusStepper({ status }: { status: Order["status"] }) {
  const current = stepOrder[status];
  if (status === "cancelled") {
    return (
      <div className="rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
        This order has been cancelled.
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, index) => {
        const stepNum = index + 1;
        const isDone = current >= stepNum;
        const isActive = current === stepNum;
        const isLast = index === STEPS.length - 1;

        return (
          <div key={step.key} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5 min-w-0">
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold border-2 transition-all ${
                  isDone
                    ? "border-brand-main bg-brand-main text-white"
                    : isActive
                      ? "border-brand-main bg-white text-brand-main animate-pulse"
                      : "border-zinc-300 bg-white text-zinc-400"
                }`}
              >
                {isDone ? "✓" : stepNum}
              </div>
              <span
                className={`text-[10px] font-medium text-center leading-tight px-1 ${
                  isDone ? "text-brand-main" : isActive ? "text-brand-main" : "text-zinc-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={`h-0.5 flex-1 mx-1 -mt-5 transition-all ${
                  current > stepNum ? "bg-brand-main" : "bg-zinc-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

async function readJsonSafely(response: Response): Promise<Record<string, unknown>> {
  const raw = await response.text();
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [revisionDraft, setRevisionDraft] = useState("");
  const [revisionLoading, setRevisionLoading] = useState(false);
  const [revisionError, setRevisionError] = useState("");
  const [revisionSuccess, setRevisionSuccess] = useState("");

  const loadOrder = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/orders/${id}`, { cache: "no-store" });
      const payload = await readJsonSafely(response);

      if (response.status === 401) {
        window.location.assign(`/auth/signin?returnTo=${encodeURIComponent(`/orders/${id}`)}`);
        return;
      }

      if (response.status === 404) {
        setError("Order not found.");
        return;
      }

      if (!response.ok) {
        throw new Error(typeof payload.error === "string" ? payload.error : "Failed to load order");
      }

      setOrder(payload.order as Order);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load order");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const submitRevision = async () => {
    const message = revisionDraft.trim();
    if (message.length < 10) {
      setRevisionError("Please include at least 10 characters.");
      return;
    }
    if (!order) return;

    setRevisionLoading(true);
    setRevisionError("");
    setRevisionSuccess("");

    try {
      const response = await fetch("/api/orders/revisions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, message }),
      });
      const payload = await readJsonSafely(response);

      if (!response.ok) {
        setRevisionError(typeof payload.error === "string" ? payload.error : "Failed to submit revision");
        return;
      }

      setRevisionDraft("");
      setRevisionSuccess("Revision request submitted. We will review and respond shortly.");
      await loadOrder();
    } catch (err) {
      setRevisionError(err instanceof Error ? err.message : "Failed to submit revision");
    } finally {
      setRevisionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="w-full bg-zinc-50 py-16 min-h-[70vh]">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <p className="text-text-body">Loading order...</p>
        </div>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="w-full bg-zinc-50 py-16 min-h-[70vh]">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 space-y-4">
          <p className="text-sm text-red-700">{error || "Order not found."}</p>
          <Link href="/orders" className="text-brand-main font-medium">← Back to My Orders</Link>
        </div>
      </section>
    );
  }

  const openRevisions = order.revisions.filter((r) => r.status !== "resolved");

  return (
    <section className="w-full bg-zinc-50 py-12 min-h-[70vh]">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/orders" className="hover:text-brand-main">My Orders</Link>
          <span>›</span>
          <span className="text-foreground font-medium">#{order.id.slice(0, 8)}</span>
        </div>

        {/* Header */}
        <div className="rounded-[16px] border border-zinc-200 bg-white p-6 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold font-plus-jakarta text-foreground">
                Order #{order.id.slice(0, 8)}
              </h1>
              <p className="text-sm text-zinc-500 mt-0.5">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-LK", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {order.etaDate && (
                <p className="text-sm font-medium text-emerald-700 mt-1">
                  Estimated delivery: {new Date(order.etaDate + "T00:00:00").toLocaleDateString("en-LK", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              )}
            </div>
            <div className="text-left sm:text-right">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${statusColors[order.status]}`}
              >
                {statusLabel[order.status]}
              </span>
              <p className="mt-2 text-xl font-bold text-foreground">{formatLkr(order.totalLkr)}</p>
              {order.couponDiscountLkr > 0 && (
                <p className="text-xs text-emerald-700">
                  Saved {formatLkr(order.couponDiscountLkr)}
                  {order.couponCode ? ` (${order.couponCode})` : ""}
                </p>
              )}
            </div>
          </div>

          {/* Status Stepper */}
          <div className="pt-2">
            <StatusStepper status={order.status} />
          </div>

          {/* What happens next */}
          {(order.status === "payment_submitted" || order.status === "pending_payment") && (
            <div className="rounded-[10px] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 space-y-1">
              <p className="font-semibold">What happens next?</p>
              <p>1. We verify your bank transfer (usually within a few hours on business days).</p>
              <p>2. Once confirmed, our team starts working on your order.</p>
              <p>3. You will be notified when your documents are ready for download.</p>
            </div>
          )}
          {order.status === "confirmed" && (
            <div className="rounded-[10px] border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 space-y-1">
              <p className="font-semibold">Payment confirmed — work in progress</p>
              <p>Your order has been confirmed and our team will begin work shortly. We will update you as we progress.</p>
            </div>
          )}
          {order.status === "in_progress" && (
            <div className="rounded-[10px] border border-purple-200 bg-purple-50 p-4 text-sm text-purple-800 space-y-1">
              <p className="font-semibold">Actively working on your order</p>
              <p>Your documents are being prepared. You will receive a notification when your files are ready.</p>
            </div>
          )}
          {order.status === "completed" && order.handoverDocuments.length > 0 && (
            <div className="rounded-[10px] border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 space-y-1">
              <p className="font-semibold">Your files are ready for download!</p>
              <p>Use the links below to download your documents. If you need any changes, use the revision request section.</p>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="rounded-[16px] border border-zinc-200 bg-white p-6 space-y-3">
          <h2 className="font-semibold text-foreground">Ordered Packages</h2>
          <ul className="divide-y divide-zinc-100">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-zinc-800">{item.productName} × {item.quantity}</span>
                <span className="font-semibold text-foreground">{formatLkr(item.priceLkr)}</span>
              </li>
            ))}
          </ul>
          {order.couponDiscountLkr > 0 && (
            <div className="flex items-center justify-between text-sm text-emerald-700 border-t border-zinc-100 pt-2">
              <span>Coupon discount {order.couponCode ? `(${order.couponCode})` : ""}</span>
              <span>-{formatLkr(order.couponDiscountLkr)}</span>
            </div>
          )}
          <div className="flex items-center justify-between font-bold text-foreground border-t border-zinc-200 pt-2">
            <span>Total paid</span>
            <span>{formatLkr(order.totalLkr)}</span>
          </div>
        </div>

        {/* Handover Documents */}
        <div className="rounded-[16px] border border-zinc-200 bg-white p-6 space-y-3">
          <h2 className="font-semibold text-foreground">Your Documents</h2>
          {order.handoverDocuments.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No files uploaded yet. You will be notified when your documents are ready.
            </p>
          ) : (
            <ul className="space-y-2">
              {order.handoverDocuments.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between rounded-[10px] border border-zinc-200 bg-zinc-50 px-4 py-3">
                  <span className="text-sm font-medium text-foreground truncate">{doc.fileName}</span>
                  <a
                    href={doc.downloadUrl ?? doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-3 flex-shrink-0 rounded-[8px] bg-brand-main px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-dark"
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Live Tracking Timeline */}
        <div className="rounded-[16px] border border-zinc-200 bg-white p-6 space-y-3">
          <h2 className="font-semibold text-foreground">Order Timeline</h2>
          {order.updates.length === 0 ? (
            <p className="text-sm text-zinc-500">Processing your order...</p>
          ) : (
            <div className="relative pl-6">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-zinc-200" />
              <ul className="space-y-5">
                {order.updates.map((update, index) => {
                  const isLast = index === order.updates.length - 1;
                  return (
                    <li key={update.id} className="relative">
                      <div
                        className={`absolute -left-6 top-1 h-3 w-3 rounded-full border-2 border-white ring-2 ${
                          isLast
                            ? "bg-brand-main ring-brand-main animate-pulse"
                            : "bg-zinc-300 ring-zinc-200"
                        }`}
                      />
                      <div>
                        <p className={`text-sm font-medium ${isLast ? "text-brand-main" : "text-zinc-800"}`}>
                          {update.title}
                        </p>
                        <p className="mt-0.5 text-xs text-zinc-500">
                          {new Date(update.atMs).toLocaleString("en-LK", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        {update.details && (
                          <p className="mt-1.5 text-sm text-zinc-600 border-l-2 border-zinc-200 pl-3">
                            {update.details}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Payment Info */}
        <div className="rounded-[16px] border border-zinc-200 bg-white p-6 space-y-2 text-sm text-zinc-700">
          <h2 className="font-semibold text-foreground mb-3">Payment Details</h2>
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
            <span className="text-zinc-500">Payment by</span>
            <span>{order.paymentPersonName || "—"}</span>
            <span className="text-zinc-500">WhatsApp</span>
            <span>{order.paymentWhatsApp || "—"}</span>
            {order.paymentRef && (
              <>
                <span className="text-zinc-500">Payment ref</span>
                <span>{order.paymentRef}</span>
              </>
            )}
          </div>
          <div className="pt-2 flex flex-wrap gap-3">
            {order.paymentSlipUrl && (
              <a href={order.paymentSlipUrl} target="_blank" rel="noreferrer" className="text-brand-main font-medium text-xs hover:underline">
                View Payment Slip
              </a>
            )}
            {order.paymentSlipUploadFailed && (
              <span className="text-xs text-amber-700">Slip upload failed — please send via WhatsApp.</span>
            )}
            {order.currentCvUrl && (
              <a href={order.currentCvUrl} target="_blank" rel="noreferrer" className="text-brand-main font-medium text-xs hover:underline">
                View Current CV
              </a>
            )}
            {order.linkedinUrl && (
              <a href={order.linkedinUrl} target="_blank" rel="noreferrer" className="text-brand-main font-medium text-xs hover:underline">
                LinkedIn Profile
              </a>
            )}
          </div>
          {order.extraDetails && (
            <div className="mt-2 rounded-[8px] bg-zinc-50 px-3 py-2">
              <p className="font-medium text-zinc-800 mb-0.5">Extra details</p>
              <p className="text-zinc-600 whitespace-pre-line">{order.extraDetails}</p>
            </div>
          )}
        </div>

        {/* Revision Requests */}
        {order.status !== "pending_payment" && order.status !== "cancelled" && (
          <div className="rounded-[16px] border border-zinc-200 bg-white p-6 space-y-4">
            <h2 className="font-semibold text-foreground">Revision Requests</h2>

            {order.revisions.length > 0 && (
              <ul className="space-y-3">
                {order.revisions.map((revision) => (
                  <li key={revision.id} className="rounded-[10px] border border-zinc-200 bg-zinc-50 p-4 space-y-1.5 text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                          revision.status === "resolved"
                            ? "bg-emerald-100 text-emerald-700"
                            : revision.status === "in_review"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {revision.status === "resolved" ? "Resolved" : revision.status === "in_review" ? "In Review" : "Open"}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {new Date(revision.requestedAtMs).toLocaleDateString("en-LK")}
                      </span>
                    </div>
                    <p className="text-zinc-800">{revision.message}</p>
                    {revision.adminResponse && (
                      <div className="mt-1 border-l-2 border-brand-main pl-3 text-zinc-600 text-xs">
                        <span className="font-medium text-zinc-700">Response: </span>
                        {revision.adminResponse}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {order.status === "completed" || order.status === "in_progress" ? (
              <div className="space-y-3">
                {openRevisions.length === 0 && (
                  <p className="text-sm text-zinc-500">No open revision requests.</p>
                )}
                <textarea
                  value={revisionDraft}
                  onChange={(e) => setRevisionDraft(e.target.value)}
                  rows={3}
                  placeholder="Describe exactly what needs to be changed or improved in your delivered documents..."
                  className="w-full rounded-[10px] border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-main"
                />
                {revisionError && <p className="text-sm text-red-700">{revisionError}</p>}
                {revisionSuccess && <p className="text-sm text-emerald-700">{revisionSuccess}</p>}
                <button
                  type="button"
                  onClick={() => void submitRevision()}
                  disabled={revisionLoading}
                  className="rounded-[10px] bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-zinc-800 disabled:opacity-60"
                >
                  {revisionLoading ? "Submitting..." : "Request Revision"}
                </button>
              </div>
            ) : (
              <p className="text-sm text-zinc-500">
                Revision requests are available once your order is in progress or completed.
              </p>
            )}
          </div>
        )}

        {/* Back link */}
        <div className="pb-4">
          <Link href="/orders" className="text-sm font-medium text-zinc-500 hover:text-foreground">
            ← Back to My Orders
          </Link>
        </div>
      </div>
    </section>
  );
}
