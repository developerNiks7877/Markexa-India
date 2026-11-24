import { API_BASE_URL } from "@/lib/api";

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  services: string[];   // backend expects an array
  budget: string;
  message: string;
  timeline?: string;
};

export async function submitContact(data: ContactPayload) {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(responseData.message || "Failed to send your message.");
  }

  return responseData;
}
