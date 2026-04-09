type OrderNotificationItem = {
  productName: string;
  quantity: number;
  priceLkr: number;
};

type OrderNotificationPayload = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  paymentRef: string;
  totalLkr: number;
  items: OrderNotificationItem[];
  status?: string;
};

function formatLkr(value: number): string {
  return `LKR ${value.toLocaleString("en-LK")}`;
}

function buildItemsSummary(items: OrderNotificationItem[]): string {
  return items.map((item) => `- ${item.productName} x ${item.quantity} (${formatLkr(item.priceLkr)})`).join("\n");
}

function buildOrderCreatedMessage(payload: OrderNotificationPayload): string {
  return [
    "New order placed on website",
    `Order ID: ${payload.orderId}`,
    `Customer: ${payload.customerName} (${payload.customerEmail})`,
    `Payment Ref: ${payload.paymentRef}`,
    `Total: ${formatLkr(payload.totalLkr)}`,
    "Items:",
    buildItemsSummary(payload.items),
  ].join("\n");
}

function buildOrderStatusMessage(payload: OrderNotificationPayload): string {
  return [
    "Order status updated",
    `Order ID: ${payload.orderId}`,
    `Customer: ${payload.customerName} (${payload.customerEmail})`,
    `New Status: ${payload.status ?? "unknown"}`,
    `Total: ${formatLkr(payload.totalLkr)}`,
  ].join("\n");
}

async function sendEmail(subject: string, text: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL_TO;
  const from = process.env.NOTIFICATION_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    return;
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
    }),
  });
}

async function sendWhatsApp(message: string): Promise<void> {
  const webhookUrl = process.env.WHATSAPP_NOTIFY_WEBHOOK_URL;
  if (!webhookUrl) {
    return;
  }

  await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      source: "website-order",
      sentAt: new Date().toISOString(),
    }),
  });
}

export async function notifyOrderCreated(payload: OrderNotificationPayload): Promise<void> {
  const message = buildOrderCreatedMessage(payload);
  const tasks = [
    sendEmail(`New order: ${payload.orderId}`, message),
    sendWhatsApp(message),
  ];

  const results = await Promise.allSettled(tasks);
  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Notification error:", result.reason);
    }
  }
}

export async function notifyOrderStatusChanged(payload: OrderNotificationPayload): Promise<void> {
  const message = buildOrderStatusMessage(payload);
  const tasks = [
    sendEmail(`Order status updated: ${payload.orderId}`, message),
    sendWhatsApp(message),
  ];

  const results = await Promise.allSettled(tasks);
  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Notification error:", result.reason);
    }
  }
}
