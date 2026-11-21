"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useLang } from "@/context/LangContext";
import type { Lang } from "@/data/portfolio";

const SECTION_IDS = ["home", "about", "experience", "projects", "contact"];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { id: "home", label: t.navHome },
    { id: "about", label: t.navAbout },
    { id: "experience", label: t.navExperience },
    { id: "projects", label: t.navProjects },
    { id: "contact", label: t.navContacts },
  ];

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const languages: Lang[] = ["id", "en"];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled
            ? "rounded-3xl border border-border-light/80 bg-bg-light/80 backdrop-blur-xl dark:border-border-dark/80 dark:bg-bg-dark/80"
            : "border border-transparent"
        }`}
        style={
          scrolled
            ? {
                maxWidth: "min(56rem, calc(100% - 1.5rem))",
                padding: "0.5rem 0.75rem",
                marginTop: "0.5rem",
              }
            : {}
        }
      >
        <button
          onClick={() => scrollTo("home")}
          className="font-heading text-base font-bold tracking-tight text-ink-light dark:text-ink-dark sm:text-lg"
        >
          {t.wordmark}
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className={`relative px-3 py-2 font-heading text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-ink-light dark:text-ink-dark"
                    : "text-muted-light hover:text-ink-light dark:text-muted-dark dark:hover:text-ink-dark"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-ink-light dark:bg-ink-dark"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-border-light p-[2px] font-heading text-sm font-semibold dark:border-border-dark">
            {languages.map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  lang === code
                    ? "bg-ink-light text-bg-light dark:bg-ink-dark dark:text-bg-dark"
                    : "text-muted-light dark:text-muted-dark"
                }`}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border-light text-ink-light transition-colors hover:bg-ink-light/5 dark:border-border-dark dark:text-ink-dark dark:hover:bg-ink-dark/5"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border-light text-ink-light md:hidden dark:border-border-dark dark:text-ink-dark"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-bg-light/95 backdrop-blur-xl dark:bg-bg-dark/95 md:hidden"
          >
            <div className="flex flex-col gap-0 p-6 pt-24">
              {navLinks.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => scrollTo(item.id)}
                  className="group flex items-center justify-between border-b border-border-light/60 py-4 text-left font-heading text-2xl font-semibold text-ink-light dark:border-border-dark/60 dark:text-ink-dark"
                >
                  {item.label}
                  <ChevronRight
                    size={20}
                    className="text-muted-light transition-transform group-hover:translate-x-1 dark:text-muted-dark"
                  />
                </motion.button>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-4 p-6">
              <div className="flex items-center rounded-full border border-border-light p-[2px] font-heading text-sm font-semibold dark:border-border-dark">
                {languages.map((code) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    className={`rounded-full px-3 py-1.5 ${
                      lang === code
                        ? "bg-ink-light text-bg-light dark:bg-ink-dark dark:text-bg-dark"
                        : "text-muted-light dark:text-muted-dark"
                    }`}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>

              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light dark:border-border-dark"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
