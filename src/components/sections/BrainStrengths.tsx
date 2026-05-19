"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface StrengthNode {
  id: string;
  label: string;
  shortLabel: string;
  x: number;
  y: number;
  color: string;
  glowColor: string;
  description: string;
  challenges: string[];
  howUnlockEd: string;
}

const strengths: StrengthNode[] = [
  {
    id: "creative",
    label: "Creative & Divergent Thinking",
    shortLabel: "Creative",
    x: 50, y: 12,
    color: "#4A90D9", glowColor: "rgba(74,144,217,0.4)",
    description: "Your child's mind naturally generates original ideas, finds unexpected connections, and thinks outside conventional boundaries. This is the strength behind innovation.",
    challenges: ["ADHD", "Dyslexia", "Learning Differences"],
    howUnlockEd: "We channel creative energy into structured projects and help teachers see divergent thinking as a gift, not a disruption.",
  },
  {
    id: "hyperfocus",
    label: "Deep Focus & Hyperfixation",
    shortLabel: "Hyperfocus",
    x: 82, y: 28,
    color: "#5BBCB4", glowColor: "rgba(91,188,180,0.4)",
    description: "When engaged, your child enters a state of extraordinary concentration. This capacity for deep focus is a superpower when channeled toward meaningful goals.",
    challenges: ["ADHD", "Autism-related learning"],
    howUnlockEd: "We identify topics that spark deep engagement and help build interest bridges to required curriculum.",
  },
  {
    id: "patterns",
    label: "Pattern Recognition & Systems Thinking",
    shortLabel: "Patterns",
    x: 88, y: 58,
    color: "#D4A853", glowColor: "rgba(212,168,83,0.4)",
    description: "Your child sees structures, relationships, and patterns that others miss. This analytical strength drives understanding of complex systems — from music to mathematics.",
    challenges: ["Dyslexia", "Processing Challenges"],
    howUnlockEd: "We leverage pattern thinking in all academic areas and develop strengths in STEM, music, and visual arts.",
  },
  {
    id: "emotional",
    label: "Emotional Intelligence & Empathy",
    shortLabel: "EQ & Empathy",
    x: 68, y: 82,
    color: "#E8877C", glowColor: "rgba(232,135,124,0.4)",
    description: "Your child possesses a heightened awareness of emotional currents — both their own and others'. This strength builds exceptional leaders, therapists, artists, and connectors.",
    challenges: ["Executive Functioning", "Processing Challenges"],
    howUnlockEd: "We build emotional vocabulary and regulation skills while affirming emotional intelligence as a core leadership strength.",
  },
  {
    id: "spatial",
    label: "Spatial & Visual Intelligence",
    shortLabel: "Spatial",
    x: 32, y: 82,
    color: "#B8A9D4", glowColor: "rgba(184,169,212,0.4)",
    description: "Your child thinks in images, dimensions, and spatial relationships. This strength powers architecture, engineering, design, and strategic thinking.",
    challenges: ["Dyslexia", "Learning Differences"],
    howUnlockEd: "We use visual-spatial approaches across all subjects and connect these strengths to real careers in design, engineering, and art.",
  },
  {
    id: "resilience",
    label: "Resilience & Adaptive Thinking",
    shortLabel: "Resilience",
    x: 12, y: 58,
    color: "#6BBF8A", glowColor: "rgba(107,191,138,0.4)",
    description: "Your child has developed extraordinary bounce-back capacity. Their ability to adapt, persist, and find new approaches is a strength many adults never develop.",
    challenges: ["All learning challenges"],
    howUnlockEd: "We build on existing resilience while teaching specific coping strategies that make challenges feel manageable.",
  },
  {
    id: "curiosity",
    label: "Curiosity & Inquiry Drive",
    shortLabel: "Curiosity",
    x: 18, y: 28,
    color: "#4A90D9", glowColor: "rgba(74,144,217,0.4)",
    description: "Your child's relentless questioning isn't defiance — it's a powerful drive to understand deeply. This strength fuels lifelong learning and discovery.",
    challenges: ["ADHD", "Executive Functioning"],
    howUnlockEd: "We reframe relentless questioning as intellectual strength and teach metacognitive skills that make curiosity productive.",
  },
  {
    id: "narrative",
    label: "Narrative & Verbal Intelligence",
    shortLabel: "Storytelling",
    x: 50, y: 50,
    color: "#5BBCB4", glowColor: "rgba(91,188,180,0.4)",
    description: "Your child understands the world through stories, words, and meaning-making. This strength powers communication, persuasion, writing, and leadership.",
    challenges: ["Dyslexia", "Memory Challenges"],
    howUnlockEd: "We harness oral storytelling strengths to build confidence while working on written expression through assistive strategies.",
  },
];

