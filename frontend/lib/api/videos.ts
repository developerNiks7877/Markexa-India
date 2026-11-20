
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
  const response = await fetch(`${API_BASE_URL}/api/videos`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const result: VideosResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Could not load videos");
  }

  return result.data;
}
