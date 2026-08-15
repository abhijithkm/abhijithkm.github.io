// ─── Section navigation ─────────────────────────────────────────────
//
// The home page is one long document of #id sections, so navigating is
// a smooth scroll rather than a route change. These helpers keep the
// address bar in sync with that scroll, so every section is linkable
// (abhijithkm.space/#skills) and the back button walks the sections.

/** Accepts "#skills" or "skills" and returns "skills". */
export function sectionId(href: string): string {
  return href.startsWith("#") ? href.slice(1) : href;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scroll to a section and push its hash onto the URL.
 *
 * `replace` swaps the current history entry instead of adding one —
 * used when restoring a deep link on load, so the back button still
 * leaves the site rather than bouncing between identical entries.
 */
export function scrollToSection(
  href: string,
  { updateHash = true, replace = false, smooth = true }: {
    updateHash?: boolean;
    replace?: boolean;
    /** Off when restoring a deep link — the reader expects to be there already */
    smooth?: boolean;
  } = {}
): boolean {
  const id = sectionId(href);
  const el = document.getElementById(id);
  if (!el) return false;

  el.scrollIntoView({
    behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto",
  });

  if (updateHash) {
    const url = `${window.location.pathname}${window.location.search}#${id}`;
    if (replace) window.history.replaceState(null, "", url);
    else if (window.location.hash !== `#${id}`)
      window.history.pushState(null, "", url);
  }
  return true;
}

/**
 * Point the URL at `href` without scrolling or adding a history entry.
 *
 * Called as the scroll-spy's active section changes, so the address bar
 * always reflects where the reader is. That matters on the way out: the
 * entry left behind when navigating to an app page carries the section
 * hash, so the back button returns to that section instead of the top.
 */
export function syncHashToSection(href: string): void {
  const id = sectionId(href);
  if (window.location.hash === `#${id}`) return;
  window.history.replaceState(
    window.history.state,
    "",
    `${window.location.pathname}${window.location.search}#${id}`
  );
}

/**
 * Scroll to `id` once it exists in the DOM.
 *
 * Home's sections are lazy-loaded, so a deep link can land before the
 * target has mounted. Polls on animation frames and gives up after
 * `timeoutMs`. Returns a cleanup function.
 */
export function scrollToSectionWhenReady(
  href: string,
  { timeoutMs = 4000, replace = true }: {
    timeoutMs?: number;
    replace?: boolean;
  } = {}
): () => void {
  let frame = 0;
  let cancelled = false;
  const deadline = performance.now() + timeoutMs;

  const attempt = () => {
    if (cancelled) return;
    if (scrollToSection(href, { replace, smooth: false })) return;
    if (performance.now() > deadline) return;
    frame = requestAnimationFrame(attempt);
  };

  frame = requestAnimationFrame(attempt);

  return () => {
    cancelled = true;
    cancelAnimationFrame(frame);
  };
}
