"use client";

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  ariaLabel,
}) {
  const base =
    "inline-flex border-2 items-center justify-center gap-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-slate-800 border-transparent text-white hover:bg-neutral-900 dark:bg-violet-50 dark:text-slate-800 dark:hover:bg-white",
    ghost:
      "bg-transparent border-slate-800 text-slate-800 hover:bg-violet-50 dark:border-violet-50 dark:text-violet-50 dark:hover:bg-slate-800",
    ghostBorderless:
      "bg-transparent border-transparent text-slate-800 hover:bg-violet-50 dark:text-violet-50 dark:hover:bg-slate-800",

    red: "bg-red-500 border-transparent text-white hover:bg-red-600 dark:bg-red-400 dark:text-neutral-800 dark:hover:bg-red-300",
    blue: "bg-blue-500 border-transparent text-white hover:bg-blue-600 dark:bg-blue-400 dark:text-neutral-800 dark:hover:bg-blue-300",
    green: "bg-green-500 border-transparent text-white hover:bg-green-600 dark:bg-green-400 dark:text-neutral-800 dark:hover:bg-green-300",
    yellow:
      "bg-yellow-400 border-transparent text-slate-900 hover:bg-yellow-500 dark:bg-yellow-300 dark:text-neutral-800 dark:hover:bg-yellow-200",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs md:px-3 md:py-1.5 md:text-sm",
    md: "px-3 py-1.5 text-sm md:px-4 md:py-1.5 md:text-base",
    lg: "px-4 py-2 text-base md:px-5 md:py-3 md:text-lg",
    icon: "p-1.5 text-xs aspect-square md:p-2 md:text-sm",
  };

  const classes = `${base} ${variants[variant] || ""} ${sizes[size] || ""} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
