import { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

export default function Input(props: ComponentPropsWithRef<"input">) {
  const { className, type = "text", ref, ...rest } = props;
  return (
    <input
      {...rest}
      type={type}
      className={twMerge(
        "block w-full appearance-none rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-white placeholder:font-normal placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-zinc-500 disabled:cursor-not-allowed disabled:bg-zinc-700",
        className
      )}
      ref={ref}
    />
  );
}
