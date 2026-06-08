"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp, fadeLeft } from "@/lib/animations";
import { Heart, Award, Users, BookOpen, Brain, GraduationCap, ArrowRight } from "lucide-react";

const credentials = [
  { icon: Award, text: "Certified Educational Therapist" },
  { icon: Brain, text: "Cogmed Certified Practitioner" },
  { icon: GraduationCap, text: "M.Ed. Special Education" },
  { icon: Users, text: "500+ Families Supported" },
  { icon: BookOpen, text: "Evidence-Based Frameworks" },
  { icon: Heart, text: "Compassion-First Approach" },
];

export default function AboutSection() {
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <section id="about" className="py-16 sm:py-24 bg-white">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center"
        >
          {/* Left — copy */}
          <motion.div variants={fadeUp} className="space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 text-navy text-sm font-semibold">
                <Heart className="w-4 h-4 text-teal" />
                About UnlockEd
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-tight">
                We Started Here Because{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue">
                  We&apos;ve Been There.
                </span>
              </h2>
            </div>

            <p className="text-navy/70 leading-relaxed">
              UnlockEd was built on one conviction: families navigating learning differences
              deserve more than a list of deficits and a stack of pamphlets. They deserve a
              guide who helps them see the whole picture — the challenges <em>and</em> the
              extraordinary strengths that come with them.
            </p>

            <p className="text-navy/70 leading-relaxed">
              We combine neuroscience, evidence-based educational strategies, and Cogmed
              working memory training to help learners build real, lasting skills — not
              just compensate for what&apos;s hard.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {credentials.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-teal" />
                  </div>
                  <span className="text-xs font-medium text-navy/70 leading-snug">{text}</span>
                </div>
              ))}
            </div>

            <blockquote className="border-l-4 border-teal pl-5 italic text-navy/65 leading-relaxed">
              &ldquo;The parent is the hero of this story. UnlockEd is simply the guide
              who shows up with empathy, expertise, and a clear plan.&rdquo;
            </blockquote>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 min-h-[44px]"
            >
              Schedule a Free Consultation
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </motion.div>

          {/* Right — Guide profile */}
          <motion.div variants={fadeLeft} className="relative">
            <div className="relative bg-gradient-to-br from-navy to-[#152038] rounded-3xl p-8 space-y-7 overflow-hidden">
              {/* Decorative orbs */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-teal/10 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-blue/10 blur-xl pointer-events-none" />

              <div className="relative space-y-6">
                {/* Guide identity */}
                <div className="flex items-center gap-4">
                  {/* Photo placeholder */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal/30 to-blue/30 border-2 border-white/20 flex items-center justify-center shrink-0 overflow-hidden">
                    <Users className="w-7 h-7 text-white/50" />
                  </div>
                  <div>
                    <p className="text-white font-extrabold text-lg leading-tight">
                      Your Guide
                    </p>
                    <p className="text-teal text-sm font-semibold">
                      Founder &amp; Lead Educational Strategist
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">UnlockEd</p>
                  </div>
                </div>

                {/* Story */}
                <p className="text-white/70 text-sm leading-relaxed">
                  &ldquo;I started UnlockEd after watching families spend years navigating
                  a system that was designed to identify what their child couldn&apos;t do —
                  and never show them what was remarkable. That ends with us.&rdquo;
                </p>

                {/* Credential pills */}
                <div className="space-y-2.5">
                  {[
                    { label: "Certified Educational Therapist", color: "text-teal" },
                    { label: "Cogmed Certified Practitioner", color: "text-blue" },
                    { label: "M.Ed. Special Education", color: "text-gold" },
                    { label: "10+ Years Supporting Families", color: "text-lavender" },
                  ].map((c) => (
                    <div key={c.label} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                      <p className={`text-sm font-medium ${c.color}`}>{c.label}</p>
                    </div>
                  ))}
                </div>

                {/* Our 4 values */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/8 space-y-3">
                  <p className="text-white/40 text-xs font-bold uppercase tracking-wider">
                    How We Work
                  </p>
                  {[
                    "Empathy before expertise — always",
                    "Clarity over clinical language",
                    "Strengths first, challenges second",
                    "Every insight becomes a next step",
                  ].map((v, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-teal mt-1.5 shrink-0" />
                      <p className="text-white/60 text-xs leading-relaxed">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
