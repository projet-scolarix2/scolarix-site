"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { CheckSquare, FileText, Edit2, Trash2 } from "lucide-react";

const mockAttendance = [
  { id: 1, student: "Jean Dupont", class: "3ème A", date: "2026-02-13", status: "present", subject: "Mathématiques" },
  { id: 2, student: "Marie Martin", class: "3ème A", date: "2026-02-13", status: "present", subject: "Français" },
  { id: 3, student: "Pierre Durand", class: "4ème B", date: "2026-02-13", status: "absent", subject: "Physique" },
  { id: 4, student: "Sophie Bernard", class: "5ème C", date: "2026-02-13", status: "late", subject: "Anglais" },
  { id: 5, student: "Luc Francois", class: "3ème A", date: "2026-02-13", status: "excused", subject: "Histoire" },
];

const getStatusBadge = (status: string) => {
  const badges: Record<string, { color: string; label: string }> = {
    present: { color: "bg-green-500/20 text-green-400", label: "Présent" },
    absent: { color: "bg-red-500/20 text-red-400", label: "Absent" },
    late: { color: "bg-yellow-500/20 text-yellow-400", label: "En Retard" },
    excused: { color: "bg-blue-500/20 text-blue-400", label: "Excusé" },
  };
  const badge = badges[status] || badges.present;
  return <span className={`px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>{badge.label}</span>;
};

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState("2026-02-13");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAttendance = mockAttendance.filter((att) => {
    const matchSearch = att.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDate = att.date === selectedDate;
    return matchSearch && matchDate;
  });

  const stats = {
    present: mockAttendance.filter((a) => a.status === "present").length,
    absent: mockAttendance.filter((a) => a.status === "absent").length,
    late: mockAttendance.filter((a) => a.status === "late").length,
    excused: mockAttendance.filter((a) => a.status === "excused").length,
  };

  const total = Object.values(stats).reduce((a, b) => a + b, 0);
  const presenceRate = ((stats.present + stats.excused) / total) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon">Présences</h1>
          <p className="muted">Gestion des présences</p>
        </div>
        <Button variant="primary" size="lg">
          <FileText className="w-4 h-4 inline mr-2" />Générer Rapport
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card glass hover>
          <p className="text-gray-400 text-sm">Présents</p>
          <h3 className="text-3xl font-bold text-green-400 mt-1">{stats.present}</h3>
        </Card>
        <Card glass hover>
          <p className="text-gray-400 text-sm">Absents</p>
          <h3 className="text-3xl font-bold text-red-400 mt-1">{stats.absent}</h3>
        </Card>
        <Card glass hover>
          <p className="text-gray-400 text-sm">En Retard</p>
          <h3 className="text-3xl font-bold text-yellow-400 mt-1">{stats.late}</h3>
        </Card>
        <Card glass hover>
          <p className="text-gray-400 text-sm">Taux de Présence</p>
          <h3 className="text-3xl font-bold text-blue-400 mt-1">{presenceRate.toFixed(1)}%</h3>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Rechercher étudiant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
          />
        </div>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader title="Appel du Jour" icon={<CheckSquare className="w-5 h-5" />} />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Étudiant</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Classe</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Matière</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Statut</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.map((att) => (
                  <tr key={att.id} className="border-b border-dark-700 hover:bg-dark-700 transition-colors">
                    <td className="px-4 py-3 text-white">{att.student}</td>
                    <td className="px-4 py-3 text-gray-400">{att.class}</td>
                    <td className="px-4 py-3 text-gray-400">{att.subject}</td>
                    <td className="px-4 py-3">{getStatusBadge(att.status)}</td>
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
