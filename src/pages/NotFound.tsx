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
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="bg-gradient-to-r from-primary-400 to-accent-purple bg-clip-text text-6xl font-bold text-transparent">
        404
      </span>
      <h1 className="text-xl font-semibold text-white">Page not found</h1>
      <p className="max-w-md text-sm text-surface-100/50">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-lg border border-primary-500/20 bg-primary-600/15 px-5 py-2.5 text-sm font-medium text-primary-400 transition-colors hover:bg-primary-600/25"
      >
        Back to portfolio
      </Link>
    </div>
  );
}
