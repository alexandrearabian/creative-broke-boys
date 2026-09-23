"use client";

import { motion } from "motion/react";
import { ease } from "@/components/motion";

// Re-mounts on every navigation, giving each page a soft entrance.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      {children}
    </motion.div>
  );
}
