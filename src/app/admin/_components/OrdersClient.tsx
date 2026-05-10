"use client";

import Link from "next/link";
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

const pageSize = 10;

function normalizeWhatsApp(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 10) return "94" + digits.slice(1);
  if (digits.startsWith("94") && digits.length === 11) return digits;
  return digits;
}

function csvEscape(value: unknown): string {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function formatIntake(order: AdminOrder): string {
  const intake = order.intake ?? {};
  const entries = Object.entries(intake).filter(([, value]) => value);
  if (entries.length === 0) return order.extraDetails ?? "";
  return entries.map(([key, value]) => `${key}: ${value}`).join(" | ");
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
  const [selectedOrderIds, setSelectedOrderIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const deleteOrders = async (orderIds: string[]) => {
    const uniqueIds = Array.from(new Set(orderIds)).filter(Boolean);
    if (uniqueIds.length === 0) {
      setError("Select at least one order to delete.");
      return;
    }

    const confirmed = window.confirm(`Delete ${uniqueIds.length} order${uniqueIds.length > 1 ? "s" : ""}? This cannot be undone.`);
    if (!confirmed) return;

    setDeleteLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderIds: uniqueIds }),
      });
      const payload = await readJsonSafely(response);
      if (!response.ok) {
        setError(typeof payload.error === "string" ? payload.error : "Failed to delete selected orders.");
        return;
      }

      setSelectedOrderIds(new Set());
      await loadOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete selected orders.");
    } finally {
      setDeleteLoading(false);
    }
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
        (order.source ?? "").toLowerCase().includes(query) ||
        order.paymentPersonName.toLowerCase().includes(query) ||
        order.paymentWhatsApp.toLowerCase().includes(query) ||
        order.items.some((item) => item.productName.toLowerCase().includes(query)) ||
        order.revisions.some((revision) => revision.message.toLowerCase().includes(query))
      );
    });
  }, [orders, search, statusFilter, activeTab]);

  useEffect(() => {
    setPage(1);
    setSelectedOrderIds(new Set());
  }, [activeTab, search, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const visibleOrders = filteredOrders.slice((page - 1) * pageSize, page * pageSize);
  const allVisibleSelected = visibleOrders.length > 0 && visibleOrders.every((order) => selectedOrderIds.has(order.id));

  const premiumSchedule = useMemo(() => {
    const counts = new Map<string, number>();
    for (const order of orders) {
      const hasFounderLed = order.items.some((item) => item.optionKey === "founder-led" || item.productName.toLowerCase().includes("founder-led"));
      if (!hasFounderLed) continue;
      const dateKey = order.etaDate || (order.createdAt ? new Date(order.createdAt).toISOString().slice(0, 10) : "Unscheduled");
      counts.set(dateKey, (counts.get(dateKey) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([date, count]) => ({ date, count, shownCapacity: 2, shownRemaining: Math.max(0, 2 - count) }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 14);
  }, [orders]);

  const orderStats = useMemo(() => {
    const pending = orders.filter((order) => order.status === "pending_payment" || order.status === "payment_submitted").length;
    const active = orders.filter((order) => order.status === "confirmed" || order.status === "in_progress").length;
    const completed = orders.filter((order) => order.status === "completed").length;
    const catalogue = orders.filter((order) => order.source === "catalogue").length;
    const revenue = orders
      .filter((order) => order.status !== "cancelled")
      .reduce((sum, order) => sum + order.totalLkr, 0);

    return { pending, active, completed, catalogue, revenue };
  }, [orders]);

  const exportOrders = (source: "all" | "catalogue") => {
    const selected = source === "catalogue" ? orders.filter((order) => order.source === "catalogue") : orders;
    const rows = [
      [
        "Order ID",
        "Source",
        "Created",
        "Status",
        "Customer Name",
        "Email",
        "WhatsApp",
        "Location",
        "Packages",
        "Services",
        "Experience",
        "Service Option",
        "Subtotal LKR",
        "Discount LKR",
        "Total LKR",
        "Payment Ref",
        "LinkedIn",
        "Current CV URL",
        "Payment Slip URL",
        "ETA",
        "Admin Notes",
        "Full Intake",
      ],
      ...selected.map((order) => [
        order.id,
        order.source ?? "website",
        order.createdAt ?? "",
        order.status,
        order.user.name,
        order.user.email,
        order.paymentWhatsApp,
        order.intake?.location ?? "",
        order.items.map((item) => item.productName).join(" + "),
        order.catalogueAnswers?.services?.join(" + ") ?? order.items.map((item) => item.serviceKey ?? "").filter(Boolean).join(" + "),
        order.catalogueAnswers?.experience ?? order.items.map((item) => item.experienceKey ?? "").filter(Boolean).join(" + "),
        order.catalogueAnswers?.serviceOption ?? order.items.map((item) => item.optionKey ?? "").filter(Boolean).join(" + "),
        String(order.subtotalLkr || order.totalLkr),
        String(order.couponDiscountLkr),
        String(order.totalLkr),
        order.paymentRef,
        order.linkedinUrl ?? order.intake?.linkedinUrl ?? "",
        order.currentCvUrl ?? "",
        order.paymentSlipUrl,
        order.etaDate ?? "",
        order.adminNotes ?? "",
        formatIntake(order),
      ]),
    ];

    downloadCsv(`${source}-orders-${new Date().toISOString().slice(0, 10)}.csv`, rows);
  };

  return (
    <section className="space-y-5">
 <div className="rounded-[18px] border border-zinc-200 bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-main">Main Workflow</p>
            <h2 className="mt-1 text-3xl font-bold font-plus-jakarta text-foreground">Order Management</h2>
 <p className="mt-1 text-sm text-zinc-600">Verify payment, set delivery dates, contact clients, upload final files, and export order data.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => exportOrders("catalogue")}
              className="rounded-[10px] bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Download Catalogue Excel
            </button>
            <button
              type="button"
              onClick={() => exportOrders("all")}
              className="rounded-[10px] border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
            >
              Download All Excel
            </button>
            <button
              type="button"
              onClick={() => void loadOrders()}
              className="rounded-[10px] bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-brand-dark"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
          {[
            { label: "Pending", value: orderStats.pending, tone: "text-amber-700 bg-amber-50 border-amber-200" },
            { label: "Active", value: orderStats.active, tone: "text-blue-700 bg-blue-50 border-blue-200" },
            { label: "Completed", value: orderStats.completed, tone: "text-emerald-700 bg-emerald-50 border-emerald-200" },
            { label: "Catalogue", value: orderStats.catalogue, tone: "text-brand-dark bg-brand-main/10 border-brand-main/25" },
            { label: "Revenue", value: formatLkr(orderStats.revenue), tone: "text-zinc-900 bg-zinc-50 border-zinc-200" },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                if (item.label === "Pending") setActiveTab("pending");
                if (item.label === "Active") setActiveTab("active");
                if (item.label === "Completed") setActiveTab("completed");
                if (item.label === "Catalogue") {
                  setActiveTab("all");
                  setSearch("catalogue");
                }
              }}
              className={`rounded-[14px] border p-4 text-left ${item.tone}`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] opacity-75">{item.label}</p>
              <p className="mt-2 text-2xl font-bold font-plus-jakarta">{item.value}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="overflow-x-auto rounded-[12px] border border-zinc-200">
            <table className="min-w-full divide-y divide-zinc-200 text-sm">
              <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-3 py-2">Customer</th>
                  <th className="px-3 py-2">Package</th>
                  <th className="px-3 py-2">Service Option</th>
                  <th className="px-3 py-2">Total</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white">
                {orders.slice(0, 10).map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50">
                    <td className="px-3 py-2">
                      <p className="font-semibold text-foreground">{order.user.name}</p>
                      <p className="text-xs text-zinc-500">{order.paymentWhatsApp}</p>
                    </td>
                    <td className="px-3 py-2 text-zinc-700">{order.items.map((item) => item.productName).join(", ")}</td>
                    <td className="px-3 py-2 text-zinc-700">
                      {order.catalogueAnswers?.serviceOption || order.items.map((item) => item.optionKey).filter(Boolean).join(", ") || "website"}
                    </td>
                    <td className="px-3 py-2 font-semibold">{formatLkr(order.totalLkr)}</td>
                    <td className="px-3 py-2">{statusDisplayLabels[order.status]}</td>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("all");
                          setStatusFilter("all");
                          setSearch("");
                          setPage(1);
                          setExpandedOrders(new Set([order.id]));
                          window.setTimeout(() => document.getElementById(`order-${order.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
                        }}
                        className="rounded-[8px] bg-foreground px-3 py-1.5 text-xs font-semibold text-background"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-[12px] border border-amber-200 bg-amber-50 p-4">
            <h3 className="font-plus-jakarta text-lg font-bold text-foreground">Signature Series Schedule</h3>
            <p className="mt-1 text-xs text-amber-800">Client-facing availability is shown as 2 premium slots per day.</p>
            <div className="mt-3 space-y-2">
              {premiumSchedule.length === 0 ? (
                <p className="text-sm text-zinc-500">No founder-led orders scheduled yet.</p>
              ) : (
                premiumSchedule.map((row) => (
                  <div key={row.date} className="flex items-center justify-between rounded-[8px] bg-white px-3 py-2 text-sm">
                    <span className="font-medium text-zinc-800">{row.date}</span>
                    <span className="text-zinc-600">{row.count}/{row.shownCapacity} booked, {row.shownRemaining} shown remaining</span>
                  </div>
                ))
              )}
            </div>
          </div>
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

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-[12px] border border-zinc-200 bg-zinc-50 p-3">
          <label className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700">
            <input
              type="checkbox"
              checked={allVisibleSelected}
              onChange={(event) => {
                setSelectedOrderIds((previous) => {
                  const next = new Set(previous);
                  for (const order of visibleOrders) {
                    if (event.target.checked) next.add(order.id);
                    else next.delete(order.id);
                  }
                  return next;
                });
              }}
              className="accent-brand-main"
            />
            Select visible orders
          </label>
          <button
            type="button"
            disabled={selectedOrderIds.size === 0 || deleteLoading}
            onClick={() => void deleteOrders(Array.from(selectedOrderIds))}
            className="rounded-[10px] border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleteLoading ? "Deleting..." : `Delete Selected (${selectedOrderIds.size})`}
          </button>
          <span className="text-sm text-zinc-500">
            Showing {visibleOrders.length} of {filteredOrders.length} orders
          </span>
        </div>

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      </div>

      {visibleOrders.map((order) => {
        const isExpanded = expandedOrders.has(order.id);
        const wa = normalizeWhatsApp(order.paymentWhatsApp);
        const daysSince = order.createdAt
          ? Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 86400000)
          : null;
        const packageSummary = order.items.map((i) => i.productName).join(", ") || "—";
        const openRevisions = order.revisions.filter((r) => r.status !== "resolved").length;

        return (
          <article id={`order-${order.id}`} key={order.id} className="rounded-[18px] border border-zinc-200 bg-white overflow-hidden shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 bg-zinc-50 px-5 py-2">
            <label className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600">
              <input
                type="checkbox"
                checked={selectedOrderIds.has(order.id)}
                onChange={(event) => {
                  setSelectedOrderIds((previous) => {
                    const next = new Set(previous);
                    if (event.target.checked) next.add(order.id);
                    else next.delete(order.id);
                    return next;
                  });
                }}
                className="accent-brand-main"
              />
              Select order
            </label>
            <button
              type="button"
              disabled={deleteLoading}
              onClick={() => void deleteOrders([order.id])}
              className="rounded-[8px] border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
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
              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <p className="mr-1 font-bold text-foreground">{formatLkr(order.totalLkr)}</p>
                {order.status === "payment_submitted" && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">Needs verification</span>
                )}
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
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="rounded-[8px] bg-foreground px-3 py-2 text-xs font-semibold text-background hover:bg-brand-dark"
                >
                  Full Details
                </Link>
                {order.status === "payment_submitted" && (
                  <button
                    type="button"
                    onClick={() => void updateOrderStatus(order.id, "confirmed")}
                    className="rounded-[8px] bg-brand-main px-3 py-2 text-xs font-semibold text-white hover:bg-brand-dark"
                  >
                    Confirm Payment
                  </button>
                )}
                {(order.status === "confirmed" || order.status === "payment_submitted") && (
                  <button
                    type="button"
                    onClick={() => void updateOrderStatus(order.id, "in_progress")}
                    className="rounded-[8px] border border-blue-300 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-800 hover:bg-blue-100"
                  >
                    Start Work
                  </button>
                )}
                {order.status === "in_progress" && (
                  <button
                    type="button"
                    onClick={() => void updateOrderStatus(order.id, "completed")}
                    className="rounded-[8px] border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
                  >
                    Mark Complete
                  </button>
                )}
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

              <div className="flex flex-wrap items-center gap-2 rounded-[12px] border border-zinc-200 bg-zinc-50 p-3">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">More pages</span>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="rounded-[8px] border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-foreground hover:border-brand-main hover:text-brand-main"
                >
                  Full Details
                </Link>
                <Link
                  href={`/admin/orders/${order.id}#intake`}
                  className="rounded-[8px] border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-foreground hover:border-brand-main hover:text-brand-main"
                >
                  Intake Details
                </Link>
                <Link
                  href={`/admin/orders/${order.id}#timeline`}
                  className="rounded-[8px] border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-foreground hover:border-brand-main hover:text-brand-main"
                >
                  Tracking
                </Link>
                <Link
                  href={`/admin/orders/${order.id}#revisions`}
                  className="rounded-[8px] border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-foreground hover:border-brand-main hover:text-brand-main"
                >
                  Revisions
                </Link>
              </div>

              {false && (
                <>
              {/* Order info */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-zinc-600">
                <span className="text-zinc-400">Paid by</span>
                <span>{order.paymentPersonName || "—"}</span>
                <span className="text-zinc-400">Ref</span>
                <span>{order.paymentRef || "—"}</span>
                <span className="text-zinc-400">Placed</span>
                <span>{order.createdAt ? new Date(order.createdAt ?? 0).toLocaleDateString("en-LK") : "—"}</span>
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

              {order.intake && (
                <div className="rounded-[10px] border border-zinc-200 bg-white p-4 text-sm text-zinc-700">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-zinc-900">Catalogue intake details</p>
                    <span className="rounded-full bg-brand-main/10 px-3 py-1 text-xs font-semibold text-brand-dark">
                      {order.catalogueAnswers?.experience ?? "catalogue"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {Object.entries(order.intake ?? {})
                      .filter(([, value]) => value)
                      .map(([key, value]) => (
                        <p key={key}>
                          <span className="font-medium text-zinc-500">{key}: </span>
                          <span>{value}</span>
                        </p>
                      ))}
                  </div>
                </div>
              )}
                </>
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

              {false && (
                <>
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
                </>
              )}
            </div>
          )}
        </article>
      );
      })}

      {filteredOrders.length > 0 && (
        <div className="flex flex-col gap-3 rounded-[14px] border border-zinc-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-500">
            Page {page} of {pageCount} | Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filteredOrders.length)} of {filteredOrders.length}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="rounded-[8px] border border-zinc-300 px-3 py-2 text-sm font-semibold text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= pageCount}
              onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
              className="rounded-[8px] border border-zinc-300 px-3 py-2 text-sm font-semibold text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {filteredOrders.length === 0 && <p className="text-sm text-zinc-500">No orders found for this filter.</p>}
    </section>
  );
}
