"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  calculateCatalogueTotal,
  experienceOptions,
  formatLkr,
  getFilteredPackages,
  getFounderLedAvailabilityLabel,
  getPackageDisplayPrice,
  getServiceByKey,
  getServiceOptionByKey,
  serviceOptionChoices,
  serviceOptions,
  type ExperienceKey,
  type ServiceKey,
  type ServiceOptionKey,
} from "@/lib/packages-catalog";

type IntakeState = Record<string, string>;
type LanguageLevel = "Native" | "Fluent" | "Intermediate" | "Basic" | "Not Applicable";

const personalFields: Array<{ key: string; label: string; required?: boolean; placeholder?: string }> = [
  { key: "fullName", label: "Full Name", required: true },
  { key: "email", label: "Email Address", required: true },
  { key: "whatsapp", label: "WhatsApp Number", required: true, placeholder: "+94 77 123 4567" },
  { key: "location", label: "Current Location (City, Country)", required: true },
  { key: "linkedinUrl", label: "LinkedIn Profile URL" },
];

const backgroundFields: Array<{ key: string; label: string; required?: boolean; placeholder?: string }> = [
  { key: "currentJobTitle", label: "Current Job Title" },
  { key: "currentCompany", label: "Current or Most Recent Company / University" },
  { key: "industry", label: "Industry / Field" },
];

const backgroundLongFields: Array<{ key: string; label: string; placeholder?: string }> = [
  {
    key: "workExperience",
    label: "Work Experience",
    placeholder: "Job Title | Company Name | Location | Duration | Key Responsibilities",
  },
  {
    key: "achievements",
    label: "Key Achievements",
    placeholder: "List your top 3-5 measurable achievements.",
  },
  {
    key: "skills",
    label: "Core Competencies & Skills",
    placeholder: "Technical: Microsoft Excel, AutoCAD. Soft Skills: Leadership, Communication.",
  },
];

const qualificationLongFields: Array<{ key: string; label: string; placeholder?: string }> = [
  {
    key: "education",
    label: "Educational Qualifications",
    placeholder: "Qualification | Field of Study | Institution | Location | Year Completed",
  },
  {
    key: "certifications",
    label: "Professional Qualifications, Awards & Certifications",
    placeholder: "Certification Name | Issuing Body | Year",
  },
  {
    key: "referees",
    label: "Referees Details",
    placeholder: "Name | Job Title | Company | Contact Number",
  },
];

const goalFields: Array<{ key: string; label: string; required?: boolean; placeholder?: string }> = [
  { key: "targetRoles", label: "What job roles are you targeting?", required: true },
  { key: "targetIndustries", label: "What industries are you targeting?", required: true },
  { key: "unemployedDuration", label: "If unemployed, how long have you been without employment?" },
  { key: "jobDescription", label: "Specific job description link or details" },
  { key: "highlightFocus", label: "Anything specific to highlight or focus on?" },
  { key: "concerns", label: "Specific concerns, requests, or questions" },
];

const targetMarkets = ["Sri Lanka only", "Middle East", "UK/Europe", "Australia / New Zealand", "Canada", "Other"];
const employmentStatuses = [
  "Currently employed - looking to change jobs",
  "Currently employed - open to better opportunities",
  "Currently unemployed - actively job seeking",
  "Student / Fresh graduate - seeking first opportunity",
  "Career changer - transitioning to a new field",
];
const referralSources = ["Facebook", "Instagram", "LinkedIn", "TikTok", "Friend / Referral", "Google Search", "My website", "Other"];
const languageLevels: LanguageLevel[] = ["Native", "Fluent", "Intermediate", "Basic", "Not Applicable"];

