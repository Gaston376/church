import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import StarField from "./StarField";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col relative" style={{ background: "rgb(4, 8, 35)" }}>
    <StarField />
    <Navbar />
    <main className="flex-1 pt-20 relative z-[1]">{children}</main>
    <Footer />
    <ScrollToTop />
  </div>
);

export default Layout;
