import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getFirebaseDb } from "@/lib/firebase-admin";
import { isTrustedOrigin } from "@/lib/security";
import { isAllowedFileType, saveUploadedFile } from "@/lib/upload-storage";
import {
  calculateCatalogueTotal,
  getExperienceByKey,
  getServiceByKey,
  getServiceOptionByKey,
  packageProducts,
  type ExperienceKey,
  type ServiceKey,
  type ServiceOptionKey,
} from "@/lib/packages-catalog";

const ORDERS_COLLECTION = "orders";

const SLIP_ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const SLIP_ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "pdf"];
const CV_ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const CV_ALLOWED_EXTENSIONS = ["pdf", "doc", "docx"];

type CatalogueAnswers = {
  services: ServiceKey[];
  experience: ExperienceKey;
  serviceOption: ServiceOptionKey;
};

function parseJsonObject(raw: FormDataEntryValue | null): Record<string, unknown> {
  if (typeof raw !== "string" || !raw.trim()) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

function parsePackageSlugs(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string") return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function parseCatalogueAnswers(raw: FormDataEntryValue | null): CatalogueAnswers | null {
  const row = parseJsonObject(raw);
  if (!Array.isArray(row.services)) return null;
  if (typeof row.experience !== "string" || typeof row.serviceOption !== "string") return null;

  const services = row.services.filter((item): item is ServiceKey => typeof item === "string" && Boolean(getServiceByKey(item as ServiceKey)));
  const experience = row.experience as ExperienceKey;
  const serviceOption = row.serviceOption as ServiceOptionKey;

  if (services.length === 0 || !getExperienceByKey(experience) || !getServiceOptionByKey(serviceOption)) {
    return null;
  }

  return { services, experience, serviceOption };
}

function readString(input: Record<string, unknown>, key: string): string {
  const value = input[key];
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const formData = await request.formData();
    const packageSlugs = parsePackageSlugs(formData.get("packageSlugs"));
    const catalogueAnswers = parseCatalogueAnswers(formData.get("catalogueAnswers"));
    const intake = parseJsonObject(formData.get("intake"));
    const paymentSlip = formData.get("paymentSlip");
    const currentCv = formData.get("currentCv");

    if (!catalogueAnswers) {
      return NextResponse.json({ error: "Catalogue answers are required." }, { status: 400 });
    }

    const products = packageSlugs
      .map((slug) => packageProducts.find((pkg) => pkg.slug === slug))
      .filter((pkg): pkg is NonNullable<typeof pkg> => Boolean(pkg));

    if (products.length === 0) {
      return NextResponse.json({ error: "Selected packages are unavailable." }, { status: 400 });
    }

    const fullName = readString(intake, "fullName");
    const email = readString(intake, "email").toLowerCase();
    const whatsapp = readString(intake, "whatsapp");
    const normalizedWhatsApp = whatsapp.replace(/\D/g, "");

    if (fullName.length < 2) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email address is required." }, { status: 400 });
    }
    if (!/^\d{10,15}$/.test(normalizedWhatsApp)) {
      return NextResponse.json({ error: "Valid WhatsApp number with country code is required." }, { status: 400 });
    }
    if (!(paymentSlip instanceof File) || paymentSlip.size === 0) {
      return NextResponse.json({ error: "Payment slip is required." }, { status: 400 });
    }
    if (
      !isAllowedFileType(paymentSlip, {
        mimeTypes: SLIP_ALLOWED_MIME_TYPES,
        extensions: SLIP_ALLOWED_EXTENSIONS,
      })
    ) {
      return NextResponse.json({ error: "Payment slip must be JPG, PNG, WEBP, or PDF." }, { status: 400 });
    }
    if (paymentSlip.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "Payment slip size must be less than 8MB." }, { status: 400 });
    }

    let currentCvUrl: string | null = null;
    let currentCvFileName: string | null = null;
    let currentCvUploadFailed = false;
    if (currentCv instanceof File && currentCv.size > 0) {
      if (
        !isAllowedFileType(currentCv, {
          mimeTypes: CV_ALLOWED_MIME_TYPES,
          extensions: CV_ALLOWED_EXTENSIONS,
        })
      ) {
        return NextResponse.json({ error: "Current CV must be PDF, DOC, or DOCX." }, { status: 400 });
      }
      if (currentCv.size > 12 * 1024 * 1024) {
        return NextResponse.json({ error: "Current CV size must be less than 12MB." }, { status: 400 });
      }
      currentCvFileName = currentCv.name;
      try {
        currentCvUrl = await saveUploadedFile({ file: currentCv, folder: "current-cv" });
      } catch (error) {
        console.error("Catalogue CV upload failed:", error);
        currentCvUploadFailed = true;
      }
    }

    let paymentSlipUrl = "";
    let paymentSlipUploadFailed = false;
    try {
      paymentSlipUrl = await saveUploadedFile({ file: paymentSlip, folder: "slips" });
    } catch (error) {
      console.error("Catalogue payment slip upload failed:", error);
      paymentSlipUploadFailed = true;
    }

    const totals = calculateCatalogueTotal(products);
    const orderId = randomUUID();
    const createdAtMs = Date.now();
    const items = products.map((pkg, index) => ({
      id: `${orderId}-${index + 1}`,
      productId: pkg.slug,
      productName: pkg.name,
      priceLkr: pkg.priceLkr,
      quantity: 1,
      code: pkg.code,
      serviceKey: pkg.serviceKey,
      experienceKey: pkg.experienceKey,
      optionKey: pkg.optionKey,
    }));

    const order = {
      id: orderId,
      source: "catalogue",
      userId: `catalogue:${email}`,
      userName: fullName,
      userEmail: email,
      status: "payment_submitted",
      totalLkr: totals.totalLkr,
      subtotalLkr: totals.subtotalLkr,
      couponCode: totals.discountPercent > 0 ? `SUPERVISED-${totals.discountPercent}` : null,
      couponDiscountLkr: totals.discountLkr,
      paymentRef: readString(intake, "paymentRef"),
      paymentPersonName: fullName,
      paymentWhatsApp: normalizedWhatsApp,
      paymentSlipUrl,
      paymentSlipUploadFailed,
      currentCvUrl,
      currentCvFileName,
      currentCvUploadFailed,
      linkedinUrl: readString(intake, "linkedinUrl") || null,
      extraDetails: null,
      note: null,
      catalogueAnswers,
      intake,
      createdAtMs,
      updatedAtMs: createdAtMs,
      items,
      handoverDocuments: [],
      revisions: [],
      updates: [
        {
          id: randomUUID(),
          atMs: createdAtMs,
          type: "order_created",
          title: "Catalogue order placed",
          details: "Order submitted from the guided catalogue with payment details.",
          actorRole: "customer",
          status: "payment_submitted",
        },
      ],
    };

    await getFirebaseDb().collection(ORDERS_COLLECTION).doc(orderId).set(order);

    return NextResponse.json({ ok: true, orderId });
  } catch (error) {
    console.error("Catalogue order failed:", error);
    return NextResponse.json({ error: "Server error while submitting catalogue order." }, { status: 500 });
  }
}
