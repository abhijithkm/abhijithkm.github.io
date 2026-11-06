import { personalDetails } from "../data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-sm text-surface-100/45">
        <p>
          {personalDetails.name} &middot; {new Date().getFullYear()}
        </p>
        <p className="font-mono text-xs">Built with React, Vite and Tailwind. Hosted on GitHub Pages.</p>
      </div>
    </footer>
  );
}
