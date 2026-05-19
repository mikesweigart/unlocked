"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { ChevronLeft, ChevronRight, Quote, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    arc: {
      before: "Homework took 3 hours every night and ended in screaming.",
      after: "45 minutes. He sets his own timer now.",
      when: "Month 3",
    },
    quote:
      "We went from dreading homework every night to watching our son actually enjoy learning. He finally sees what we always saw in him.",
    name: "Sarah M.",
    role: "Mother of a 4th grader with dyslexia",
    tag: "Dyslexia",
    tagColor: "text-teal",
    tagBg: "bg-teal/10",
  },
  {
    arc: {
      before: "She'd cry every Sunday night about school. We didn't know how to help.",
      after: "She uses her own strategies and advocates for herself in class.",
      when: "Month 6",
    },
    quote:
      "UnlockEd didn't just help our daughter with ADHD — they helped our whole family understand her. Now school is a conversation, not a battle.",
    name: "Marcus T.",
    role: "Father of a 7th grader with ADHD",
    tag: "ADHD",
    tagColor: "text-blue",
    tagBg: "bg-blue/10",
  },
  {
    arc: {
      before: "He called himself stupid almost every day.",
      after: "He described himself as a 'pattern thinker' last week — unprompted.",
      when: "Month 4",
    },
    quote:
      "The moment they used the phrase 'brain strengths' instead of 'deficits,' everything shifted. My son stood up straighter and actually smiled.",
    name: "Jennifer K.",
    role: "Parent of a learner with executive functioning challenges",
    tag: "Executive Functioning",
    tagColor: "text-gold",
    tagBg: "bg-gold/10",
  },
  {
    arc: {
      before: "I was spending hours on Google at midnight, more scared each time.",
      after: "One conversation gave me more clarity than months of searching alone.",
      when: "Session 1",
    },
    quote:
      "I was spending hours on Google at midnight, scared and confused. One conversation with UnlockEd gave me more clarity than months of searching on my own.",
    name: "Diane R.",
    role: "Mother of a newly diagnosed child",
    tag: "New Diagnosis",
    tagColor: "text-lavender",
    tagBg: "bg-lavender/10",
  },
  {
    arc: {
      before: "IEP meetings left us feeling steamrolled and invisible.",
      after: "We walked in with a script. We walked out with three new accommodations.",
      when: "Week 3",
    },
    quote:
      "The free assessment showed us things about our son that his teachers had never mentioned. We finally have a roadmap — and the confidence to use it.",
    name: "Tom & Lisa F.",
    role: "Parents of a 9-year-old with processing challenges",
    tag: "Processing",
    tagColor: "text-coral",
    tagBg: "bg-coral/10",
  },
];

export default function Testimonials() {
  const { ref, isInView } = useScrollReveal(0.1);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % testimonials.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, paused]);

  const t = testimonials[current];

  return (
    <section className="py-16 sm:py-24 bg-white" id="testimonials">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8 sm:space-y-12"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-tight">
              Real Families.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue">
                Real Transformation.
              </span>
            </h2>
            <p className="text-navy/55 text-base sm:text-lg leading-relaxed">
              These aren&apos;t testimonials about UnlockEd. They&apos;re stories about
              what becomes possible when a child finally gets the right guide.
            </p>
          </motion.div>

          {/* Carousel */}
          <motion.div
            variants={fadeUp}
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="bg-gray-blue/50 rounded-3xl p-6 sm:p-8 md:p-12 space-y-6">
              {/* Before / After arc */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`arc-${current}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3"
                >
                  {/* Before */}
                  <div className="bg-white/70 rounded-xl px-4 py-3 space-y-1 border border-coral/20">
                    <p className="text-xs font-bold text-coral uppercase tracking-wider">Before</p>
                    <p className="text-navy/70 text-xs sm:text-sm leading-relaxed">
                      {t.arc.before}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="hidden sm:flex items-center justify-center">
                    <div className="flex items-center gap-1.5">
                      <div className="h-px w-8 bg-gradient-to-r from-coral to-teal" />
                      <TrendingUp className="w-4 h-4 text-teal" />
                      <div className="h-px w-8 bg-teal" />
                    </div>
                  </div>
                  <div className="sm:hidden flex items-center gap-2 text-navy/30">
                    <div className="h-px flex-1 bg-gradient-to-r from-coral to-teal" />
                    <TrendingUp className="w-3.5 h-3.5 text-teal shrink-0" />
                  </div>

                  {/* After */}
                  <div className="bg-teal/10 rounded-xl px-4 py-3 space-y-1 border border-teal/25">
                    <p className="text-xs font-bold text-teal uppercase tracking-wider">
                      {t.arc.when}
                    </p>
                    <p className="text-navy/75 text-xs sm:text-sm leading-relaxed font-medium">
                      {t.arc.after}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Quote */}
              <div className="pt-2">
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-teal/25 mb-4" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`quote-${current}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45 }}
                    className="space-y-5"
                  >
                    <p className="text-base sm:text-xl md:text-2xl text-navy/85 leading-relaxed font-medium italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <div>
                        <p className="font-bold text-navy text-sm sm:text-base">{t.name}</p>
                        <p className="text-xs sm:text-sm text-navy/50">{t.role}</p>
                      </div>
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold",
                          t.tagColor,
                          t.tagBg
                        )}
                      >
                        {t.tag}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-5 px-1">
              {/* Dots */}
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      i === current
                        ? "w-6 h-2 bg-teal"
                        : "w-2 h-2 bg-gray-mid hover:bg-navy/30"
                    )}
                  />
                ))}
              </div>

              {/* Prev / Next */}
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-gray-mid text-navy/40 hover:text-navy hover:border-navy/30 transition-all duration-150"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-gray-mid text-navy/40 hover:text-navy hover:border-navy/30 transition-all duration-150"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
