"use client";

import Link from "next/link";
import ActiveIndicator from "../../components/decorations/ActiveIndicator";

export default function SidebarItem({ item, isActive, isMinimized }) {
  const Icon = item.icon;

  const baseClasses = [
    "relative flex items-center gap-3 group",
    "px-6 sm:px-2 py-2 sm:rounded-full sm:border-4",
    "transition-colors duration-300 focus:outline-none",
    isActive
      ? "bg-violet-50 dark:bg-slate-800 sm:bg-white sm:dark:bg-neutral-900 sm:border-violet-50 sm:dark:border-neutral-950"
      : "sm:border-transparent hover:bg-violet-100 dark:hover:bg-slate-700 sm:hover:bg-violet-50 sm:dark:hover:bg-neutral-800 focus:bg-violet-100 dark:focus:bg-slate-700 sm:focus:bg-violet-50 sm:dark:focus:bg-neutral-800",
  ].join(" ");

  const iconClasses = [
    "flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300",
    isActive
      ? "text-violet-500"
      : "text-slate-800 dark:text-gray-400 sm:dark:text-violet-50",
    "group-hover:text-violet-500 group-focus:text-violet-500",
  ].join(" ");

  const textClasses = [
    "inline-block whitespace-nowrap transition-all duration-300 origin-left text-base sm:text-lg",
    isActive
      ? "dark:text-violet-50 sm:text-violet-500 sm:dark:text-violet-500"
      : "text-slate-800 dark:text-gray-400 sm:dark:text-violet-50",
    isMinimized ? "opacity-0 scale-0 w-0" : "opacity-100 scale-100 w-auto",
    "group-hover:text-violet-500 group-focus:text-violet-500",
  ].join(" ");

  const shadowTopRightClasses = [
    "absolute hidden sm:flex -right-3 -top-15 -z-1",
    "w-14 h-14 rounded-full bg-transparent",
    "shadow-[28px_28px_0_theme(colors.violet.50)]",
    "dark:shadow-[28px_28px_0_theme(colors.neutral.950)]",
  ].join(" ");

  const shadowBottomRightClasses = [
    "absolute hidden sm:flex -right-3 -bottom-15 -z-1",
    "w-14 h-14 rounded-full bg-transparent",
    "shadow-[28px_-28px_0_theme(colors.violet.50)]",
    "dark:shadow-[28px_-28px_0_theme(colors.neutral.950)]",
  ].join(" ");

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={baseClasses}
    >
      {isActive && (
        <>
          <ActiveIndicator />
          <div role="presentation" aria-hidden="true" className={shadowTopRightClasses} />
          <div role="presentation" aria-hidden="true" className={shadowBottomRightClasses} />
        </>
      )}

      <Icon className={iconClasses} />

      <span className={textClasses}>{item.title}</span>

      {isMinimized && <span className="sr-only">{item.title}</span>}
    </Link>
  );
}
