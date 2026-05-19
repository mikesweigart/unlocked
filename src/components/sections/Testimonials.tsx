"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "We went from dreading homework every night to watching our son actually enjoy learning. He finally sees what we always saw in him.",
    name: "Sarah M.",
    role: "Mother of a 4th grader with dyslexia",
    tag: "Dyslexia",
    tagColor: "text-teal",
    tagBg: "bg-teal/10",
  },
  {
    quote:
      "UnlockEd didn't just help our daughter with ADHD — they helped our whole family understand her. Now school is a conversation, not a battle.",
    name: "Marcus T.",
    role: "Father of a 7th grader with ADHD",
    tag: "ADHD",
    tagColor: "text-blue",
    tagBg: "bg-blue/10",
  },
  {
    quote:
      "The moment they used the phrase 'brain strengths' instead of 'deficits,' everything shifted. My son stood up straighter and actually smiled.",
    name: "Jennifer K.",
    role: "Parent of a learner with executive functioning challenges",
    tag: "Executive Functioning",
    tagColor: "text-gold",
    tagBg: "bg-gold/10",
  },
  {
    quote:
      "I was spending hours on Google at midnight, scared and confused. One conversation with UnlockEd gave me more clarity than months of searching.",
    name: "Diane R.",
    role: "Mother of a newly diagnosed child",
    tag: "New Diagnosis",
    tagColor: "text-lavender",
    tagBg: "bg-lavender/10",
  },
  {
    quote:
      "The free assessment showed us things about our son that his teachers had never mentioned. We finally have a roadmap.",
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
    const id = setInterval(next, 5000);
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
            <p className="text-navy/60 text-base sm:text-lg">
              These stories aren&apos;t about UnlockEd. They&apos;re about your child&apos;s potential.
            </p>
          </motion.div>

          {/* Carousel */}
          <motion.div
            variants={fadeUp}
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="bg-gray-blue/50 rounded-3xl p-6 sm:p-8 md:p-12 min-h-[280px] flex flex-col justify-between">
              <Quote className="w-10 h-10 text-teal/30 mb-6" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45 }}
                  className="space-y-6"
                >
                  <p className="text-base sm:text-xl md:text-2xl text-navy/85 leading-relaxed font-medium italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <p className="font-bold text-navy">{t.name}</p>
                      <p className="text-sm text-navy/55">{t.role}</p>
                    </div>
                    <span className={cn("px-3 py-1 rounded-full text-xs font-semibold", t.tagColor, t.tagBg)}>
                      {t.tag}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === current ? "w-8 bg-teal" : "w-2 bg-gray-mid"
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="p-2 rounded-xl text-navy/50 hover:text-navy hover:bg-gray-blue transition-colors duration-150"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="p-2 rounded-xl text-navy/50 hover:text-navy hover:bg-gray-blue transition-colors duration-150"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
