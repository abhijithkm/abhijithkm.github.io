import { useState } from "react";
import { ImageOff, Smartphone } from "lucide-react";

// ─── AppImage ───────────────────────────────────────────────────────
//
// An <img> that swaps itself for a styled placeholder when the file is
// missing (404) or fails to decode, instead of showing the browser's
// broken-image icon. Used for every app icon and screenshot so an app
// entry can be added to androidApps.json before its assets land in
// public/apps/<slug>/.

type Variant = "icon" | "screenshot";

export default function AppImage({
  src,
  alt,
  className,
  variant = "screenshot",
  label,
  placeholderClassName,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  /** Picks the placeholder icon + caption */
  variant?: Variant;
  /** Optional caption shown inside a screenshot placeholder */
  label?: string;
  /** Extra classes for the placeholder only — e.g. a width, since a
   *  `w-auto` image has no intrinsic size to fall back on */
  placeholderClassName?: string;
  loading?: "lazy" | "eager";
}) {
  // Track which src failed, not a bare boolean, so a new src always gets
  // a fresh chance to load without an effect resetting the flag.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc !== src) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        onError={() => setFailedSrc(src)}
        className={className}
      />
    );
  }

  const Icon = variant === "icon" ? Smartphone : ImageOff;

  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex flex-col items-center justify-center gap-2 border-white/[0.08] bg-white/[0.04] text-primary-400/50 ${className ?? ""} ${placeholderClassName ?? ""}`}
    >
      <Icon size={variant === "icon" ? 20 : 22} aria-hidden="true" />
      {variant === "screenshot" && label && (
        <span className="px-2 text-center text-[10px] font-medium leading-tight text-surface-100/30">
          {label}
        </span>
      )}
    </div>
  );
}
