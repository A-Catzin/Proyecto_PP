'use client';

import type { Role } from "@/types/roles";

interface UserMenuProps {
  role: Role;
  onRoleChange: (role: Role) => void;
}

const ROLES: Role[] = ['public', 'alumno', 'institucion', 'admin'];

const ROLE_LABELS: Record<Role, string> = {
  public: 'Público',
  alumno: 'Alumno',
  institucion: 'Institución',
  admin: 'Admin',
};

export default function UserMenu({ role, onRoleChange }: UserMenuProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="role-select" className="text-sm text-gray-500 sr-only">
        Rol
      </label>
      <select
        id="role-select"
        value={role}
        onChange={(e) => onRoleChange(e.target.value as Role)}
        className="border border-gray-200 rounded-md text-sm px-3 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-900"
      >
        {ROLES.map((r) => (
          <option key={r} value={r}>
            {ROLE_LABELS[r]}
          </option>
        ))}
      </select>
      {/* TODO: Replace with Supabase auth */}
    </div>
  );
}
