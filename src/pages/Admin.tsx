import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Send, RefreshCw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const API = "https://towerintercessoryministry.towerintercessoryministry.workers.dev";

interface Subscriber {
  id: number;
  full_name: string;
  email: string;
  whatsapp: string;
  location: string;
  subscribed_at: string;
}

const Admin = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState({ title: "", content: "", date: "" });
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent?: number; failed?: number; total?: number } | null>(null);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/subscribers`);
      const data = await res.json();
      setSubscribers(data.subscribers || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSubscribers(); }, []);

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setResult(null);
    try {
      const res = await fetch(`${API}/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...notify, date: notify.date || new Date().toDateString() }),
      });
      const data = await res.json();
      setResult(data);
      setNotify({ title: "", content: "", date: "" });
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout>
      <section className="py-24 bg-background/80 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="font-heading text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage subscribers and send ministry updates.</p>
            <div className="mt-3 h-1 w-20 bg-hero-gradient rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Subscribers list */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
                  <Users size={20} /> Subscribers ({subscribers.length})
                </h2>
                <Button variant="outline" size="sm" onClick={fetchSubscribers} disabled={loading}>
                  <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </Button>
              </div>

              <div className="space-y-3">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-card rounded-xl p-4 shadow-warm animate-pulse h-16" />
                  ))
                ) : subscribers.length === 0 ? (
                  <div className="bg-card rounded-xl p-8 text-center text-muted-foreground shadow-warm">
                    No subscribers yet.
                  </div>
                ) : (
                  subscribers.map((s, i) => (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="bg-card rounded-xl p-4 shadow-warm flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
                    >
                      <div className="w-10 h-10 rounded-full bg-hero-gradient flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-foreground font-bold text-sm">
                          {s.full_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading font-semibold text-foreground truncate">{s.full_name}</p>
                        <p className="text-sm text-muted-foreground truncate">{s.email}</p>
                      </div>
                      <div className="text-sm text-muted-foreground hidden sm:block">{s.whatsapp}</div>
                      <div className="text-sm text-muted-foreground hidden md:block">{s.location}</div>
                      <div className="text-xs text-muted-foreground/60 hidden lg:block">
                        {new Date(s.subscribed_at).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Broadcast form */}
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2 mb-4">
                <Mail size={20} /> Send Update
              </h2>
              <form onSubmit={handleNotify} className="bg-card rounded-xl p-6 shadow-warm space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Subject / Title</label>
                  <input
                    required value={notify.title}
                    onChange={(e) => setNotify((n) => ({ ...n, title: e.target.value }))}
                    placeholder="Easter Revival Week Announced"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Message</label>
                  <textarea
                    required rows={5} value={notify.content}
                    onChange={(e) => setNotify((n) => ({ ...n, content: e.target.value }))}
                    placeholder="Write your update message here..."
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Date (optional)</label>
                  <input
                    type="date" value={notify.date}
                    onChange={(e) => setNotify((n) => ({ ...n, date: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {result && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                    Sent to {result.sent}/{result.total} subscribers.
                    {result.failed ? ` (${result.failed} failed)` : ""}
                  </div>
                )}

                <Button variant="hero" size="lg" type="submit" className="w-full" disabled={sending}>
                  {sending
                    ? `Sending to ${subscribers.length} subscribers...`
                    : <><Send size={15} className="mr-2" /> Send to All Subscribers</>}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
