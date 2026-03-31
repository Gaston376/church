import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const PrivacyPolicy = () => (
  <Layout>
    <PageHero title="Privacy Policy" subtitle="How we collect, use, and protect your information." />
    <section className="py-24 bg-foreground">
      <div className="container mx-auto px-4 max-w-3xl">
        <p className="text-background/40 text-sm mb-8">Last updated: April 2026</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3 text-background">1. Information We Collect</h2>
        <p className="text-background/60 leading-relaxed">When you subscribe to our ministry updates or contact us through this website, we collect your full name, email address, WhatsApp number, and location. This information is provided voluntarily by you.</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3 text-background">2. How We Use Your Information</h2>
        <p className="text-background/60 leading-relaxed">We use your information solely to send you ministry updates, event notifications, prayer alerts, and responses to your enquiries. We do not use your data for commercial purposes.</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3 text-background">3. Data Sharing</h2>
        <p className="text-background/60 leading-relaxed">We do not sell, trade, or share your personal information with third parties. Your data is only accessible to authorised ministry staff.</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3 text-background">4. Data Security</h2>
        <p className="text-background/60 leading-relaxed">Your data is stored securely on Cloudflare's infrastructure. We take reasonable measures to protect your information from unauthorised access or disclosure.</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3 text-background">5. Your Rights</h2>
        <p className="text-background/60 leading-relaxed">You may request to view, update, or delete your personal data at any time by contacting us at towerintercessoryministry@gmail.com.</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3 text-background">6. Cookies</h2>
        <p className="text-background/60 leading-relaxed">This website does not use tracking cookies. We only store your chat display name locally in your browser for the Live TV feature.</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3 text-background">7. Contact</h2>
        <p className="text-background/60 leading-relaxed">For any privacy-related concerns, contact us at towerintercessoryministry@gmail.com or call +256 752 734 581.</p>
      </div>
    </section>
  </Layout>
);

export default PrivacyPolicy;
