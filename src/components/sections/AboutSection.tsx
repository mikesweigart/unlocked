"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp, fadeLeft } from "@/lib/animations";
import { Heart, Award, Users, BookOpen } from "lucide-react";

const credentials = [
  { icon: Award, text: "Neuroscience-informed training" },
  { icon: BookOpen, text: "Evidence-based frameworks" },
  { icon: Users, text: "500+ families supported" },
  { icon: Heart, text: "Compassion-first approach" },
];

export default function AboutSection() {
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <section id="about" className="py-24 bg-white">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left — copy */}
          <motion.div variants={fadeUp} className="space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 text-navy text-sm font-semibold">
                <Heart className="w-4 h-4 text-teal" />
                About UnlockEd
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight">
                We Started Here Because{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue">
                  We&apos;ve Been There.
                </span>
              </h2>
            </div>

            <p className="text-navy/70 leading-relaxed">
              UnlockEd was born from a simple observation: families navigating learning
              diagnoses deserve more than a checklist of deficits. They deserve a guide
              who helps them see the whole picture — the challenges AND the extraordinary
              strengths that come with them.
            </p>

            <p className="text-navy/70 leading-relaxed">
              We combine neuroscience, proven educational strategies, and genuine
              compassion to help learners discover what&apos;s strong — not just what&apos;s
              wrong. Our approach is rooted in research and driven by heart.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {credentials.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-teal" />
                  </div>
                  <span className="text-sm font-medium text-navy/75">{text}</span>
                </div>
              ))}
            </div>

            <blockquote className="border-l-4 border-teal pl-5 italic text-navy/65 leading-relaxed">
              &ldquo;The parent is the hero of this story. UnlockEd is simply the guide who
              shows up with empathy, expertise, and a clear plan.&rdquo;
            </blockquote>
          </motion.div>

          {/* Right — visual */}
          <motion.div variants={fadeLeft} className="relative">
            <div className="relative bg-gradient-to-br from-navy to-[#152038] rounded-3xl p-8 space-y-6 overflow-hidden">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-teal/8 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-blue/8 blur-xl" />

              <div className="relative space-y-6">
                <h3 className="text-white font-bold text-xl">Our Approach</h3>
                {[
                  {
                    step: "01",
                    title: "Empathy First",
                    desc: "We validate feelings before offering expertise.",
                    color: "text-teal",
                  },
                  {
                    step: "02",
                    title: "Clarity Over Complexity",
                    desc: "We make the confusing simple — every time.",
                    color: "text-blue",
                  },
                  {
                    step: "03",
                    title: "Strengths Over Deficits",
                    desc: "We lead with what's strong, not what's wrong.",
                    color: "text-gold",
                  },
                  {
                    step: "04",
                    title: "Action Over Information",
                    desc: "Every insight leads to a clear next step.",
                    color: "text-lavender",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className={`text-xs font-bold ${item.color} mt-0.5 shrink-0 w-6`}>
                      {item.step}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{item.title}</p>
                      <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
