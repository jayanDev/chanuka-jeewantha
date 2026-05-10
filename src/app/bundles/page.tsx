import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Bundle Packages | Save Up to 25% | Chanuka Jeewantha",
  description:
    "Explore our 3 curated bundle packages: Starter (LKR 9,500), Career (LKR 22,500), and Executive (LKR 45,000). Save up to 25% on combined services.",
  path: "/bundles",
});

export default function BundlesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-[#0A2540] to-[#1a3a5c] text-white px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-[1512px] mx-auto text-center">
          <span className="inline-block text-[#C9A961] font-semibold uppercase tracking-[0.18em] mb-4">Smart Pricing</span>
          <h1 className="font-plus-jakarta text-[36px] sm:text-[48px] md:text-[64px] font-bold leading-[1.1] mb-6">
            Bundle Packages That Save You Money
          </h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto mb-8">
            Three carefully curated packages designed for different career stages. Get more value, better outcomes, and proven results.
          </p>
        </div>
      </section>

      {/* Main Bundles Grid */}
      <section className="w-full py-16 sm:py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-[1512px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Starter Pack */}
            <div className="bundle-card bg-white rounded-[20px] border border-zinc-200 p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-plus-jakarta text-[32px] font-bold text-foreground">🎓 Starter Pack</h2>
              </div>
              <p className="text-sm font-semibold text-[#C9A961] uppercase tracking-wider mb-4">For Students & Graduates</p>
              
              <div className="mb-8 pb-8 border-b border-zinc-200">
                <p className="text-sm text-zinc-600 mb-2">Total Value</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-[40px] font-bold text-foreground">LKR 9,500</span>
                  <span className="text-sm text-zinc-400 line-through">LKR 11,850</span>
                  <span className="text-sm font-bold text-[#10B981] bg-green-50 px-3 py-1 rounded-full">Save 20%</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-4">Includes:</h3>
                <ul className="space-y-3 text-sm text-zinc-700">
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <div>
                      <strong>Essentials ATS CV</strong>
                      <p className="text-zinc-500">LKR 2,950 (student)</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <div>
                      <strong>Cover Letter</strong>
                      <p className="text-zinc-500">LKR 1,950 (student)</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <div>
                      <strong>LinkedIn Optimization</strong>
                      <p className="text-zinc-500">LKR 2,950 (student)</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <span>7-day delivery</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <span>Email support</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <span>WhatsApp access (via team member)</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <Link
                  href="/catalogue?bundle=starter"
                  className="block w-full text-center px-6 py-3 bg-[#C9A961] text-white font-semibold rounded-[10px] hover:bg-[#B8985A] transition-colors"
                >
                  Get Starter Pack →
                </Link>
                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-3 border-2 border-zinc-200 text-foreground font-semibold rounded-[10px] hover:border-[#C9A961] hover:text-[#C9A961] transition-colors"
                >
                  Have Questions?
                </Link>
              </div>
            </div>

            {/* Career Pack - Featured */}
            <div className="bundle-card featured bg-gradient-to-br from-[#C9A961]/10 to-white rounded-[20px] border-2 border-[#C9A961] p-8 shadow-2xl hover:shadow-2xl transition-all hover:-translate-y-2 md:scale-105 md:z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-plus-jakarta text-[32px] font-bold text-foreground">🚀 Career Pack</h2>
                <span className="bg-[#C9A961] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">⭐ POPULAR</span>
              </div>
              <p className="text-sm font-semibold text-[#C9A961] uppercase tracking-wider mb-4">For Working Professionals</p>
              
              <div className="mb-8 pb-8 border-b border-[#C9A961]/20">
                <p className="text-sm text-zinc-600 mb-2">Total Value</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-[40px] font-bold text-foreground">LKR 22,500</span>
                  <span className="text-sm text-zinc-400 line-through">LKR 30,000</span>
                  <span className="text-sm font-bold text-[#10B981] bg-green-50 px-3 py-1 rounded-full">Save LKR 7,500</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-4">Includes:</h3>
                <ul className="space-y-3 text-sm text-zinc-700">
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <div>
                      <strong>Signature ATS CV</strong>
                      <p className="text-zinc-500">LKR 11,500 (professional)</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <div>
                      <strong>Cover Letter</strong>
                      <p className="text-zinc-500">LKR 7,000 (professional)</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <div>
                      <strong>LinkedIn Optimization</strong>
                      <p className="text-zinc-500">LKR 11,500 (professional)</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <div>
                      <strong>Foreign Job CV</strong>
                      <p className="text-zinc-500">LKR 14,500 (professional)</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <span>5-day premium delivery</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <span>30-day post-delivery support</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <span>Direct WhatsApp access</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <Link
                  href="/catalogue?bundle=career"
                  className="block w-full text-center px-6 py-3 bg-[#C9A961] text-white font-semibold rounded-[10px] hover:bg-[#B8985A] transition-colors"
                >
                  Choose Career Pack →
                </Link>
                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-3 border-2 border-[#C9A961] text-[#C9A961] font-semibold rounded-[10px] hover:bg-[#C9A961] hover:text-white transition-colors"
                >
                  Have Questions?
                </Link>
              </div>
            </div>

            {/* Executive Pack */}
            <div className="bundle-card bg-white rounded-[20px] border border-zinc-200 p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-plus-jakarta text-[32px] font-bold text-foreground">👑 Executive Pack</h2>
              </div>
              <p className="text-sm font-semibold text-[#C9A961] uppercase tracking-wider mb-4">For Senior Professionals</p>
              
              <div className="mb-8 pb-8 border-b border-zinc-200">
                <p className="text-sm text-zinc-600 mb-2">Total Value</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-[40px] font-bold text-foreground">LKR 45,000</span>
                  <span className="text-sm text-zinc-400 line-through">LKR 60,000</span>
                  <span className="text-sm font-bold text-[#10B981] bg-green-50 px-3 py-1 rounded-full">Save LKR 15,000</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-4">Includes:</h3>
                <ul className="space-y-3 text-sm text-zinc-700">
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <div>
                      <strong>Executive Signature CV</strong>
                      <p className="text-zinc-500">LKR 22,500 (executive)</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <div>
                      <strong>Foreign Job CV</strong>
                      <p className="text-zinc-500">LKR 27,500 (executive)</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <div>
                      <strong>LinkedIn Optimization</strong>
                      <p className="text-zinc-500">LKR 22,500 (executive)</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <div>
                      <strong>Cover Letter</strong>
                      <p className="text-zinc-500">LKR 12,500 (executive)</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <div>
                      <strong>1-Hour Strategy Consultation</strong>
                      <p className="text-zinc-500">LKR 27,500 value</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <span>60-day premium support</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C9A961] font-bold">✓</span>
                    <span>Direct WhatsApp access</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <Link
                  href="/catalogue?bundle=executive"
                  className="block w-full text-center px-6 py-3 bg-[#C9A961] text-white font-semibold rounded-[10px] hover:bg-[#B8985A] transition-colors"
                >
                  View Executive Pack →
                </Link>
                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-3 border-2 border-zinc-200 text-foreground font-semibold rounded-[10px] hover:border-[#C9A961] hover:text-[#C9A961] transition-colors"
                >
                  Have Questions?
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="w-full py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-zinc-50">
        <div className="max-w-[1512px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-plus-jakarta text-[36px] sm:text-[48px] font-bold text-foreground mb-4">
              Compare The Bundles
            </h2>
            <p className="text-text-body max-w-2xl mx-auto">
              Choose based on your career stage and budget. All packages include professional quality and satisfaction guarantee.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#0A2540] text-white">
                  <th className="p-4 text-left font-semibold">Feature</th>
                  <th className="p-4 text-center font-semibold">Starter</th>
                  <th className="p-4 text-center font-semibold bg-[#C9A961]">Career ⭐</th>
                  <th className="p-4 text-center font-semibold">Executive</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr className="bg-white hover:bg-zinc-50">
                  <td className="p-4 font-semibold text-foreground">Price</td>
                  <td className="p-4 text-center text-[#10B981] font-bold">LKR 9,500</td>
                  <td className="p-4 text-center text-[#10B981] font-bold bg-[#C9A961]/5">LKR 22,500</td>
                  <td className="p-4 text-center text-[#10B981] font-bold">LKR 45,000</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="p-4 font-semibold text-foreground">CV Services</td>
                  <td className="p-4 text-center">✓ 1 CV</td>
                  <td className="p-4 text-center bg-[#C9A961]/5">✓ 2 CVs</td>
                  <td className="p-4 text-center">✓ 2 CVs</td>
                </tr>
                <tr className="bg-white hover:bg-zinc-50">
                  <td className="p-4 font-semibold text-foreground">LinkedIn + Cover Letter</td>
                  <td className="p-4 text-center">✓</td>
                  <td className="p-4 text-center bg-[#C9A961]/5">✓</td>
                  <td className="p-4 text-center">✓</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="p-4 font-semibold text-foreground">Consultation</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center bg-[#C9A961]/5">—</td>
                  <td className="p-4 text-center">✓ 1 hour</td>
                </tr>
                <tr className="bg-white hover:bg-zinc-50">
                  <td className="p-4 font-semibold text-foreground">Delivery Time</td>
                  <td className="p-4 text-center">7 days</td>
                  <td className="p-4 text-center bg-[#C9A961]/5">5 days</td>
                  <td className="p-4 text-center">5 days</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="p-4 font-semibold text-foreground">Support Duration</td>
                  <td className="p-4 text-center">Email</td>
                  <td className="p-4 text-center bg-[#C9A961]/5">30 days + WhatsApp</td>
                  <td className="p-4 text-center">60 days + WhatsApp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-r from-[#0A2540] to-[#1a3a5c] text-white">
        <div className="max-w-[1512px] mx-auto text-center">
          <h2 className="font-plus-jakarta text-[36px] sm:text-[48px] font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Choose your bundle above or customize your own package from our full list of services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalogue"
              className="px-8 py-4 bg-[#C9A961] text-[#0A2540] font-semibold rounded-[10px] hover:bg-[#B8985A] transition-colors"
            >
              View All Services
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-[10px] hover:bg-white hover:text-[#0A2540] transition-colors"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
