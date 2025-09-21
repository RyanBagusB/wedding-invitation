"use client";

import { X } from "lucide-react";

export default function SidebarHeader({ isMinimized, toggle, LogoIcon, logo }) {
  return (
    <div
      className="flex items-center justify-between pl-6 pr-2 sm:px-2 py-2 sm:py-4 sm:rounded-full sm:border-4 sm:border-transparent mb-5 sm:mb-12"
      role="banner"
    >
      <div className="flex items-center gap-3">
        <LogoIcon
          className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 text-violet-500"
          aria-hidden="true"
        />

        <h1
          className={`inline-block transition-all duration-300 origin-left
            text-xl md:text-2xl font-bold tracking-wide text-violet-500
            ${isMinimized ? "opacity-0 scale-0 w-0" : "opacity-100 scale-100 w-auto"}`}
          aria-hidden={isMinimized ? "true" : undefined}
        >
          {logo.text}
        </h1>

        {isMinimized && <span className="sr-only">{logo.text}</span>}
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label="Close sidebar"
        className={`p-2 rounded-xl text-violet-500 transition-all duration-300 sm:hidden cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-900
          ${isMinimized ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
      >
        <X className="w-6 h-6" aria-hidden="true" />
      </button>
    </div>
  );
}
