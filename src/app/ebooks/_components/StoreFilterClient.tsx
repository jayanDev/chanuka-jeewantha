"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { DigitalProduct, DigitalProductType } from "@/lib/digital-products";

const formatLkr = (amount: number) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function StoreFilterClient({ products }: { products: DigitalProduct[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | DigitalProductType>("All");

  const categories: ("All" | DigitalProductType)[] = [
    "All",
    "Ebook",
    "Planner",
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        activeCategory === "All" || product.productType === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  return (
    <div className="w-full">
      {/* Search and Filters */}
      <div className="mb-12 flex flex-col items-center gap-8">
        <div className="w-full max-w-2xl relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            placeholder="Search ebooks and planners..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-zinc-200 rounded-[12px] py-4 pl-12 pr-4 outline-none focus:border-brand-main focus:ring-4 focus:ring-brand-main/10 transition-all font-medium text-foreground placeholder:text-zinc-400"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-foreground text-background shadow-md scale-105"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {cat === "All" ? "All Products" : cat + "s"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <article 
              key={product.slug} 
              className="rounded-[22px] border border-zinc-200 p-6 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div 
                className={`relative mb-6 w-full flex-shrink-0 overflow-hidden rounded-[14px] border border-zinc-200 bg-zinc-50 ${
                  product.productType === "Ebook" ? "aspect-[4/5]" : "aspect-video"
                }`}
              >
                <Image 
                  src={product.coverImage} 
                  alt={product.title} 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-500" 
                  sizes="(max-width: 768px) 100vw, 33vw" 
                />
                
                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${
                    product.category === "paid" ? "bg-brand-main text-white" : "bg-green-500 text-white"
                  }`}>
                    {product.category === "paid" ? "Premium" : "Free"}
                  </span>
                  <span className="bg-white/90 backdrop-blur-sm text-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    {product.productType}
                  </span>
                </div>
              </div>
              
              <div className="flex-grow flex flex-col">
                <h3 className="text-[24px] font-bold font-plus-jakarta text-foreground mb-2 line-clamp-2 leading-tight">
                  {product.title}
                </h3>
                <p className="text-zinc-500 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>
                
                {/* Price and Action (Pushed to bottom) */}
                <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[20px] font-bold font-plus-jakarta text-brand-dark">
                    {product.category === "paid" ? formatLkr(product.priceLkr ?? 0) : "Free"}
                  </span>
                  
                  <Link 
                    href={product.productType === "Ebook" ? `/ebooks/${product.slug}` : '#'} 
                    className={`rounded-[8px] px-5 py-2 font-semibold text-sm transition-colors ${
                      product.category === "paid" 
                        ? "bg-brand-main text-background hover:bg-brand-dark" 
                        : "bg-foreground text-background hover:bg-brand-dark"
                    }`}
                  >
                    {product.productType === "Ebook" ? "View Ebook" : "Get Template"}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-zinc-50 rounded-[20px] border border-zinc-200 border-dashed">
          <svg className="mx-auto mb-4 text-zinc-300" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <h3 className="text-2xl font-bold font-plus-jakarta text-zinc-400 mb-2">No products found</h3>
          <p className="text-zinc-500">Try adjusting your search or filter criteria.</p>
          <button 
            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
            className="mt-6 text-brand-main font-semibold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
