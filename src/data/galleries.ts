export interface GalleryPhoto {
  id: string;
  url: string;
  isFavorite?: boolean;
}

export interface ClientGallery {
  slug: string;
  clientNames: string;
  eventType: string;
  year: number;
  passwordProtected: boolean;
  photoCount: number;
  videoCount: number;
  photos: GalleryPhoto[];
}

export const galleries: ClientGallery[] = [
  {
    slug: "Hari-priya",
    clientNames: "Hari & Priya",
    eventType: "Wedding",
    year: 2026,
    passwordProtected: true,
    photoCount: 846,
    videoCount: 24,
    photos: [
      {
        id: "g1",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "g2",
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
        isFavorite: true,
      },
      {
        id: "g3",
        url: "https://images.unsplash.com/photo-1511285560929-e5f2c7c51f42?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "g4",
        url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "g5",
        url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
        isFavorite: true,
      },
      {
        id: "g6",
        url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "g7",
        url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "g8",
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },
];

export const getGalleryBySlug = (slug: string) =>
  galleries.find((g) => g.slug === slug);
