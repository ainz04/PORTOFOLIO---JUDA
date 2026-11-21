"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { TECH_STACK } from "@/data/portfolio";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function TechStack() {
  const { t } = useLang();

  return (
    <section
      id="tech"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-12"
      >
        <motion.p variants={itemVariants} className="eyebrow">
          {t.techEyebrow}
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="mt-2 font-heading text-4xl font-bold tracking-tight text-ink-light dark:text-ink-dark"
        >
          {t.techHeading}
        </motion.h2>
      </motion.div>

      <div className="space-y-10">
        {TECH_STACK.map((category) => {
          const meta = t.techCategories[category.categoryKey];
          return (
            <motion.div
              key={category.categoryKey}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-4 lg:grid-cols-3 lg:gap-8"
            >
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <h3 className="font-heading text-xl font-bold text-ink-light dark:text-ink-dark">
                  {meta.name}
                </h3>
                <p className="mt-2 text-base text-muted-light dark:text-muted-dark">
                  {meta.desc}
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-5">
                {category.items.map((tech) => (
                  <motion.div
                    key={tech.name}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-border-light bg-card-light p-4 dark:border-border-dark dark:bg-card-dark"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="flex h-10 w-10 items-center justify-center transition-transform"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tech.logo}
                        alt={`${tech.name} logo`}
                        className={`h-8 w-8 object-contain ${
                          tech.invertInDark ? "dark:invert" : ""
                        }`}
                      />
                    </motion.div>
                    <span className="text-center font-heading text-sm font-medium text-ink-light dark:text-ink-dark">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
