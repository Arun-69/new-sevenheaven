import { getPricingTiers } from "@/lib/content";
import PricingManager from "@/components/admin/PricingManager";

export default async function AdminPackagesPage() {
  const tiers = await getPricingTiers();
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-2">Packages</h1>
      <p className="text-sm text-slate-500 mb-8">
        Manage the fixed-price packages shown on your homepage and Packages
        page — name, price, description and feature list.
      </p>
      <PricingManager initialTiers={tiers} />
    </div>
  );
}
