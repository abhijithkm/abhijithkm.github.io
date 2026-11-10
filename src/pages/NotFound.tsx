import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { personalDetails } from "../data/profile";

export default function NotFound() {
  usePageMeta({
    title: `Page not found — ${personalDetails.name}`,
    description: "The page you're looking for doesn't exist.",
    path: "/",
  });

  return (
    <main className="flex min-h-screen flex-col items-start justify-center gap-4 px-6 mx-auto max-w-xl">
      <p className="label">404</p>
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-surface-50">
        Page not found
      </h1>
      <p className="text-base leading-relaxed text-surface-100/80">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex rounded-full bg-surface-50 px-6 py-2.5 text-sm font-semibold text-surface-950 transition-opacity hover:opacity-85"
      >
        Back to portfolio
      </Link>
    </main>
  );
}
