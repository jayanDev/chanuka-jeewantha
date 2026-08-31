import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import BlogArticleBody from "./BlogArticleBody";

afterEach(cleanup);
describe("article body rendering", () => {
  it("preserves heading hierarchy, emphasis, lists, and usable links", () => {
    render(<BlogArticleBody blocks={[
      { type: "heading", level: 2, text: "Review your evidence" },
      { type: "paragraph", text: "Use **accurate results** and [CV services](/services/packages/cv-writing)." },
      { type: "list", ordered: true, items: ["Check dates", "Verify results"] },
      { type: "heading", level: 3, text: "An example" },
      { type: "paragraph", text: "Read [official guidance](https://example.com/guide)." },
    ]} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Review your evidence");
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("An example");
    expect(screen.getByText("accurate results").tagName).toBe("STRONG");
    expect(screen.getByRole("list").tagName).toBe("OL");
    expect(screen.getByRole("link", { name: "CV services" })).toHaveAttribute("href", "/services/packages/cv-writing");
    expect(screen.getByRole("link", { name: "official guidance" })).toHaveAttribute("href", "https://example.com/guide");
  });

  it("renders HTML and unsafe link schemes as inert text", () => {
    const { container } = render(<BlogArticleBody blocks={[
      { type: "paragraph", text: '<script>alert(1)</script> [unsafe](javascript:alert) [protocol](//example.com)' },
    ]} />);
    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector("a")).toBeNull();
    expect(container).toHaveTextContent("<script>alert(1)</script>");
  });
});
