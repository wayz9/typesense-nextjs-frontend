"use client";

import { IconChevronLeft } from "@tabler/icons-react";
import { EmblaCarouselType } from "embla-carousel";
import { ComponentProps, useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function usePrevNextButtons(emblaApi?: EmblaCarouselType) {
  let [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  let [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  let onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  let onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  let onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
}

export default function ArrowButton(
  props: ComponentProps<"button"> & { direction: "left" | "right" }
) {
  let { children, direction, ...rest } = props;

  return (
    <button
      {...rest}
      className="size-9 grid place-items-center rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors hover:border-zinc-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <IconChevronLeft
        className={twMerge(
          "size-4 text-white",
          direction === "right" && "rotate-180"
        )}
        strokeWidth={3}
      />
    </button>
  );
}
