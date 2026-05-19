"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Brain, Check, Download, RotateCcw, X, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ─── Scoring system ───────────────────────────────────────────────────────────

type StrengthKey =
  | "creative"
  | "hyperfocus"
  | "patterns"
  | "emotional"
  | "spatial"
  | "resilience"
  | "curiosity"
  | "narrative";

type Weights = Partial<Record<StrengthKey, number>>;

interface Choice {
  label: string;
  weights: Weights;
}

interface Question {
  id: number;
  question: string;
  choices: Choice[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "When your child has free time with no screens, they're most likely to...",
    choices: [
      { label: "Draw, build, or create something", weights: { creative: 2, spatial: 1 } },
      { label: "Read, write, or tell stories", weights: { narrative: 2, curiosity: 1 } },
      { label: "Dive deep into a specific interest", weights: { hyperfocus: 2, patterns: 1 } },
      { label: "Connect with others or help someone", weights: { emotional: 2, resilience: 1 } },
    ],
  },
  {
    id: 2,
    question: "My child notices things that others miss, especially...",
    choices: [
      { label: "Patterns, systems, and how things connect", weights: { patterns: 2, curiosity: 1 } },
      { label: "Emotions and how people are feeling", weights: { emotional: 2, narrative: 1 } },
      { label: "Visual details, shapes, and spatial relationships", weights: { spatial: 2, patterns: 1 } },
      { label: "Inconsistencies, unfairness, or unspoken rules", weights: { curiosity: 2, emotional: 1 } },
    ],
  },
  {
    id: 3,
    question: "When my child gets deeply interested in something, they...",
    choices: [
      { label: "Can focus for hours and completely lose track of time", weights: { hyperfocus: 2, patterns: 1 } },
      { label: "Want to share it with everyone they know", weights: { narrative: 2, emotional: 1 } },
      { label: "Start inventing, modifying, or building on it", weights: { creative: 2, spatial: 1 } },
      { label: "Want to understand every single detail", weights: { curiosity: 2, hyperfocus: 1 } },
    ],
  },
  {
    id: 4,
    question: "In a group, my child naturally...",
    choices: [
      { label: "Becomes the peacemaker or emotional anchor", weights: { emotional: 2, resilience: 1 } },
      { label: "Takes the creative or unconventional lead", weights: { creative: 2, curiosity: 1 } },
      { label: "Observes carefully before participating", weights: { patterns: 2, emotional: 1 } },
      { label: "Connects deeply with one or two people", weights: { emotional: 2, narrative: 1 } },
    ],
  },
  {
    id: 5,
    question: "My child learns best when...",
    choices: [
      { label: "They can move their body while learning", weights: { resilience: 1, hyperfocus: 1, spatial: 1 } },
      { label: "They can see it visually or drawn out", weights: { spatial: 2, patterns: 1 } },
      { label: "They can talk through it out loud", weights: { narrative: 2, emotional: 1 } },
      { label: "They understand the 'why' first", weights: { curiosity: 2, patterns: 1 } },
    ],
  },
  {
    id: 6,
    question: "When frustrated, my child tends to...",
    choices: [
      { label: "Get creative finding workarounds", weights: { creative: 2, resilience: 1 } },
      { label: "Need time alone to process before re-engaging", weights: { hyperfocus: 1, patterns: 1 } },
      { label: "Express emotions intensely, then bounce back fast", weights: { emotional: 2, resilience: 1 } },
      { label: "Want to talk it through with someone trusted", weights: { narrative: 1, emotional: 2 } },
    ],
  },
  {
    id: 7,
    question: "My child's imagination most often shows up as...",
    choices: [
      { label: "Elaborate stories and fictional worlds", weights: { narrative: 2, creative: 1 } },
      { label: "Inventive solutions to real problems", weights: { creative: 2, patterns: 1 } },
      { label: "Visual or spatial creations (art, design, building)", weights: { spatial: 2, creative: 1 } },
      { label: "Hypothetical questions and 'what if' scenarios", weights: { curiosity: 2, patterns: 1 } },
    ],
  },
  {
    id: 8,
    question: "If others were to describe my child, they'd most likely say...",
    choices: [
      { label: "Creative and full of original ideas", weights: { creative: 2, curiosity: 1 } },
      { label: "Empathetic — unusually tuned in to people", weights: { emotional: 2, narrative: 1 } },
      { label: "Intense and passionate when something matters", weights: { hyperfocus: 2, resilience: 1 } },
      { label: "Surprisingly persistent — doesn't give up easily", weights: { resilience: 2, hyperfocus: 1 } },
    ],
  },
  {
    id: 9,
    question: "My child remembers best when information is...",
    choices: [
      { label: "Connected to a story or real-life example", weights: { narrative: 2, emotional: 1 } },
      { label: "Visual, colorful, or mapped out spatially", weights: { spatial: 2, patterns: 1 } },
      { label: "Related to something they genuinely care about", weights: { hyperfocus: 2, emotional: 1 } },
      { label: "Part of a larger pattern or system", weights: { patterns: 2, curiosity: 1 } },
    ],
  },
  {
    id: 10,
    question: "What tends to surprise people most about my child is...",
    choices: [
      { label: "How deeply they feel — their emotional intensity", weights: { emotional: 2, resilience: 1 } },
      { label: "How creative their solutions are to hard problems", weights: { creative: 2, patterns: 1 } },
      { label: "How much they know about their specific interests", weights: { hyperfocus: 2, curiosity: 1 } },
      { label: "How well they read people and social situations", weights: { emotional: 2, narrative: 1 } },
    ],
  },
  {
    id: 11,
    question: "When it comes to time, my child...",
    choices: [
      { label: "Loses track easily when genuinely engaged", weights: { hyperfocus: 2, creative: 1 } },
      { label: "Works in bursts of intense energy followed by rest", weights: { hyperfocus: 1, resilience: 1, creative: 1 } },
      { label: "Is surprisingly aware of fairness and structure", weights: { patterns: 1, emotional: 2 } },
      { label: "Needs things broken into manageable pieces", weights: { resilience: 1, patterns: 1 } },
    ],
  },
  {
    id: 12,
    question: "My child tends to ask a lot of questions because...",
    choices: [
      { label: "They genuinely want to understand everything deeply", weights: { curiosity: 2, patterns: 1 } },
      { label: "They notice inconsistencies or want things to be fair", weights: { curiosity: 2, emotional: 1 } },
      { label: "They're building a mental model of how things connect", weights: { patterns: 2, curiosity: 1 } },
      { label: "They want to make sure they understand before acting", weights: { patterns: 1, resilience: 1 } },
    ],
  },
  {
    id: 13,
    question: "When working on a creative project, my child...",
    choices: [
      { label: "Loses themselves in it completely", weights: { hyperfocus: 2, creative: 1 } },
      { label: "Cares deeply that it communicates something meaningful", weights: { narrative: 2, emotional: 1 } },
      { label: "Focuses on the visual, structural, or spatial elements", weights: { spatial: 2, creative: 1 } },
      { label: "Experiments and tries unexpected approaches", weights: { creative: 2, curiosity: 1 } },
    ],
  },
  {
    id: 14,
    question: "My child bounces back from setbacks by...",
    choices: [
      { label: "Finding humor or a new angle on the situation", weights: { creative: 1, resilience: 2 } },
      { label: "Talking it through with someone they trust", weights: { narrative: 1, emotional: 2 } },
      { label: "Processing internally and returning stronger", weights: { resilience: 2, patterns: 1 } },
      { label: "Channeling it into something they can control", weights: { hyperfocus: 1, resilience: 2 } },
    ],
  },
  {
    id: 15,
    question: "At their absolute best, my child...",
    choices: [
      { label: "Creates something the world hasn't seen before", weights: { creative: 2, spatial: 1 } },
      { label: "Makes others feel deeply understood and cared for", weights: { emotional: 2, narrative: 1 } },
      { label: "Solves a problem no one else thought to approach", weights: { patterns: 2, curiosity: 1 } },
      { label: "Persists through something incredibly hard and succeeds", weights: { resilience: 2, hyperfocus: 1 } },
    ],
  },
];

