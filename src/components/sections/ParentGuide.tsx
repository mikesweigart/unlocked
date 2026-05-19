"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp, fadeLeft, float } from "@/lib/animations";
import { Download, Check, BookOpen, Brain, Shield, Calendar } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    text: "Understand your child's nervous system and how to calm it",
  },
  {
    icon: BookOpen,
    text: "Learn to spot strengths hiding behind challenging behaviors",
  },
  {
    icon: Shield,
    text: "Get scripts for hard conversations with kids AND schools",
  },
  {
    icon: Calendar,
    text: "Follow a 30-day plan you can start tonight",
  },
];

export default function ParentGuide() {
  const { ref, isInView } = useScrollReveal(0.1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="guide" className="py-16 sm:py-24 bg-gray-blue/40">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center"
        >
          {/* Left — Guide mockup */}
          <motion.div variants={fadeLeft} className="flex justify-center">
            <motion.div
              variants={float}
              initial="initial"
              animate="animate"
              className="relative"
            >
              {/* Guide book mockup */}
              <div className="relative w-64 h-80 rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-navy to-[#152038]">
                {/* Spine */}
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-teal/20 border-r border-teal/30" />
                {/* Content */}
                <div className="absolute inset-0 pl-8 pr-4 pt-6 pb-4 flex flex-col gap-3">
                  <div className="space-y-1">
                    <div className="text-[9px] font-bold text-teal uppercase tracking-widest">
                      Free Resource
                    </div>
                    <h3 className="text-white font-extrabold text-base leading-tight">
                      The Strengths-First Parent Guide
                    </h3>
                  </div>
                  <div className="text-white/50 text-[9px] leading-relaxed">
                    A Neuroscience-Backed Approach to Supporting Your Child&apos;s
                    Learning Differences
                  </div>
                  {/* Decorative elements */}
                  <div className="flex-1 flex flex-col gap-2 mt-2">
                    {[
                      "Nervous System Regulation",
                      "Strengths Identification",
                      "Daily Strategies",
                      "School Advocacy",
                      "30-Day Action Plan",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1"
                      >
                        <div className="w-1 h-1 rounded-full bg-teal shrink-0" />
                        <span className="text-[8px] text-white/60">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[8px] text-teal/70 font-medium mt-1">
                    UnlockEd.com
                  </div>
                </div>
                {/* Neural decorative */}
                <div className="absolute top-4 right-3 opacity-10">
                  <Brain className="w-12 h-12 text-teal" />
                </div>
              </div>

              {/* Shadow */}
              <div className="absolute -bottom-4 left-4 right-4 h-8 bg-navy/20 blur-xl rounded-full" />

              {/* Badge */}
              <div className="absolute -top-3 -right-3 bg-gold text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                FREE
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Copy + form */}
          <motion.div variants={fadeUp} className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 text-teal text-sm font-semibold">
                <Download className="w-4 h-4" />
                Free Parent Guide
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-tight">
                Your Roadmap From{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue">
                  Overwhelm to Confidence
                </span>
              </h2>
              <p className="text-navy/65 leading-relaxed">
                25 pages of neuroscience-backed strategies, practical daily frameworks, and
                strengths-based approaches — written for real parents in real moments.
              </p>
            </div>

            {/* Benefits */}
            <ul className="space-y-3">
              {benefits.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-teal" />
                  </div>
                  <span className="text-navy/75 text-sm leading-relaxed pt-1">{text}</span>
                </li>
              ))}
            </ul>

            {/* Form */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-teal/10 border border-teal/30 rounded-2xl p-6 space-y-3 text-center"
                >
                  <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-teal flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-navy text-lg">Your guide is on its way!</h3>
                  <p className="text-navy/65 text-sm">
                    Check your inbox in the next 2 minutes. While you wait — explore
                    the{" "}
                    <a href="#assessment" className="text-teal underline">
                      Brain Strengths Assessment
                    </a>
                    .
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="guide-name"
                        className="text-xs font-semibold text-navy/60 uppercase tracking-wider"
                      >
                        First Name
                      </label>
                      <input
                        id="guide-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-blue bg-white text-navy placeholder-navy/30 focus:border-teal focus:outline-none transition-colors duration-200 text-base"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="guide-email"
                        className="text-xs font-semibold text-navy/60 uppercase tracking-wider"
                      >
                        Email Address
                      </label>
                      <input
                        id="guide-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@email.com"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-blue bg-white text-navy placeholder-navy/30 focus:border-teal focus:outline-none transition-colors duration-200 text-base"
                      />
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-base hover:shadow-lg transition-all duration-200 disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Send Me the Free Guide
                      </>
                    )}
                  </motion.button>
                  <p className="text-xs text-navy/40 text-center">
                    Instant download. No spam. Unsubscribe anytime.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
