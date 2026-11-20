import type { Metadata, Viewport } from "next";
// import "@fontsource/instrument-serif/400.css";
// import "@fontsource/instrument-serif/400-italic.css";
// import "@fontsource-variable/schibsted-grotesk";
// import { DM_Sans } from "next/font/google";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-manrope",
});
import "./globals.css";

export const metadata: Metadata = {
  title: "Markexa India — Creative digital studio",
  description: "An independent creative studio shaping brands, digital products and experiences that refuse to blend in.",
};
export const viewport: Viewport = { themeColor: "#0b0a09", colorScheme: "dark" };
// const dmSans = DM_Sans({
//   subsets: ["latin"],
//   variable: "--font-dm-sans",
// });
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={manrope.variable}>{children}
        
      </body>
    </html>
  );
}
