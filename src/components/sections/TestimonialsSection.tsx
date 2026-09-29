import SectionHeading from "@/components/SectionHeading";
import Testimonial from "@/components/Testimonial";

export default function TestimonialsSection() {
  return (
    <section className="py-28 md:py-40 border-t border-white/10">
      <div className="container-edit">
        <SectionHeading eyebrow="Words From Clients" title={"WHAT THEY\nFELT."} className="mb-16" />
        <Testimonial />
      </div>
    </section>
  );
}
