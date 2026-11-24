import MotionProvider from "@/components/MotionProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <a href="#blog-main" className="skip">Skip to content</a>
      <Navigation />
      <main id="blog-main" className="blog">{children}</main>
      <Footer variant="blog" lines={["Leave", "your mark."]} />
    </MotionProvider>
  );
}
