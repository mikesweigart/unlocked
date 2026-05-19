"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  {
    label: "Learning Challenges",
    href: "#challenges",
    dropdown: [
      { label: "ADHD", href: "#challenges" },
      { label: "Dyslexia", href: "#challenges" },
      { label: "Executive Functioning", href: "#challenges" },
      { label: "Processing Challenges", href: "#challenges" },
    ],
  },
  { label: "Brain Strengths", href: "#strengths" },
  { label: "About", href: "#about" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-blue"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal to-blue flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span
              className={cn(
                "text-xl font-bold tracking-tight transition-colors duration-300",
                scrolled ? "text-navy" : "text-white"
              )}
            >
              Unlock<span className="text-teal">Ed</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 relative group py-2",
                    scrolled ? "text-navy hover:text-teal" : "text-white/90 hover:text-white"
                  )}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-0.5 bg-teal w-0 group-hover:w-full transition-all duration-300 rounded-full" />
                </a>
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-blue overflow-hidden"
                    >
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex items-center px-4 py-3 text-sm text-navy hover:bg-gray-blue hover:text-teal transition-colors duration-150"
                        >
                          {item.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="#assessment"
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                scrolled ? "text-navy hover:text-teal" : "text-white/90 hover:text-white"
              )}
            >
              Free Assessment
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-teal to-blue text-white text-sm font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
            >
              Schedule Consultation
            </a>
          </div>

          {/* Mobile menu button — min 44x44 touch target */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className={cn(
              "lg:hidden flex items-center justify-center w-11 h-11 rounded-xl transition-colors duration-200",
              scrolled ? "text-navy hover:bg-gray-blue" : "text-white hover:bg-white/10"
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-6 h-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-navy/70 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,100vw)] bg-white shadow-2xl lg:hidden flex flex-col"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-gray-blue shrink-0">
                <span className="text-xl font-bold text-navy">
                  Unlock<span className="text-teal">Ed</span>
                </span>
                <button
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="flex items-center justify-center w-11 h-11 rounded-xl text-navy/50 hover:text-navy hover:bg-gray-blue transition-colors duration-150"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center px-4 py-3.5 rounded-xl text-navy font-medium hover:bg-gray-blue hover:text-teal transition-colors duration-150 min-h-[52px]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="px-4 pb-6 pt-4 space-y-3 border-t border-gray-blue shrink-0">
                <a
                  href="#assessment"
                  onClick={closeMenu}
                  className="flex items-center justify-center w-full px-5 py-4 rounded-xl border-2 border-teal text-teal font-semibold hover:bg-teal hover:text-white transition-all duration-200 min-h-[52px]"
                >
                  Free Brain Strengths Assessment
                </a>
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="flex items-center justify-center w-full px-5 py-4 rounded-xl bg-gradient-to-r from-teal to-blue text-white font-semibold hover:shadow-lg transition-all duration-200 min-h-[52px]"
                >
                  Schedule Consultation
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
