export default function CardRoot({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-neutral-900 rounded-2xl ${className}`}>
      {children}
    </div>
  );
}
