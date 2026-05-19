"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp, fadeLeft, fadeRight } from "@/lib/animations";
import { Search, Lightbulb, Map, Dumbbell, Star } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Understand",
    subtitle: "Make sense of the diagnosis",
    description:
      "We translate clinical language into plain English — so you finally understand what's actually happening in your child's brain, without the fear or confusion.",
    color: "text-blue",
    bgColor: "bg-blue/10",
    borderColor: "border-blue/30",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Discover",
    subtitle: "Identify unique brain strengths",
    description:
      "Using our Brain Strengths Assessment and guided conversation, we map what makes your child's mind remarkable — not just what makes it challenging.",
    color: "text-teal",
    bgColor: "bg-teal/10",
    borderColor: "border-teal/30",
  },
  {
    number: "03",
    icon: Map,
    title: "Strategize",
    subtitle: "Build a personalized action plan",
    description:
      "We create a customized roadmap that brings together school strategies, home support, and strengths-based goals tailored to your specific learner.",
    color: "text-gold",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/30",
  },
  {
    number: "04",
    icon: Dumbbell,
    title: "Train",
    subtitle: "Strengthen learning skills",
    description:
      "Through targeted practice and neuroscience-backed techniques, we actively strengthen the cognitive skills that make learning easier and more enjoyable.",
    color: "text-lavender",
    bgColor: "bg-lavender/10",
    borderColor: "border-lavender/30",
  },
  {
    number: "05",
    icon: Star,
    title: "Thrive",
    subtitle: "Build lasting confidence",
    description:
      "The goal isn't just academic improvement — it's a learner who understands themselves, advocates for their needs, and approaches challenges with genuine confidence.",
    color: "text-green",
    bgColor: "bg-green/10",
    borderColor: "border-green/30",
  },
];

function TimelineStep({
  step,
  index,
  isLeft,
}: {
  step: (typeof steps)[0];
  index: number;
  isLeft: boolean;
}) {
  const { ref, isInView } = useScrollReveal(0.3);
  const Icon = step.icon;

  return (
    <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-[1fr_60px_1fr] gap-0 md:gap-6 items-start">
      {/* Left content (or spacer) */}
      {isLeft ? (
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeLeft}
          className="md:text-right space-y-3 pb-8 md:pb-0"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${step.bgColor} ${step.color}`}>
            {step.subtitle}
          </div>
          <h3 className="text-2xl font-extrabold text-navy">{step.title}</h3>
          <p className="text-navy/65 leading-relaxed text-sm">{step.description}</p>
        </motion.div>
      ) : (
        <div className="hidden md:block" />
      )}

      {/* Center timeline */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`w-12 h-12 rounded-full border-2 ${step.borderColor} ${step.bgColor} flex items-center justify-center z-10 relative`}
        >
          <Icon className={`w-5 h-5 ${step.color}`} />
        </motion.div>
        {index < steps.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
            style={{ originY: 0 }}
            className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-gray-mid to-transparent min-h-[80px]"
          />
        )}
      </div>

      {/* Mobile timeline dot */}
      <div className="md:hidden flex items-center gap-4 mb-3">
        <div className={`w-10 h-10 rounded-full border-2 ${step.borderColor} ${step.bgColor} flex items-center justify-center shrink-0`}>
          <Icon className={`w-4 h-4 ${step.color}`} />
        </div>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${step.bgColor} ${step.color}`}>
          {step.subtitle}
        </div>
      </div>

      {/* Right content (or spacer) */}
      {!isLeft ? (
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeRight}
          className="space-y-3 pb-8 md:pb-0"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${step.bgColor} ${step.color} md:hidden`}>
            {step.subtitle}
          </div>
          <h3 className="text-2xl font-extrabold text-navy">{step.title}</h3>
          <p className="text-navy/65 leading-relaxed text-sm">{step.description}</p>
        </motion.div>
      ) : (
        <div className="hidden md:block" />
      )}
    </div>
  );
}

export default function HowItWorks() {
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();

  return (
    <section id="how-it-works" className="py-24 bg-off-white">
      <div className="max-w-4xl mx-auto px-6 space-y-16">
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
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-extrabold text-navy leading-tight"
            >
              A Simple Plan for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue">
                Extraordinary Outcomes
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-navy/65 max-w-2xl mx-auto">
              Five clear steps from where you are now to where your child deserves to be.
            </motion.p>
          </motion.div>
        </div>

        {/* Timeline steps */}
        <div className="space-y-8 md:space-y-0">
          {steps.map((step, index) => (
            <TimelineStep
              key={step.number}
              step={step}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center pt-8"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
          >
            Start Your Journey Today
          </a>
          <p className="mt-3 text-sm text-navy/45">
            Free consultation · No obligation · Confidential
          </p>
        </motion.div>
      </div>
    </section>
  );
}
