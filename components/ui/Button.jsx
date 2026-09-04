"use client";

import { forwardRef } from "react";

const variants = {
  primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-sm shadow-primary-500/20",
  secondary: "bg-surface-100 hover:bg-surface-200 text-surface-700 dark:bg-surface-700 dark:hover:bg-surface-600 dark:text-surface-100",
  outline: "border border-surface-200 hover:bg-surface-50 text-surface-700 dark:border-surface-600 dark:hover:bg-surface-700 dark:text-surface-200",
  ghost: "hover:bg-surface-100 text-surface-600 dark:hover:bg-surface-700 dark:text-surface-300",
  danger: "bg-red-500 hover:bg-red-600 text-white shadow-sm shadow-red-500/20",
  success: "bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm shadow-secondary-500/20",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-4 py-2 text-sm rounded-lg",
  lg: "px-6 py-3 text-base rounded-xl",
  xl: "px-8 py-4 text-lg rounded-xl",
};

const Button = forwardRef(function Button(
  { children, variant = "primary", size = "md", className = "", disabled, loading, icon: Icon, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon size={16} aria-hidden="true" />
      ) : null}
      {children}
    </button>
  );
});

export default Button;
