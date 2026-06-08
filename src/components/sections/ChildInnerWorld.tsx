"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { Eye, Heart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const pairs = [
  {
    label: "Homework battles",
    parent: "Won't start. Has to be asked five times. Shuts down the moment they sit down.",
    child:
      "I already know I'm going to fail. Starting just makes it feel real sooner. If I don't try, at least I chose not to.",
    insight:
      "What looks like defiance is almost always pre-emptive self-protection. They'd rather be seen as 'not trying' than 'can't do it.' The avoidance is armor.",
  },
  {
    label: "Meltdowns",
    parent: "Falls apart over something small — a sock seam, a plan that changed, the wrong color cup.",
    child:
      "My nervous system has been completely overloaded since 7 AM. I used everything I had just to hold it together at school. I have nothing left.",
    insight:
      "The meltdown at home is the release valve for every moment they white-knuckled their way through during the day. Home is the only place they feel safe enough to fall apart.",
  },
  {
    label: "Seems lazy",
    parent: "Won't try. Gives up immediately. Seems unmotivated by everything.",
    child:
      "I'm exhausted in a way I can't explain. I work twice as hard as everyone around me just to keep up — and no one can see it.",
    insight:
      "Hidden effort is one of the most misread signals in learning differences. The tank is empty long before the school day ends. What reads as laziness is often profound, invisible fatigue.",
  },
  {
    label: "Argues everything",
    parent: "Questions every instruction. Pushes back on every rule. Argues about things that don't matter.",
    child:
      "I'm trying to understand a world that constantly feels inconsistent and unfair to me. I'm not trying to be difficult — I genuinely need to understand why.",
    insight:
      "Relentless questioning is often deep curiosity and pattern-seeking in overdrive. This is a strength that needs a channel, not a behavior that needs to be eliminated.",
  },
  {
    label: "Hates school",
    parent: "Says 'I hate school' every single morning. Cries on Sunday nights.",
    child:
      "I feel invisible when I get things wrong. And I get things wrong in front of everyone, every day. The story I'm telling myself about my own intelligence is solidifying.",
    insight:
      "By the time a child says this clearly and consistently, a narrative about who they are as a learner has already begun to form. This is the window to rewrite it — before it calcifies.",
  },
];

export default function ChildInnerWorld() {
  const { ref, isInView } = useScrollReveal(0.1);
  const [active, setActive] = useState(0);

  return (
    <section className="py-16 sm:py-24 bg-[#0e1c38] overflow-hidden border-t border-white/8">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-10 sm:space-y-14"
        >
          {/* Header */}
          <motion.div
            variants={fadeUp}
            className="text-center space-y-4 max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-xs sm:text-sm font-semibold">
              <Heart className="w-3.5 h-3.5 text-coral shrink-0" />
              What your child can&apos;t say out loud
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              What Your Child Is Feeling{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-gold">
                But Can&apos;t Say
              </span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              The gap between what you observe and what they actually experience is
              where most families stay stuck. Closing it changes everything about how
              you respond — and how they grow.
            </p>
          </motion.div>

          {/* Behavior tabs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-2 justify-center"
          >
            {pairs.map((pair, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200",
                  active === i
                    ? "bg-coral text-white shadow-lg shadow-coral/25"
                    : "bg-white/10 text-white/55 hover:bg-white/20 hover:text-white/90"
                )}
              >
                {pair.label}
              </button>
            ))}
          </motion.div>

          {/* Split panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {/* Parent view */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-white/35 text-xs font-bold uppercase tracking-widest">
                    <Eye className="w-3.5 h-3.5" />
                    What you see
                  </div>
                  <p className="text-white/75 text-base sm:text-xl font-medium leading-relaxed">
                    &ldquo;{pairs[active].parent}&rdquo;
                  </p>
                  <p className="text-white/30 text-xs leading-relaxed italic border-t border-white/10 pt-3">
                    The behavior visible on the surface
                  </p>
                </div>

                {/* Child view */}
                <div className="bg-gradient-to-br from-coral/20 via-coral/10 to-gold/10 border border-coral/30 rounded-2xl p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-coral text-xs font-bold uppercase tracking-widest">
                    <Heart className="w-3.5 h-3.5" />
                    What they feel
                  </div>
                  <p className="text-white text-base sm:text-xl font-semibold leading-relaxed italic">
                    &ldquo;{pairs[active].child}&rdquo;
                  </p>
                  <p className="text-white/30 text-xs leading-relaxed border-t border-white/10 pt-3">
                    Their internal experience — rarely spoken
                  </p>
                </div>
              </div>

              {/* Insight strip */}
              <div className="bg-white/5 border border-white/10 rounded-xl px-5 sm:px-6 py-4">
                <p className="text-white/60 text-sm leading-relaxed">
                  <span className="text-teal font-semibold">Clinical insight: </span>
                  {pairs[active].insight}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bridge to solution */}
          <motion.div variants={fadeUp} className="text-center space-y-5">
            <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              When you understand what&apos;s driving the behavior, you stop managing
              the symptom and start addressing what&apos;s underneath it. That&apos;s where
              real, lasting change begins.
            </p>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-teal font-semibold text-sm hover:text-teal-light transition-colors duration-200"
            >
              See how UnlockEd bridges this gap
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
