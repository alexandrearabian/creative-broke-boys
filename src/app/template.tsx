"use client";

import { motion } from "motion/react";
import { ease } from "@/components/motion";

// Re-mounts on every navigation: a signal-colored curtain lifts off the new page.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="bg-primary pointer-events-none fixed inset-0 z-[70] origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease }}
      />
      {children}
    </>
  );
}
