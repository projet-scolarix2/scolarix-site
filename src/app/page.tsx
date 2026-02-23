"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        router.push(user.role === "admin" ? "/admin" : "/parent");
      } else {
        router.push("/login");
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-400">Chargement...</p>
      </div>
    </div>
  );
}
