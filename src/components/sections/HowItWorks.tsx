"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { Search, Lightbulb, Map, Dumbbell, Star } from "lucide-react";

const steps = [
  {
    number: "01", icon: Search, title: "Understand", subtitle: "Make sense of the diagnosis",
    description: "We translate clinical language into plain English — so you finally understand what's actually happening in your child's brain, without the fear or confusion.",
    color: "text-blue", bgColor: "bg-blue/10", borderColor: "border-blue/30", dotColor: "bg-blue",
  },
  {
    number: "02", icon: Lightbulb, title: "Discover", subtitle: "Identify unique brain strengths",
    description: "Using our Brain Strengths Assessment and guided conversation, we map what makes your child's mind remarkable — not just what makes it challenging.",
    color: "text-teal", bgColor: "bg-teal/10", borderColor: "border-teal/30", dotColor: "bg-teal",
  },
  {
    number: "03", icon: Map, title: "Strategize", subtitle: "Build a personalized action plan",
    description: "We create a customized roadmap that brings together school strategies, home support, and strengths-based goals tailored to your specific learner.",
    color: "text-gold", bgColor: "bg-gold/10", borderColor: "border-gold/30", dotColor: "bg-gold",
  },
  {
    number: "04", icon: Dumbbell, title: "Train", subtitle: "Strengthen learning skills",
    description: "Through evidence-based cognitive training — including targeted working memory exercises shown to produce lasting gains — we actively build the specific skills your child's profile shows are lagging. The brain is changeable at any age.",
    color: "text-lavender", bgColor: "bg-lavender/10", borderColor: "border-lavender/30", dotColor: "bg-lavender",
  },
  {
    number: "05", icon: Star, title: "Thrive", subtitle: "Build lasting confidence",
    description: "The goal isn't just academic improvement — it's a learner who understands themselves, advocates for their needs, and approaches challenges with genuine confidence.",
    color: "text-green", bgColor: "bg-green/10", borderColor: "border-green/30", dotColor: "bg-green",
  },
];

function Step({ step, index }: { step: typeof steps[0]; index: number }) {
  const { ref, isInView } = useScrollReveal(0.2);
  const Icon = step.icon;
  const isLast = index === steps.length - 1;

  return (
    <div ref={ref} className="flex gap-4 sm:gap-6">
      {/* Left: icon + connector line */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 ${step.borderColor} ${step.bgColor} flex items-center justify-center shrink-0 z-10`}
        >
          <Icon className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${step.color}`} />
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="w-0.5 flex-1 mt-1 bg-gradient-to-b from-gray-mid to-transparent min-h-[48px]"
          />
        )}
      </div>

      {/* Right: content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        className={`pb-8 sm:pb-10 ${isLast ? "" : ""}`}
      >
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${step.bgColor} ${step.color}`}>
          {step.number} · {step.subtitle}
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-navy mb-2">{step.title}</h3>
        <p className="text-navy/65 leading-relaxed text-sm sm:text-base">{step.description}</p>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-off-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        {/* Header */}
        <div ref={headerRef}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="text-center space-y-4"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 text-navy text-sm font-semibold">
                <Map className="w-4 h-4 text-teal" />
                Your Path Forward
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-tight">
              A Simple Plan for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue">
                Extraordinary Outcomes
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-navy/65">
              Five clear steps from where you are now to where your child deserves to be.
            </motion.p>
          </motion.div>
        </div>

        {/* Steps — single column, left-aligned, works perfectly on all screen sizes */}
        <div>
          {steps.map((step, i) => <Step key={step.number} step={step} index={i} />)}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-base sm:text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98] min-h-[52px]"
          >
            Start Your Journey Today
          </a>
          <p className="mt-3 text-xs sm:text-sm text-navy/45">Free consultation · No obligation · Confidential</p>
        </motion.div>
      </div>
    </section>
  );
}
