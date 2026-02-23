"use client";

interface ProgressBarProps {
  value: number;
  max: number;
  color?: "green" | "blue" | "yellow" | "red";
  animated?: boolean;
}

const colorClasses = {
  green: "from-green-500 to-emerald-400",
  blue: "from-primary-500 to-blue-400",
  yellow: "from-yellow-500 to-amber-400",
  red: "from-red-500 to-orange-400",
};

export default function ProgressBar({
  value,
  max,
  color = "blue",
  animated = true,
}: ProgressBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
      <div
        className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full transition-all duration-500 ${
          animated ? "animate-pulse-subtle" : ""
        }`}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </div>
  );
}
