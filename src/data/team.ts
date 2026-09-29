export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const team: TeamMember[] = [
  {
    id: "founder",
    name: "The Founder",
    role: "Studio Owner & Lead Photographer",
    bio: "Started with one camera and a promise to never miss the moment that mattered. A decade later, that promise is the whole studio.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "photographer-1",
    name: "Lead Photographer",
    role: "Weddings & Portraits",
    bio: "Finds the quiet moment in every loud room — the held hand, the held breath.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "videographer-1",
    name: "Lead Videographer",
    role: "Films & Cinematography",
    bio: "Believes a film should feel like a memory, not a highlight reel.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "designer-1",
    name: "Creative Designer",
    role: "Invitations & Brand Design",
    bio: "Designs the first impression your guests get of your event, before it even begins.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "editor-1",
    name: "Lead Editor",
    role: "Retouching & Post-Production",
    bio: "Turns thousands of raw frames into the handful that tell your story right.",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1200&auto=format&fit=crop",
  },
];
