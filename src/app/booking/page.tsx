import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  formatLkr,
  packageCategories,
  paymentInstructions,
  type PackageCategory,
  type PackageProduct,
} from "@/lib/packages-catalog";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList, buildOfferCatalogSchema } from "@/lib/structured-data";
import { getBaseUrl } from "@/lib/site-url";

export const metadata: Metadata = buildPageMetadata({
  title: "Chanuka Jeewantha - Professional CV Writing, Linkedin Account Optimization & Career Development Services",
  description:
    "Book professional CV writing, Linkedin account optimization, cover letter writing, CV review, and career development services with Chanuka Jeewantha. View provider details, booking steps, payment details, and package tables on one page.",
  path: "/booking",
  keywords: [
    "booking page",
    "cv writing booking",
    "linkedin account optimization booking",
    "career development services booking",
  ],
});

type DetailRow = {
  label: string;
  value: ReactNode;
};

const baseUrl = getBaseUrl();
const whatsappNumber = "94773902230";
const whatsappBaseMessage = "Hello Chanuka, I want to place an order from the booking page.";
const linkedinUrl = "https://www.linkedin.com/in/chanuka-jeewantha/";
const fiverrUrl = "https://www.fiverr.com/s/kLBDGAb";

const providerRows: DetailRow[] = [
  {
    label: "Service Provider",
    value: "Chanuka Jeewantha",
  },
  {
    label: "Role",
    value: "Professional CV Writer & Career Development Specialist",
  },
  {
    label: "Main Services",
    value: "Professional CV Writing, Cover Letter Writing, Linkedin Account Optimization, CV Review, and Career Development Support",
  },
  {
    label: "Location",
    value: "Sri Lanka (Remote Worldwide)",
  },
  {
    label: "Experience",
    value: "8+ years of practical experience in ATS-friendly CV writing and career support",
  },
  {
    label: "Website",
    value: (
      <a
        href={`${baseUrl}/booking`}
        className="font-semibold text-brand-dark underline-offset-4 hover:text-brand-main hover:underline"
      >
        chanukajeewantha.com/booking
      </a>
    ),
  },
  {
    label: "WhatsApp",
    value: (
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappBaseMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-brand-dark underline-offset-4 hover:text-brand-main hover:underline"
      >
        +94 77 390 2230
      </a>
    ),
  },
  {
    label: "LinkedIn",
    value: (
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-brand-dark underline-offset-4 hover:text-brand-main hover:underline"
      >
        linkedin.com/in/chanuka-jeewantha
      </a>
    ),
  },
];

const bookingRows: DetailRow[] = [
  {
    label: "Step 1",
    value: "Review the package tables below and choose the service tier that best fits your career stage.",
  },
  {
    label: "Step 2",
    value: "Open the package page or send a WhatsApp message directly from the booking table.",
  },
  {
    label: "Step 3",
    value: "Complete website checkout or confirm your order by bank transfer using your name or mobile number as the payment reference.",
  },
  {
    label: "Step 4",
    value: "Share your brief, target role, and existing documents so the work can start quickly and accurately.",
  },
  {
    label: "Step 5",
    value: "Receive your delivery within the package timeline shown in the tables below.",
  },
];

const paymentRows: DetailRow[] = [
  {
    label: "Payment Method",
    value: "Bank transfer",
  },
  {
    label: "Bank",
    value: paymentInstructions.bank,
  },
  {
    label: "Account Name",
    value: paymentInstructions.accountName,
  },
  {
    label: "Account Number",
    value: paymentInstructions.accountNumber,
  },
  {
    label: "Branch",
    value: paymentInstructions.branch,
  },
  {
    label: "Confirmation Note",
    value: paymentInstructions.methodNote,
  },
];

