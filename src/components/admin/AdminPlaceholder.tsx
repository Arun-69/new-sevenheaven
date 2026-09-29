export default function AdminPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-2">{title}</h1>
      <p className="text-sm text-slate-500 mb-8">{description}</p>
      <div className="bg-[#111318] border border-white/5 rounded-lg p-10 text-center">
        <p className="text-sm text-slate-400">
          This section connects to the future REST API. Layout and data
          model are ready — wire up the backend to make it live.
        </p>
      </div>
    </div>
  );
}
