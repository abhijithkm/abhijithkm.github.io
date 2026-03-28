import { Suspense, lazy } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, Send, FileText, Mail } from "lucide-react";
import { personalDetails, socialLinks } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import TerminalAnimation from "./terminal/TerminalAnimation";

const ParticleField = lazy(() => import("./three/ParticleField"));

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const socials = [
  { icon: GithubIcon, href: socialLinks.github, label: "GitHub" },
  { icon: LinkedinIcon, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: Mail, href: socialLinks.email, label: "Email" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-28"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary-600/10 blur-[160px]"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent-purple/8 blur-[160px]"
        />
        <div className="absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan/5 blur-[140px]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* ── Core message ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        {/* 1. Availability badge */}
        {personalDetails.availableForWork && (
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-surface-100/50 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for opportunities
          </span>
        </motion.div>
        )}

        {/* 2. Heading */}
        <motion.h1
          variants={fadeUp}
          className="mt-8 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="block text-white/90">Hi, I'm</span>
          <span className="mt-1 block bg-gradient-to-r from-primary-400 via-accent-purple to-accent-cyan bg-clip-text text-transparent">
            {personalDetails.name}
          </span>
        </motion.h1>

        {/* 3. Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mt-3 text-lg font-semibold tracking-wide text-surface-100/35 uppercase sm:text-xl"
        >
          {personalDetails.tagline}
        </motion.p>

        {/* 4. Description */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-surface-100/40"
        >
          {personalDetails.heroDescription}
        </motion.p>

        {/* 5. Credibility line */}
        <motion.p
          variants={fadeUp}
          className="mt-3 text-sm font-medium text-surface-100/25"
        >
          {personalDetails.credibilityLine}
        </motion.p>

        {/* 5. CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#hobby-apps"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#hobby-apps")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary-600 to-accent-purple px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-purple opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative flex items-center gap-2">
              View Projects
              <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
            </span>
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5"
          >
            Contact Me
            <Send size={14} className="text-surface-100/40" />
          </a>
          <a
            href={personalDetails.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5"
          >
            Resume
            <FileText size={14} className="text-surface-100/40" />
          </a>
        </motion.div>

        {/* 6. Social icons */}
        <motion.div
          variants={fadeUp}
          className="mt-6 flex items-center justify-center gap-2.5"
        >
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-surface-100/35 transition-all duration-300 hover:border-primary-500/30 hover:text-white hover:bg-white/[0.06] hover:shadow-md hover:shadow-primary-500/10 hover:-translate-y-0.5"
            >
              <Icon size={15} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Terminal (separate, subdued) ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 mx-auto mt-14 w-full max-w-md scale-[0.92]"
      >
        <TerminalAnimation />
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-surface-100/15"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="h-7 w-[18px] rounded-full border border-surface-100/10 p-[3px]">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-primary-400/50"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
