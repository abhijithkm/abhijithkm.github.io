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
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <p className="max-w-xl text-lg leading-relaxed text-surface-100/70">
            I read every email. Tell me what you are working on and where you need a hand, and I will reply
            within a couple of days.
          </p>
          <a
            href={socialLinks.email}
            className="mt-8 inline-block break-all font-display text-3xl font-extrabold leading-tight text-primary-400 underline decoration-turmeric decoration-2 underline-offset-8 transition-colors hover:text-primary-300 sm:text-5xl"
          >
            {personalDetails.email}
          </a>
        </div>
        <ul className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-4 text-surface-50 transition-colors hover:text-primary-300"
              >
                {l.label}
                <ArrowUpRight
                  size={18}
                  className="text-surface-100/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-400"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
