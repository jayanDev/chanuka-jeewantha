"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  buildCatalogueWhatsAppMessage,
  calculateDeliveryAdjustedTotal,
  catalogueServiceKeys,
  deliveryChoices,
  getDeliveryAdjustedPrice,
  getDeliveryLabel,
  resolveCatalogueServiceKeys,
  type DeliverySpeed,
  type TargetCountryOption,
} from "@/lib/catalogue-questionnaire";
import {
  experienceOptions,
  formatLkr,
  getFilteredPackages,
  getFounderLedAvailabilityLabel,
  getServiceOptionByKey,
  serviceOptionChoices,
  serviceOptions,
  type ExperienceKey,
  type ServiceKey,
  type ServiceOptionKey,
} from "@/lib/packages-catalog";

const whatsappNumber = "94773902230";
const questionCount = 6;
const visibleServices = serviceOptions.filter((service) =>
  catalogueServiceKeys.includes(service.key)
);

type QuestionCardProps = {
  number: number;
  title: string;
  description?: string;
  children: ReactNode;
};

function QuestionCard({
  number,
  title,
  description,
  children,
}: QuestionCardProps) {
  return (
    <section className="rounded-[18px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-main">
        Question {number} of {questionCount}
      </p>
      <h2 className="mt-2 font-heading text-[28px] font-bold text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-zinc-600">{description}</p>
      ) : null}
      {children}
    </section>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-[10px] border border-zinc-300 px-5 py-3 font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-dark"
    >
      Back
    </button>
  );
}

