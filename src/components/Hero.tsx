import { personalDetails, experience } from "../data/profile";
import { androidApps } from "../data/androidApps";
import { hobbyApps } from "../data/hobbyApps";
import { scrollToSection } from "../lib/sectionNav";

const current = experience[0];
const live = androidApps.filter((a) => a.playStoreUrl).length;

// Facts only: each row is something the rest of the page backs up.
const ledger: [string, string][] = [
  ["Now", `${personalDetails.tagline} at ${current.name}`],
  ["Stack", "React, .NET 8, SQL Server, AWS"],
  ["Shipped", `${live} Android apps on Google Play, ${hobbyApps.length} web projects`],
  ["Since", String(personalDetails.careerStartYear)],
];

const delay = (s: string) => ({ animationDelay: s });

export default function Hero() {
  const [first, ...rest] = personalDetails.name.split(" ");

  return (
    <section id="home" className="flex min-h-[88vh] scroll-mt-16 flex-col justify-center pb-12 pt-32 lg:pt-28">
      <p className="label rise">
        {personalDetails.tagline} / {personalDetails.address}
      </p>
      <h1
        className="rise mt-5 font-display text-[clamp(3.4rem,9vw,7rem)] font-extrabold leading-[0.92] text-surface-50"
        style={delay("0.08s")}
      >
        {first}
        <br />
        {rest.join(" ")}
        <span className="text-accent">.</span>
      </h1>
      <p className="rise mt-7 max-w-lg text-lg leading-relaxed text-surface-100/75" style={delay("0.2s")}>
        I build enterprise web apps by day and publish my own Android apps on the side. The phone shows what I have
        shipped. Tap one.
      </p>
      <div className="rise mt-8 flex flex-wrap gap-3" style={delay("0.3s")}>
        <a
          href="#android-apps"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#android-apps");
          }}
          className="rounded-full bg-surface-50 px-6 py-3 text-sm font-semibold text-surface-950 transition-opacity hover:opacity-85"
        >
          See the apps
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#contact");
          }}
          className="rounded-full border border-surface-50/20 px-6 py-3 text-sm font-semibold text-surface-50 transition-colors hover:border-surface-50/50"
        >
          Get in touch
        </a>
      </div>
      <dl className="rise mt-12 max-w-lg border-t border-surface-50/10" style={delay("0.4s")}>
        {ledger.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[5rem_1fr] gap-4 border-b border-surface-50/10 py-3">
            <dt className="label !text-[0.66rem] !text-surface-100/55">{k}</dt>
            <dd className="text-sm leading-snug text-surface-50">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
