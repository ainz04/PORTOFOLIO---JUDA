"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { TRANSLATIONS, type Lang, type PortfolioCopy } from "@/data/portfolio";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: PortfolioCopy;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "id") {
        setLangState(saved);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang);
    try {
      localStorage.setItem("lang", nextLang);
    } catch {
      // ignore storage errors
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within LangProvider");
  }
  return ctx;
}
