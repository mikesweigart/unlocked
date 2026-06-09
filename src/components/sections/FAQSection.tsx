"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "Getting Started",
    q: "What exactly happens in the free consultation?",
    a: "It's a 30-minute clarity call — no intake paperwork, no clinical assessment, no pressure. We talk through where your family is right now: what you're seeing, what's been tried, and where the confusion lives. By the end, you'll have at minimum one specific insight and a clear sense of whether working together makes sense. Most parents tell us it's the most useful 30 minutes they've had since the diagnosis.",
  },
  {
    category: "Getting Started",
    q: "Do we need a diagnosis to get started?",
    a: "No — and this matters. Many of the families we work with are in the 'suspected but searching' phase. You don't need a formal diagnosis to begin. You need a guide who can help you make sense of what you're observing and find the language for it. We work with you exactly where you are.",
  },
  {
    category: "Getting Started",
    q: "What ages do you work with?",
    a: "We support learners from early elementary through high school — typically ages 5 through 18. We have specific depth in the teenage years, where the stakes around identity, college preparation, and self-advocacy are highest and the window for the easiest change is narrowing.",
  },
  {
    category: "Services & Approach",
    q: "Is this therapy? Do we still need our current providers?",
    a: "UnlockEd is educational consulting and cognitive coaching — not clinical therapy. We work alongside your existing team, not instead of them. If you have a therapist, tutor, or psychiatrist, we become the guide who bridges the gap between their recommendations and what actually happens at home and school. We help you understand what everyone is telling you and build a coordinated plan around it.",
  },
  {
    category: "Services & Approach",
    q: "What makes this different from a tutor or educational therapist?",
    a: "Most tutors focus on the subject. Educational therapists focus on the learner. UnlockEd does both — and adds something rarely offered: we help the entire family system shift, not just the student. We also integrate Cogmed working memory training, which has 120+ peer-reviewed studies behind it and produces gains that generalize into real life, not just the training tasks.",
  },
  {
    category: "Services & Approach",
    q: "Do you work virtually?",
    a: "Yes. All sessions are available virtually, which means families across the country can access support. We've found that virtual sessions are often more comfortable for kids and teens than office settings — and the outcomes are equally strong.",
  },
  {
    category: "Results & Timeline",
    q: "How long until we see results?",
    a: "Evidence-based educational support typically produces meaningful shifts within the first few sessions — usually in how families understand and respond to behaviors at home. Measurable academic or behavioral improvement is generally expected within 4–8 weeks of consistent engagement. The timeline on this page gives you an honest, milestone-by-milestone picture of what that journey looks like.",
  },
  {
    category: "Investment",
    q: "How much does it cost?",
    a: "The first consultation is completely free, with no commitment attached. Ongoing support programs are discussed during that first call and structured around what your family actually needs — not a one-size package. We're direct about pricing and won't waste your time if it's not the right fit.",
  },
  {
    category: "Investment",
    q: "Do you take insurance?",
    a: "We don't bill insurance directly. However, many families use FSA or HSA funds for educational support services, and some are able to seek partial reimbursement. We're happy to provide documentation that supports those requests. Ask us about this during your first call.",
  },
  {
    category: "Investment",
    q: "Can you help with IEP meetings and school advocacy?",
    a: "Yes — and this is a core part of what we do. We prepare you for IEP meetings with a clear script, specific accommodation language, and the confidence to advocate for what your child is legally entitled to. Many parents reach out to us specifically because they've left too many meetings feeling overwhelmed and unheard.",
  },
];

const categories = [...new Set(faqs.map((f) => f.category))];

export default function FAQSection() {
  const { ref, isInView } = useScrollReveal(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="py-16 sm:py-24 bg-off-white border-b border-gray-blue">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-10 sm:space-y-14"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 text-navy text-sm font-semibold">
              <HelpCircle className="w-4 h-4 text-teal" />
              Questions We Hear Every Day
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-tight">
              Real Answers.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue">
                No Runaround.
              </span>
            </h2>
            <p className="text-navy/60 text-sm sm:text-base leading-relaxed">
              These are the questions parents ask us most often — before the first call,
              during the first call, and after. We believe you deserve direct answers.
            </p>
          </motion.div>

          {/* Category filter */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200",
                  activeCategory === cat
                    ? "bg-navy text-white shadow-md"
                    : "bg-white border border-gray-blue text-navy/60 hover:border-navy/30 hover:text-navy"
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* FAQ accordion */}
          <motion.div variants={staggerContainer} className="space-y-2">
            {filtered.map((faq, i) => {
              const globalIndex = faqs.indexOf(faq);
              const isOpen = openIndex === globalIndex;
              return (
                <motion.div
                  key={globalIndex}
                  variants={fadeUp}
                  className={cn(
                    "rounded-2xl border-2 overflow-hidden transition-all duration-300",
                    isOpen
                      ? "border-teal/30 bg-white shadow-md"
                      : "border-gray-blue bg-white hover:border-gray-mid hover:shadow-sm"
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start justify-between gap-4 min-h-[56px]"
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-teal uppercase tracking-wider">
                        {faq.category}
                      </p>
                      <p className="font-bold text-navy text-sm sm:text-base leading-snug">
                        {faq.q}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 mt-1"
                    >
                      <ChevronDown className={cn("w-5 h-5 transition-colors duration-200", isOpen ? "text-teal" : "text-navy/30")} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 border-t border-gray-blue">
                          <p className="text-navy/70 text-sm sm:text-base leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="text-center space-y-3 bg-white rounded-2xl p-6 sm:p-8 border border-gray-blue"
          >
            <p className="text-navy font-bold text-base sm:text-lg">
              Still have a question we didn&apos;t answer?
            </p>
            <p className="text-navy/55 text-sm leading-relaxed">
              Ask us directly in the consultation request form — we read every message personally.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold text-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 min-h-[44px]"
            >
              Schedule the Free Consultation
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
