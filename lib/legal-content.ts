export type LegalSection = {
  heading: string;
  body: string;
};

export const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "Acceptance of terms",
    body: "By accessing or using DuraNoia.AI, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, do not use the platform. These terms apply to all visitors, registered users, and contributors.",
  },
  {
    heading: "Your account",
    body: "You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. You must provide accurate information when registering and notify us promptly of any unauthorized use. We may suspend or terminate accounts that violate these terms or pose a security risk.",
  },
  {
    heading: "Acceptable use",
    body: "You agree to use DuraNoia only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use of the service. Prohibited conduct includes harassment, scraping or automated abuse, attempting to bypass security controls, uploading malware, or using the platform to distribute spam or unlawful content.",
  },
  {
    heading: "User content & the AI Showcase",
    body: "You retain ownership of content you submit, including showcase projects, comments, and profile information. By posting content, you grant DuraNoia a non-exclusive, worldwide license to host, display, and distribute that content in connection with operating the service. You represent that you have the rights needed to share what you post.",
  },
  {
    heading: "Third-party AI tools & links",
    body: "DuraNoia teaches and links to third-party AI products and external websites. We do not control those services and are not responsible for their availability, terms, pricing, or outputs. Your use of third-party tools is governed by their own policies, and any transactions or data sharing with them is between you and the provider.",
  },
  {
    heading: "Intellectual property",
    body: "The DuraNoia name, branding, curriculum structure, site design, and original materials are owned by DuraNoia or its licensors. Third-party model names, logos, and trademarks belong to their respective owners and are used for identification and educational purposes. You may not copy, modify, or redistribute our materials except as expressly permitted.",
  },
  {
    heading: "Termination",
    body: "You may stop using DuraNoia at any time. We may suspend or terminate your access if you breach these terms, if required by law, or if we discontinue the service. Upon termination, provisions that by their nature should survive — including disclaimers, limitations of liability, and dispute provisions — will remain in effect.",
  },
  {
    heading: "Disclaimers",
    body: "DuraNoia is provided on an \"as is\" and \"as available\" basis for educational purposes. We do not guarantee that lessons, recommendations, or third-party integrations will meet your requirements, produce specific results, or remain error-free. AI outputs may be inaccurate or incomplete; you are responsible for verifying information before relying on it.",
  },
  {
    heading: "Limitation of liability",
    body: "To the fullest extent permitted by law, DuraNoia and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, data, or goodwill arising from your use of the service. Our total liability for any claim relating to the service is limited to the amount you paid us in the twelve months before the claim, or one hundred U.S. dollars if you have not paid anything.",
  },
  {
    heading: "Changes to these terms",
    body: "We may update these Terms of Service from time to time. When we make material changes, we will post the revised terms on this page and update the \"Last updated\" date. Continued use of DuraNoia after changes become effective constitutes acceptance of the revised terms.",
  },
  {
    heading: "Contact",
    body: "Questions about these Terms of Service may be sent to legal@duranoia.ai. We will respond to good-faith inquiries within a reasonable time.",
  },
];

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "Information we collect",
    body: "We collect information you provide directly, such as your name, email address, profile details, showcase submissions, comments, and lesson progress. We also collect technical data like device type, browser, IP address, and usage logs. Passwords are never stored in plain text — they are handled by our authentication provider and stored only as a secure one-way hash.",
  },
  {
    heading: "How we use your information",
    body: "We use your information to operate and improve DuraNoia, authenticate your account, save your learning progress, display showcase content, send service-related communications, and protect the platform against abuse. We may use aggregated or de-identified data to understand how the product is used and to plan improvements.",
  },
  {
    heading: "Legal bases for processing (GDPR)",
    body: "Where the GDPR applies, we process personal data based on one or more of the following: performance of a contract (providing the service you signed up for), legitimate interests (security, analytics, and product improvement), consent (where required, such as optional marketing), and legal obligation (when we must retain or disclose data to comply with law).",
  },
  {
    heading: "Third-party services",
    body: "We rely on trusted providers for hosting, database infrastructure, authentication (including optional Google sign-in), email delivery, and analytics. These processors handle data on our behalf under contractual safeguards. We do not sell your personal information to third parties.",
  },
  {
    heading: "Cookies & similar technologies",
    body: "We use cookies and similar technologies to keep you signed in, remember preferences, and understand how the site is used. You can control cookies through your browser settings, though disabling certain cookies may limit functionality such as staying logged in across sessions.",
  },
  {
    heading: "Data retention",
    body: "We retain account and progress data for as long as your account is active or as needed to provide the service. If you delete your account, we will delete or anonymize personal data within a reasonable period, except where retention is required for legal, security, or backup purposes.",
  },
  {
    heading: "Your rights",
    body: "Depending on your location, you may have the right to access, correct, delete, or export your personal data, and to object to or restrict certain processing. You may also withdraw consent where processing is consent-based. To exercise these rights, contact us at privacy@duranoia.ai and we will respond as required by applicable law.",
  },
  {
    heading: "Data security",
    body: "We implement administrative, technical, and organizational measures designed to protect personal data, including encryption in transit, access controls, and secure authentication practices. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
  },
  {
    heading: "Children's privacy",
    body: "DuraNoia is not directed to children under 13 (or the minimum age required in your jurisdiction), and we do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us so we can take appropriate steps to delete it.",
  },
  {
    heading: "Changes to this policy",
    body: "We may update this Privacy Policy from time to time. When we do, we will revise the \"Last updated\" date on this page and, where appropriate, provide additional notice. Your continued use of DuraNoia after changes take effect means you accept the updated policy.",
  },
  {
    heading: "Contact",
    body: "Privacy questions and requests may be sent to privacy@duranoia.ai. We will review and respond in accordance with applicable privacy laws.",
  },
];
