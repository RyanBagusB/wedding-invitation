export default function StatusBadge({ status, type }) {
  let color = "";

  switch (type) {
    case "green":
      color = "bg-emerald-400 dark:bg-emerald-600";
      break;
    case "blue":
      color = "bg-sky-400 dark:bg-sky-600";
      break;
    case "yellow":
      color = "bg-amber-300 dark:bg-amber-500";
      break;
    case "red":
      color = "bg-rose-400 dark:bg-rose-500";
      break;
    default:
      color = "bg-gray-300 dark:bg-gray-600";
  }

  return (
    <div className="flex gap-x-2 items-center">
      <span className={`w-3 h-3 rounded-full ${color}`} />
      <span>{status}</span>
    </div>
  );
}
