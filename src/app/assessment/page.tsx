"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ArrowUpRight, Check, Printer, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Wordmark } from "@/components/layout/Navigation";
import { BOOKING_URL } from "@/lib/site";

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
      { label: "Empathetic and unusually tuned in to people", weights: { emotional: 2, narrative: 1 } },
      { label: "Intense and passionate when something matters", weights: { hyperfocus: 2, resilience: 1 } },
      { label: "Surprisingly persistent and doesn't give up easily", weights: { resilience: 2, hyperfocus: 1 } },
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
      { label: "How deeply they feel things", weights: { emotional: 2, resilience: 1 } },
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
      "Your child's mind is wired for invention. The same brain that resists rote memorization is often the one that comes up with solutions adults hadn't considered.",
  },
  hyperfocus: {
    label: "Deep Focus & Hyperfixation",
    color: "#5BBCB4",
    description: "Extraordinary capacity for sustained attention when genuinely engaged.",
    detail:
      "When the right topic appears, your child can focus for a remarkably long time. That isn't a character flaw. It is a strength that needs the right channel, and a bridge from what they love to what school asks of them.",
  },
  patterns: {
    label: "Pattern Recognition & Systems Thinking",
    color: "#D4A853",
    description: "Sees structures, connections, and patterns that others miss.",
    detail:
      "Your child naturally looks for the underlying logic. That helps with understanding systems, from math to music to how machines work, and it is the strength behind coding, engineering, and scientific thinking.",
  },
  emotional: {
    label: "Emotional Intelligence & Empathy",
    color: "#E8877C",
    description: "A strong awareness of feelings, both their own and other people's.",
    detail:
      "This kind of emotional attunement is a real gift. What can look like oversensitivity is often a finely tuned social radar, the same one that makes good friends, leaders, teachers, and caregivers.",
  },
  spatial: {
    label: "Spatial & Visual Intelligence",
    color: "#B8A9D4",
    description: "Thinks in images, dimensions, and spatial relationships with unusual precision.",
    detail:
      "Your child thinks in pictures and space. This strength shows up in art, building, design, and engineering. Many children with it struggle with text-heavy instruction and come alive with visual, hands-on learning.",
  },
  resilience: {
    label: "Resilience & Adaptive Thinking",
    color: "#6BBF8A",
    description: "Remarkable bounce-back capacity and ability to find new approaches under pressure.",
    detail:
      "Your child has been building resilience through every challenge they've faced. That is not a small thing. The ability to keep going and try a new approach is one of the most valuable skills a person can have.",
  },
  curiosity: {
    label: "Curiosity & Inquiry Drive",
    color: "#4A90D9",
    description: "A drive to understand deeply. Asks the questions others don't think to ask.",
    detail:
      "Curiosity is the engine of learning. Your child's constant \"why\" usually isn't resistance. It is real engagement with the world, and it can be channeled into projects and topics they care about.",
  },
  narrative: {
    label: "Narrative & Verbal Intelligence",
    color: "#5BBCB4",
    description: "Understands the world through stories, words, and meaning-making.",
    detail:
      "Your child thinks in stories and can explain things with real depth out loud. This strength is often hidden behind trouble with writing: the story is there, and the mechanics may just need support.",
  },
};

// ─── Assessment state machine ─────────────────────────────────────────────────

