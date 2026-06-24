import Image from "next/image";

// 40,000 followers celebration — Signature packages up to 80% off, fulfilled via Fiverr.
// Limited to 30 CV orders + 10 LinkedIn orders. Links are tried in order; a changed
// price on Fiverr means that discount slot is already taken.
const fiverrLinks = [
  { label: "Discount Link 1", href: "https://www.fiverr.com/s/38DxdBx" },
  { label: "Discount Link 2", href: "https://www.fiverr.com/s/wkRxoXD" },
  { label: "Discount Link 3", href: "https://www.fiverr.com/s/kLQaZQN" },
  { label: "Discount Link 4", href: "https://www.fiverr.com/s/BRQzpQb" },
];

const BANNER_IMAGE_SRC = "/images/signature-discount-40k-banner.jpg";

type Props = {
  className?: string;
};

export default function SignatureDiscountBanner({ className = "" }: Props) {
  return (
    <section
      className={`w-full ${className}`}
      aria-label="40,000 followers celebration discount on Signature packages"
    >
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[16px] border-2 border-brand-main bg-primary shadow-[0_8px_40px_rgba(10,37,64,0.18)]">
        <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
          {/* Banner artwork */}
          <div className="relative aspect-square w-full bg-primary md:aspect-auto">
            <Image
              src={BANNER_IMAGE_SRC}
              alt="40,000 followers celebration — Signature CV Writing and LinkedIn Optimization packages up to 80% off. Student Rs. 6,500 to $5, Professional Rs. 12,500 to $10, Executive Rs. 18,500 to $15."
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover"
            />
          </div>

          {/* Offer details + Fiverr links */}
          <div className="flex flex-col justify-center gap-4 p-6 text-white sm:p-8">
            <div>
              <span className="badge badge-premium">40,000 Followers Celebration</span>
              <h2 className="mt-3 font-heading text-[24px] font-bold !text-white sm:text-[28px]">
                Signature Packages — up to <span className="text-brand-main">80% OFF</span>
              </h2>
              <p className="mt-1 text-sm text-white/75">
                CV Writing + LinkedIn Account Optimization. Fully rewritten by Chanuka (CPRW certified).
              </p>
            </div>

            {/* Price tiers */}
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between gap-3 border-b border-white/10 pb-2">
                <span className="text-white/80">Student</span>
                <span className="font-semibold">
                  <span className="text-white/50 line-through">Rs. 6,500</span>{" "}
                  <span className="text-brand-main">→ $5</span>
                </span>
              </li>
              <li className="flex items-center justify-between gap-3 border-b border-white/10 pb-2">
                <span className="text-white/80">Professional <span className="text-white/50">(1–9 yrs)</span></span>
                <span className="font-semibold">
                  <span className="text-white/50 line-through">Rs. 12,500</span>{" "}
                  <span className="text-brand-main">→ $10</span>
                </span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="text-white/80">Executive <span className="text-white/50">(10+ yrs)</span></span>
                <span className="font-semibold">
                  <span className="text-white/50 line-through">Rs. 18,500</span>{" "}
                  <span className="text-brand-main">→ $15</span>
                </span>
              </li>
            </ul>

            {/* Freebies */}
            <div className="rounded-[10px] bg-white/5 px-4 py-3 text-xs leading-relaxed text-white/80">
              <strong className="text-brand-main">Free add-ons:</strong> Professional → Cover Letter FREE ·
              Executive → Cover Letter + LinkedIn Optimization FREE
            </div>

            {/* Fiverr links */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-main">
                Claim on Fiverr — try links in order
              </p>
              <div className="grid grid-cols-2 gap-2">
                {fiverrLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-[8px] bg-brand-main px-3 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-brand-light active:translate-y-[1px]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-white/55">
                If a link shows a changed price, that discount slot is already taken — try the next link.
                Limited to 30 CV orders &amp; 10 LinkedIn Optimization orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
