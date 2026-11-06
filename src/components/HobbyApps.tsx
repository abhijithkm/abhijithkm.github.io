import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { hobbyApps } from "../data/hobbyApps";

export default function HobbyApps() {
  return (
    <SectionWrapper
      id="hobby-apps"
      eyebrow={`Web · ${hobbyApps.length} projects`}
      title="Projects"
      subtitle="Small web tools and apps, each running on its own address. Most started as something I needed."
    >
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {hobbyApps.map((app) => (
          <li key={app.name}>
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              aria-label={`${app.name} (opens in a new tab)`}
            >
              <div className="aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.07] bg-surface-900">
                <img
                  src={app.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-bold leading-tight text-surface-50">
                  {app.name}
                </h3>
                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-surface-100/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-400"
                />
              </div>
              <p className="label mt-1 !text-[0.64rem] !text-surface-100/45">{app.category}</p>
              <p className="mt-2 text-sm leading-relaxed text-surface-100/65">{app.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
