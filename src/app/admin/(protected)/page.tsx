import { CalendarDays, Inbox, FolderOpen, Clock } from "lucide-react";

const stats = [
  { label: "Events", value: "24", icon: CalendarDays, color: "text-indigo-300" },
  { label: "New Enquiries", value: "18", icon: Inbox, color: "text-amber-300" },
  { label: "Active Galleries", value: "12", icon: FolderOpen, color: "text-emerald-300" },
  { label: "Upcoming Events", value: "7", icon: Clock, color: "text-sky-300" },
];

const recentEvents = [
  { name: "Arun Wedding", date: "28 Sep" },
  { name: "Priya Birthday", date: "04 Oct" },
  { name: "ABC Corporate", date: "08 Oct" },
  { name: "Kavya × Arjun Pre-Wedding", date: "12 Oct" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-8">Studio Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[#111318] border border-white/5 rounded-lg p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon size={18} className={stat.color} />
              </div>
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-[#111318] border border-white/5 rounded-lg">
        <div className="px-6 py-4 border-b border-white/5">
          <p className="text-sm font-medium text-slate-200">Recent Events</p>
        </div>
        <div className="divide-y divide-white/5">
          {recentEvents.map((event) => (
            <div
              key={event.name}
              className="px-6 py-3.5 flex items-center justify-between text-sm"
            >
              <span className="text-slate-300">{event.name}</span>
              <span className="text-slate-500">{event.date}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-8">
        This is a frontend demo of the admin dashboard. Data shown is mocked —
        connect it to the future REST API to make it live.
      </p>
    </div>
  );
}
