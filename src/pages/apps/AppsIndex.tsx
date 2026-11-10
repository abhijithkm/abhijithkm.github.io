import { Smartphone } from "lucide-react";
import AppPageLayout from "../../components/apps/AppPageLayout";
import AndroidAppCard from "../../components/apps/AndroidAppCard";
import { androidApps } from "../../data/androidApps";
import { usePageMeta } from "../../hooks/usePageMeta";
import { personalDetails } from "../../data/profile";

export default function AppsIndex() {
  usePageMeta({
    title: `Android Apps — ${personalDetails.name}`,
    description:
      "Android applications designed and developed by Abhijith K M — details, screenshots, and privacy policies.",
    path: "/apps/",
  });

  return (
    <AppPageLayout>
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 md:py-20">
        <header className="rise mb-10">
          <p className="label">Android apps</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-surface-50 sm:text-5xl">
            Built, shipped, published.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-surface-100/80">
            Apps I've designed, built, and published. Open any app for
            screenshots, details, and its privacy policy.
          </p>
        </header>

        {androidApps.length > 0 ? (
          <div className="divide-y divide-surface-50/10 border-y border-surface-50/10">
            {androidApps.map((app, i) => (
              <AndroidAppCard key={app.slug} app={app} i={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 border-y border-surface-50/10 py-20 text-surface-100/70">
            <Smartphone size={32} className="text-accent-ink/60" aria-hidden="true" />
            <p className="text-sm">App listings coming soon.</p>
          </div>
        )}
      </div>
    </AppPageLayout>
  );
}
