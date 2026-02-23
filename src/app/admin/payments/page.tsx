"use client";

import { useState } from "react";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, CreditCard, Eye, CheckSquare, Trash2 } from "lucide-react";

const mockPayments = [
  { id: 1, student: "Jean Dupont", amount: 50000, dueDate: "2026-02-28", status: "pending", type: "Scolarité", cycle: "Secondaire", class: "3ème A" },
  { id: 2, student: "Marie Martin", amount: 50000, dueDate: "2026-01-31", status: "overdue", type: "Scolarité", cycle: "Secondaire", class: "3ème A" },
  { id: 3, student: "Pierre Durand", amount: 50000, dueDate: "2026-02-28", status: "paid", type: "Scolarité", paidDate: "2026-02-10", cycle: "Secondaire", class: "4ème B" },
  { id: 4, student: "Sophie Bernard", amount: 25000, dueDate: "2026-02-15", status: "pending", type: "Uniforme", cycle: "Secondaire", class: "5ème C" },
  { id: 5, student: "Luc Francois", amount: 20000, dueDate: "2026-02-20", status: "paid", type: "Cantine", paidDate: "2026-02-12", cycle: "Secondaire", class: "3ème A" },
];

const getStatusBadge = (status: string) => {
  const badges: Record<string, string> = {
    paid: "bg-green-500/20 text-green-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    overdue: "bg-red-500/20 text-red-400",
  };
  const label = { paid: "Payé", pending: "En Attente", overdue: "En Retard" }[status];
  return <span className={`px-3 py-1 rounded-full text-sm font-medium ${badges[status]}`}>{label}</span>;
};

export default function PaymentsPage() {
  const [selectedCycle, setSelectedCycle] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const totalAmount = mockPayments.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = mockPayments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = mockPayments
    .filter((p) => p.status === "pending" || p.status === "overdue")
    .reduce((sum, p) => sum + p.amount, 0);

  const cycles = [...new Set(mockPayments.map((p) => p.cycle))];
  const classes = selectedCycle
    ? [...new Set(mockPayments.filter((p) => p.cycle === selectedCycle).map((p) => p.class))]
    : [...new Set(mockPayments.map((p) => p.class))];

  const filteredPayments = mockPayments.filter((p) => {
    const cycleMatch = !selectedCycle || p.cycle === selectedCycle;
    const classMatch = !selectedClass || p.class === selectedClass;
    return cycleMatch && classMatch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon">Paiements</h1>
          <p className="muted">Gestion des paiements de scolarité</p>
        </div>
        <Button variant="primary" size="lg">
          <Plus className="w-4 h-4 inline mr-2" />Nouveau Paiement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card glass hover>
          <p className="text-gray-400 text-sm">Total Attendu</p>
          <h3 className="text-3xl font-bold text-white mt-1">{(totalAmount / 1000).toFixed(0)}K</h3>
          <p className="text-gray-500 text-xs mt-2">CFA</p>
        </Card>
        <Card glass hover>
          <p className="text-gray-400 text-sm">Payés</p>
          <h3 className="text-3xl font-bold text-green-400 mt-1">{(paidAmount / 1000).toFixed(0)}K</h3>
          <p className="text-green-500 text-xs mt-2">{((paidAmount / totalAmount) * 100).toFixed(1)}%</p>
        </Card>
        <Card glass hover>
          <p className="text-gray-400 text-sm">En Attente</p>
          <h3 className="text-3xl font-bold text-yellow-400 mt-1">{(pendingAmount / 1000).toFixed(0)}K</h3>
          <p className="text-yellow-500 text-xs mt-2">{((pendingAmount / totalAmount) * 100).toFixed(1)}%</p>
        </Card>
      </div>

      {/* Filters (Cycle & Class) */}
      <Card>
        <div className="space-y-4 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={selectedCycle}
              onChange={(e) => { setSelectedCycle(e.target.value); setSelectedClass(""); }}
              className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
            >
              <option value="">Tous les cycles</option>
              {cycles.map((cycle) => (
                <option key={cycle} value={cycle}>{cycle}</option>
              ))}
            </select>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
            >
              <option value="">Toutes les classes</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader title="Historique des Paiements" icon={<CreditCard className="w-5 h-5" />} />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Étudiant</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Montant</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Échéance</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Statut</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-dark-700 hover:bg-dark-700 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{payment.student}</td>
                    <td className="px-4 py-3 text-gray-400">{payment.type}</td>
                    <td className="px-4 py-3 text-white font-semibold">{(payment.amount / 1000).toFixed(0)}K CFA</td>
                    <td className="px-4 py-3 text-gray-400">{payment.dueDate}</td>
                    <td className="px-4 py-3">{getStatusBadge(payment.status)}</td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-blue-400"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" className="text-green-400"><CheckSquare className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" className="text-red-400"><Trash2 className="w-4 h-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
