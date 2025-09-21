"use client";

import ToggleSwitch from "../components/ui/ToggleSwitch";
import { useDarkMode } from "../layout/context/DarkModeProvider";

export default function Header() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <header className="absolute w-full top-0 z-20 flex justify-end items-center p-4 bg-white dark:bg-neutral-900 transition-colors duration-300">
      <ToggleSwitch
        isOn={isDark}
        onToggle={toggleDarkMode}
        ariaLabel="Toggle dark mode"
      />
    </header>
  );
}
