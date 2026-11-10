import SectionWrapper from "./SectionWrapper";
import { personalDetails } from "../data/profile";

export default function About() {
  return (
    <SectionWrapper id="about" eyebrow="About" title={personalDetails.aboutTitle}>
      <div className="max-w-xl space-y-5 text-lg leading-relaxed text-surface-100/80">
        <p>{personalDetails.description}</p>
        <p>{personalDetails.aboutExtended}</p>
      </div>
      <ul className="mt-8 flex flex-wrap gap-2">
        {personalDetails.recruiterHighlights.map((h) => (
          <li key={h} className="rounded-full bg-accent-soft px-3.5 py-1.5 text-sm text-accent-ink">
            {h}
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
