"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import useMeasure from "react-use-measure";

export default function ResizablePanel({ children }: { children: ReactNode }) {
  const [ref, bounds] = useMeasure();

  return (
    <motion.div
      className="overflow-hidden"
      animate={{ height: bounds.height > 0 ? bounds.height : "auto" }}
      transition={{ ease: "easeInOut", duration: 0.35 }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}
