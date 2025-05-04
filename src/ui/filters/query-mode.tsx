"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IconAdjustmentsSearch, IconCheck } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const queryModes = [
  { label: "Title Only", value: "title" },
  { label: "Title + Description", value: "title,description" },
];

export default function QueryMode() {
  let { push } = useRouter();
  let params = useSearchParams();

  const queryKey = "_query_mode";
  let queryMode = params.get(queryKey) || "title,description";

  let [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="aspect-square size-9.5 bg-zinc-800 grid place-items-center rounded-md border border-zinc-700 focus:outline-none focus:ring focus:ring-zinc-500 focus:border-zinc-500">
        <IconAdjustmentsSearch
          className="size-5 text-zinc-400"
          strokeWidth={1.75}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          align="end"
          sideOffset={6}
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 p-0.5 w-52 origin-[--radix-dropdown-menu-content-transform-origin] rounded-md border border-zinc-700 bg-zinc-800 shadow-2xl will-change-[opacity,transform]"
        >
          {queryModes.map(({ label, value }) => (
            <DropdownMenu.Item
              key={value}
              onClick={() => {
                let newParams = new URLSearchParams(params);
                newParams.set(queryKey, value);
                push(`?${newParams.toString()}`, { scroll: false });
                setOpen(false);
              }}
              data-active={value === queryMode}
              className="group flex cursor-default items-center pr-2.5 w-full text-left justify-between px-4 py-2 text-sm font-medium text-zinc-100 rounded focus:outline-none border border-transparent data-[active=true]:border-white/10 data-[active=true]:bg-zinc-700/90"
            >
              <p>{label}</p>
              <IconCheck
                className="size-4 invisible group-data-[active=true]:visible text-amber-400"
                strokeWidth={3}
              />
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
