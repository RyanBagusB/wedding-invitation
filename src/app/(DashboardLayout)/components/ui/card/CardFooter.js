export default function CardFooter({ children, className = "" }) {
  return (
    <div
      className={`p-4 border-t-2 border-violet-50 dark:border-neutral-950 ${className}`}
    >
      {children}
    </div>
  );
}
