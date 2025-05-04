import "server-only";

import client from "@/lib/typesense";
import { SearchParams } from "typesense/lib/Typesense/Documents";
import { z } from "zod";

const movieSchema = z.object({
  id: z.string(),
  created_at: z.number(),
  title: z.string(),
  description: z.string().optional(),
  rating: z.number().optional(),
  is_rated: z.boolean(),
  release_status: z.enum(["Released", "Upcoming"]),
  poster_url: z.string().optional(),
  backdrop_url: z.string().optional(),
  generes: z.array(z.string()).optional(),
  release_date: z.number().optional(),
});

const facetSchema = z.object({
  field_name: z.string(),
  sampled: z.boolean(),
  counts: z.array(
    z.object({
      count: z.number(),
      value: z.string(),
    })
  ),
  stats: z.object({
    avg: z.number().optional(),
    sum: z.number().optional(),
    total_values: z.number(),
    max: z.number().optional(),
    min: z.number().optional(),
  }),
});

export type Movie = z.infer<typeof movieSchema>;
export type Facet = z.infer<typeof facetSchema>;

type MoviesResponse = {
  movies: Movie[];
  facets: Facet[];
  found: number;
};

export const facetFieldLabels = {
  genres: "Genres",
  release_status: "Status",
};

function toTypesenseFilters(params: URLSearchParams): string | undefined {
  let filters: string[] = [];

  if (params.has("rating")) {
    switch (params.get("rating")) {
      case "good":
        filters.push("rating:>=7 && rating:<10");
        break;
      case "average":
        filters.push("rating:>=3 && rating:<7");
        break;
      case "bad":
        filters.push("rating:>0 && rating:<3");
        break;
      case "unrated":
        filters.push("is_rated:false");
        break;
    }
  }

  if (params.has("genres")) {
    let genres = params.getAll("genres");
    filters.push(`genres:=[${genres.map((genre) => `"${genre}"`).join(",")}]`);
  }

  if (params.has("release_status")) {
    let releaseStatus = params.getAll("release_status");
    filters.push(
      `release_status:=[${releaseStatus
        .map((status) => `"${status}"`)
        .join(",")}]`
    );
  }

  if (filters.length === 0) return;

  return filters.join(" && ");
}

function toTypesenseSort(params: URLSearchParams): string | undefined {
  const sortableFields = ["rating", "release_date"] as const;
  let field = params.get("sort_by");

  if (!field) {
    return;
  }

  // Each value is a field that has -"-" or nothing in front of it.
  // -"-" means descending order, otherwise ascending order.
  let strippedField = field.replace(/^-/, "");

  if (
    !sortableFields.includes(strippedField as (typeof sortableFields)[number])
  ) {
    return;
  }

  if (field.startsWith("-")) {
    return `${strippedField}:desc`;
  }

  return `${field}:asc`;
}

export async function getMovies(
  params = new URLSearchParams()
): Promise<MoviesResponse> {
  let q = String(params.get("q") || "*");
  let perPage = Number(params.get("per_page") || 20);
  let filterBy = toTypesenseFilters(params);
  let sortBy = toTypesenseSort(params);

  let searchParams: SearchParams = {
    q,
    query_by: "title,description",
    facet_by: "release_status,genres",
    max_facet_values: 100,
    per_page: perPage,
    filter_by: filterBy,
    sort_by: sortBy,
  };

  let { hits, facet_counts, found } = await client
    .collections("popular_movies")
    .documents()
    .search(searchParams, { cacheSearchResultsForSeconds: 0 });

  const movies = hits?.map((hit) => {
    let movie = movieSchema.parse(hit.document);
    return movie;
  });

  const facets = facet_counts?.map((facet) => {
    let parsedFacet = facetSchema.parse(facet);
    return parsedFacet;
  });

  return {
    movies: movies ?? [],
    facets: facets ?? [],
    found,
  };
}
