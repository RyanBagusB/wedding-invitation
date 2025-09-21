"use client";

export default function ToggleSwitch({ isOn, onToggle, ariaLabel }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <button
      role="switch"
      type="button"
      tabIndex={0}
      aria-checked={isOn}
      aria-label={ariaLabel}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className={`relative w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors duration-300
        focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2
        ${isOn ? "bg-violet-500" : "bg-violet-50"}
      `}
    >
      <span
        className={`absolute w-5 h-5 bg-white rounded-full transform transition-transform duration-300
          ${isOn ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
}
