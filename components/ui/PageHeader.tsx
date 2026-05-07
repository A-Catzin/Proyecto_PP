import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export default function PageHeader({ title, description, icon }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-900/10 flex items-center justify-center text-blue-900">
            {icon}
          </div>
        )}
        <h1 className="text-2xl font-bold text-indigo-900">{title}</h1>
      </div>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
