import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

// Placeholder values — replace with real studio data.
const stats = [
  { value: "500+", label: "EVENTS" },
  { value: "10+", label: "SERVICES" },
  { value: "100K+", label: "MOMENTS" },
  { value: "100%", label: "PASSION" },
];

export default function StatsSection() {
  return (
    <section className="py-20 md:py-28 border-t border-white/10">
      <div className="container-edit grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <CountUp value={stat.value} />
            <p className="text-xs tracking-widest2 uppercase text-muted mt-2">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
