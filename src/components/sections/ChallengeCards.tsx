"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { X, ChevronRight, Zap, BookOpen, Compass, Cpu, Eye, Puzzle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Challenge {
  id: string;
  name: string;
  shortName: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  tagline: string;
  description: string;
  signs: string[];
  strengths: string[];
  whatHelps: string[];
}

const challenges: Challenge[] = [
  {
    id: "adhd",
    name: "Attention Deficit Hyperactivity Disorder",
    shortName: "ADHD",
    icon: Zap,
    color: "text-blue",
    bgColor: "bg-blue/10",
    tagline: "A brain wired for curiosity, creativity, and intensity.",
    description:
      "ADHD isn't a focus problem — it's an interest-based nervous system. When engaged, ADHD brains can hyperfocus for hours. The key is understanding what drives engagement.",
    signs: [
      "Difficulty sustaining attention on non-preferred tasks",
      "Impulsivity — acting before thinking",
      "Restlessness or constant movement",
      "Difficulty with time perception and transitions",
      "High energy and enthusiasm for interesting topics",
    ],
    strengths: [
      "Extraordinary creativity and divergent thinking",
      "Hyperfocus on topics of genuine interest",
      "High energy and enthusiasm",
      "Entrepreneurial mindset and risk tolerance",
      "Ability to thrive in fast-paced environments",
    ],
    whatHelps: [
      "Interest-based learning and gamification",
      "Movement breaks between tasks",
      "External structure and visual timers",
      "Strengths-based goal setting",
    ],
  },
  {
    id: "dyslexia",
    name: "Dyslexia",
    shortName: "Dyslexia",
    icon: BookOpen,
    color: "text-teal",
    bgColor: "bg-teal/10",
    tagline: "A different reading pathway — with extraordinary pattern recognition.",
    description:
      "Dyslexia is a language processing difference, not a vision problem or lack of intelligence. Many of the world's most innovative thinkers are dyslexic.",
    signs: [
      "Difficulty decoding words and spelling",
      "Reading is slower or more labored than peers",
      "Challenges with phonological awareness",
      "Difficulty remembering sequences",
      "Strong oral communication despite written challenges",
    ],
    strengths: [
      "Exceptional 3D spatial and visual thinking",
      "Big-picture and systems-level thinking",
      "Strong narrative and storytelling ability",
      "Pattern recognition across complex domains",
      "Creative problem solving and innovation",
    ],
    whatHelps: [
      "Multisensory reading instruction (Orton-Gillingham)",
      "Audiobooks and text-to-speech tools",
      "Extended time and reduced written demands",
      "Strengths-focused classroom environments",
    ],
  },
  {
    id: "executive-functioning",
    name: "Executive Functioning Challenges",
    shortName: "Executive Functioning",
    icon: Compass,
    color: "text-gold",
    bgColor: "bg-gold/10",
    tagline: "The brain's command center — trainable with the right scaffolding.",
    description:
      "Executive functions are the mental skills that help us plan, focus, remember, and manage time. When they're underdeveloped, daily tasks feel impossibly hard — but these skills can be built.",
    signs: [
      "Difficulty starting tasks (initiation)",
      "Poor time management and planning",
      "Forgetfulness and losing things",
      "Difficulty shifting between tasks",
      "Emotional regulation challenges",
    ],
    strengths: [
      "Deep creativity when structure is provided",
      "Strong empathy and emotional intelligence",
      "Ability to think outside conventional frameworks",
      "Persistence when genuinely motivated",
      "Excellent problem-solving in preferred domains",
    ],
    whatHelps: [
      "External scaffolding (checklists, timers, reminders)",
      "Breaking tasks into smaller, visible steps",
      "Consistent routines with flexibility",
      "Coaching around self-monitoring skills",
    ],
  },
  {
    id: "processing",
    name: "Processing Speed & Auditory Processing",
    shortName: "Processing Challenges",
    icon: Cpu,
    color: "text-lavender",
    bgColor: "bg-lavender/10",
    tagline: "Depth over speed — quality of thinking, not quantity.",
    description:
      "Processing differences mean information arrives or gets processed at a different pace. This isn't about intelligence — many deep thinkers process slowly because they consider more.",
    signs: [
      "Needs more time to respond to questions",
      "Difficulty keeping up in fast-paced classrooms",
      "Mishears words or loses track of verbal instructions",
      "Feels 'foggy' when overwhelmed",
      "Performs better with written than verbal instructions",
    ],
    strengths: [
      "Deep, thorough thinking before responding",
      "Exceptional memory when given time to process",
      "Strong focus on accuracy and quality",
      "Creative connections made through slow processing",
      "Attention to detail and nuance",
    ],
    whatHelps: [
      "Additional processing time in all settings",
      "Written instructions alongside verbal",
      "Preferential seating and reduced auditory distractions",
      "Assistive technology for note-taking",
    ],
  },
  {
    id: "memory",
    name: "Memory & Attention Challenges",
    shortName: "Memory & Attention",
    icon: Eye,
    color: "text-coral",
    bgColor: "bg-coral/10",
    tagline: "Working memory can be trained — and the research is remarkable.",
    description:
      "Working memory is the brain's mental whiteboard — where we hold and manipulate information in real time. When it's limited, multi-step instructions, math, and reading comprehension all become harder. Crucially, it's one of the few cognitive capacities that is directly trainable.",
    signs: [
      "Forgetting instructions before completing them",
      "Losing place while reading",
      "Difficulty with multi-step math problems",
      "Appearing 'spacey' or distracted",
      "Strong understanding in the moment but poor recall later",
    ],
    strengths: [
      "Procedural and muscle memory often unaffected",
      "Long-term memory for meaningful experiences",
      "Storytelling and narrative recall",
      "Physical and hands-on learning",
      "Emotional memory — deep recall of meaningful events",
    ],
    whatHelps: [
      "Targeted working memory training — evidence-based, directly trainable",
      "Chunking information into smaller pieces",
      "Multi-sensory encoding strategies",
      "Written reminders and visual systems",
    ],
  },
  {
    id: "learning-differences",
    name: "General Learning Differences",
    shortName: "Learning Differences",
    icon: Puzzle,
    color: "text-green",
    bgColor: "bg-green/10",
    tagline: "Different isn't less — it's a different path to the same destination.",
    description:
      "Every learner is unique. Some children don't fit neatly into one category — they have a constellation of differences and strengths that require individualized support.",
    signs: [
      "Inconsistent performance across subjects",
      "Strength in some areas paired with significant challenges in others",
      "High effort with lower output than expected",
      "Frustration with school despite obvious intelligence",
      "Anxiety around academic performance",
    ],
    strengths: [
      "Often highly creative and innovative",
      "Strong interpersonal and emotional skills",
      "Resilience from navigating challenges",
      "Unique perspective and thinking style",
      "Intrinsic motivation in areas of passion",
    ],
    whatHelps: [
      "Individualized learning plans",
      "Strength-based goal setting",
      "Therapeutic support for anxiety",
      "Connected, caring relationships with educators",
    ],
  },
];

