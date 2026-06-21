import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { PRIVACY_SECTIONS } from "@/lib/legal-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy · DuraNoia.AI",
  description: "Privacy Policy for DuraNoia.AI",
};

export default function PrivacyPage() {
  return (
    <LegalPageContent
      title="Privacy Policy"
      breadcrumbLabel="Privacy Policy"
      intro="This policy describes how DuraNoia.AI collects, uses, and protects personal information when you use our website and services. We are committed to handling your data responsibly and transparently."
      sections={PRIVACY_SECTIONS}
      crossLink={{ href: "/terms", label: "Terms of Service" }}
    />
  );
}
