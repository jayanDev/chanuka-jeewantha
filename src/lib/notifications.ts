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

type OrderHandoverPayload = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  documents: Array<{
    fileName: string;
    url: string;
  }>;
  note?: string;
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

function buildOrderHandoverMessage(payload: OrderHandoverPayload): string {
  return [
    "Your order handover is ready",
    `Order ID: ${payload.orderId}`,
    `Customer: ${payload.customerName} (${payload.customerEmail})`,
    payload.note ? `Admin Note: ${payload.note}` : null,
    "Documents:",
    ...payload.documents.map((doc) => `- ${doc.fileName}: ${doc.url}`),
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n");
}

async function sendAdminEmail(subject: string, text: string): Promise<void> {
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

async function sendCustomerEmail(toEmail: string, subject: string, text: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFICATION_EMAIL_FROM;

  if (!apiKey || !from || !toEmail) {
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
      to: toEmail,
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
    sendAdminEmail(`New order: ${payload.orderId}`, message),
    sendCustomerEmail(
      payload.customerEmail,
      `Order received: ${payload.orderId}`,
      [
        "We received your order successfully.",
        `Order ID: ${payload.orderId}`,
        `Payment Ref: ${payload.paymentRef}`,
        `Total: ${formatLkr(payload.totalLkr)}`,
        "We will review and update your order progress soon.",
      ].join("\n")
    ),
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
    sendAdminEmail(`Order status updated: ${payload.orderId}`, message),
    sendCustomerEmail(
      payload.customerEmail,
      `Order update: ${payload.orderId}`,
      [
        `Your order status is now: ${payload.status ?? "updated"}`,
        `Order ID: ${payload.orderId}`,
        `Total: ${formatLkr(payload.totalLkr)}`,
        "Login to your account to view full progress and updates.",
      ].join("\n")
    ),
    sendWhatsApp(message),
  ];

  const results = await Promise.allSettled(tasks);
  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Notification error:", result.reason);
    }
  }
}

export async function notifyOrderHandoverReady(payload: OrderHandoverPayload): Promise<void> {
  const message = buildOrderHandoverMessage(payload);
  const tasks = [
    sendAdminEmail(`Order handover uploaded: ${payload.orderId}`, message),
    sendCustomerEmail(
      payload.customerEmail,
      `Your order is ready: ${payload.orderId}`,
      [
        "Your order deliverables are ready for handover.",
        `Order ID: ${payload.orderId}`,
        payload.note ? `Admin Note: ${payload.note}` : null,
        "Documents:",
        ...payload.documents.map((doc) => `- ${doc.fileName}: ${doc.url}`),
      ]
        .filter((line): line is string => Boolean(line))
        .join("\n")
    ),
    sendWhatsApp(message),
  ];

  const results = await Promise.allSettled(tasks);
  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Notification error:", result.reason);
    }
  }
}

export async function notifyEbookAccessGranted(payload: {
  customerEmail: string;
  ebookTitle: string;
  tier: "read" | "download";
  ebookUrl: string;
}): Promise<void> {
  const tierLabel = payload.tier === "download" ? "Read + Download" : "Read Online";

  const tasks = [
    sendCustomerEmail(
      payload.customerEmail,
      `Ebook Access Activated: ${payload.ebookTitle}`,
      [
        "Your ebook access has been activated!",
        "",
        `Book: ${payload.ebookTitle}`,
        `Access Type: ${tierLabel}`,
        "",
        payload.tier === "download"
          ? "You can now read all chapters online and download the full PDF."
          : "You can now read all chapters online.",
        "",
        `Visit: ${payload.ebookUrl}`,
        "",
        "Thank you!",
        "Chanuka Jeewantha",
      ].join("\n")
    ),
  ];

  const results = await Promise.allSettled(tasks);
  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Ebook access notification error:", result.reason);
    }
  }
}
