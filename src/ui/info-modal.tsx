"use client";

import Signature from "@/ui/signature";
import * as Dialog from "@radix-ui/react-dialog";
import { IconCheck, IconQuestionMark, IconX } from "@tabler/icons-react";
import Link from "next/link";

const statements = [
  "[DIGITALOCEAN] Self hosted typesense on a 28$ shared droplet",
  "[VERCEL] Next.js server-side rendering and image optimization",
  "Basic dependencies for UI and typesense client",
  "Laravel backend to synchronize the dataset with typesense",
];

function GitMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 98 96"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function InfoModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="fixed bottom-5 right-3 size-9 rounded-full border border-zinc-700 grid place-items-center hover:bg-zinc-800 bg-zinc-950 transition-colors focus:outline-none focus:ring focus:ring-zinc-500 focus:border-zinc-500 mr-(--removed-body-scroll-bar-size)">
        <IconQuestionMark className="size-[18px] text-zinc-200" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 backdrop-blur-sm" />

        <Dialog.Content className="z-50 fixed top-1/2 left-1/2 bg-zinc-900 max-w-2xl w-full rounded-xl shadow ring ring-inset ring-zinc-800 p-8 py-7.5 outline-none focus:outline-none -translate-1/2 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <Dialog.Title className="text-xl font-semibold tracking-tight text-white">
            The ~10K movies demo ⭐️
          </Dialog.Title>
          <Dialog.Description className="mt-4 text-sm/[26px] text-zinc-300 max-w-2x">
            A proof-of-concept showcasing a self-hosted Typesense search engine
            powered by a ~10K movie dataset. The user-friendly UI, built with
            Next.js and server-side rendering, delivers fast and responsive
            search experiences.
          </Dialog.Description>

          <Dialog.Close className="size-10 grid place-items-center absolute top-3 right-3">
            <IconX className="size-4 text-white" strokeWidth={2.5} />
          </Dialog.Close>

          <ul className="mt-7 space-y-2 text-sm text-zinc-300">
            {statements.map((statement) => (
              <li key={statement} className="flex items-center gap-x-2">
                <div
                  aria-hidden
                  className="size-6 rounded-full grid place-items-center bg-amber-400/10 text-amber-400"
                >
                  <IconCheck className="size-[14px]" strokeWidth={3} />
                </div>
                {statement}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-x-6 mt-8">
            <Link
              href="https://github.com/wayz9/typesense-laravel-backend"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm/[18px] flex items-center font-semibold text-white"
            >
              <GitMark className="text-white size-[1lh] mr-1.5" />
              Backend
            </Link>
            <Link
              href="https://github.com/wayz9/typesense-nextjs-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm/[18px] flex items-center font-semibold text-white"
            >
              <GitMark className="text-white size-[1lh] mr-1.5" />
              Frontend
            </Link>
          </div>
          <div className="flex items-center justify-end text-white h-10 mt-4">
            <Signature />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
