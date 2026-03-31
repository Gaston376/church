import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import community1 from "@/assets/community-1.jpg";
import community3 from "@/assets/community-3.jpg";
import community5 from "@/assets/community-5.jpg";
import community6 from "@/assets/community-6.jpg";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";
import event4 from "@/assets/event-4.jpg";
import event5 from "@/assets/event-5.jpg";
import event6 from "@/assets/event-6.jpg";

const projects = [
  { title: "Community Evangelism", status: "Ongoing", desc: "Door-to-door and open-air evangelism across Massajja and surrounding areas, reaching the unreached with the Gospel.", img: community1 },
  { title: "Education Sponsorship", status: "Active", desc: "Sponsoring vulnerable children and orphans to access quality education from primary to secondary level.", img: community3 },
];

const galleryImages = [
  { src: community5, alt: "Community outreach" },
  { src: community6, alt: "Ministry work" },
  { src: event1, alt: "Church event" },
  { src: event2, alt: "Congregation gathering" },
  { src: event3, alt: "Ministry event" },
  { src: event4, alt: "Community service" },
  { src: event5, alt: "Outreach program" },
  { src: event6, alt: "Fellowship event" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
};

const statusColor: Record<string, string> = {
  Ongoing: "bg-green-100 text-green-800",
  "In Progress": "bg-accent/30 text-accent-foreground",
  Active: "bg-blue-100 text-blue-800",
  Fundraising: "bg-primary/10 text-primary",
};

const Projects = () => (
  <Layout>
    <PageHero title="Our Projects" subtitle="Making a lasting impact in our community through faith-driven initiatives." />

    <section className="py-24 bg-background/80 backdrop-blur-sm bg-section-glow">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="bg-card rounded-xl overflow-hidden shadow-warm hover:shadow-gold transition-all hover:-translate-y-1 group"
            >
              <div className="h-52 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-heading text-xl font-bold text-foreground">{p.title}</h3>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor[p.status]}`}>{p.status}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Photo Gallery */}
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-3">Project Gallery</h2>
        <p className="text-muted-foreground text-center mb-10">A glimpse into our work on the ground across Uganda.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className={`rounded-xl overflow-hidden shadow-warm hover:shadow-gold transition-all ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <img src={img.src} alt={img.alt} className={`w-full object-cover hover:scale-105 transition-transform duration-500 ${i === 0 ? "h-full min-h-[320px]" : "h-44"}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Projects;
