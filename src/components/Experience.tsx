import SectionWrapper from "./SectionWrapper";
import { experience, education } from "../data/profile";
import { androidApps } from "../data/androidApps";

// The trail: study, work and shipped apps on one line, oldest first. The
// order is the point, so this is the one place a sequence is drawn.
type Kind = "Study" | "Work" | "Shipped";

interface Stop {
  kind: Kind;
  from: string;
  to: string;
  title: string;
  place: string;
  text?: string;
  tags?: string[];
}

const stops: Stop[] = [
  ...education.map<Stop>((e) => ({
    kind: "Study",
    from: e.startDate,
    to: e.endDate,
    title: e.degree,
    place: e.name,
  })),
  ...experience.map<Stop>((e) => ({
    kind: "Work",
    from: e.startDate,
    to: e.endDate,
    title: e.position,
    place: e.name,
    text: e.description,
    tags: e.techStack,
  })),
  ...(androidApps.length
    ? [
        {
          kind: "Shipped" as const,
          from: String(Math.min(...androidApps.map((a) => a.releaseYear ?? 9999))),
          to: "Now",
          title: "Android apps on Google Play",
          place: androidApps.map((a) => a.name).join(", "),
        },
      ]
    : []),
].sort((a, b) => Number(a.from) - Number(b.from));

const kindStyle: Record<Kind, string> = {
  Study: "text-surface-100/45",
  Work: "text-primary-400",
  Shipped: "text-turmeric",
};

export default function Experience() {
  return (
    <SectionWrapper
      id="experience"
      eyebrow={`Trail · ${stops[0].from} to now`}
      title="From the lab bench to production"
      subtitle="I started in a college lab, taught there, then moved into product engineering. This is the path, in order."
    >
      <ol className="relative">
        <span className="absolute bottom-2 left-[5.25rem] top-2 hidden w-px bg-white/[0.1] sm:block" aria-hidden />
        {stops.map((s) => (
          <li key={`${s.from}-${s.title}-${s.place}`} className="relative grid gap-x-8 pb-10 sm:grid-cols-[5.25rem_1fr]">
            <p className="font-mono text-sm text-surface-100/55 sm:pt-1">{s.from}</p>
            <span
              className={`absolute left-[5.25rem] top-2 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full sm:block ${
                s.kind === "Work" ? "bg-primary-400" : s.kind === "Shipped" ? "bg-turmeric" : "bg-surface-700"
              }`}
              aria-hidden
            />
            <div className="sm:pl-8">
              <p className={`label !text-[0.64rem] ${kindStyle[s.kind]}`}>
                {s.kind} · {s.from} to {s.to}
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-surface-50">{s.title}</h3>
              <p className="mt-1 text-surface-100/65">{s.place}</p>
              {s.text && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-surface-100/60">{s.text}</p>}
              {s.tags && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/[0.08] px-2.5 py-0.5 font-mono text-[0.66rem] text-surface-100/55"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
