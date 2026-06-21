import { ModelHubPage } from "@/components/learn/ModelHubPage";

type Props = { params: Promise<{ model: string }> };

export default async function ModelHubRoute({ params }: Props) {
  const { model } = await params;
  return <ModelHubPage modelSlug={model.toLowerCase()} />;
}
