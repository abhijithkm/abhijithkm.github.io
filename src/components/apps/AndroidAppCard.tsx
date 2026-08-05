import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Smartphone } from "lucide-react";
import {
  androidCategoryStyles,
  fallbackCategoryStyle,
  type AndroidApp,
} from "../../data/androidApps";
import { isAutomated } from "../../lib/motion";

export default function AndroidAppCard({
  app,
  i,
}: {
  app: AndroidApp;
  i: number;
}) {
  const badgeClass = androidCategoryStyles[app.category] ?? fallbackCategoryStyle;
  const [iconError, setIconError] = useState(false);

  return (
    <motion.div
      initial={isAutomated ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: 0.08 * i }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-primary-500/20 hover:shadow-xl hover:shadow-primary-600/8"
    >
      <Link
        to={`/apps/${app.slug}`}
        className="flex flex-1 flex-col p-5"
        aria-label={`View details for ${app.name}`}
      >
        {/* Header: icon + name + category */}
        <div className="flex items-start gap-4">
          {!iconError ? (
            <img
              src={app.icon}
              alt=""
              loading="lazy"
              onError={() => setIconError(true)}
              className="h-12 w-12 shrink-0 rounded-xl border border-white/[0.08] bg-white/[0.04] object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
              <Smartphone size={20} className="text-primary-400/60" />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold leading-snug text-white">
              {app.name}
            </h3>
            <span
              className={`mt-1.5 inline-block w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${badgeClass}`}
            >
              {app.category}
            </span>
          </div>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-surface-100/45">
          {app.tagline}
        </p>

        {/* Mini screenshot strip */}
        {app.screenshots.length > 0 && (
          <div className="mt-4 flex gap-2">
            {app.screenshots.slice(0, 3).map((shot) => (
              <img
                key={shot}
                src={shot}
                alt=""
                loading="lazy"
                className="h-24 w-12 rounded-md border border-white/[0.08] object-cover object-top opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              />
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {app.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium text-surface-100/35"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer row */}
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-400 transition-colors group-hover:text-primary-300">
            View details
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
          {app.playStoreUrl && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-surface-100/30">
              <Play size={10} /> On Google Play
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
