"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IconCaretDownFilled, IconChevronDown } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const sortOptions = [
  { label: "Latest", value: "-release_date", sort: "desc" },
  { label: "Oldest", value: "release_date", sort: "asc" },
  { label: "Most Popular", value: "-rating", sort: "desc" },
  { label: "Least Popular", value: "rating", sort: "asc" },
];

export default function SortBy() {
  let { push } = useRouter();
  let params = useSearchParams();

  const queryKey = "sort_by";
  let initialSort = params.get(queryKey) || null;

  let [open, setOpen] = useState(false);

  let label =
    sortOptions.find((option) => option.value === initialSort)?.label ||
    "Sort by";

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger className="bg-zinc-800 w-full rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 focus:outline-none focus:ring focus:ring-zinc-500 pr-3 focus:border-zinc-500 flex items-center justify-between">
        {label}
        <IconChevronDown className="size-4 text-zinc-400" strokeWidth={2} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          align="center"
          sideOffset={6}
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 p-0.5 w-(--radix-dropdown-menu-trigger-width) origin-[--radix-dropdown-menu-content-transform-origin] rounded-md border border-zinc-700 bg-zinc-800 shadow-2xl will-change-[opacity,transform]"
        >
          {sortOptions.map(({ label, value, sort }) => (
            <DropdownMenu.Item
              key={value}
              onClick={() => {
                let newParams = new URLSearchParams(params);
                newParams.set(queryKey, value);
                window.scrollTo({
                  top: 398,
                  behavior: "smooth",
                });
                push(`?${newParams.toString()}`, { scroll: false });
                setOpen(false);
              }}
              data-sorted={initialSort === value}
              className="group flex cursor-default items-center pr-2.5 w-full text-left justify-between px-4 py-2 text-sm font-medium text-zinc-100 rounded focus:outline-none border border-transparent data-[sorted=true]:border-white/10 data-[sorted=true]:bg-zinc-700/90"
            >
              <p>{label}</p>
              <IconCaretDownFilled
                className={`size-4 text-zinc-400 transition-colors group-data-[sorted=true]:text-amber-400 ${
                  sort === "asc" && "rotate-180"
                }`}
              />
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
