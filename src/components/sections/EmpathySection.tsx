"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { Heart, Users, TrendingUp, Moon, FileText, MessageSquare, AlertCircle } from "lucide-react";

// ── Emotional moment cards ────────────────────────────────────────────────────

const moments = [
  {
    icon: Moon,
    time: "11 PM",
    text: "You're on your fourth specialist website this week, reading the same contradictory advice, more confused than when you started.",
    color: "text-blue",
    bg: "bg-blue/8",
    border: "border-blue/20",
  },
  {
    icon: FileText,
    time: "After the meeting",
    text: "You left the IEP meeting feeling more overwhelmed than when you walked in. You nodded and said 'thank you' but understood almost nothing.",
    color: "text-gold",
    bg: "bg-gold/8",
    border: "border-gold/20",
  },
  {
    icon: MessageSquare,
    time: "Tonight",
    text: "Your partner thinks you're overreacting. You know something is wrong. This disagreement is quietly straining everything.",
    color: "text-lavender",
    bg: "bg-lavender/8",
    border: "border-lavender/20",
  },
  {
    icon: AlertCircle,
    time: "This afternoon",
    text: "Your child said 'I'm stupid' for the third time this month. You didn't know what to say. You still don't.",
    color: "text-coral",
    bg: "bg-coral/8",
    border: "border-coral/20",
  },
];

function MomentCard({ moment, index }: { moment: (typeof moments)[0]; index: number }) {
  const { ref, isInView } = useScrollReveal(0.3);
  const Icon = moment.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-2xl border ${moment.border} ${moment.bg} p-5 space-y-3`}
    >
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${moment.color} shrink-0`} />
        <span className={`text-xs font-bold uppercase tracking-wider ${moment.color}`}>
          {moment.time}
        </span>
      </div>
      <p className="text-navy/75 text-sm sm:text-base leading-relaxed">{moment.text}</p>
    </motion.div>
  );
}

// ── Stat counter ──────────────────────────────────────────────────────────────

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

// ── Testimonial snippets ──────────────────────────────────────────────────────

const snippets = [
  {
    quote: "We finally have a roadmap instead of just guessing every day.",
    name: "Sarah M.",
    tag: "Parent of a child with ADHD",
  },
  {
    quote: "For the first time, my son sees himself as capable — not broken. That change is everything.",
    name: "Marcus T.",
    tag: "Father of a dyslexic learner",
  },
  {
    quote: "The way they explained executive functioning made me understand my daughter for the first time in years.",
    name: "Jennifer K.",
    tag: "Mother of a 3rd grader",
  },
];

// ── Main section ──────────────────────────────────────────────────────────────

export default function EmpathySection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <>
      <section className="py-16 sm:py-24 bg-white" id="empathy">
        <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-12 sm:space-y-16"
          >
            {/* Opening — the parent in their specific moment */}
            <motion.div variants={fadeUp} className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 text-teal text-sm font-semibold">
                <Heart className="w-4 h-4" />
                You&apos;re not alone in this
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-tight">
                If Any of This Sounds Familiar —{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue">
                  You&apos;re in the Right Place.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-navy/65 leading-relaxed">
                These aren&apos;t just feelings. They&apos;re the specific, exhausting moments
                that thousands of parents of differently-wired kids navigate every single day —
                often without anyone who truly understands.
              </p>
            </motion.div>

            {/* Emotional moment cards */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
            >
              {moments.map((m, i) => (
                <MomentCard key={i} moment={m} index={i} />
              ))}
            </motion.div>

            {/* Bridge statement */}
            <motion.div
              variants={fadeUp}
              className="max-w-2xl mx-auto text-center"
            >
              <p className="text-navy/60 leading-relaxed text-sm sm:text-base">
                Every one of those moments is real. Every one of them has a path forward.
                The research is clear: with the right guide, every learner can not just
                cope — but genuinely thrive.
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
                  label="of children have a learning or attention difference"
                  icon={Users}
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <StatCounter
                  target={6}
                  suffix="M+"
                  label="children in the US diagnosed with ADHD"
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
              className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
            >
              {snippets.map((t) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  className="bg-gray-blue/50 rounded-2xl p-6 space-y-4 hover:bg-gray-blue transition-colors duration-200"
                >
                  <p className="text-navy/80 leading-relaxed italic text-sm sm:text-base">
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

      <ProblemSection />
    </>
  );
}

// ── The Villain ───────────────────────────────────────────────────────────────

function ProblemSection() {
  const { ref, isInView } = useScrollReveal();

  const villains = [
    {
      label: "The Deficit Model",
      text: "Most systems were built to identify what your child can't do — and then spend all their energy trying to fix it. The strengths go unseen, untrained, and unacknowledged.",
    },
    {
      label: "The Diagnosis Flood",
      text: "A diagnosis arrives with clinical language, a stack of pamphlets, and contradictory advice from every direction. Clarity is the one thing nobody provides.",
    },
    {
      label: "The Isolation",
      text: "Without a guide who truly understands the landscape, families navigate IEP meetings, therapy options, and school politics entirely alone — and exhausted.",
    },
    {
      label: "The Ticking Clock",
      text: "Self-concept is forming right now. Brain plasticity is highest before age 12. Every month without the right support is a month the wrong story gets more deeply written.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-navy" id="problem">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8 sm:space-y-12 text-center"
        >
          <motion.div variants={fadeUp} className="space-y-5 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              The Problem Isn&apos;t Your Child.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-gold">
                It&apos;s the System Around Them.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/65 leading-relaxed">
              Four forces are working against your child&apos;s potential right now.
              Naming them is the first step to defeating them.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
          >
            {villains.map((v) => (
              <motion.div
                key={v.label}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 hover:bg-white/8 transition-colors duration-200"
              >
                <div className="flex items-center gap-2 text-coral text-sm font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
                  {v.label}
                </div>
                <p className="text-white/65 leading-relaxed text-sm sm:text-base">{v.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="pt-2 max-w-2xl mx-auto space-y-3">
            <p className="text-base sm:text-lg text-white/75 font-semibold leading-relaxed">
              UnlockEd exists because your child deserves a guide who can see
              past all four of these — and show you what&apos;s actually there.
            </p>
            <p className="text-white/45 text-sm italic">
              &ldquo;The parent is the hero of this story. We&apos;re just the guide who shows
              up with empathy, expertise, and a clear plan.&rdquo;
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