interface CardProps {
  challenge: Challenge;
  onOpen: (id: string) => void;
}

function ChallengeCard({ challenge, onOpen }: CardProps) {
  const Icon = challenge.icon;
  return (
    <motion.button
      variants={fadeUp}
      whileHover={{ y: -4, boxShadow: "0 12px 40px -8px rgba(27,42,74,0.18)" }}
      transition={{ duration: 0.25 }}
      onClick={() => onOpen(challenge.id)}
      className="group w-full text-left bg-white rounded-2xl p-6 border border-gray-blue shadow-sm hover:border-teal/30 transition-colors duration-200 cursor-pointer"
    >
      <div className="space-y-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", challenge.bgColor)}>
          <Icon className={cn("w-6 h-6", challenge.color)} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-navy">{challenge.shortName}</h3>
          <p className="text-sm text-navy/60 mt-1 leading-relaxed">{challenge.tagline}</p>
        </div>
        <div className="flex items-center gap-1 text-teal text-sm font-medium group-hover:gap-2 transition-all duration-200">
          Learn more <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </motion.button>
  );
}

interface ModalProps {
  challenge: Challenge;
  onClose: () => void;
}

function ChallengeModal({ challenge, onClose }: ModalProps) {
  const Icon = challenge.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col sm:items-center sm:justify-center sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" />

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
        onClick={(e) => e.stopPropagation()}
        className="relative mt-auto sm:mt-0 bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Drag handle — mobile only */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-navy/20" />
        </div>

        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl sm:rounded-t-3xl border-b border-gray-blue px-5 sm:px-6 py-4 sm:py-5 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={cn("w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0", challenge.bgColor)}>
              <Icon className={cn("w-5 h-5 sm:w-6 sm:h-6", challenge.color)} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-navy">{challenge.shortName}</h2>
              <p className="text-xs sm:text-sm text-navy/60 leading-snug">{challenge.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl text-navy/50 hover:text-navy hover:bg-gray-blue transition-colors duration-150 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 sm:px-6 py-5 sm:py-6 space-y-6 sm:space-y-8">
          <p className="text-navy/70 leading-relaxed text-sm sm:text-base">{challenge.description}</p>

          {/* Common signs */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-navy uppercase tracking-wider">Common Signs</h3>
            <ul className="space-y-2">
              {challenge.signs.map((sign) => (
                <motion.li
                  key={sign}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3 text-sm text-navy/70"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-coral mt-2 shrink-0" />
                  {sign}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Hidden strengths */}
          <div className="bg-teal/5 rounded-2xl p-4 sm:p-5 space-y-3 border border-teal/15">
            <h3 className="text-xs sm:text-sm font-bold text-teal uppercase tracking-wider">Hidden Strengths</h3>
            <ul className="space-y-2">
              {challenge.strengths.map((s) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3 text-sm text-navy/70"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal mt-2 shrink-0" />
                  {s}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* What helps */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-navy uppercase tracking-wider">What Helps</h3>
            <ul className="space-y-2">
              {challenge.whatHelps.map((h) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3 text-sm text-navy/70"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue mt-2 shrink-0" />
                  {h}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="pt-1">
            <a
              href="#contact"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold hover:shadow-lg transition-all duration-200 min-h-[52px]"
            >
              Talk to us about {challenge.shortName}
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ChallengeCards() {
  const { ref, isInView } = useScrollReveal();
  const [openId, setOpenId] = useState<string | null>(null);
  const openChallenge = challenges.find((c) => c.id === openId) ?? null;

  return (
    <section id="challenges" className="py-16 sm:py-24 bg-off-white">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 text-navy text-sm font-semibold">
              <Puzzle className="w-4 h-4 text-teal" />
              Understanding Learning Challenges
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-tight">
              Every Challenge Has{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue">
                Hidden Strengths
              </span>
            </h2>
            <p className="text-base sm:text-lg text-navy/65 leading-relaxed">
              Tap any card to explore the science behind the diagnosis — and discover
              the remarkable strengths that come with it.
            </p>
          </motion.div>

          {/* Cards grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {challenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onOpen={setOpenId}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openChallenge && (
          <ChallengeModal
            challenge={openChallenge}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
