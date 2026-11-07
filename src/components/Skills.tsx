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
      subtitle="What I use at work and in my own projects. Bold means I reach for it first."
    >
      <dl className="border-t border-surface-50/10">
        {Object.entries(groups).map(([category, items]) => (
          <div key={category} className="grid gap-2 border-b border-surface-50/10 py-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
            <dt className="label pt-1 !text-[0.68rem]">{category}</dt>
            <dd>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {items.map((s) => (
                  <li
                    key={s.name}
                    title={`${s.level}: ${s.description}`}
                    className={s.highlight ? "font-semibold text-surface-50" : "text-surface-100/70"}
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </SectionWrapper>
  );
}
