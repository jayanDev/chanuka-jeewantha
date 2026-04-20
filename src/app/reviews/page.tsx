import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { formatLkr, packageCategories, type PackageCategory } from "@/lib/packages-catalog";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList, buildOfferCatalogSchema } from "@/lib/structured-data";
import { getBaseUrl } from "@/lib/site-url";

type TableRow = {
  label: string;
  value: ReactNode;
};

const baseUrl = getBaseUrl();
const businessName =
  "Chanuka Jeewantha - Professional CV Writing, Linkedin Account Optimization & Career Development Services";
const googleMapsBusinessUrl =
  "https://www.google.com/maps/place/Chanuka+Jeewantha+-+Professional+CV+Writing,+Linkedin+Account+Optimization+%26+Career+Development+Services/@7.8494358,78.0640793,7z/data=!3m1!4b1!4m6!3m5!1s0xc74c5fe80f907a3:0x19f0993b9c6e1738!8m2!3d7.857685!4d80.70625!16s%2Fg%2F11z5w6zc1g?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D";
const googleMapsCidUrl = "https://www.google.com/maps?cid=1869162326665336632";
const googleWriteReviewUrl =
  "https://www.google.com/search?hl=en&q=Chanuka%20Jeewantha%20-%20Professional%20CV%20Writing%2C%20Linkedin%20Account%20Optimization%20%26%20Career%20Development%20Services&ludocid=1869162326665336632#lrd=0xc74c5fe80f907a3:0x19f0993b9c6e1738,1,,,";
const whatsappReviewRequestUrl =
  "https://wa.me/94773902230?text=Hello%20Chanuka%2C%20I%20want%20to%20share%20a%20Google%20review.";
const linkedinUrl = "https://www.linkedin.com/in/chanuka-jeewantha/";
const bookingUrl = `${baseUrl}/booking`;

export const metadata: Metadata = buildPageMetadata({
  title: "Chanuka Jeewantha - Professional CV Writing, Linkedin Account Optimization & Career Development Services",
  description:
    "Leave a Google Business review for Chanuka Jeewantha and view your provider details, service information, and package details in table format.",
  path: "/reviews",
  keywords: [
    "google business reviews",
    "leave a google review",
    "chanuka jeewantha reviews",
    "cv writing google reviews",
  ],
});

