import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const TermsOfUse = () => (
  <Layout>
    <PageHero title="Terms of Use" subtitle="Please read these terms carefully before using our website." />
    <section className="py-24 bg-foreground">
      <div className="container mx-auto px-4 max-w-3xl">
        <p className="text-background/40 text-sm mb-8">Last updated: April 2026</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3 text-background">1. Acceptance of Terms</h2>
        <p className="text-background/60 leading-relaxed">By accessing and using this website, you agree to be bound by these Terms of Use. If you do not agree, please do not use this site.</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3 text-background">2. Use of Content</h2>
        <p className="text-background/60 leading-relaxed">All content on this website — including text, images, videos, and audio — belongs to Massajja Tower of Intercessory Ministry. You may share content for non-commercial, ministry-related purposes with proper attribution.</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3 text-background">3. Live TV & Chat</h2>
        <p className="text-background/60 leading-relaxed">The Live TV feature is provided for worship and ministry purposes. Users must conduct themselves respectfully in the live chat. We reserve the right to remove any content that is offensive, abusive, or contrary to Christian values.</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3 text-background">4. Subscriptions</h2>
        <p className="text-background/60 leading-relaxed">By subscribing to our updates, you consent to receiving email communications from us. You may unsubscribe at any time by contacting us directly.</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3 text-background">5. Disclaimer</h2>
        <p className="text-background/60 leading-relaxed">This website is provided "as is" without warranties of any kind. We are not liable for any interruptions, errors, or losses arising from the use of this site.</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3 text-background">6. Changes to Terms</h2>
        <p className="text-background/60 leading-relaxed">We may update these terms from time to time. Continued use of the website after changes constitutes acceptance of the new terms.</p>

        <h2 className="font-heading text-xl font-bold mt-8 mb-3 text-background">7. Contact</h2>
        <p className="text-background/60 leading-relaxed">For questions about these terms, contact us at towerintercessoryministry@gmail.com.</p>
      </div>
    </section>
  </Layout>
);

export default TermsOfUse;
