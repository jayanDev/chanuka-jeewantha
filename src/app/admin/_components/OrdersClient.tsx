"use client";

import { useEffect, useMemo, useState } from "react";
import { formatLkr, readJsonSafely } from "@/app/admin/_components/admin-utils";
import { statuses, type AdminOrder } from "@/app/admin/_components/admin-types";

export default function OrdersClient() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminOrder["status"] | "all">("all");
  const [error, setError] = useState("");
  const [handoverFiles, setHandoverFiles] = useState<Record<string, File[]>>({});
  const [handoverNotes, setHandoverNotes] = useState<Record<string, string>>({});
  const [handoverLoadingOrderId, setHandoverLoadingOrderId] = useState("");

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

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((order) => {
      const byStatus = statusFilter === "all" || order.status === statusFilter;
      if (!byStatus) return false;
      if (!query) return true;

      return (
        order.user.name.toLowerCase().includes(query) ||
        order.user.email.toLowerCase().includes(query) ||
        order.paymentRef.toLowerCase().includes(query) ||
        order.paymentPersonName.toLowerCase().includes(query) ||
        order.paymentWhatsApp.toLowerCase().includes(query) ||
        order.items.some((item) => item.productName.toLowerCase().includes(query))
      );
    });
  }, [orders, search, statusFilter]);

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
            className="rounded bg-foreground px-4 py-2 text-sm text-white"
          >
            Refresh
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

      {filteredOrders.map((order) => (
        <article key={order.id} className="rounded-[16px] border border-zinc-200 bg-white p-6 space-y-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">
                {order.user.name} ({order.user.email})
              </h3>
              {order.createdAt && (
                <p className="text-sm text-zinc-500">Placed: {new Date(order.createdAt).toLocaleString("en-LK")}</p>
              )}
              <p className="text-sm text-zinc-500">Reference: {order.paymentRef || "-"}</p>
              <p className="text-sm text-zinc-500">Paid by: {order.paymentPersonName || "-"}</p>
              <p className="text-sm text-zinc-500">WhatsApp: {order.paymentWhatsApp || "-"}</p>
              <p className="text-sm text-zinc-500">Subtotal: {formatLkr(order.subtotalLkr || order.totalLkr)}</p>
              {order.couponDiscountLkr > 0 && (
                <p className="text-sm text-zinc-500">
                  Coupon {order.couponCode ? `(${order.couponCode})` : ""}: -{formatLkr(order.couponDiscountLkr)}
                </p>
              )}
              <p className="text-sm font-semibold text-foreground">Total: {formatLkr(order.totalLkr)}</p>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <select
                aria-label="Order status update"
                value={order.status}
                onChange={(event) => void updateOrderStatus(order.id, event.target.value as AdminOrder["status"])}
                className="rounded border border-zinc-300 px-3 py-2"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              {order.paymentSlipUrl ? (
                <a href={order.paymentSlipUrl} target="_blank" rel="noreferrer" className="text-sm text-brand-main font-medium">
                  View Payment Slip
                </a>
              ) : (
                <p className="text-xs text-zinc-500">No payment slip URL</p>
              )}
              {order.paymentSlipUploadFailed && (
                <span className="inline-flex rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                  Slip upload failed, follow up on WhatsApp
                </span>
              )}
              {order.currentCvUrl ? (
                <a href={order.currentCvUrl} target="_blank" rel="noreferrer" className="text-sm text-brand-main font-medium">
                  View Current CV ({order.currentCvFileName ?? "file"})
                </a>
              ) : order.currentCvUploadFailed ? (
                <span className="inline-flex rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                  CV upload failed, request manually
                </span>
              ) : (
                <span className="text-xs text-zinc-500">No current CV submitted</span>
              )}
              {order.linkedinUrl && (
                <a href={order.linkedinUrl} target="_blank" rel="noreferrer" className="text-sm text-brand-main font-medium">
                  Open LinkedIn Profile
                </a>
              )}
            </div>
          </div>

          {order.extraDetails && (
            <div className="rounded border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
              <p className="font-medium text-zinc-900 mb-1">Extra details from customer</p>
              <p>{order.extraDetails}</p>
            </div>
          )}

          <ul className="space-y-2 text-sm text-zinc-700">
            {order.items.map((item) => (
              <li key={item.id}>{item.productName} x {item.quantity} ({formatLkr(item.priceLkr)})</li>
            ))}
          </ul>

          <div className="rounded border border-zinc-200 p-4 space-y-3">
            <h4 className="font-semibold text-foreground">Handover Documents</h4>
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

          <div className="rounded border border-zinc-200 p-4">
            <h4 className="font-semibold text-foreground mb-3">Progress Timeline</h4>
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

      {filteredOrders.length === 0 && <p className="text-sm text-zinc-500">No orders found for this filter.</p>}
    </section>
  );
}
