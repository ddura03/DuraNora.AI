import { ShowcasePageContent } from "@/components/showcase/ShowcasePageContent";
import { fetchShowcaseDataServer } from "@/lib/store/showcase-server";

export default async function ShowcaseRoute() {
  try {
    const data = await fetchShowcaseDataServer();
    const initialData = {
      projects: data.projects,
      myProjects: data.myProjects,
      likedDbIds: Array.from(data.likedDbIds),
    };
    return <ShowcasePageContent initialData={initialData} />;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not load projects";
    console.error("[showcase page]", err);
    return <ShowcasePageContent initialError={message} />;
  }
}
