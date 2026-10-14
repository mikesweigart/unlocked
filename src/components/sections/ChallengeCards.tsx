"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import BookButton from "@/components/ui/BookButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

type Difference = {
  id: string;
  name: string;
  line: string;
  about: string;
  signs: string[];
  strengths: string[];
  helps: string[];
};

const differences: Difference[] = [
  {
    id: "dyslexia",
    name: "Dyslexia",
    line: "A different way of processing written language. Not a vision problem, and not a lack of intelligence.",
    about:
      "Dyslexia is a language-based learning difference that mainly affects reading, spelling, and decoding words. Many people with dyslexia are strong big-picture thinkers and storytellers.",
    signs: [
      "Trouble sounding out words or remembering sight words",
      "Reading is slow and tiring compared with peers",
      "Spelling that seems to change from day to day",
      "Strong spoken vocabulary that doesn't show up in writing",
    ],
    strengths: [
      "Big-picture and creative thinking",
      "Strong oral storytelling and reasoning",
      "Visual and spatial thinking",
    ],
    helps: [
      "Structured, multisensory reading instruction such as Orton-Gillingham",
      "Audiobooks and text-to-speech tools",
      "Accommodations such as extended time",
    ],
  },
  {
    id: "adhd",
    name: "ADHD",
    line: "Attention that works on interest and urgency, which makes ordinary tasks feel much harder.",
    about:
      "ADHD affects attention, activity level, and impulse control. Children with ADHD can often focus deeply on what interests them and struggle to start or finish what doesn't.",
    signs: [
      "Hard to start or stay with non-preferred tasks",
      "Acting or speaking before thinking",
      "Losing track of time and belongings",
      "Big energy and big feelings",
    ],
    strengths: ["Curiosity and enthusiasm", "Creative, out-of-the-box ideas", "Deep focus on topics they love"],
    helps: [
      "Clear structure, visual timers, and checklists",
      "Movement breaks",
      "Breaking work into short, visible steps",
    ],
  },
  {
    id: "language",
    name: "Language-based learning",
    line: "When understanding or producing language takes more effort than it should.",
    about:
      "Language-based learning difficulties can affect listening, speaking, reading, and writing. They often overlap with dyslexia and can be easy to miss in a bright, verbal child.",
    signs: [
      "Trouble following spoken directions",
      "Difficulty organizing thoughts in writing",
      "Word-finding pauses or vague language",
      "Reading comprehension lagging behind decoding",
    ],
    strengths: ["Often strong visual or hands-on learners", "Creativity in non-verbal areas", "Persistence"],
    helps: [
      "Written directions alongside spoken ones",
      "Graphic organizers for writing",
      "Explicit vocabulary instruction",
    ],
  },
  {
    id: "executive",
    name: "Executive functioning",
    line: "The planning, organizing, and self-starting skills school assumes kids already have.",
    about:
      "Executive functions are the mental skills behind planning, starting tasks, managing time, and shifting gears. They develop over time, and they can be supported and taught.",
    signs: [
      "Knows the material but doesn't turn work in",
      "Big projects feel impossible to start",
      "Messy backpack, missing assignments",
      "Melts down when plans change",
    ],
    strengths: ["Creative when given structure", "Strong in-the-moment problem solving", "Often deeply empathetic"],
    helps: [
      "External supports like planners and reminders",
      "Routines that stay consistent",
      "Coaching on breaking tasks down",
    ],
  },
  {
    id: "memory",
    name: "Working memory",
    line: "The mental workspace for holding and using information right now.",
    about:
      "Working memory lets us keep a few things in mind while we use them, like a phone number while dialing or the steps of a math problem. When it's limited, school gets harder in ways that are easy to misread.",
    signs: [
      "Forgets directions partway through",
      "Loses their place while reading",
      "Struggles with multi-step math",
      "Seems distracted or \"spacey\"",
    ],
    strengths: ["Long-term memory for meaningful things", "Hands-on learning", "Creative thinking"],
    helps: [
      "Working memory training such as Cogmed",
      "Chunking information into smaller pieces",
      "Visual reminders and written steps",
    ],
  },
  {
    id: "processing",
    name: "Processing speed",
    line: "Thinking that is careful and thorough, and slower than the classroom clock.",
    about:
      "Processing speed is how quickly a child takes in information and responds. A slower pace is not a measure of intelligence, but timed work and fast-moving lessons can make it look that way.",
    signs: [
      "Needs extra time to answer questions",
      "Falls behind when copying notes",
      "Runs out of time on tests",
      "Works hard and still finishes last",
    ],
    strengths: ["Thoughtful, accurate work", "Attention to detail", "Depth over speed"],
    helps: ["Extended time", "Copies of notes", "Fewer, more focused problems"],
  },
];

function DifferenceModal({ item, onClose }: { item: Difference; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`diff-${item.id}`}
    >
      <div className="absolute inset-0 bg-ink/50" />
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88vh] w-full overflow-y-auto rounded-t-3xl bg-cream sm:max-w-2xl sm:rounded-3xl"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-line bg-cream px-6 py-5 sm:px-8">
          <div>
            <h3 id={`diff-${item.id}`} className="font-display text-2xl text-ink">
              {item.name}
            </h3>
            <p className="mt-1 text-[15px] leading-snug text-ink-soft">{item.line}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink hover:bg-sand"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-7 px-6 py-6 sm:px-8 sm:py-8">
          <p className="text-[16px] leading-relaxed text-ink">{item.about}</p>
          {[
            { title: "What parents often notice", list: item.signs },
            { title: "Strengths that often come with it", list: item.strengths },
            { title: "What tends to help", list: item.helps },
          ].map((block) => (
            <div key={block.title}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-periwinkle-deep">
                {block.title}
              </p>
              <ul className="mt-3 space-y-2">
                {block.list.map((li) => (
                  <li key={li} className="flex gap-3 text-[16px] leading-relaxed text-ink-soft">
                    <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-periwinkle" />
                    {li}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-[14px] italic text-ink-soft">
            Every child is different, and only a qualified evaluator can diagnose a learning
            difference. This is a starting point for a conversation.
          </p>
          <BookButton className="w-full sm:w-auto">Talk with Kelly about {item.name.toLowerCase()}</BookButton>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ChallengeCards() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = differences.find((d) => d.id === openId) ?? null;

  return (
    <section id="challenges" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Outside-the-box learners"
            title="The same wiring that makes school hard often comes with real strengths."
            intro={<p>A plain-language look at the learning differences Kelly sees most often.</p>}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differences.map((d, i) => (
            <Reveal key={d.id} delay={(i % 3) * 0.05} className="h-full">
              <button
                onClick={() => setOpenId(d.id)}
                className="group flex h-full w-full flex-col rounded-3xl border border-line bg-white p-6 text-left transition-colors duration-200 hover:border-ink/30"
              >
                <h3 className="font-display text-[1.45rem] text-ink">{d.name}</h3>
                <p className="mt-2 flex-1 text-[16px] leading-relaxed text-ink-soft">{d.line}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-periwinkle-deep">
                  Read more
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>{open && <DifferenceModal item={open} onClose={() => setOpenId(null)} />}</AnimatePresence>
    </section>
  );
}
