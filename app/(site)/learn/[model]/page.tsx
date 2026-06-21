import { ModelLessonPage } from "@/components/model/ModelLessonPage";

type Props = { params: Promise<{ model: string }> };

export default async function ModelPage({ params }: Props) {
  const { model } = await params;
  return <ModelLessonPage modelSlug={model} />;
}