type Phase = "welcome" | "questions" | "processing" | "results";

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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="mx-auto max-w-2xl space-y-8"
    >
      <div className="space-y-4">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-periwinkle-deep">
          Strengths Snapshot · 3 minutes
        </p>
        <h1 className="font-display text-[2.3rem] font-medium leading-[1.1] text-ink sm:text-5xl">
          What is your child good at?
        </h1>
        <p className="text-lg leading-relaxed text-ink-soft">
          Fifteen quick questions about how your child plays, learns, and handles
          frustration. At the end you&apos;ll see the strengths that stand out most.
        </p>
        <p className="text-[15px] leading-relaxed text-ink-soft">
          This is a reflection for parents, not a test or a diagnosis. There are no wrong
          answers, and nothing you choose is saved or sent anywhere.
        </p>
      </div>

      <dl className="grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-white text-center">
        {[
          { num: "15", label: "questions" },
          { num: "3", label: "minutes" },
          { num: "8", label: "strength areas" },
        ].map((item) => (
          <div key={item.label} className="px-2 py-4">
            <dt className="font-display text-2xl text-ink">{item.num}</dt>
            <dd className="text-[13px] text-ink-soft">{item.label}</dd>
          </div>
        ))}
      </dl>

      <button
        onClick={onStart}
        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-ink text-[16px] font-semibold text-white transition-colors hover:bg-[#123f82]"
      >
        Let&apos;s begin
        <ArrowRight className="h-5 w-5" />
      </button>
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
  const progress = (questionIndex / totalQuestions) * 100;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
      className="mx-auto max-w-2xl space-y-8"
    >
      <div className="space-y-2">
        <div className="flex justify-between text-[13px] text-ink-soft">
          <span>
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-sand">
          <motion.div
            className="h-full rounded-full bg-periwinkle"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>
      </div>

      <h2 className="font-display text-[1.75rem] leading-snug text-ink sm:text-3xl">{question.question}</h2>

      <div className="space-y-3" role="radiogroup" aria-label={question.question}>
        {question.choices.map((choice, i) => {
          const selected = selectedChoice === i;
          return (
            <button
              key={i}
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(i)}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border px-5 py-4 text-left text-[16px] leading-relaxed transition-colors duration-150",
                selected ? "border-ink bg-white text-ink" : "border-line bg-white text-ink-soft hover:border-ink/40 hover:text-ink"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  selected ? "border-ink bg-ink" : "border-line"
                )}
              >
                {selected && <Check className="h-3 w-3 text-white" />}
              </span>
              {choice.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex min-h-[44px] items-center gap-2 px-1 text-[15px] font-medium text-ink-soft hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={selectedChoice === null}
          className="flex min-h-[44px] items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#123f82] disabled:opacity-35"
        >
          {questionIndex === totalQuestions - 1 ? "See results" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

function ProcessingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto flex max-w-md flex-col items-center gap-6 py-16 text-center"
    >
      <div className="flex gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-3 w-3 rounded-full bg-periwinkle"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
      <p className="text-[16px] text-ink-soft">Putting your answers together...</p>
    </motion.div>
  );
}

function ResultsScreen({ results, onRetake }: { results: Results; onRetake: () => void }) {
  const [activeKey, setActiveKey] = useState<StrengthKey | null>(results.primary[0]);
  const maxScore = Math.max(...Object.values(results.scores));

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl space-y-10">
      <div className="space-y-3">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-periwinkle-deep">
          Your Strengths Snapshot
        </p>
        <h2 className="font-display text-[2.1rem] font-medium leading-tight text-ink sm:text-4xl">
          Here&apos;s what stood out about your child.
        </h2>
        <p className="text-[16px] text-ink-soft">Tap a strength to read more.</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-soft">Top strengths</h3>
        {results.primary.map((key) => {
          const meta = strengthMeta[key];
          const pct = maxScore > 0 ? (results.scores[key] / maxScore) * 100 : 0;
          const isActive = activeKey === key;
          return (
            <button
              key={key}
              onClick={() => setActiveKey(isActive ? null : key)}
              aria-expanded={isActive}
              className={cn(
                "w-full space-y-3 rounded-2xl border bg-white p-5 text-left transition-colors duration-150",
                isActive ? "border-ink" : "border-line hover:border-ink/40"
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-3">
                  <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: meta.color }} />
                  <span className="text-[16px] font-bold text-ink">{meta.label}</span>
                </span>
                <span className="h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-sand">
                  <motion.span
                    className="block h-full rounded-full"
                    style={{ backgroundColor: meta.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                  />
                </span>
              </div>
              <p className="text-[15px] leading-relaxed text-ink-soft">{meta.description}</p>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-line pt-3 text-[15px] leading-relaxed text-ink">{meta.detail}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-soft">Also showing up</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {results.secondary.map((key) => {
            const meta = strengthMeta[key];
            return (
              <div key={key} className="space-y-2 rounded-2xl bg-sand p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: meta.color }} />
                  <span className="text-[14px] font-semibold text-ink">{meta.label}</span>
                </div>
                <p className="text-[14px] leading-relaxed text-ink-soft">{meta.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl bg-ink p-6 sm:p-8">
        <p className="font-display text-xl leading-snug text-white sm:text-2xl">
          The same wiring that makes some things hard often comes with real strengths.
          Knowing them gives you, and your child, somewhere to build from.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-white/70">
          Want to talk through what you&apos;re seeing? Start with a free 10-minute call with Kelly.
        </p>
        <div className="no-print mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-ink hover:bg-periwinkle-wash"
          >
            Book a free 10-minute call
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            onClick={() => window.print()}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/25 px-6 text-[15px] font-semibold text-white hover:bg-white/10"
          >
            <Printer className="h-4 w-4" />
            Print or save as PDF
          </button>
        </div>
      </div>

      <div className="no-print flex justify-center">
        <button
          onClick={onRetake}
          className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-ink-soft hover:text-ink"
        >
          <RotateCcw className="h-4 w-4" />
          Start over
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
        setResults(calculateResults(answers));
        setPhase("results");
        window.scrollTo({ top: 0 });
      }, 1200);
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
    <div className="min-h-screen bg-cream">
      <header className="no-print fixed inset-x-0 top-0 z-50 border-b border-line bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="UnlockEd home">
            <Wordmark />
          </Link>
          <Link
            href="/"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink-soft hover:bg-sand hover:text-ink"
            aria-label="Close and return home"
          >
            <X className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <main className="px-5 pt-28 pb-20 sm:px-8 sm:pt-32">
        <AnimatePresence mode="wait" initial={false}>
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

          {phase === "results" && results && (
            <motion.div key="results">
              <ResultsScreen results={results} onRetake={handleRetake} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
