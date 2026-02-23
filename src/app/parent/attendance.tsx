"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { CheckSquare, XCircle, Clock, FileText, TrendingUp, Download, Filter } from "lucide-react";

const mockAttendanceData = {
  "Thomas Dupont": [
    { id: 1, date: "2026-02-13", subject: "Mathématiques", status: "present", teacher: "Mr Dubois" },
    { id: 2, date: "2026-02-12", subject: "Français", status: "present", teacher: "Mme Leclerc" },
    { id: 3, date: "2026-02-11", subject: "Physique", status: "late", teacher: "Mr Martin" },
    { id: 4, date: "2026-02-10", subject: "Anglais", status: "present", teacher: "Mme Francoise" },
    { id: 5, date: "2026-02-09", subject: "Histoire", status: "absent", teacher: "Mr Laurent" },
    { id: 6, date: "2026-02-06", subject: "EPS", status: "excused", teacher: "Mr Dubois" },
    { id: 7, date: "2026-02-05", subject: "Technologie", status: "present", teacher: "Mr Leclerc" },
    { id: 8, date: "2026-02-04", subject: "SVT", status: "present", teacher: "Mme Martin" },
    { id: 9, date: "2026-02-03", subject: "Mathématiques", status: "present", teacher: "Mr Dubois" },
    { id: 10, date: "2026-02-02", subject: "Français", status: "present", teacher: "Mme Leclerc" },
  ],
  "Léa Dupont": [
    { id: 11, date: "2026-02-13", subject: "Mathématiques", status: "present", teacher: "Mr Dubois" },
    { id: 12, date: "2026-02-12", subject: "Français", status: "present", teacher: "Mme Leclerc" },
    { id: 13, date: "2026-02-11", subject: "Anglais", status: "present", teacher: "Mme Francoise" },
    { id: 14, date: "2026-02-10", subject: "Physique", status: "present", teacher: "Mr Martin" },
    { id: 15, date: "2026-02-09", subject: "SVT", status: "present", teacher: "Mme Martin" },
    { id: 16, date: "2026-02-06", subject: "Histoire", status: "present", teacher: "Mr Laurent" },
    { id: 17, date: "2026-02-05", subject: "EPS", status: "present", teacher: "Mr Dubois" },
    { id: 18, date: "2026-02-04", subject: "Technologie", status: "present", teacher: "Mr Leclerc" },
  ],
};

const statusConfig = {
  present: { label: "Présent", icon: <CheckSquare className="w-4 h-4 inline mr-2" />, color: "bg-green-500/20 text-green-400" },
  absent: { label: "Absent", icon: <XCircle className="w-4 h-4 inline mr-2" />, color: "bg-red-500/20 text-red-400" },
  late: { label: "Retard", icon: <Clock className="w-4 h-4 inline mr-2" />, color: "bg-yellow-500/20 text-yellow-400" },
  excused: { label: "Justifié", icon: <FileText className="w-4 h-4 inline mr-2" />, color: "bg-blue-500/20 text-blue-400" },
};

