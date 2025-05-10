import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid place-items-center h-screen">
      <div className="flex flex-col items-center">
        <div className="px-4 py-2 text-sm uppercase items-center flex gap-x-2 font-bold text-zinc-900 rounded bg-white">
          <div className="size-2 rounded-full bg-zinc-900"></div>
          <p>404 NOT FOUND</p>
          <div className="size-2 rounded-full bg-zinc-900"></div>
        </div>
        <h1 className="mt-4 text-center text-zinc-200 text-[15px]">
          Movie not found, please check the URL or go back to the home page.
        </h1>
        <Link
          href="/"
          className="mt-8 flex items-center gap-x-2 font-medium text-base text-white"
        >
          <IconArrowLeft className="text-zinc-400 size-4" strokeWidth={3} />
          Home
        </Link>
      </div>
    </main>
  );
}
