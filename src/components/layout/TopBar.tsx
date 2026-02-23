"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState, useRef } from "react";
import Image from "next/image";
import {
  User,
  Bell,
  Search,
  LogOut,
  Settings,
  Shield,
  Eye,
  EyeOff,
  ChevronDown,
  Menu,
} from "lucide-react";
import Link from "next/link";
import Portal from "@/components/ui/Portal";

export default function TopBar({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const { user, logout, switchRole, canSwitchRole } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const notifBtnRef = useRef<HTMLButtonElement | null>(null);
  const userBtnRef = useRef<HTMLButtonElement | null>(null);
  const [notifPos, setNotifPos] = useState<DOMRect | null>(null);
  const [userPos, setUserPos] = useState<DOMRect | null>(null);

  // Mock notifications
  const notifications = [
    { id: 1, message: "Nouveau paiement reçu", time: "Il y a 10m", type: "payment" },
    { id: 2, message: "Résultat publié pour Jean", time: "Il y a 30m", type: "results" },
    { id: 3, message: "Absence enregistrée", time: "Il y a 1h", type: "attendance" },
  ];

  const handleSwitchRole = () => {
    const newRole = user?.role === "admin" ? "parent" : "admin";
    setPreviewMode(true);
    setShowUserMenu(false);
    // Rajouter la logique switch après
  };

  return (
    <div className="bg-dark-800 border-b border-dark-700 px-4 md:px-6 py-3 flex items-center justify-between animate-fade-in h-20">
      {/* Logo & Brand */}
      <div className="flex items-center gap-3 min-w-max">
        <button
          onClick={() => onOpenSidebar?.()}
          className="md:hidden p-2 rounded-lg hover:bg-dark-700 transition-colors mr-2"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-gray-300" />
        </button>
        <div className="relative w-10 h-10 rounded-lg overflow-hidden">
          <Image
            src="/logo scolarix.png"
            alt="scolariX Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-xl font-bold neon hidden sm:inline">scolariX</h1>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors duration-200"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            ref={notifBtnRef}
            onClick={() => {
              setShowNotifications((s) => {
                const next = !s;
                if (next && notifBtnRef.current) setNotifPos(notifBtnRef.current.getBoundingClientRect());
                return next;
              });
            }}
            className="relative p-2 rounded-lg hover:bg-dark-700 transition-all duration-200 group"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showNotifications && notifPos && (
            <Portal>
              <div
                style={{
                  position: "absolute",
                  top: notifPos.bottom + window.scrollY,
                  left: Math.max(8, notifPos.right - 320 + window.scrollX),
                  width: 320,
                }}
                className="glass rounded-lg p-4 z-[9999] shadow-2xl max-h-96 overflow-y-auto"
              >
                <h3 className="text-white font-semibold mb-3 text-sm">Notifications</h3>
                <div className="space-y-2">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-3 rounded-lg hover:bg-dark-600/50 transition-colors cursor-pointer border border-dark-600 hover:border-primary-500/50"
                    >
                      <p className="text-gray-200 text-sm">{notif.message}</p>
                      <p className="text-gray-500 text-xs mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Portal>
          )}
        </div>

        {/* Avatar & User Menu */}
        <div className="relative">
          <button
            ref={userBtnRef}
            onClick={() => {
              setShowUserMenu((s) => {
                const next = !s;
                if (next && userBtnRef.current) setUserPos(userBtnRef.current.getBoundingClientRect());
                return next;
              });
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-dark-700 transition-all duration-200 group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">
                {user?.name?.[0]?.toUpperCase()}
              </span>
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <p className="text-white text-sm font-medium">{user?.name}</p>
              <p className="text-gray-400 text-xs capitalize">{user?.role}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors hidden sm:block" />
          </button>

          {showUserMenu && userPos && (
            <Portal>
              <div
                style={{
                  position: "absolute",
                  top: userPos.bottom + window.scrollY,
                  left: Math.max(8, userPos.right - 224 + window.scrollX),
                  width: 224,
                }}
                className="glass rounded-lg shadow-2xl overflow-hidden z-[9999] animate-fade-in"
              >
                <div className="p-4 border-b border-dark-600">
                  <p className="text-white font-semibold text-sm">{user?.name}</p>
                  <p className="text-gray-400 text-xs capitalize">{user?.role}</p>
                </div>

                <div className="p-2 space-y-1">
                  <Link
                    href={`/${user?.role ?? "admin"}/settings`}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-dark-600 transition-colors text-gray-300 hover:text-white text-sm"
                  >
                    <Settings className="w-4 h-4" />
                    Paramètres
                  </Link>

                  {canSwitchRole && (
                    <button
                      onClick={handleSwitchRole}
                      className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-dark-600 transition-colors text-gray-300 hover:text-white text-sm text-left"
                    >
                      {previewMode ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Quitter aperçu
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          Aperçu {user?.role === "admin" ? "Parent" : "Admin"}
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600/10 transition-colors text-red-400 hover:text-red-300 text-sm mt-2 border-t border-dark-600"
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                </div>
              </div>
            </Portal>
          )}
        </div>
      </div>
    </div>
  );
}
