"use client";

import ResizablePanel from "@/ui/components/resizable-panel";
import * as Checkbox from "@radix-ui/react-checkbox";
import { IconCaretDownFilled, IconCheck } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";

type FacetFilteProps = {
  title: string;
  queryKey: string;
  options: Option[];
  hits?: number;
};

type Option = {
  value: string;
  count?: number;
};

/**
 * Slugify a string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type FilterEntryProps = {
  value: string;
  count: number;
  onChange: () => void;
  active: boolean;
};

function FilterEntry({ value, count, onChange, active }: FilterEntryProps) {
  return (
    <li className="px-4 py-2.5 text-sm flex items-center w-full">
      <Checkbox.Root
        id={slugify(value)}
        checked={active}
        onCheckedChange={onChange}
        className="relative size-[18px] shrink-0 rounded border border-zinc-500 aria-checked:border-white aria-checked:bg-white"
      >
        <Checkbox.Indicator className="absolute inset-0 grid place-items-center">
          <IconCheck className="size-[80%] text-zinc-900" strokeWidth={4} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor={slugify(value)} className="text-sm ml-2 text-white">
        {value}
      </label>

      <p className="ml-auto text-xs tabular-nums bg-zinc-600 rounded px-1 py-0.5 font-medium text-zinc-200 flex items-center gap-x-1.5">
        {count}
      </p>
    </li>
  );
}

export default function FacetFilter(props: FacetFilteProps) {
  let { push } = useRouter();
  let params = useSearchParams();
  let { title, queryKey, options, hits } = props;

  let [isExpanded, setIsExpanded] = useState(false);
  let [oldParams, setOldParams] = useState(params);
  let [values, setValues] = useState<Option[]>(options);
  let [shouldUpdateValues, setShouldUpdateValues] = useState(false);

  if (oldParams.toString() !== params.toString()) {
    let previousSearchParams = new URLSearchParams(oldParams);
    let newSearchParams = new URLSearchParams(params);

    const keysToDelete = [queryKey, "page", "sort_by", "sort_order"];

    keysToDelete.forEach((key) => {
      previousSearchParams.delete(key);
      newSearchParams.delete(key);
    });

    if (previousSearchParams.toString() !== newSearchParams.toString()) {
      setShouldUpdateValues(true);
    }

    if (params.getAll(queryKey).length === 0) {
      setValues(options);
    }

    setOldParams(params);
  }

  let [_, startTransition] = useTransition();
  let [optimisticParams, setOptimisticParams] =
    useOptimistic<URLSearchParams>(params);

  let createQueryString = useCallback(
    (value: string) => {
      let newParams = new URLSearchParams(optimisticParams);

      newParams.getAll(queryKey).includes(value)
        ? newParams.delete(queryKey, value)
        : newParams.append(queryKey, value);

      return newParams;
    },
    [optimisticParams, queryKey]
  );

  useEffect(() => {
    if (shouldUpdateValues) {
      setValues(options);
      setShouldUpdateValues(false);
    }
  }, [shouldUpdateValues, options]);

  let selectedOptions = optimisticParams.getAll(queryKey);
  let selectedOptionsMap = selectedOptions.map((option) => ({
    value: option,
    count: options.find((o) => o.value === option)?.count ?? 0,
  }));

  // We need to sort the values alphabetically to prevent reordering and merge-in the selected values only if they do not exist.
  let finalValues = values
    .filter((v) => !selectedOptions.includes(v.value))
    .filter((v) => v.count !== undefined && v.count > 0)
    .concat(selectedOptionsMap)
    .sort((a, b) => a.value.localeCompare(b.value));

  let isShowMoreButtonVisible = finalValues.length > 6;
  let displayOptions = isExpanded ? finalValues : finalValues.slice(0, 6);

  return (
    <div>
      <p className="text-sm font-semibold text-white">
        {title} {hits ? <>({hits})</> : null}
      </p>
      <div className="mt-3">
        <ResizablePanel>
          <ul className="bg-zinc-800 rounded-md divide-y divide-zinc-700 border border-zinc-700">
            {displayOptions.map(({ value }) => {
              let count = options.find((o) => o.value === value)?.count ?? 0;

              return (
                <FilterEntry
                  key={value}
                  value={value}
                  count={count}
                  active={selectedOptions.includes(value)}
                  onChange={() => {
                    let stringParams = createQueryString(value);

                    startTransition(() => {
                      let newParams = new URLSearchParams(stringParams);
                      newParams.set("page", "1");
                      setOptimisticParams(newParams);
                      push(`?${newParams.toString()}`, { scroll: false });
                    });
                  }}
                />
              );
            })}
          </ul>

          {isShowMoreButtonVisible && (
            <div className="flex justify-end mr-4">
              <button
                onClick={() => setIsExpanded((prev) => !prev)}
                className="grid place-items-center border-t-0 -mt-px h-5 w-8 rounded-b bg-zinc-800 border border-zinc-700"
              >
                <IconCaretDownFilled className="text-zinc-400 size-4" />
              </button>
            </div>
          )}
        </ResizablePanel>
      </div>
    </div>
  );
}
