"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { useState } from "react";
import { useEffect } from "react";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "parent")) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, user?.role]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "parent") {
    return null;
  }

  return (
    <div className="flex h-screen bg-gradient-dark">
      <Sidebar role="parent" mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-visible">
        <TopBar onOpenSidebar={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
