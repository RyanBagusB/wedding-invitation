"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Card from "./card/Index";
import Button from "./Button";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-slate-800/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 w-[90%] max-w-sm sm:max-w-md p-2 sm:p-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Card className={`shadow-xl rounded-2xl overflow-hidden ${className}`}>
              <Card.Header className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl text-slate-800 dark:text-violet-50 font-semibold">
                  {title}
                </h2>
                <Button
                  onClick={onClose}
                  size="icon"
                  variant="ghostBorderless"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </Button>
              </Card.Header>

              <Card.Body>{children}</Card.Body>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
