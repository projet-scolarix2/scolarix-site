"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Plus, Users, Eye, Edit2, Trash2 } from "lucide-react";

const mockStudents = [
  { id: 1, name: "Jean Dupont", matricule: "MAT001", class: "3ème A", cycle: "Secondaire", level: "Secondaire" },
  { id: 2, name: "Marie Martin", matricule: "MAT002", class: "3ème A", cycle: "Secondaire", level: "Secondaire" },
  { id: 3, name: "Pierre Durand", matricule: "MAT003", class: "4ème B", cycle: "Secondaire", level: "Secondaire" },
  { id: 4, name: "Sophie Bernard", matricule: "MAT004", class: "5ème C", cycle: "Secondaire", level: "Secondaire" },
  { id: 5, name: "Luc Francois", matricule: "MAT005", class: "3ème A", cycle: "Secondaire", level: "Secondaire" },
];

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCycle, setSelectedCycle] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const cycles = [...new Set(mockStudents.map((s) => s.cycle))];
  const classes = selectedCycle
    ? [...new Set(mockStudents.filter((s) => s.cycle === selectedCycle).map((s) => s.class))]
    : [...new Set(mockStudents.map((s) => s.class))];

  const filteredStudents = mockStudents.filter((student) => {
    const matchSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.matricule.toLowerCase().includes(searchTerm.toLowerCase());
    const cycleMatch = !selectedCycle || student.cycle === selectedCycle;
    const classMatch = !selectedClass || student.class === selectedClass;
    return matchSearch && cycleMatch && classMatch;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const column = sortColumn || "name";
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon">Étudiants</h1>
          <p className="muted">Gestion de la base de données des étudiants</p>
        </div>
        <Button variant="primary" size="lg">
          <Plus className="w-4 h-4 inline mr-2" />Ajouter Étudiant
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card glass hover>
          <p className="text-gray-400 text-sm">Total Étudiants</p>
          <h3 className="text-3xl font-bold text-primary-400 mt-1">{mockStudents.length}</h3>
        </Card>
        <Card glass hover>
          <p className="text-gray-400 text-sm">Classes</p>
          <h3 className="text-3xl font-bold text-accent-400 mt-1">{classes.length}</h3>
        </Card>
        <Card glass hover>
          <p className="text-gray-400 text-sm">Moyenne Présence</p>
          <h3 className="text-3xl font-bold text-green-400 mt-1">97.5%</h3>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Rechercher par nom ou matricule..."
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

      {/* Students Table */}
      <Card>
        <CardHeader title="Liste des Étudiants" icon={<Users className="w-5 h-5" />} />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("name")}>Nom{getSortIcon("name")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("matricule")}>Matricule{getSortIcon("matricule")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("cycle")}>Cycle{getSortIcon("cycle")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("class")}>Classe{getSortIcon("class")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("level")}>Niveau{getSortIcon("level")}</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedStudents.map((student) => (
                  <tr key={student.id} className="border-b border-dark-700 hover:bg-dark-700 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{student.name}</td>
                    <td className="px-4 py-3 text-gray-400 font-mono">{student.matricule}</td>
                    <td className="px-4 py-3 text-gray-400">{student.cycle}</td>
                    <td className="px-4 py-3 text-gray-400">{student.class}</td>
                    <td className="px-4 py-3 text-primary-400">{student.level}</td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-blue-400"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" className="text-green-400"><Edit2 className="w-4 h-4" /></Button>
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