function buildWhatsAppPackageUrl(category: string, item: PackageProduct) {
  const message = [
    "Hello Chanuka, I want to place an order.",
    `Category: ${category}`,
    `Package: ${item.name}`,
    `Price: ${formatLkr(item.priceLkr)}`,
    `Delivery: ${item.delivery}`,
  ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function renderDetailTable(title: string, rows: DetailRow[]) {
  return (
    <article className="rounded-[24px] border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 px-6 py-5 sm:px-8">
        <h2 className="text-[28px] font-bold font-plus-jakarta text-foreground">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.label} className={index % 2 === 0 ? "bg-white" : "bg-zinc-50"}>
                <th
                  scope="row"
                  className="w-[220px] border-b border-zinc-200 px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-zinc-500 sm:px-8"
                >
                  {row.label}
                </th>
                <td className="border-b border-zinc-200 px-6 py-4 text-sm leading-relaxed text-zinc-700 sm:px-8">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function renderPackageTable(category: PackageCategory) {
  return (
    <article key={category.key} className="rounded-[24px] border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[28px] font-bold font-plus-jakarta text-foreground">{category.title}</h2>
            <p className="mt-2 max-w-4xl text-sm leading-relaxed text-zinc-600">{category.description}</p>
          </div>
          {category.isPriority ? (
            <span className="inline-flex rounded-full bg-brand-main/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-dark">
              Priority Category
            </span>
          ) : null}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full border-collapse">
          <thead className="bg-foreground text-background">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em]">Package</th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em]">Audience</th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em]">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em]">Delivery</th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em]">Features</th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em]">Booking</th>
            </tr>
          </thead>
          <tbody>
            {category.packages.map((item, index) => (
              <tr key={item.slug} className={index % 2 === 0 ? "bg-white" : "bg-zinc-50"}>
                <td className="border-b border-zinc-200 px-6 py-5 align-top">
                  <div className="flex flex-col gap-2">
                    <span className="text-base font-bold text-foreground">{item.name}</span>
                    {item.isMostPopular ? (
                      <span className="inline-flex w-fit rounded-full bg-brand-main px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                        Most Popular
                      </span>
                    ) : null}
                  </div>
                </td>
                <td className="border-b border-zinc-200 px-6 py-5 align-top text-sm leading-relaxed text-zinc-700">
                  {item.audience}
                </td>
                <td className="border-b border-zinc-200 px-6 py-5 align-top">
                  <span className="text-base font-bold text-brand-dark">{formatLkr(item.priceLkr)}</span>
                </td>
                <td className="border-b border-zinc-200 px-6 py-5 align-top text-sm font-medium text-zinc-700">
                  {item.delivery}
                </td>
                <td className="border-b border-zinc-200 px-6 py-5 align-top">
                  <ul className="space-y-2 text-sm leading-relaxed text-zinc-700">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-brand-main" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border-b border-zinc-200 px-6 py-5 align-top">
                  <div className="flex min-w-[180px] flex-col gap-2">
                    <Link
                      href={`/packages/${item.slug}`}
                      className="inline-flex items-center justify-center rounded-[10px] bg-brand-main px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                    >
                      View Package
                    </Link>
                    <a
                      href={buildWhatsAppPackageUrl(category.title, item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-[10px] bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1fb85a]"
                    >
                      Book on WhatsApp
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

export default function BookingPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Booking", path: "/booking" },
  ]);

  const offerCatalogLd = buildOfferCatalogSchema(
    packageCategories.map((category) => ({
      name: category.title,
      items: category.packages.map((item) => ({
        name: item.name,
        path: `/packages/${item.slug}`,
        priceLkr: item.priceLkr,
        description: item.audience,
      })),
    }))
  );

  const bookingServiceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Chanuka Jeewantha Booking Page",
    description:
      "Booking page for professional CV writing, Linkedin account optimization, and career development services by Chanuka Jeewantha.",
    serviceType: "Professional CV Writing, Linkedin Account Optimization & Career Development Services",
    provider: {
      "@type": "ProfessionalService",
      name: "Chanuka Jeewantha",
      url: `${baseUrl}/about`,
      areaServed: "Sri Lanka and worldwide remote clients",
    },
    url: `${baseUrl}/booking`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookingServiceLd) }}
      />

      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="text-[72px] sm:text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none"
              >
                BOOKING
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-text-light font-medium mb-6">
            <Link href="/" className="hover:text-brand-main transition-colors">
              Home
            </Link>
            <span className="text-brand-main text-xs">/</span>
            <span className="text-brand-main">Booking</span>
          </div>
          <h1 className="font-plus-jakarta text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] font-bold leading-[1.08] max-w-6xl !text-white">
            Chanuka Jeewantha - <span className="text-brand-main">Professional CV Writing, Linkedin Account Optimization & Career Development Services</span>
          </h1>
          <p className="mt-6 max-w-4xl text-lg text-text-light">
            This booking page brings your service details, contact information, payment details, and package pricing into one structured view so clients can compare options and place orders faster.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappBaseMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-[10px] bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1fb85a]"
            >
              Book on WhatsApp
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-[10px] border border-white/50 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-brand-main hover:text-brand-main"
            >
              Open Pricing
            </Link>
            <a
              href={fiverrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-[10px] border border-white/50 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-brand-main hover:text-brand-main"
            >
              Fiverr Orders
            </a>
          </div>
        </div>
      </section>

      <section className="w-full bg-zinc-50 py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 space-y-8">
          {renderDetailTable("Provider Details", providerRows)}
          {renderDetailTable("How Booking Works", bookingRows)}
          {renderDetailTable("Payment Details", paymentRows)}

          <section className="space-y-8">
            <div className="rounded-[24px] border border-zinc-200 bg-white px-6 py-5 shadow-sm sm:px-8">
              <h2 className="text-[30px] font-bold font-plus-jakarta text-foreground">Packages and Service Tables</h2>
              <p className="mt-3 max-w-4xl text-sm leading-relaxed text-zinc-600">
                Each table below lists the package name, target audience, price, delivery timeline, included features, and direct booking action. Clients can use the package page or WhatsApp option from the same row.
              </p>
            </div>

            {packageCategories.map((category) => renderPackageTable(category))}
          </section>

          <section className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-[28px] font-bold font-plus-jakarta text-foreground">Direct Booking Options</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead className="bg-foreground text-background">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em]">Channel</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em]">Best For</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border-b border-zinc-200 px-6 py-4 text-sm font-semibold text-foreground">Website Checkout</td>
                    <td className="border-b border-zinc-200 px-6 py-4 text-sm text-zinc-700">Customers who want to add items to cart and complete checkout inside the website</td>
                    <td className="border-b border-zinc-200 px-6 py-4">
                      <Link
                        href="/pricing"
                        className="inline-flex items-center justify-center rounded-[10px] bg-brand-main px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                      >
                        Go to Pricing
                      </Link>
                    </td>
                  </tr>
                  <tr className="bg-zinc-50">
                    <td className="border-b border-zinc-200 px-6 py-4 text-sm font-semibold text-foreground">WhatsApp</td>
                    <td className="border-b border-zinc-200 px-6 py-4 text-sm text-zinc-700">Fast conversations, custom questions, and manual order confirmation</td>
                    <td className="border-b border-zinc-200 px-6 py-4">
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappBaseMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-[10px] bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1fb85a]"
                      >
                        Start WhatsApp Chat
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-b border-zinc-200 px-6 py-4 text-sm font-semibold text-foreground">Fiverr</td>
                    <td className="border-b border-zinc-200 px-6 py-4 text-sm text-zinc-700">Clients who prefer Fiverr ordering flow for CV writing services</td>
                    <td className="border-b border-zinc-200 px-6 py-4">
                      <a
                        href={fiverrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-[10px] border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
                      >
                        Open Fiverr Offers
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
