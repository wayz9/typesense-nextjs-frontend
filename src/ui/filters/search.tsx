"use client";

import Input from "@/ui/components/input";
import { IconSearch } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
  placeholder,
  queryKey = "q",
  className,
  delay = 200,
}: {
  placeholder?: string;
  queryKey?: string;
  className?: string;
  delay?: number;
}) {
  let { replace } = useRouter();
  let pathname = usePathname();
  let params = useSearchParams();

  let handleSearch = useDebouncedCallback((value: string) => {
    let newParams = new URLSearchParams(params);

    if (value) {
      newParams.set(queryKey, value);
    } else {
      newParams.delete(queryKey);
    }

    window.scrollTo({
      top: 398,
      behavior: "instant",
    });

    replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, delay);

  return (
    <div className={twMerge("relative w-64", className)}>
      <Input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder ?? "Search..."}
        defaultValue={params.get(queryKey) ?? ""}
        className="w-full pl-9 bg-zinc-800"
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
        <IconSearch className="size-[18px]" />
      </div>
    </div>
  );
}
