
import { API_BASE_URL } from "@/lib/api";

export type Photo = {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  publicId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  section: string;
};

type PhotosResponse = {
  success: boolean;
  message: string;
  count: number;
  data: Photo[];
};

export async function getPhotos(): Promise<Photo[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/photos`, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }, // cache for 1 hour — no "no-store" so static build works
    });
    if (!response.ok) return [];
    const result: PhotosResponse = await response.json();
    return result.success ? result.data : [];
  } catch {
    return [];
  }
}

export async function getPhotosByService(serviceId: string): Promise<Photo[]> {
  const photos = await getPhotos();
  return photos.filter((photo) => photo.section === serviceId);
}
