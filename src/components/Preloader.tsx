"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";

export default function Preloader() {
  const { t } = useLang();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let rafId = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();
    const duration = 2400;

    const step = (now: number) => {
      const ratio = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 4);
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setProgress(100);
        timeoutId = setTimeout(() => setDone(true), 300);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-light dark:bg-bg-dark transition-all duration-500 ${
        done
          ? "opacity-0 translate-y-[-20px] pointer-events-none"
          : "opacity-100"
      }`}
      aria-hidden={done}
    >
      <h1 className="font-display text-4xl font-bold tracking-tight text-ink-light dark:text-ink-dark sm:text-5xl">
        {t.loadingTitle}
      </h1>
      <p className="eyebrow mt-4">{t.loadingLabel}</p>

      <div className="mt-8 w-[280px] sm:w-[300px]">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-border-light dark:bg-border-dark">
          <div
            className="h-full rounded-full bg-ink-light dark:bg-ink-dark transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-[0.65rem] uppercase tracking-widest text-muted-light dark:text-muted-dark">
          <span>{t.loadingStatus}</span>
          <span className="tabular-nums">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
