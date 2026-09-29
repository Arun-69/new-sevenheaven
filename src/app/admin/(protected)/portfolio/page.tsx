import { getStories } from "@/lib/content";
import StoriesManager from "@/components/admin/StoriesManager";

export default async function AdminPortfolioPage() {
  const stories = await getStories();
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-2">Portfolio</h1>
      <p className="text-sm text-slate-500 mb-8">
        Add, edit, or remove the client stories shown on your Stories page and homepage —
        name, event type, location, year, excerpt and cover photo.
      </p>
      <StoriesManager initialStories={stories} />
    </div>
  );
}
