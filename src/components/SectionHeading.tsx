import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const SectionHeading = ({ title, subtitle, center = true }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`mb-12 ${center ? "text-center" : ""}`}
  >
    <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
    {subtitle && <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    <div className={`mt-4 h-1 w-20 bg-hero-gradient rounded-full ${center ? "mx-auto" : ""}`} />
  </motion.div>
);

export default SectionHeading;
