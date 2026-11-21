"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CodeXml,
  Download,
  Github,
  Instagram,
  Mail,
  Send,
  Server,
  Sparkles,
} from "lucide-react";
import { useLang } from "@/context/LangContext";
import { HERO_TRACKS, SITE_CONFIG } from "@/data/portfolio";
import MusicPlayerOverlay from "@/components/MusicPlayerOverlay";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function useTypewriter(
  words: string[],
  typeSpeed = 70,
  deleteSpeed = 38,
  pauseMs = 1500
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const current = words[wordIndex % words.length];

    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      const nextText = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      timer = setTimeout(() => setText(nextText), deleting ? deleteSpeed : typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pauseMs]);

  return text;
}

export default function Hero() {
  const { t } = useLang();
  const typedRole = useTypewriter(SITE_CONFIG.typingRoles);

  const words = t.heroH1.split(" ");
  const lastWord = words.pop();
  const firstPart = words.join(" ");

  const floatingBadges = [
    { icon: CodeXml, label: t.badge1 },
    { icon: Server, label: t.badge2 },
    { icon: Sparkles, label: t.badge3 },
  ];

  const socials = [
    { icon: Instagram, href: SITE_CONFIG.socialLinks.instagram, label: "Instagram" },
    { icon: Github, href: SITE_CONFIG.socialLinks.github, label: "GitHub" },
    { icon: Send, href: SITE_CONFIG.socialLinks.telegram, label: "Telegram" },
    { icon: Mail, href: SITE_CONFIG.socialLinks.email, label: "Email" },
  ];

  return (
    <section
      id="home"
      className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-20 lg:pt-36"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="order-2 lg:order-1"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-border-light bg-card-light px-3 py-1.5 font-heading text-sm font-medium text-muted-light dark:border-border-dark dark:bg-card-dark dark:text-muted-dark"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            {t.availableBadge}
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-5 max-w-xl font-heading text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.45rem]"
          >
            <span className="text-ink-light dark:text-ink-dark">
              {firstPart}{" "}
            </span>
            <span className="text-ink-light/50 dark:text-ink-dark/50">
              {lastWord}
            </span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mt-3 flex min-h-10 items-center font-heading text-2xl font-semibold tracking-tight text-ink-light dark:text-ink-dark sm:text-3xl lg:text-[2rem]"
          >
            <span>{typedRole}</span>
            <span className="ml-1 animate-blink font-light text-ink-light dark:text-ink-dark">
              |
            </span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-lg text-base leading-8 text-muted-light dark:text-muted-dark"
          >
            {t.bio}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 rounded-lg bg-ink-light px-5 py-3 font-heading text-sm font-semibold text-bg-light transition-shadow duration-300 hover:shadow-md dark:bg-ink-dark dark:text-bg-dark"
            >
              {t.ctaExplore}
              <ArrowRight size={16} />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={SITE_CONFIG.cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border-light px-5 py-3 font-heading text-sm font-semibold text-ink-light transition-colors duration-300 hover:bg-ink-light/5 dark:border-border-dark dark:text-ink-dark dark:hover:bg-ink-dark/5"
            >
              {t.ctaDownload}
              <Download size={16} />
            </motion.a>
          </motion.div>

          <motion.hr
            variants={itemVariants}
            className="mt-7 border-t border-border-light dark:border-border-dark"
          />

          <motion.div variants={itemVariants} className="mt-5">
            <p className="eyebrow mb-3">{t.connect}</p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  whileHover={{ y: -3 }}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-light text-ink-light transition-colors hover:bg-ink-light hover:text-bg-light dark:border-border-dark dark:text-ink-dark dark:hover:bg-ink-dark dark:hover:text-bg-dark"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 flex justify-center lg:order-2 lg:justify-end lg:pr-6"
        >
          <div className="relative h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] lg:h-[380px] lg:w-[380px]">
            <div className="absolute -inset-6 rounded-full bg-ink-light/5 blur-3xl dark:bg-ink-dark/10" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-ink-light/10 to-transparent dark:from-ink-dark/10" />
            <div className="absolute inset-0 rounded-full border-2 border-border-light dark:border-border-dark" />
            <div className="absolute inset-[6px] overflow-hidden rounded-full border-4 border-bg-light shadow-xl dark:border-bg-dark">
              <Image
                src={SITE_CONFIG.heroAvatar}
                alt={t.aboutName}
                fill
                priority
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 380px"
                className="object-cover"
              />
              <MusicPlayerOverlay tracks={HERO_TRACKS} />
            </div>

            <div className="absolute left-0 top-1/2 hidden w-max -translate-x-[38%] -translate-y-1/2 flex-col gap-3 lg:flex">
              {floatingBadges.map(({ icon: Icon, label }, idx) => {
                const [title, subtitle] = label.split("—").map((s) => s.trim());
                return (
                  <motion.div
                    key={idx}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3 + 0.4 * idx,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3 * idx,
                    }}
                    className="flex items-center gap-3 rounded-2xl border border-border-light/70 bg-card-light/95 px-3.5 py-2.5 shadow-lg backdrop-blur-md dark:border-border-dark/70 dark:bg-card-dark/95"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink-light text-bg-light dark:bg-ink-dark dark:text-bg-dark">
                      <Icon size={15} />
                    </span>
                    <span className="whitespace-nowrap font-heading text-xs font-medium leading-tight text-ink-light dark:text-ink-dark">
                      {title}
                      {subtitle && (
                        <span className="block text-[11px] font-normal text-muted-light dark:text-muted-dark">
                          {subtitle}
                        </span>
                      )}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="no-scrollbar mt-8 flex gap-3 overflow-x-auto lg:hidden">
        {floatingBadges.map(({ icon: Icon, label }, idx) => (
          <div
            key={idx}
            className="flex shrink-0 items-center gap-2 rounded-2xl border border-border-light/60 bg-card-light/80 px-3 py-2 shadow-sm backdrop-blur-md dark:border-border-dark/60 dark:bg-card-dark/80"
          >
            <Icon size={16} className="text-ink-light dark:text-ink-dark" />
            <span className="font-heading text-xs font-medium text-ink-light dark:text-ink-dark">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
