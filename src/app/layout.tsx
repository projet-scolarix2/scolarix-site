import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "scolariX - School Management System",
  description: "Complete school management system with results, attendance, schedule, and payment management",
  icons: {
    icon: "/logo scolarix.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
