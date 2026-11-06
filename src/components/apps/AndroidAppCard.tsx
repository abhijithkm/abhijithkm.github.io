import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { accentVars, type AndroidApp } from "../../data/androidApps";
import { isAutomated } from "../../lib/motion";
import AppImage from "./AppImage";

export default function AndroidAppCard({ app, i }: { app: AndroidApp; i: number }) {
  return (
    <motion.div
      initial={isAutomated ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: 0.07 * i }}
      style={accentVars(app.accent) as CSSProperties}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-surface-900 transition-colors duration-300 hover:border-primary-400/40"
    >
      <Link
        to={`/apps/${app.slug}`}
        className="flex flex-1 flex-col p-5"
        aria-label={`View details for ${app.name}`}
      >
        <div className="flex items-center gap-3.5">
          <AppImage
            src={app.icon}
            alt=""
            variant="icon"
            boxClassName="h-12 w-12 shrink-0 rounded-[14px]"
            className="h-12 w-12 shrink-0 rounded-[14px] bg-surface-800 object-cover"
          />
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-bold leading-tight text-surface-50">
              {app.name}
            </h3>
            <p className="label mt-0.5 !text-[0.62rem] !text-surface-100/45">
              {app.category}
              {app.releaseYear ? ` · ${app.releaseYear}` : ""}
            </p>
          </div>
          <ArrowUpRight
            size={18}
            className="ml-auto shrink-0 text-surface-100/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-400"
          />
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-surface-100/65">{app.tagline}</p>

        {app.screenshots.length > 0 && (
          <div className="mt-5 flex gap-2 overflow-hidden">
            {app.screenshots.slice(0, 4).map((shot) => (
              <AppImage
                key={shot}
                src={shot}
                alt=""
                boxClassName="h-28 w-[3.9rem] rounded-lg"
                className="h-28 w-[3.9rem] rounded-lg border border-white/[0.07] object-cover object-top opacity-85 transition-opacity duration-300 group-hover:opacity-100"
              />
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <span className="font-mono text-[0.7rem] text-surface-100/45">
            {app.tech.slice(0, 2).join(" · ")}
          </span>
          {app.playStoreUrl && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-primary-400">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" /> Live on Play
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
