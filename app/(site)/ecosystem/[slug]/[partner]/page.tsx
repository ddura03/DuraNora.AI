import { PairingLessonPage } from "@/components/ecosystem/PairingLessonPage";
import { allPairingRoutes } from "@/lib/ecosystem-utils";

type Props = { params: Promise<{ slug: string; partner: string }> };

export function generateStaticParams() {
  return allPairingRoutes().map(({ slug, partner }) => ({ slug, partner }));
}

export default async function EcosystemPairingPage({ params }: Props) {
  const { slug, partner } = await params;
  return <PairingLessonPage slug={slug.toLowerCase()} partnerSlug={partner.toLowerCase()} />;
}
