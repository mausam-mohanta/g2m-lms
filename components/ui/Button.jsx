"use client";

import { forwardRef } from "react";

const variants = {
  primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-sm",
  secondary: "bg-surface-100 hover:bg-surface-200 text-surface-700",
  outline: "border border-surface-200 hover:bg-surface-50 text-surface-700",
  ghost: "hover:bg-surface-100 text-surface-600",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  success: "bg-secondary-500 hover:bg-secondary-600 text-white",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  xl: "px-8 py-4 text-lg",
};

const Button = forwardRef(function Button(
  { children, variant = "primary", size = "md", className = "", disabled, loading, icon: Icon, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon size={16} />
      ) : null}
      {children}
    </button>
  );
});

export default Button;