async function readJsonSafely(response: Response): Promise<Record<string, unknown>> {
  const raw = await response.text();
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

const whatsappNumber = "94773902230";

export default function CatalogueClient() {
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [orderStep, setOrderStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<ServiceKey[]>([]);
  const [experience, setExperience] = useState<ExperienceKey | "">("");
  const [serviceOption, setServiceOption] = useState<ServiceOptionKey | "">("");
  const [availabilityLabel, setAvailabilityLabel] = useState("");
  const [tierInfoOpen, setTierInfoOpen] = useState(false);
  const [intake, setIntake] = useState<IntakeState>({
    english: "Fluent",
    sinhala: "Native",
    tamil: "Not Applicable",
    targetMarket: "Sri Lanka only",
    employmentStatus: employmentStatuses[0],
    referralSource: "Facebook",
  });
  const [currentCv, setCurrentCv] = useState<File | null>(null);
  const [paymentSlip, setPaymentSlip] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const serviceParam = params.get("service") as ServiceKey | null;
    const expParam = params.get("experience") as ExperienceKey | null;
    const optParam = params.get("option") as ServiceOptionKey | null;
    const bundleParam = params.get("bundle");

    // --- Bundle shortcuts: pre-fill all 3 answers ---
    if (bundleParam === "starter") {
      setSelectedServices(["ats-cv", "cover-letter", "linkedin"]);
      setExperience("student");
      setServiceOption("supervised");
      setStep(4);
      return;
    }
    if (bundleParam === "career") {
      setSelectedServices(["ats-cv", "cover-letter", "linkedin", "foreign-cv"]);
      setExperience("professional");
      setServiceOption("founder-led");
      setStep(4);
      return;
    }
    if (bundleParam === "executive") {
      setSelectedServices(["ats-cv", "cover-letter", "linkedin", "foreign-cv"]);
      setExperience("executive");
      setServiceOption("founder-led");
      setStep(4);
      return;
    }

    // --- Individual param pre-filling ---
    let servicesSet = false;
    if (serviceParam && serviceOptions.some((item) => item.key === serviceParam)) {
      setSelectedServices([serviceParam]);
      servicesSet = true;
    }
    let expSet = false;
    if (expParam && experienceOptions.some((item) => item.key === expParam)) {
      setExperience(expParam);
      expSet = true;
    }
    let optSet = false;
    if (optParam && serviceOptionChoices.some((item) => item.key === optParam)) {
      setServiceOption(optParam);
      optSet = true;
    }

    // Auto-advance to the furthest step possible
    if (servicesSet && expSet && optSet) {
      setStep(4);
    } else if (servicesSet && expSet) {
      setStep(3);
    } else if (servicesSet) {
      setStep(2);
    }
  }, [params]);

  useEffect(() => {
    setAvailabilityLabel(getFounderLedAvailabilityLabel());
  }, [serviceOption]);

  const matchedPackages = useMemo(() => {
    if (!experience || !serviceOption || selectedServices.length === 0) return [];
    return getFilteredPackages({
      serviceKeys: selectedServices,
      experienceKey: experience,
      optionKey: serviceOption,
    });
  }, [experience, selectedServices, serviceOption]);

  const totals = useMemo(() => calculateCatalogueTotal(matchedPackages), [matchedPackages]);
  const selectedExperience = experience ? experienceOptions.find((item) => item.key === experience) : null;
  const selectedOption = serviceOption ? getServiceOptionByKey(serviceOption) : null;
  const whatsappOrderUrl = useMemo(() => {
    const lines = [
      "Hello Chanuka, I want to order from the catalogue.",
      "",
      "Selected packages:",
      ...matchedPackages.map((pkg) => `- ${pkg.name}: ${getPackageDisplayPrice(pkg)}`),
      "",
      `Services: ${selectedServices.map((key) => getServiceByKey(key)?.title).filter(Boolean).join(", ")}`,
      `Experience: ${selectedExperience?.title ?? ""}`,
      `Service option: ${selectedOption?.title ?? ""}`,
      `Subtotal: ${formatLkr(totals.subtotalLkr)}`,
      totals.discountLkr > 0 ? `Discount: ${formatLkr(totals.discountLkr)} (${totals.discountPercent}%)` : "",
      `Total: ${formatLkr(totals.totalLkr)}`,
      "",
      "Please confirm availability and payment details.",
    ].filter(Boolean);

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [matchedPackages, selectedExperience?.title, selectedOption?.title, selectedServices, totals]);

  const toggleService = (key: ServiceKey) => {
    setSelectedServices((previous) =>
      previous.includes(key) ? previous.filter((item) => item !== key) : [...previous, key]
    );
  };

  const updateIntake = (key: string, value: string) => {
    setIntake((previous) => ({ ...previous, [key]: value }));
  };

  const showOrderError = (messageText: string) => {
    setError(messageText);
    window.requestAnimationFrame(() => {
      document.getElementById("catalogue-order-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const canContinueOrderStep = (targetStep: number): boolean => {
    setError("");

    if (orderStep === 1) {
      if (!intake.fullName?.trim() || !intake.email?.trim() || !intake.whatsapp?.trim() || !intake.location?.trim()) {
        showOrderError("Please complete your full name, email, WhatsApp number, and current location.");
        return false;
      }
    }

    if (orderStep === 4) {
      if (!intake.targetRoles?.trim() || !intake.targetIndustries?.trim() || !intake.referralSource?.trim()) {
        showOrderError("Please complete target roles, target industries, and how you found the service.");
        return false;
      }
    }

    setOrderStep(targetStep);
    return true;
  };

  const submitOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (matchedPackages.length === 0) {
      setError("Please complete the catalogue questions before ordering.");
      return;
    }
    if (!paymentSlip) {
      setError("Please upload your bank transfer receipt.");
      return;
    }

    const formData = new FormData();
    formData.append("packageSlugs", JSON.stringify(matchedPackages.map((pkg) => pkg.slug)));
    formData.append(
      "catalogueAnswers",
      JSON.stringify({
        services: selectedServices,
        experience,
        serviceOption,
      })
    );
    formData.append("intake", JSON.stringify(intake));
    formData.append("paymentSlip", paymentSlip);
    if (currentCv) formData.append("currentCv", currentCv);

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/catalogue-orders", {
        method: "POST",
        body: formData,
      });
      const payload = await readJsonSafely(response);
      if (!response.ok) {
        setError(typeof payload.error === "string" ? payload.error : "Failed to submit order.");
        return;
      }

      const orderId = typeof payload.orderId === "string" ? payload.orderId : "";
      setPaymentSlip(null);
      setCurrentCv(null);
      window.location.assign(`/catalogue/thank-you${orderId ? `?orderId=${encodeURIComponent(orderId)}` : ""}`);
    } catch {
      setError("Failed to submit order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Compact hero — keeps quiz above fold on mobile */}
      <section className="w-full bg-foreground px-4 pt-8 pb-6 text-background sm:px-6 sm:pt-10 sm:pb-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-semibold uppercase tracking-[0.18em] text-brand-main text-xs sm:text-sm">Career Studio Catalogue</p>
          <h1 className="mt-2 font-heading text-[26px] font-bold leading-[1.1] !text-white sm:text-[36px] md:text-[46px]">
            Find the right package in <span className="text-brand-main">3 questions.</span>
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            Answer below — your exact package appears instantly.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <div className="mb-6 grid grid-cols-3 gap-2">
          {[1, 2, 3].map((item) => (
            <div key={item} className={`h-2 rounded-full ${step >= item ? "bg-brand-main" : "bg-zinc-200"}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="rounded-[18px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-5 flex flex-col gap-2 rounded-[12px] border border-zinc-200 bg-bg-cream p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-text-body">
                Already know what you need?
              </p>
              <Link
                href="/packages"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-main hover:text-brand-dark"
              >
                Skip the quiz — browse all packages →
              </Link>
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-main">Question 1 of 3</p>
            <h2 className="mt-2 font-heading text-[28px] font-bold text-foreground">What kind of services do you need?</h2>
            <p className="mt-2 text-zinc-600">You can select multiple services.</p>
            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
              {serviceOptions.map((service) => (
                <label key={service.key} className="flex cursor-pointer gap-3 rounded-[12px] border border-zinc-200 p-4 hover:border-brand-main">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.key)}
                    onChange={() => toggleService(service.key)}
                    className="mt-1 accent-brand-main"
                  />
                  <span>
                    <span className="block font-semibold text-foreground">{service.title}</span>
                    <span className="mt-1 block text-sm text-zinc-600">{service.description}</span>
                  </span>
                </label>
              ))}
            </div>
            <button
              type="button"
              disabled={selectedServices.length === 0}
              onClick={() => setStep(2)}
              className="mt-6 rounded-[10px] bg-brand-main px-5 py-3 font-semibold text-white disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="rounded-[18px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-main">Question 2 of 3</p>
            <h2 className="mt-2 font-heading text-[28px] font-bold text-foreground">How much experience do you have?</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
              {experienceOptions.map((item) => (
                <label key={item.key} className="flex cursor-pointer gap-3 rounded-[12px] border border-zinc-200 p-4 hover:border-brand-main">
                  <input
                    type="radio"
                    name="experience"
                    checked={experience === item.key}
                    onChange={() => setExperience(item.key)}
                    className="mt-1 accent-brand-main"
                  />
                  <span className="font-semibold text-foreground">{item.title}</span>
                </label>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => setStep(1)} className="rounded-[10px] border border-zinc-300 px-5 py-3 font-semibold">
                Back
              </button>
              <button
                type="button"
                disabled={!experience}
                onClick={() => setStep(3)}
                className="rounded-[10px] bg-brand-main px-5 py-3 font-semibold text-white disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="rounded-[18px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-main">Question 3 of 3</p>
            <h2 className="mt-2 font-heading text-[28px] font-bold text-foreground">Which service option do you prefer?</h2>
            {/* Collapsible tier explainer */}
            <button
              type="button"
              onClick={() => setTierInfoOpen((prev) => !prev)}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-main hover:text-brand-dark transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              What&apos;s the difference between Signature and Essentials?
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform duration-200 ${tierInfoOpen ? "rotate-180" : ""}`}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {tierInfoOpen && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-[14px] border border-zinc-200 bg-zinc-50 p-4 text-sm">
                <div className="rounded-[10px] border border-[#C9A961]/40 bg-white p-4">
                  <p className="font-bold text-foreground mb-1">✨ Signature Series</p>
                  <p className="text-xs text-zinc-500 mb-2">Personally crafted by Chanuka Jeewantha · CPRW &amp; CPCC</p>
                  <ul className="space-y-1 text-zinc-700">
                    <li>✓ Strategic industry positioning</li>
                    <li>✓ 30-day post-delivery support</li>
                    <li>✓ Direct WhatsApp access</li>
                    <li>✓ Limited to 2 clients/day</li>
                    <li className="text-[#C9A961] font-semibold">From LKR 4,000</li>
                  </ul>
                </div>
                <div className="rounded-[10px] border border-zinc-200 bg-white p-4">
                  <p className="font-bold text-foreground mb-1">📋 Essentials</p>
                  <p className="text-xs text-zinc-500 mb-2">Team-crafted, quality reviewed by Chanuka</p>
                  <ul className="space-y-1 text-zinc-700">
                    <li>✓ ATS-friendly professional format</li>
                    <li>✓ 7-day delivery</li>
                    <li>✓ Email-based support</li>
                    <li>✓ Bundle discounts up to 20%</li>
                    <li className="font-semibold">From LKR 1,950</li>
                  </ul>
                </div>
              </div>
            )}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {serviceOptionChoices.map((item) => (
                <label
                  key={item.key}
                  className={`relative flex cursor-pointer gap-3 rounded-[14px] border p-5 transition-all ${
                    item.key === "founder-led"
                      ? "border-amber-300 bg-gradient-to-br from-amber-50 via-white to-zinc-950/5 shadow-[0_18px_50px_rgba(180,120,20,0.14)] hover:border-amber-500"
                      : "border-zinc-200 bg-white hover:border-brand-main"
                  }`}
                >
                  {item.key === "founder-led" && (
                    <span className="absolute right-4 top-4 rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-900">
                      Premium
                    </span>
                  )}
                  <input
                    type="radio"
                    name="serviceOption"
                    checked={serviceOption === item.key}
                    onChange={() => setServiceOption(item.key)}
                    className="mt-1 accent-brand-main"
                  />
                  <span className={item.key === "founder-led" ? "pr-24" : ""}>
                    <span className="block font-semibold text-foreground">{item.title}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-zinc-600">{item.description}</span>
                    {item.key === "founder-led" && (
                      <span className="mt-4 inline-flex rounded-[10px] bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white">
                        Personally written by Chanuka Jeewantha
                      </span>
                    )}
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => setStep(2)} className="rounded-[10px] border border-zinc-300 px-5 py-3 font-semibold">
                Back
              </button>
              <button
                type="button"
                disabled={!serviceOption}
                onClick={() => setStep(4)}
                className="rounded-[10px] bg-brand-main px-5 py-3 font-semibold text-white disabled:opacity-50"
              >
                Show My Packages
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <div className="rounded-[18px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-main">Your Catalogue</p>
                  <h2 className="mt-2 font-heading text-[30px] font-bold text-foreground">Recommended packages</h2>
                  <p className="mt-2 text-zinc-600">
                    {selectedServices.map((key) => getServiceByKey(key)?.shortTitle).filter(Boolean).join(", ")} for {selectedExperience?.title} through {selectedOption?.shortTitle}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOrderStep(0);
                    setStep(1);
                  }}
                  className="rounded-[10px] border border-zinc-300 px-4 py-2 text-sm font-semibold"
                >
                  Change Answers
                </button>
              </div>

              {serviceOption === "founder-led" && (
                <div className="mt-5 rounded-[12px] border border-amber-200 bg-amber-50 p-4">
                  <p className="font-semibold text-amber-900">{availabilityLabel}</p>
                  <p className="mt-1 text-sm text-amber-800">Signature Series packages are shown as limited daily slots to protect premium quality.</p>
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                {matchedPackages.map((pkg) => (
                  <article key={pkg.slug} className="rounded-[16px] border border-zinc-200 bg-zinc-50 p-5">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-700">{pkg.audience}</span>
                      <span className="rounded-full bg-brand-main/10 px-3 py-1 text-xs font-semibold text-brand-dark">
                        {pkg.optionKey === "founder-led" ? "Signature Series" : "Essentials"}
                      </span>
                    </div>
                    <h3 className="font-heading text-[23px] font-bold leading-tight text-foreground">{pkg.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600">{pkg.description}</p>
                    <p className="mt-4 text-2xl font-bold text-foreground">{getPackageDisplayPrice(pkg)}</p>
                    <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                      {pkg.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-main" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div className="mt-6 rounded-[14px] border border-zinc-200 bg-white p-5">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-zinc-500">Order total</p>
                    <p className="font-heading text-[28px] font-bold text-foreground">{formatLkr(totals.totalLkr)}</p>
                    {totals.discountPercent > 0 && (
                      <p className="text-sm font-semibold text-emerald-700">
                        {totals.discountPercent}% Essentials bundle discount applied. You save {formatLkr(totals.discountLkr)}.
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setOrderStep(1);
                        window.requestAnimationFrame(() => {
                          document.getElementById("catalogue-order-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                        });
                      }}
                      className="rounded-[10px] bg-brand-main px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                    >
                      Order Now
                    </button>
                    <a
                      href={whatsappOrderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-[10px] bg-[#25D366] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#1fb85a]"
                    >
                      Order via WhatsApp
                    </a>
                  </div>
                </div>
                <p className="mt-3 text-sm text-zinc-500">Subtotal: {formatLkr(totals.subtotalLkr)}</p>
              </div>
            </div>

            {orderStep > 0 && (
              <form id="catalogue-order-form" onSubmit={submitOrder} className="rounded-[18px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-main">Order this package</p>
                    <h2 className="mt-2 font-heading text-[30px] font-bold text-foreground">
                      Step {orderStep} of 5
                    </h2>
                  </div>
                  <div className="grid w-full grid-cols-5 gap-1 md:w-64">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className={`h-2 rounded-full ${orderStep >= item ? "bg-brand-main" : "bg-zinc-200"}`} />
                    ))}
                  </div>
                </div>

                {error && <p className="mt-4 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
                {message && <p className="mt-4 rounded-[10px] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p>}

                {orderStep === 1 && (
                  <section className="mt-6 space-y-5">
                    <div>
                      <h3 className="font-heading text-[24px] font-bold text-foreground">Personal Information</h3>
                      <p className="mt-1 text-sm text-zinc-600">We use this to contact you and match your order to payment.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {personalFields.map((field) => (
                        <label key={field.key} className="text-sm font-medium text-zinc-800">
                          {field.label}{field.required ? " *" : ""}
                          <input
                            type={field.key === "email" ? "email" : "text"}
                            required={field.required}
                            value={intake[field.key] ?? ""}
                            onChange={(event) => updateIntake(field.key, event.target.value)}
                            placeholder={field.placeholder}
                            className="mt-2 w-full rounded-[10px] border border-zinc-300 px-3 py-3 text-sm"
                          />
                        </label>
                      ))}
                    </div>
                    <label className="block text-sm font-medium text-zinc-800">
                      Do you have an existing CV you would like me to review? Please upload it.
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(event) => setCurrentCv(event.target.files?.[0] ?? null)}
                        className="mt-2 w-full rounded-[10px] border border-zinc-300 px-3 py-3 text-sm"
                      />
                    </label>
                  </section>
                )}

                {orderStep === 2 && (
                  <section className="mt-6 space-y-5">
                    <div>
                      <h3 className="font-heading text-[24px] font-bold text-foreground">Career Background</h3>
                      <p className="mt-1 text-sm text-zinc-600">Add your current role, experience, achievements, and skills.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {backgroundFields.map((field) => (
                        <label key={field.key} className="text-sm font-medium text-zinc-800">
                          {field.label}
                          <input
                            type="text"
                            value={intake[field.key] ?? ""}
                            onChange={(event) => updateIntake(field.key, event.target.value)}
                            placeholder={field.placeholder}
                            className="mt-2 w-full rounded-[10px] border border-zinc-300 px-3 py-3 text-sm"
                          />
                        </label>
                      ))}
                    </div>
                    {backgroundLongFields.map((field) => (
                      <label key={field.key} className="block text-sm font-medium text-zinc-800">
                        {field.label}
                        <textarea
                          rows={4}
                          value={intake[field.key] ?? ""}
                          onChange={(event) => updateIntake(field.key, event.target.value)}
                          placeholder={field.placeholder}
                          className="mt-2 w-full rounded-[10px] border border-zinc-300 px-3 py-3 text-sm"
                        />
                      </label>
                    ))}
                  </section>
                )}

                {orderStep === 3 && (
                  <section className="mt-6 space-y-5">
                    <div>
                      <h3 className="font-heading text-[24px] font-bold text-foreground">Education, Languages & Referees</h3>
                      <p className="mt-1 text-sm text-zinc-600">Share qualifications and language proficiency.</p>
                    </div>
                    {qualificationLongFields.map((field) => (
                      <label key={field.key} className="block text-sm font-medium text-zinc-800">
                        {field.label}
                        <textarea
                          rows={4}
                          value={intake[field.key] ?? ""}
                          onChange={(event) => updateIntake(field.key, event.target.value)}
                          placeholder={field.placeholder}
                          className="mt-2 w-full rounded-[10px] border border-zinc-300 px-3 py-3 text-sm"
                        />
                      </label>
                    ))}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {(["english", "sinhala", "tamil"] as const).map((language) => (
                        <label key={language} className="text-sm font-medium capitalize text-zinc-800">
                          {language} proficiency
                          <select
                            value={intake[language] ?? "Not Applicable"}
                            onChange={(event) => updateIntake(language, event.target.value)}
                            className="mt-2 w-full rounded-[10px] border border-zinc-300 px-3 py-3 text-sm"
                          >
                            {languageLevels.map((level) => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                        </label>
                      ))}
                    </div>
                  </section>
                )}

                {orderStep === 4 && (
                  <section className="mt-6 space-y-5">
                    <div>
                      <h3 className="font-heading text-[24px] font-bold text-foreground">Career Goals & Final Notes</h3>
                      <p className="mt-1 text-sm text-zinc-600">Tell us what roles and markets you are targeting.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {goalFields.map((field) => (
                        <label key={field.key} className="text-sm font-medium text-zinc-800">
                          {field.label}{field.required ? " *" : ""}
                          <input
                            type="text"
                            required={field.required}
                            value={intake[field.key] ?? ""}
                            onChange={(event) => updateIntake(field.key, event.target.value)}
                            placeholder={field.placeholder}
                            className="mt-2 w-full rounded-[10px] border border-zinc-300 px-3 py-3 text-sm"
                          />
                        </label>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <label className="text-sm font-medium text-zinc-800">
                        Target job market
                        <select value={intake.targetMarket ?? ""} onChange={(event) => updateIntake("targetMarket", event.target.value)} className="mt-2 w-full rounded-[10px] border border-zinc-300 px-3 py-3 text-sm">
                          {targetMarkets.map((item) => <option key={item} value={item}>{item}</option>)}
                        </select>
                      </label>
                      <label className="text-sm font-medium text-zinc-800">
                        Current employment status
                        <select value={intake.employmentStatus ?? ""} onChange={(event) => updateIntake("employmentStatus", event.target.value)} className="mt-2 w-full rounded-[10px] border border-zinc-300 px-3 py-3 text-sm">
                          {employmentStatuses.map((item) => <option key={item} value={item}>{item}</option>)}
                        </select>
                      </label>
                      <label className="text-sm font-medium text-zinc-800">
                        How did you find out about this service? *
                        <select required value={intake.referralSource ?? ""} onChange={(event) => updateIntake("referralSource", event.target.value)} className="mt-2 w-full rounded-[10px] border border-zinc-300 px-3 py-3 text-sm">
                          {referralSources.map((item) => <option key={item} value={item}>{item}</option>)}
                        </select>
                      </label>
                    </div>
                  </section>
                )}

                {orderStep === 5 && (
                  <section className="mt-6 space-y-5">
                    <div>
                      <h3 className="font-heading text-[24px] font-bold text-foreground">Payment Confirmation</h3>
                      <p className="mt-1 text-sm text-zinc-600">Upload your transfer receipt to activate the order.</p>
                    </div>
                    <div className="rounded-[14px] border border-zinc-200 bg-zinc-50 p-5">
                      <p className="text-sm leading-relaxed text-zinc-700">
                        Bank: Bank of Ceylon, Name: W.A.C. Jeewantha, Account No: 0079282859, Branch: Makola Branch.
                      </p>
                      <label className="mt-4 block text-sm font-medium text-zinc-800">
                        Bank Transfer Reference
                        <input
                          type="text"
                          value={intake.paymentRef ?? ""}
                          onChange={(event) => updateIntake("paymentRef", event.target.value)}
                          className="mt-2 w-full rounded-[10px] border border-zinc-300 px-3 py-3 text-sm"
                        />
                      </label>
                      <label className="mt-4 block text-sm font-medium text-zinc-800">
                        Bank Transfer Receipt / Payment Slip *
                        <input
                          type="file"
                          required
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) => setPaymentSlip(event.target.files?.[0] ?? null)}
                          className="mt-2 w-full rounded-[10px] border border-zinc-300 px-3 py-3 text-sm"
                        />
                      </label>
                      <p className="mt-2 text-xs text-zinc-500">Accepted formats: JPG, PNG, or PDF. WhatsApp support: +94773902230</p>
                    </div>
                  </section>
                )}

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderStep(orderStep === 1 ? 0 : orderStep - 1)}
                    className="rounded-[10px] border border-zinc-300 px-5 py-3 font-semibold text-foreground"
                  >
                    {orderStep === 1 ? "Back to Packages" : "Back"}
                  </button>
                  {orderStep < 5 ? (
                    <button
                      type="button"
                      onClick={() => canContinueOrderStep(orderStep + 1)}
                      className="rounded-[10px] bg-brand-main px-6 py-3 font-semibold text-white hover:bg-brand-dark"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-[10px] bg-brand-main px-6 py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
                    >
                      {isSubmitting ? "Submitting Order..." : "Submit Catalogue Order"}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
