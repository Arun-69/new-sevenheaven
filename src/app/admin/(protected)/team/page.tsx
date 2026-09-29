import { getTeam } from "@/lib/content";
import TeamManager from "@/components/admin/TeamManager";

export default async function AdminTeamPage() {
  const team = await getTeam();
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-2">Team</h1>
      <p className="text-sm text-slate-500 mb-8">
        Add, edit, or remove the people shown on your About page and homepage —
        name, role, bio and photo.
      </p>
      <TeamManager initialTeam={team} />
    </div>
  );
}
