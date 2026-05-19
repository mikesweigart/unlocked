"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { Heart, Users, TrendingUp } from "lucide-react";

function StatCounter({
  target,
  suffix,
  label,
  icon: Icon,
}: {
  target: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
}) {
  const { ref, count } = useAnimatedCounter(target);
  return (
    <div className="text-center space-y-3">
      <div className="flex justify-center">
        <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-teal" />
        </div>
      </div>
      <div className="text-4xl font-extrabold text-navy">
        <span ref={ref}>{count}</span>
        {suffix}
      </div>
      <p className="text-sm text-navy/60 max-w-[140px] mx-auto leading-relaxed">{label}</p>
    </div>
  );
}

const testimonialSnippets = [
  {
    quote: "We finally feel like we have a roadmap instead of just guessing.",
    name: "Sarah M.",
    tag: "Parent of a child with ADHD",
  },
  {
    quote:
      "For the first time, my son sees himself as capable — not broken. That change is everything.",
    name: "Marcus T.",
    tag: "Father of a dyslexic learner",
  },
  {
    quote:
      "The way they explained executive functioning made me understand my daughter for the first time.",
    name: "Jennifer K.",
    tag: "Mother of a 3rd grader",
  },
];

export default function EmpathySection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <>
      {/* You Are Not Alone */}
      <section className="py-16 sm:py-24 bg-white" id="empathy">
        <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-10 sm:space-y-16"
          >
            {/* Opening empathy */}
            <motion.div
              variants={fadeUp}
              className="max-w-3xl mx-auto text-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 text-teal text-sm font-semibold">
                <Heart className="w-4 h-4" />
                You&apos;re not alone in this
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-tight">
                If You&apos;re Feeling Overwhelmed Right Now —{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue">
                  That&apos;s Completely Normal.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-navy/70 leading-relaxed">
                Thousands of parents have stood exactly where you are — unsure,
                worried, searching for answers. And the research is clear: with
                the right support, every learner can thrive.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 py-8 sm:py-12 border-y border-gray-blue"
            >
              <motion.div variants={fadeUp}>
                <StatCounter
                  target={20}
                  suffix="%"
                  label="of children have a learning difference"
                  icon={Users}
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <StatCounter
                  target={6}
                  suffix="M+"
                  label="children in the US have ADHD"
                  icon={TrendingUp}
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <StatCounter
                  target={500}
                  suffix="+"
                  label="families supported by UnlockEd"
                  icon={Heart}
                />
              </motion.div>
            </motion.div>

            {/* Testimonial snippets */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {testimonialSnippets.map((t) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  className="bg-gray-blue/50 rounded-2xl p-6 space-y-4 hover:bg-gray-blue transition-colors duration-200"
                >
                  <p className="text-navy/80 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-navy text-sm">{t.name}</p>
                    <p className="text-navy/50 text-xs">{t.tag}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <ProblemSection />
    </>
  );
}

function ProblemSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="py-16 sm:py-24 bg-navy" id="problem">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8 sm:space-y-12 text-center"
        >
          <motion.div variants={fadeUp} className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              The Real Problem Isn&apos;t Your Child.
            </h2>
            <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              It&apos;s that most approaches focus on{" "}
              <span className="text-coral font-semibold">what&apos;s wrong</span>{" "}
              instead of{" "}
              <span className="text-teal font-semibold">what&apos;s strong.</span>
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
          >
            {[
              {
                villain: "Outdated Approach",
                text: "Traditional systems weren't designed for every brain — they measure one type of intelligence and label everything else as a deficit.",
              },
              {
                villain: "Misinformation",
                text: "Diagnoses come with fear, stigma, and a flood of conflicting advice — leaving families confused about what to actually do.",
              },
              {
                villain: "Deficit Focus",
                text: "Most interventions spend 80% of effort on what your child can't do, while the remarkable things they can do go unnoticed and undertrained.",
              },
              {
                villain: "Isolation",
                text: "Without a guide, families navigate an overwhelming system alone — IEP meetings, school politics, and therapy options with no compass.",
              },
            ].map((item) => (
              <motion.div
                key={item.villain}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 hover:bg-white/8 transition-colors duration-200"
              >
                <div className="inline-flex items-center gap-2 text-coral text-sm font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                  {item.villain}
                </div>
                <p className="text-white/70 leading-relaxed text-sm">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="pt-4">
            <p className="text-lg text-white/80 font-medium italic">
              &ldquo;Traditional systems weren&apos;t designed for every brain. But your
              child&apos;s brain wasn&apos;t designed to be traditional.&rdquo;
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
