"use client";

import { useEffect, useMemo, useState } from "react";
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

export default function CatalogueClient() {
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [orderStep, setOrderStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<ServiceKey[]>([]);
  const [experience, setExperience] = useState<ExperienceKey | "">("");
  const [serviceOption, setServiceOption] = useState<ServiceOptionKey | "">("");
  const [availabilityLabel, setAvailabilityLabel] = useState("");
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
    const requestedService = params.get("service") as ServiceKey | null;
    if (requestedService && serviceOptions.some((item) => item.key === requestedService)) {
      setSelectedServices([requestedService]);
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
      setMessage(`Order submitted successfully${orderId ? `: ${orderId}` : ""}. We will verify your payment and contact you on WhatsApp.`);
      setPaymentSlip(null);
      setCurrentCv(null);
    } catch {
      setError("Failed to submit order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedExperience = experience ? experienceOptions.find((item) => item.key === experience) : null;
  const selectedOption = serviceOption ? getServiceOptionByKey(serviceOption) : null;

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="w-full bg-foreground px-4 py-12 text-background sm:px-6 md:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-semibold uppercase tracking-[0.18em] text-brand-main">Career Studio Catalogue</p>
          <h1 className="mt-4 font-plus-jakarta text-[34px] font-bold leading-[1.08] !text-white sm:text-[46px] md:text-[64px]">
            Find the right package in three questions.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/80">
            Answer the questions first. Packages appear only after the catalogue understands your service need, experience level, and preferred delivery option.
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
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-main">Question 1</p>
            <h2 className="mt-2 font-plus-jakarta text-[30px] font-bold text-foreground">What kind of services do you need?</h2>
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
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-main">Question 2</p>
            <h2 className="mt-2 font-plus-jakarta text-[30px] font-bold text-foreground">How many experience do you have?</h2>
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
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-main">Question 3</p>
            <h2 className="mt-2 font-plus-jakarta text-[30px] font-bold text-foreground">Which service option you prefer?</h2>
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
                  <h2 className="mt-2 font-plus-jakarta text-[30px] font-bold text-foreground">Recommended packages</h2>
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
                  <p className="mt-1 text-sm text-amber-800">Founder-led premium packages are shown as limited daily slots to protect premium quality.</p>
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                {matchedPackages.map((pkg) => (
                  <article key={pkg.slug} className="rounded-[16px] border border-zinc-200 bg-zinc-50 p-5">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-brand-main/10 px-3 py-1 text-xs font-bold text-brand-dark">{pkg.code}</span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-700">{pkg.audience}</span>
                    </div>
                    <h3 className="font-plus-jakarta text-[23px] font-bold leading-tight text-foreground">{pkg.name}</h3>
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
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-zinc-500">Order total</p>
                    <p className="font-plus-jakarta text-[28px] font-bold text-foreground">{formatLkr(totals.totalLkr)}</p>
                    {totals.discountPercent > 0 && (
                      <p className="text-sm font-semibold text-emerald-700">
                        {totals.discountPercent}% supervised bundle discount applied. You save {formatLkr(totals.discountLkr)}.
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500">Subtotal: {formatLkr(totals.subtotalLkr)}</p>
                </div>
              </div>
            </div>

            {orderStep === 0 ? (
              <div className="rounded-[18px] border border-brand-main/20 bg-white p-6 text-center shadow-sm md:p-8">
                <h2 className="font-plus-jakarta text-[30px] font-bold text-foreground">Ready to order this package?</h2>
                <p className="mx-auto mt-2 max-w-2xl text-zinc-600">
                  The order details are split into 5 short pages, so you can complete one small section at a time.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOrderStep(1);
                    window.requestAnimationFrame(() => {
                      document.getElementById("catalogue-order-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    });
                  }}
                  className="mt-6 rounded-[10px] bg-brand-main px-7 py-3 font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  Order Now
                </button>
              </div>
            ) : (
              <form id="catalogue-order-form" onSubmit={submitOrder} className="rounded-[18px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-main">Order this package</p>
                    <h2 className="mt-2 font-plus-jakarta text-[30px] font-bold text-foreground">
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
                      <h3 className="font-plus-jakarta text-[24px] font-bold text-foreground">Personal Information</h3>
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
                      <h3 className="font-plus-jakarta text-[24px] font-bold text-foreground">Career Background</h3>
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
                      <h3 className="font-plus-jakarta text-[24px] font-bold text-foreground">Education, Languages & Referees</h3>
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
                      <h3 className="font-plus-jakarta text-[24px] font-bold text-foreground">Career Goals & Final Notes</h3>
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
                      <h3 className="font-plus-jakarta text-[24px] font-bold text-foreground">Payment Confirmation</h3>
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
