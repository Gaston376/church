import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { useState } from "react";
import SubscribeForm from "@/components/SubscribeForm";
import church1 from "@/assets/church-1.jpg";
import church2 from "@/assets/church-2.jpg";
import church3 from "@/assets/church-3.jpg";
import church4 from "@/assets/church-4.jpg";
import worship5 from "@/assets/worship-5.jpg";

const contactInfo = [
  { icon: MapPin, label: "Location", value: "Massajja, Wakiso District, Kampala, Uganda" },
  { icon: Phone, label: "Phone", value: "+256 700 000 000" },
  { icon: Mail, label: "Email", value: "info@massajjatower.org" },
  { icon: Clock, label: "Service Times", value: "Sunday 10:00 AM | Wed 6:00 PM" },
];

const API = "https://towerintercessoryministry.towerintercessoryministry.workers.dev";

const Contacts = () => {
  const [form, setForm] = useState({ full_name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) { setStatus("success"); }
      else { setStatus("error"); setErrMsg(data.error || "Something went wrong."); }
    } catch {
      setStatus("error");
      setErrMsg("Network error. Please try again.");
    }
  };

  return (
    <Layout>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you. Reach out or visit us at our church." />

      <section className="py-24 bg-background/80 backdrop-blur-sm bg-section-glow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-warm hover:shadow-gold transition-all">
                  <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-hero-gradient flex items-center justify-center">
                    <c.icon className="text-primary-foreground" size={22} />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground">{c.label}</p>
                    <p className="text-sm text-muted-foreground">{c.value}</p>
                  </div>
                </div>
              ))}

              <div className="rounded-xl overflow-hidden shadow-warm h-48 bg-muted flex items-center justify-center">
                <iframe
                  title="Church Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.54!2d32.59!3d0.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTYnMTIuMCJOIDMywrAzNScyNC4wIkU!5e0!3m2!1sen!2sug!4v1"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {status === "success" ? (
                <div className="bg-card rounded-xl p-12 shadow-warm text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-hero-gradient flex items-center justify-center mb-4">
                    <Send className="text-primary-foreground" size={28} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">Message Sent!</h3>
                  <p className="mt-2 text-muted-foreground">Thank you for reaching out. We'll get back to you soon. God bless!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 shadow-warm space-y-5">
                  <h3 className="font-heading text-xl font-bold text-foreground">Send Us a Message</h3>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Full Name</label>
                    <input required name="full_name" value={form.full_name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Email</label>
                    <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Message</label>
                    <textarea required name="message" value={form.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="How can we help you?" />
                  </div>
                  {status === "error" && <p className="text-sm text-destructive font-medium">{errMsg}</p>}
                  <Button variant="hero" size="lg" type="submit" className="w-full" disabled={status === "loading"}>
                    {status === "loading" ? "Sending..." : <><Send size={16} className="mr-2" />Send Message</>}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      {/* Subscribe section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 max-w-xl">
          <SubscribeForm />
        </div>
      </section>

      {/* Photo strip */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <p className="font-heading text-center text-muted-foreground text-sm uppercase tracking-widest mb-6">Come worship with us</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[church1, church2, church3, church4, worship5].map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-warm aspect-square">
                <img src={src} alt="Church life" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;
