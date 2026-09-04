import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, error, icon: Icon, className = "", ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon size={18} className="text-surface-400 dark:text-surface-500" />
          </div>
        )}
        <input
          ref={ref}
          className={`w-full rounded-lg border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 px-4 py-2.5 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 ${
            Icon ? "pl-10" : ""
          } ${error ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" : ""} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

export default Input;

export const Textarea = forwardRef(function Textarea(
  { label, error, className = "", ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={`w-full rounded-lg border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 px-4 py-2.5 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none ${
          error ? "border-red-300" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});
