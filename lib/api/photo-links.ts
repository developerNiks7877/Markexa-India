
export interface PhotoLink {
  _id: string;
  title: string;
  linkUrl: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface PhotoLinksResponse {
  success: boolean;
  message: string;
  count: number;
  data: PhotoLink[];
}

const API_BASE_URL = "https://markexa-backend-mc4v.onrender.com/api";

export async function getPhotoLinks(): Promise<PhotoLink[]> {
  const url = `${API_BASE_URL}/photos-links`;

  console.log("Photo Links API URL:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const responseText = await response.text();

  console.log("Photo Links Status:", response.status);
  console.log("Photo Links Response:", responseText);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch photo links: ${response.status} - ${responseText}`
    );
  }

  const result: PhotoLinksResponse = JSON.parse(responseText);

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch photo links");
  }

  return result.data.filter((link) => link.isActive);
}