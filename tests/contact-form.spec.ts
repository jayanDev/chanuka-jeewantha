import { expect, test } from "@playwright/test";

test("contact form submits successfully", async ({ page }) => {
  test.setTimeout(90_000);

  await page.goto("/contact");

  await page.getByLabel("Your Name").fill("E2E Tester");
  await page.getByLabel("Your Email").fill("tester@example.com");
  await page.getByLabel("Subject").fill("E2E Contact Test");
  await page.getByLabel("Your Message").fill("This is an automated end-to-end contact form test.");

  const submitResponse = page.waitForResponse(
    (response) => response.url().includes("/api/contact") && response.request().method() === "POST"
  );

  await page.getByRole("button", { name: "Send Message" }).click();
  const response = await submitResponse;
  expect(response.ok(), `Expected /api/contact to succeed, got status ${response.status()}`).toBeTruthy();

  await expect(page.getByText("Thank you! Your message has been sent successfully.")).toBeVisible();
});
