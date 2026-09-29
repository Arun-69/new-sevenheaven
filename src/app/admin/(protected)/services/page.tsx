import { getServices } from "@/lib/content";
import ServicesManager from "@/components/admin/ServicesManager";

export default async function AdminServicesPage() {
  const services = await getServices();
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-2">Services</h1>
      <p className="text-sm text-slate-500 mb-8">
        Manage every service listed on your Services page — title, category,
        description and image.
      </p>
      <ServicesManager initialServices={services} />
    </div>
  );
}
