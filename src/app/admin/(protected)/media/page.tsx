import { getEditableMediaSlots } from "@/lib/media-slots";
import MediaLibraryClient from "@/components/admin/MediaLibraryClient";

export default async function AdminMediaPage() {
  const slots = await getEditableMediaSlots();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-2">Media Library</h1>
      <p className="text-sm text-slate-500 mb-8">
        Replace any image on the live site — logo and homepage banner.
        Team, portfolio and service photos are edited in their own sections. Changes go live immediately.
      </p>
      <MediaLibraryClient initialSlots={slots} />
    </div>
  );
}
