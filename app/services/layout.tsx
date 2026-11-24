import MotionProvider from "@/components/MotionProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <a href="#service-main" className="skip">Skip to content</a>
      <Navigation />
      <main id="service-main" className="sv">{children}</main>
      <Footer />
    </MotionProvider>
  );
}
