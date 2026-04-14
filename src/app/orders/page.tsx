"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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
  uploadedBy: string;
};

type OrderRevision = {
  id: string;
  message: string;
  status: "open" | "in_review" | "resolved";
  requestedAtMs: number;
  requestedByUserId: string;
  resolvedAtMs: number | null;
  resolvedBy: string | null;
  adminResponse: string | null;
};

type OrderUpdate = {
  id: string;
  atMs: number;
  type: "order_created" | "status_updated" | "handover_uploaded" | "order_warning";
  title: string;
  details: string | null;
  actorRole: "system" | "admin" | "customer";
  status: "pending_payment" | "payment_submitted" | "confirmed" | "in_progress" | "completed" | "cancelled";
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

const statusOrder: Order["status"][] = ["payment_submitted", "confirmed", "in_progress", "completed"];

function getProgressPercent(status: Order["status"]): number {
  if (status === "cancelled") return 0;
  const index = statusOrder.indexOf(status);
  if (index < 0) return 10;
  return Math.round(((index + 1) / statusOrder.length) * 100);
}

function getProgressWidthClass(status: Order["status"]): string {
  if (status === "cancelled") return "w-0";
  if (status === "pending_payment") return "w-[10%]";
  if (status === "payment_submitted") return "w-[25%]";
  if (status === "confirmed") return "w-[50%]";
  if (status === "in_progress") return "w-[75%]";
  return "w-full";
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [revisionDrafts, setRevisionDrafts] = useState<Record<string, string>>({});
  const [revisionLoadingOrderId, setRevisionLoadingOrderId] = useState("");

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/orders", { cache: "no-store" });
      const payload = await readJsonSafely(response);

      if (response.status === 401) {
        window.location.assign(`/auth/signin?returnTo=${encodeURIComponent("/orders")}`);
        return;
      }

      if (!response.ok) {
        const message = typeof payload.error === "string" ? payload.error : "Failed to load orders";
        throw new Error(message);
      }

      setOrders(Array.isArray(payload.orders) ? (payload.orders as Order[]) : []);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadOrders();
  }, []);

  const submitRevision = async (orderId: string) => {
    const message = (revisionDrafts[orderId] ?? "").trim();
    if (message.length < 10) {
      setError("Please include at least 10 characters when requesting a revision.");
      return;
    }

    setRevisionLoadingOrderId(orderId);
    setError("");

    try {
      const response = await fetch("/api/orders/revisions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, message }),
      });
      const payload = await readJsonSafely(response);

      if (!response.ok) {
        setError(typeof payload.error === "string" ? payload.error : "Failed to submit revision request");
        return;
      }

      setRevisionDrafts((previous) => ({ ...previous, [orderId]: "" }));
      await loadOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit revision request");
    } finally {
      setRevisionLoadingOrderId("");
    }
  };

  const totalValue = useMemo(() => orders.reduce((sum, order) => sum + order.totalLkr, 0), [orders]);

  return (
    <section className="w-full bg-zinc-50 py-16 min-h-[70vh]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold font-plus-jakarta text-foreground">My Orders</h1>
            <p className="text-sm text-zinc-600">Track order progress, updates, and final handover documents.</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-zinc-600">Total value: <span className="font-semibold text-foreground">{formatLkr(totalValue)}</span></p>
            <Link href="/pricing" className="text-brand-main font-medium">Order More Packages</Link>
          </div>
        </div>

        {error && <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        {isLoading ? (
          <p className="text-text-body">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="rounded-[16px] border border-zinc-200 bg-white p-8 text-center">
            <p className="text-text-body mb-4">You have no orders yet.</p>
            <Link href="/pricing" className="inline-block rounded-[10px] bg-brand-main px-5 py-3 text-white font-medium">Browse Packages</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <article key={order.id} className="rounded-[16px] border border-zinc-200 bg-white p-6 space-y-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Order #{order.id.slice(0, 8)}</h2>
                    <p className="text-sm text-zinc-500">Placed on {new Date(order.createdAt).toLocaleString("en-LK")}</p>
                    <p className="text-sm text-zinc-500">Payment person: {order.paymentPersonName || "-"}</p>
                    <p className="text-sm text-zinc-500">WhatsApp: {order.paymentWhatsApp || "-"}</p>
                    {order.paymentRef && <p className="text-sm text-zinc-500">Payment ref: {order.paymentRef}</p>}
                    {order.paymentSlipUrl ? (
                      <a href={order.paymentSlipUrl} target="_blank" rel="noreferrer" className="text-sm text-brand-main font-medium">
                        View Submitted Slip
                      </a>
                    ) : order.paymentSlipUploadFailed ? (
                      <p className="text-xs text-amber-700 mt-1">Slip upload failed in system. Please send slip via WhatsApp if not already shared.</p>
                    ) : null}
                    {order.currentCvUrl ? (
                      <a href={order.currentCvUrl} target="_blank" rel="noreferrer" className="block text-sm text-brand-main font-medium mt-1">
                        View Current CV ({order.currentCvFileName ?? "file"})
                      </a>
                    ) : order.currentCvUploadFailed ? (
                      <p className="text-xs text-amber-700 mt-1">Current CV upload failed. Please send your CV via WhatsApp.</p>
                    ) : null}
                    {order.linkedinUrl && (
                      <a href={order.linkedinUrl} target="_blank" rel="noreferrer" className="block text-sm text-brand-main font-medium mt-1">
                        Open LinkedIn Profile
                      </a>
                    )}
                  </div>
                  <div className="text-left md:text-right md:min-w-[220px]">
                    <p className="text-xs uppercase tracking-wide text-zinc-500 mb-1">Status</p>
                    <p className="font-semibold text-foreground">{statusLabel[order.status]}</p>
                    <p className="mt-2 text-lg font-bold text-foreground">{formatLkr(order.totalLkr)}</p>
                    <p className="text-xs text-zinc-500 mt-1">Subtotal: {formatLkr(order.subtotalLkr || order.totalLkr)}</p>
                    {order.couponDiscountLkr > 0 && (
                      <p className="text-xs text-zinc-500">Discount {order.couponCode ? `(${order.couponCode})` : ""}: -{formatLkr(order.couponDiscountLkr)}</p>
                    )}
                  </div>
                </div>

                <div className="rounded border border-zinc-200 bg-white p-4">
                  <h3 className="font-semibold text-foreground mb-4">Live Order Tracking</h3>
                  {order.updates.length === 0 ? (
                    <p className="text-sm text-zinc-500">Processing your order...</p>
                  ) : (
                    <div className="relative pl-6">
                      <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-zinc-200" />
                      <ul className="space-y-6">
                        {order.updates.map((update, index) => {
                          const isLast = index === order.updates.length - 1;
                          return (
                            <li key={update.id} className="relative">
                              <div className={`absolute -left-6 top-1 h-3 w-3 rounded-full border-2 border-white ring-2 ${isLast ? "bg-brand-main ring-brand-main animate-pulse" : "bg-zinc-300 ring-zinc-200"}`} />
                              <div>
                                <p className={`text-sm font-medium ${isLast ? "text-brand-main" : "text-zinc-800"}`}>{update.title}</p>
                                <p className="mt-0.5 text-xs text-zinc-500 tracking-wide">
                                  {new Date(update.atMs).toLocaleString("en-LK", {
                                    year: "numeric", month: "short", day: "numeric",
                                    hour: "2-digit", minute: "2-digit"
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

                <ul className="space-y-2 text-sm text-zinc-700">
                  {order.items.map((item) => (
                    <li key={item.id}>{item.productName} x {item.quantity} ({formatLkr(item.priceLkr)})</li>
                  ))}
                </ul>

                {order.extraDetails && (
                  <div className="rounded bg-zinc-100 px-3 py-2 text-sm text-zinc-700">
                    <p className="font-medium text-zinc-900 mb-1">Extra details submitted</p>
                    <p>{order.extraDetails}</p>
                  </div>
                )}

                <div className="rounded border border-zinc-200 p-4">
                  <h3 className="font-semibold text-foreground mb-2">Handover Documents</h3>
                  {order.handoverDocuments.length === 0 ? (
                    <p className="text-sm text-zinc-500">No handover documents yet. You will be notified when files are ready.</p>
                  ) : (
                    <ul className="space-y-2 text-sm">
                      {order.handoverDocuments.map((doc) => (
                        <li key={doc.id}>
                          <a
                            href={doc.downloadUrl ?? doc.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-brand-main hover:underline"
                          >
                            {doc.fileName}
                          </a>
                          <span className="text-zinc-500"> - {new Date(doc.uploadedAtMs).toLocaleString("en-LK")}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="rounded border border-zinc-200 p-4 space-y-3">
                  <h3 className="font-semibold text-foreground">Revision Requests</h3>
                  {order.revisions.length === 0 ? (
                    <p className="text-sm text-zinc-500">No revision requests submitted yet.</p>
                  ) : (
                    <ul className="space-y-2 text-sm text-zinc-700">
                      {order.revisions.map((revision) => (
                        <li key={revision.id} className="rounded bg-zinc-50 px-3 py-2">
                          <p className="text-xs uppercase tracking-wide text-zinc-500">Status: {revision.status}</p>
                          <p className="mt-1">{revision.message}</p>
                          <p className="text-xs text-zinc-500 mt-1">
                            Requested: {new Date(revision.requestedAtMs).toLocaleString("en-LK")}
                          </p>
                          {revision.adminResponse && <p className="mt-1 text-zinc-600">Admin note: {revision.adminResponse}</p>}
                        </li>
                      ))}
                    </ul>
                  )}

                  <textarea
                    value={revisionDrafts[order.id] ?? ""}
                    onChange={(event) =>
                      setRevisionDrafts((previous) => ({
                        ...previous,
                        [order.id]: event.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="Need changes to final deliverables? Describe exactly what should be revised."
                    className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  />

                  <button
                    type="button"
                    onClick={() => void submitRevision(order.id)}
                    disabled={revisionLoadingOrderId === order.id || order.status === "cancelled"}
                    className="rounded bg-foreground px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
                  >
                    {revisionLoadingOrderId === order.id ? "Submitting..." : "Request Revision"}
                  </button>
                </div>

                <div className="rounded border border-zinc-200 p-4">
                  <h3 className="font-semibold text-foreground mb-2">Order Updates</h3>
                  {order.updates.length === 0 ? (
                    <p className="text-sm text-zinc-500">No updates yet.</p>
                  ) : (
                    <ul className="space-y-2 text-sm text-zinc-700">
                      {order.updates.map((update) => (
                        <li key={update.id} className="rounded bg-zinc-50 px-3 py-2">
                          <p className="font-medium text-zinc-900">{update.title}</p>
                          <p className="text-xs text-zinc-500">
                            {new Date(update.atMs).toLocaleString("en-LK")} by {update.actorRole}
                          </p>
                          {update.details && <p className="mt-1">{update.details}</p>}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
