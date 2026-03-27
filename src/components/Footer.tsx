import { Mail } from "lucide-react";
import { personalDetails, socialLinks } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

const socials = [
  { icon: GithubIcon, href: socialLinks.github, label: "GitHub" },
  { icon: LinkedinIcon, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: Mail, href: socialLinks.email, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative px-6 pb-8 pt-0">
      {/* Gradient divider */}
      <div className="mx-auto mb-8 h-px max-w-6xl bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="text-sm font-medium bg-gradient-to-r from-primary-400 to-accent-cyan bg-clip-text text-transparent">
            {personalDetails.name}
          </span>
          <p className="text-xs text-surface-100/30">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-surface-100/40 transition-all duration-300 hover:border-primary-500/30 hover:text-white hover:bg-white/[0.06] hover:-translate-y-0.5"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
