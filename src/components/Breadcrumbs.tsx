"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname() || "";
  
  // Don't show breadcrumbs on home page or admin routes
  if (pathname === "/" || pathname === "/admin" || pathname.startsWith("/admin/")) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);

  const formatSegment = (segment: string) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
 <nav className="w-full bg-zinc-50 border-b border-zinc-200 py-3 mt-[73px]" aria-label="Breadcrumb">
      <div className="max-w-[1512px] mx-auto px-4 sm:px-6 flex items-center text-sm overflow-x-auto whitespace-nowrap">
        <Link href="/" className="text-zinc-500 hover:text-brand-main transition-colors">
          Home
        </Link>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          // Special case for 'p' user profile shortlink
          if (segment === "p" && segments.length === 2) {
             return null;
          }

          return (
            <div key={href} className="flex items-center">
              <span className="mx-2 text-zinc-400">/</span>
              {isLast ? (
                <span className="font-semibold text-foreground tracking-tight" aria-current="page">
                  {formatSegment(segment)}
                </span>
              ) : (
                <Link href={href} className="text-zinc-500 hover:text-brand-main transition-colors">
                  {formatSegment(segment)}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
