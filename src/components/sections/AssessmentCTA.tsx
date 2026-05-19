"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { ArrowRight, Brain, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AssessmentCTA() {
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <section id="assessment" className="py-14 sm:py-20 bg-gradient-to-r from-teal/10 via-blue/5 to-teal/10 border-y border-teal/15">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row items-center gap-10 justify-between"
        >
          {/* Left */}
          <motion.div variants={fadeUp} className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-teal font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              Free · 3 Minutes · Instant Results
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy leading-tight">
              Discover Your Child&apos;s{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue">
                Brain Strengths
              </span>
            </h2>
            <p className="text-navy/65 leading-relaxed max-w-md">
              Our 15-question Brain Strengths Assessment maps what makes your child&apos;s
              mind remarkable — not just what makes it challenging.
            </p>
          </motion.div>

          {/* Right */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3 items-center md:items-start shrink-0">
            <Link href="/assessment">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-base sm:text-lg hover:shadow-xl hover:shadow-teal/25 transition-all duration-200 cursor-pointer min-h-[52px]"
              >
                <Brain className="w-5 h-5" />
                Take the Free Assessment
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
            <p className="text-xs text-navy/40 text-center">
              No clinical labels · No email required to start
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
