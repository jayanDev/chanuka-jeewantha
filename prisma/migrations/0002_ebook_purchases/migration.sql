-- CreateTable
CREATE TABLE "EbookPurchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "ebookSlug" TEXT NOT NULL,
    "tier" TEXT NOT NULL DEFAULT 'read',
    "grantedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "grantedBy" TEXT NOT NULL,
    "note" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "EbookPurchase_email_ebookSlug_key" ON "EbookPurchase"("email", "ebookSlug");

-- CreateIndex
CREATE INDEX "EbookPurchase_email_idx" ON "EbookPurchase"("email");

-- CreateIndex
CREATE INDEX "EbookPurchase_ebookSlug_idx" ON "EbookPurchase"("ebookSlug");
