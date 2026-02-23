"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Plus, CreditCard, Edit2, CheckSquare, Trash2 } from "lucide-react";

const mockPayments = [
  {
    id: 1,
    student: "Jean Dupont",
    class: "3ème A",
    cycle: "Secondaire",
    description: "Frais de scolarité Janvier",
    amount: 50000,
    due_date: "2026-01-31",
    status: "paid",
    paid_date: "2026-01-25",
  },
  {
    id: 2,
    student: "Marie Martin",
    class: "3ème A",
    cycle: "Secondaire",
    description: "Frais de scolarité Février",
    amount: 50000,
    due_date: "2026-02-28",
    status: "paid",
    paid_date: "2026-02-10",
  },
  {
    id: 3,
    student: "Pierre Durand",
    class: "4ème B",
    cycle: "Secondaire",
    description: "Frais de scolarité Février",
    amount: 50000,
    due_date: "2026-02-28",
    status: "pending",
  },
  {
    id: 4,
    student: "Sophie Bernard",
    class: "5ème C",
    cycle: "Secondaire",
    description: "Frais d'activités extra-scolaires",
    amount: 30000,
    due_date: "2026-02-15",
    status: "overdue",
  },
  {
    id: 5,
    student: "Luc Francois",
    class: "3ème A",
    cycle: "Secondaire",
    description: "Frais de scolarité Février",
    amount: 50000,
    due_date: "2026-02-28",
    status: "pending",
  },
];

const statusConfig = {
  paid: { label: "Payé", color: "bg-green-500/20 text-green-400" },
  pending: { label: "En Attente", color: "bg-yellow-500/20 text-yellow-400" },
  overdue: { label: "Retard", color: "bg-red-500/20 text-red-400" },
};

export default function PaymentsPage() {
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "pending" | "overdue">("all");
  const [selectedCycle, setSelectedCycle] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const cycles = [...new Set(mockPayments.map((p) => p.cycle))];
  const classes = selectedCycle
    ? [...new Set(mockPayments.filter((p) => p.cycle === selectedCycle).map((p) => p.class))]
    : [...new Set(mockPayments.map((p) => p.class))];

  const filteredPayments = mockPayments.filter((payment) => {
    const statusMatch = filterStatus === "all" || payment.status === filterStatus;
    const cycleMatch = !selectedCycle || payment.cycle === selectedCycle;
    const classMatch = !selectedClass || payment.class === selectedClass;
    const searchMatch =
      payment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && cycleMatch && classMatch && searchMatch;
  });

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    const column = sortColumn || "student";
    const aValue = a[column as keyof typeof a] ?? "";
    const bValue = b[column as keyof typeof b] ?? "";
    
    let comparison = 0;
    if (typeof aValue === "string") {
      comparison = aValue.localeCompare(bValue as string);
    } else if (typeof aValue === "number") {
      comparison = (aValue as number) - (bValue as number);
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return " ";
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  const stats = {
    total: mockPayments.length,
    paid: mockPayments.filter((p) => p.status === "paid").length,
    pending: mockPayments.filter((p) => p.status === "pending").length,
    overdue: mockPayments.filter((p) => p.status === "overdue").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Paiements</h1>
          <p className="text-gray-400">Gestion des paiements scolaires</p>
        </div>
        <Button variant="primary" size="lg">
          <Plus className="w-4 h-4 inline mr-2" />Enregistrer Paiement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Total de Paiements</p>
            <h3 className="text-2xl font-bold text-white mt-2">{stats.total}</h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Payés</p>
            <h3 className="text-2xl font-bold text-green-400 mt-2">{stats.paid}</h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-gray-400 text-sm">En Attente</p>
            <h3 className="text-2xl font-bold text-yellow-400 mt-2">{stats.pending}</h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Retard</p>
            <h3 className="text-2xl font-bold text-red-400 mt-2">{stats.overdue}</h3>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Rechercher par étudiant ou description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
            />
            <select
              value={selectedCycle}
              onChange={(e) => {
                setSelectedCycle(e.target.value);
                setSelectedClass("");
              }}
              className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
            >
              <option value="">Tous les cycles</option>
              {cycles.map((cycle) => (
                <option key={cycle} value={cycle}>
                  {cycle}
                </option>
              ))}
            </select>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
            >
              <option value="">Toutes les classes</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            {(["all", "paid", "pending", "overdue"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === status
                    ? "bg-primary-600 text-white"
                    : "bg-dark-700 text-gray-400 hover:bg-dark-600"
                }`}
              >
                {status === "all" ? "Tous" : status === "paid" ? "Payés" : status === "pending" ? "Attente" : "Retard"}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader title="Liste des Paiements" icon={<CreditCard className="w-5 h-5" />} />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("student")}>Étudiant{getSortIcon("student")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("cycle")}>Cycle{getSortIcon("cycle")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("class")}>Classe{getSortIcon("class")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("description")}>Description{getSortIcon("description")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("amount")}>Montant{getSortIcon("amount")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("due_date")}>Échéance{getSortIcon("due_date")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("status")}>Status{getSortIcon("status")}</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedPayments.map((payment) => {
                  const config = statusConfig[payment.status as keyof typeof statusConfig];
                  return (
                    <tr key={payment.id} className="border-b border-dark-700 hover:bg-dark-700 transition-colors">
                      <td className="px-4 py-3 text-white font-medium">{payment.student}</td>
                      <td className="px-4 py-3 text-gray-400">{payment.cycle}</td>
                      <td className="px-4 py-3 text-gray-400">{payment.class}</td>
                      <td className="px-4 py-3 text-gray-400">{payment.description}</td>
                      <td className="px-4 py-3 text-white font-semibold">{payment.amount.toLocaleString()} FC</td>
                      <td className="px-4 py-3 text-gray-400">{new Date(payment.due_date).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                          {config.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <button className="text-blue-400 hover:text-blue-300"><Edit2 className="w-4 h-4" /></button>
                        <button className="text-green-400 hover:text-green-300"><CheckSquare className="w-4 h-4" /></button>
                        <button className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
