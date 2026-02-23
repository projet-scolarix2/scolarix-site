"use client";

import { useState } from "react";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FileText, List, Plus, Eye, Edit2, Trash2 } from "lucide-react";

const mockSubjects = [
  {
    id: 1,
    name: "Mathématiques",
    cycle: "Secondaire",
    className: "3ème A",
    coursePlan:
      "Algèbre: équations, inéquations; Géométrie: trigonométrie et vecteurs; Analyse: fonctions et limites.",
    competencies: ["Résoudre des équations", "Modéliser des situations", "Raisonner géométriquement"],
  },
  {
    id: 2,
    name: "Français",
    cycle: "Secondaire",
    className: "4ème B",
    coursePlan:
      "Lecture analytique, expression écrite, grammaire et vocabulaire. Projet d'écriture et lecture cursive.",
    competencies: ["Compréhension de texte", "Maîtrise de l'expression écrite", "Analyse littéraire"],
  },
];

export default function SubjectsPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = mockSubjects.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.cycle.toLowerCase().includes(search.toLowerCase()) ||
      s.className.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon">Matières</h1>
          <p className="muted">Gestion des matières, plans de cours et compétences</p>
        </div>
        <Button variant="primary" size="lg">
          <Plus className="w-4 h-4 inline mr-2" />Nouvelle Matière
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card glass hover>
          <p className="text-gray-400 text-sm">Total Matières</p>
          <h3 className="text-3xl font-bold text-primary-400 mt-1">{mockSubjects.length}</h3>
        </Card>
      </div>

      <Card>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Rechercher par matière, cycle ou classe..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500"
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="Liste des Matières" icon={<FileText className="w-5 h-5" />} />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Matière</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Cycle</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Classe</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <>
                    <tr key={s.id} className="border-b border-dark-700 hover:bg-dark-700 transition-colors">
                      <td className="px-4 py-3 text-white font-medium">{s.name}</td>
                      <td className="px-4 py-3 text-gray-400">{s.cycle}</td>
                      <td className="px-4 py-3 text-gray-400">{s.className}</td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => setExpanded(expanded === s.id ? null : s.id)} className="text-blue-400">
                          <Eye className="w-4 h-4 inline" /> <span className="ml-2">Voir</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-blue-400"><Edit2 className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-red-400"><Trash2 className="w-4 h-4" /></Button>
                      </td>
                    </tr>
                    {expanded === s.id && (
                      <tr className="bg-dark-800">
                        <td colSpan={4} className="px-6 py-4 text-gray-300">
                          <h4 className="font-semibold text-white">Plan de cours</h4>
                          <p className="text-sm mt-2">{s.coursePlan}</p>
                          <h4 className="font-semibold text-white mt-3">Compétences</h4>
                          <ul className="list-disc ml-5 mt-2 text-sm text-gray-300">
                            {s.competencies.map((c, idx) => (
                              <li key={idx}>{c}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
