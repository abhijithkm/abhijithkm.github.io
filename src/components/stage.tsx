import {
  createContext,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { androidApps, type AndroidApp } from "../data/androidApps";

// ─── Phone stage ────────────────────────────────────────────────────
//
// The home page is built around one question: which app is on the phone?
// The selection lives here so the stage, the app list, the nav and the
// accent colour all follow it. Picking an app (a tap on the stage, a tap
// on a row, or scrolling a row to the middle of the screen) re-tints the
// page with that app's own accent.

const FALLBACK_ACCENT = "#2f6bff";

interface StageValue {
  app?: AndroidApp;
  select: (slug: string) => void;
}

const StageContext = createContext<StageValue>({ select: () => {} });
export const useStage = () => useContext(StageContext);

export function StageProvider({ children }: { children: ReactNode }) {
  const [slug, setSlug] = useState(androidApps[0]?.slug);
  const app = androidApps.find((a) => a.slug === slug) ?? androidApps[0];

  return (
    <StageContext.Provider value={{ app, select: setSlug }}>
      <div
        className="stage-root"
        style={{ "--accent": app?.accent ?? FALLBACK_ACCENT } as CSSProperties}
      >
        {children}
      </div>
    </StageContext.Provider>
  );
}

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Keyed by app slug, so switching apps remounts it and resets to shot 1.
function Screen({ app }: { app: AndroidApp }) {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const shots = app.screenshots;

  useEffect(() => {
    if (hover || shots.length < 2 || reducedMotion()) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % shots.length), 3800);
    return () => window.clearInterval(id);
  }, [hover, shots.length]);

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div
        className="relative aspect-[9/16.5] w-[15.5rem] rounded-[2.5rem] bg-surface-50 p-[0.55rem]"
        style={{
          boxShadow:
            "0 40px 60px -28px color-mix(in oklab, var(--accent), #0f1b2d 35%), 0 2px 0 rgb(255 255 255 / 0.15) inset",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-surface-800">
          {shots.map((src, n) => (
            <img
              key={src}
              src={src}
              alt={n === i ? `${app.name} screenshot ${n + 1} of ${shots.length}` : ""}
              aria-hidden={n !== i}
              loading={n === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
                n === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
      {shots.length > 1 && (
        <div className="mt-4 flex justify-center gap-1.5">
          {shots.map((src, n) => (
            <button
              key={src}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Show screenshot ${n + 1}`}
              aria-current={n === i}
              className={`h-1.5 rounded-full transition-all ${
                n === i ? "w-5 bg-accent" : "w-1.5 bg-surface-50/25 hover:bg-surface-50/45"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function PhoneStage() {
  const { app, select } = useStage();
  if (!app) return null;

  return (
    <div className="flex flex-col items-center">
      <div role="tablist" aria-label="Choose an app to preview" className="mb-7 flex gap-2.5">
        {androidApps.map((a) => {
          const on = a.slug === app.slug;
          return (
            <button
              key={a.slug}
              type="button"
              role="tab"
              aria-selected={on}
              aria-label={a.name}
              onClick={() => select(a.slug)}
              className={`h-11 w-11 overflow-hidden rounded-xl bg-surface-900 transition-all duration-300 ${
                on
                  ? "scale-110 ring-2 ring-accent ring-offset-2 ring-offset-surface-950"
                  : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
              }`}
            >
              <img src={a.icon} alt="" className="h-full w-full object-cover" />
            </button>
          );
        })}
      </div>

      <Screen key={app.slug} app={app} />

      <div className="mt-6 max-w-[17rem] text-center">
        <h3 className="font-display text-xl font-extrabold text-surface-50">{app.name}</h3>
        <p className="mt-1 text-sm leading-snug text-surface-100/70">{app.tagline}</p>
        <div className="mt-4 flex items-center justify-center gap-4 text-sm font-semibold">
          {app.playStoreUrl && (
            <a
              href={app.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent-ink hover:underline"
            >
              Google Play <ArrowUpRight size={14} />
            </a>
          )}
          <Link to={`/apps/${app.slug}`} className="inline-flex items-center gap-1 text-surface-50 hover:underline">
            Details <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
