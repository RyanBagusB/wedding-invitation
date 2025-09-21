"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({
  className = "",
  itemClass = "",
  activeClass = "",
  labelMap = {},
}) {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  if (pathParts.length === 0) return null;

  const linkClass =
    "text-gray-500 capitalize hover:underline focus:underline focus:outline-none";

  return (
    <nav className={`text-sm sm:text-base ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap">
        {pathParts.map((part, index) => {
          const href = "/" + pathParts.slice(0, index + 1).join("/");
          const isLast = index === pathParts.length - 1;
          const label = labelMap[part] || part;

          return (
            <li key={href} className={`flex items-center ${itemClass}`}>
              {isLast ? (
                <span
                  className={`${activeClass} text-gray-600 dark:text-gray-400 capitalize`}
                  aria-current="page"
                >
                  {label}
                </span>
              ) : (
                <Link href={href} className={linkClass}>
                  {label}
                </Link>
              )}
              {!isLast && (
                <ChevronRight className="w-4 h-4 mx-1 text-gray-500" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
