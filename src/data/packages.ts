export interface EventOption {
  id: string;
  label: string;
}

export interface ServiceOption {
  id: string;
  label: string;
}

export const packageEventOptions: EventOption[] = [
  { id: "wedding", label: "Wedding" },
  { id: "birthday", label: "Birthday" },
  { id: "corporate", label: "Corporate" },
  { id: "engagement", label: "Engagement" },
  { id: "baby-event", label: "Baby Event" },
  { id: "other", label: "Other" },
];

export const packageServiceOptions: ServiceOption[] = [
  { id: "photography", label: "Photography" },
  { id: "videography", label: "Videography" },
  { id: "drone", label: "Drone" },
  { id: "cinematic-film", label: "Cinematic Film" },
  { id: "live-streaming", label: "Live Streaming" },
  { id: "invitation-design", label: "Invitation Design" },
  { id: "album", label: "Album" },
  { id: "printing", label: "Printing" },
  { id: "social-media", label: "Social Media" },
];

export interface QuoteRequest {
  eventTypeId: string;
  serviceIds: string[];
  eventDate: string;
  location: string;
  expectedGuests: string;
  name: string;
  phone: string;
  email: string;
}
