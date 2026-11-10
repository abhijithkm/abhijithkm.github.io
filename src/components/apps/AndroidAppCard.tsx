import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { AndroidApp } from "../../data/androidApps";
import { isAutomated } from "../../lib/motion";
import AppImage from "./AppImage";

export default function AndroidAppCard({ app, i }: { app: AndroidApp; i: number }) {
  return (
    <motion.div
      initial={isAutomated ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: 0.05 * i }}
      style={{ "--accent": app.accent ?? "#2f6bff" } as CSSProperties}
      className="group"
    >
      <Link
        to={`/apps/${app.slug}`}
        className="grid gap-5 py-7 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
        aria-label={`View details for ${app.name}`}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-3.5">
            <AppImage
              src={app.icon}
              alt=""
              variant="icon"
              boxClassName="h-12 w-12 shrink-0 rounded-[14px]"
              className="h-12 w-12 shrink-0 rounded-[14px] border border-surface-50/10 bg-surface-50/[0.04] object-cover"
            />
            <div className="min-w-0">
              <h2 className="truncate font-display text-xl font-extrabold leading-tight text-surface-50">
                {app.name}
              </h2>
              <p className="label mt-0.5 !text-[0.64rem]">
                {app.category}
                {app.releaseYear ? ` · ${app.releaseYear}` : ""}
              </p>
            </div>
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="ml-auto shrink-0 text-surface-100/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
            />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-surface-100/80">{app.tagline}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-mono text-[0.7rem] text-surface-100/70">
              {app.tech.slice(0, 2).join(" · ")}
            </span>
            {app.playStoreUrl && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-accent-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Live on Play
              </span>
            )}
          </div>
        </div>

        {app.screenshots.length > 0 && (
          <div className="flex gap-2 overflow-hidden">
            {app.screenshots.slice(0, 4).map((shot) => (
              <AppImage
                key={shot}
                src={shot}
                alt=""
                boxClassName="h-28 w-[3.9rem] rounded-lg"
                className="h-28 w-[3.9rem] rounded-lg border border-surface-50/10 object-cover object-top opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              />
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