const strengthMeta: Record<StrengthKey, { label: string; color: string; description: string; detail: string }> = {
  creative: {
    label: "Creative & Divergent Thinking",
    color: "#4A90D9",
    description: "Generates original ideas, finds unexpected connections, thinks beyond conventional boundaries.",
    detail:
      "Your child's mind is wired for innovation. The same brain that resists rote learning is the brain that invents solutions adults haven't considered. This strength is the engine of entrepreneurship, art, and scientific discovery.",
  },
  hyperfocus: {
    label: "Deep Focus & Hyperfixation",
    color: "#5BBCB4",
    description: "Extraordinary capacity for sustained attention when genuinely engaged.",
    detail:
      "When the right topic appears, your child enters a state of focus most adults only dream of. This isn't a character flaw — it's a superpower waiting for the right channel. UnlockEd helps identify those channels and build bridges to required content.",
  },
  patterns: {
    label: "Pattern Recognition & Systems Thinking",
    color: "#D4A853",
    description: "Sees structures, connections, and patterns that others miss — at every scale.",
    detail:
      "Your child's brain naturally seeks the underlying logic. This drives understanding of complex systems — from mathematics to music to mechanics. It's the strength behind coding, engineering, strategy, and scientific thinking.",
  },
  emotional: {
    label: "Emotional Intelligence & Empathy",
    color: "#E8877C",
    description: "Heightened awareness of emotional currents — their own and others'.",
    detail:
      "This depth of emotional attunement is a remarkable gift. It builds exceptional leaders, therapists, artists, teachers, and connectors. What may look like 'oversensitivity' is actually a sophisticated social radar most people spend years trying to develop.",
  },
  spatial: {
    label: "Spatial & Visual Intelligence",
    color: "#B8A9D4",
    description: "Thinks in images, dimensions, and spatial relationships with unusual precision.",
    detail:
      "Your child's mind works in three dimensions. This strength powers visual art, architecture, design, engineering, surgery, and navigation. Many children with this strength struggle with text-heavy instruction but excel with visual, hands-on approaches.",
  },
  resilience: {
    label: "Resilience & Adaptive Thinking",
    color: "#6BBF8A",
    description: "Remarkable bounce-back capacity and ability to find new approaches under pressure.",
    detail:
      "Your child has been developing resilience through every challenge they've navigated. This is not a small thing — research consistently shows that resilience is one of the strongest predictors of adult success, happiness, and leadership.",
  },
  curiosity: {
    label: "Curiosity & Inquiry Drive",
    color: "#4A90D9",
    description: "Relentless drive to understand deeply — asks the questions others don't think to ask.",
    detail:
      "This is the engine of learning itself. Your child's insistent 'why' isn't resistance — it's a deeper engagement with the world than most people ever achieve. Curiosity-driven learners become the scientists, philosophers, and innovators who change everything.",
  },
  narrative: {
    label: "Narrative & Verbal Intelligence",
    color: "#5BBCB4",
    description: "Understands the world through stories, words, and meaning-making.",
    detail:
      "Your child thinks in stories and communicates with unusual depth. This powers communication, leadership, persuasion, writing, and connection. Often this strength is hidden behind written expression challenges — the story is there; the mechanics may need support.",
  },
};

