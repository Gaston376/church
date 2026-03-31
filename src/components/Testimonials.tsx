import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Nakamya",
    role: "Church Member since 2020",
    text: "This ministry changed my life completely. Through the prayer tower, I found deliverance and a new purpose. The love and support here is unlike anything I've experienced.",
  },
  {
    name: "David Ssemakula",
    role: "Youth Ministry Leader",
    text: "The youth programs have transformed so many young people in Massajja. We've seen school dropouts return to education and find hope through Christ's love.",
  },
  {
    name: "Grace Namutebi",
    role: "Outreach Beneficiary",
    text: "When my family had nothing, the church came to us with food, prayer, and genuine care. They didn't just give us provisions — they gave us hope and dignity.",
  },
  {
    name: "Pastor James Kiggundu",
    role: "Visiting Minister, Jinja",
    text: "The level of intercession and spiritual depth at Massajja Tower is remarkable. This ministry is truly a beacon of light for the nation of Uganda.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 bg-card/80 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-[60px]" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-[50px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">What People Say</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Hear from those whose lives have been transformed through this ministry.</p>
          <div className="mt-4 h-1 w-20 bg-hero-gradient rounded-full mx-auto" />
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="bg-background rounded-2xl p-8 md:p-12 shadow-warm text-center relative"
            >
              <Quote className="mx-auto text-accent/30 mb-6" size={48} />
              <p className="text-foreground text-lg md:text-xl leading-relaxed italic font-heading">
                "{testimonials[current].text}"
              </p>
              <div className="mt-8">
                <p className="font-heading font-bold text-foreground text-lg">{testimonials[current].name}</p>
                <p className="text-accent text-sm font-semibold">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronLeft size={20} className="text-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-8" : "bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronRight size={20} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
