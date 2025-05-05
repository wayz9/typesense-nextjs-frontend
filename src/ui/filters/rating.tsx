"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { IconStarFilled } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useTransition } from "react";

const groups = [
  { label: "All", value: "all" },
  { label: "Good", value: "good", score: "7 - 10" },
  { label: "Average", value: "average", score: "3 - 7" },
  { label: "Bad", value: "bad", score: "0 - 3" },
  { label: "Unrated", value: "unrated", score: "N/A" },
];

export default function Rating() {
  const queryKey = "rating";

  let { push } = useRouter();
  let params = useSearchParams();

  let defaultVal = params.get("rating") || "all";
  let [_, startTransition] = useTransition();
  let [rating, setRating] = useOptimistic(defaultVal);

  return (
    <div>
      <p className="text-sm font-semibold text-white">Rating</p>

      <RadioGroup.Root
        value={rating}
        onValueChange={(value) => {
          let newParams = new URLSearchParams(params);

          newParams.set(queryKey, value);

          window.scrollTo({
            top: 398,
            behavior: "instant",
          });

          startTransition(() => {
            setRating(value);
            push(`?${newParams}`, {
              scroll: false,
            });
          });
        }}
        className="mt-3 bg-zinc-800 rounded-md divide-y divide-zinc-700 border border-zinc-700"
      >
        {groups.map((group) => (
          <RadioGroup.Item
            key={group.value}
            value={group.value}
            id={group.value}
            className="px-4 py-2.5 text-sm flex items-center w-full"
          >
            <div className="relative border border-zinc-500 rounded-full size-5">
              <RadioGroup.Indicator className="absolute top-1/2 left-1/2 -translate-1/2 size-2.5 rounded-md bg-white" />
            </div>
            <p className="text-sm ml-2 text-white">{group.label}</p>
            {group.score && (
              <p className="ml-auto text-xs tabular-nums font-medium text-zinc-200 flex items-center gap-x-1.5">
                {group.score}
                <IconStarFilled className="text-amber-400 size-3.5" />
              </p>
            )}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
}
