export type FilmCategory =
  | "Wedding Films"
  | "Pre-Wedding Films"
  | "Birthday Films"
  | "Corporate Films"
  | "Event Highlights";

export interface Film {
  id: string;
  title: string;
  category: FilmCategory;
  thumbnail: string;
  // Placeholder: in production this becomes a real video URL / player embed.
  videoUrl: string;
  duration: string;
}

export const filmCategories: FilmCategory[] = [
  "Wedding Films",
  "Pre-Wedding Films",
  "Birthday Films",
  "Corporate Films",
  "Event Highlights",
];

export const films: Film[] = [
  {
    id: "f1",
    title: "Hari × Priya — The Full Story",
    category: "Wedding Films",
    thumbnail:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    videoUrl: "",
    duration: "4:12",
  },
  {
    id: "f2",
    title: "Kavya × Arjun — Coorg Diaries",
    category: "Pre-Wedding Films",
    thumbnail:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop",
    videoUrl: "",
    duration: "2:45",
  },
  {
    id: "f3",
    title: "Priya Turns 30",
    category: "Birthday Films",
    thumbnail:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop",
    videoUrl: "",
    duration: "3:02",
  },
  {
    id: "f4",
    title: "ABC Corp. Annual Summit",
    category: "Corporate Films",
    thumbnail:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
    videoUrl: "",
    duration: "5:30",
  },
  {
    id: "f5",
    title: "Highlights — 2026 Season",
    category: "Event Highlights",
    thumbnail:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1600&auto=format&fit=crop",
    videoUrl: "",
    duration: "1:58",
  },
  {
    id: "f6",
    title: "Rahul × Sneha — The Proposal",
    category: "Wedding Films",
    thumbnail:
      "https://images.unsplash.com/photo-1511285560929-e5f2c7c51f42?q=80&w=1600&auto=format&fit=crop",
    videoUrl: "",
    duration: "2:20",
  },
];
