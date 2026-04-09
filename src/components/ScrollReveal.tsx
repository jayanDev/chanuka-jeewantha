"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section")
    );

    if (!sections.length) return;

    sections.forEach((section, index) => {
      if (!section.dataset.animate) {
        section.dataset.animate = index % 3 === 0 ? "up" : index % 2 === 0 ? "left" : "right";
      }

      // Stagger section entrances so long pages feel less abrupt.
      const delay = (index % 4) * 90;
      section.style.setProperty("--reveal-delay", `${delay}ms`);

      const revealItems = Array.from(
        section.querySelectorAll<HTMLElement>(
          ":scope .grid > *, :scope .prose > *, :scope h1, :scope h2, :scope h3, :scope p, :scope blockquote, :scope a, :scope button"
        )
      ).slice(0, 22);

      revealItems.forEach((item, itemIndex) => {
        item.dataset.animItem = "true";
        item.style.setProperty("--item-delay", `${120 + itemIndex * 45}ms`);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return null;
}
