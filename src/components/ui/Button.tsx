import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-ring";

  const variants = {
    primary: "btn-neon",
    secondary: "bg-dark-700 hover:bg-dark-600 text-gray-100 border border-dark-600",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    ghost: "btn-ghost hover:backdrop-blur-sm",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span className="animate-spin">⏳</span> : icon}
      {children}
    </button>
  );
}
