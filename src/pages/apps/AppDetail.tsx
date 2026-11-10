import { useEffect, useState, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ShieldCheck,
  Smartphone,
  Calendar,
  Package,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AppPageLayout from "../../components/apps/AppPageLayout";
import AppImage from "../../components/apps/AppImage";
import {
  getAndroidApp,
  type AndroidApp,
} from "../../data/androidApps";
import { usePageMeta } from "../../hooks/usePageMeta";
import { personalDetails } from "../../data/profile";
import { isAutomated } from "../../lib/motion";

function Lightbox({
  app,
  index,
  onClose,
  onNavigate,
}: {
  app: AndroidApp;
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        onNavigate((index + 1) % app.screenshots.length);
      if (e.key === "ArrowLeft")
        onNavigate((index - 1 + app.screenshots.length) % app.screenshots.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, app.screenshots.length, onClose, onNavigate]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${app.name} screenshots`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-surface-950/85 backdrop-blur-md"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-surface-50/15 bg-surface-900 text-surface-50 shadow-sm transition-colors hover:bg-surface-800"
      >
        <X size={18} />
      </button>

      {app.screenshots.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + app.screenshots.length) % app.screenshots.length);
            }}
            aria-label="Previous screenshot"
            className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full border border-surface-50/15 bg-surface-900 text-surface-50 shadow-sm transition-colors hover:bg-surface-800 md:left-8"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % app.screenshots.length);
            }}
            aria-label="Next screenshot"
            className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full border border-surface-50/15 bg-surface-900 text-surface-50 shadow-sm transition-colors hover:bg-surface-800 md:right-8"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <AppImage
          src={app.screenshots[index]}
          alt={`${app.name} screenshot ${index + 1}`}
          label="Screenshot coming soon"
          loading="eager"
          boxClassName="h-[70vh] w-[min(340px,80vw)] rounded-2xl"
          className="max-h-[88vh] max-w-[92vw] rounded-2xl border border-surface-50/10 shadow-[0_24px_60px_-20px_rgba(15,27,45,0.45)]"
        />
      </motion.div>

      <div className="absolute bottom-5 text-xs font-medium font-mono text-xs text-surface-100/80">
        {index + 1} / {app.screenshots.length}
      </div>
    </motion.div>
  );
}

function AppNotFound() {
  return (
    <AppPageLayout>
      <div className="flex flex-col items-center gap-4 px-6 py-32 text-center">
        <Smartphone size={36} className="text-accent-ink/60" aria-hidden="true" />
        <h1 className="font-display text-3xl font-extrabold text-surface-50">App not found</h1>
        <p className="max-w-md text-sm text-surface-100/80">
          The app you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          to="/apps"
          className="mt-2 rounded-full bg-surface-50 px-6 py-2.5 text-sm font-semibold text-surface-950 transition-opacity hover:opacity-85"
        >
          Browse all Android apps
        </Link>
      </div>
    </AppPageLayout>
  );
}

export default function AppDetail() {
  const { slug } = useParams<{ slug: string }>();
  const app = slug ? getAndroidApp(slug) : undefined;
  const [lightbox, setLightbox] = useState<number | null>(null);

  usePageMeta({
    title: app
      ? `${app.name} — Android App by ${personalDetails.name}`
      : `App not found — ${personalDetails.name}`,
    description: app
      ? `${app.tagline}. Screenshots, features, and details of the ${app.name} Android app.`
      : "This app page does not exist.",
    path: app ? `/apps/${app.slug}/` : "/apps/",
  });

  if (!app) return <AppNotFound />;

  return (
    <AppPageLayout accent={app.accent}>
      <div
        className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-20"
        style={{ "--accent": app.accent ?? "#2f6bff" } as CSSProperties}
      >
        {/* Header */}
        <motion.div
          initial={isAutomated ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-start"
        >
          <AppImage
            src={app.icon}
            alt={`${app.name} icon`}
            variant="icon"
            loading="eager"
            boxClassName="h-20 w-20 shrink-0 rounded-2xl md:h-24 md:w-24"
            className="h-20 w-20 shrink-0 rounded-2xl border border-surface-50/10 bg-surface-50/[0.04] object-cover md:h-24 md:w-24"
          />
          <div className="min-w-0 flex-1">
            <p className="label">
              {app.category}
              {app.releaseYear ? ` · ${app.releaseYear}` : ""}
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-surface-50 md:text-5xl">
              {app.name}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-surface-100/80">{app.tagline}</p>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-surface-100/70">
              {app.releaseYear && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={12} aria-hidden="true" /> Released {app.releaseYear}
                </span>
              )}
              {app.packageId && (
                <span className="inline-flex items-center gap-1.5 break-all font-mono">
                  <Package size={12} aria-hidden="true" /> {app.packageId}
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {app.playStoreUrl && (
                <a
                  href={app.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-surface-50 px-6 py-2.5 text-sm font-semibold text-surface-950 transition-opacity hover:opacity-85"
                >
                  <Play size={15} aria-hidden="true" /> Get it on Google Play
                </a>
              )}
              <Link
                to={`/apps/${app.slug}/privacy`}
                className="inline-flex items-center gap-2 rounded-full border border-surface-50/20 px-6 py-2.5 text-sm font-medium text-surface-50 transition-colors hover:border-surface-50/40 hover:bg-surface-50/[0.04]"
              >
                <ShieldCheck size={15} aria-hidden="true" /> Privacy Policy
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Screenshots */}
        {app.screenshots.length > 0 && (
          <section className="mt-14">
            <h2 className="label">Screenshots</h2>
            <div className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
              {app.screenshots.map((shot, i) => (
                <button
                  key={shot}
                  onClick={() => setLightbox(i)}
                  className="group shrink-0 snap-start rounded-2xl"
                  aria-label={`Open screenshot ${i + 1} of ${app.name}`}
                >
                  <AppImage
                    src={shot}
                    alt={`${app.name} screenshot ${i + 1}`}
                    label="Screenshot coming soon"
                    boxClassName="h-[380px] w-[190px] rounded-2xl md:h-[440px] md:w-[220px]"
                    className="h-[380px] w-auto rounded-2xl border border-surface-50/10 object-cover transition-all duration-300 group-hover:border-accent/60 group-hover:shadow-lg group-hover:shadow-surface-50/10 md:h-[440px]"
                  />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* About */}
        <section className="mt-14">
          <h2 className="label">About this app</h2>
          <div className="mt-4 max-w-2xl space-y-4">
            {app.description.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-surface-100/80">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Features */}
        {app.features.length > 0 && (
          <section className="mt-14">
            <h2 className="label">Key features</h2>
            <ul className="mt-4 divide-y divide-surface-50/10 border-y border-surface-50/10">
              {app.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 py-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="text-sm leading-relaxed text-surface-100/80">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tech stack */}
        {app.tech.length > 0 && (
          <section className="mt-14">
            <h2 className="label">Built with</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {app.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-surface-50/20 px-3.5 py-1.5 text-xs font-medium text-surface-100/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Privacy link */}
        <div className="mt-16 flex flex-col gap-3 border-y border-surface-50/10 py-8">
          <p className="label">Privacy</p>
          <p className="max-w-lg text-sm leading-relaxed text-surface-100/80">
            {app.name} respects your privacy. Read the full policy covering
            data collection, permissions, and third-party services.
          </p>
          <Link
            to={`/apps/${app.slug}/privacy`}
            className="w-fit text-sm font-semibold text-accent-ink underline-offset-4 hover:underline"
          >
            View Privacy Policy →
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            app={app}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onNavigate={setLightbox}
          />
        )}
      </AnimatePresence>
    </AppPageLayout>
  );
}
