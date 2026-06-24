import Image from "next/image";

// 40,000 followers celebration — Signature packages up to 80% off, fulfilled via Fiverr.
// Limited to 30 CV orders + 10 LinkedIn orders. Links are tried in order; a changed
// price on Fiverr means that discount slot is already taken.
const fiverrLinks = [
  { label: "Link 1", href: "https://www.fiverr.com/s/38DxdBx" },
  { label: "Link 2", href: "https://www.fiverr.com/s/wkRxoXD" },
  { label: "Link 3", href: "https://www.fiverr.com/s/kLQaZQN" },
  { label: "Link 4", href: "https://www.fiverr.com/s/BRQzpQb" },
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
        <div className="grid gap-0 md:grid-cols-2">
          {/* Banner artwork (already contains the prices, free add-ons & order limits) */}
          <div className="relative aspect-square w-full bg-primary">
            <Image
              src={BANNER_IMAGE_SRC}
              alt="40,000 followers celebration — Signature CV Writing and LinkedIn Optimization packages up to 80% off. Student Rs. 6,500 to $5, Professional Rs. 12,500 to $10, Executive Rs. 18,500 to $15. Professional gets a free cover letter; Executive gets a free cover letter and LinkedIn optimization."
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
          </div>

          {/* Order CTA — the only thing the artwork can't do: real Fiverr links */}
          <div className="flex flex-col justify-center gap-5 p-6 text-white sm:p-8">
            <div>
              <span className="badge badge-premium">Up to 80% OFF · Signature</span>
              <h2 className="mt-3 font-heading text-[24px] font-bold !text-white sm:text-[30px]">
                Claim your discount on Fiverr
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Order your CV Writing or LinkedIn Optimization through one of the links below.
                Tap a link and place your order on Fiverr.
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-main">
                Try the links in order
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {fiverrLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-[8px] bg-brand-main px-3 py-3 text-sm font-semibold text-primary transition-all hover:bg-brand-light active:translate-y-[1px]"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm9.6 9.6V9.4h-1.8a2.4 2.4 0 0 0-2.4 2.4v2.8H7.2v2.2h1.2v-2.2h2.2v2.2h1.8v-2.2h2.4v-2.2H12.6zm-1.8-2.2a.6.6 0 0 1 .6-.6h1.2v.6h-1.8z" />
                    </svg>
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
