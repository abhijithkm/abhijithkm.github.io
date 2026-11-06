import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { hobbyApps } from "../data/hobbyApps";

export default function HobbyApps() {
  return (
    <SectionWrapper
      id="hobby-apps"
      eyebrow={`Web / ${hobbyApps.length} projects`}
      title="Projects"
      subtitle="Small web tools, each running on its own address. Most started as something I needed."
    >
      <ul className="divide-y divide-surface-50/10 border-y border-surface-50/10">
        {hobbyApps.map((app) => (
          <li key={app.name}>
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${app.name} (opens in a new tab)`}
              className="group flex items-center gap-4 px-1 py-4 transition-colors hover:bg-accent-soft sm:px-3"
            >
              <img
                src={app.image}
                alt=""
                loading="lazy"
                className="h-14 w-24 shrink-0 rounded-lg border border-surface-50/10 bg-surface-900 object-cover object-top"
              />
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg font-extrabold leading-tight text-surface-50">
                  {app.name}
                </span>
                <span className="mt-0.5 block truncate text-sm text-surface-100/70">{app.description}</span>
              </span>
              <span className="label hidden shrink-0 !text-[0.64rem] !text-surface-100/55 sm:block">{app.category}</span>
              <ArrowUpRight
                size={18}
                className="shrink-0 text-surface-50/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
              />
            </a>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
