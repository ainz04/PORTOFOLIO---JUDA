"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  Briefcase,
  CalendarDays,
  ExternalLink,
  FolderKanban,
} from "lucide-react";
import { useLang } from "@/context/LangContext";
import { SITE_CONFIG, type ShowcaseItem } from "@/data/portfolio";
import type { GitHubProjectPayload } from "@/app/api/github-projects/route";

type TabKey = "projects" | "awards" | "experience";

interface NumberedItem extends ShowcaseItem {
  num: string;
}

const headerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const headerItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const CARD_BASE =
  "group flex flex-col overflow-hidden rounded-xl border border-border-light bg-card-light transition-colors duration-300 hover:border-ink-light dark:border-border-dark dark:bg-card-dark dark:hover:border-ink-dark";

const LOCAL_FALLBACK_IMG = "/images/projects/project-1.svg";
const VIRTUAL_WIDTH = 1280;
const VIRTUAL_HEIGHT = 860;

function LiveMiniPreview({ url, title }: { url: string; title: string }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const updateWidth = () => {
      const w = el.clientWidth;
      setWidth((prev) => (prev === w ? prev : w));
    };

    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = width > 0 ? width / VIRTUAL_WIDTH : 0.3;

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-x-0 bottom-0 top-5 overflow-hidden bg-neutral-950 transition-transform duration-700 group-hover:scale-[1.03]"
    >
      {/* Subtle pulsing background visible only while the iframe paints */}
      <div className="absolute inset-0 animate-pulse bg-neutral-900/80" />

      {width > 0 && (
        <iframe
          src={url}
          title={`Live preview — ${title}`}
          loading="lazy"
          tabIndex={-1}
          referrerPolicy="no-referrer"
          className="pointer-events-none relative z-[1] origin-top-left border-0 bg-neutral-950"
          style={{
            width: `${VIRTUAL_WIDTH}px`,
            height: `${VIRTUAL_HEIGHT}px`,
            transform: `scale(${scale})`,
          }}
        />
      )}

      {/* Transparent click-through layer so clicking card opens github.io cleanly */}
      <div className="absolute inset-0 z-10" aria-hidden="true" />
    </div>
  );
}

