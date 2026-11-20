import type { Metadata } from "next";
import BlogIndex from "@/components/blog/BlogIndex";

export const metadata: Metadata = {
  title: "Blog — Markexa India",
  description: "Ideas that leave a mark: notes on design, digital experiences, branding, creativity and technology.",
};

export default function BlogPage() {
  return <BlogIndex />;
}
