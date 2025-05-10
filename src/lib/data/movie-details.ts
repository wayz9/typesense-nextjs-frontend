import { z } from "zod";

const schema = z.object({
  backdrop_path: z.string().nullable(),
  poster_path: z.string(),
  genres: z.array(
    z.object({
      name: z.string(),
    })
  ),
  budget: z.number(),
  revenue: z.number(),
  imdb_id: z.string(),
  title: z.string(),
  overview: z.string(),
  release_date: z.string(),
  runtime: z.number(),
  vote_average: z.number(),
  videos: z.object({
    results: z.array(
      z.object({
        type: z.string(),
        official: z.boolean(),
        site: z.string(),
        key: z.string(),
      })
    ),
  }),
  credits: z.object({
    cast: z.array(
      z.object({
        name: z.string(),
        profile_path: z.string().nullable(),
        character: z.string(),
      })
    ),
  }),
});

export type MovieDetails = z.infer<typeof schema>;
export type Cast = MovieDetails["credits"]["cast"][number];

export async function getMovieDetails(
  id: string
): Promise<MovieDetails | null> {
  let newUrl = new URL(
    `3/movie/${id}?language=en-US&append_to_response=videos,credits`,
    process.env.TMDB_API_URL!
  );

  let response = await fetch(newUrl, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: 6000,
      tags: ["movies"],
    },
  });

  if (!response.ok) {
    return null;
  }

  try {
    let data = await response.json();
    const parsed = schema.parse(data);

    return parsed;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}
