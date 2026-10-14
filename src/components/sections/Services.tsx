import BookButton from "@/components/ui/BookButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

type Service = {
  name: string;
  forWhom: string;
  text: React.ReactNode;
  list?: string[];
  note?: string;
};

const services: Service[] = [
  {
    name: "Parent Clarity & Guidance Sessions",
    forWhom: "For parents · 50 minutes",
    text: "A focused session built on the HELP framework. Kelly hears your story, reviews what you've tried and any evaluations you have, walks you through the resources and referrals available, and helps you leave with a concrete plan.",
  },
  {
    name: "Screenings & Assessments",
    forWhom: "For your child",
    text: "A clearer picture of how your child learns and where to go from here.",
    list: ["Dyslexia Screening", "Cognitive Strengths Assessment", "Learning Profile Assessment"],
    note: "A screening points you in the right direction. It is not a diagnosis.",
  },
  {
    name: "Working Memory Training",
    forWhom: "For your child",
    text: (
      <>
        Working memory is the mental workspace we use to hold and use information,
        like following multi-step directions or solving a math problem in your head.
        Kelly uses{" "}
        <a
          href="https://www.cogmed.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-periwinkle-deep underline decoration-periwinkle/40 underline-offset-4 hover:decoration-periwinkle-deep"
        >
          Cogmed
        </a>
        , a working memory training program that grew out of research at the
        Karolinska Institute in Sweden.
      </>
    ),
  },
  {
    name: "Navigating Dyslexia",
    forWhom: "For parents",
    text: "Guidance at any point on the dyslexia path, from first suspicions to understanding reading interventions like Orton-Gillingham. This is where Kelly's Schenck School training and her own experience as a dyslexia mom meet.",
  },
  {
    name: "School Conference Planning",
    forWhom: "For parents",
    text: "Walk into IEP, 504, and parent-teacher meetings prepared: clear on what the evaluation says, what support to ask about, and which questions to bring.",
  },
  {
    name: "Understanding My Strengths",
    forWhom: "Child or teen session · 50 minutes",
    text: "A session for your child or teen about how they learn best and what they are good at, so they can begin to understand themselves and speak up for what they need.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Support for parents, and for the kids at the center of it all."
            intro={
              <p>
                Not sure which one fits? Start with a free 10-minute phone call and Kelly
                will help you choose. Sessions are available by video or in person in
                Peachtree Corners and Sandy Springs.
              </p>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-x-12 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={(i % 2) * 0.05} className="border-t border-line py-8">
              <p className="text-[13px] font-medium text-ink-soft">{s.forWhom}</p>
              <h3 className="mt-1.5 font-display text-[1.4rem] leading-snug text-ink">{s.name}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-soft sm:text-[17px]">{s.text}</p>
              {s.list && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.list.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[14px] text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {s.note && <p className="mt-4 text-[14px] italic text-ink-soft">{s.note}</p>}
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col items-start gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-[17px] text-ink">
            Session types and openings are listed in Kelly&apos;s booking portal.
          </p>
          <BookButton>View sessions &amp; book</BookButton>
        </Reveal>
      </div>
    </section>
  );
}
