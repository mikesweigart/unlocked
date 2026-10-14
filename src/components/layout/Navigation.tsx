"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { BOOKING_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About Kelly", href: "/#about" },
  { label: "How it works", href: "/#help" },
  { label: "Services", href: "/#services" },
  { label: "Resources", href: "/#resources" },
  { label: "FAQ", href: "/#faq" },
];

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image src="/unlocked-mark.png" alt="" width={36} height={36} className="h-9 w-9" />
      <span className="text-[1.35rem] font-bold tracking-tight leading-none text-ink">
        Unlock<span className="text-periwinkle">Ed</span>
      </span>
    </span>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "no-print fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 border-b",
          scrolled ? "bg-cream/95 backdrop-blur-md border-line" : "bg-cream border-transparent"
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="UnlockEd home" className="shrink-0">
            <Wordmark />
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[15px] font-medium text-ink-soft hover:text-ink transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <a
              href={PHONE_HREF}
              className="text-[15px] font-medium text-ink-soft hover:text-ink transition-colors"
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-[#123f82] transition-colors"
            >
              Book a session
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-sand transition-colors"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] bottom-0 z-40 bg-cream lg:hidden overflow-y-auto"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <nav className="px-5 pt-4 pb-8" aria-label="Mobile">
              <ul className="divide-y divide-line border-y border-line">
                {[...navLinks, { label: "Strengths Snapshot (3 min)", href: "/assessment" }].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-[56px] items-center font-display text-xl text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-ink font-semibold text-white"
                >
                  Book a session
                </a>
                <a
                  href={PHONE_HREF}
                  className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-ink/20 font-semibold text-ink"
                >
                  <Phone className="h-4 w-4" />
                  Call {PHONE_DISPLAY}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