// ─── Assessment state machine ─────────────────────────────────────────────────

type Phase = "welcome" | "questions" | "processing" | "teaser" | "capture" | "results";

interface Results {
  primary: StrengthKey[];
  secondary: StrengthKey[];
  scores: Record<StrengthKey, number>;
}

function calculateResults(answers: Record<number, number>): Results {
  const scores: Record<StrengthKey, number> = {
    creative: 0, hyperfocus: 0, patterns: 0, emotional: 0,
    spatial: 0, resilience: 0, curiosity: 0, narrative: 0,
  };

  Object.entries(answers).forEach(([qId, choiceIndex]) => {
    const q = questions.find((q) => q.id === parseInt(qId));
    if (!q) return;
    const weights = q.choices[choiceIndex]?.weights ?? {};
    (Object.entries(weights) as [StrengthKey, number][]).forEach(([key, val]) => {
      scores[key] = (scores[key] ?? 0) + val;
    });
  });

  const sorted = (Object.entries(scores) as [StrengthKey, number][])
    .sort((a, b) => b[1] - a[1]);

  const primary = sorted.slice(0, 3).map(([k]) => k);
  const secondary = sorted.slice(3, 6).map(([k]) => k);

  return { primary, secondary, scores };
}

// ─── Components ──────────────────────────────────────────────────────────────

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto text-center space-y-8"
    >
      <div className="flex justify-center">
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 rounded-3xl bg-gradient-to-br from-teal to-blue flex items-center justify-center shadow-xl"
        >
          <Brain className="w-10 h-10 text-white" />
        </motion.div>
      </div>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 text-teal text-sm font-semibold">
          Free · 3 Minutes · No Clinical Labels
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-tight">
          Discover Your Child&apos;s{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue">
            Brain Strengths
          </span>
        </h1>
        <p className="text-base sm:text-lg text-navy/65 leading-relaxed">
          This 3-minute reflection will help you see what makes your child&apos;s mind
          remarkable. No diagnosis needed. No pressure. Just insight.
        </p>
        <p className="text-sm text-navy/45 italic">
          This is not a test. There are no wrong answers. You&apos;re simply noticing
          what already exists.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        {[
          { num: "15", label: "Questions" },
          { num: "3", label: "Minutes" },
          { num: "8", label: "Strength Areas" },
        ].map((item) => (
          <div key={item.label} className="bg-gray-blue/60 rounded-2xl py-4 px-2">
            <div className="text-2xl font-extrabold text-navy">{item.num}</div>
            <div className="text-xs text-navy/50 font-medium">{item.label}</div>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-lg hover:shadow-xl transition-all duration-200"
      >
        Let&apos;s Begin
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}

function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  selectedChoice,
  onSelect,
  onNext,
  onBack,
}: {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedChoice: number | null;
  onSelect: (i: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const progress = ((questionIndex) / totalQuestions) * 100;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
      className="max-w-2xl mx-auto space-y-8"
    >
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-navy/40 font-medium">
          <span>Question {questionIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1.5 bg-gray-blue rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal to-blue rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-teal uppercase tracking-widest">
          Strength Discovery
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy leading-tight">
          {question.question}
        </h2>
      </div>

      {/* Choices */}
      <div className="space-y-3">
        {question.choices.map((choice, i) => (
          <motion.button
            key={i}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelect(i)}
            className={cn(
              "w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 text-sm font-medium leading-relaxed",
              selectedChoice === i
                ? "border-teal bg-teal/10 text-navy"
                : "border-gray-blue bg-white text-navy/70 hover:border-teal/40 hover:text-navy"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200",
                  selectedChoice === i
                    ? "border-teal bg-teal"
                    : "border-gray-mid"
                )}
              >
                {selectedChoice === i && <Check className="w-3 h-3 text-white" />}
              </div>
              {choice.label}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-navy/50 hover:text-navy text-sm font-medium transition-colors duration-150 min-h-[44px] px-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={selectedChoice === null}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-sm disabled:opacity-40 hover:shadow-lg transition-all duration-200"
        >
          {questionIndex === totalQuestions - 1 ? "See My Results" : "Next"}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

function ProcessingScreen() {
  const steps = [
    "Mapping your answers...",
    "Identifying strength patterns...",
    "Building your profile...",
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-md mx-auto text-center space-y-10"
    >
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-teal"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${i * 45}deg) translateY(-50px) translate(-50%, -50%)`,
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-10 h-10 text-teal" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {steps.map((step, i) => (
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.9, duration: 0.5 }}
            className="text-navy/60 text-sm"
          >
            {step}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}

function ResultsScreen({
  results,
  onCapture,
  onRetake,
}: {
  results: Results;
  onCapture: () => void;
  onRetake: () => void;
}) {
  const [activeKey, setActiveKey] = useState<StrengthKey | null>(results.primary[0]);

  const maxScore = Math.max(...Object.values(results.scores));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-10"
    >
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 text-teal text-sm font-semibold">
          <Brain className="w-4 h-4" />
          Your Child&apos;s Brain Strengths Profile
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-navy">
          Here&apos;s What Makes Your Child&apos;s Mind Remarkable
        </h2>
      </div>

      {/* Primary strengths */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-navy/40 uppercase tracking-widest">
          Primary Strengths
        </h3>
        <div className="space-y-3">
          {results.primary.map((key) => {
            const meta = strengthMeta[key];
            const score = results.scores[key];
            const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
            const isActive = activeKey === key;
            return (
              <motion.button
                key={key}
                whileHover={{ x: 2 }}
                onClick={() => setActiveKey(isActive ? null : key)}
                className={cn(
                  "w-full text-left rounded-2xl border-2 p-5 space-y-3 transition-all duration-200",
                  isActive ? "border-teal bg-teal/5" : "border-gray-blue bg-white hover:border-teal/30"
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: meta.color }}
                    />
                    <span className="font-bold text-navy text-sm">{meta.label}</span>
                  </div>
                  <div className="w-24 h-1.5 bg-gray-blue rounded-full overflow-hidden shrink-0">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: meta.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    />
                  </div>
                </div>
                <p className="text-navy/60 text-sm leading-relaxed">{meta.description}</p>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 border-t border-teal/15">
                        <p className="text-navy/70 text-sm leading-relaxed">{meta.detail}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Secondary strengths */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-navy/40 uppercase tracking-widest">
          Additional Strengths
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {results.secondary.map((key) => {
            const meta = strengthMeta[key];
            return (
              <div
                key={key}
                className="bg-gray-blue/50 rounded-xl p-4 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.color }} />
                  <span className="font-semibold text-navy text-xs">{meta.label}</span>
                </div>
                <p className="text-navy/55 text-xs leading-relaxed">{meta.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reframe */}
      <div className="bg-navy rounded-2xl p-6 space-y-2">
        <p className="text-white/50 text-xs font-bold uppercase tracking-wider">Remember</p>
        <p className="text-white font-medium leading-relaxed">
          The same brain wiring that creates challenges also creates extraordinary strengths.
          These are not compensation strategies — they are genuine gifts worth developing.
        </p>
      </div>

      {/* CTAs */}
      <div className="space-y-4">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onCapture}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-base hover:shadow-lg transition-all duration-200"
        >
          <Download className="w-4 h-4" />
          Get Full Report + Free Parent Guide
        </motion.button>
        <div className="flex gap-3">
          <a
            href="#contact"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-navy text-navy font-semibold text-sm hover:bg-navy hover:text-white transition-all duration-200"
          >
            Talk to UnlockEd About These Strengths
          </a>
          <button
            onClick={onRetake}
            className="p-3 rounded-xl border-2 border-gray-mid text-navy/50 hover:text-navy hover:border-navy transition-all duration-200"
            aria-label="Retake"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function CaptureScreen({
  onSubmit,
  onSkip,
}: {
  onSubmit: () => void;
  onSkip: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    setTimeout(onSubmit, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-md mx-auto text-center space-y-8"
    >
      {submitted ? (
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-teal flex items-center justify-center">
              <Check className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-navy">On its way!</h3>
            <p className="text-navy/60">Check your inbox for your strengths report and Parent Guide.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal to-blue flex items-center justify-center">
                <Download className="w-7 h-7 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-navy">
              Get Your Full Report + Free Parent Guide
            </h2>
            <p className="text-navy/60 text-sm leading-relaxed">
              We&apos;ll send a detailed PDF of your child&apos;s strengths profile along with
              our 25-page Parent Guide — free.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-navy/50 uppercase tracking-wider">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-blue text-navy placeholder-navy/30 focus:border-teal focus:outline-none transition-colors duration-200 text-base"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-navy/50 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-blue text-navy placeholder-navy/30 focus:border-teal focus:outline-none transition-colors duration-200 text-base"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>Send Me the Report + Guide</>
              )}
            </motion.button>
            <button
              type="button"
              onClick={onSkip}
              className="w-full text-navy/40 text-sm hover:text-navy/60 transition-colors duration-150"
            >
              Skip for now — I&apos;ll just view results
            </button>
          </form>
        </>
      )}
    </motion.div>
  );
}

// ─── Teaser screen ────────────────────────────────────────────────────────────

function TeaserScreen({
  results,
  onUnlock,
  onSkip,
}: {
  results: Results;
  onUnlock: () => void;
  onSkip: () => void;
}) {
  const topKey = results.primary[0];
  const meta = strengthMeta[topKey];
  const maxScore = Math.max(...Object.values(results.scores));
  const pct = maxScore > 0 ? (results.scores[topKey] / maxScore) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 text-teal text-sm font-semibold">
          <Brain className="w-4 h-4" />
          Your Child&apos;s #1 Brain Strength
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy leading-tight">
          Your Child&apos;s Mind Is Wired For This
        </h2>
        <p className="text-navy/55 text-sm leading-relaxed">
          Based on your 15 answers, here&apos;s the strongest emerging pattern we found.
        </p>
      </div>

      {/* Top strength — fully unlocked */}
      <div
        className="rounded-2xl border-2 p-6 sm:p-7 space-y-4"
        style={{ borderColor: `${meta.color}55`, backgroundColor: `${meta.color}0C` }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: meta.color }} />
            <span className="font-bold text-navy text-sm sm:text-base">{meta.label}</span>
          </div>
          <div className="w-24 h-1.5 bg-gray-blue rounded-full overflow-hidden shrink-0">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: meta.color }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </div>
        <p className="text-navy/65 text-sm leading-relaxed">{meta.description}</p>
        <div className="pt-3 border-t border-navy/10">
          <p className="text-navy/75 text-sm leading-relaxed">{meta.detail}</p>
        </div>
      </div>

      {/* Locked strengths */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-navy/35 uppercase tracking-widest">
          2 More Primary Strengths Identified
        </p>
        <div className="space-y-3">
          {results.primary.slice(1, 3).map((key) => {
            const m = strengthMeta[key];
            return (
              <div key={key} className="relative rounded-2xl border-2 border-gray-blue bg-white p-5 overflow-hidden min-h-[88px]">
                {/* Blurred preview */}
                <div className="opacity-15 blur-sm space-y-2 pointer-events-none select-none">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
                    <span className="font-bold text-navy text-sm">{m.label}</span>
                  </div>
                  <p className="text-navy/60 text-sm">{m.description}</p>
                </div>
                {/* Lock overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-1.5">
                    <div className="flex justify-center">
                      <div className="w-9 h-9 rounded-full bg-gray-blue flex items-center justify-center">
                        <Lock className="w-4 h-4 text-navy/35" />
                      </div>
                    </div>
                    <p className="text-xs text-navy/40 font-semibold">Unlock with free report</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onUnlock}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-base hover:shadow-xl transition-all duration-200 min-h-[52px]"
        >
          <Download className="w-4 h-4" />
          Unlock My Child&apos;s Full Strengths Profile — Free
        </motion.button>
        <p className="text-center text-xs text-navy/35">
          Complete 3-strength profile + 25-page Parent Guide · No credit card · Instant
        </p>
        <button
          onClick={onSkip}
          className="w-full text-navy/40 text-sm hover:text-navy/60 transition-colors duration-150 py-2"
        >
          Skip — I&apos;ll just view my top result for now
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AssessmentPage() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [results, setResults] = useState<Results | null>(null);

  const currentQuestion = questions[qIndex];
  const selectedChoice = answers[currentQuestion?.id] ?? null;

  const handleSelect = (choiceIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: choiceIndex }));
  };

  const handleNext = () => {
    if (selectedChoice === null) return;
    if (qIndex < questions.length - 1) {
      setQIndex((i) => i + 1);
    } else {
      setPhase("processing");
      setTimeout(() => {
        const r = calculateResults(answers);
        setResults(r);
        setPhase("teaser");
      }, 3000);
    }
  };

  const handleBack = () => {
    if (qIndex === 0) setPhase("welcome");
    else setQIndex((i) => i - 1);
  };

  const handleRetake = () => {
    setPhase("welcome");
    setQIndex(0);
    setAnswers({});
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-blue">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-navy hover:text-teal transition-colors">
            <Brain className="w-5 h-5 text-teal" />
            Unlock<span className="text-teal">Ed</span>
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg text-navy/40 hover:text-navy hover:bg-gray-blue transition-colors duration-150"
            aria-label="Close assessment"
          >
            <X className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {phase === "welcome" && (
            <motion.div key="welcome">
              <WelcomeScreen onStart={() => setPhase("questions")} />
            </motion.div>
          )}

          {phase === "questions" && currentQuestion && (
            <motion.div key={`q-${qIndex}`}>
              <QuestionScreen
                question={currentQuestion}
                questionIndex={qIndex}
                totalQuestions={questions.length}
                selectedChoice={selectedChoice}
                onSelect={handleSelect}
                onNext={handleNext}
                onBack={handleBack}
              />
            </motion.div>
          )}

          {phase === "processing" && (
            <motion.div key="processing">
              <ProcessingScreen />
            </motion.div>
          )}

          {phase === "teaser" && results && (
            <motion.div key="teaser">
              <TeaserScreen
                results={results}
                onUnlock={() => setPhase("capture")}
                onSkip={() => setPhase("results")}
              />
            </motion.div>
          )}

          {phase === "capture" && (
            <motion.div key="capture">
              <CaptureScreen
                onSubmit={() => setPhase("results")}
                onSkip={() => setPhase("results")}
              />
            </motion.div>
          )}

          {phase === "results" && results && (
            <motion.div key="results">
              <ResultsScreen
                results={results}
                onCapture={() => setPhase("capture")}
                onRetake={handleRetake}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
