import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function AssessmentCTA() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="grid items-center gap-8 rounded-3xl bg-periwinkle-wash px-6 py-10 sm:px-12 sm:py-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-periwinkle-deep">
              Strengths Snapshot · 3 minutes
            </p>
            <h2 className="mt-3 font-display text-[1.9rem] leading-tight text-ink sm:text-[2.3rem]">
              Start with what your child is good at.
            </h2>
            <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              Fifteen quick questions about how your child plays, learns, and bounces back.
              You&apos;ll see the strengths that stand out. No email required.
            </p>
          </div>
          <div className="md:justify-self-end">
            <Link
              href="/assessment"
              className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-[#123f82] transition-colors"
            >
              Take the Strengths Snapshot
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <p className="mt-3 text-[13px] text-ink-soft">A reflection for parents, not a test or diagnosis.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
