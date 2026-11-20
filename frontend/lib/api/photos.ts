
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
   console.log("1. getPhotos() called");
   
  console.log("2. API URL:", `${API_BASE_URL}/api/photos`);
  const response = await fetch(`${API_BASE_URL}/api/photos`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });
  console.log("3. Response status:", response.status);
  const result: PhotosResponse = await response.json();
  console.log("4. API data:", result);
  
  if (!response.ok || !result.success) {
    throw new Error(result.message || "Could not load photos");
  }
  

  return result.data;
}
export async function getPhotosByService(
  serviceId: string
): Promise<Photo[]> {

  const photos = await getPhotos();

  return photos.filter(
    (photo) => photo.section === serviceId
  );

}
