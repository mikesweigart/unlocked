import Image from "next/image";
import { Phone } from "lucide-react";
import BookButton from "@/components/ui/BookButton";
import Reveal from "@/components/ui/Reveal";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-cream pt-[104px] pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <div className="mb-6 flex items-center gap-3 lg:hidden">
            <Image
              src="/kelly-moore.jpg"
              alt=""
              width={96}
              height={96}
              className="h-12 w-12 rounded-full object-cover object-[50%_25%]"
            />
            <p className="text-[14px] leading-tight text-ink-soft">
              <span className="block font-semibold text-ink">Kelly Moore</span>
              Founder of UnlockEd
            </p>
          </div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-periwinkle-deep">
            Turning learning abilities into action
          </p>

          <h1 className="mt-5 font-display text-[2.5rem] leading-[1.08] tracking-[-0.015em] text-ink sm:text-[3.4rem] lg:text-[3.9rem] font-medium">
            Your child learns differently.{" "}
            <span className="relative inline-block">
              You don&apos;t have to
              <svg
                aria-hidden="true"
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-periwinkle"
              >
                <path
                  d="M2 9.5C60 3.5 140 2.5 298 7.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            figure it out alone.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            UnlockEd is an educational support agency for families who suspect, or
            already know, their child learns differently. Kelly Moore hears your whole
            story, helps you make sense of it, and works with you on practical,
            evidence-based next steps.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <BookButton />
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 px-1 text-[15px] font-semibold text-ink hover:text-periwinkle-deep transition-colors min-h-[44px]"
            >
              <Phone className="h-4 w-4" />
              Or call {PHONE_DISPLAY}
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-[15px] text-ink-soft">
            <li>Former child &amp; family therapist</li>
            <li>Orton-Gillingham trained</li>
            <li>Mom of a son with dyslexia</li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
          <div className="absolute -right-4 -top-4 hidden h-full w-full rounded-[28px] bg-periwinkle-wash sm:block" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[28px] bg-sand">
            <Image
              src="/kelly-moore.jpg"
              alt="Kelly Moore, founder of UnlockEd"
              width={1200}
              height={1200}
              preload
              sizes="(min-width: 1024px) 460px, (min-width: 640px) 440px, 100vw"
              className="aspect-[4/5] w-full object-cover object-[50%_28%]"
            />
          </div>
          <div className="relative -mt-10 ml-5 mr-10 rounded-2xl border border-line bg-white px-5 py-4 shadow-[0_10px_30px_-12px_rgba(11,46,99,0.25)] sm:ml-8">
            <p className="font-display text-lg text-ink">Kelly Moore</p>
            <p className="text-[14px] leading-snug text-ink-soft">
              Founder of UnlockEd · 15+ years working with children and teens
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
