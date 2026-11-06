import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { PhoneStage, useStage } from "./stage";
import { androidApps } from "../data/androidApps";

export default function AndroidApps() {
  const { app, select } = useStage();
  const rows = useRef<Record<string, HTMLLIElement | null>>({});

  // On a wide screen the phone is pinned beside the list, so the row that
  // reaches the middle of the viewport becomes the app on the phone.
  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) select((e.target as HTMLElement).dataset.slug ?? "");
        }
      },
      { rootMargin: "-42% 0px -42% 0px" }
    );
    Object.values(rows.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [select]);

  if (androidApps.length === 0) return null;
  const live = androidApps.filter((a) => a.playStoreUrl).length;

  return (
    <SectionWrapper
      id="android-apps"
      eyebrow={`Shipped / ${live} live on Google Play`}
      title="Android apps"
      subtitle="Built on evenings and weekends and published under my own name. Each has its own page and privacy policy."
    >
      {/* Below the lg breakpoint the stage is not pinned, so it sits here. */}
      <div className="mb-10 flex justify-center lg:hidden">
        <PhoneStage />
      </div>

      <ul className="divide-y divide-surface-50/10 border-y border-surface-50/10">
        {androidApps.map((a) => {
          const on = a.slug === app?.slug;
          return (
            <li
              key={a.slug}
              data-slug={a.slug}
              ref={(el) => {
                rows.current[a.slug] = el;
              }}
            >
              <div
                className={`flex items-center gap-4 px-3 py-6 transition-colors duration-300 ${
                  on ? "bg-accent-soft" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => select(a.slug)}
                  className="flex min-w-0 flex-1 items-center gap-4 text-left"
                  aria-pressed={on}
                >
                  <img src={a.icon} alt="" className="h-14 w-14 shrink-0 rounded-2xl bg-surface-800 object-cover" />
                  <span className="min-w-0">
                    <span className="block font-display text-xl font-extrabold leading-tight text-surface-50">
                      {a.name}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-surface-100/70">{a.tagline}</span>
                    <span className="label mt-2 block !text-[0.64rem] !text-surface-100/55">
                      {a.category} / {a.releaseYear}
                      {a.playStoreUrl ? " / Live on Play" : ""}
                    </span>
                  </span>
                </button>
                <Link
                  to={`/apps/${a.slug}`}
                  aria-label={`${a.name} details`}
                  className="shrink-0 rounded-full border border-surface-50/15 p-2.5 text-surface-50 transition-colors hover:border-accent hover:text-accent-ink"
                >
                  <ArrowRight size={16} />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-sm">
        <Link to="/apps" className="font-semibold text-accent-ink hover:underline">
          All Android apps
        </Link>
      </p>
    </SectionWrapper>
  );
}
