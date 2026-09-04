export default function Card({ children, className = "", hover = false, onClick, padding = true }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-surface-800 rounded-xl border border-surface-100 dark:border-surface-700 card-shadow ${
        hover
          ? "hover:card-shadow-hover hover:border-surface-200 dark:hover:border-surface-600 transition-all duration-200 cursor-pointer"
          : ""
      } ${padding ? "p-6" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