export default function ParentAttendancePage() {
  const [selectedChild, setSelectedChild] = useState("Thomas Dupont");
  const [filterStatus, setFilterStatus] = useState<"all" | "present" | "absent" | "late" | "excused">("all");
  const [searchSubject, setSearchSubject] = useState("");

  const currentAttendance = mockAttendanceData[selectedChild as keyof typeof mockAttendanceData] || [];

  let filteredAttendance = currentAttendance.filter((record) => filterStatus === "all" || record.status === filterStatus);
  filteredAttendance = filteredAttendance.filter((record) =>
    record.subject.toLowerCase().includes(searchSubject.toLowerCase())
  );

  const stats = {
    total: currentAttendance.length,
    present: currentAttendance.filter((a) => a.status === "present").length,
    absent: currentAttendance.filter((a) => a.status === "absent").length,
    late: currentAttendance.filter((a) => a.status === "late").length,
    excused: currentAttendance.filter((a) => a.status === "excused").length,
  };

  const attendanceRate = ((stats.present / stats.total) * 100).toFixed(1);
  const weeklyTrend = [
    { week: "Semaine 1", rate: 100 },
    { week: "Semaine 2", rate: 87.5 },
    { week: "Semaine 3", rate: 100 },
    { week: "Semaine 4", rate: 95 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold neon">Présences</h1>
          <p className="muted">Historique détaillé des présences</p>
        </div>
        <Button variant="primary" size="lg">
          <Download className="w-4 h-4 inline mr-2" />Exporter
        </Button>
      </div>

      {/* Child Selection */}
      <Card>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.keys(mockAttendanceData).map((child) => (
            <button
              key={child}
              onClick={() => setSelectedChild(child)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedChild === child
                  ? "bg-primary-600 text-white"
                  : "bg-dark-700 text-gray-400 hover:bg-dark-600"
              }`}
            >
              {child}
            </button>
          ))}
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card glass hover>
          <p className="text-gray-400 text-sm">Taux</p>
          <h3 className="text-3xl font-bold text-primary-400 mt-2">{attendanceRate}%</h3>
        </Card>
        <Card glass hover>
          <p className="text-gray-400 text-sm">Présents</p>
          <h3 className="text-3xl font-bold text-green-400 mt-2">{stats.present}</h3>
        </Card>
        <Card glass hover>
          <p className="text-gray-400 text-sm">Absents</p>
          <h3 className="text-3xl font-bold text-red-400 mt-2">{stats.absent}</h3>
        </Card>
        <Card glass hover>
          <p className="text-gray-400 text-sm">Retards</p>
          <h3 className="text-3xl font-bold text-yellow-400 mt-2">{stats.late}</h3>
        </Card>
        <Card glass hover>
          <p className="text-gray-400 text-sm">Justifiés</p>
          <h3 className="text-3xl font-bold text-blue-400 mt-2">{stats.excused}</h3>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Filtrer par statut</label>
            <div className="flex gap-2 flex-wrap">
              {(["all", "present", "absent", "late", "excused"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === status
                      ? "bg-primary-600 text-white"
                      : "bg-dark-700 text-gray-400 hover:bg-dark-600"
                  }`}
                >
                  {status === "all"
                    ? "Tous"
                    : status === "present"
                      ? "Présents"
                      : status === "absent"
                        ? "Absents"
                        : status === "late"
                          ? "Retards"
                          : "Justifiés"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Chercher une matière</label>
            <input
              type="text"
              placeholder="Mathématiques, Français, etc..."
              value={searchSubject}
              onChange={(e) => setSearchSubject(e.target.value)}
              className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
            />
          </div>
        </div>
      </Card>

      {/* Attendance List */}
      <Card>
        <CardHeader title="Registre de Présences" icon={<CheckSquare className="w-5 h-5" />} />
        <CardBody>
          {filteredAttendance.length > 0 ? (
            <div className="space-y-2">
              {filteredAttendance.map((record) => {
                const config = statusConfig[record.status as keyof typeof statusConfig];
                return (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="text-white font-medium">{record.subject}</p>
                      <p className="text-gray-400 text-sm">{record.teacher} • {new Date(record.date).toLocaleDateString("fr-FR")}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color} whitespace-nowrap`}>
                      {config.icon} {config.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">Aucun enregistrement trouvé</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Trend Analysis */}
      <Card>
        <CardHeader title="Tendance Hebdomadaire" icon={<TrendingUp className="w-5 h-5" />} />
        <CardBody>
          <div className="space-y-4">
            {weeklyTrend.map((item) => (
              <div key={item.week}>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium">{item.week}</span>
                  <span className={`font-bold ${item.rate >= 95 ? "text-green-400" : item.rate >= 80 ? "text-yellow-400" : "text-red-400"}`}>
                    {item.rate}%
                  </span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      item.rate >= 95 ? "bg-green-500" : item.rate >= 80 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${item.rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
