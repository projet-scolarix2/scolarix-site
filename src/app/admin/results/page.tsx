"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { BarChart2, Plus, Edit2, Trash2 } from "lucide-react";

const mockResults = [
  {
    id: 1,
    student: "Jean Dupont",
    class: "3ème A",
    cycle: "Secondaire",
    subject: "Mathématiques",
    mark: 18.5,
    coefficient: 3,
    period: "Trimestre 1",
  },
  {
    id: 2,
    student: "Marie Martin",
    class: "3ème A",
    cycle: "Secondaire",
    subject: "Français",
    mark: 17,
    coefficient: 3,
    period: "Trimestre 1",
  },
  {
    id: 3,
    student: "Pierre Durand",
    class: "4ème B",
    cycle: "Secondaire",
    subject: "Physique",
    mark: 15.5,
    coefficient: 2,
    period: "Trimestre 1",
  },
  {
    id: 4,
    student: "Sophie Bernard",
    class: "5ème C",
    cycle: "Secondaire",
    subject: "Anglais",
    mark: 19,
    coefficient: 2,
    period: "Trimestre 1",
  },
  {
    id: 5,
    student: "Luc Francois",
    class: "3ème A",
    cycle: "Secondaire",
    subject: "Histoire",
    mark: 16,
    coefficient: 2,
    period: "Trimestre 1",
  },
];

export default function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCycle, setSelectedCycle] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const cycles = [...new Set(mockResults.map((r) => r.cycle))];
  const classes = selectedCycle
    ? [...new Set(mockResults.filter((r) => r.cycle === selectedCycle).map((r) => r.class))]
    : [...new Set(mockResults.map((r) => r.class))];

  const filteredResults = mockResults.filter((result) => {
    const matchSearch =
      result.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const cycleMatch = !selectedCycle || result.cycle === selectedCycle;
    const classMatch = !selectedClass || result.class === selectedClass;
    return matchSearch && cycleMatch && classMatch;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
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

  const getMarkColor = (mark: number) => {
    if (mark >= 18) return "text-green-400";
    if (mark >= 15) return "text-blue-400";
    if (mark >= 12) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
        <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Résultats</h1>
          <p className="text-gray-400">Gestion des résultats scolaires</p>
        </div>
        <Button variant="primary" size="lg">
          <Plus className="w-4 h-4 inline mr-2" />Ajouter Résultat
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Rechercher étudiant ou matière..."
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
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader title="Liste des Résultats" icon={<BarChart2 className="w-5 h-5" />} />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("student")}>Étudiant{getSortIcon("student")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("cycle")}>Cycle{getSortIcon("cycle")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("class")}>Classe{getSortIcon("class")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("subject")}>Matière{getSortIcon("subject")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("mark")}>Note{getSortIcon("mark")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("coefficient")}>Coeff.{getSortIcon("coefficient")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("period")}>Période{getSortIcon("period")}</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedResults.map((result) => (
                  <tr key={result.id} className="border-b border-dark-700 hover:bg-dark-700 transition-colors">
                    <td className="px-4 py-3 text-white">{result.student}</td>
                    <td className="px-4 py-3 text-gray-400">{result.cycle}</td>
                    <td className="px-4 py-3 text-gray-400">{result.class}</td>
                    <td className="px-4 py-3 text-gray-400">{result.subject}</td>
                    <td className={`px-4 py-3 font-bold ${getMarkColor(result.mark)}`}>
                      {result.mark}/20
                    </td>
                    <td className="px-4 py-3 text-gray-400">{result.coefficient}</td>
                    <td className="px-4 py-3 text-gray-400">{result.period}</td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-blue-400"><Edit2 className="w-4 h-4" /></Button>
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
