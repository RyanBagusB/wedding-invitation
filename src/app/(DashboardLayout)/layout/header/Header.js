"use client";

import { useSidebar } from "../context/SidebarProvider";
import { useDarkMode } from "../context/DarkModeProvider";
import SidebarToggleButton from "./SidebarToggleButton";
import ToggleSwitch from "../../components/ui/ToggleSwitch";

export default function Header() {
  const { toggle } = useSidebar();
  const { isDark, toggleDarkMode } = useDarkMode();

  const shadowTopLeftClasses = [
    "absolute hidden sm:flex left-0 -bottom-full",
    "w-14 h-14 rounded-full bg-transparent",
    "shadow-[-28px_-28px_0_theme(colors.white)]",
    "dark:shadow-[-28px_-28px_0_theme(colors.neutral.900)]",
  ].join(" ");

  return (
    <header
      className="
        flex items-center justify-between
        h-14 px-4 sm:px-6 relative
        bg-white dark:bg-neutral-900
        transition-colors duration-300
      "
    >
      <div role="presentation" aria-hidden="true" className={shadowTopLeftClasses} />

      <SidebarToggleButton onClick={toggle} />

      <ToggleSwitch
        isOn={isDark}
        onToggle={toggleDarkMode}
        ariaLabel="Toggle dark mode"
      />
    </header>
  );
}
