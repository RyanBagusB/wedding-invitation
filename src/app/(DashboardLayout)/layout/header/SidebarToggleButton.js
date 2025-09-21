"use client";

import { Menu } from "lucide-react";

export default function SidebarToggleButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle sidebar"
      type="button"
      className="
        z-2 flex items-center justify-center w-10 h-10 rounded-lg
        text-slate-800 dark:text-violet-50
        cursor-pointer
        transition-colors duration-200
        hover:text-violet-500 dark:hover:text-violet-500
        focus:outline-none focus:ring-2 focus:ring-violet-500 focus:text-violet-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900
      "
    >
      <Menu className="w-6 h-6" aria-hidden="true" />
    </button>
  );
}
