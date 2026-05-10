import Link from "next/link";
import React from "react";
import FooterWhatsAppButton from "@/components/FooterWhatsAppButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary text-text-light pt-[96px] pb-[32px] overflow-hidden">
      <div className="max-w-[1512px] mx-auto px-4 sm:px-6">
        
        {/* Top Section: CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div className="max-w-2xl">
            <p className="text-brand-main font-semibold text-[20px] mb-2 uppercase tracking-wider">
              Let's work together
            </p>
            <h2 className="text-[48px] md:text-[64px] font-bold font-heading !text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
              Chanuka Jeewantha
            </h2>
          </div>
          <div>
            <FooterWhatsAppButton />
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-white/10 mb-16" />

        {/* Middle Section: Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: Brand / Logo */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link href="/" className="text-3xl font-bold font-heading text-white">
              Chanuka.
            </Link>
            <p className="text-text-light/80 text-[16px] leading-relaxed max-w-sm">
              Professional CV Writer and Career Development Specialist with 8+ years of experience in ATS-friendly CV writing, LinkedIn optimization, personal websites, and career coaching.
            </p>
          </div>

          {/* Col 2: Pages */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-[20px] font-semibold font-heading mb-2">Menu</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="hover:text-brand-main transition-colors text-text-light/80">About us</Link></li>
              <li><Link href="/services" className="hover:text-brand-main transition-colors text-text-light/80">Services</Link></li>
              <li><Link href="/reviews" className="hover:text-brand-main transition-colors text-text-light/80">Google Reviews</Link></li>
              <li><Link href="/portfolio" className="hover:text-brand-main transition-colors text-text-light/80">Portfolio</Link></li>
              <li><Link href="/businesses" className="hover:text-brand-main transition-colors text-text-light/80">Businesses</Link></li>
              <li><Link href="/ebooks" className="hover:text-brand-main transition-colors text-text-light/80">Ebooks</Link></li>
              <li><Link href="/fiverr-orders" className="hover:text-brand-main transition-colors text-text-light/80">Fiverr Orders (50% OFF)</Link></li>
              <li><Link href="/affiliate" className="hover:text-brand-main transition-colors text-text-light/80 text-brand-main font-semibold">Affiliate Network [HOT]</Link></li>
              <li><Link href="/blog" className="hover:text-brand-main transition-colors text-text-light/80">Blog</Link></li>
              <li><Link href="/testimonials" className="hover:text-brand-main transition-colors text-text-light/80">Testimonials</Link></li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-[20px] font-semibold font-heading mb-2">Support</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/contact" className="hover:text-brand-main transition-colors text-text-light/80">Contact us</Link></li>
              <li><Link href="/help" className="hover:text-brand-main transition-colors text-text-light/80">Help Center</Link></li>
              <li><Link href="/faq" className="hover:text-brand-main transition-colors text-text-light/80">FAQs</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-brand-main transition-colors text-text-light/80">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-brand-main transition-colors text-text-light/80">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="hover:text-brand-main transition-colors text-text-light/80">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-[20px] font-semibold font-heading mb-2">Contact Info</h3>
            <ul className="flex flex-col gap-4 text-text-light/80">
              <li className="flex items-start gap-3">
                <span className="text-brand-main mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </span>
                <span>Sri Lanka (Remote Worldwide)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-main mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </span>
                <span>+94 77 390 2230 (WhatsApp Orders)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-main mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </span>
                <span>Career Consultations by Appointment</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-white/10 mb-8" />

        {/* Bottom Section: Social & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white text-sm">
            &copy; {currentYear} Chanuka Jeewantha. Career Development Services.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="https://www.facebook.com/share/15vdmdB4oE/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-main transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://www.linkedin.com/in/chanuka-jeewantha/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-main transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://www.youtube.com/@chanukajeewantha" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-main transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="https://www.instagram.com/chanukajeewantha/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#E1306C] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
 <a href="https://www.tiktok.com/@chanukajeewantha" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
