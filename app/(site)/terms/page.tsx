import { LegalPageContent } from "@/components/legal/LegalPageContent";
import { TERMS_SECTIONS } from "@/lib/legal-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service · DuraNoia.AI",
  description: "Terms of Service for DuraNoia.AI",
};

export default function TermsPage() {
  return (
    <LegalPageContent
      title="Terms of Service"
      breadcrumbLabel="Terms of Service"
      intro="These terms govern your access to and use of DuraNoia.AI, including our lessons, showcase, and related features. Please read them carefully before creating an account or using the platform."
      sections={TERMS_SECTIONS}
      crossLink={{ href: "/privacy", label: "Privacy Policy" }}
    />
  );
}
