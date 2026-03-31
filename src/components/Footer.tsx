import { Link } from "react-router-dom";
import { Heart, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-16 w-16 rounded-full" />
            <div>
              <p className="font-heading text-lg font-bold">Massajja Tower of</p>
              <p className="font-heading text-lg font-bold">Intercessory Ministry</p>
            </div>
          </div>
          <p className="text-background/60 text-sm italic font-heading text-lg">"God First — Winning Souls, Setting Captives Free"</p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["Home", "Programs", "Projects", "Updates", "Contacts"].map((l) => (
              <Link key={l} to={l === "Home" ? "/" : `/${l.toLowerCase()}`} className="text-background/60 hover:text-accent transition-colors text-sm">
                {l}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Contact Info</h4>
          <div className="flex flex-col gap-3 text-sm text-background/60">
            <div className="flex items-center gap-2"><MapPin size={16} /> Massajja, Kampala, Uganda</div>
            <div className="flex items-center gap-2"><Phone size={16} /> +256 700 000 000</div>
            <div className="flex items-center gap-2"><Mail size={16} /> info@massajjatower.org</div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-background/10 text-center text-sm text-background/40">
        <p className="flex items-center justify-center gap-1">
          © {new Date().getFullYear()} Massajja Tower of Intercessory Ministry Uganda. Made with <Heart size={14} className="text-primary" />
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
