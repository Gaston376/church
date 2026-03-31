import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, MapPin, BookOpen, Heart } from "lucide-react";

const stats = [
  { icon: Users, value: 2500, suffix: "+", label: "Members & Growing" },
  { icon: MapPin, value: 12, suffix: "", label: "Outreach Locations" },
  { icon: BookOpen, value: 8, suffix: "+", label: "Years of Ministry" },
  { icon: Heart, value: 5000, suffix: "+", label: "Lives Touched" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const StatsCounter = () => (
  <section className="py-20 bg-foreground relative overflow-hidden">
    {/* Decorative orbs */}
    <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
    <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-[80px]" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center mb-4 border border-primary/30">
              <s.icon className="text-accent" size={28} />
            </div>
            <AnimatedNumber target={s.value} suffix={s.suffix} />
            <p className="mt-2 text-background/60 text-sm font-medium tracking-wide uppercase">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsCounter;
