import SectionHeading from "@/components/SectionHeading";
import PortfolioCard from "@/components/PortfolioCard";
import Reveal from "@/components/Reveal";

const products = [
  {
    title: "Wedding Album",
    subtitle: "Leather-bound, archival print",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Premium Photobook",
    subtitle: "Matte finish, lay-flat pages",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Parent Album",
    subtitle: "Compact keepsake edition",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Wall Print",
    subtitle: "Museum-grade framing",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function AlbumSection() {
  return (
    <section className="py-28 md:py-40 border-t border-white/10">
      <div className="container-edit">
        <SectionHeading eyebrow="Physical Keepsakes" title={"MEMORIES,\nMADE TO LAST."} className="mb-16" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <PortfolioCard image={p.image} title={p.title} subtitle={p.subtitle} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
