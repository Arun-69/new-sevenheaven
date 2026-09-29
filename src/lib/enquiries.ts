import crypto from "crypto";
import { readJSON, writeJSON } from "@/lib/storage";

export interface Enquiry {
  id: string;
  createdAt: string;
  status: "new" | "read" | "archived";
  source: string; // "contact" | "packages" | etc.
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  packageId?: string;
  message?: string;
}

const FILE = "enquiries.json";

export async function getEnquiries(): Promise<Enquiry[]> {
  return readJSON<Enquiry[]>(FILE, []);
}

export async function addEnquiry(
  data: Omit<Enquiry, "id" | "createdAt" | "status">
): Promise<Enquiry> {
  const all = await getEnquiries();
  const entry: Enquiry = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  all.unshift(entry);
  await writeJSON(FILE, all);
  return entry;
}

export async function updateEnquiry(
  id: string,
  patch: Partial<Pick<Enquiry, "status">>
): Promise<Enquiry | null> {
  const all = await getEnquiries();
  const idx = all.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...patch };
  await writeJSON(FILE, all);
  return all[idx];
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const all = await getEnquiries();
  const next = all.filter((e) => e.id !== id);
  if (next.length === all.length) return false;
  await writeJSON(FILE, next);
  return true;
}
