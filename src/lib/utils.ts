import { SearchParams } from "next/dist/server/request/search-params";

/**
 * Convert SearchParams from NEXT Page prop to URLSearchParams object.
 */
export function toURLSearchParams(params: SearchParams): URLSearchParams {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") {
      searchParams.append(key, value);
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v));
    }
  }

  return searchParams;
}
