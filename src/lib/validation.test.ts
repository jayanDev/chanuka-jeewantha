import { describe, expect, it } from "vitest";

import {
  commentSchema,
  contactSchema,
  newsletterSchema,
  reviewSchema,
} from "@/lib/validation";

describe("validation schemas", () => {
  it("accepts a valid contact payload", () => {
    const payload = {
      name: "Chanuka",
      email: "chanuka@example.com",
      subject: "Project inquiry",
      message: "I want to discuss a full website implementation.",
      website: "",
    };

    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("rejects an invalid newsletter payload", () => {
    const result = newsletterSchema.safeParse({
      email: "invalid-email",
      website: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects short comment content", () => {
    const result = commentSchema.safeParse({
      postSlug: "welcome-post",
      name: "Reader",
      email: "reader@example.com",
      message: "Hi",
      website: "",
    });

    expect(result.success).toBe(false);
  });

  it("accepts a valid review payload", () => {
    const result = reviewSchema.safeParse({
      name: "Client A",
      review: "Great service. My CV and LinkedIn profile improved significantly.",
      rating: 5,
      website: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects out-of-range review rating", () => {
    const result = reviewSchema.safeParse({
      name: "Client B",
      review: "Helpful guidance and clear communication.",
      rating: 7,
      website: "",
    });

    expect(result.success).toBe(false);
  });
});
