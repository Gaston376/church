import { motion } from "framer-motion";
import { Heart, Phone, User } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const Give = () => (
  <Layout>
    <PageHero title="Give & Support" subtitle="Partner with us in winning souls and setting captives free." />

    <section className="py-24 bg-foreground">
      <div className="container mx-auto px-4 max-w-2xl text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-10 shadow-gold"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-hero-gradient flex items-center justify-center mb-6 shadow-gold">
            <Heart className="text-primary-foreground" size={30} />
          </div>

          <h2 className="font-heading text-2xl font-bold text-background mb-3">Sow a Seed</h2>
          <p className="text-background/60 leading-relaxed mb-8">
            Your tithes, offerings, and gifts support the work of God — evangelism, community outreach, and ministry operations. Send your giving via Mobile Money to:
          </p>

          <div className="bg-white/10 rounded-xl p-6 mb-6 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Phone size={20} className="text-primary" />
              <span className="text-background text-2xl font-bold tracking-widest">+256 752 734 581</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <User size={18} className="text-primary" />
              <span className="text-background/80 text-lg font-semibold">Prophet Chibuzor Nwankwo</span>
            </div>
          </div>

          <p className="text-background/50 text-sm leading-relaxed">
            Please include a reason with your transfer — e.g. <span className="text-accent font-semibold">Tithe</span>, <span className="text-accent font-semibold">Offering</span>, <span className="text-accent font-semibold">Seed</span>, or <span className="text-accent font-semibold">Project Support</span>.
          </p>

          <div className="mt-8 pt-6 border-t border-white/10 text-background/40 text-xs">
            "Bring the whole tithe into the storehouse... and see if I will not throw open the floodgates of heaven." — Malachi 3:10
          </div>
        </motion.div>

      </div>
    </section>
  </Layout>
);

export default Give;
