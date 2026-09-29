export type ServiceCategory = "Capture" | "Create" | "Preserve" | "Deliver";

export interface Service {
  id: string;
  category: ServiceCategory;
  title: string;
  description: string;
  image: string;
}

export const serviceCategories: {
  key: ServiceCategory;
  heading: string;
  subheading: string;
}[] = [
  {
    key: "Capture",
    heading: "CAPTURE",
    subheading: "Photography · Films · Drone · Live Streaming",
  },
  {
    key: "Create",
    heading: "CREATE",
    subheading: "Invitations · Posters · Social Media · Editing",
  },
  {
    key: "Preserve",
    heading: "PRESERVE",
    subheading: "Albums · Photobooks · Frames · Prints",
  },
  {
    key: "Deliver",
    heading: "DELIVER",
    subheading: "Galleries · Downloads · Sharing",
  },
];

export const services: Service[] = [
  // CAPTURE
  {
    id: "photography",
    category: "Capture",
    title: "Event Photography",
    description:
      "Every unscripted second, held for good. From arrival to the last dance.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "wedding-photography",
    category: "Capture",
    title: "Wedding Photography",
    description:
      "A day that moves fast, told slowly — in frames you'll return to for decades.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "videography",
    category: "Capture",
    title: "Event Videography",
    description: "Motion that remembers what stills can't.",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "cinematic-films",
    category: "Capture",
    title: "Cinematic Wedding Films",
    description: "Your day, cut like a story worth watching twice.",
    image:
      "https://images.unsplash.com/photo-1511285560929-e5f2c7c51f42?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "drone",
    category: "Capture",
    title: "Drone Photography & Videography",
    description: "Perspective your venue deserves, from above.",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "live-streaming",
    category: "Capture",
    title: "Live Streaming",
    description: "For the ones who couldn't make it, but shouldn't miss it.",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "pre-wedding",
    category: "Capture",
    title: "Pre-Wedding Photography",
    description: "The story before the story.",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "corporate",
    category: "Capture",
    title: "Corporate Event Coverage",
    description: "Polished coverage for launches, summits and milestones.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
  },

  // CREATE
  {
    id: "graphic-design",
    category: "Create",
    title: "Graphic Design",
    description: "Visual identity for every touchpoint of your event.",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "wedding-invitations",
    category: "Create",
    title: "Wedding Invitations",
    description: "The first impression of a story yet to unfold.",
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab0?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "digital-invitations",
    category: "Create",
    title: "Digital Invitations",
    description: "Elegant, animated, shareable in a tap.",
    image:
      "https://images.unsplash.com/photo-1607190074257-dd4b7af0309b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "event-posters",
    category: "Create",
    title: "Event Posters",
    description: "Bold visual language for your celebration.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "social-media-design",
    category: "Create",
    title: "Social Media Designs",
    description: "Feed-ready visuals that carry your story further.",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "photo-editing",
    category: "Create",
    title: "Photo Editing & Retouching",
    description: "From raw to remarkable, frame by frame.",
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1600&auto=format&fit=crop",
  },

  // PRESERVE
  {
    id: "wedding-albums",
    category: "Preserve",
    title: "Wedding Albums",
    description: "Bound stories, made to be held.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "photobooks",
    category: "Preserve",
    title: "Photobooks",
    description: "Every chapter of your event, printed with intention.",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "photo-frames",
    category: "Preserve",
    title: "Photo Frames",
    description: "The moments that deserve a wall of their own.",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "prints",
    category: "Preserve",
    title: "Premium Photo Printing",
    description: "Archival quality, true to what you felt.",
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1600&auto=format&fit=crop",
  },

  // DELIVER
  {
    id: "client-galleries",
    category: "Deliver",
    title: "Client Photo Galleries",
    description: "Your full story, organised and ready to relive.",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "digital-delivery",
    category: "Deliver",
    title: "Digital Photo & Video Delivery",
    description: "Every frame, delivered securely and beautifully.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop",
  },
];

export const servicesByCategory = (category: ServiceCategory) =>
  services.filter((s) => s.category === category);
