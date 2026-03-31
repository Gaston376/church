import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-page-pattern">
    <Navbar />
    <main className="flex-1 pt-20 relative z-[1]">{children}</main>
    <Footer />
    <ScrollToTop />
  </div>
);

export default Layout;
