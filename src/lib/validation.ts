import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(160),
  subject: z.string().min(3).max(120),
  message: z.string().min(10).max(3000),
  website: z.string().optional(), // Honeypot
});

export const newsletterSchema = z.object({
  email: z.string().email().max(160),
  website: z.string().optional(), // Honeypot
});

export const commentSchema = z.object({
  postSlug: z.string().min(1).max(200),
  name: z.string().min(2).max(80),
  email: z.string().email().max(160),
  message: z.string().min(4).max(2000),
  website: z.string().optional(), // Honeypot
});

export const reviewSchema = z.object({
  name: z.string().min(2).max(80),
  review: z.string().min(10).max(1000),
  rating: z.number().int().min(1).max(5),
  website: z.string().optional(), // Honeypot
});

export const reviewModerationSchema = z.object({
  id: z.string().min(1),
  isApproved: z.boolean(),
});

export const signUpSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(160),
  password: z.string().min(6).max(128),
});

export const signInSchema = z.object({
  email: z.string().email().max(160),
  password: z.string().min(6).max(128),
});

export const cartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(10).default(1),
});

export const cartUpdateSchema = z.object({
  itemId: z.string().min(1),
  quantity: z.number().int().min(1).max(10),
});

export const orderStatusUpdateSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum([
    "pending_payment",
    "payment_submitted",
    "confirmed",
    "in_progress",
    "completed",
    "cancelled",
  ]),
});
