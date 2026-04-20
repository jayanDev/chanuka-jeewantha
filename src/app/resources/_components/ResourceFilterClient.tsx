"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { DigitalResource, DigitalResourceType } from "@/lib/resources";

const formatLkr = (amount: number) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function ResourceFilterClient({ resources }: { resources: DigitalResource[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | DigitalResourceType>("All");

  const categories: ("All" | DigitalResourceType)[] = [
    "All",
    "Toolkit",
    "Template"
  ];

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        activeCategory === "All" || resource.resourceType === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [resources, searchQuery, activeCategory]);

  return (
    <div className="w-full">
      {/* Search and Filters */}
      <div className="mb-12 flex flex-col items-center gap-8">
        <div className="w-full max-w-2xl relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            placeholder="Search toolkits, CV templates, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full bg-white border-2 border-zinc-200 rounded-[12px] py-4 pl-12 pr-4 outline-none focus:border-brand-main focus:ring-4 focus:ring-brand-main/10 transition-all font-medium text-foreground placeholder:text-zinc-400"
          />
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === category
                  ? "bg-brand-dark text-white shadow-md"
 : "bg-white text-zinc-600 border border-zinc-200 hover:border-brand-main hover:text-brand-main"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredResources.map((resource) => (
 <article key={resource.slug} className="group rounded-[22px] border border-zinc-200 p-7 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
 <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-[14px] border border-zinc-200 bg-zinc-50">
                <Image 
                  src={resource.coverImage} 
                  alt={resource.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  sizes="(max-width: 768px) 100vw, 50vw" 
                />
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="inline-flex items-center gap-2 rounded-[10px] border border-brand-main/40 bg-brand-main/10 px-3 py-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-dark">
                    {resource.resourceType}
                  </span>
                </div>
                {resource.category === "free" && (
                  <div className="inline-flex items-center gap-2 rounded-[10px] border border-green-500/40 bg-green-500/10 px-3 py-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-green-700">Free Download</span>
                  </div>
                )}
              </div>

              <h2 className="text-[26px] font-bold font-plus-jakarta text-foreground mb-2 group-hover:text-brand-main transition-colors leading-[1.2]">
                {resource.title}
              </h2>
              <p className="text-zinc-500 font-semibold mb-4 leading-relaxed">{resource.subtitle}</p>
              
 <div className="flex-grow pt-4 border-t border-zinc-100">
                <ul className="space-y-3 mb-6">
                  {resource.highlights.slice(0, 3).map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-brand-main flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
 <span className="text-sm font-medium text-zinc-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <span className="text-sm font-semibold text-zinc-500 mb-1 block">Investment</span>
                  {resource.category === "free" ? (
                    <span className="text-2xl font-bold font-plus-jakarta text-green-600">Free</span>
                  ) : (
                    <div className="flex items-baseline gap-2">
                       <span className="text-2xl font-bold font-plus-jakarta text-foreground">
                         {resource.priceLkr ? formatLkr(resource.priceLkr) : ""}
                       </span>
                    </div>
                  )}
                </div>
                
                <Link 
                  href={`/resources/${resource.slug}`} 
                  className="rounded-xl bg-foreground px-6 py-3.5 font-bold text-background transition-colors hover:bg-brand-main flex items-center gap-2 group/btn"
                >
                  Get Access
                  <svg className="group-hover/btn:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
 <div className="text-center py-20 bg-zinc-50 rounded-[20px] border border-zinc-200">
          <h3 className="text-2xl font-bold font-plus-jakarta text-foreground mb-2">No resources found</h3>
          <p className="text-zinc-500">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
}
