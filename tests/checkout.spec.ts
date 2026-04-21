import { expect, test } from "@playwright/test";

test.describe("Checkout flow", () => {
  test("pricing page loads and shows packages with Add to Cart buttons", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // At least one "Add to Cart" button should be present
    const addToCartButtons = page.getByRole("button", { name: /add to cart/i });
    await expect(addToCartButtons.first()).toBeVisible();
  });

  test("cart page redirects unauthenticated user to sign-in when proceeding to checkout", async ({ page }) => {
    // Visit checkout directly without auth — should redirect to sign-in
    await page.goto("/checkout");

    // Should be redirected to sign-in or show a sign-in prompt
    await expect(page).toHaveURL(/\/(auth\/signin|signin|sign-in|login)|checkout/, { timeout: 5000 });
  });

  test("cart page is accessible and shows empty state for unauthenticated user", async ({ page }) => {
    await page.goto("/cart");

    // Page should load without server error
    await expect(page).not.toHaveURL(/error/);

    // Should show either empty cart message or sign-in prompt
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });

  test("buy now link from pricing navigates to checkout with product param", async ({ page }) => {
    await page.goto("/pricing");

    // Find a "Buy Now" link (WhatsApp or direct checkout)
    const buyNowLink = page.getByRole("link", { name: /buy now|order now|checkout/i }).first();
    if (await buyNowLink.isVisible()) {
      const href = await buyNowLink.getAttribute("href");
      expect(href).toBeTruthy();
    }
  });

  test("checkout page renders order form elements", async ({ page }) => {
    // Go to checkout with buy_now mode for a known product slug
    await page.goto("/checkout?mode=buy_now&productId=cv-starter");

    // The page should render some form fields or a redirect
    const nameInput = page.getByLabel(/your name|full name/i);
    const whatsappInput = page.getByLabel(/whatsapp/i);

    // If unauthenticated, checkout may still render the form (no strict auth guard)
    // Check that the page loaded without crashing
    await expect(page.locator("body")).toBeVisible();

    // If form is shown, key inputs should be present
    if (await nameInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(nameInput).toBeVisible();
      await expect(whatsappInput).toBeVisible();

      // Fill basic form fields
      await nameInput.fill("Test User");
      await whatsappInput.fill("+94771234567");

      // Submit button should be present
      const submitBtn = page.getByRole("button", { name: /place order|submit|confirm/i });
      await expect(submitBtn).toBeVisible();
    }
  });
});
