import { BASE_URL } from "../config/config";

async function api<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return (await response.json()) as T;
}

export { api };

