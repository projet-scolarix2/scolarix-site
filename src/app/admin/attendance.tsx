"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { FileText, CheckSquare, Edit2, Trash2 } from "lucide-react";

const mockAttendance = [
  {
    id: 1,
    student: "Jean Dupont",
    class: "3ème A",
    cycle: "Secondaire",
    date: "2026-02-13",
    status: "present",
    subject: "Mathématiques",
    teacher: "Mr Dubois",
  },
  {
    id: 2,
    student: "Marie Martin",
    class: "3ème A",
    cycle: "Secondaire",
    date: "2026-02-13",
    status: "late",
    subject: "Français",
    teacher: "Mme Leclerc",
  },
  {
    id: 3,
    student: "Pierre Durand",
    class: "4ème B",
    cycle: "Secondaire",
    date: "2026-02-13",
    status: "absent",
    subject: "Physique",
    teacher: "Mr Martin",
  },
  {
    id: 4,
    student: "Sophie Bernard",
    class: "5ème C",
    cycle: "Secondaire",
    date: "2026-02-13",
    status: "excused",
    subject: "Anglais",
    teacher: "Mme Francoise",
  },
];

const statusConfig = {
  present: { label: "Présent", color: "bg-green-500/20 text-green-400" },
  absent: { label: "Absent", color: "bg-red-500/20 text-red-400" },
  late: { label: "Retard", color: "bg-yellow-500/20 text-yellow-400" },
  excused: { label: "Justifié", color: "bg-blue-500/20 text-blue-400" },
};

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState("2026-02-13");
  const [selectedCycle, setSelectedCycle] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const cycles = [...new Set(mockAttendance.map((a) => a.cycle))];
  const classes = selectedCycle 
    ? [...new Set(mockAttendance.filter((a) => a.cycle === selectedCycle).map((a) => a.class))]
    : [...new Set(mockAttendance.map((a) => a.class))];

  const filteredAttendance = mockAttendance.filter((record) => {
    const dateMatch = record.date === selectedDate;
    const cycleMatch = !selectedCycle || record.cycle === selectedCycle;
    const classMatch = !selectedClass || record.class === selectedClass;
    return dateMatch && cycleMatch && classMatch;
  });

  const sortedAttendance = [...filteredAttendance].sort((a, b) => {
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
  };

  const stats = {
    total: sortedAttendance.length,
    present: sortedAttendance.filter((a) => a.status === "present").length,
    absent: sortedAttendance.filter((a) => a.status === "absent").length,
    late: sortedAttendance.filter((a) => a.status === "late").length,
  };

  const attendanceRate = stats.total > 0 ? ((stats.present / stats.total) * 100).toFixed(1) : 0;

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return " ";
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Présences</h1>
          <p className="text-gray-400">Gestion des présences</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="sr-only">Cycle</label>
            <select
              value={selectedCycle}
              onChange={(e) => {
                setSelectedCycle(e.target.value);
                setSelectedClass("");
              }}
              className="bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white text-sm focus:border-primary-500 focus:outline-none"
            >
              <option value="">Tous les cycles</option>
              {cycles.map((cycle) => (
                <option key={cycle} value={cycle}>
                  {cycle}
                </option>
              ))}
            </select>
            <label className="sr-only">Classe</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white text-sm focus:border-primary-500 focus:outline-none"
            >
              <option value="">Toutes les classes</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          <Button variant="secondary" size="sm" onClick={() => handleSort("cycle")}>
            Trier Cycle{getSortIcon("cycle")}
          </Button>

          <Button variant="secondary" size="sm" onClick={() => handleSort("class")}>
            Trier Classe{getSortIcon("class")}
          </Button>

          <Button variant="secondary" size="sm">
            <FileText className="w-4 h-4 inline mr-2" />Générer Rapport
          </Button>

          <Button variant="primary" size="lg">
            <FileText className="w-4 h-4 inline mr-2" />Marquer Présences
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Total</p>
            <h3 className="text-3xl font-bold text-white mt-2">{stats.total}</h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Présents</p>
            <h3 className="text-3xl font-bold text-green-400 mt-2">{stats.present}</h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Absents</p>
            <h3 className="text-3xl font-bold text-red-400 mt-2">{stats.absent}</h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Taux</p>
            <h3 className="text-3xl font-bold text-cyan-400 mt-2">{attendanceRate}%</h3>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Cycle</label>
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
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Classe</label>
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
        </div>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader title="Registre de Présences" icon={<CheckSquare className="w-5 h-5" />} />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("student")}>Étudiant{getSortIcon("student")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("cycle")}>Cycle{getSortIcon("cycle")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("class")}>Classe{getSortIcon("class")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("subject")}>Matière{getSortIcon("subject")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("teacher")}>Professeur{getSortIcon("teacher")}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white" onClick={() => handleSort("status")}>Status{getSortIcon("status")}</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedAttendance.map((record) => {
                  const config = statusConfig[record.status as keyof typeof statusConfig];
                  return (
                    <tr key={record.id} className="border-b border-dark-700 hover:bg-dark-700 transition-colors">
                      <td className="px-4 py-3 text-white">{record.student}</td>
                      <td className="px-4 py-3 text-gray-400">{record.cycle}</td>
                      <td className="px-4 py-3 text-gray-400">{record.class}</td>
                      <td className="px-4 py-3 text-gray-400">{record.subject}</td>
                      <td className="px-4 py-3 text-gray-400">{record.teacher}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                          {config.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <button className="text-blue-400 hover:text-blue-300"><Edit2 className="w-4 h-4" /></button>
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
