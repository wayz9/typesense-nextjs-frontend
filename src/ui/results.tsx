"use client";

import { Movie } from "@/lib/data/movies";
import { IconMoodSadFilled, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";

type ResultsProps = {
  movies: Movie[];
  total: number;
};

function Item({ movie }: { movie: Movie }) {
  let releaseDate = movie.release_date
    ? new Date(movie.release_date * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  let posterUrl =
    movie.poster_url ||
    `https://placehold.co/400x800/000000/FFF/png?text=${movie.title}`;

  return (
    <div className="shadow-md border border-white/5 bg-zinc-800 rounded-lg overflow-hidden flex flex-col">
      <div className="h-75 w-full rounded-lg overflow-hidden">
        <Image
          src={posterUrl}
          alt={movie.title}
          width={500}
          height={900}
          className="rounded-t-lg object-cover object-center size-full"
          priority
        />
      </div>

      <div className="px-4 grow flex flex-col justify-between py-2.5">
        <p
          title={movie.title}
          className="line-clamp-2 text-sm text-white font-semibold"
        >
          {movie.title}
        </p>
        <div className="flex mt-0.5 items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <IconStarFilled className="text-amber-400 size-4" />
            <p className="text-xs/5 font-medium text-zinc-400">
              {movie.rating ? movie.rating.toFixed(1) : "N/A"}
            </p>
          </div>
          <span className="text-white">&middot;</span>
          <p className="text-xs/5  font-medium text-zinc-400">{releaseDate}</p>
        </div>
      </div>
    </div>
  );
}

export default function Results({ movies, total }: ResultsProps) {
  return (
    <section className="flex-1 py-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium tracking-tight text-white">
          Found {Number(total).toLocaleString("en-US")} results.
        </h3>
      </div>

      <div className="mt-6 grid grid-cols-4 auto-rows-max gap-x-2.5 gap-y-3.5">
        {movies.map((movie) => (
          <Item key={movie.id} movie={movie} />
        ))}

        {movies.length === 0 && (
          <div className="col-span-4 h-102 grid place-items-center">
            <div className="flex flex-col items-center justify-center text-center">
              <IconMoodSadFilled className="text-zinc-500 size-9" />
              <p className="mt-3 text-base font-medium tracking-tight text-white">
                No results found
              </p>
              <p className="text-sm text-gray-400 mt-0.5">
                Try &quot;spiderman&quot; or &quot;marvel&quot; for example.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
