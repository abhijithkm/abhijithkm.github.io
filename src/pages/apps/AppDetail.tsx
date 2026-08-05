import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  Calendar,
  Package,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AppPageLayout from "../../components/apps/AppPageLayout";
import {
  getAndroidApp,
  androidCategoryStyles,
  fallbackCategoryStyle,
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-surface-950/95 backdrop-blur-sm"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-surface-100/60 transition-colors hover:text-white"
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
            className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-surface-100/60 transition-colors hover:text-white md:left-8"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % app.screenshots.length);
            }}
            aria-label="Next screenshot"
            className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-surface-100/60 transition-colors hover:text-white md:right-8"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      <motion.img
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        src={app.screenshots[index]}
        alt={`${app.name} screenshot ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-[92vw] rounded-2xl border border-white/10 shadow-2xl"
      />

      <div className="absolute bottom-5 text-xs font-medium text-surface-100/40">
        {index + 1} / {app.screenshots.length}
      </div>
    </motion.div>
  );
}

function AppNotFound() {
  return (
    <AppPageLayout>
      <div className="flex flex-col items-center gap-4 px-6 py-32 text-center">
        <Smartphone size={36} className="text-primary-400/40" />
        <h1 className="text-2xl font-bold text-white">App not found</h1>
        <p className="max-w-md text-sm text-surface-100/50">
          The app you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          to="/apps"
          className="mt-2 rounded-lg border border-primary-500/20 bg-primary-600/15 px-5 py-2.5 text-sm font-medium text-primary-400 transition-colors hover:bg-primary-600/25"
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

  const badgeClass = androidCategoryStyles[app.category] ?? fallbackCategoryStyle;

  return (
    <AppPageLayout>
      <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        {/* ── Hero ── */}
        <motion.div
          initial={isAutomated ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-start"
        >
          <img
            src={app.icon}
            alt={`${app.name} icon`}
            className="h-20 w-20 shrink-0 rounded-2xl border border-white/[0.08] bg-white/[0.04] object-cover shadow-lg md:h-24 md:w-24"
          />
          <div className="min-w-0 flex-1">
            <span
              className={`inline-block rounded-full border px-3 py-1 text-[11px] font-medium ${badgeClass}`}
            >
              {app.category}
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
              {app.name}
            </h1>
            <p className="mt-2 text-lg text-surface-100/60">{app.tagline}</p>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-surface-100/35">
              {app.releaseYear && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={12} /> Released {app.releaseYear}
                </span>
              )}
              {app.packageId && (
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <Package size={12} /> {app.packageId}
                </span>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {app.playStoreUrl && (
                <motion.a
                  href={app.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-lg border border-primary-500/20 bg-primary-600/15 px-5 py-2.5 text-sm font-medium text-primary-400 transition-colors hover:bg-primary-600/25"
                >
                  <Play size={15} /> Get it on Google Play
                </motion.a>
              )}
              <Link
                to={`/apps/${app.slug}/privacy`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-surface-100/60 transition-colors hover:border-white/15 hover:text-white"
              >
                <ShieldCheck size={15} /> Privacy Policy
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Screenshots ── */}
        {app.screenshots.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-semibold text-white">Screenshots</h2>
            <div className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
              {app.screenshots.map((shot, i) => (
                <button
                  key={shot}
                  onClick={() => setLightbox(i)}
                  className="group shrink-0 snap-start focus:outline-none"
                  aria-label={`Open screenshot ${i + 1} of ${app.name}`}
                >
                  <img
                    src={shot}
                    alt={`${app.name} screenshot ${i + 1}`}
                    loading="lazy"
                    className="h-[380px] w-auto rounded-2xl border border-white/[0.08] object-cover transition-all duration-300 group-hover:border-primary-500/30 group-hover:shadow-lg group-hover:shadow-primary-600/10 md:h-[440px]"
                  />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ── About ── */}
        <section className="mt-14">
          <h2 className="text-xl font-semibold text-white">About this app</h2>
          <div className="mt-4 space-y-4">
            {app.description.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-surface-100/55">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        {app.features.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-semibold text-white">Key features</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {app.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-primary-400"
                  />
                  <span className="text-sm leading-relaxed text-surface-100/60">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Tech stack ── */}
        {app.tech.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-semibold text-white">Built with</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {app.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-surface-100/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ── Footer links ── */}
        <div className="mt-16 flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-8 text-center">
          <ShieldCheck size={22} className="text-primary-400/70" />
          <p className="max-w-lg text-sm text-surface-100/50">
            {app.name} respects your privacy. Read the full policy covering
            data collection, permissions, and third-party services.
          </p>
          <Link
            to={`/apps/${app.slug}/privacy`}
            className="text-sm font-medium text-primary-400 transition-colors hover:text-primary-300"
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
