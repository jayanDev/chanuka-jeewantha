"use client";

import { useState } from "react";
import Link from "next/link";
import {
  experienceOptions,
  getPackageDisplayPrice,
  packageProducts,
  serviceOptionChoices,
  serviceOptions,
  type ExperienceKey,
  type ServiceKey,
  type ServiceOptionKey,
} from "@/lib/packages-catalog";

type ServicesPackageFilterProps = {
  lockedServiceKey?: ServiceKey;
};

export default function ServicesPackageFilter({ lockedServiceKey }: ServicesPackageFilterProps) {
  const [selectedServices, setSelectedServices] = useState<Set<ServiceKey>>(
    lockedServiceKey ? new Set([lockedServiceKey]) : new Set()
  );
  const [experience, setExperience] = useState<ExperienceKey | "all">("all");
  const [serviceOption, setServiceOption] = useState<ServiceOptionKey | "all">("all");
  const visibleServices = lockedServiceKey
    ? serviceOptions.filter((service) => service.key === lockedServiceKey)
    : serviceOptions;

  const filteredPackages = packageProducts.filter((pkg) => {
    if (lockedServiceKey && pkg.serviceKey !== lockedServiceKey) return false;
    if (selectedServices.size > 0 && !selectedServices.has(pkg.serviceKey)) return false;
    if (experience !== "all" && pkg.experienceKey !== experience) return false;
    if (serviceOption !== "all" && pkg.optionKey !== serviceOption) return false;
    return true;
  });

  const toggleService = (key: ServiceKey) => {
    if (lockedServiceKey) return;
    setSelectedServices((previous) => {
      const next = new Set(previous);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <section className="mt-12">
      <div className="rounded-[18px] border border-zinc-200 bg-zinc-50 p-5 md:p-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_280px_280px]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
              What kind of services do you need?
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {visibleServices.map((service) => (
                <label
                  key={service.key}
                  className={`flex items-start gap-2 rounded-[10px] border px-3 py-2 text-sm ${
                    lockedServiceKey
                      ? "cursor-default border-brand-main bg-brand-main/10 text-brand-dark"
                      : "cursor-pointer border-zinc-200 bg-white text-zinc-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={lockedServiceKey ? true : selectedServices.has(service.key)}
                    disabled={Boolean(lockedServiceKey)}
                    onChange={() => toggleService(service.key)}
                    className="mt-1 accent-brand-main"
                  />
                  <span>{service.title}</span>
                </label>
              ))}
            </div>
          </div>

          <label>
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
              How many experience do you have?
            </span>
            <select
              value={experience}
              onChange={(event) => setExperience(event.target.value as ExperienceKey | "all")}
              className="w-full rounded-[10px] border border-zinc-300 bg-white px-3 py-3 text-sm"
            >
              <option value="all">All experience levels</option>
              {experienceOptions.map((item) => (
                <option key={item.key} value={item.key}>{item.title}</option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
              Which service option you prefer?
            </span>
            <select
              value={serviceOption}
              onChange={(event) => setServiceOption(event.target.value as ServiceOptionKey | "all")}
              className="w-full rounded-[10px] border border-zinc-300 bg-white px-3 py-3 text-sm"
            >
              <option value="all">All service options</option>
              {serviceOptionChoices.map((item) => (
                <option key={item.key} value={item.key}>{item.title}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-zinc-600">{filteredPackages.length} packages showing</p>
          <button
            type="button"
            onClick={() => {
              setSelectedServices(lockedServiceKey ? new Set([lockedServiceKey]) : new Set());
              setExperience("all");
              setServiceOption("all");
            }}
            className="rounded-[10px] border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-700"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredPackages.map((pkg) => (
          <article key={pkg.slug} className="rounded-[16px] border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                {pkg.optionKey === "founder-led" ? "Signature Series" : "Essentials"}
              </span>
              <span className="rounded-full bg-brand-main/10 px-3 py-1 text-xs font-semibold text-brand-dark">
                {pkg.audience}
              </span>
            </div>
            <h3 className="font-plus-jakarta text-[22px] font-bold leading-tight text-foreground">{pkg.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{pkg.description}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-[10px] bg-zinc-50 p-3">
                <p className="text-xs uppercase tracking-wide text-zinc-500">Price</p>
                <p className="mt-1 text-lg font-bold text-foreground">{getPackageDisplayPrice(pkg)}</p>
              </div>
              <div className="rounded-[10px] bg-zinc-50 p-3">
                <p className="text-xs uppercase tracking-wide text-zinc-500">Delivery</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{pkg.delivery}</p>
              </div>
            </div>
            <ul className="mt-5 space-y-2 text-sm text-zinc-700">
              {pkg.features.slice(0, 4).map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-main" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href={`/packages/${pkg.slug}`} className="rounded-[10px] border border-zinc-300 px-4 py-2 text-sm font-semibold text-foreground hover:border-brand-main hover:text-brand-main">
                Details
              </Link>
              <Link href={`/catalogue?service=${pkg.serviceKey}`} className="rounded-[10px] bg-brand-main px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
                Catalogue Order
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
