"use client";

import { useState } from "react";
import { Users, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [role, setRole] = useState<"admin" | "parent">("parent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password, role);
      toast.success("Connexion réussie!");
      router.push(role === "admin" ? "/admin" : "/parent");
    } catch (error) {
      toast.error("Email ou mot de passe incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: "admin" | "parent") => {
    setRole(role);
    setEmail(role === "admin" ? "admin@scolarix.com" : "parent@example.com");
    setPassword(role === "admin" ? "admin123" : "parent123");
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center p-4">
      {/* Logo and Title */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400 mb-2">
          scolariX
        </h1>
        <p className="text-gray-400 text-lg">Système de Gestion Scolaire</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md glass rounded-2xl p-8">
        {/* Role Selection */}
        <div className="mb-8">
          <p className="text-white text-sm font-medium mb-3">Sélectionnez votre rôle</p>
          <div className="flex gap-4">
            <button
              onClick={() => setRole("parent")}
              className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
                role === "parent"
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-500/50"
                  : "bg-dark-700 text-gray-300 hover:bg-dark-600"
              }`}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Parent
              </span>
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
                role === "admin"
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-500/50"
                  : "bg-dark-700 text-gray-300 hover:bg-dark-600"
              }`}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <User className="w-5 h-5" />
                Admin
              </span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            Se Connecter
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 pt-8 border-t border-dark-700">
          <p className="text-gray-400 text-sm text-center mb-4">Identifiants de démonstration</p>
          <div className="space-y-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleDemoLogin("parent")}
              className="w-full"
            >
              Parent: parent@example.com / parent123
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleDemoLogin("admin")}
              className="w-full"
            >
              Admin: admin@scolarix.com / admin123
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-sm mt-8">© 2026 scolariX. Tous droits réservés.</p>
    </div>
  );
}
