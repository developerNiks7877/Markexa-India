
import { API_BASE_URL } from "@/lib/api";

export type Video = {
  _id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  isActive: boolean;
};

type VideosResponse = {
  success: boolean;
  message: string;
  count: number;
  data: Video[];
};

export async function getVideos(): Promise<Video[]> {
  if (!API_BASE_URL) return [];

  try {
    const response = await fetch(`${API_BASE_URL}/api/videos`, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }, // cache 1 hour — static build safe
    });
    if (!response.ok) return [];
    const result: VideosResponse = await response.json();
    return result.success ? result.data : [];
  } catch {
    return [];
  }
}
