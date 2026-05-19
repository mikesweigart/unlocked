"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp } from "@/lib/animations";
import {
  FileText,
  Brain,
  Zap,
  BookOpen,
  Activity,
  Target,
  BarChart2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EvalIndex {
  id: string;
  acronym: string;
  name: string;
  sampleScore: string;
  range: string;
  rangeColor: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  plainEnglish: string;
  schoolImpact: string;
  whatWeDo: string;
  trainable: boolean;
}

const evalIndices: EvalIndex[] = [
  {
    id: "wmi",
    acronym: "WMI",
    name: "Working Memory Index",
    sampleScore: "87",
    range: "Low Average",
    rangeColor: "text-coral",
    icon: Brain,
    color: "text-blue",
    bg: "bg-blue/10",
    border: "border-blue/30",
    plainEnglish:
      "Your child's ability to hold information in mind and mentally work with it — like a mental whiteboard that holds a math problem while they solve it.",
    schoolImpact:
      "Affects multi-step instructions, mental math, reading comprehension, and following classroom discussions in real time. Often the hidden driver behind homework battles.",
    whatWeDo:
      "Working memory is directly trainable. We use Cogmed — the world's most evidence-backed working memory program — with 120+ peer-reviewed studies showing gains comparable to two years of cognitive development. We assess your child's profile to determine if Cogmed is the right fit.",
    trainable: true,
  },
  {
    id: "psi",
    acronym: "PSI",
    name: "Processing Speed Index",
    sampleScore: "79",
    range: "Borderline",
    rangeColor: "text-coral",
    icon: Activity,
    color: "text-lavender",
    bg: "bg-lavender/10",
    border: "border-lavender/30",
    plainEnglish:
      "How quickly your child processes simple, routine information and translates thought into written or verbal action.",
    schoolImpact:
      "Affects timed tests, note-taking, copying from the board, and keeping pace in fast-moving instruction. Frequently misread as laziness or lack of effort.",
    whatWeDo:
      "Processing speed responds best to targeted accommodations — extended time, reduced output demands, and chunked instruction. We help you build and advocate for the right IEP or 504 Plan supports.",
    trainable: false,
  },
  {
    id: "vci",
    acronym: "VCI",
    name: "Verbal Comprehension Index",
    sampleScore: "112",
    range: "High Average",
    rangeColor: "text-teal",
    icon: BookOpen,
    color: "text-teal",
    bg: "bg-teal/10",
    border: "border-teal/30",
    plainEnglish:
      "Language understanding, vocabulary depth, and the ability to connect and express ideas verbally.",
    schoolImpact:
      "Often a major strength — verbal reasoning, class discussions, and vocabulary-rich subjects. A high VCI alongside a lower WMI explains the classic 'clearly smart but still struggling' profile.",
    whatWeDo:
      "A strong VCI paired with weaker memory or speed creates a clear ability-performance gap — the most compelling argument for school services. We help you document and use it.",
    trainable: false,
  },
  {
    id: "fri",
    acronym: "FRI",
    name: "Fluid Reasoning Index",
    sampleScore: "105",
    range: "Average",
    rangeColor: "text-navy/50",
    icon: Zap,
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/30",
    plainEnglish:
      "The ability to reason through brand-new problems using pure logic — without relying on previously memorized information.",
    schoolImpact:
      "Drives novel problem-solving, mathematical reasoning, and learning new concepts quickly. Strong fluid reasoning is often hidden by weak processing speed or working memory.",
    whatWeDo:
      "Strong reasoning alongside weak processing often means your child understands far more than they can demonstrate on tests — a powerful argument for accommodations and a major strength to build from.",
    trainable: false,
  },
  {
    id: "fsiq",
    acronym: "FSIQ",
    name: "Full Scale IQ",
    sampleScore: "94",
    range: "Average",
    rangeColor: "text-navy/50",
    icon: BarChart2,
    color: "text-coral",
    bg: "bg-coral/10",
    border: "border-coral/30",
    plainEnglish:
      "A single composite of all cognitive domains — but one that often masks wide variability between different abilities.",
    schoolImpact:
      "An 'average' FSIQ can hide both significant gifts and real challenges when index scores vary widely. The composite alone is rarely the right lens for understanding your child.",
    whatWeDo:
      "We look past the composite to the index-level and subtest scatter — where the real picture of your child's cognitive profile actually lives. The variability tells the true story.",
    trainable: false,
  },
  {
    id: "achievement",
    acronym: "Ach.",
    name: "Academic Achievement",
    sampleScore: "82",
    range: "Low Average",
    rangeColor: "text-coral",
    icon: Target,
    color: "text-green",
    bg: "bg-green/10",
    border: "border-green/30",
    plainEnglish:
      "Actual reading, writing, and math skill levels — measured directly against same-age peers.",
    schoolImpact:
      "A meaningful gap between cognitive ability and academic achievement is the diagnostic signature of a learning disability and the foundation for IEP qualification.",
    whatWeDo:
      "Ability-achievement discrepancies are exactly what we use to build the case for services. We help you understand the gap, document it, and advocate for your child's educational rights.",
    trainable: true,
  },
];

export default function PsychEvalSection() {
  const { ref, isInView } = useScrollReveal(0.1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = evalIndices.find((i) => i.id === selectedId) ?? null;

  return (
    <section id="psych-eval" className="py-16 sm:py-24 bg-off-white border-b border-gray-blue">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-10 sm:space-y-14"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 text-navy text-sm font-semibold">
              <FileText className="w-4 h-4 text-teal" />
              Psych Eval Consulting
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-tight">
              That Report on Your Desk?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue">
                It Contains a Roadmap.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-navy/65 leading-relaxed">
              Psychoeducational evaluations run 20–40 pages of clinical language most families
              never fully decode. We sit with you, explain every score in plain English, and
              turn the report into a clear action plan — including what to ask for at school.
            </p>
          </motion.div>

          {/* Score cards grid */}
          <motion.div variants={fadeUp}>
            <p className="text-center text-xs font-semibold text-navy/30 uppercase tracking-widest mb-5">
              Sample evaluation profile — tap any index to decode it
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {evalIndices.map((index) => {
                const Icon = index.icon;
                const isActive = selectedId === index.id;
                return (
                  <motion.button
                    key={index.id}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      setSelectedId((prev) => (prev === index.id ? null : index.id))
                    }
                    className={cn(
                      "text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 space-y-3",
                      isActive
                        ? `${index.border} ${index.bg} shadow-md`
                        : "border-gray-blue bg-white hover:border-gray-mid hover:shadow-sm"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div
                        className={cn(
                          "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300",
                          isActive ? index.bg : "bg-gray-blue"
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-4 h-4 transition-colors duration-300",
                            isActive ? index.color : "text-navy/25"
                          )}
                        />
                      </div>
                      <span
                        className={cn(
                          "text-2xl sm:text-3xl font-black tabular-nums leading-none transition-colors duration-300",
                          isActive ? index.color : "text-navy/15"
                        )}
                      >
                        {index.sampleScore}
                      </span>
                    </div>

                    <div>
                      <p
                        className={cn(
                          "text-xs font-bold uppercase tracking-wider transition-colors duration-300",
                          isActive ? index.color : "text-navy/35"
                        )}
                      >
                        {index.acronym}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-navy leading-snug mt-0.5">
                        {index.name}
                      </p>
                      <p
                        className={cn(
                          "text-xs mt-1 font-semibold transition-colors duration-300",
                          isActive ? index.rangeColor : "text-navy/25"
                        )}
                      >
                        {index.range}
                      </p>
                    </div>

                    {index.trainable && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-teal/10 text-teal">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                        Trainable
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="bg-navy rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className={cn("text-xs font-bold uppercase tracking-widest", selected.color)}>
                      {selected.acronym} — {selected.name}
                    </p>
                    <h3 className="text-white font-extrabold text-lg sm:text-xl leading-snug">
                      {selected.plainEnglish}
                    </h3>
                  </div>
                  {selected.trainable && (
                    <span className="shrink-0 px-3 py-1 rounded-full text-xs font-bold bg-teal/20 text-teal border border-teal/30 whitespace-nowrap">
                      Trainable
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2">
                    <p className="text-xs font-bold text-white/40 uppercase tracking-wider">
                      Impact at School
                    </p>
                    <p className="text-white/75 text-sm leading-relaxed">{selected.schoolImpact}</p>
                  </div>
                  <div className="bg-teal/10 rounded-xl p-4 border border-teal/25 space-y-2">
                    <p className="text-xs font-bold text-teal uppercase tracking-wider">
                      What We Do With This
                    </p>
                    <p className="text-white/75 text-sm leading-relaxed">{selected.whatWeDo}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center text-xs text-navy/30"
              >
                Tap any score above to see what it means — and what to do about it.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Working Memory trainable callout */}
          <motion.div
            variants={fadeUp}
            className="bg-gradient-to-r from-blue/10 via-teal/10 to-blue/10 border border-teal/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 rounded-2xl bg-teal/15 border border-teal/25 flex items-center justify-center shrink-0">
                <Brain className="w-6 h-6 text-teal" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-teal uppercase tracking-widest">
                  The Most Important Finding From 20+ Years of Cognitive Research
                </p>
                <p className="text-navy font-extrabold text-base sm:text-xl leading-snug">
                  Working memory is not fixed. It can be trained.
                </p>
                <p className="text-navy/65 text-sm sm:text-base leading-relaxed">
                  We use{" "}
                  <a
                    href="https://www.cogmed.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal font-semibold hover:underline"
                  >
                    Cogmed
                  </a>
                  {" "}— the most rigorously researched working memory training program available,
                  with 120+ peer-reviewed studies and 200,000+ users across 20 countries. Research
                  shows gains comparable to two years of typical cognitive development. We review
                  your child&apos;s evaluation profile and determine whether Cogmed is the right
                  fit for their specific needs.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="text-center space-y-3">
            <p className="text-navy/55 text-sm sm:text-base">
              Ready to understand what your child&apos;s evaluation actually means?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-base hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 min-h-[52px]"
              >
                Book a Free Psych Eval Review
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
              <p className="text-navy/40 text-xs leading-relaxed">
                Free · Confidential · No report too complicated
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
