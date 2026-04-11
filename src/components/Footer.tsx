import { Link } from "react-router-dom";
import { Heart, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => (
  <footer className="relative z-10 text-white" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-16 w-16 rounded-full" />
            <div>
              <p className="font-heading text-lg font-bold text-white">Massajja Tower of</p>
              <p className="font-heading text-lg font-bold text-white">Intercessory Ministry</p>
            </div>
          </div>
          <p className="text-white/60 text-sm italic font-heading text-lg">"God First — Winning Souls, Setting Captives Free"</p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4 text-white">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["Home", "Programs", "Projects", "Updates", "Live TV", "Give", "Contacts"].map((l) => (
              <Link key={l} to={l === "Home" ? "/" : l === "Live TV" ? "/live" : `/${l.toLowerCase()}`} className="text-white/60 hover:text-accent transition-colors text-sm">
                {l}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4 text-white">Contact Info</h4>
          <div className="flex flex-col gap-3 text-sm text-white/60">
            <div className="flex items-center gap-2"><MapPin size={16} /> Massajja, Wakiso District, Kampala, Uganda</div>
            <div className="flex items-center gap-2"><Phone size={16} /> +256 745 393 840</div>
            <div className="flex items-center gap-2"><Mail size={16} /> nwankwo.Chibuzor@yahoo.com</div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/40">
        <p className="flex items-center justify-center gap-1 mb-3">
          © {new Date().getFullYear()} Massajja Tower of Intercessory Ministry Uganda. Made with <Heart size={14} className="text-primary" />
        </p>
        <div className="flex items-center justify-center gap-4 mb-6">
          <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
          <span>·</span>
          <Link to="/terms-of-use" className="hover:text-accent transition-colors">Terms of Use</Link>
        </div>
        <div className="border-t border-white/10 pt-6 text-white/30 text-xs space-y-1">
          <p>Designed & developed by <a href="https://gastonsoftwaresolutionstec.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition-colors font-semibold">Gaston Software Solution Tec</a></p>
          <p className="flex items-center justify-center gap-3 flex-wrap">
            <a href="https://wa.me/256755274944" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">WhatsApp: +256 755 274 944</a>
            <span>·</span>
            <a href="mailto:gastonsoftwaresolutions234@gmail.com" className="hover:text-accent transition-colors">gastonsoftwaresolutions234@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
