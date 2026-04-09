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
  paymentRef: string;
  paymentSlipUrl: string;
  user: {
    name: string;
    email: string;
  };
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
