"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Users, Edit2, Mail, Trash2, Plus } from "lucide-react";

const mockTeachers = [
  { id: 1, name: "M. Dupont", email: "dupont@ecole.com", subject: "Mathématiques", phone: "+221 77 111 22 33", status: "active" },
  { id: 2, name: "Mme Martin", email: "martin@ecole.com", subject: "Français", phone: "+221 78 222 33 44", status: "active" },
  { id: 3, name: "M. Moreau", email: "moreau@ecole.com", subject: "Physique", phone: "+221 79 333 44 55", status: "inactive" },
];

const getStatusBadge = (status: string) => {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
      {status === "active" ? "Actif" : "Inactif"}
    </span>
  );
};

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockTeachers.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.email.toLowerCase().includes(searchTerm.toLowerCase()) || t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon">Enseignants</h1>
          <p className="muted">Gestion des enseignants</p>
        </div>
        <Button variant="primary" size="lg">
          <Plus className="w-4 h-4 inline mr-2" />Ajouter Enseignant
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card glass hover>
          <p className="text-gray-400 text-sm">Total Enseignants</p>
          <h3 className="text-3xl font-bold text-primary-400 mt-1">{mockTeachers.length}</h3>
        </Card>
      </div>

      <Card>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Rechercher par nom, email ou matière..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500"
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="Liste des Enseignants" icon={<Users className="w-5 h-5" />} />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Nom</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Matière</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Téléphone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Statut</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-b border-dark-700 hover:bg-dark-700 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{t.name}</td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{t.email}</td>
                    <td className="px-4 py-3 text-gray-400">{t.subject}</td>
                    <td className="px-4 py-3 text-gray-400">{t.phone}</td>
                    <td className="px-4 py-3">{getStatusBadge(t.status)}</td>
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
