const colorMap = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300",
  green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
  purple: "bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300",
  red: "bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-300",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300",
  teal: "bg-teal-50 text-teal-600 dark:bg-teal-500/15 dark:text-teal-300",
  gray: "bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-300",
  yellow: "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
};

export default function Badge({ children, color = "blue", className = "" }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[color] || colorMap.blue} ${className}`}
    >
      {children}
    </span>
  );
}
