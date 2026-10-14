import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const moments = [
  "The teacher says your child is bright and just needs to try harder. You know how hard they are already trying.",
  "You have a long evaluation report and still aren't sure what it says, or what to ask the school for.",
  "Homework takes hours and ends in tears. Sometimes theirs, sometimes yours.",
  "You suspect dyslexia or ADHD, but you don't know where to start or who to call first.",
  "Your child has started calling themselves dumb, and it breaks your heart every time.",
  "You leave school meetings nodding along and understanding very little of what was decided.",
];

export default function SoundFamiliar() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Sound familiar?"
            title="Maybe you're somewhere in here."
          />
        </Reveal>

        <ul className="mt-12 grid gap-x-12 gap-y-0 md:grid-cols-2">
          {moments.map((m, i) => (
            <li key={i} className="border-t border-line">
              <Reveal delay={(i % 2) * 0.05} className="flex gap-5 py-6">
                <span className="font-display text-lg text-periwinkle tabular-nums leading-[1.6]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[17px] leading-relaxed text-ink sm:text-lg">{m}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-12 rounded-3xl bg-sand px-6 py-8 sm:px-10 sm:py-10">
          <p className="max-w-3xl font-display text-xl leading-snug text-ink sm:text-2xl">
            Whether your child has a formal diagnosis, or you simply sense that they need
            help and aren&apos;t sure where to begin, UnlockEd was created to help you make
            sense of it all.
          </p>
          <a
            href="#about"
            className="mt-5 inline-block text-[15px] font-semibold text-periwinkle-deep underline decoration-periwinkle/40 underline-offset-4 hover:decoration-periwinkle-deep"
          >
            Why Kelly started UnlockEd
          </a>
        </Reveal>
      </div>
    </section>
  );
}
