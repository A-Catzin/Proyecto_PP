import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  accent?: "indigo" | "blue" | "green" | "amber";
}

const accentMap = {
  indigo: "border-l-indigo-900 bg-indigo-50/50",
  blue: "border-l-blue-900 bg-blue-50/50",
  green: "border-l-emerald-600 bg-emerald-50/50",
  amber: "border-l-amber-500 bg-amber-50/50",
};

const iconBgMap = {
  indigo: "bg-indigo-900/10 text-indigo-900",
  blue: "bg-blue-900/10 text-blue-900",
  green: "bg-emerald-600/10 text-emerald-700",
  amber: "bg-amber-500/10 text-amber-600",
};

export default function StatCard({
  title,
  value,
  description,
  icon,
  accent = "indigo",
}: StatCardProps) {
  return (
    <div
      className={`bg-white shadow-sm rounded-lg border-l-4 ${accentMap[accent]} p-5`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {description && (
            <p className="text-xs text-gray-400 mt-1">{description}</p>
          )}
        </div>
        {icon && (
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${iconBgMap[accent]}`}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
