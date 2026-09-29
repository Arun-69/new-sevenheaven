// Fixed price cards shown on the homepage and /packages page.
// These are starting/indicative prices — edit freely. Amounts are in INR (₹).
// For a fully custom quote, the interactive builder further down /packages still applies.

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "silver",
    name: "Silver",
    price: "₹25,000",
    priceNote: "starting price",
    description: "Essential coverage for intimate events and single-day functions.",
    features: [
      "1 Photographer, 1 Day",
      "300+ Edited Photos",
      "Online Gallery",
      "1 Photo Album (20 pages)",
      "Delivery in 15 Days",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: "₹55,000",
    priceNote: "starting price",
    description: "Our most-booked package — full-day photo + film coverage.",
    features: [
      "2 Photographers + 1 Cinematographer",
      "600+ Edited Photos",
      "Cinematic Highlight Film",
      "Premium Album (30 pages)",
      "Drone Coverage",
      "Delivery in 20 Days",
    ],
    highlighted: true,
  },
  {
    id: "platinum",
    name: "Platinum",
    price: "₹1,10,000",
    priceNote: "starting price",
    description: "Complete multi-day coverage for weddings and big celebrations.",
    features: [
      "Full Team — Photo, Film & Drone",
      "Multi-Day Coverage",
      "1200+ Edited Photos",
      "Full Wedding Film + Teaser",
      "Luxury Album (40 pages)",
      "Priority Delivery in 10 Days",
    ],
  },
];
