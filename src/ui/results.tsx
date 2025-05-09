"use client";

import { loadMore } from "@/lib/actions/load-more";
import { Movie } from "@/lib/data/movies";
import Spinner from "@/ui/components/spinner";
import { IconMoodSadFilled, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";

type ResultsProps = {
  movies: Movie[];
  total: number;
};

function LoadMoreZone({
  setItems,
}: {
  setItems: Dispatch<SetStateAction<Movie[]>>;
}) {
  let params = useSearchParams();
  let { inView, ref } = useInView({ threshold: 1 });

  let [page, setPage] = useState(1);
  let [loading, setLoading] = useState(false);

  const loadMoreItems = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    setPage((prev) => prev + 1);
    let newMovies = await loadMore(params.toString(), page + 1);
    setLoading(false);
    setItems((prev) => [...prev, ...newMovies]);
  }, [page, loading, params, setItems]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (inView && !loading) {
      timeoutId = setTimeout(() => {
        loadMoreItems();
      }, 175);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [inView, loading, loadMoreItems]);

  return (
    <div
      ref={ref}
      data-in-view={inView}
      className="group h-(--offset) absolute inset-x-0 grid place-items-center text-[13px] text-zinc-500"
    >
      <div className="flex items-center justify-center gap-x-2 group-data-[in-view=true]:visible invisible">
        <Spinner className="text-zinc-300 size-4" />
        Loading more results...
      </div>
    </div>
  );
}

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
  let [items, setItems] = useState(movies);

  useEffect(() => {
    setItems(movies);
  }, [movies]);

  let canLoadMore = total > items.length;

  return (
    <>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-max gap-x-2.5 gap-y-3.5">
        {items.map((movie) => (
          <Item key={movie.id} movie={movie} />
        ))}

        {items.length === 0 && (
          <div className="col-span-4 h-102 grid place-items-center">
            <div className="flex flex-col items-center justify-center text-center">
              <IconMoodSadFilled className="text-zinc-500 size-9" />
              <p className="mt-3 text-base font-medium tracking-tight text-white">
                Sorry, we couldn&apos;t find it.
              </p>
              <p className="text-sm text-zinc-400 mt-0.5">
                Try &quot;spiderman&quot; or &quot;predator&quot; for example.
              </p>
            </div>
          </div>
        )}
      </div>

      {canLoadMore && <LoadMoreZone setItems={setItems} />}
    </>
  );
}
