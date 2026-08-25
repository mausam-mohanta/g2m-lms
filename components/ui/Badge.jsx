const colorMap = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  purple: "bg-purple-50 text-purple-600",
  red: "bg-red-50 text-red-600",
  orange: "bg-orange-50 text-orange-600",
  teal: "bg-teal-50 text-teal-600",
  gray: "bg-surface-100 text-surface-600",
  yellow: "bg-yellow-50 text-yellow-600",
};

export default function Badge({ children, color = "blue", className = "" }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[color] || colorMap.blue} ${className}`}>
      {children}
    </span>
  );
}
