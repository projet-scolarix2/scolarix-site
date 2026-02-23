"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, AuthState } from "@/types";

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: "admin" | "parent") => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  switchRole: (newRole: "admin" | "parent") => void;
  canSwitchRole: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Simulated authentication
  useEffect(() => {
    const storedUser = localStorage.getItem("scolarix_user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        });
      } catch (error) {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } else {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  const login = async (email: string, password: string, role: "admin" | "parent") => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    
    // Simulated API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock users
    const mockUsers: Record<string, User> = {
      admin: {
        id: "admin_001",
        email: "admin@scolarix.com",
        name: "Administrator",
        role: "admin",
        avatar: "",
      },
      parent: {
        id: "parent_001",
        email: "parent@example.com",
        name: "Parent Dupont",
        role: "parent",
        children: ["student_001", "student_002"],
        avatar: "",
      },
    };

    if (role === "admin" && email === "admin@scolarix.com" && password === "admin123") {
      const user = mockUsers.admin;
      localStorage.setItem("scolarix_user", JSON.stringify(user));
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
    } else if (role === "parent" && email === "parent@example.com" && password === "parent123") {
      const user = mockUsers.parent;
      localStorage.setItem("scolarix_user", JSON.stringify(user));
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
    } else {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("scolarix_user");
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const switchRole = (newRole: "admin" | "parent") => {
    if (!authState.user) return;

    const mockUsers: Record<string, User> = {
      admin: {
        id: "admin_001",
        email: "admin@scolarix.com",
        name: "Administrator",
        role: "admin",
        avatar: "",
      },
      parent: {
        id: "parent_001",
        email: "parent@example.com",
        name: "Parent Dupont",
        role: "parent",
        children: ["student_001", "student_002"],
        avatar: "",
      },
    };

    const newUser = mockUsers[newRole];
    localStorage.setItem("scolarix_user", JSON.stringify(newUser));
    setAuthState({
      user: newUser,
      isLoading: false,
      isAuthenticated: true,
    });
  };

  // Admin can preview as parent and vice-versa
  const canSwitchRole = authState.user?.role === "admin" || authState.user?.role === "parent";

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, switchRole, canSwitchRole, isLoading: authState.isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
