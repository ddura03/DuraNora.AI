import Link from "next/link";
import { Footer } from "@/components/Footer";
import type { LegalSection } from "@/lib/legal-content";

type Props = {
  title: string;
  breadcrumbLabel: string;
  intro: string;
  sections: LegalSection[];
  crossLink: { href: string; label: string };
};

export function LegalPageContent({ title, breadcrumbLabel, intro, sections, crossLink }: Props) {
  return (
    <div className="wf">
      <main className="legal-page">
        <div className="legal-wrap">
          <nav className="legal-crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <b>{breadcrumbLabel}</b>
          </nav>
          <div className="legal-kicker">Legal</div>
          <h1 className="legal-title">{title}</h1>
          <div className="legal-updated">Last updated · June 15, 2026</div>
          <p className="legal-intro">{intro}</p>
          <div className="legal-notice" role="note">
            <strong>Placeholder document.</strong> This is standard template language for layout purposes and is not legal advice. Replace it with finalized copy reviewed by a qualified attorney before launch.
          </div>
          <div className="legal-sections">
            {sections.map((section, index) => (
              <section key={section.heading} className="legal-section">
                <h2>
                  {index + 1}. {section.heading}
                </h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
          <div className="legal-cross">
            See also:{" "}
            <Link href={crossLink.href}>{crossLink.label}</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
