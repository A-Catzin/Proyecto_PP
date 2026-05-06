'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Role } from "@/types/roles";
import type { NavItem } from "@/types/navigation";

interface NavLinksProps {
  role: Role;
}

const NAV_ITEMS: Record<Role, NavItem[]> = {
  public: [
    { label: "Inicio", href: "/" },
    { label: "Programas", href: "/programas" },
    { label: "FAQ", href: "/faq" },
  ],
  alumno: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Perfil", href: "/perfil" },
    { label: "Plazas", href: "/plazas" },
    { label: "Reportes", href: "/reportes" },
    { label: "Descargas", href: "/descargas" },
  ],
  institucion: [
    { label: "Perfil", href: "/perfil-institucion" },
    { label: "Vacantes", href: "/vacantes" },
    { label: "Postulantes", href: "/postulantes" },
    { label: "Reportes", href: "/reportes-institucion" },
  ],
  admin: [
    { label: "Usuarios", href: "/usuarios" },
    { label: "Documentos", href: "/documentos" },
    { label: "Reportes", href: "/reportes-admin" },
    { label: "Configuración", href: "/configuracion" },
  ],
};

const linkBase =
  "inline-flex items-center h-full px-3 py-1 text-sm font-medium border-b-4 transition-colors whitespace-nowrap";

export default function NavLinks({ role }: NavLinksProps) {
  const pathname = usePathname();
  const items = NAV_ITEMS[role];

  return (
    <nav className="flex items-center gap-1 h-full overflow-x-auto">
      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${linkBase} ${
              isActive
                ? "border-indigo-900 text-indigo-900"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
