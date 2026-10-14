"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BookButton from "@/components/ui/BookButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type Index = {
  id: string;
  short: string;
  name: string;
  score: number;
  range: string;
  meaning: string;
  atSchool: string;
  lookFor: string;
};

const indices: Index[] = [
  {
    id: "vci",
    short: "VCI",
    name: "Verbal Comprehension",
    score: 112,
    range: "High Average",
    meaning: "How well your child understands and uses language: vocabulary, verbal reasoning, and putting ideas into words.",
    atSchool: "Often a real strength. It shows up in class discussion, explaining ideas out loud, and subjects rich in vocabulary.",
    lookFor: "A strong verbal score next to lower memory or speed scores is the classic \"clearly bright, still struggling\" profile, and it is worth understanding clearly before a school meeting.",
  },
  {
    id: "fri",
    short: "FRI",
    name: "Fluid Reasoning",
    score: 105,
    range: "Average",
    meaning: "The ability to solve new problems with logic, without relying on facts already learned.",
    atSchool: "Supports math reasoning, spotting patterns, and picking up new concepts.",
    lookFor: "When reasoning is solid but processing is slow, a child may understand far more than their test grades show.",
  },
  {
    id: "wmi",
    short: "WMI",
    name: "Working Memory",
    score: 87,
    range: "Low Average",
    meaning: "How much information your child can hold in mind and work with at once, like a mental whiteboard.",
    atSchool: "Affects multi-step directions, mental math, reading comprehension, and keeping up with fast-moving lessons.",
    lookFor: "Lower working memory often explains homework battles and \"they forgot what I said.\" It is also one of the skills targeted by working memory training.",
  },
  {
    id: "psi",
    short: "PSI",
    name: "Processing Speed",
    score: 79,
    range: "Very Low",
    meaning: "How quickly your child takes in simple information and responds, often on timed paper-and-pencil tasks.",
    atSchool: "Shows up on timed tests, copying from the board, and note-taking. It is easily mistaken for a lack of effort.",
    lookFor: "Slow processing next to strong reasoning is a common reason families ask about accommodations like extended time.",
  },
  {
    id: "fsiq",
    short: "FSIQ",
    name: "Full Scale IQ",
    score: 94,
    range: "Average",
    meaning: "One overall number that combines all the areas above.",
    atSchool: "On its own, it says little about how your child actually learns, because it averages strengths and weaknesses together.",
    lookFor: "When the index scores are far apart, the overall number can hide the real story. The pattern matters more than the total.",
  },
  {
    id: "ach",
    short: "ACH",
    name: "Academic Achievement",
    score: 82,
    range: "Low Average",
    meaning: "Your child's current reading, writing, and math skills compared with same-age peers.",
    atSchool: "This is where the day-to-day struggle usually becomes visible.",
    lookFor: "A gap between ability scores and achievement scores is often central to conversations about school support.",
  },
];

export default function EvaluationGuide() {
  const [activeId, setActiveId] = useState<string>("wmi");
  const active = indices.find((i) => i.id === activeId) ?? indices[0];

  return (
    <section id="evaluations" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Understanding evaluations"
            title="That evaluation on your kitchen counter is a map. It just isn't written for parents."
            intro={
              <p>
                Psychological and educational evaluations are long and full of scores and
                clinical language. Reviewing your child&apos;s evaluation with you, and
                explaining what it means in plain English, is part of every Parent Clarity
                Session. Here is a small example of what that looks like.
              </p>
            }
          />
        </Reveal>

        <Reveal className="mt-12">
          <div className="rounded-3xl border border-line bg-cream p-4 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2 px-1">
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Sample score profile
              </p>
              <p className="text-[13px] text-ink-soft">Not a real child. Tap a score.</p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
              {indices.map((idx) => {
                const isActive = idx.id === activeId;
                return (
                  <button
                    key={idx.id}
                    onClick={() => setActiveId(idx.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "rounded-2xl border px-4 py-4 text-left transition-colors duration-200 min-h-[44px]",
                      isActive
                        ? "border-ink bg-ink text-white"
                        : "border-line bg-white text-ink hover:border-ink/40"
                    )}
                  >
                    <span className={cn("block text-[12px] font-semibold tracking-[0.1em]", isActive ? "text-periwinkle" : "text-ink-soft")}>
                      {idx.short}
                    </span>
                    <span className="mt-1 block font-display text-3xl tabular-nums">{idx.score}</span>
                    <span className={cn("mt-1 block text-[13px] leading-snug", isActive ? "text-white/80" : "text-ink-soft")}>
                      {idx.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="mt-4 grid gap-4 rounded-2xl bg-white p-6 sm:p-8 md:grid-cols-3"
                aria-live="polite"
              >
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-periwinkle-deep">
                    {active.name} · {active.range}
                  </p>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink">{active.meaning}</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    How it can show up at school
                  </p>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{active.atSchool}</p>
                </div>
                <div className="rounded-xl bg-periwinkle-wash p-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-periwinkle-deep">
                    What Kelly looks at
                  </p>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink">{active.lookFor}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
          <BookButton>Book a session to review your evaluation</BookButton>
          <p className="text-[15px] text-ink-soft">Bring the full report, including any school testing.</p>
        </Reveal>
      </div>
    </section>
  );
}
