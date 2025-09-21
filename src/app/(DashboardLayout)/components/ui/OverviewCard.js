import Card from "./card/Index";

export default function OverviewCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-violet-500",
}) {
  return (
    <Card>
      <Card.Body className="p-5 flex items-center gap-4">
        {Icon && (
          <div className={`flex items-center justify-center w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex-shrink-0`}>
            <Icon className={`w-8 h-8 ${iconColor}`} />
          </div>
        )}
        <div className="flex flex-col justify-center flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 leading-tight">
            {title}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white leading-snug">
            {value}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}
