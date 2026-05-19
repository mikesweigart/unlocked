"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const milestones = [
  {
    period: "Session 1",
    title: "The Clarity Session",
    description:
      "You finally understand what's actually happening in your child's brain — explained in plain language, not clinical labels. The diagnosis stops being a verdict and starts being a map.",
    emotional: "Most parents say: 'I finally stopped feeling like it was my fault.'",
    color: "text-teal",
    bg: "bg-teal/10",
    border: "border-teal/25",
    dot: "bg-teal",
    number: "01",
  },
  {
    period: "Week 2",
    title: "The Strengths Map",
    description:
      "Your child hears something true and specific about themselves — not what's broken, but what makes their mind remarkable. This moment matters more than most parents expect.",
    emotional: "Parents often say: 'He stood up straighter. First time I'd seen that in months.'",
    color: "text-blue",
    bg: "bg-blue/10",
    border: "border-blue/25",
    dot: "bg-blue",
    number: "02",
  },
  {
    period: "Week 3",
    title: "The School Strategy",
    description:
      "You walk into the next school meeting with a clear script, specific accommodation requests, and the language to advocate confidently — instead of hoping the system will figure it out.",
    emotional: "Parents report: 'I stopped dreading those meetings.'",
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/25",
    dot: "bg-gold",
    number: "03",
  },
  {
    period: "Week 4",
    title: "The First Shift",
    description:
      "One thing is measurably easier. Maybe homework. Maybe mornings. Maybe the meltdowns are shorter. Progress isn't linear — but something has clearly moved. You notice it.",
    emotional: "Most parents say: 'I slept well for the first time in months.'",
    color: "text-lavender",
    bg: "bg-lavender/10",
    border: "border-lavender/25",
    dot: "bg-lavender",
    number: "04",
  },
  {
    period: "Month 3",
    title: "The Turning Point",
    description:
      "Your child uses a strategy on their own — unprompted. They describe themselves using a strength, not a label. The old story about who they are as a learner is beginning to loosen its grip.",
    emotional: "Parents say: 'Hope stopped being something I just said. I actually felt it.'",
    color: "text-coral",
    bg: "bg-coral/10",
    border: "border-coral/25",
    dot: "bg-coral",
    number: "05",
  },
  {
    period: "Month 6",
    title: "The New Normal",
    description:
      "The challenges haven't disappeared — but your family has a language, a framework, and a confidence that wasn't there before. Your child knows what they're good at. So do you.",
    emotional: "Your child says: 'I'm actually pretty good at this.' And they mean it.",
    color: "text-green",
    bg: "bg-green/10",
    border: "border-green/25",
    dot: "bg-green",
    number: "06",
  },
];

function Milestone({
  m,
  index,
}: {
  m: (typeof milestones)[0];
  index: number;
}) {
  const { ref, isInView } = useScrollReveal(0.2);
  const isLast = index === milestones.length - 1;

  return (
    <div ref={ref} className="flex gap-4 sm:gap-6">
      {/* Left: step indicator + connector */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={cn(
            "w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center shrink-0 z-10",
            m.border,
            m.bg
          )}
        >
          <span className={cn("text-xs font-extrabold", m.color)}>{m.number}</span>
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="w-0.5 flex-1 mt-1 bg-gradient-to-b from-gray-mid to-transparent min-h-[56px]"
          />
        )}
      </div>

      {/* Right: content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="pb-8 sm:pb-10 space-y-2.5"
      >
        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
            m.bg,
            m.color
          )}
        >
          <Calendar className="w-3 h-3" />
          {m.period}
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-navy">{m.title}</h3>
        <p className="text-navy/65 leading-relaxed text-sm sm:text-base">
          {m.description}
        </p>
        <p className="text-navy/40 text-xs sm:text-sm italic leading-relaxed border-l-2 border-gray-mid pl-3">
          {m.emotional}
        </p>
      </motion.div>
    </div>
  );
}

export default function ThirtyDays() {
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();

  return (
    <section className="py-16 sm:py-24 bg-off-white">
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
                <Calendar className="w-4 h-4 text-teal" />
                No vague promises
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-tight"
            >
              What Working With Us{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue">
                Actually Looks Like
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-navy/60 leading-relaxed"
            >
              Real milestones, honest timelines, and the emotional truth at each
              step — because you deserve to know what you&apos;re walking into.
            </motion.p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div>
          {milestones.map((m, i) => (
            <Milestone key={m.period} m={m} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-base sm:text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98] min-h-[52px]"
          >
            Start Your First Session
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-xs sm:text-sm text-navy/40">
            Free consultation · No obligation · Confidential
          </p>
        </motion.div>
      </div>
    </section>
  );
}
