"use client";

import ToggleSwitch from "../../components/ui/ToggleSwitch";
import { useDarkMode } from "../../layout/context/DarkModeProvider";

export default function Layout({ children }) {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div className="relative min-h-screen flex flex-col bg-violet-50 dark:bg-neutral-950 transition-colors duration-300">
      <header className="absolute w-full top-0 z-20 flex justify-end items-center p-4 bg-white dark:bg-neutral-900 transition-colors duration-300">
        <ToggleSwitch
          isOn={isDark}
          onToggle={toggleDarkMode}
          ariaLabel="Toggle dark mode"
        />
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
}
