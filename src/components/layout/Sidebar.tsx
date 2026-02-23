"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  BarChart2,
  FileText,
  CheckSquare,
  Calendar,
  CreditCard,
  Users,
  User,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
  roles: ("admin" | "parent")[];
}

const navItems: NavItem[] = [
  { label: "Tableau de Bord", href: "/admin", icon: <BarChart2 className="w-5 h-5" />, roles: ["admin"] },
  { label: "Résultats", href: "/admin/results", icon: <FileText className="w-5 h-5" />, roles: ["admin", "parent"] },
  { label: "Présences", href: "/admin/attendance", icon: <CheckSquare className="w-5 h-5" />, roles: ["admin", "parent"] },
  { label: "Emploi du Temps", href: "/admin/schedule", icon: <Calendar className="w-5 h-5" />, roles: ["admin", "parent"] },
  { label: "Paiements", href: "/admin/payments", icon: <CreditCard className="w-5 h-5" />, roles: ["admin", "parent"] },
  { label: "Cycles & Classes", href: "/admin/cycles", icon: <FileText className="w-5 h-5" />, roles: ["admin"] },
  { label: "Étudiants", href: "/admin/students", icon: <Users className="w-5 h-5" />, roles: ["admin"] },
  { label: "Parents", href: "/admin/parents", icon: <User className="w-5 h-5" />, roles: ["admin"] },
  { label: "Enseignants", href: "/admin/teachers", icon: <Users className="w-5 h-5" />, roles: ["admin"] },
  { label: "Matières", href: "/admin/subjects", icon: <FileText className="w-5 h-5" />, roles: ["admin"] },
  { label: "Messages", href: "/admin/messages", icon: <MessageSquare className="w-5 h-5" />, roles: ["admin", "parent"] },
  { label: "Paramètres", href: "/admin/settings", icon: <Settings className="w-5 h-5" />, roles: ["admin"] },
];

export default function Sidebar({
  role,
  mobileOpen,
  onClose,
}: {
  role: "admin" | "parent";
  mobileOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <>
      {/* Backdrop for mobile when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden ${mobileOpen ? "block" : "hidden"}`}
        onClick={onClose}
        aria-hidden={!mobileOpen}
      />

      <div
        className={`glass flex flex-col h-full shadow-xl transition-transform duration-300 ease-in-out z-50
          ${isCollapsed ? "w-20" : "w-64"}
          fixed top-0 left-0 bottom-0 transform md:transform-none md:relative md:top-auto md:left-auto md:bottom-auto
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
      {/* Logo */}
      <div className="p-4 border-b border-dark-700 flex items-center justify-between group">
        {!isCollapsed && (
          <div className="flex items-center gap-3 flex-1">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="/logo scolarix.png"
                alt="scolariX Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-lg font-bold neon whitespace-nowrap">scolariX</h1>
          </div>
        )}
        <div className="flex items-center gap-2">
          {/* Mobile close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg hover:bg-dark-700 transition-all duration-200"
              aria-label="Close menu"
            >
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-dark-700 transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredItems.map((item) => {
          // Ensure links point to the current role segment (admin or parent)
          const computedHref = role === "admin" ? item.href : item.href.replace(/^\/admin/, `/${role}`);
          const isActive = pathname === computedHref || pathname.startsWith(computedHref + "/");
          return (
            <Link
              key={item.href}
              href={computedHref}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                isActive
                  ? "bg-gradient-to-r from-accent-400/10 to-primary-400/10 text-white accent-halo hover:from-accent-400/20 hover:to-primary-400/20"
                  : "text-gray-300 hover:bg-dark-700 hover:text-white"
              } ${isCollapsed ? "justify-center" : ""}`}
              title={isCollapsed ? item.label : ""}
            >
              <span className={`flex items-center justify-center ${isCollapsed ? "w-5 h-5" : ""}`}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <>
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive && <span className="ml-auto text-sm">→</span>}
                </>
              )}
              {isCollapsed && isActive && (
                <div className="absolute right-0 w-1 h-8 bg-primary-400 rounded-l-lg"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-dark-700">
        <button
          onClick={logout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200 ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "Logout" : ""}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium text-sm">Déconnexion</span>}
        </button>
      </div>
    </div>
    </>
  );
}
