"use client";

import { Card } from "@/components/ui/Card";
import { 
  User, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Book
} from "lucide-react";
import ProgressBar from "@/components/dashboard/ProgressBar";

interface ChildCardProps {
  id: number;
  name: string;
  class: string;
  average: number;
  presence: number;
  absences: number;
  lastGrades: { subject: string; grade: number; coefficient: number }[];
  paymentStatus: "paid" | "pending" | "overdue";
  paymentAmount?: number;
}

export default function ChildCard({
  id,
  name,
  class: className,
  average,
  presence,
  absences,
  lastGrades,
  paymentStatus,
  paymentAmount,
}: ChildCardProps) {
  const getAverageColor = (avg: number) => {
    if (avg >= 16) return "text-green-400";
    if (avg >= 14) return "text-blue-400";
    if (avg >= 12) return "text-yellow-400";
    return "text-orange-400";
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "overdue":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "";
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case "paid":
        return "✓ Payé";
      case "pending":
        return "⏳ En attente";
      case "overdue":
        return "⚠️ En retard";
      default:
        return "";
    }
  };

  return (
    <Card 
      hover 
      glass 
      className="group overflow-hidden transition-all duration-500 hover:scale-105"
    >
      {/* Header avec nom et statue */}
      <div className="flex items-start justify-between mb-6 pb-4 border-b border-dark-700/50">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors truncate">
            {name}
          </h3>
          <p className="text-gray-400 text-sm truncate">{className}</p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
          <User className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Moyenne Générale - Grande */}
      <div className="mb-6 p-4 bg-gradient-to-br from-primary-500/10 to-accent-600/10 rounded-2xl border border-primary-500/20 animate-pulse-subtle">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium mb-1">Moyenne Générale</p>
            <div className={`text-4xl font-bold ${getAverageColor(average)}`}>
              {average.toFixed(2)}
            </div>
          </div>
          <TrendingUp className="w-8 h-8 text-primary-400 opacity-60" />
        </div>
        <div className="mt-3 h-2 bg-dark-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
            style={{ width: `${(average / 20) * 100}%` }}
          />
        </div>
      </div>

      {/* Présence */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">Présence</span>
          <span className={`text-lg font-bold ${presence >= 95 ? "text-green-400" : presence >= 90 ? "text-yellow-400" : "text-red-400"}`}>
            {presence}%
          </span>
        </div>
        <ProgressBar value={presence} max={100} color={presence >= 95 ? "green" : "yellow"} />
      </div>

      {/* Absences */}
      {absences > 0 && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <span className="text-red-300 text-sm">
            <strong>{absences}</strong> absence{absences > 1 ? "s" : ""} non justifiée{absences > 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Dernières Notes */}
      {lastGrades.length > 0 && (
        <div className="mb-6 pb-6 border-b border-dark-700/50">
          <div className="flex items-center gap-2 mb-3">
            <Book className="w-4 h-4 text-blue-400" />
            <h4 className="text-sm font-semibold text-gray-300">Dernières Notes</h4>
          </div>
          <div className="space-y-2">
            {lastGrades.slice(0, 3).map((grade, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 hover:bg-dark-700/30 rounded-lg transition-colors">
                <span className="text-gray-400 text-sm truncate max-w-[65%]">{grade.subject}</span>
                <div className="flex items-center gap-2 flex-shrink-0 min-w-[4.5rem] justify-end">
                  <span className="font-bold text-white">{grade.grade.toFixed(1)}</span>
                  <span className="text-xs text-gray-500">/{grade.coefficient}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statut Paiement */}
      {paymentStatus && (
        <div className={`p-4 rounded-xl border transition-all ${getPaymentStatusColor(paymentStatus)} overflow-hidden`}> 
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              {paymentStatus === "paid" ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="font-medium text-sm truncate">
                {getPaymentStatusLabel(paymentStatus)}
              </span>
            </div>
            {paymentAmount && (
              <span className="text-sm font-semibold truncate">
                {paymentAmount.toLocaleString("fr-FR")} CFA
              </span>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
