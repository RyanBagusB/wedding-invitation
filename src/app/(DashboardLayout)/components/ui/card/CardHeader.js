export default function CardHeader({ children, className = "" }) {
  return (
    <div
      className={`p-4 border-b-2 text-slate-800 dark:text-violet-50 border-violet-50 dark:border-neutral-950 ${className}`}
    >
      {children}
    </div>
  );
}
