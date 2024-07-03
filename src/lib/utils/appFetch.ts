import { notFound } from "next/navigation";

const DEFAULT_OPTIONS: RequestInit = {
  method: "GET",
  headers: { accept: "application/json" },
  cache: "no-store",
};

/**
 * Fetches data from the specified URL. It's a wrapper around the `fetch` function, we just disable the aggressive caching by NextJs 14, by makin it opt-in, instead of opt-out.
 * Note: NextJs 15 will have this behavior by default, so it might be removed in the future
 *
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options for the fetch request.
 * @return {Promise<unknown>} A promise that resolves to the json parsed response. It's unknown, to encourage further data validation for type safety
 */

export async function appFetch(
  url: string,
  options: RequestInit = {}
): Promise<unknown> {
  const fetchOptions = { ...DEFAULT_OPTIONS, ...options };

  if (fetchOptions.next?.revalidate) {
    delete fetchOptions.cache; // only next.revalidate OR cache should be set, not both
  }
  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(`Fetch failed. response code: ${response.status}`);
  }
  return response.json();
}
