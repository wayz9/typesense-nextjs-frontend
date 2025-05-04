"use client";

import {
  type HTMLMotionProps,
  motion,
  type SpringOptions,
  type Transition,
} from "motion/react";
import * as React from "react";
import { twMerge } from "tailwind-merge";

type StarLayerProps = HTMLMotionProps<"div"> & {
  count: number;
  size: number;
  transition: Transition;
  starColor: string;
};

function generateStars(count: number, starColor: string) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(", ");
}

function StarLayer({
  count = 1000,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: "linear" },
  starColor = "#fff",
  className,
  ...props
}: StarLayerProps) {
  const [boxShadow, setBoxShadow] = React.useState<string>("");

  React.useEffect(() => {
    setBoxShadow(generateStars(count, starColor));
  }, [count, starColor]);

  return (
    <motion.div
      data-slot="star-layer"
      animate={{ y: [0, -2000] }}
      transition={transition}
      className={twMerge(
        "absolute top-0 left-0 w-full h-[2000px] will-change-transform",
        className
      )}
      {...props}
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </motion.div>
  );
}

type StarsBackgroundProps = React.ComponentProps<"div"> & {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColor?: string;
};

export default function StarsBackground({
  children,
  className,
  speed = 50,
  starColor = "#fff",
  ...props
}: StarsBackgroundProps) {
  return (
    <div
      className={twMerge("relative size-full overflow-hidden", className)}
      {...props}
    >
      <motion.div>
        <StarLayer
          count={1500}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
          starColor={starColor}
        />
        <StarLayer
          count={400}
          size={3}
          transition={{
            repeat: Infinity,
            duration: speed * 2,
            ease: "linear",
          }}
          starColor={starColor}
        />
        <StarLayer
          count={200}
          size={3}
          transition={{
            repeat: Infinity,
            duration: speed * 3,
            ease: "linear",
          }}
          starColor={starColor}
        />
      </motion.div>
      {children}
    </div>
  );
}
