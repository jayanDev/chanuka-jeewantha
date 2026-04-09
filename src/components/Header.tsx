"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type NavUser = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<NavUser | null>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const payload = await response.json();
        setUser(payload.user ?? null);
      } catch {
        setUser(null);
      }
    };

    void loadUser();
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    firstMobileLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    window.location.assign("/");
  };

  const desktopNavLinkClass = "text-[16px] font-medium text-foreground hover:text-brand-main transition-colors";
  const mobileNavLinkClass = "text-[18px] font-medium text-foreground hover:text-brand-main transition-colors";

  return (
    <header className="w-full max-w-[1512px] mx-auto px-4 sm:px-6 py-[32px] md:py-8 relative z-50">
      <div className="flex items-center justify-between relative bg-white z-50 py-2">
        {/* Logo Container */}
        <div className="flex-shrink-0 w-auto md:mr-8">
          <Link href="/" className="text-2xl font-bold font-plus-jakarta text-foreground">
            Chanuka.
          </Link>
        </div>

        {/* Navigation Container Desktop */}
        <nav className="hidden md:flex flex-1 items-center">
          <div className="flex flex-1 justify-center">
            <div className="flex items-center gap-6">
            <Link href="/" className={desktopNavLinkClass}>
              Home
            </Link>
            <Link href="/about" className={desktopNavLinkClass}>
              About
            </Link>
            <Link href="/services" className={desktopNavLinkClass}>
              Services
            </Link>
            <Link href="/businesses" className={desktopNavLinkClass}>
              Businesses
            </Link>
            <Link href="/ebooks" className={desktopNavLinkClass}>
              Ebooks
            </Link>
            <Link href="/pricing" className={desktopNavLinkClass}>
              Pricing
            </Link>
            <Link href="/contact" className={desktopNavLinkClass}>
              Contact
            </Link>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4">
            {user && (
              <Link href="/orders" className={desktopNavLinkClass}>
                My Orders
              </Link>
            )}
            {user?.role === "admin" && (
              <Link href="/admin" className={desktopNavLinkClass}>
                Admin
              </Link>
            )}

            {user && (
              <Link
                href="/cart"
                aria-label="Cart"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-zinc-300 text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2h3l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L22 7H6" />
                </svg>
              </Link>
            )}

            {!user ? (
              <div className="flex items-center gap-3">
                <Link href="/auth/signin" className="rounded-[10px] border border-zinc-300 px-4 py-2 text-[15px] font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="rounded-[10px] bg-brand-main px-4 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark">
                  Sign Up
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSignOut}
                className="text-[16px] font-medium text-foreground hover:text-brand-main transition-colors"
              >
                Sign Out
              </button>
            )}

            <Link
              href="/checkout"
              className="px-[25px] py-[15px] bg-brand-main hover:bg-brand-dark text-white rounded-[10px] text-[16px] font-medium transition-colors"
            >
              Place Order
            </Link>
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden">
          <button 
            className="rounded bg-brand-main p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        id="mobile-navigation"
        className={`absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out z-40 origin-top overflow-hidden md:hidden ${
          isMobileMenuOpen ? "opacity-100 scale-y-100 max-h-screen py-6 border-t border-zinc-100" : "opacity-0 scale-y-0 max-h-0 py-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-6 px-4">
          <Link ref={firstMobileLinkRef} href="/" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>
            Home
          </Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>
            About
          </Link>
          <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>
            Services
          </Link>
          <Link href="/businesses" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>
            Businesses
          </Link>
          <Link href="/ebooks" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>
            Ebooks
          </Link>
          <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>
            Pricing
          </Link>

          {user && (
            <Link
              href="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 rounded-[10px] border border-zinc-300 px-4 py-2 text-[16px] font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2h3l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L22 7H6" />
              </svg>
              Cart
            </Link>
          )}

          {user && (
            <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>
              My Orders
            </Link>
          )}
          {user?.role === "admin" && (
            <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>
              Admin
            </Link>
          )}
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>
            Contact
          </Link>
          {!user ? (
            <div className="flex w-full max-w-xs flex-col gap-3">
              <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)} className="rounded-[10px] border border-zinc-300 px-4 py-3 text-center text-[16px] font-semibold text-foreground transition-colors hover:border-brand-main hover:text-brand-main">
                Sign In
              </Link>
              <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)} className="rounded-[10px] bg-brand-main px-4 py-3 text-center text-[16px] font-semibold text-white transition-colors hover:bg-brand-dark">
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                void handleSignOut();
              }}
              className="text-[18px] font-medium text-foreground hover:text-brand-main transition-colors"
            >
              Sign Out
            </button>
          )}
          <div className="w-full flex justify-center mt-2">
            <Link 
              href="/checkout" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-[32px] py-[16px] bg-brand-main hover:bg-brand-dark w-full text-center max-w-xs text-white rounded-[10px] text-[18px] font-medium transition-colors"
            >
              Place Order
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}