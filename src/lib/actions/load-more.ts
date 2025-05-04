"use server";

import { getMovies, Movie } from "@/lib/data/movies";

export async function loadMore(
  params: string,
  nextPage: number
): Promise<Movie[]> {
  try {
    let { movies } = await getMovies(new URLSearchParams(params), nextPage);
    return movies;
  } catch (error) {
    console.error("Error loading more movies:", error);
    return [];
  }
}
