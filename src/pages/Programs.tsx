import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import sunday from "@/assets/sunday.jpg";
import intercessory from "@/assets/intercessory.jpg";
import wednesdayBible from "@/assets/wednesday-bible.jpg";
import youthFellowship from "@/assets/youthfellowship.jpg";
import choir from "@/assets/choir.jpg";
import choir1 from "@/assets/choir1.jpg";

const programs = [
  { title: "Sunday Worship Service", time: "Every Sunday, 10:00 AM - 1:00 PM", desc: "A powerful time of praise, worship, and the preaching of the Word. All are welcome to experience God's presence.", img: sunday },
  { title: "Intercessory Prayer", time: "Mon-Fri, 6:00 AM - 7:00 AM", desc: "Early morning prayer sessions lifting up the church, nation, and the world before God's throne.", img: intercessory },
  { title: "Wednesday Bible Study", time: "Every Wednesday, 6:00 PM - 8:00 PM", desc: "In-depth study of the scriptures for spiritual growth and maturity.", img: wednesdayBible },
  { title: "Youth Fellowship", time: "Every Saturday, 3:00 PM - 5:00 PM", desc: "A vibrant gathering for young people to grow in faith, build friendships, and discover their purpose.", img: youthFellowship },
  { title: "Praise & Worship Night", time: "Last Friday of every month", desc: "An evening of deep worship and spiritual renewal through music and praise.", img: choir },
  { title: "Children's Ministry", time: "Every Sunday, 10:00 AM", desc: "Age-appropriate Bible teaching, crafts, and activities for children during Sunday service.", img: choir1 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Programs = () => (
  <Layout>
    <PageHero title="Our Programs" subtitle="Join us in worship, prayer, and fellowship. There's a place for everyone." />

    <section className="py-24 bg-background/80 backdrop-blur-sm bg-section-glow">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((p, i) => (
            <motion.div
              key={p.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="bg-card rounded-xl overflow-hidden shadow-warm hover:shadow-gold transition-all hover:-translate-y-1 group"
            >
              <div className="h-48 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <h3 className="font-heading text-xl font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-accent font-semibold">{p.time}</p>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Programs;
