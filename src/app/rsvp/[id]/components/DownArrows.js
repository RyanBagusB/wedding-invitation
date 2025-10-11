// components/DownArrowSingle.js
"use client";

import { motion } from "framer-motion";
import { ChevronsDown } from "lucide-react";

export default function DownArrowSingle() {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: [-12, 4, 4, 18], opacity: [0, 1, 1, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatType: "loop", 
          ease: "easeInOut", 
        }}
      >
        <ChevronsDown className="w-10 h-10 text-white" />
      </motion.div>
    </div>
  );
}
