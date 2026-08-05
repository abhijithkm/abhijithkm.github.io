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
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mb-14 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="bg-gradient-to-r from-primary-400 to-accent-purple bg-clip-text text-transparent">
              Android Apps
            </span>
          </h1>
          <p className="mt-3 text-lg text-surface-100/60">
            Apps I've designed, built, and published — tap any app for
            screenshots, details, and its privacy policy.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan" />
        </div>

        {androidApps.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {androidApps.map((app, i) => (
              <AndroidAppCard key={app.slug} app={app} i={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-20 text-surface-100/40">
            <Smartphone size={32} className="text-primary-400/40" />
            <p className="text-sm">App listings coming soon.</p>
          </div>
        )}
      </div>
    </AppPageLayout>
  );
}
