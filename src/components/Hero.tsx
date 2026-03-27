import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Send, FileText, Mail } from "lucide-react";
import { personalDetails, socialLinks } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

const ParticleField = lazy(() => import("./three/ParticleField"));

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary-600/15 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent-purple/12 blur-[140px]"
        />
        <div className="absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan/8 blur-[120px]" />
      </div>

      {/* Grid pattern overlay */}
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

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        {/* Status badge */}
        <motion.div variants={item} className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-surface-100/60 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
        >
          <span className="block text-white/90">Hi, I'm</span>
          <span className="mt-1 block bg-gradient-to-r from-primary-400 via-accent-purple to-accent-cyan bg-clip-text text-transparent">
            {personalDetails.name}
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="mt-5 text-xl font-semibold tracking-wide text-surface-100/40 uppercase"
        >
          {personalDetails.tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-surface-100/50"
        >
          {personalDetails.heroDescription}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary-600/35 hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-purple opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative flex items-center gap-2">
              View Projects
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </span>
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5"
          >
            Contact Me
            <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5"
          >
            Resume
            <FileText size={16} />
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div variants={item} className="mt-8 flex items-center justify-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-surface-100/40 transition-all duration-300 hover:border-primary-500/40 hover:text-white hover:bg-white/[0.08] hover:-translate-y-0.5"
            >
              <Icon size={17} />
            </a>
          ))}
        </motion.div>

        {/* Floating tech badges */}
        <motion.div
          variants={item}
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          {["React", "TypeScript", "Laravel", "AWS", "MySQL"].map((tech, i) => (
            <motion.span
              key={tech}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
              className="rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-surface-100/40 backdrop-blur-sm transition-colors hover:text-surface-100/70 hover:border-white/10"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-surface-100/20"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="h-7 w-[18px] rounded-full border border-surface-100/15 p-[3px]">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-primary-400/60"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
