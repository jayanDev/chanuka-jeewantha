"use client";

import { useEffect, useMemo, useState } from "react";
import { formatLkr, readJsonSafely } from "@/app/admin/_components/admin-utils";
import { statuses, type AdminOrder } from "@/app/admin/_components/admin-types";

const statusDisplayLabels: Record<AdminOrder["status"], string> = {
  pending_payment: "Pending Payment",
  payment_submitted: "Verify Payment ⚡",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed ✓",
  cancelled: "Cancelled",
};

const statusBadgeColors: Record<AdminOrder["status"], string> = {
  pending_payment: "bg-zinc-100 text-zinc-700",
  payment_submitted: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  in_progress: "bg-purple-100 text-purple-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-700",
};

function normalizeWhatsApp(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 10) return "94" + digits.slice(1);
  if (digits.startsWith("94") && digits.length === 11) return digits;
  return digits;
}

export default function OrdersClient() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminOrder["status"] | "all">("all");
  const [error, setError] = useState("");
  const [handoverFiles, setHandoverFiles] = useState<Record<string, File[]>>({});
  const [handoverNotes, setHandoverNotes] = useState<Record<string, string>>({});
  const [handoverLoadingOrderId, setHandoverLoadingOrderId] = useState("");
  const [revisionResponses, setRevisionResponses] = useState<Record<string, string>>({});
  const [revisionLoadingKey, setRevisionLoadingKey] = useState("");

  const [activeTab, setActiveTab] = useState<"pending" | "active" | "completed" | "all">("pending");
  const [updateTitleDrafts, setUpdateTitleDrafts] = useState<Record<string, string>>({});
  const [updateDetailsDrafts, setUpdateDetailsDrafts] = useState<Record<string, string>>({});
  const [updateLoadingOrderId, setUpdateLoadingOrderId] = useState("");
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [etaDrafts, setEtaDrafts] = useState<Record<string, string>>({});
  const [notesDrafts, setNotesDrafts] = useState<Record<string, string>>({});
  const [savingMetaOrderId, setSavingMetaOrderId] = useState("");

  const toggleExpand = (orderId: string) => {
    setExpandedOrders((prev) => {
      const next = new Set(prev);
      if (next.has(orderId)) next.delete(orderId);
      else next.add(orderId);
      return next;
    });
  };

  const saveOrderMeta = async (order: AdminOrder, etaDate?: string, adminNotes?: string) => {
    setSavingMetaOrderId(order.id);
    setError("");
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          status: order.status,
          ...(etaDate !== undefined ? { etaDate: etaDate || null } : {}),
          ...(adminNotes !== undefined ? { adminNotes } : {}),
        }),
      });
      const payload = await readJsonSafely(response);
      if (!response.ok) {
        setError(typeof payload.error === "string" ? payload.error : "Failed to save");
        return;
      }
      await loadOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSavingMetaOrderId("");
    }
  };

  const loadOrders = async () => {
    const response = await fetch("/api/admin/orders", { cache: "no-store" });
    const payload = await readJsonSafely(response);

    if (!response.ok) {
      setError(typeof payload.error === "string" ? payload.error : "Failed to load orders");
      setOrders([]);
      return;
    }

    setError("");
    setOrders(Array.isArray(payload.orders) ? (payload.orders as AdminOrder[]) : []);
  };

  useEffect(() => {
    void loadOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, status: AdminOrder["status"]) => {
    const response = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });

    const payload = await readJsonSafely(response);
    if (!response.ok) {
      setError(typeof payload.error === "string" ? payload.error : "Failed to update order status");
      return;
    }

    setError("");
    await loadOrders();
  };

  const uploadHandover = async (orderId: string) => {
    const files = handoverFiles[orderId] ?? [];
    if (files.length === 0) {
      setError("Select at least one handover document before uploading.");
      return;
    }

    setHandoverLoadingOrderId(orderId);
    setError("");
    try {
      const formData = new FormData();
      formData.append("orderId", orderId);
      formData.append("note", handoverNotes[orderId] ?? "");
      for (const file of files) {
        formData.append("documents", file);
      }

      const response = await fetch("/api/admin/orders/handover", {
        method: "POST",
        body: formData,
      });
      const payload = await readJsonSafely(response);

      if (!response.ok) {
        setError(typeof payload.error === "string" ? payload.error : "Failed to upload handover documents");
        return;
      }

      setHandoverFiles((previous) => ({ ...previous, [orderId]: [] }));
      setHandoverNotes((previous) => ({ ...previous, [orderId]: "" }));
      await loadOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload handover documents");
    } finally {
      setHandoverLoadingOrderId("");
    }
  };

  const updateRevision = async (input: {
    orderId: string;
    revisionId: string;
    status: "in_review" | "resolved";
  }) => {
    const key = `${input.orderId}:${input.revisionId}:${input.status}`;
    setRevisionLoadingKey(key);
    setError("");

    try {
      const response = await fetch("/api/admin/orders/revisions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: input.orderId,
          revisionId: input.revisionId,
          status: input.status,
          adminResponse: revisionResponses[input.revisionId] ?? "",
        }),
      });
      const payload = await readJsonSafely(response);

      if (!response.ok) {
        setError(typeof payload.error === "string" ? payload.error : "Failed to update revision status");
        return;
      }

      setRevisionResponses((previous) => ({ ...previous, [input.revisionId]: "" }));
      await loadOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update revision status");
    } finally {
      setRevisionLoadingKey("");
    }
  };

  const submitCustomUpdate = async (orderId: string, predefinedTitle?: string) => {
    const title = predefinedTitle || (updateTitleDrafts[orderId] ?? "").trim();
    if (!title) {
      setError("Update title is required.");
      return;
    }

    setUpdateLoadingOrderId(orderId);
    setError("");

    try {
      const response = await fetch("/api/admin/orders/updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          title,
          details: updateDetailsDrafts[orderId] ?? "",
        }),
      });
      const payload = await readJsonSafely(response);

      if (!response.ok) {
        setError(typeof payload.error === "string" ? payload.error : "Failed to add update");
        return;
      }

      setUpdateTitleDrafts((previous) => ({ ...previous, [orderId]: "" }));
      setUpdateDetailsDrafts((previous) => ({ ...previous, [orderId]: "" }));
      await loadOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add update");
    } finally {
      setUpdateLoadingOrderId("");
    }
  };

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((order) => {
      if (activeTab === "pending" && order.status !== "pending_payment" && order.status !== "payment_submitted") return false;
      if (activeTab === "active" && order.status !== "confirmed" && order.status !== "in_progress") return false;
      if (activeTab === "completed" && order.status !== "completed" && order.status !== "cancelled") return false;

      const byStatus = statusFilter === "all" || order.status === statusFilter;
      if (!byStatus) return false;
      if (!query) return true;

      return (
        order.user.name.toLowerCase().includes(query) ||
        order.user.email.toLowerCase().includes(query) ||
        order.paymentRef.toLowerCase().includes(query) ||
        order.paymentPersonName.toLowerCase().includes(query) ||
        order.paymentWhatsApp.toLowerCase().includes(query) ||
        order.items.some((item) => item.productName.toLowerCase().includes(query)) ||
        order.revisions.some((revision) => revision.message.toLowerCase().includes(query))
      );
    });
  }, [orders, search, statusFilter, activeTab]);

  return (
    <section className="space-y-4">
 <div className="rounded-[16px] border border-zinc-200 bg-white p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold font-plus-jakarta">Order Management</h2>
 <p className="text-sm text-zinc-600">Search, filter, track progress, and hand over final documents.</p>
          </div>
          <button
            type="button"
            onClick={() => void loadOrders()}
            className="rounded bg-foreground px-4 py-2 text-sm text-background"
          >
            Refresh
          </button>
        </div>

 <div className="mt-6 flex border-b border-zinc-200">
          <button
            type="button"
 className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === "pending" ? "border-brand-main text-brand-main" : "border-transparent text-zinc-500 hover:text-zinc-700"}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Verification
          </button>
          <button
            type="button"
 className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === "active" ? "border-brand-main text-brand-main" : "border-transparent text-zinc-500 hover:text-zinc-700"}`}
            onClick={() => setActiveTab("active")}
          >
            Active Work
          </button>
          <button
            type="button"
 className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === "completed" ? "border-brand-main text-brand-main" : "border-transparent text-zinc-500 hover:text-zinc-700"}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed/Cancelled
          </button>
          <button
            type="button"
 className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === "all" ? "border-brand-main text-brand-main" : "border-transparent text-zinc-500 hover:text-zinc-700"}`}
            onClick={() => setActiveTab("all")}
          >
            All Orders
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search customer, email, ref, package"
            aria-label="Order search"
 className="rounded border border-zinc-300 px-3 py-2 text-sm"
          />
          <select
            aria-label="Order status filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as AdminOrder["status"] | "all")}
 className="rounded border border-zinc-300 px-3 py-2 text-sm"
          >
            <option value="all">All statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      </div>

      {filteredOrders.map((order) => {
        const isExpanded = expandedOrders.has(order.id);
        const wa = normalizeWhatsApp(order.paymentWhatsApp);
        const daysSince = order.createdAt
          ? Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 86400000)
          : null;
        const packageSummary = order.items.map((i) => i.productName).join(", ") || "—";
        const openRevisions = order.revisions.filter((r) => r.status !== "resolved").length;

        return <article key={order.id} className="rounded-[16px] border border-zinc-200 bg-white overflow-hidden">
          {/* Collapsed header */}
          <button
            type="button"
            onClick={() => toggleExpand(order.id)}
            className="w-full text-left px-5 py-4 hover:bg-zinc-50 transition-colors"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadgeColors[order.status]}`}>
                    {statusDisplayLabels[order.status]}
                  </span>
                  {openRevisions > 0 && (
                    <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                      {openRevisions} revision{openRevisions > 1 ? "s" : ""}
                    </span>
                  )}
                  {daysSince !== null && (
                    <span className={`text-xs font-medium ${daysSince >= 5 ? "text-red-600" : "text-zinc-400"}`}>
                      {daysSince}d ago
                    </span>
                  )}
                </div>
                <p className="font-semibold text-foreground text-sm truncate">
                  {order.user.name} · {packageSummary}
                </p>
                <p className="text-xs text-zinc-500">{order.user.email}</p>
              </div>
              <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1">
                <p className="font-bold text-foreground">{formatLkr(order.totalLkr)}</p>
                <span className="text-xs text-zinc-400">{isExpanded ? "▲ Collapse" : "▼ Expand"}</span>
              </div>
            </div>
          </button>

          {/* Expanded detail */}
          {isExpanded && (
            <div className="border-t border-zinc-100 px-5 py-5 space-y-5">

              {/* Quick actions row */}
              <div className="flex flex-wrap items-center gap-3">
                <select
                  aria-label="Order status update"
                  value={order.status}
                  onChange={(event) => void updateOrderStatus(order.id, event.target.value as AdminOrder["status"])}
                  className="rounded-[8px] border border-zinc-300 px-3 py-2 text-sm font-medium"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{statusDisplayLabels[status]}</option>
                  ))}
                </select>
                {wa && (
                  <a
                    href={`https://wa.me/${wa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-[8px] bg-[#25D366] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1fb85a]"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.538 5.875L0 24l6.29-1.514A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.98 0-3.823-.549-5.395-1.501l-.387-.231-4.017.967.985-3.906-.254-.4A9.775 9.775 0 012.182 12C2.182 6.567 6.567 2.182 12 2.182c5.432 0 9.818 4.385 9.818 9.818 0 5.432-4.386 9.818-9.818 9.818z"/></svg>
                    WhatsApp {order.paymentWhatsApp}
                  </a>
                )}
                {order.paymentSlipUrl ? (
                  <a href={order.paymentSlipUrl} target="_blank" rel="noreferrer" className="text-sm text-brand-main font-medium hover:underline">
                    View Slip
                  </a>
                ) : (
                  <span className="text-xs text-zinc-400">No slip</span>
                )}
                {order.paymentSlipUploadFailed && (
                  <span className="inline-flex rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                    Slip upload failed
                  </span>
                )}
                {order.currentCvUrl ? (
                  <a href={order.currentCvUrl} target="_blank" rel="noreferrer" className="text-sm text-brand-main font-medium hover:underline">
                    View CV
                  </a>
                ) : order.currentCvUploadFailed ? (
                  <span className="inline-flex rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">CV upload failed</span>
                ) : null}
                {order.linkedinUrl && (
                  <a href={order.linkedinUrl} target="_blank" rel="noreferrer" className="text-sm text-brand-main font-medium hover:underline">
                    LinkedIn
                  </a>
                )}
              </div>

              {/* Order info */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-zinc-600">
                <span className="text-zinc-400">Paid by</span>
                <span>{order.paymentPersonName || "—"}</span>
                <span className="text-zinc-400">Ref</span>
                <span>{order.paymentRef || "—"}</span>
                <span className="text-zinc-400">Placed</span>
                <span>{order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-LK") : "—"}</span>
                <span className="text-zinc-400">Subtotal</span>
                <span>{formatLkr(order.subtotalLkr || order.totalLkr)}</span>
                {order.couponDiscountLkr > 0 && (
                  <>
                    <span className="text-zinc-400">Coupon {order.couponCode ? `(${order.couponCode})` : ""}</span>
                    <span className="text-emerald-700">-{formatLkr(order.couponDiscountLkr)}</span>
                  </>
                )}
              </div>

              {/* Items */}
              <ul className="text-sm text-zinc-700 space-y-0.5">
                {order.items.map((item) => (
                  <li key={item.id}>• {item.productName} × {item.quantity} ({formatLkr(item.priceLkr)})</li>
                ))}
              </ul>

              {order.extraDetails && (
                <div className="rounded-[8px] border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
                  <p className="font-medium text-zinc-900 mb-1">Extra details from customer</p>
                  <p>{order.extraDetails}</p>
                </div>
              )}

              {/* ETA + Admin Notes */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 rounded-[10px] border border-zinc-200 bg-zinc-50 p-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-zinc-600">Estimated Delivery Date</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={etaDrafts[order.id] ?? (order.etaDate ?? "")}
                      onChange={(e) => setEtaDrafts((p) => ({ ...p, [order.id]: e.target.value }))}
                      className="flex-1 rounded-[8px] border border-zinc-300 px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      disabled={savingMetaOrderId === order.id}
                      onClick={() => void saveOrderMeta(order, etaDrafts[order.id] ?? (order.etaDate ?? ""))}
                      className="rounded-[8px] bg-foreground px-3 py-2 text-xs font-medium text-background hover:bg-zinc-800 disabled:opacity-60"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-zinc-600">Internal Admin Notes (not visible to customer)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={notesDrafts[order.id] ?? (order.adminNotes ?? "")}
                      onChange={(e) => setNotesDrafts((p) => ({ ...p, [order.id]: e.target.value }))}
                      placeholder="e.g. Called customer, agreed on Thursday..."
                      className="flex-1 rounded-[8px] border border-zinc-300 px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      disabled={savingMetaOrderId === order.id}
                      onClick={() => void saveOrderMeta(order, undefined, notesDrafts[order.id] ?? (order.adminNotes ?? ""))}
                      className="rounded-[8px] bg-foreground px-3 py-2 text-xs font-medium text-background hover:bg-zinc-800 disabled:opacity-60"
                    >
                      Save
                    </button>
                  </div>
                  {order.adminNotes && (
                    <p className="text-xs text-zinc-500 italic">{order.adminNotes}</p>
                  )}
                </div>
              </div>

              {/* Handover Documents */}
              <div className="rounded-[10px] border border-zinc-200 p-4 space-y-3">
                <h4 className="font-semibold text-foreground text-sm">Handover Documents</h4>
                {order.handoverDocuments.length === 0 ? (
                  <p className="text-sm text-zinc-500">No handover files uploaded yet.</p>
                ) : (
                  <ul className="space-y-1 text-sm">
                    {order.handoverDocuments.map((doc) => (
                      <li key={doc.id}>
                        <a href={doc.url} target="_blank" rel="noreferrer" className="text-brand-main hover:underline">
                          {doc.fileName}
                        </a>
                        <span className="text-zinc-500"> ({new Date(doc.uploadedAtMs).toLocaleString("en-LK")})</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <input
                    type="file"
                    multiple
                    aria-label="Select handover documents"
                    title="Select handover documents"
                    onChange={(event) =>
                      setHandoverFiles((previous) => ({
                        ...previous,
                        [order.id]: event.target.files ? Array.from(event.target.files) : [],
                      }))
                    }
                    className="rounded border border-zinc-300 px-3 py-2 text-sm"
                    accept=".pdf,.doc,.docx,.zip"
                  />
                  <input
                    type="text"
                    value={handoverNotes[order.id] ?? ""}
                    onChange={(event) =>
                      setHandoverNotes((previous) => ({
                        ...previous,
                        [order.id]: event.target.value,
                      }))
                    }
                    placeholder="Optional handover note"
                    className="rounded border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => void uploadHandover(order.id)}
                  disabled={handoverLoadingOrderId === order.id}
                  className="rounded bg-brand-main px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60"
                >
                  {handoverLoadingOrderId === order.id ? "Uploading..." : "Upload & Handover to Customer"}
                </button>
              </div>

              {/* Progress Timeline */}
              <div className="rounded-[10px] border border-zinc-200 p-4">
                <h4 className="font-semibold text-foreground mb-3 text-sm">Progress Timeline & Live Tracking</h4>
                {order.updates.length === 0 ? (
                  <p className="text-sm text-zinc-500">No updates yet.</p>
                ) : (
                  <ul className="space-y-2 text-sm text-zinc-700 mb-4">
                    {order.updates.map((update) => (
                      <li key={update.id} className="rounded bg-zinc-50 px-3 py-2 border-l-2 border-brand-main">
                        <p className="font-medium text-zinc-900">{update.title}</p>
                        <p className="text-xs text-zinc-500">
                          {new Date(update.atMs).toLocaleString("en-LK")} by {update.actorRole}
                        </p>
                        {update.details && <p className="mt-1">{update.details}</p>}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="pt-3 border-t border-zinc-200 space-y-3">
                  <p className="text-sm font-medium text-foreground">Post a Live Tracking Update</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => void submitCustomUpdate(order.id, "CV Analysis Started 🔍")}
                      disabled={updateLoadingOrderId === order.id}
                      className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-brand-main disabled:opacity-60"
                    >
                      Analysis Started
                    </button>
                    <button
                      type="button"
                      onClick={() => void submitCustomUpdate(order.id, "First Draft Preparing 📝")}
                      disabled={updateLoadingOrderId === order.id}
                      className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-brand-main disabled:opacity-60"
                    >
                      Drafting
                    </button>
                    <button
                      type="button"
                      onClick={() => void submitCustomUpdate(order.id, "Finalizing Documents ✨")}
                      disabled={updateLoadingOrderId === order.id}
                      className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-brand-main disabled:opacity-60"
                    >
                      Finalizing Docs
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row">
                    <input
                      type="text"
                      placeholder="Custom tracking title (e.g., Calling for details)"
                      value={updateTitleDrafts[order.id] ?? ""}
                      onChange={(e) => setUpdateTitleDrafts(prev => ({ ...prev, [order.id]: e.target.value }))}
                      className="flex-1 rounded border border-zinc-300 px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => void submitCustomUpdate(order.id)}
                      disabled={updateLoadingOrderId === order.id || !(updateTitleDrafts[order.id]?.trim())}
                      className="rounded bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-zinc-800 disabled:opacity-60"
                    >
                      Post Update
                    </button>
                  </div>
                </div>
              </div>

              {/* Revision Requests */}
              <div className="rounded-[10px] border border-zinc-200 p-4 space-y-3">
                <h4 className="font-semibold text-foreground text-sm">Revision Requests</h4>
                {order.revisions.length === 0 ? (
                  <p className="text-sm text-zinc-500">No revision requests from customer yet.</p>
                ) : (
                  <ul className="space-y-3 text-sm">
                    {order.revisions.map((revision) => {
                      const inReviewKey = `${order.id}:${revision.id}:in_review`;
                      const resolvedKey = `${order.id}:${revision.id}:resolved`;

                      return (
                        <li key={revision.id} className="rounded border border-zinc-200 bg-zinc-50 p-3 space-y-2">
                          <p className="text-xs uppercase tracking-wide text-zinc-500">Status: {revision.status}</p>
                          <p className="text-zinc-800">{revision.message}</p>
                          <p className="text-xs text-zinc-500">
                            Requested: {new Date(revision.requestedAtMs).toLocaleString("en-LK")}
                          </p>
                          {revision.adminResponse && (
                            <p className="text-xs text-zinc-600">Last admin note: {revision.adminResponse}</p>
                          )}

                          <input
                            type="text"
                            value={revisionResponses[revision.id] ?? ""}
                            onChange={(event) =>
                              setRevisionResponses((previous) => ({
                                ...previous,
                                [revision.id]: event.target.value,
                              }))
                            }
                            placeholder="Add admin note for customer"
                            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                          />

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                void updateRevision({
                                  orderId: order.id,
                                  revisionId: revision.id,
                                  status: "in_review",
                                })
                              }
                              disabled={revisionLoadingKey === inReviewKey || revision.status === "in_review"}
                              className="rounded border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-brand-main hover:text-brand-main disabled:opacity-60"
                            >
                              {revisionLoadingKey === inReviewKey ? "Updating..." : "Mark In Progress"}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                void updateRevision({
                                  orderId: order.id,
                                  revisionId: revision.id,
                                  status: "resolved",
                                })
                              }
                              disabled={revisionLoadingKey === resolvedKey || revision.status === "resolved"}
                              className="rounded bg-brand-main px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-dark disabled:opacity-60"
                            >
                              {revisionLoadingKey === resolvedKey ? "Resolving..." : "Mark Resolved"}
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          )}
        </article>
      );
      })}

      {filteredOrders.length === 0 && <p className="text-sm text-zinc-500">No orders found for this filter.</p>}
    </section>
  );
}
