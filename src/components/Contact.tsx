import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { personalDetails, socialLinks } from "../data/profile";

const links = [
  { label: "GitHub", href: socialLinks.github },
  { label: "LinkedIn", href: socialLinks.linkedin },
  { label: "Resume (PDF)", href: personalDetails.resumeUrl },
];

export default function Contact() {
  return (
    <SectionWrapper id="contact" eyebrow="Contact" title="Have something to build?">
      <p className="max-w-lg text-lg leading-relaxed text-surface-100/75">
        I read every email. Tell me what you are working on and where you need a hand, and I will reply within a
        couple of days.
      </p>
      <a
        href={socialLinks.email}
        className="mt-7 inline-block break-all font-display text-2xl font-extrabold leading-tight text-accent-ink underline decoration-accent decoration-2 underline-offset-8 sm:text-4xl"
      >
        {personalDetails.email}
      </a>
      <ul className="mt-10 max-w-sm divide-y divide-surface-50/10 border-y border-surface-50/10">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-3.5 text-surface-50 transition-colors hover:text-accent-ink"
            >
              {l.label}
              <ArrowUpRight
                size={18}
                className="text-surface-50/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
              />
            </a>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