const providerRows: TableRow[] = [
  {
    label: "Business Name",
    value: businessName,
  },
  {
    label: "Role",
    value: "Professional CV Writer & Career Development Specialist",
  },
  {
    label: "Main Services",
    value: "Professional CV Writing, Cover Letter Writing, Linkedin Account Optimization, CV Review, and Career Development Services",
  },
  {
    label: "Location",
    value: "Sri Lanka (serving remote clients as well)",
  },
  {
    label: "Experience",
    value: "8+ years of practical experience helping job seekers with ATS-friendly documents and profile positioning",
  },
  {
    label: "Website",
    value: (
      <a
        href={`${baseUrl}/reviews`}
        className="font-semibold text-brand-dark underline-offset-4 hover:text-brand-main hover:underline"
      >
        chanukajeewantha.com/reviews
      </a>
    ),
  },
  {
    label: "Booking Page",
    value: (
      <a
        href={bookingUrl}
        className="font-semibold text-brand-dark underline-offset-4 hover:text-brand-main hover:underline"
      >
        chanukajeewantha.com/booking
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
  {
    label: "WhatsApp",
    value: (
      <a
        href={whatsappReviewRequestUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-brand-dark underline-offset-4 hover:text-brand-main hover:underline"
      >
        +94 77 390 2230
      </a>
    ),
  },
];

const businessRows: TableRow[] = [
  {
    label: "Review Platform",
    value: "Google Business Profile",
  },
  {
    label: "Review Purpose",
    value: "Collect public Google reviews from clients who used CV writing, Linkedin optimization, and career support services.",
  },
  {
    label: "Business Category",
    value: "Professional CV Writing, Linkedin Account Optimization, and Career Development Services",
  },
  {
    label: "Google Business Profile",
    value: (
      <a
        href={googleMapsBusinessUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-brand-dark underline-offset-4 hover:text-brand-main hover:underline"
      >
        Open Google Maps listing
      </a>
    ),
  },
  {
    label: "Direct Review Link",
    value: (
      <a
        href={googleWriteReviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-brand-dark underline-offset-4 hover:text-brand-main hover:underline"
      >
        Open Google review form
      </a>
    ),
  },
  {
    label: "Fallback Business URL",
    value: (
      <a
        href={googleMapsCidUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-brand-dark underline-offset-4 hover:text-brand-main hover:underline"
      >
        Open Google Business profile by CID
      </a>
    ),
  },
];

const stepsRows: TableRow[] = [
  {
    label: "Step 1",
    value: "Click the Write Google Review button below. Sign in to your Google account if Google asks you to log in.",
  },
  {
    label: "Step 2",
    value: "Choose your star rating based on your genuine experience.",
  },
  {
    label: "Step 3",
    value: "Write a short review about the service you used, what improved, and what stood out in the process.",
  },
  {
    label: "Step 4",
    value: "Submit the review on Google. If the direct review prompt does not open, use the business-profile button and tap Write a review inside Google.",
  },
];

const promptRows: TableRow[] = [
  {
    label: "What service did you use?",
    value: "CV writing, CV review, cover letter writing, Linkedin optimization, coaching, or another career support service.",
  },
  {
    label: "What changed for you?",
    value: "Mention clearer positioning, better ATS readiness, stronger recruiter response, confidence, or interview improvement if relevant.",
  },
  {
    label: "What stood out?",
    value: "You can mention speed, communication, clarity, professionalism, strategy, or final quality.",
  },
  {
    label: "Who would you recommend this to?",
    value: "Fresh graduates, mid-level professionals, job seekers, international applicants, career switchers, or business clients.",
  },
];

const accessRows: TableRow[] = [
  {
    label: "Write Review",
    value: (
      <a
        href={googleWriteReviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-[10px] bg-brand-main px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Write Google Review
      </a>
    ),
  },
  {
    label: "Open Business Profile",
    value: (
      <a
        href={googleMapsCidUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-[10px] border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
      >
        Open Google Profile
      </a>
    ),
  },
  {
    label: "Need Help?",
    value: (
      <a
        href={whatsappReviewRequestUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-[10px] bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1fb85a]"
      >
        Ask on WhatsApp
      </a>
    ),
  },
  {
    label: "See Website Testimonials",
    value: (
      <Link
        href="/testimonials"
        className="inline-flex items-center justify-center rounded-[10px] border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
      >
        View Testimonials
      </Link>
    ),
  },
];

function renderTable(title: string, rows: TableRow[]) {
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
                  className="w-[240px] border-b border-zinc-200 px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-zinc-500 sm:px-8"
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
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em]">Action</th>
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
                    <Link
                      href="/booking"
                      className="inline-flex items-center justify-center rounded-[10px] border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
                    >
                      Open Booking
                    </Link>
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

export default function ReviewsPage() {
  const breadcrumbLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Reviews", path: "/reviews" },
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

  const reviewPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: businessName,
    description:
      "Leave a Google Business review for Chanuka Jeewantha and review provider and package details in table format.",
    url: `${baseUrl}/reviews`,
    about: {
      "@type": "ProfessionalService",
      name: businessName,
      hasMap: googleMapsBusinessUrl,
      sameAs: [googleMapsBusinessUrl],
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewPageLd) }}
      />

      <section className="w-full bg-foreground text-background pt-[36px] sm:pt-[50px] pb-[72px] sm:pb-[96px] relative overflow-hidden">
        <div className="absolute top-[150px] left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex whitespace-nowrap">
          <div className="animate-[marquee_30s_linear_infinite] flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="text-[72px] sm:text-[120px] md:text-[200px] font-plus-jakarta font-extrabold uppercase leading-none"
              >
                GOOGLE REVIEWS
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
            <span className="text-brand-main">Reviews</span>
          </div>
          <h1 className="font-plus-jakarta text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] font-bold leading-[1.08] max-w-6xl !text-white">
            Chanuka Jeewantha - <span className="text-brand-main">Professional CV Writing, Linkedin Account Optimization & Career Development Services</span>
          </h1>
          <p className="mt-6 max-w-4xl text-lg text-text-light">
            This reviews page now includes your business details, Google review access, and package details in table format so visitors can understand the services and leave a Google Business review from the same page.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={googleWriteReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-[10px] bg-brand-main px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Write Google Review
            </a>
            <a
              href={googleMapsBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-[10px] border border-white/50 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-brand-main hover:text-brand-main"
            >
              Open Business Profile
            </a>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-[64px] sm:py-[80px] md:py-[96px]">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
            <div className="space-y-8">
              {renderTable("Provider Details", providerRows)}
              {renderTable("Business Review Details", businessRows)}
              {renderTable("How to Leave Your Review", stepsRows)}
            </div>

            <aside className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-6 shadow-sm sm:p-8">
              <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-[20px] border border-zinc-200 bg-white">
                <Image
                  src="/images/testimonial-chanuka.jpg"
                  alt="Chanuka Jeewantha Google review request"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
              </div>
              <h2 className="text-[28px] font-bold font-plus-jakarta text-foreground">Quick Note for Reviewers</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                Honest, specific reviews help future clients understand the quality of the service and the type of results they can expect. A short, genuine review is enough.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={googleWriteReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-[10px] bg-brand-main px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  Open Review Form
                </a>
                <a
                  href={googleMapsCidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-[10px] border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
                >
                  Open Google Listing
                </a>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-zinc-500">
                If Google opens the business profile instead of the review box, click or tap the Write a review option inside the Google profile.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="w-full bg-zinc-50 py-[64px] sm:py-[80px] md:py-[96px] border-t border-zinc-200">
        <div className="max-w-[1512px] mx-auto px-4 sm:px-6 space-y-8">
          <section className="space-y-8">
            <div className="rounded-[24px] border border-zinc-200 bg-white px-6 py-5 shadow-sm sm:px-8">
              <h2 className="text-[30px] font-bold font-plus-jakarta text-foreground">Package Details Tables</h2>
              <p className="mt-3 max-w-4xl text-sm leading-relaxed text-zinc-600">
                The tables below show your main package categories, audiences, pricing, delivery timelines, and features so visitors can review the service range before leaving feedback or placing a new order.
              </p>
            </div>
            {packageCategories.map((category) => renderPackageTable(category))}
          </section>
          {renderTable("What You Can Mention in Your Review", promptRows)}
          {renderTable("Review Access Options", accessRows)}
        </div>
      </section>
    </>
  );
}
