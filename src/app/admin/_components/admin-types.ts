export type AdminReview = {
  id: string;
  name: string;
  message: string;
  rating: number;
  isApproved: boolean;
  createdAt: string;
};

export type AdminOrder = {
  id: string;
  status: "pending_payment" | "payment_submitted" | "confirmed" | "in_progress" | "completed" | "cancelled";
  totalLkr: number;
  subtotalLkr: number;
  couponDiscountLkr: number;
  couponCode: string | null;
  paymentRef: string;
  paymentSlipUrl: string;
  paymentSlipUploadFailed: boolean;
  paymentPersonName: string;
  paymentWhatsApp: string;
  currentCvUrl: string | null;
  currentCvFileName: string | null;
  currentCvUploadFailed: boolean;
  linkedinUrl: string | null;
  extraDetails: string | null;
  createdAt: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  };
  handoverDocuments: Array<{
    id: string;
    fileName: string;
    url: string;
    downloadUrl?: string;
    uploadedAtMs: number;
    uploadedBy: string;
  }>;
  revisions: Array<{
    id: string;
    message: string;
    status: "open" | "in_review" | "resolved";
    requestedAtMs: number;
    requestedByUserId: string;
    resolvedAtMs: number | null;
    resolvedBy: string | null;
    adminResponse: string | null;
  }>;
  updates: Array<{
    id: string;
    atMs: number;
    type: "order_created" | "status_updated" | "handover_uploaded" | "order_warning";
    title: string;
    details: string | null;
    actorRole: "system" | "admin" | "customer";
    status: "pending_payment" | "payment_submitted" | "confirmed" | "in_progress" | "completed" | "cancelled";
  }>;
  items: Array<{
    id: string;
    productName: string;
    quantity: number;
    priceLkr: number;
  }>;
};

export type AdminOffer = {
  id: string;
  title: string;
  discountPercent: number;
  scope: "all" | "selected" | "category";
  selectedServiceSlugs: string[];
  selectedCategories: string[];
  startAtMs: number;
  endAtMs: number;
  isActive: boolean;
  isDraft: boolean;
  impressionCount: number;
  cartAddCount: number;
  conversionCount: number;
};

export type AdminCoupon = {
  id: string;
  code: string;
  title: string;
  discountPercent: number;
  scope: "all" | "selected" | "category";
  selectedServiceSlugs: string[];
  selectedCategories: string[];
  minOrderLkr: number;
  maxTotalUses: number;
  maxUsesPerUser: number;
  usedCount: number;
  isActive: boolean;
  isDraft: boolean;
  startAtMs: number;
  endAtMs: number;
};

export type OfferPriorityMode = "highest_discount" | "newest";

export const statuses: AdminOrder["status"][] = [
  "pending_payment",
  "payment_submitted",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
];
