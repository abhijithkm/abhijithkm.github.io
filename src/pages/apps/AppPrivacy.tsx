import { Link, useParams } from "react-router-dom";
import { ShieldCheck, ArrowLeft, Mail } from "lucide-react";
import type { ReactNode } from "react";
import AppPageLayout from "../../components/apps/AppPageLayout";
import AppImage from "../../components/apps/AppImage";
import { getAndroidApp } from "../../data/androidApps";
import { usePageMeta } from "../../hooks/usePageMeta";
import { personalDetails } from "../../data/profile";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-surface-100/55">
        {children}
      </div>
    </section>
  );
}

export default function AppPrivacy() {
  const { slug } = useParams<{ slug: string }>();
  const app = slug ? getAndroidApp(slug) : undefined;

  usePageMeta({
    title: app
      ? `Privacy Policy — ${app.name}`
      : `Privacy Policy — ${personalDetails.name}`,
    description: app
      ? `Privacy policy for the ${app.name} Android app: what data is collected, how it is used, and your choices.`
      : "Privacy policy",
    path: app ? `/apps/${app.slug}/privacy/` : "/apps/",
  });

  if (!app) {
    return (
      <AppPageLayout>
        <div className="flex flex-col items-center gap-4 px-6 py-32 text-center">
          <h1 className="text-2xl font-bold text-white">Page not found</h1>
          <Link
            to="/apps"
            className="text-sm font-medium text-primary-400 hover:text-primary-300"
          >
            Browse all Android apps →
          </Link>
        </div>
      </AppPageLayout>
    );
  }

  const p = app.privacy;
  const developer = personalDetails.name;
  const contactEmail = personalDetails.email;

  return (
    <AppPageLayout>
      <article className="mx-auto max-w-3xl px-6 py-14 md:py-20">
        {/* ── Header ── */}
        <Link
          to={`/apps/${app.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 transition-colors hover:text-primary-300"
        >
          <ArrowLeft size={14} /> Back to {app.name}
        </Link>

        <div className="mt-6 flex items-start gap-4">
          <AppImage
            src={app.icon}
            alt={`${app.name} icon`}
            variant="icon"
            loading="eager"
            className="h-14 w-14 shrink-0 rounded-xl border border-white/[0.08] object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              {app.name} — Privacy Policy
            </h1>
            <p className="mt-1.5 text-sm text-surface-100/40">
              Effective date: {p.effectiveDate}
            </p>
          </div>
        </div>

        <p className="mt-8 text-[15px] leading-relaxed text-surface-100/55">
          This privacy policy applies to the <strong>{app.name}</strong>{" "}
          mobile application
          {app.packageId ? (
            <>
              {" "}
              (package{" "}
              <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[13px] text-surface-100/70">
                {app.packageId}
              </code>
              )
            </>
          ) : null}{" "}
          for Android devices, created by {developer} ("we", "our", or "us").
          It describes what information the app collects, how it is used, and
          the choices you have.
        </p>

        {/* ── Data collection ── */}
        <Section title="Information we collect">
          {p.collectsPersonalData && p.dataCollected.length > 0 ? (
            <>
              <p>The app collects the following information:</p>
              <ul className="space-y-3">
                {p.dataCollected.map((d) => (
                  <li
                    key={d.type}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                  >
                    <span className="font-medium text-white">{d.type}</span>
                    <p className="mt-1 text-sm text-surface-100/50">
                      {d.purpose}
                    </p>
                  </li>
                ))}
              </ul>
              <p>
                We do not sell your personal information to anyone, and we do
                not share it with third parties except as described in this
                policy.
              </p>
            </>
          ) : (
            <p>
              {app.name} does <strong>not</strong> collect, store, or share any
              personally identifiable information. The app does not require you
              to create an account, and no personal data leaves your device.
            </p>
          )}
          {p.accountRequired && (
            <p>
              An account is required to use the app. Account details are used
              solely to provide the app's functionality.
            </p>
          )}
        </Section>

        {/* ── Permissions ── */}
        {p.permissions.length > 0 && (
          <Section title="App permissions">
            <p>
              The app requests the following Android permissions, used only for
              the purposes described:
            </p>
            <ul className="space-y-3">
              {p.permissions.map((perm) => (
                <li
                  key={perm.name}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                >
                  <span className="font-medium text-white">{perm.name}</span>
                  <p className="mt-1 text-sm text-surface-100/50">
                    {perm.reason}
                  </p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ── Ads ── */}
        {p.showsAds && (
          <Section title="Advertising">
            <p>
              The app displays advertisements served by third-party advertising
              networks. These networks may use device identifiers (such as the
              Android Advertising ID) to show ads. You can reset or opt out of
              ad personalization at any time from your device's Google
              settings.
            </p>
          </Section>
        )}

        {/* ── Analytics ── */}
        {p.usesAnalytics && (
          <Section title="Analytics">
            <p>
              The app uses analytics tools to collect anonymous, aggregated
              usage data (such as screens viewed and feature usage) to help
              improve the app. This data cannot be used to identify you
              personally.
            </p>
          </Section>
        )}

        {/* ── Third-party services ── */}
        {p.thirdPartyServices.length > 0 && (
          <Section title="Third-party services">
            <p>
              The app uses the following third-party services, which have their
              own privacy policies:
            </p>
            <ul className="list-inside space-y-2">
              {p.thirdPartyServices.map((svc) => (
                <li key={svc.name}>
                  <a
                    href={svc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary-400 underline-offset-4 transition-colors hover:text-primary-300 hover:underline"
                  >
                    {svc.name}
                  </a>{" "}
                  <span className="text-surface-100/35">— privacy policy</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ── Retention & deletion ── */}
        <Section title="Data retention and deletion">
          <p>
            {p.dataDeletionNote ??
              "Any data the app stores remains on your device. You can remove it at any time by clearing the app's storage from Android settings or by uninstalling the app."}
          </p>
          <p>
            If you have questions about data deletion, contact us at the email
            address below and we will respond promptly.
          </p>
        </Section>

        {/* ── Children ── */}
        <Section title="Children's privacy">
          {p.childDirected ? (
            <p>
              The app is designed to be appropriate for children and complies
              with applicable children's privacy regulations. We do not
              knowingly collect personal information from children.
            </p>
          ) : (
            <p>
              The app is not directed at children under the age of 13, and we
              do not knowingly collect personal information from children under
              13. If you believe a child has provided us with personal
              information, please contact us and we will delete it.
            </p>
          )}
        </Section>

        {/* ── Security ── */}
        <Section title="Security">
          <p>
            We value your trust and use commercially reasonable safeguards to
            protect any information handled by the app. However, no method of
            electronic storage or transmission is 100% secure, so we cannot
            guarantee absolute security.
          </p>
        </Section>

        {/* ── Changes ── */}
        <Section title="Changes to this policy">
          <p>
            We may update this privacy policy from time to time. Changes will
            be posted on this page with an updated effective date. Continued
            use of the app after changes are posted constitutes acceptance of
            the revised policy.
          </p>
        </Section>

        {/* ── Contact ── */}
        <Section title="Contact us">
          <p>
            If you have any questions or suggestions about this privacy policy,
            or about how {app.name} handles your data, contact:
          </p>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <p className="font-medium text-white">{developer}</p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 transition-colors hover:text-primary-300"
            >
              <Mail size={13} /> {contactEmail}
            </a>
          </div>
        </Section>

        <div className="mt-14 flex items-center gap-2 border-t border-white/[0.06] pt-6 text-xs text-surface-100/30">
          <ShieldCheck size={14} />
          <span>
            Privacy policy for {app.name} · Last updated {p.effectiveDate}
          </span>
        </div>
      </article>
    </AppPageLayout>
  );
}
