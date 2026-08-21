import { useState } from "react";
import { ImageOff, Smartphone } from "lucide-react";

// ─── AppImage ───────────────────────────────────────────────────────
//
// An <img> that carries its own two edge cases:
//
//  • while it loads, a shimmering box holds the space, so a screenshot
//    rail on a slow connection reads as "loading" rather than as broken
//    layout, and the image fades in when it arrives;
//  • if the file is missing (404) or fails to decode, it swaps itself
//    for a styled placeholder instead of the browser's broken-image
//    glyph — an app entry can land in androidApps.json before its
//    assets do.

type Variant = "icon" | "screenshot";
type Status = "loading" | "loaded" | "failed";

export default function AppImage({
  src,
  alt,
  className,
  variant = "screenshot",
  label,
  boxClassName,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  /** Picks the placeholder icon + caption */
  variant?: Variant;
  /** Optional caption shown inside a screenshot placeholder */
  label?: string;
  /** Size (and rounding) of the box that holds the space while the image
   *  loads, and that the placeholder fills if it never does. Needed
   *  because an image has no intrinsic size until it arrives — give it
   *  both a height and a width. */
  boxClassName?: string;
  loading?: "lazy" | "eager";
}) {
  // Keyed by src, not a bare flag, so a new src starts over without an
  // effect resetting state.
  const [state, setState] = useState<{ src: string; status: Status }>({
    src,
    status: "loading",
  });
  const status: Status = state.src === src ? state.status : "loading";

  if (status === "failed") {
    const Icon = variant === "icon" ? Smartphone : ImageOff;
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 border-white/[0.08] bg-white/[0.04] text-primary-400/50 ${className ?? ""} ${boxClassName ?? ""}`}
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

  const isLoading = status === "loading";

  return (
    // The shimmer sits behind the image, and the image keeps a real box
    // while it loads — hiding it (opacity-0, zero width) stops Chrome
    // from ever starting a lazy load. Once loaded it drops the box and
    // takes its natural size, so screenshots keep their own aspect.
    <span className="relative inline-flex">
      {isLoading && (
        <span
          aria-hidden="true"
          className={`app-image-shimmer absolute inset-0 overflow-hidden bg-white/[0.03] ${boxClassName ?? ""}`}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        // A cached image can finish before React attaches onLoad — check
        // on attach too, or the shimmer would never clear.
        ref={(node) => {
          if (!node?.complete) return;
          // The guard matters: an inline ref is a new function every
          // render, so React re-attaches it every time — without it,
          // this would setState in a loop.
          if (state.src === src && state.status !== "loading") return;
          setState({
            src,
            status: node.naturalWidth > 0 ? "loaded" : "failed",
          });
        }}
        onLoad={() => setState({ src, status: "loaded" })}
        onError={() => setState({ src, status: "failed" })}
        className={`relative ${className ?? ""} ${
          isLoading ? `${boxClassName ?? ""} bg-transparent` : "app-image-fade-in"
        }`}
      />
    </span>
  );
}
