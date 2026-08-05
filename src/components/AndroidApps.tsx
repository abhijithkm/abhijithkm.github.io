import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import AndroidAppCard from "./apps/AndroidAppCard";
import { androidApps } from "../data/androidApps";

export default function AndroidApps() {
  if (androidApps.length === 0) return null;

  return (
    <SectionWrapper
      id="android-apps"
      title="Android Apps"
      subtitle="Native Android applications I've designed, built, and published"
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {androidApps.map((app, i) => (
          <AndroidAppCard key={app.slug} app={app} i={i} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/apps"
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-surface-100/60 transition-all hover:border-primary-500/30 hover:text-white"
        >
          Browse all Android apps <ArrowRight size={15} />
        </Link>
      </div>
    </SectionWrapper>
  );
}
