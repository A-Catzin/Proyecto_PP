'use client';

import { useState } from "react";
import type { Role } from "@/types/roles";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [role, setRole] = useState<Role>('public');
  // TODO: Replace useState role simulation with Supabase auth session

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Logo />
        </div>
        <div className="flex items-center justify-center flex-1 h-full">
          <NavLinks role={role} />
        </div>
        <div className="flex-shrink-0">
          <UserMenu role={role} onRoleChange={setRole} />
        </div>
      </div>
    </header>
  );
}
