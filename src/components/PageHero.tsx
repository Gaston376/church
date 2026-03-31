import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
}

const PageHero = ({ title, subtitle }: Props) => (
  <section className="relative py-20 md:py-28 bg-foreground overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute inset-0 bg-hero-gradient opacity-20" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/15 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
    {/* Grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex items-center gap-2 text-background/50 text-sm mb-4">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-accent">{title}</span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-background">{title}</h1>
        {subtitle && <p className="mt-3 text-background/70 max-w-xl text-lg">{subtitle}</p>}
        <div className="mt-5 h-1 w-20 bg-hero-gradient rounded-full" />
      </motion.div>
    </div>
  </section>
);

export default PageHero;
