import raw from "./androidApps.json";

// ─── Android Apps ───────────────────────────────────────────────────
//
// Edit src/data/androidApps.json to add or update apps — every page
// (/apps, /apps/<slug>, /apps/<slug>/privacy) is generated from it.
// Screenshots + icon for each app live in public/apps/<slug>/.
//
// Entries flagged `"sample": true` are visible ONLY in `npm run dev`;
// they are excluded from production builds and from prerendered pages,
// so pushing before replacing them will not publish placeholder apps.

export interface CollectedData {
  /** e.g. "Email address", "Location (GPS)" */
  type: string;
  /** Why it is collected and where it is stored */
  purpose: string;
}

export interface AppPermission {
  name: string;
  reason: string;
}

export interface ThirdPartyService {
  name: string;
  /** Link to the service's own privacy policy */
  url: string;
}

export interface AndroidAppPrivacy {
  /** Human-readable, e.g. "August 5, 2026" */
  effectiveDate: string;
  collectsPersonalData: boolean;
  dataCollected: CollectedData[];
  permissions: AppPermission[];
  thirdPartyServices: ThirdPartyService[];
  showsAds: boolean;
  usesAnalytics: boolean;
  accountRequired: boolean;
  childDirected: boolean;
  dataDeletionNote?: string;
}

export interface AndroidApp {
  /** URL segment: /apps/<slug> — lowercase, hyphenated, permanent */
  slug: string;
  name: string;
  tagline: string;
  /** Long description, one string per paragraph */
  description: string[];
  category: string;
  tags: string[];
  icon: string;
  screenshots: string[];
  playStoreUrl?: string | null;
  packageId?: string;
  releaseYear?: number;
  features: string[];
  tech: string[];
  privacy: AndroidAppPrivacy;
  /** Dev-only placeholder entry — never rendered in production */
  sample?: boolean;
}

const allApps = raw as AndroidApp[];

// Samples render in dev, or in a build made with VITE_INCLUDE_SAMPLES=1
// (used together with PRERENDER_INCLUDE_SAMPLES=1 to test the pipeline).
const includeSamples =
  import.meta.env.DEV || import.meta.env.VITE_INCLUDE_SAMPLES === "1";

export const androidApps: AndroidApp[] = allApps.filter(
  (app) => includeSamples || !app.sample
);

export function getAndroidApp(slug: string): AndroidApp | undefined {
  return androidApps.find((app) => app.slug === slug);
}

export const androidCategoryStyles: Record<string, string> = {
  Productivity: "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
  "Auto & Vehicles": "border-sky-500/25 bg-sky-500/10 text-sky-400",
  "Health & Fitness": "border-rose-500/25 bg-rose-500/10 text-rose-400",
  Utility: "border-blue-500/25 bg-blue-500/10 text-blue-400",
  Game: "border-yellow-500/25 bg-yellow-500/10 text-yellow-400",
  Lifestyle: "border-cyan-500/25 bg-cyan-500/10 text-cyan-400",
  Education: "border-purple-500/25 bg-purple-500/10 text-purple-400",
  Finance: "border-teal-500/25 bg-teal-500/10 text-teal-400",
  Tools: "border-orange-500/25 bg-orange-500/10 text-orange-400",
};

export const fallbackCategoryStyle =
  "border-white/[0.08] bg-white/[0.04] text-surface-100/50";