const connections: [string, string][] = [
  ["creative", "hyperfocus"], ["creative", "narrative"], ["creative", "spatial"],
  ["hyperfocus", "patterns"], ["patterns", "spatial"], ["emotional", "resilience"],
  ["emotional", "narrative"], ["curiosity", "creative"], ["curiosity", "patterns"],
  ["resilience", "curiosity"], ["narrative", "curiosity"], ["spatial", "patterns"],
];

function getNodeById(id: string) {
  return strengths.find((s) => s.id === id);
}

function isConnected(nodeId: string, activeId: string | null): boolean {
  if (!activeId) return false;
  if (nodeId === activeId) return true;
  return connections.some(([a, b]) => (a === activeId && b === nodeId) || (b === activeId && a === nodeId));
}

function StrengthInfoPanel({ strength, onClose }: { strength: StrengthNode; onClose: () => void }) {
  return (
    <motion.div
      key={strength.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: strength.color }}>
            Brain Strength
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
            {strength.label}
          </h3>
        </div>
        <button
          onClick={onClose}
          aria-label="Clear selection"
          className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors duration-150 shrink-0 mt-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-white/70 leading-relaxed text-sm sm:text-base">{strength.description}</p>

      <div className="space-y-2">
        <p className="text-xs font-bold text-white/40 uppercase tracking-wider">Often present with</p>
        <div className="flex flex-wrap gap-2">
          {strength.challenges.map((c) => (
            <span key={c} className="px-3 py-1 rounded-full text-xs font-medium text-white/80 bg-white/10 border border-white/15">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
        <p className="text-xs font-bold text-teal uppercase tracking-wider mb-2">How UnlockEd helps</p>
        <p className="text-white/70 text-sm leading-relaxed">{strength.howUnlockEd}</p>
      </div>

      <a
        href="#assessment"
        className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-[#7ecdc6] transition-colors duration-150"
      >
        Discover your child&apos;s strengths <ArrowRight className="w-4 h-4" />
      </a>
    </motion.div>
  );
}

function IdlePanel() {
  return (
    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full space-y-5">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
        The Same Wiring That Creates Challenges{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-gold">
          Also Creates Extraordinary Strengths.
        </span>
      </h3>
      <p className="text-white/65 leading-relaxed text-sm sm:text-base">
        Neuroplasticity means your brain changes and grows throughout life. These strengths
        can be trained and amplified with the right support.
      </p>
      <a
        href="#assessment"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-sm hover:shadow-lg transition-all duration-200"
      >
        Take the Free Brain Strengths Assessment
        <ArrowRight className="w-4 h-4" />
      </a>
    </motion.div>
  );
}

export default function BrainStrengths() {
  const { ref, isInView } = useScrollReveal(0.1);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeStrength = strengths.find((s) => s.id === activeId) ?? null;

  const toggle = (id: string) => setActiveId((prev) => (prev === id ? null : id));

  return (
    <section id="strengths" className="py-16 sm:py-24 bg-navy overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-10 sm:space-y-16"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-xs sm:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse shrink-0" />
              Interactive Brain Strengths Map
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Every Learner Has Strengths{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-gold">
                Waiting to Be Unlocked
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/65 leading-relaxed">
              Tap any node to explore a brain strength.
            </p>
          </motion.div>

          {/* SVG + desktop info panel */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start lg:items-center">
            {/* SVG constellation */}
            <div className="relative w-full max-w-sm sm:max-w-md mx-auto aspect-square">
              <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="Brain strengths constellation">
                {/* Connection lines */}
                {connections.map(([a, b]) => {
                  const nodeA = getNodeById(a);
                  const nodeB = getNodeById(b);
                  if (!nodeA || !nodeB) return null;
                  const active = activeId ? (a === activeId || b === activeId) : false;
                  return (
                    <motion.line
                      key={`${a}-${b}`}
                      x1={nodeA.x} y1={nodeA.y} x2={nodeB.x} y2={nodeB.y}
                      stroke={active ? nodeA.color : "rgba(255,255,255,0.08)"}
                      strokeWidth={active ? 0.7 : 0.3}
                      animate={{ opacity: activeId ? (active ? 1 : 0.12) : 0.5 }}
                      transition={{ duration: 0.3 }}
                    />
                  );
                })}

                {/* Nodes — with large invisible hit area for touch */}
                {strengths.map((node) => {
                  const connected = isConnected(node.id, activeId);
                  const isActive = node.id === activeId;
                  const dimmed = !!(activeId && !connected);
                  return (
                    <g key={node.id} onClick={() => toggle(node.id)} style={{ cursor: "pointer" }}>
                      {/* Invisible touch target — 10 unit radius covers ~44px on a 400px SVG */}
                      <circle cx={node.x} cy={node.y} r={10} fill="transparent" />

                      {/* Pulse ring */}
                      {isActive && (
                        <motion.circle
                          cx={node.x} cy={node.y} r={6}
                          fill="none" stroke={node.color} strokeWidth={0.5}
                          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}

                      {/* Node dot */}
                      <motion.circle
                        cx={node.x} cy={node.y}
                        r={isActive ? 4.5 : 3.2}
                        fill={node.color}
                        animate={{ opacity: dimmed ? 0.2 : 1 }}
                        transition={{ duration: 0.25 }}
                        style={{ filter: isActive ? `drop-shadow(0 0 4px ${node.glowColor})` : "none" }}
                      />

                      {/* Label */}
                      <motion.text
                        x={node.x}
                        y={node.y + (node.y < 50 ? -7 : 8.5)}
                        textAnchor="middle"
                        fontSize="3.6"
                        fontWeight="600"
                        fill="white"
                        animate={{ opacity: dimmed ? 0.12 : 0.85 }}
                        transition={{ duration: 0.25 }}
                        className="select-none pointer-events-none"
                      >
                        {node.shortLabel}
                      </motion.text>
                    </g>
                  );
                })}
              </svg>

              {!activeId && (
                <p className="absolute -bottom-6 left-0 right-0 text-center text-white/35 text-xs">
                  Tap any node to explore
                </p>
              )}
            </div>

            {/* Desktop info panel (hidden on mobile — shown below instead) */}
            <div className="hidden lg:flex min-h-[320px] items-center">
              <AnimatePresence mode="wait">
                {activeStrength
                  ? <StrengthInfoPanel key={activeStrength.id} strength={activeStrength} onClose={() => setActiveId(null)} />
                  : <IdlePanel key="idle" />
                }
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Mobile info panel — slides in below SVG when a node is active */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              {activeStrength ? (
                <StrengthInfoPanel key={activeStrength.id} strength={activeStrength} onClose={() => setActiveId(null)} />
              ) : (
                <motion.div key="mobile-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Tap grid for mobile */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {strengths.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => toggle(s.id)}
                        className="text-left p-3.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-colors duration-150 min-h-[60px]"
                      >
                        <span className="block w-2 h-2 rounded-full mb-2" style={{ backgroundColor: s.color }} />
                        <span className="text-xs font-semibold text-white/75">{s.shortLabel}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6">
                    <IdlePanel />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
