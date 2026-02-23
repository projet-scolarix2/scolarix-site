import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export function Card({ children, className = "", hover = false, glass = true }: CardProps) {
  const glassStyle = glass ? "glass tech-card" : "bg-dark-800 border border-dark-700 tech-card";
  const hoverStyle = hover ? "hover:shadow-2xl hover:scale-[1.01] transition-all duration-300" : "";

  return (
    <div className={`rounded-xl p-6 ${glassStyle} ${hoverStyle} ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function CardHeader({ title, subtitle, icon }: CardHeaderProps) {
  return (
    <div className="mb-4 pb-4 border-b border-dark-700 flex items-start justify-between">
      <div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          {icon}
          {title}
        </h3>
        {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

interface CardBodyProps {
  children: ReactNode;
}

export function CardBody({ children }: CardBodyProps) {
  return <div>{children}</div>;
}
