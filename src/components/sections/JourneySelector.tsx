"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { Sparkles, Clock, RefreshCw, GraduationCap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const journeys = [
  {
    id: "new-diagnosis",
    icon: Sparkles,
    headline: "We just received a diagnosis",
    sub: "In the last 30 days",
    description:
      "You need clarity, not another checklist. Let's start with what this actually means — for your child and your whole family.",
    color: "text-teal",
    bg: "bg-teal/10",
    activeBorder: "border-teal",
  },
  {
    id: "suspected",
    icon: Clock,
    headline: "I've suspected something for years",
    sub: "No diagnosis yet — still searching",
    description:
      "Your instincts have been right all along. Let's find the language for what you've been seeing, and a real path to answers.",
    color: "text-blue",
    bg: "bg-blue/10",
    activeBorder: "border-blue",
  },
  {
    id: "not-working",
    icon: RefreshCw,
    headline: "We have support — but it isn't working",
    sub: "Need a different approach",
    description:
      "More of the same won't change the outcome. Let's find what's actually missing from the plan you already have.",
    color: "text-gold",
    bg: "bg-gold/10",
    activeBorder: "border-gold",
  },
  {
    id: "teen",
    icon: GraduationCap,
    headline: "My teenager is hitting a wall",
    sub: "High school · College prep · Identity",
    description:
      "The stakes feel higher now — and they are. Let's build a real strategy before the window for easiest change narrows.",
    color: "text-lavender",
    bg: "bg-lavender/10",
    activeBorder: "border-lavender",
  },
];

// Personalized context that appears when a card is selected
const contexts: Record<
  string,
  { headline: string; sub: string; cta: string; note: string }
> = {
  "new-diagnosis": {
    headline: "Your first step is clarity — not a treatment plan.",
    sub: "One conversation turns the diagnosis from a verdict into a roadmap. We'll explain what's actually happening in your child's brain — in plain language, no clinical jargon.",
    cta: "Schedule Your Clarity Session",
    note: "Free · No pressure · We explain everything plainly",
  },
  suspected: {
    headline: "Your instincts deserve a real answer.",
    sub: "Let's talk through exactly what you've been observing — and figure out together what it might mean. You've been carrying this alone long enough.",
    cta: "Talk Through What You're Seeing",
    note: "Free · Confidential · No diagnosis required to start",
  },
  "not-working": {
    headline: "A second perspective can change everything.",
    sub: "If the current support isn't moving the needle, something is missing — not wrong. Let's find what it is without starting over or blaming anyone.",
    cta: "Find What's Missing",
    note: "Free · We work alongside existing support teams",
  },
  teen: {
    headline: "The teenage brain is still remarkably changeable.",
    sub: "There's still time to rewrite the story — and build the real skills your teenager needs before the stakes of college and independence arrive.",
    cta: "Build a Teen Strategy",
    note: "Free · Age-appropriate · Self-advocacy focused",
  },
};

export default function JourneySelector() {
  const { ref, isInView } = useScrollReveal(0.1);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-gray-blue">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8 sm:space-y-10"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center space-y-3">
            <p className="text-xs font-bold text-navy/35 uppercase tracking-widest">
              Before we go further
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy leading-tight">
              Where Are You Right Now?
            </h2>
            <p className="text-navy/55 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Every family&apos;s starting point looks different. Tell us where you
              are — we&apos;ll show you exactly where to begin.
            </p>
          </motion.div>

          {/* Journey cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
          >
            {journeys.map((journey) => {
              const Icon = journey.icon;
              const isActive = selected === journey.id;
              return (
                <motion.button
                  key={journey.id}
                  variants={fadeUp}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setSelected((prev) =>
                      prev === journey.id ? null : journey.id
                    )
                  }
                  className={cn(
                    "group text-left p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 space-y-3",
                    isActive
                      ? `${journey.activeBorder} ${journey.bg} shadow-lg`
                      : "border-gray-blue bg-off-white hover:bg-white hover:border-gray-mid hover:shadow-md"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                        journey.bg
                      )}
                    >
                      <Icon className={cn("w-5 h-5", journey.color)} />
                    </div>
                    <motion.div
                      animate={{ x: isActive ? 0 : 6, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-2.5 shrink-0"
                    >
                      <ArrowRight className={cn("w-4 h-4", journey.color)} />
                    </motion.div>
                  </div>

                  <div>
                    <p className="font-extrabold text-navy text-sm sm:text-base leading-snug">
                      {journey.headline}
                    </p>
                    <p className={cn("text-xs font-semibold mt-1", journey.color)}>
                      {journey.sub}
                    </p>
                  </div>

                  <p className="text-navy/55 text-xs sm:text-sm leading-relaxed">
                    {journey.description}
                  </p>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Personalized CTA — animates in when a card is selected */}
          <AnimatePresence mode="wait">
            {selected && contexts[selected] ? (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="bg-navy rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-5"
              >
                <div className="space-y-2">
                  <h3 className="text-white font-extrabold text-lg sm:text-xl leading-tight">
                    {contexts[selected].headline}
                  </h3>
                  <p className="text-white/65 text-sm sm:text-base leading-relaxed">
                    {contexts[selected].sub}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-sm sm:text-base hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 min-h-[48px]"
                  >
                    {contexts[selected].cta}
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </a>
                  <p className="text-white/40 text-xs leading-relaxed">
                    {contexts[selected].note}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center text-xs text-navy/30"
              >
                Not sure which fits? Keep reading — we cover every part of the
                journey.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
