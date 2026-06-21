import { PairingHubPage } from "@/components/ecosystem/PairingHubPage";
import { allEcoSlugs } from "@/lib/ecosystem-utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allEcoSlugs().map((slug) => ({ slug }));
}

export default async function EcosystemModelPage({ params }: Props) {
  const { slug } = await params;
  return <PairingHubPage slug={slug.toLowerCase()} />;
}
