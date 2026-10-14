import BookButton from "@/components/ui/BookButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    letter: "H",
    word: "Hear",
    text: "It starts with your story. What you're seeing at home and at school, what has worried you, and what you hope for your child.",
  },
  {
    letter: "E",
    word: "Examine",
    text: "Together you look at the interventions you've tried so far and review any evaluations or school reports you already have.",
  },
  {
    letter: "L",
    word: "Learn",
    text: "You learn about the resources and potential referrals available to your child, explained in plain language.",
  },
  {
    letter: "P",
    word: "Plan",
    text: "You leave with a plan of action and concrete next steps you can put in place right away.",
  },
];

export default function HelpFramework() {
  return (
    <section id="help" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Every family starts with HELP."
            intro={
              <p>
                Most families begin with a Parent Clarity &amp; Guidance Session. It
                follows a simple framework, so you always know what the time is for and
                what you&apos;ll walk away with.
              </p>
            }
          />
        </Reveal>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.letter}>
              <Reveal delay={i * 0.06} className="h-full rounded-3xl bg-cream p-6 sm:p-7">
                <span
                  aria-hidden="true"
                  className="block font-display text-[4.5rem] leading-none text-periwinkle"
                >
                  {s.letter}
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{s.word}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
          <BookButton>Book a Parent Clarity Session</BookButton>
          <p className="text-[15px] text-ink-soft">
            Not ready yet? Start with a free 10-minute phone call.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
