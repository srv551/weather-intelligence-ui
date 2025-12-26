const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
