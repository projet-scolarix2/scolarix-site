"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { 
  CreditCard, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Download
} from "lucide-react";

interface PaymentData {
  id: number;
  childName: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  paidDate?: string;
}

interface PaymentStatusProps {
  payments: PaymentData[];
}

export default function PaymentStatus({ payments }: PaymentStatusProps) {
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = payments
    .filter(p => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments
    .filter(p => p.status !== "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case "overdue":
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/10 border-green-500/30";
      case "pending":
        return "bg-yellow-500/10 border-yellow-500/30";
      case "overdue":
        return "bg-red-500/10 border-red-500/30";
      default:
        return "";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "paid":
        return "Payé";
      case "pending":
        return "En attente";
      case "overdue":
        return "En retard";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader 
        title="Paiements Scolarité" 
        icon={<CreditCard className="w-5 h-5" />} 
      />
      <CardBody>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 border border-primary-500/20">
            <p className="text-xs text-gray-400 mb-1">Total</p>
            <p className="text-xl font-bold text-primary-400">
              {totalAmount.toLocaleString("fr-FR")}
            </p>
            <p className="text-xs text-gray-500 mt-1">CFA</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20">
            <p className="text-xs text-gray-400 mb-1">Payé</p>
            <p className="text-xl font-bold text-green-400">
              {paidAmount.toLocaleString("fr-FR")}
            </p>
            <p className="text-xs text-gray-500 mt-1">CFA</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20">
            <p className="text-xs text-gray-400 mb-1">En attente</p>
            <p className="text-xl font-bold text-red-400">
              {pendingAmount.toLocaleString("fr-FR")}
            </p>
            <p className="text-xs text-gray-500 mt-1">CFA</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progression du paiement</span>
            <span className="text-sm font-bold text-primary-400">
              {totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0}%
            </span>
          </div>
          <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-700"
              style={{ width: `${totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Payments List */}
        <div className="space-y-3">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className={`p-4 rounded-xl border transition-all hover:scale-102 ${getStatusBg(payment.status)} overflow-hidden`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">{payment.childName}</h4>
                  <p className="text-sm text-gray-400 truncate">
                    Échéance: {new Date(payment.dueDate).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {getStatusIcon(payment.status)}
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-dark-700/50 truncate">
                    {getStatusLabel(payment.status)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-dark-700/30">
                <span className="text-lg font-bold text-white truncate">
                  {payment.amount.toLocaleString("fr-FR")} CFA
                </span>
                {payment.paidDate && (
                  <span className="text-xs text-gray-400 truncate">
                    Payé le {new Date(payment.paidDate).toLocaleDateString("fr-FR")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action */}
        <button className="w-full mt-6 p-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all hover:scale-105 flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Télécharger la Facture
        </button>
      </CardBody>
    </Card>
  );
}
