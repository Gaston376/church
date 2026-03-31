import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const API = "https://towerintercessoryministry.workers.dev";

const SubscribeForm = () => {
  const [form, setForm] = useState({ full_name: "", email: "", whatsapp: "", location: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${API}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl p-10 shadow-warm text-center"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-hero-gradient flex items-center justify-center mb-4">
          <CheckCircle className="text-primary-foreground" size={32} />
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground">You're Subscribed!</h3>
        <p className="mt-2 text-muted-foreground">{message}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-warm space-y-4">
      <h3 className="font-heading text-xl font-bold text-foreground">Stay Connected</h3>
      <p className="text-sm text-muted-foreground">Subscribe to receive updates, event notices and prayer alerts.</p>

      <div>
        <label className="text-sm font-medium text-foreground block mb-1">Full Name</label>
        <input
          required name="full_name" value={form.full_name} onChange={handleChange}
          placeholder="Your full name"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground block mb-1">Email</label>
        <input
          required type="email" name="email" value={form.email} onChange={handleChange}
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground block mb-1">WhatsApp Number</label>
        <input
          required name="whatsapp" value={form.whatsapp} onChange={handleChange}
          placeholder="+256 700 000 000"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground block mb-1">Location</label>
        <input
          required name="location" value={form.location} onChange={handleChange}
          placeholder="City, Country"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive font-medium">{message}</p>
      )}

      <Button variant="hero" size="lg" type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Subscribing..." : <><Send size={16} className="mr-2" /> Subscribe</>}
      </Button>
    </form>
  );
};

export default SubscribeForm;