export default function CatalogueQuestionnaireClient() {
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<ServiceKey[]>([]);
  const [experience, setExperience] = useState<ExperienceKey | "">("");
  const [serviceOption, setServiceOption] =
    useState<ServiceOptionKey | "">("");
  const [delivery, setDelivery] = useState<DeliverySpeed | "">("");
  const [targetJobRoles, setTargetJobRoles] = useState("");
  const [targetCountry, setTargetCountry] =
    useState<TargetCountryOption | "">("");
  const [foreignCountries, setForeignCountries] = useState("");
  const [availabilityLabel, setAvailabilityLabel] = useState("");
  const [tierInfoOpen, setTierInfoOpen] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
    const serviceParam = params.get("service") as ServiceKey | null;
    const rawExperienceParam = params.get("experience");
    const experienceParam = (
      rawExperienceParam === "fresh-graduate"
        ? "student"
        : rawExperienceParam === "senior-professional"
          ? "professional"
          : rawExperienceParam
    ) as ExperienceKey | null;
    const optionParam = params.get("option") as ServiceOptionKey | null;
    const bundleParam = params.get("bundle");

    if (bundleParam === "starter") {
      setSelectedServices(["ats-cv", "cover-letter", "linkedin"]);
      setExperience("student");
      setServiceOption("supervised");
      setStep(4);
      return;
    }

    if (bundleParam === "career" || bundleParam === "executive") {
      setSelectedServices(["ats-cv", "cover-letter", "linkedin"]);
      setExperience(bundleParam === "career" ? "professional" : "executive");
      setServiceOption("founder-led");
      setStep(4);
      return;
    }

    let servicesSet = false;
    if (serviceParam === "foreign-cv") {
      setSelectedServices(["ats-cv"]);
      setTargetCountry("foreign");
      servicesSet = true;
    } else if (
      serviceParam &&
      catalogueServiceKeys.includes(serviceParam)
    ) {
      setSelectedServices([serviceParam]);
      servicesSet = true;
    }

    let experienceSet = false;
    if (
      experienceParam &&
      experienceOptions.some((item) => item.key === experienceParam)
    ) {
      setExperience(experienceParam);
      experienceSet = true;
    }

    let optionSet = false;
    if (
      optionParam &&
      serviceOptionChoices.some((item) => item.key === optionParam)
    ) {
      setServiceOption(optionParam);
      optionSet = true;
    }

    if (servicesSet && experienceSet && optionSet) {
      setStep(4);
    } else if (servicesSet && experienceSet) {
      setStep(3);
    } else if (servicesSet) {
      setStep(2);
    }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [params]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (serviceOption === "founder-led") {
        setAvailabilityLabel(getFounderLedAvailabilityLabel());
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [serviceOption]);

  const effectiveServiceKeys = useMemo(
    () =>
      targetCountry
        ? resolveCatalogueServiceKeys(selectedServices, targetCountry)
        : selectedServices,
    [selectedServices, targetCountry]
  );

  const matchedPackages = useMemo(() => {
    const hasCountryDetails =
      targetCountry === "sri-lanka" ||
      (targetCountry === "foreign" && Boolean(foreignCountries.trim()));

    if (
      !experience ||
      !serviceOption ||
      !delivery ||
      !targetCountry ||
      !targetJobRoles.trim() ||
      !hasCountryDetails ||
      effectiveServiceKeys.length === 0
    ) {
      return [];
    }

    return getFilteredPackages({
      serviceKeys: effectiveServiceKeys,
      experienceKey: experience,
      optionKey: serviceOption,
    });
  }, [
    delivery,
    effectiveServiceKeys,
    experience,
    foreignCountries,
    serviceOption,
    targetCountry,
    targetJobRoles,
  ]);

  const selectedExperience = experience
    ? experienceOptions.find((item) => item.key === experience)
    : null;
  const selectedOption = serviceOption
    ? getServiceOptionByKey(serviceOption)
    : null;
  const totalLkr = delivery
    ? calculateDeliveryAdjustedTotal(matchedPackages, delivery)
    : 0;

  const whatsappOrderUrl = useMemo(() => {
    if (
      !experience ||
      !serviceOption ||
      !delivery ||
      !targetCountry ||
      matchedPackages.length === 0
    ) {
      return "#";
    }

    const message = buildCatalogueWhatsAppMessage({
      packages: matchedPackages,
      serviceKeys: effectiveServiceKeys,
      experienceLabel: selectedExperience?.title ?? "",
      serviceOptionLabel: selectedOption?.title ?? "",
      delivery,
      targetJobRoles,
      targetCountry,
      foreignCountries,
    });

    return (
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(message)
    );
  }, [
    delivery,
    effectiveServiceKeys,
    experience,
    foreignCountries,
    matchedPackages,
    selectedExperience?.title,
    selectedOption?.title,
    serviceOption,
    targetCountry,
    targetJobRoles,
  ]);

  const toggleService = (key: ServiceKey) => {
    setSelectedServices((previous) =>
      previous.includes(key)
        ? previous.filter((item) => item !== key)
        : [...previous, key]
    );
  };

  const canShowPackages =
    Boolean(targetCountry) &&
    (targetCountry !== "foreign" || Boolean(foreignCountries.trim()));

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="w-full bg-foreground px-4 pb-6 pt-8 text-background sm:px-6 sm:pb-8 sm:pt-10">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-main sm:text-sm">
            Career Studio Catalogue
          </p>
          <h1 className="mt-2 font-heading text-[26px] font-bold leading-[1.1] !text-white sm:text-[36px] md:text-[46px]">
            Find the right package in{" "}
            <span className="text-brand-main">6 questions.</span>
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            Choose what you need and receive the matching package with the
            correct price.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <div
          className="mb-6 grid grid-cols-6 gap-2"
          aria-label={"Question progress: step " + Math.min(step, questionCount) + " of 6"}
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className={
                "h-2 rounded-full " +
                (step >= item ? "bg-brand-main" : "bg-zinc-200")
              }
            />
          ))}
        </div>

        {step === 1 ? (
          <QuestionCard
            number={1}
            title="What kind of services do you need?"
            description="You can select one or multiple services."
          >
            <div className="mb-5 mt-5 flex flex-col gap-2 rounded-[12px] border border-zinc-200 bg-bg-cream p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-text-body">Already know what you need?</p>
              <Link
                href="/packages"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-main hover:text-brand-dark"
              >
                Browse all packages →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {visibleServices.map((service) => {
                const selected = selectedServices.includes(service.key);

                return (
                  <label
                    key={service.key}
                    className={
                      "flex cursor-pointer gap-3 rounded-[12px] border p-4 transition-colors " +
                      (selected
                        ? "border-brand-main bg-brand-main/5"
                        : "border-zinc-200 hover:border-brand-main")
                    }
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleService(service.key)}
                      className="mt-1 accent-brand-main"
                    />
                    <span>
                      <span className="block font-semibold text-foreground">
                        {service.title}
                      </span>
                      <span className="mt-1 block text-sm text-zinc-600">
                        {service.description}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>

            <button
              type="button"
              disabled={selectedServices.length === 0}
              onClick={() => setStep(2)}
              className="mt-6 rounded-[10px] bg-brand-main px-5 py-3 font-semibold text-white disabled:opacity-50"
            >
              Continue
            </button>
          </QuestionCard>
        ) : null}

        {step === 2 ? (
          <QuestionCard number={2} title="How much experience do you have?">
            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
              {experienceOptions.map((item) => (
                <label
                  key={item.key}
                  className={
                    "flex cursor-pointer gap-3 rounded-[12px] border p-4 transition-colors " +
                    (experience === item.key
                      ? "border-brand-main bg-brand-main/5"
                      : "border-zinc-200 hover:border-brand-main")
                  }
                >
                  <input
                    type="radio"
                    name="experience"
                    checked={experience === item.key}
                    onChange={() => setExperience(item.key)}
                    className="mt-1 accent-brand-main"
                  />
                  <span className="font-semibold text-foreground">
                    {item.title}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <BackButton onClick={() => setStep(1)} />
              <button
                type="button"
                disabled={!experience}
                onClick={() => setStep(3)}
                className="rounded-[10px] bg-brand-main px-5 py-3 font-semibold text-white disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </QuestionCard>
        ) : null}

        {step === 3 ? (
          <QuestionCard
            number={3}
            title="Which service option do you prefer?"
          >
            <button
              type="button"
              onClick={() => setTierInfoOpen((previous) => !previous)}
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-main transition-colors hover:text-brand-dark"
            >
              <span aria-hidden="true">{tierInfoOpen ? "−" : "+"}</span>
              What&apos;s the difference between Signature and Essentials?
            </button>

            {tierInfoOpen ? (
              <div className="mt-3 grid grid-cols-1 gap-4 rounded-[14px] border border-zinc-200 bg-zinc-50 p-4 text-sm sm:grid-cols-2">
                <div className="rounded-[10px] border border-[#C9A961]/40 bg-white p-4">
                  <p className="mb-1 font-bold text-foreground">
                    Signature Series
                  </p>
                  <p className="mb-2 text-xs text-zinc-500">
                    Personally crafted by Chanuka Jeewantha · CPRW &amp; CPCC
                  </p>
                  <ul className="space-y-1 text-zinc-700">
                    <li>✓ Strategic industry positioning</li>
                    <li>✓ 30-day post-delivery support</li>
                    <li>✓ Direct WhatsApp access</li>
                    <li>✓ Limited daily availability</li>
                  </ul>
                </div>
                <div className="rounded-[10px] border border-zinc-200 bg-white p-4">
                  <p className="mb-1 font-bold text-foreground">Essentials</p>
                  <p className="mb-2 text-xs text-zinc-500">
                    Team-crafted and quality reviewed by Chanuka
                  </p>
                  <ul className="space-y-1 text-zinc-700">
                    <li>✓ ATS-friendly professional format</li>
                    <li>✓ Quality-reviewed delivery</li>
                    <li>✓ Email-based support</li>
                    <li>✓ Transparent fixed pricing</li>
                  </ul>
                </div>
              </div>
            ) : null}

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {serviceOptionChoices.map((item) => (
                <label
                  key={item.key}
                  className={
                    "relative flex cursor-pointer gap-3 rounded-[14px] border p-5 transition-all " +
                    (serviceOption === item.key
                      ? "border-brand-main bg-brand-main/5 shadow-sm"
                      : item.key === "founder-led"
                        ? "border-amber-300 bg-gradient-to-br from-amber-50 via-white to-zinc-950/5 hover:border-amber-500"
                        : "border-zinc-200 bg-white hover:border-brand-main")
                  }
                >
                  <input
                    type="radio"
                    name="serviceOption"
                    checked={serviceOption === item.key}
                    onChange={() => setServiceOption(item.key)}
                    className="mt-1 accent-brand-main"
                  />
                  <span>
                    <span className="block font-semibold text-foreground">
                      {item.title}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-zinc-600">
                      {item.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <BackButton onClick={() => setStep(2)} />
              <button
                type="button"
                disabled={!serviceOption}
                onClick={() => setStep(4)}
                className="rounded-[10px] bg-brand-main px-5 py-3 font-semibold text-white disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </QuestionCard>
        ) : null}

        {step === 4 ? (
          <QuestionCard
            number={4}
            title="When do you need your order?"
            description="Choose the delivery timeline that works for you."
          >
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {deliveryChoices.map((item) => (
                <label
                  key={item.key}
                  className={
                    "flex cursor-pointer gap-3 rounded-[14px] border p-5 transition-colors " +
                    (delivery === item.key
                      ? "border-brand-main bg-brand-main/5"
                      : "border-zinc-200 hover:border-brand-main")
                  }
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === item.key}
                    onChange={() => setDelivery(item.key)}
                    className="mt-1 accent-brand-main"
                  />
                  <span>
                    <span className="block font-semibold text-foreground">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm text-zinc-600">
                      {item.timeline}
                    </span>
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <BackButton onClick={() => setStep(3)} />
              <button
                type="button"
                disabled={!delivery}
                onClick={() => setStep(5)}
                className="rounded-[10px] bg-brand-main px-5 py-3 font-semibold text-white disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </QuestionCard>
        ) : null}

        {step === 5 ? (
          <QuestionCard
            number={5}
            title="What job roles are you targeting?"
            description="Add one or more target job titles."
          >
            <label className="mt-6 block text-sm font-medium text-zinc-800">
              Target job role(s)
              <input
                type="text"
                value={targetJobRoles}
                onChange={(event) => setTargetJobRoles(event.target.value)}
                placeholder="e.g. Senior Accountant, Software Engineer"
                autoComplete="off"
                className="mt-2 w-full rounded-[10px] border border-zinc-300 px-4 py-3 text-base outline-none transition-colors focus:border-brand-main"
              />
            </label>

            <div className="mt-6 flex flex-wrap gap-3">
              <BackButton onClick={() => setStep(4)} />
              <button
                type="button"
                disabled={!targetJobRoles.trim()}
                onClick={() => setStep(6)}
                className="rounded-[10px] bg-brand-main px-5 py-3 font-semibold text-white disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </QuestionCard>
        ) : null}

        {step === 6 ? (
          <QuestionCard
            number={6}
            title="Which country are you targeting?"
            description="Foreign applicants can add one or more target countries."
          >
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {(
                [
                  {
                    key: "sri-lanka" as const,
                    title: "Sri Lanka",
                    description: "I am targeting jobs in Sri Lanka.",
                  },
                  {
                    key: "foreign" as const,
                    title: "Foreign",
                    description: "I am targeting jobs outside Sri Lanka.",
                  },
                ]
              ).map((item) => (
                <label
                  key={item.key}
                  className={
                    "flex cursor-pointer gap-3 rounded-[14px] border p-5 transition-colors " +
                    (targetCountry === item.key
                      ? "border-brand-main bg-brand-main/5"
                      : "border-zinc-200 hover:border-brand-main")
                  }
                >
                  <input
                    type="radio"
                    name="targetCountry"
                    checked={targetCountry === item.key}
                    onChange={() => setTargetCountry(item.key)}
                    className="mt-1 accent-brand-main"
                  />
                  <span>
                    <span className="block font-semibold text-foreground">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm text-zinc-600">
                      {item.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>

            {targetCountry === "foreign" ? (
              <label className="mt-5 block text-sm font-medium text-zinc-800">
                Target country or countries
                <input
                  type="text"
                  value={foreignCountries}
                  onChange={(event) => setForeignCountries(event.target.value)}
                  placeholder="e.g. Dubai, Australia, Canada"
                  autoComplete="off"
                  className="mt-2 w-full rounded-[10px] border border-zinc-300 px-4 py-3 text-base outline-none transition-colors focus:border-brand-main"
                />
              </label>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <BackButton onClick={() => setStep(5)} />
              <button
                type="button"
                disabled={!canShowPackages}
                onClick={() => setStep(7)}
                className="rounded-[10px] bg-brand-main px-5 py-3 font-semibold text-white disabled:opacity-50"
              >
                Show My Packages
              </button>
            </div>
          </QuestionCard>
        ) : null}

        {step === 7 ? (
          <section className="space-y-6">
            <div className="rounded-[18px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-main">
                    Your Catalogue
                  </p>
                  <h2 className="mt-2 font-heading text-[30px] font-bold text-foreground">
                    Recommended packages
                  </h2>
                  <p className="mt-2 max-w-3xl text-zinc-600">
                    Matching {selectedExperience?.shortTitle},{" "}
                    {selectedOption?.shortTitle},{" "}
                    {delivery ? getDeliveryLabel(delivery) : ""},{" "}
                    {targetCountry === "foreign"
                      ? foreignCountries
                      : "Sri Lanka"}
                    , and your target role of {targetJobRoles}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-[10px] border border-zinc-300 px-4 py-2 text-sm font-semibold text-foreground hover:border-brand-main"
                >
                  Change Answers
                </button>
              </div>

              {serviceOption === "founder-led" ? (
                <div className="mt-5 rounded-[12px] border border-amber-200 bg-amber-50 p-4">
                  <p className="font-semibold text-amber-900">
                    {availabilityLabel}
                  </p>
                  <p className="mt-1 text-sm text-amber-800">
                    Signature Series availability is limited to protect premium
                    quality.
                  </p>
                </div>
              ) : null}

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                {matchedPackages.map((pkg) => (
                  <article
                    key={pkg.slug}
                    className="rounded-[16px] border border-zinc-200 bg-zinc-50 p-5"
                  >
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                        {pkg.audience}
                      </span>
                      <span className="rounded-full bg-brand-main/10 px-3 py-1 text-xs font-semibold text-brand-dark">
                        {pkg.optionKey === "founder-led"
                          ? "Signature Series"
                          : "Essentials"}
                      </span>
                    </div>
                    <h3 className="font-heading text-[23px] font-bold leading-tight text-foreground">
                      {pkg.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                      {pkg.description}
                    </p>
                    <p className="mt-4 text-2xl font-bold text-foreground">
                      {delivery
                        ? formatLkr(
                            getDeliveryAdjustedPrice(pkg.priceLkr, delivery)
                          )
                        : ""}
                    </p>
                    <p className="mt-1 text-sm font-medium text-brand-dark">
                      {delivery ? getDeliveryLabel(delivery) : ""}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                      {pkg.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <span
                            className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-main"
                            aria-hidden="true"
                          />
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
                    <p className="font-heading text-[28px] font-bold text-foreground">
                      {formatLkr(totalLkr)}
                    </p>
                  </div>
                  <a
                    href={whatsappOrderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[10px] bg-[#25D366] px-7 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-[#1fb85a]"
                  >
                    Continue to WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
