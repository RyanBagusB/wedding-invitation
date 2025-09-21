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
      "bg-transparent border-transparent text-slate-800 hover:bg-violet-50 dark:text-violet-50 dark:hover:bg-slate-800"
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
