export default function Card({ children, className = "", hover = false, onClick, padding = true }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-surface-100 card-shadow ${
        hover ? "hover:card-shadow-hover hover:border-surface-200 transition-all duration-200 cursor-pointer" : ""
      } ${padding ? "p-6" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
