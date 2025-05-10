"use client";

import type { Cast } from "@/lib/data/movie-details";
import ArrowButton, { usePrevNextButtons } from "@/ui/cast/arrow-button";
import { useSelectedSnapDisplay } from "@/ui/cast/snap-count";
import useEmblaCarousel from "embla-carousel-react";

export default function Carousel({ cast }: { cast: Cast[] }) {
  let [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

  let {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  let { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  return (
    <div
      ref={emblaRef}
      className="mt-4 w-full overflow-hidden [--slide-size:25%] [--slide-spacing:--spacing(4)] [--slide-height:--spacing(80)]"
    >
      <div className="flex touch-pan-y touch-pinch-zoom ml-[calc(var(--slide-spacing)_*_-1)]">
        {cast.map((actor, index) => (
          <div
            key={index}
            className="[transform:translate3d(0,0,0)] shrink-0 h-(--slide-height) w-(--slide-size) pl-(--slide-spacing) overflow-hidden"
          >
            <div className="relative overflow-hidden rounded-xl  size-full border border-zinc-700 shadow-lg">
              {actor.profile_path && (
                <img
                  alt={actor.name}
                  src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                  className="size-full object-cover object-center"
                />
              )}
              {!actor.profile_path && (
                <div className="size-full bg-zinc-800 grid place-items-center text-center px-8 text-base font-semibold text-zinc-100">
                  {actor.name}
                </div>
              )}
              <div className="absolute bottom-0 px-4 py-2.5 inset-x-0 bg-zinc-800">
                <p className="text-sm font-semibold text-white line-clamp-1">
                  {actor.name}
                </p>
                <p className="text-[13px] text-zinc-400 line-clamp-1">
                  {actor.character}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ArrowButton
            direction="left"
            disabled={prevBtnDisabled}
            onClick={onPrevButtonClick}
          />
          <ArrowButton
            direction="right"
            disabled={nextBtnDisabled}
            onClick={onNextButtonClick}
          />
        </div>

        <p className="text-sm font-medium text-zinc-300">
          {selectedSnap + 1} / {snapCount}
        </p>
      </div>
    </div>
  );
}
