import SectionWrapper from "./SectionWrapper";
import { skills } from "../data/profile";

// Group in the order categories first appear in the data.
const groups = skills.reduce<Record<string, typeof skills>>((acc, s) => {
  (acc[s.category] ??= []).push(s);
  return acc;
}, {});

export default function Skills() {
  return (
    <SectionWrapper
      id="skills"
      eyebrow="Toolbox"
      title="What I work with"
      subtitle="The tools I use at work every day. The level next to each one is my own honest read."
    >
      <div className="grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(groups).map(([category, items]) => (
          <div key={category}>
            <p className="label mb-4">{category}</p>
            <ul className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {items.map((s) => (
                <li key={s.name} className="flex items-baseline justify-between gap-4 py-3">
                  <span
                    className={s.highlight ? "font-semibold text-surface-50" : "text-surface-100/80"}
                    title={s.description}
                  >
                    {s.name}
                  </span>
                  <span className="font-mono text-[0.68rem] text-surface-100/45">{s.level}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
