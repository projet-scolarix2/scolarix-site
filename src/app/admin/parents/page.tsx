"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Plus, Users, Edit2, Mail, Trash2 } from "lucide-react";

const mockParents = [
  { id: 1, name: "Parent Dupont", email: "parent@dupont.com", phone: "+221 77 123 45 67", children: 2, cycle: "Secondaire", status: "active" },
  { id: 2, name: "Parent Martin", email: "parent@martin.com", phone: "+221 78 234 56 78", children: 1, cycle: "Secondaire", status: "active" },
  { id: 3, name: "Parent Durand", email: "parent@durand.com", phone: "+221 79 345 67 89", children: 3, cycle: "Secondaire", status: "inactive" },
  { id: 4, name: "Parent Bernard", email: "parent@bernard.com", phone: "+221 76 456 78 90", children: 1, cycle: "Secondaire", status: "active" },
];

const getStatusBadge = (status: string) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        status === "active"
          ? "bg-green-500/20 text-green-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {status === "active" ? "Actif" : "Inactif"}
    </span>
  );
};

export default function ParentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCycle, setSelectedCycle] = useState("");

  const cycles = [...new Set(mockParents.map((p) => p.cycle))];

  const filteredParents = mockParents.filter((parent) => {
    const searchMatch =
      parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchTerm.toLowerCase());
    const cycleMatch = !selectedCycle || parent.cycle === selectedCycle;
    return searchMatch && cycleMatch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon">Parents</h1>
          <p className="muted">Gestion des comptes parents</p>
        </div>
        <Button variant="primary" size="lg">
          <Plus className="w-4 h-4 inline mr-2" />Ajouter Parent
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card glass hover>
          <p className="text-gray-400 text-sm">Total Parents</p>
          <h3 className="text-3xl font-bold text-primary-400 mt-1">{mockParents.length}</h3>
        </Card>
        <Card glass hover>
          <p className="text-gray-400 text-sm">Parents Actifs</p>
          <h3 className="text-3xl font-bold text-green-400 mt-1">
            {mockParents.filter((p) => p.status === "active").length}
          </h3>
        </Card>
        <Card glass hover>
          <p className="text-gray-400 text-sm">Enfants Inscrits</p>
          <h3 className="text-3xl font-bold text-accent-400 mt-1">
            {mockParents.reduce((sum, p) => sum + p.children, 0)}
          </h3>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
          />
          <select
            value={selectedCycle}
            onChange={(e) => setSelectedCycle(e.target.value)}
            className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
          >
            <option value="">Tous les cycles</option>
            {cycles.map((cycle) => (
              <option key={cycle} value={cycle}>
                {cycle}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Parents Table */}
      <Card>
        <CardHeader title="Liste des Parents" icon={<Users className="w-5 h-5" />} />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Nom</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Téléphone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Enfants</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Statut</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredParents.map((parent) => (
                  <tr key={parent.id} className="border-b border-dark-700 hover:bg-dark-700 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{parent.name}</td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{parent.email}</td>
                    <td className="px-4 py-3 text-gray-400">{parent.phone}</td>
                    <td className="px-4 py-3 text-white font-medium">{parent.children}</td>
                    <td className="px-4 py-3">{getStatusBadge(parent.status)}</td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-blue-400"><Edit2 className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" className="text-green-400"><Mail className="w-4 h-4" /></Button>
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
