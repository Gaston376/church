import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, Sparkles, Bell } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import worship3 from "@/assets/worship-3.jpg";
import worship4 from "@/assets/worship-4.jpg";
import community1 from "@/assets/community-1.jpg";
import prayer1 from "@/assets/prayer-1.jpg";
import event3 from "@/assets/event-3.jpg";
import church1 from "@/assets/church-1.jpg";
import intercessory from "@/assets/intercessory.jpg";

const API = "https://towerintercessoryministry.towerintercessoryministry.workers.dev";
const fallbackImages = [intercessory, worship3, worship4, community1, prayer1, event3, church1];

interface Update { id: number; title: string; content: string; date: string; }

const Updates = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API}/updates`)
      .then((r) => r.json())
      .then((d) => { setUpdates(d.updates || []); })
      .catch(() => setUpdates([]))
      .finally(() => setLoading(false));
  }, []);

  const featured = updates[0];
  const rest = updates.slice(1);

  return (
    <Layout>
      <PageHero title="Latest Updates" subtitle="Stay informed about what God is doing through our ministry." />

      <section className="py-24 bg-background/80 backdrop-blur-sm bg-section-glow">
        <div className="container mx-auto px-4">

          {/* Loading skeletons */}
          {loading && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="h-80 bg-card rounded-2xl animate-pulse shadow-warm" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1,2].map(i => <div key={i} className="h-48 bg-card rounded-2xl animate-pulse shadow-warm" />)}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && updates.length === 0 && (
            <div className="max-w-md mx-auto text-center py-20">
              <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
                <Bell size={32} className="text-muted-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">No updates yet</h3>
              <p className="mt-2 text-muted-foreground">Check back soon — God is always moving.</p>
            </div>
          )}

          {!loading && updates.length > 0 && (
            <div className="max-w-5xl mx-auto space-y-10">

              {/* Featured — first update, large card */}
              <motion.article
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative rounded-3xl overflow-hidden shadow-gold group cursor-pointer"
                onClick={() => setActive(active === featured.id ? null : featured.id)}
              >
                <div className="absolute inset-0">
                  <img src={fallbackImages[0]} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
                </div>
                <div className="relative z-10 p-8 md:p-12 min-h-[380px] flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles size={11} /> Latest
                    </span>
                    <span className="text-white/70 text-sm flex items-center gap-1">
                      <Calendar size={13} /> {featured.date}
                    </span>
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">{featured.title}</h2>
                  <AnimatePresence>
                    {active === featured.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 text-white/80 text-base leading-relaxed max-w-2xl"
                      >
                        {featured.content}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <div className="mt-4 flex items-center gap-2 text-accent font-semibold text-sm">
                    {active === featured.id ? "Click to collapse" : "Click to read more"}
                    <ArrowRight size={16} className={`transition-transform ${active === featured.id ? "rotate-90" : "group-hover:translate-x-1"}`} />
                  </div>
                </div>
              </motion.article>

              {/* Rest — grid cards */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {rest.map((u, i) => (
                    <motion.article
                      key={u.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      onClick={() => setActive(active === u.id ? null : u.id)}
                      className="bg-card rounded-2xl overflow-hidden shadow-warm hover:shadow-gold transition-all hover:-translate-y-1 group cursor-pointer"
                    >
                      <div className="h-44 overflow-hidden relative">
                        <img
                          src={fallbackImages[(i + 1) % fallbackImages.length]}
                          alt={u.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <span className="absolute bottom-3 left-4 text-white/80 text-xs flex items-center gap-1">
                          <Calendar size={11} /> {u.date}
                        </span>
                      </div>
                      <div className="p-6">
                        <div className="w-8 h-1 bg-hero-gradient rounded-full mb-3" />
                        <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                          {u.title}
                        </h3>
                        <AnimatePresence>
                          {active === u.id && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 text-muted-foreground text-sm leading-relaxed"
                            >
                              {u.content}
                            </motion.p>
                          )}
                        </AnimatePresence>
                        <p className={`mt-2 text-muted-foreground text-sm leading-relaxed line-clamp-2 ${active === u.id ? "hidden" : ""}`}>
                          {u.content}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-primary text-sm font-semibold">
                          {active === u.id ? "Collapse" : "Read more"}
                          <ArrowRight size={14} className={`transition-transform ${active === u.id ? "rotate-90" : "group-hover:translate-x-1"}`} />
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Updates;
