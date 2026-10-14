"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Where do we start?",
    a: "Most families start with the free 10-minute phone consultation. It is a chance to share what's going on and figure out whether a Parent Clarity & Guidance Session, a screening, or something else makes the most sense as a first step.",
  },
  {
    q: "Do we need a diagnosis first?",
    a: "No. Many parents reach out because they simply sense their child needs help and aren't sure where to begin. Others already have a diagnosis and a stack of paperwork. Both are good places to start.",
  },
  {
    q: "What happens in a Parent Clarity & Guidance Session?",
    a: "The 50-minute session follows the HELP framework. Kelly hears your story, examines the interventions you've tried and any evaluations you have, walks you through resources and potential referrals, and helps you build a plan with concrete next steps.",
  },
  {
    q: "Can you help me understand my child's evaluation?",
    a: "Yes. Reviewing evaluations is part of the Parent Clarity Session. Bring the full report, including any school testing, and Kelly will help you understand what the scores mean and which questions to ask next.",
  },
  {
    q: "Is UnlockEd therapy?",
    a: "No. UnlockEd is an educational support agency. Kelly's background includes years as a child and family therapist, and that experience shapes how she works with families, but sessions focus on learning, school, and next steps. If your child would benefit from therapy, testing, or another specialist, she can talk with you about referrals.",
  },
  {
    q: "Does Kelly work with kids directly?",
    a: "Yes. Screenings and assessments, working memory training, and the Understanding My Strengths session are all done with your child or teen.",
  },
  {
    q: "Where are sessions held?",
    a: "Sessions are offered by video, or in person at offices in Peachtree Corners and Sandy Springs (Perimeter area).",
  },
  {
    q: "How much does it cost?",
    a: (
      <>
        The 10-minute phone consultation is free. For session fees, or if you aren&apos;t
        sure which service you need, call{" "}
        <a href={PHONE_HREF} className="font-semibold text-periwinkle-deep underline underline-offset-4">
          {PHONE_DISPLAY}
        </a>{" "}
        or email{" "}
        <a href={EMAIL_HREF} className="break-all font-semibold text-periwinkle-deep underline underline-offset-4">
          {EMAIL}
        </a>
        .
      </>
    ),
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <SectionHeading eyebrow="Questions" title="What parents usually ask first." />
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="divide-y divide-line border-y border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left min-h-[56px]"
                  >
                    <span className="text-[17px] font-semibold leading-snug text-ink sm:text-lg">{f.q}</span>
                    <Plus
                      className={cn(
                        "mt-1 h-5 w-5 shrink-0 text-periwinkle-deep transition-transform duration-200",
                        isOpen && "rotate-45"
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-ink-soft sm:text-[17px]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
