import type { CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { personalDetails, experience } from "../data/profile";
import { androidApps } from "../data/androidApps";
import { hobbyApps } from "../data/hobbyApps";
import { scrollToSection } from "../lib/sectionNav";

const current = experience[0];
const live = androidApps.filter((a) => a.playStoreUrl).length;

// Facts only: each row is something the rest of the page backs up.
const ledger: [string, string][] = [
  ["Role", personalDetails.tagline],
  ["Now", `${current.name}, since ${current.startDate}`],
  ["Stack", "React / .NET 8 / SQL Server / AWS"],
  ["Shipped", `${live} Android apps on Google Play, ${hobbyApps.length} web projects`],
  ["Building since", String(personalDetails.careerStartYear)],
];

const delay = (d: string) => ({ "--d": d }) as CSSProperties;

export default function Hero() {
  const [first, ...rest] = personalDetails.name.split(" ");

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28">
      <div className="contours pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.25fr_1fr] lg:items-end">
        <div>
          <p className="label rise" style={delay("0s")}>
            {personalDetails.tagline} - {personalDetails.address}
          </p>
          <h1
            className="rise mt-5 font-display text-[clamp(3.6rem,11vw,8.5rem)] font-extrabold leading-[0.9] text-surface-50"
            style={delay("0.08s")}
          >
            {first}
            <br />
            <span className="text-primary-400">{rest.join(" ")}</span>
            <span className="text-turmeric">.</span>
          </h1>
          <p className="rise mt-8 max-w-xl text-lg leading-relaxed text-surface-100/70" style={delay("0.2s")}>
            {personalDetails.heroDescription}
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={delay("0.3s")}>
            <a
              href="#android-apps"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#android-apps");
              }}
              className="rounded-full bg-primary-400 px-6 py-3 text-sm font-semibold text-surface-950 transition-colors hover:bg-primary-300"
            >
              See what I have shipped
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-surface-50 transition-colors hover:border-white/40"
            >
              Get in touch
            </a>
          </div>
        </div>

        <dl className="rise rounded-2xl border border-white/[0.08] bg-surface-900/70 p-6 backdrop-blur-sm" style={delay("0.4s")}>
          {ledger.map(([k, v], idx) => (
            <div
              key={k}
              className={`grid grid-cols-[5.5rem_1fr] sm:grid-cols-[7.75rem_1fr] gap-4 py-3.5 ${idx ? "border-t border-white/[0.06]" : "pt-0"} ${idx === ledger.length - 1 ? "pb-0" : ""}`}
            >
              <dt className="label !text-[0.64rem] !text-surface-100/45">{k}</dt>
              <dd className="text-sm leading-snug text-surface-50">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <ArrowDown
        size={18}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-surface-100/25 md:block"
        aria-hidden
      />
    </section>
  );
}
