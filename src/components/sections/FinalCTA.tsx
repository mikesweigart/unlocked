import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import BookButton from "@/components/ui/BookButton";
import Reveal from "@/components/ui/Reveal";
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

export default function FinalCTA() {
  return (
    <section id="contact" className="bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-periwinkle">
              Take the first step
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-[2.2rem] leading-[1.12] text-white sm:text-[3rem]">
              Ten minutes on the phone is a good place to start.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Tell Kelly what&apos;s going on. You&apos;ll talk through where your family is
              right now and which next step makes sense. There is no cost and no
              commitment for the call.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <BookButton variant="light" />
              <a
                href={PHONE_HREF}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[15px] font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <Phone className="h-4 w-4" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={EMAIL_HREF}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[15px] font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Email Kelly
              </a>
            </div>
            <p className="mt-4 break-all text-[14px] text-white/55">{EMAIL}</p>
          </div>

          <div className="hidden lg:block">
            <div className="overflow-hidden rounded-[28px]">
              <Image
                src="/kelly-moore.jpg"
                alt="Kelly Moore"
                width={1200}
                height={1200}
                sizes="380px"
                className="aspect-square w-full object-cover object-[50%_25%]"
              />
            </div>
            <p className="mt-4 text-[15px] text-white/70">
              Video sessions, or in person in Peachtree Corners and Sandy Springs.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
