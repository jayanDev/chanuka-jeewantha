"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import SearchModal from "@/components/SearchModal";

type NavUser = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
};

type PrimaryNavLink = {
  href: string;
  label: string;
};

type HeaderProps = {
  initialUser?: NavUser | null;
};

const primaryNavLinks: PrimaryNavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Resources" },
  { href: "/ebooks", label: "Ebooks" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ initialUser = null }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState<NavUser | null>(initialUser);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialUser) {
      return;
    }

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
  }, [initialUser]);

  useEffect(() => {
    if (!user) {
      return;
    }

    let isActive = true;
    const loadNotifications = async () => {
      try {
        const response = await fetch("/api/notifications", { cache: "no-store" });
        if (!response.ok) return;
        const payload = (await response.json()) as { unreadCount?: unknown };
        if (isActive && typeof payload.unreadCount === "number") {
          setUnreadNotificationCount(Math.max(0, payload.unreadCount));
        }
      } catch {
        // Ignore notification polling errors in header.
      }
    };

    void loadNotifications();

    const onFocus = () => {
      void loadNotifications();
    };

    window.addEventListener("focus", onFocus);
    return () => {
      isActive = false;
      window.removeEventListener("focus", onFocus);
    };
  }, [user]);

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

  useEffect(() => {
    if (!isProfileMenuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setIsProfileMenuOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isProfileMenuOpen]);

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    window.location.assign("/");
  };

  const profileInitials = user
    ? user.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("") || "U"
    : "U";

  const desktopNavLinkClass = "text-[16px] font-medium text-foreground hover:text-brand-main transition-colors";
  const mobileNavLinkClass = "text-[18px] font-medium text-foreground hover:text-brand-main transition-colors";
  const displayUnreadNotificationCount = user ? unreadNotificationCount : 0;

  return (
    <header suppressHydrationWarning className="w-full max-w-[1512px] mx-auto px-4 sm:px-6 py-[32px] md:py-8 relative z-50">
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
            {primaryNavLinks.map((link) => (
              <Link key={link.href} href={link.href} className={desktopNavLinkClass}>
                {link.label}
              </Link>
            ))}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-zinc-300 text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <ThemeToggle />
            {user && (
              <Link href="/orders" className={desktopNavLinkClass}>
                My Orders
              </Link>
            )}
            {user && (
              <Link
                href="/notifications"
                aria-label="Notifications"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-zinc-300 text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
                  <path d="M9 17a3 3 0 0 0 6 0" />
                </svg>
                {displayUnreadNotificationCount > 0 && (
                  <span className="absolute -right-2 -top-2 inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-brand-main px-1 py-0.5 text-[10px] font-semibold text-white">
                    {displayUnreadNotificationCount > 99 ? "99+" : displayUnreadNotificationCount}
                  </span>
                )}
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
              <div ref={profileMenuRef} className="relative">
                <button
                  type="button"
                  aria-label="Profile menu"
                  onClick={() => setIsProfileMenuOpen((previous) => !previous)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  {profileInitials}
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-[12px] border border-zinc-200 bg-white p-2 shadow-xl">
                    <div className="px-3 py-2 border-b border-zinc-200">
                      <p className="text-sm font-semibold text-foreground line-clamp-1">{user.name}</p>
                      <p className="text-xs text-zinc-500 line-clamp-1">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="block rounded-[8px] px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100"
                      >
                        Profile Settings
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="block rounded-[8px] px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100"
                      >
                        My Orders
                      </Link>
                      <Link
                        href="/notifications"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="block rounded-[8px] px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100"
                      >
                        Notifications
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to sign out?")) {
                          setIsProfileMenuOpen(false);
                          void handleSignOut();
                        }
                      }}
                      className="mt-1 w-full rounded-[8px] bg-red-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden">
          <button 
            className="rounded bg-brand-main p-2 text-white"
            onClick={() => {
              setIsMobileMenuOpen((previous) => {
                const next = !previous;
                if (next) {
                  setIsProfileMenuOpen(false);
                }
                return next;
              });
            }}
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
          {primaryNavLinks.map((link, index) => (
            <Link
              key={link.href}
              ref={index === 0 ? firstMobileLinkRef : undefined}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              {link.label}
            </Link>
          ))}

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
          {user && (
            <Link
              href="/notifications"
              aria-label="Notifications"
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-zinc-300 text-foreground transition-colors hover:border-brand-main hover:text-brand-main"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
                <path d="M9 17a3 3 0 0 0 6 0" />
              </svg>
              {displayUnreadNotificationCount > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-brand-main px-1 py-0.5 text-[10px] font-semibold text-white">
                  {displayUnreadNotificationCount > 99 ? "99+" : displayUnreadNotificationCount}
                </span>
              )}
            </Link>
          )}

          {user && (
            <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>
              Profile
            </Link>
          )}
          {user?.role === "admin" && (
            <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>
              Admin
            </Link>
          )}
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
                if (window.confirm("Are you sure you want to sign out?")) {
                  setIsMobileMenuOpen(false);
                  void handleSignOut();
                }
              }}
              className="text-[18px] font-medium text-foreground hover:text-brand-main transition-colors"
            >
              Sign Out
            </button>
          )}
        </nav>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
