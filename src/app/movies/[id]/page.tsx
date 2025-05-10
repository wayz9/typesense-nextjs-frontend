import { getMovieDetails } from "@/lib/data/movie-details";
import Carousel from "@/ui/cast/carousel";
import { IconArrowLeft, IconStarFilled } from "@tabler/icons-react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  let { id } = await params;
  let movie = await getMovieDetails(id);

  if (!movie) notFound();

  let posterPath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  let backdropPath = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

  let releaseYear = new Date(movie.release_date).getFullYear();

  let trailer = movie.videos.results.find(
    (video) =>
      video.type === "Trailer" && video.site === "YouTube" && video.official
  );

  let {
    props: { src },
  } = getImageProps({
    src: backdropPath,
    width: 1920,
    height: 1080,
    alt: movie.title,
    priority: true,
  });

  return (
    <>
      <main className="max-w-5xl mx-auto relative z-10 px-6 py-14">
        <div className="relative rounded-xl w-56 overflow-hidden border border-zinc-800 shadow-lg">
          <Image
            src={posterPath}
            alt={movie.title}
            width={500}
            height={900}
            priority
            className="h-full object-cover object-center"
          />
        </div>

        <h1 className="text-3xl mt-10 text-white inline-flex gap-x-2 items-center font-semibold">
          {movie.title} ({releaseYear}){" "}
          <div className="text-xl pl-2.5 flex items-center pr-3 justify-center gap-x-1 self-stretch bg-white font-extrabold rounded-lg text-zinc-950">
            <IconStarFilled className="text-zinc-950 size-4" />
            {movie.vote_average.toFixed(1)}
          </div>
        </h1>
        <p className="mt-4 text-lg/8 text-zinc-400 w-4/5 line-clamp-3">
          {movie.overview}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {movie.genres.map(({ name }, index) => (
            <div
              key={index}
              className="px-3 py-1.5 text-sm font-medium text-zinc-100 bg-zinc-800 rounded-full border border-zinc-700"
            >
              {name}
            </div>
          ))}
        </div>

        {trailer && (
          <div className="mt-16">
            <h2 className="text-xl font-medium text-white">Official Trailer</h2>

            <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="size-full"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {movie.credits.cast.length > 0 && (
          <div className="mt-20">
            <h2 className="text-xl font-medium text-white">Cast</h2>
            <Carousel cast={movie.credits.cast} />
          </div>
        )}
      </main>

      <div className="fixed top-6 left-6">
        <Link
          href="/"
          className="flex items-center gap-x-2 text-white text-[15px] font-medium"
        >
          <IconArrowLeft className="size-5" />
          Back
        </Link>
      </div>

      <div
        style={{
          backgroundImage: `url(${src})`,
        }}
        className="fixed z-0 inset-0 left-25 bg-center lg:bg-top-right bg-black bg-no-repeat bg-cover mask-radial-at-top-right mask-radial-from-10% mask-radial-to-65%"
      />
    </>
  );
}
