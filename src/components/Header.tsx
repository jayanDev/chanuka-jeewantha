import Link from "next/link";
import React from "next";

export default function Header() {
  return (
    <header className="w-full max-w-[1512px] mx-auto px-4 sm:px-6 py-[32px] md:py-8">
      <div className="flex items-center justify-between">
        {/* Logo Container */}
        <div className="flex-shrink-0 w-auto md:w-[6%] md:mr-[70px]">
          <Link href="/" className="text-2xl font-bold font-plus-jakarta text-foreground">
            Benjamin.
          </Link>
        </div>

        {/* Navigation Container Desktop */}
        <nav className="hidden md:flex flex-row justify-end items-center gap-6 w-full md:w-[91%]">
          <Link href="/" className="text-[16px] font-medium text-text-light hover:text-brand-main transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-[16px] font-medium text-text-light hover:text-brand-main transition-colors">
            About
          </Link>
          <Link href="/services" className="text-[16px] font-medium text-text-light hover:text-brand-main transition-colors">
            Services
          </Link>
          <Link href="/portfolio" className="text-[16px] font-medium text-text-light hover:text-brand-main transition-colors">
            Portfolio
          </Link>
          <Link href="/contact" className="text-[16px] font-medium text-text-light hover:text-brand-main transition-colors">
            Contact
          </Link>
          <div className="ml-4">
            <Link 
              href="/contact" 
              className="px-[25px] py-[15px] bg-brand-main hover:bg-brand-dark text-white rounded-[10px] text-[16px] font-medium transition-colors"
            >
              Let's Talk
            </Link>
          </div>
        </nav>

        {/* Mobile menu toggle placeholder */}
        <div className="flex md:hidden">
          <button className="rounded bg-brand-main p-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}