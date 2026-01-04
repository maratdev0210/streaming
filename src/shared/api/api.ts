import { BASE_URL } from "../config/config";

async function api<T, D>(
  path: string,
  method: "GET" | "POST",
  data?: D
): Promise<T> {
  let response = null;
  if (method === "GET") {
    response = await fetch(`${BASE_URL}${path}`);
  } else {
    console.log(`${BASE_URL}${path}`);
    response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return (await response.json()) as T;
}

export { api };
