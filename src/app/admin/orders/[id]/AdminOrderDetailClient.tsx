"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { formatLkr, readJsonSafely } from "@/app/admin/_components/admin-utils";
import { statuses, type AdminOrder } from "@/app/admin/_components/admin-types";

const statusLabels: Record<AdminOrder["status"], string> = {
  pending_payment: "Pending Payment",
  payment_submitted: "Verify Payment",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

function normalizeWhatsApp(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 10) return "94" + digits.slice(1);
  if (digits.startsWith("94") && digits.length === 11) return digits;
  return digits;
}

export default function AdminOrderDetailClient({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [status, setStatus] = useState<AdminOrder["status"]>("payment_submitted");
  const [etaDate, setEtaDate] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadOrder = useCallback(async () => {
    const response = await fetch("/api/admin/orders", { cache: "no-store" });
    const payload = await readJsonSafely(response);
    if (!response.ok) {
      setError(typeof payload.error === "string" ? payload.error : "Failed to load order");
      return;
    }

    const orders = Array.isArray(payload.orders) ? (payload.orders as AdminOrder[]) : [];
    const found = orders.find((item) => item.id === orderId) ?? null;
    if (!found) {
      setError("Order not found.");
      return;
    }

    setOrder(found);
    setStatus(found.status);
    setEtaDate(found.etaDate ?? "");
    setAdminNotes(found.adminNotes ?? "");
    setError("");
  }, [orderId]);

  useEffect(() => {
    void loadOrder();
  }, [loadOrder]);

  const save = async (nextStatus = status) => {
    if (!order) return;
    setIsSaving(true);
    setError("");
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          status: nextStatus,
          etaDate: etaDate || null,
          adminNotes,
        }),
      });
      const payload = await readJsonSafely(response);
      if (!response.ok) {
        setError(typeof payload.error === "string" ? payload.error : "Failed to save order");
        return;
      }
      await loadOrder();
    } finally {
      setIsSaving(false);
    }
  };

  const deleteOrder = async () => {
    if (!order) return;
    const confirmed = window.confirm(`Delete order for ${order.user.name}? This cannot be undone.`);
    if (!confirmed) return;

    setIsDeleting(true);
    setError("");
    try {
      const response = await fetch("/api/admin/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id }),
      });
      const payload = await readJsonSafely(response);
      if (!response.ok) {
        setError(typeof payload.error === "string" ? payload.error : "Failed to delete order");
        return;
      }
      router.push("/admin/orders");
      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  };

  if (!order) {
    return (
      <section className="rounded-[18px] border border-zinc-200 bg-white p-6">
        <Link href="/admin/orders" className="text-sm font-semibold text-brand-main">Back to Orders</Link>
        <p className="mt-4 text-sm text-zinc-600">{error || "Loading order..."}</p>
      </section>
    );
  }

  const wa = normalizeWhatsApp(order.paymentWhatsApp);

  return (
    <section className="space-y-5">
      <div className="rounded-[18px] border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/admin/orders" className="text-sm font-semibold text-brand-main">Back to Orders</Link>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Order Details</p>
            <h2 className="mt-1 font-plus-jakarta text-3xl font-bold text-foreground">{order.user.name}</h2>
            <p className="mt-1 text-sm text-zinc-600">{order.user.email} | {order.paymentWhatsApp}</p>
          </div>
          <div className="rounded-[14px] bg-brand-main/10 p-4 text-right">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-dark">Total</p>
            <p className="mt-1 font-plus-jakarta text-3xl font-bold text-foreground">{formatLkr(order.totalLkr)}</p>
          </div>
        </div>

        {error && <p className="mt-4 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <div className="mt-6 flex flex-wrap gap-2">
          <a href="#packages" className="rounded-[10px] border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-foreground">
            Packages
          </a>
          {order.intake && (
            <a href="#intake" className="rounded-[10px] border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-foreground">
              Intake
            </a>
          )}
          <a href="#timeline" className="rounded-[10px] border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-foreground">
            Timeline
          </a>
          <a href="#revisions" className="rounded-[10px] border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-foreground">
            Revisions
          </a>
          {wa && (
            <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="rounded-[10px] bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white">
              WhatsApp Client
            </a>
          )}
          {order.paymentSlipUrl && (
            <a href={order.paymentSlipUrl} target="_blank" rel="noreferrer" className="rounded-[10px] border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-foreground">
              View Payment Slip
            </a>
          )}
          {order.currentCvUrl && (
            <a href={order.currentCvUrl} target="_blank" rel="noreferrer" className="rounded-[10px] border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-foreground">
              View Current CV
            </a>
          )}
          {order.linkedinUrl && (
            <a href={order.linkedinUrl} target="_blank" rel="noreferrer" className="rounded-[10px] border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-foreground">
              LinkedIn
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[380px_minmax(0,1fr)]">
        <aside className="space-y-5">
          <div className="rounded-[18px] border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="font-plus-jakarta text-xl font-bold text-foreground">Manage Order</h3>
            <label className="mt-4 block text-sm font-semibold text-zinc-700">
              Status
              <select value={status} onChange={(event) => setStatus(event.target.value as AdminOrder["status"])} className="mt-2 w-full rounded-[10px] border border-zinc-300 px-3 py-3">
                {statuses.map((item) => <option key={item} value={item}>{statusLabels[item]}</option>)}
              </select>
            </label>
            <label className="mt-4 block text-sm font-semibold text-zinc-700">
              Estimated Delivery Date
              <input type="date" value={etaDate} onChange={(event) => setEtaDate(event.target.value)} className="mt-2 w-full rounded-[10px] border border-zinc-300 px-3 py-3" />
            </label>
            <label className="mt-4 block text-sm font-semibold text-zinc-700">
              Internal Admin Notes
              <textarea rows={5} value={adminNotes} onChange={(event) => setAdminNotes(event.target.value)} className="mt-2 w-full rounded-[10px] border border-zinc-300 px-3 py-3" />
            </label>
            <button type="button" disabled={isSaving} onClick={() => void save()} className="mt-4 w-full rounded-[10px] bg-brand-main px-4 py-3 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60">
              Save Order Details
            </button>
          </div>

          <div className="rounded-[18px] border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="font-plus-jakarta text-xl font-bold text-foreground">Fast Actions</h3>
            <div className="mt-4 grid grid-cols-1 gap-2">
              <button type="button" onClick={() => { setStatus("confirmed"); void save("confirmed"); }} className="rounded-[10px] border border-brand-main bg-brand-main/10 px-4 py-2.5 text-sm font-semibold text-brand-dark">
                Confirm Payment
              </button>
              <button type="button" onClick={() => { setStatus("in_progress"); void save("in_progress"); }} className="rounded-[10px] border border-blue-300 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-800">
                Start Work
              </button>
              <button type="button" onClick={() => { setStatus("completed"); void save("completed"); }} className="rounded-[10px] border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800">
                Mark Complete
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => void deleteOrder()}
                className="rounded-[10px] border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete Order"}
              </button>
            </div>
          </div>
        </aside>

        <div className="space-y-5">
          <div id="packages" className="rounded-[18px] border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="font-plus-jakarta text-xl font-bold text-foreground">Packages</h3>
            <div className="mt-4 space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="rounded-[12px] border border-zinc-200 bg-zinc-50 p-4">
                  <p className="font-semibold text-foreground">{item.productName}</p>
                  <p className="mt-1 text-sm text-zinc-600">{formatLkr(item.priceLkr)} x {item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {order.intake && (
            <div id="intake" className="rounded-[18px] border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="font-plus-jakarta text-xl font-bold text-foreground">Client Intake Details</h3>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {Object.entries(order.intake).filter(([, value]) => value).map(([key, value]) => (
                  <div key={key} className="rounded-[12px] border border-zinc-200 bg-zinc-50 p-3">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">{key}</p>
                    <p className="mt-1 text-sm text-zinc-800">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div id="timeline" className="rounded-[18px] border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="font-plus-jakarta text-xl font-bold text-foreground">Progress Timeline</h3>
            <div className="mt-4 space-y-3">
              {order.updates.length === 0 ? (
                <p className="text-sm text-zinc-500">No updates yet.</p>
              ) : (
                order.updates.map((update) => (
                  <div key={update.id} className="rounded-[12px] border-l-4 border-brand-main bg-zinc-50 p-4">
                    <p className="font-semibold text-foreground">{update.title}</p>
                    <p className="mt-1 text-xs text-zinc-500">{new Date(update.atMs).toLocaleString("en-LK")} by {update.actorRole}</p>
                    {update.details && <p className="mt-2 text-sm text-zinc-700">{update.details}</p>}
                  </div>
                ))
              )}
            </div>
          </div>

          <div id="revisions" className="rounded-[18px] border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="font-plus-jakarta text-xl font-bold text-foreground">Revision Requests</h3>
            <div className="mt-4 space-y-3">
              {order.revisions.length === 0 ? (
                <p className="text-sm text-zinc-500">No revision requests from customer yet.</p>
              ) : (
                order.revisions.map((revision) => (
                  <div key={revision.id} className="rounded-[12px] border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">Status: {revision.status}</p>
                    <p className="mt-2 text-sm text-zinc-800">{revision.message}</p>
                    <p className="mt-2 text-xs text-zinc-500">Requested: {new Date(revision.requestedAtMs).toLocaleString("en-LK")}</p>
                    {revision.adminResponse && <p className="mt-2 text-xs text-zinc-600">Last admin note: {revision.adminResponse}</p>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
