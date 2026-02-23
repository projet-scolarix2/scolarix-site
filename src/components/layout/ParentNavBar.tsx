"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useRef } from "react";
import Portal from "@/components/ui/Portal";
import {
  BarChart2,
  FileText,
  CheckSquare,
  Calendar,
  CreditCard,
  MessageSquare,
  LogOut,
  Search,
  ChevronDown,
  User,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Tableau de Bord", href: "/parent", icon: <BarChart2 className="w-5 h-5" /> },
  { label: "Résultats", href: "/parent/results", icon: <FileText className="w-5 h-5" /> },
  { label: "Présences", href: "/parent/attendance", icon: <CheckSquare className="w-5 h-5" /> },
  { label: "Emploi du Temps", href: "/parent/schedule", icon: <Calendar className="w-5 h-5" /> },
  { label: "Paiements", href: "/parent/payments", icon: <CreditCard className="w-5 h-5" /> },
  { label: "Messages", href: "/parent/messages", icon: <MessageSquare className="w-5 h-5" /> },
];

export default function ParentNavBar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userBtnRef = useRef<HTMLButtonElement | null>(null);
  const [userPos, setUserPos] = useState<DOMRect | null>(null);

  return (
    <div className="bg-dark-800 border-b border-dark-700 sticky top-0 z-[9999] animate-fade-in">
      <div className="px-6 py-4">
        {/* Top Row: Logo + Search + User */}
        <div className="flex items-center justify-between gap-6 mb-4">
          {/* Logo */}
          <Link href="/parent" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-400 to-primary-400 flex items-center justify-center neon text-lg font-bold">
              SX
            </div>
            <h1 className="text-2xl font-bold neon hidden sm:block">scolariX</h1>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* User Menu */}
          <div className="relative flex-shrink-0">
            <button
              ref={userBtnRef}
              onClick={() => {
                setShowUserMenu((s) => {
                  const next = !s;
                  if (next && userBtnRef.current) setUserPos(userBtnRef.current.getBoundingClientRect());
                  return next;
                });
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-dark-700 transition-all duration-200 focus-ring"
            >
              <User className="w-5 h-5 text-white rounded-full bg-dark-700 p-1" />
              <div className="text-left hidden sm:block">
                <p className="text-white font-medium text-sm">{user?.name}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showUserMenu && userPos && (
              <Portal>
                <div
                  style={{
                    position: "absolute",
                    top: userPos.bottom + window.scrollY,
                    left: Math.max(8, userPos.right - 192 + window.scrollX),
                    width: 192,
                  }}
                  className="glass rounded-lg p-2 shadow-2xl z-[9999]"
                >
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-red-600/20 text-red-400 transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </Portal>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href + "/") && item.href !== "/parent");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-accent-400/20 to-primary-400/20 text-white accent-halo border border-primary-500/30"
                    : "text-gray-300 hover:bg-dark-700 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
