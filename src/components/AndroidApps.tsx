import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import AndroidAppCard from "./apps/AndroidAppCard";
import { androidApps } from "../data/androidApps";

export default function AndroidApps() {
  if (androidApps.length === 0) return null;
  const live = androidApps.filter((a) => a.playStoreUrl).length;

  return (
    <SectionWrapper
      id="android-apps"
      eyebrow={`Shipped · ${live} live on Google Play`}
      title="Android apps"
      subtitle="Built on evenings and weekends, published under my own name. Each one has its own page, screenshots and privacy policy."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {androidApps.map((app, i) => (
          <AndroidAppCard key={app.slug} app={app} i={i} />
        ))}
      </div>
      <div className="mt-8">
        <Link
          to="/apps"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 transition-colors hover:text-primary-300"
        >
          All Android apps <ArrowRight size={15} />
        </Link>
      </div>
    </SectionWrapper>
  );
}
