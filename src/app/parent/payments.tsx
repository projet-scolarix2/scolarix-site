"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { CreditCard, Clock, AlertCircle, CheckCircle, Download, Plus } from "lucide-react";

const mockPaymentsData = {
  "Thomas Dupont": [
    { id: 1, description: "Frais de scolarité Janvier", amount: 50000, dueDate: "2026-01-31", status: "paid", paidDate: "2026-01-25", method: "Virement" },
    { id: 2, description: "Frais de scolarité Février", amount: 50000, dueDate: "2026-02-28", status: "paid", paidDate: "2026-02-10", method: "Mobile Money" },
    { id: 3, description: "Frais d'activités", amount: 25000, dueDate: "2026-02-15", status: "pending" },
    { id: 4, description: "Frais de cantine Mars", amount: 20000, dueDate: "2026-02-28", status: "overdue" },
    { id: 5, description: "Uniforme", amount: 35000, dueDate: "2026-03-15", status: "pending" },
  ],
  "Léa Dupont": [
    { id: 6, description: "Frais de scolarité Janvier", amount: 50000, dueDate: "2026-01-31", status: "paid", paidDate: "2026-01-20", method: "Virement" },
    { id: 7, description: "Frais de scolarité Février", amount: 50000, dueDate: "2026-02-28", status: "paid", paidDate: "2026-02-15", method: "Virement" },
    { id: 8, description: "Excursion", amount: 15000, dueDate: "2026-02-20", status: "pending" },
  ],
};

const statusConfig = {
  paid: { label: "Payé", color: "bg-green-500/20 text-green-400", icon: <CheckCircle className="w-4 h-4" /> },
  pending: { label: "En Attente", color: "bg-yellow-500/20 text-yellow-400", icon: <Clock className="w-4 h-4" /> },
  overdue: { label: "En Retard", color: "bg-red-500/20 text-red-400", icon: <AlertCircle className="w-4 h-4" /> },
};

export default function ParentPaymentsPage() {
  const [selectedChild, setSelectedChild] = useState("Thomas Dupont");
  const [showDetails, setShowDetails] = useState<number | null>(null);
  
  const currentPayments = mockPaymentsData[selectedChild as keyof typeof mockPaymentsData] || [];

  const stats = {
    total: currentPayments.length,
    paid: currentPayments.filter((p) => p.status === "paid").length,
    pending: currentPayments.filter((p) => p.status === "pending").length,
    overdue: currentPayments.filter((p) => p.status === "overdue").length,
  };

  const totalAmount = currentPayments.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = currentPayments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = currentPayments
    .filter((p) => p.status === "pending" || p.status === "overdue")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold neon">Paiements</h1>
          <p className="muted">Gestion des frais de scolarité</p>
        </div>
        <Button variant="primary" size="lg">
          <Plus className="w-4 h-4 inline mr-2" />Ajouter
        </Button>
      </div>

      {/* Child Selection */}
      <Card>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.keys(mockPaymentsData).map((child) => (
            <button
              key={child}
              onClick={() => setSelectedChild(child)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedChild === child ? "bg-primary-600 text-white" : "bg-dark-700"
              }`}
            >
              {child}
            </button>
          ))}
        </div>
      </Card>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card glass hover>
          <p className="text-gray-400 text-sm">Total</p>
          <h3 className="text-2xl font-bold text-white mt-2">{(totalAmount / 1000).toFixed(0)}K</h3>
        </Card>
        <Card glass hover>
          <p className="text-gray-400 text-sm">Payés</p>
          <h3 className="text-2xl font-bold text-green-400 mt-2">{stats.paid}</h3>
          <p className="text-green-500 text-xs mt-1">{((paidAmount / totalAmount) * 100).toFixed(0)}%</p>
        </Card>
        <Card glass hover>
          <p className="text-gray-400 text-sm">En Attente</p>
          <h3 className="text-2xl font-bold text-yellow-400 mt-2">{stats.pending}</h3>
        </Card>
        <Card glass hover>
          <p className="text-gray-400 text-sm">En Retard</p>
          <h3 className="text-2xl font-bold text-red-400 mt-2">{stats.overdue}</h3>
        </Card>
      </div>

      {/* Payments List */}
      <Card>
        <CardHeader title="Détail des Frais" icon={<CreditCard className="w-5 h-5" />} />
        <CardBody>
          <div className="space-y-3">
            {currentPayments.map((payment: any) => {
              const config = statusConfig[payment.status as keyof typeof statusConfig];
              return (
                <div key={payment.id}>
                  <div
                    onClick={() => setShowDetails(showDetails === payment.id ? null : payment.id)}
                    className="p-4 bg-dark-700 rounded-lg hover:bg-dark-600 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-white font-bold">{payment.description}</h4>
                        <p className="text-gray-400 text-sm">
                          Échéance: {new Date(payment.dueDate).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">{(payment.amount / 1000).toFixed(0)}K</p>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                          {config.icon} {config.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  {showDetails === payment.id && (
                    <div className="p-4 bg-dark-800 rounded-b-lg border-t border-dark-700">
                      {(payment.status === "pending" || payment.status === "overdue") && (
                        <Button variant="primary" size="md" className="w-full">
                          <CreditCard className="w-4 h-4 inline mr-2" />Payer
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader title="Moyens de Paiement" icon={<CreditCard className="w-5 h-5" />} />
        <CardBody>
          <div className="space-y-3">
            <div className="p-4 bg-dark-700 rounded-lg border border-dark-600">
              <h4 className="text-white font-bold">Virement Bancaire</h4>
              <p className="text-gray-400 text-sm mt-1">SNBC - Compte: 12345678</p>
            </div>
            <div className="p-4 bg-dark-700 rounded-lg border border-dark-600">
              <h4 className="text-white font-bold">Mobile Money</h4>
              <p className="text-gray-400 text-sm mt-1">Airtel Money: +243 975 123 456</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Download */}
      <Card>
        <CardHeader title="Factures" icon={<Download className="w-5 h-5" />} />
        <CardBody>
          <Button variant="secondary" size="lg" className="w-full">
            <Download className="w-4 h-4 inline mr-2" />Télécharger
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
