
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/services/ServiceDetail";
import { services } from "@/data/services";
import { getPhotosByService } from "@/lib/api/photos";

export const dynamicParams = false;

export const generateStaticParams = () =>
  services.map((s) => ({ slug: s.id }));

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.id === slug);

  return s
    ? {
        title: `${s.title} — Markexa India`,
        description: s.blurb,
      }
    : {};
}

// export default async function ServicePage({ params }: Props) {
//   const { slug } = await params;

//   const s = services.find((x) => x.id === slug);

//   if (!s) notFound();

//   // Fetch only photos belonging to this service
//   const photos = await getPhotosByService(slug);

//   console.log(`Photos for ${slug}:`, photos);

//   return <ServiceDetail service={s} photos={photos} />;
// }

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;

  const s = services.find((x) => x.id === slug);

  if (!s) notFound();

  // Load photos, but don't let an API failure crash the page
  const photos = await getPhotosByService(slug).catch((error) => {
    console.error(`Failed to load photos for ${slug}:`, error);
    return [];
  });

  return <ServiceDetail service={s} photos={photos} />;
}