function PreviewImage({
  src,
  fallbackSrc,
  alt,
}: {
  src: string;
  fallbackSrc?: string;
  alt: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else if (currentSrc !== LOCAL_FALLBACK_IMG) {
      setCurrentSrc(LOCAL_FALLBACK_IMG);
    } else {
      setLoaded(true);
    }
  };

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 top-5 animate-pulse bg-border-light/40 dark:bg-border-dark/40" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`absolute inset-0 h-full w-full object-cover object-center pt-5 transition-all duration-700 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

function CardInner({
  item,
  detailLabel,
}: {
  item: NumberedItem;
  detailLabel: string;
}) {
  const displayHost = item.url
    ? item.url.replace(/^https?:\/\//i, "").replace(/\/$/, "")
    : null;

  return (
    <>
      <div className="relative aspect-[1.45/1] overflow-hidden border-b border-border-light bg-bg-light dark:border-border-dark dark:bg-bg-dark">
        <div className="absolute inset-x-0 top-0 z-20 flex h-5 items-center gap-1 border-b border-border-light bg-card-light px-2 dark:border-border-dark dark:bg-card-dark">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e5a59c]" />
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e5d69c]" />
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#a7c99c]" />
          {item.livePreview && displayHost && (
            <span className="ml-2 truncate font-heading text-[0.55rem] font-medium tracking-wide text-muted-light/80 dark:text-muted-dark/80">
              {displayHost}
            </span>
          )}
          <span className="ml-auto shrink-0 font-heading text-[0.6rem] font-semibold tracking-widest text-muted-light dark:text-muted-dark">
            {item.num}
          </span>
        </div>

        {item.livePreview && item.url ? (
          <LiveMiniPreview url={item.url} title={item.title} />
        ) : (
          <PreviewImage
            src={item.img}
            fallbackSrc={item.fallbackImg}
            alt={item.title}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="eyebrow text-[0.65rem]">{item.eyebrow}</p>
        <h3 className="mt-2 font-heading text-lg font-bold text-ink-light dark:text-ink-dark">
          {item.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted-light dark:text-muted-dark">
          {item.desc}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-border-light pt-3 dark:border-border-dark">
          {item.tags && (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-border-light px-2.5 py-1 font-heading text-xs font-medium text-muted-light dark:border-border-dark dark:text-muted-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {item.date && (
            <span className="inline-flex items-center gap-1.5 font-heading text-xs font-medium text-muted-light dark:text-muted-dark">
              <CalendarDays size={13} />
              {item.date}
            </span>
          )}

          {item.url && (
            <span className="inline-flex shrink-0 items-center gap-1 font-heading text-xs font-semibold text-ink-light dark:text-ink-dark">
              {detailLabel}
              <ExternalLink
                size={13}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          )}
        </div>
      </div>
    </>
  );
}

function MobileCard({
  item,
  detailLabel,
}: {
  item: NumberedItem;
  detailLabel: string;
}) {
  const cls = `${CARD_BASE} h-full w-[280px] shrink-0 sm:w-[340px]`;
  const inner = <CardInner item={item} detailLabel={detailLabel} />;

  return item.url ? (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

function DesktopCard({
  item,
  index,
  detailLabel,
}: {
  item: NumberedItem;
  index: number;
  detailLabel: string;
}) {
  const motionProps = {
    initial: { opacity: 0, y: 28 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: (index % 3) * 0.1,
      },
    },
    whileHover: { y: -6, transition: { duration: 0.25 } },
    viewport: { once: true, amount: 0.15 },
  };

  const cls = `${CARD_BASE} h-full`;
  const inner = <CardInner item={item} detailLabel={detailLabel} />;

  return item.url ? (
    <motion.a
      {...motionProps}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
    >
      {inner}
    </motion.a>
  ) : (
    <motion.div {...motionProps} className={cls}>
      {inner}
    </motion.div>
  );
}

function MobileCarousel({
  items,
  detailLabel,
}: {
  items: NumberedItem[];
  detailLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const offsetRef = useRef(0);
  const dragRef = useRef<{ x: number; offset: number } | null>(null);
  const rafRef = useRef(0);
  const halfWidthRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      halfWidthRef.current = track.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);

    const tick = () => {
      if (!paused && !dragRef.current) {
        offsetRef.current += 0.35;
        if (
          halfWidthRef.current > 0 &&
          offsetRef.current >= halfWidthRef.current
        ) {
          offsetRef.current -= halfWidthRef.current;
        }
        track.style.transform = `translateX(${-offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", measure);
    };
  }, [paused, items]);

  const doubled = [...items, ...items];

  return (
    <div
      className="block overflow-hidden lg:hidden"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        if (!dragRef.current) setPaused(false);
      }}
    >
      <div
        ref={trackRef}
        onPointerDown={(e) => {
          setPaused(true);
          dragRef.current = { x: e.clientX, offset: offsetRef.current };
        }}
        onPointerMove={(e) => {
          if (!dragRef.current) return;
          const dx = e.clientX - dragRef.current.x;
          let next = dragRef.current.offset - dx;
          if (halfWidthRef.current > 0) {
            next =
              ((next % halfWidthRef.current) + halfWidthRef.current) %
              halfWidthRef.current;
          }
          offsetRef.current = next;
          if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${-next}px)`;
          }
        }}
        onPointerUp={() => {
          dragRef.current = null;
          setPaused(false);
        }}
        className="flex flex-nowrap gap-4 py-1"
        style={{
          touchAction: "pan-y",
          cursor: paused ? "grabbing" : "grab",
          willChange: "transform",
        }}
      >
        {doubled.map((item, idx) => (
          <MobileCard key={idx} item={item} detailLabel={detailLabel} />
        ))}
      </div>
    </div>
  );
}

const padNum = (idx: number) => String(idx + 1).padStart(2, "0");

export default function Projects() {
  const { lang, t } = useLang();
  const [activeTab, setActiveTab] = useState<TabKey>("projects");
  const [expanded, setExpanded] = useState(false);
  const [liveGithubProjects, setLiveGithubProjects] = useState<
    GitHubProjectPayload[] | null
  >(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github-projects")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { projects?: GitHubProjectPayload[] }) => {
        if (!cancelled && Array.isArray(data.projects) && data.projects.length > 0) {
          setLiveGithubProjects(data.projects);
        }
      })
      .catch(() => {
        // Keep static fallback from portfolio.ts
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const projectSource: ShowcaseItem[] = liveGithubProjects
    ? liveGithubProjects.map((p) => ({
        eyebrow: p.eyebrow,
        title: p.title,
        desc: lang === "id" ? p.descId : p.descEn,
        url: p.url,
        repoUrl: p.repoUrl,
        livePreview: p.livePreview,
        tags: p.tags,
        img: p.img,
        fallbackImg: p.fallbackImg,
      }))
    : [...t.projectItems];

  const grouped: Record<TabKey, NumberedItem[]> = {
    projects: projectSource.map((item, i) => ({ ...item, num: padNum(i) })),
    awards: t.awardItems.map((item, i) => ({ ...item, num: padNum(i) })),
    experience: t.activityItems.map((item, i) => ({ ...item, num: padNum(i) })),
  };

  const tabs: { key: TabKey; label: string; icon: typeof FolderKanban }[] = [
    { key: "projects", label: t.projectsTabProjects, icon: FolderKanban },
    { key: "awards", label: t.projectsTabAwards, icon: Award },
    { key: "experience", label: t.projectsTabExperience, icon: Briefcase },
  ];

  const subtitles: Record<TabKey, string> = {
    projects: t.projectsSubtitle,
    awards: t.awardsSubtitle,
    experience: t.experienceSubtitle,
  };

  const currentItems = grouped[activeTab];
  const hasMore = currentItems.length > 3;
  const visibleDesktop = expanded ? currentItems : currentItems.slice(0, 3);

  return (
    <section
      id="projects"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      <motion.div
        variants={headerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-9 flex items-end justify-between gap-4"
      >
        <div>
          <motion.p variants={headerItem} className="eyebrow">
            {t.projectsEyebrow}
          </motion.p>
          <motion.h2
            variants={headerItem}
            className="mt-2 font-heading text-4xl font-bold tracking-tight text-ink-light dark:text-ink-dark"
          >
            {t.projectsHeading}
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="mt-2 text-sm text-muted-light dark:text-muted-dark"
          >
            {subtitles[activeTab]}
          </motion.p>
        </div>

        {activeTab === "projects" && (
          <motion.a
            variants={headerItem}
            href={SITE_CONFIG.githubAllProjectsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg border border-border-light px-3 py-2 font-heading text-sm font-semibold text-ink-light transition-colors hover:bg-card-light sm:inline-flex dark:border-border-dark dark:text-ink-dark dark:hover:bg-card-dark"
          >
            {t.projectsAllLink}
            <ArrowUpRight size={14} />
          </motion.a>
        )}
      </motion.div>

      <div className="mb-8 flex justify-center sm:justify-start">
        <div
          role="tablist"
          className="inline-flex gap-1 rounded-lg border border-border-light bg-card-light p-1 dark:border-border-dark dark:bg-card-dark"
        >
          {tabs.map(({ key, label, icon: Icon }) => {
            const isSelected = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  if (key !== activeTab) {
                    setActiveTab(key);
                    setExpanded(false);
                  }
                }}
                className={`relative inline-flex items-center gap-2 rounded-md px-3 py-2 font-heading text-sm font-semibold transition-colors sm:px-4 ${
                  isSelected
                    ? "text-bg-light dark:text-bg-dark"
                    : "text-muted-light hover:text-ink-light dark:text-muted-dark dark:hover:text-ink-dark"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="projects-tab-pill"
                    className="absolute inset-0 rounded-md bg-ink-light dark:bg-ink-dark"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon size={15} className="relative z-10" />
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <MobileCarousel
        key={`carousel-${activeTab}`}
        items={currentItems}
        detailLabel={t.projectsDetail}
      />

      <div
        key={`grid-${activeTab}`}
        className="hidden gap-6 lg:grid lg:grid-cols-3"
      >
        {visibleDesktop.map((item, idx) => (
          <DesktopCard
            key={`${activeTab}-${item.num}`}
            item={item}
            index={idx}
            detailLabel={t.projectsDetail}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-7 hidden justify-center lg:flex">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-lg border border-border-light bg-card-light px-4 py-2.5 font-heading text-sm font-semibold text-ink-light transition-shadow duration-300 hover:shadow-md dark:border-border-dark dark:bg-card-dark dark:text-ink-dark"
          >
            {expanded ? t.projectsHide : t.projectsViewMore}
            <ArrowDown
              size={13}
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </motion.button>
        </div>
      )}
    </section>
  );
}
