"use client";

import { useLang } from "@/context/LangContext";

export default function Marquee() {
  const { t } = useLang();
  const repeated = [
    ...t.marqueeItems,
    ...t.marqueeItems,
    ...t.marqueeItems,
    ...t.marqueeItems,
  ];

  return (
    <div className="relative z-10 mt-8 border-y border-border-light py-4 dark:border-border-dark sm:mt-12">
      <div className="overflow-hidden">
        <div className="marquee-track animate-marquee">
          {repeated.map((label, idx) => (
            <span
              key={idx}
              className="mx-4 inline-flex items-center text-sm font-semibold uppercase tracking-widest text-muted-light dark:text-muted-dark sm:text-base"
            >
              {label}
              <span className="ml-8 text-ink-light/40 dark:text-ink-dark/40">
                •
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
