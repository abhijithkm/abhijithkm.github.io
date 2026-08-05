import { useEffect } from "react";

const SITE_ORIGIN = "https://abhijithkm.github.io";

interface PageMeta {
  title: string;
  description: string;
  /** Path with trailing slash for subpages, e.g. "/apps/my-app/" */
  path: string;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Keeps document title / description / OG / canonical in sync per route. */
export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    const url = SITE_ORIGIN + path;
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    const canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (canonical) canonical.href = url;
  }, [title, description, path]);
}
