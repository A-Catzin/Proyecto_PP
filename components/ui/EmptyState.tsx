import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
}

export default function EmptyState({
  icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-12 text-center">
      {icon && (
        <div className="mx-auto w-14 h-14 rounded-full bg-blue-900/10 flex items-center justify-center text-blue-900 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto">{description}</p>
    </div>
  );
}
