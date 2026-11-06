import SectionWrapper from "./SectionWrapper";
import { personalDetails } from "../data/profile";

export default function About() {
  return (
    <SectionWrapper id="about" eyebrow="About" title={personalDetails.aboutTitle}>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-surface-100/75">
          <p>{personalDetails.description}</p>
          <p>{personalDetails.aboutExtended}</p>
        </div>
        <div>
          <p className="label mb-4">Day to day</p>
          <ul className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {personalDetails.recruiterHighlights.map((h) => (
              <li key={h} className="py-3 text-sm text-surface-50">
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
