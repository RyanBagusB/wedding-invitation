"use client";

import { sidebarConfig } from "./sidebarConfig";

export default function SidebarLogout({ isMinimized }) {
  const btnClasses = [
    "flex items-center gap-3 group",
    "px-6 sm:px-2 py-2",
    "text-red-500",
    "sm:border-4 sm:border-transparent sm:rounded-full",
    "transition-colors duration-200 focus:outline-none",
    "hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20",
  ].join(" ");

  const iconClasses = [
    "flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7",
    "transition-transform duration-300",
    "group-hover:scale-105 group-focus:scale-105",
    "group-hover:text-red-600 group-focus:text-red-600",
  ].join(" ");

  const textClasses = [
    "inline-block origin-left text-base sm:text-lg",
    "transition-all duration-300",
    isMinimized ? "opacity-0 scale-0 w-0" : "opacity-100 scale-100 w-auto",
    "group-hover:text-red-600 group-focus:text-red-600 transition-colors duration-200",
  ].join(" ");

  return (
    <button
      type="button"
      onClick={() => console.log("Logout action here")}
      aria-label={sidebarConfig.logout.title}
      aria-describedby="logout-description"
      className={btnClasses}
    >
      {sidebarConfig.logout.icon({ className: iconClasses, "aria-hidden": true })}
      <span className={textClasses}>{sidebarConfig.logout.title}</span>
      <span id="logout-description" className="sr-only">
        This will log you out from the application.
      </span>
    </button>
  );
}
