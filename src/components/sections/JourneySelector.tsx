"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    scrollTo: "#empathy",
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
    scrollTo: "#challenges",
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
    scrollTo: "#how-it-works",
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
    scrollTo: "#strengths",
  },
];

export default function JourneySelector() {
  const { ref, isInView } = useScrollReveal(0.1);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (journey: (typeof journeys)[0]) => {
    setSelected(journey.id);
    setTimeout(() => {
      const el = document.querySelector(journey.scrollTo);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
  };

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
              Every family&apos;s starting point looks different. Tell us where you are
              — we&apos;ll show you exactly where to begin.
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
                  onClick={() => handleSelect(journey)}
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

          <motion.p variants={fadeUp} className="text-center text-xs text-navy/30">
            Not sure which fits? Keep reading — we cover every part of the journey.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
