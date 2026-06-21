// Shared legal page renderer (Terms of Service + Privacy Policy shells).
// Each HTML file sets window.LEGAL_DOC = "terms" | "privacy" before loading this.

const LEGAL = {
  terms: {
    title: "Terms of Service",
    updated: "June 15, 2026",
    intro: "These Terms of Service (\"Terms\") govern your access to and use of DuraNoia.AI (the \"Service\"). By creating an account or using the Service, you agree to these Terms. Please read them carefully.",
    placeholder: true,
    sections: [
      { h: "1. Acceptance of terms", b: "By accessing or using DuraNoia.AI, you confirm that you can form a binding contract with us and that you accept these Terms and our Privacy Policy. If you do not agree, you may not use the Service." },
      { h: "2. Your account", b: "You are responsible for safeguarding your account credentials and for all activity that occurs under your account. You must provide accurate information, keep it up to date, and notify us promptly of any unauthorized use. One person or entity may not maintain more than one free account." },
      { h: "3. Acceptable use", b: "You agree not to misuse the Service. This includes (but is not limited to): posting unlawful, harmful, or infringing content; attempting to disrupt or reverse-engineer the platform; scraping or harvesting data; impersonating others; or using the Service to violate any applicable law or the rights of others." },
      { h: "4. User content & the AI Showcase", b: "You retain ownership of the projects, links, descriptions, and comments you submit (\"User Content\"). By posting User Content, you grant DuraNoia.AI a non-exclusive, worldwide, royalty-free license to host, display, and distribute it within the Service for the purpose of operating and promoting the platform. You are solely responsible for your User Content and represent that you have the rights to share it." },
      { h: "5. Third-party AI tools & links", b: "DuraNoia.AI is an educational platform. We are not affiliated with, endorsed by, or responsible for the third-party AI products referenced in our lessons, nor for any external project links submitted to the AI Showcase. Your use of those third-party services is governed by their own terms." },
      { h: "6. Intellectual property", b: "The Service, including its design, lessons, text, graphics, and software, is owned by DuraNoia.AI and protected by intellectual-property laws. Third-party trademarks and logos remain the property of their respective owners and are used for identification and educational purposes only." },
      { h: "7. Termination", b: "We may suspend or terminate your access to the Service at any time, with or without notice, if you violate these Terms or if we discontinue the Service. You may stop using the Service and delete your account at any time." },
      { h: "8. Disclaimers", b: "The Service is provided \"as is\" and \"as available\" without warranties of any kind. We do not guarantee that the Service will be uninterrupted, error-free, or that the educational content is complete or current. AI is a fast-moving field and information may become outdated." },
      { h: "9. Limitation of liability", b: "To the fullest extent permitted by law, DuraNoia.AI shall not be liable for any indirect, incidental, special, or consequential damages, or any loss of data or profits, arising from your use of the Service." },
      { h: "10. Changes to these terms", b: "We may update these Terms from time to time. We will post the revised version with a new \"Last updated\" date, and material changes may be communicated by email or in-app notice. Continued use of the Service after changes take effect constitutes acceptance." },
      { h: "11. Contact", b: "Questions about these Terms can be sent to legal@duranoia.ai." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    updated: "June 15, 2026",
    intro: "This Privacy Policy explains what information DuraNoia.AI (\"we\") collects, how we use it, and the choices you have. We are committed to handling your data transparently and protecting your privacy.",
    placeholder: true,
    sections: [
      { h: "1. Information we collect", b: "Account information you provide: your name, email address, and password (stored only as a secure one-way hash — we never store or see your plain-text password). Profile details you choose to add, such as a headline, location, or LinkedIn link. Usage data: lesson progress, completed lessons, and activity within the Service. Content you create: showcase projects, descriptions, links, likes, and comments." },
      { h: "2. How we use your information", b: "We use your information to: create and manage your account; save and display your learning progress; power the AI Showcase social features; communicate with you about your account and (if you opt in) our newsletter; secure the platform and prevent abuse; and improve the Service." },
      { h: "3. Legal bases for processing", b: "Where required (e.g. under the GDPR), we process your data on the bases of performing our contract with you (running your account), your consent (e.g. marketing emails), and our legitimate interests (securing and improving the Service). You may withdraw consent at any time." },
      { h: "4. Third-party services", b: "We rely on trusted providers to operate DuraNoia.AI, including infrastructure and database hosting, authentication (including optional sign-in with Google), and analytics. These providers process data on our behalf under their own security and privacy commitments. We do not sell your personal data." },
      { h: "5. Cookies & similar technologies", b: "We use cookies and similar technologies to keep you signed in, remember preferences, and understand how the Service is used. You can control cookies through your browser settings, though some features may not function without them." },
      { h: "6. Data retention", b: "We retain your personal data for as long as your account is active or as needed to provide the Service. You may delete your account at any time, after which we will delete or anonymize your personal data, except where we must retain it to comply with legal obligations." },
      { h: "7. Your rights", b: "Depending on your location, you may have the right to access, correct, export, or delete your personal data, and to object to or restrict certain processing. To exercise these rights, contact us using the details below. You can also update much of your information directly in your profile settings." },
      { h: "8. Data security", b: "We use industry-standard safeguards to protect your data, including encryption in transit, hashed passwords, and access controls. No method of transmission or storage is completely secure, but we work to protect your information and continually improve our practices." },
      { h: "9. Children's privacy", b: "DuraNoia.AI is not directed to children under 13 (or the minimum age in your jurisdiction). We do not knowingly collect personal data from children. If you believe a child has provided us data, please contact us and we will delete it." },
      { h: "10. Changes to this policy", b: "We may update this Privacy Policy from time to time. We will post the revised version with a new \"Last updated\" date and, for material changes, provide additional notice." },
      { h: "11. Contact", b: "For privacy questions or to exercise your rights, contact privacy@duranoia.ai." },
    ],
  },
};

function LegalPage() {
  const doc = LEGAL[window.LEGAL_DOC] || LEGAL.terms;
  const other = window.LEGAL_DOC === "privacy"
    ? { label: "Terms of Service", href: "Terms of Service Page Wireframes.html" }
    : { label: "Privacy Policy", href: "Privacy Policy Page Wireframes.html" };

  return (
    <>
      <PublicBar />
      <div className="legal-wrap">
        <div className="crumb"><a onClick={() => { window.location.href = "DuraNoia Wireframes.html"; }}>Home</a> / <b>{doc.title}</b></div>

        <header className="legal-head">
          <span className="label" style={{ color: "var(--violet-deep)" }}>Legal</span>
          <h1>{doc.title}</h1>
          <div className="legal-updated">Last updated · {doc.updated}</div>
          {doc.placeholder && (
            <div className="legal-note">
              <strong>Placeholder document.</strong> This is standard template language for layout purposes and is <em>not</em> legal advice. Replace it with finalized copy reviewed by a qualified attorney (or a reputable policy generator) before launch.
            </div>
          )}
          <p className="legal-intro">{doc.intro}</p>
        </header>

        <article className="legal-body">
          {doc.sections.map((s, i) => (
            <section key={i}>
              <h2>{s.h}</h2>
              <p>{s.b}</p>
            </section>
          ))}
        </article>

        <div className="legal-foot">
          Looking for the <a onClick={() => { window.location.href = other.href; }}>{other.label}</a>?
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<LegalPage />);
