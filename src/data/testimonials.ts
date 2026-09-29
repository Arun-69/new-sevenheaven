export interface Testimonial {
  id: string;
  quote: string;
  clientNames: string;
  eventType: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "They didn't just photograph our wedding. They captured everything we felt that day.",
    clientNames: "Arun & Priya",
    eventType: "Wedding",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "The invitation design set the tone before a single guest arrived. Every detail matched what came after.",
    clientNames: "Kavya & Arjun",
    eventType: "Pre-Wedding & Wedding",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Our summit finally looked like the brand we spent a year building. The film still gives our team chills.",
    clientNames: "ABC Corporation",
    eventType: "Corporate Event",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "I've watched our film more times than I'd like to admit. It feels like being there again.",
    clientNames: "Rahul & Sneha",
    eventType: "Engagement",
    rating: 5,
  },
  {
    id: "t5",
    quote:
      "The album arrived and my mother cried before she'd even finished the first page.",
    clientNames: "Meera Family",
    eventType: "Baby Shower",
    rating: 5,
  },
];
