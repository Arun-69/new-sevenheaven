import { getEnquiries } from "@/lib/enquiries";
import EnquiriesManager from "@/components/admin/EnquiriesManager";

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-2">Enquiries</h1>
      <p className="text-sm text-slate-500 mb-8">
        Every enquiry submitted through your contact and packages forms lands
        here, and (once email is configured) is also emailed to you directly.
      </p>
      <EnquiriesManager initialEnquiries={enquiries} />
    </div>
  );
}
