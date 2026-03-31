import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Users, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import StatsCounter from "@/components/StatsCounter";
import Testimonials from "@/components/Testimonials";
import YoutubeBackground from "@/components/YoutubeBackground";
import SubscribeForm from "@/components/SubscribeForm";
import logo from "@/assets/logo.jpg";
import outreach1 from "@/assets/outreach-1.jpg";
import outreach2 from "@/assets/outreach-2.jpg";
import outreach3 from "@/assets/outreach-3.jpg";
import pastor1 from "@/assets/pastor-1.jpg";
import pastor2 from "@/assets/pastor-2.jpg";
import worship1 from "@/assets/worship-1.jpg";
import worship2 from "@/assets/worship-2.jpg";
import worship3 from "@/assets/worship-3.jpg";
import worship4 from "@/assets/worship-4.jpg";
import worship5 from "@/assets/worship-5.jpg";
import church1 from "@/assets/church-1.jpg";
import church2 from "@/assets/church-2.jpg";
import church3 from "@/assets/church-3.jpg";
import church4 from "@/assets/church-4.jpg";
import choir from "@/assets/choir.jpg";
import choir1 from "@/assets/choir1.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

const ministries = [
  { icon: BookOpen, title: "Bible Study", desc: "Deep dive into God's word every Wednesday evening." },
  { icon: Users, title: "Youth Ministry", desc: "Empowering the next generation through faith and fellowship." },
  { icon: Heart, title: "Outreach", desc: "Reaching communities with the love of Christ across Uganda." },
  { icon: Calendar, title: "Prayer Tower", desc: "24/7 intercessory prayer covering for the nation." },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden -mt-20 pt-20">
      <YoutubeBackground />
      <div className="relative container mx-auto px-4 py-24">
        <motion.div initial="hidden" animate="visible" className="max-w-2xl">
          <motion.img
            variants={fadeUp}
            custom={0}
            src={logo}
            alt="Logo"
            className="h-24 w-24 rounded-full shadow-gold mb-6 animate-pulse-glow"
          />
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-heading text-4xl md:text-6xl font-bold text-background leading-tight"
          >
            Massajja Tower of Intercessory Ministry
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-xl text-background/80 font-heading italic"
          >
            "God First — Winning Souls, Setting Captives Free"
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/programs">Our Programs</Link>
            </Button>
            <Button variant="hero-outline" size="lg" className="border-background text-background hover:bg-background hover:text-foreground" asChild>
              <Link to="/contacts">Get In Touch</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-background/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-background/60 rounded-full" />
        </div>
      </motion.div>
    </section>

    {/* Welcome */}
    <section className="py-24 bg-background/80 backdrop-blur-sm bg-section-glow">
      <div className="container mx-auto px-4">
        <SectionHeading title="Welcome to Our Ministry" subtitle="We are a spirit-filled intercessory ministry based in Massajja, Kampala, committed to transforming lives through prayer, the Word of God, and community outreach." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {ministries.map((m, i) => (
            <motion.div
              key={m.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="bg-card rounded-xl p-6 shadow-warm hover:shadow-gold transition-all hover:-translate-y-1 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-hero-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <m.icon className="text-primary-foreground" size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">{m.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Stats */}
    <StatsCounter />

    {/* Senior Pastor */}
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="rounded-xl overflow-hidden shadow-gold">
              <img src={pastor1} alt="Senior Pastor preaching the Word" className="w-full h-72 object-cover object-top" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-gold mt-8">
              <img src={pastor2} alt="Senior Pastor ministering" className="w-full h-72 object-cover object-top" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Meet Our Senior Pastor</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">A Heart for God, A Vision for the People</h2>
            <div className="mt-4 h-1 w-20 bg-hero-gradient rounded-full" />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Our Senior Pastor is a man of deep faith, unwavering prayer, and a burning passion for souls. Called by God to lead Massajja Tower of Intercessory Ministry, he carries a prophetic mandate to raise intercessors, transform communities, and advance the Kingdom of God across Uganda and beyond.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Under his anointed leadership, the ministry has grown from humble beginnings into a powerful movement of prayer, evangelism, and community transformation. His teaching is rooted in scripture, his preaching sets captives free, and his heart for the vulnerable has birthed numerous outreach programs touching thousands of lives.
            </p>
            <p className="mt-4 text-foreground font-heading italic font-semibold">
              "God First — we exist to win souls and set captives free through the power of intercession."
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <Testimonials />

    {/* Worship Gallery Mosaic */}
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <SectionHeading title="Life at Our Church" subtitle="Moments of worship, prayer, and fellowship captured from our congregation." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
          <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-gold">
            <img src={worship3} alt="Congregation in worship" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-warm">
            <img src={church1} alt="Church gathering" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-warm">
            <img src={worship1} alt="Praise and worship" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-warm">
            <img src={church2} alt="Sunday service" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-warm">
            <img src={worship2} alt="Ministry in action" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-warm">
            <img src={church3} alt="Church community" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-warm">
            <img src={church4} alt="Fellowship" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-warm">
            <img src={worship4} alt="Worship night" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-warm">
            <img src={worship5} alt="Evening service" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </section>

    {/* Choir Section */}
    <section className="py-24 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="rounded-2xl overflow-hidden shadow-gold col-span-2">
              <img src={choir} alt="Church choir leading worship" className="w-full h-72 object-cover object-top" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-warm col-span-2">
              <img src={choir1} alt="Choir ministering in song" className="w-full h-56 object-cover object-top" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Music Ministry</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">Our Choir — Voices Lifted to God</h2>
            <div className="mt-4 h-1 w-20 bg-hero-gradient rounded-full" />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Our choir is more than a music group — they are worshippers called to usher the congregation into the presence of God. With voices trained and hearts surrendered, they lead every service with anointed praise that breaks chains and transforms lives.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From Sunday services to special revival nights, the choir ministers with excellence and passion, blending contemporary gospel with traditional African worship to create an atmosphere where God moves powerfully.
            </p>
            <p className="mt-4 text-foreground font-heading italic font-semibold">
              "Sing to the Lord a new song; sing to the Lord, all the earth." — Psalm 96:1
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Outreach Gallery */}
    <section className="py-24 bg-muted/20 backdrop-blur-sm bg-section-glow">
      <div className="container mx-auto px-4">
        <SectionHeading title="Community Impact" subtitle="See how we're making a difference through caregiving initiatives and community outreach across Uganda." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { src: outreach1, alt: "Community evangelism and literature distribution", caption: "Evangelism & Literature Distribution" },
            { src: outreach2, alt: "Caregiving supplies for families in need", caption: "Caregiving Supplies for Families" },
            { src: outreach3, alt: "Community food outreach program", caption: "Community Food Outreach" },
          ].map((img, i) => (
            <motion.div
              key={img.alt}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group overflow-hidden rounded-xl shadow-warm hover:shadow-gold transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="bg-card p-4">
                <p className="font-heading font-semibold text-foreground text-sm">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="hero" size="lg" asChild>
            <Link to="/projects">View Our Projects</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Subscribe */}
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Stay Connected</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">Join Our Ministry Community</h2>
            <div className="mt-4 h-1 w-20 bg-hero-gradient rounded-full" />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Subscribe to receive updates on upcoming events, revival services, prayer alerts, and ministry news directly to your email and WhatsApp.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Be part of a growing community of believers standing in the gap for Uganda and the nations.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <SubscribeForm />
          </motion.div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">Join Us This Sunday</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto">
            Experience the power of God in worship, prayer, and fellowship. Services every Sunday at 10:00 AM.
          </p>
          <Button variant="outline" size="lg" className="mt-8 border-background text-background hover:bg-background hover:text-foreground" asChild>
            <Link to="/contacts">Find Us</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Index;
