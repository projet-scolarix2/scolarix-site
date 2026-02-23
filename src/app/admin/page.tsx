"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  RadarChart,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  Users,
  CheckSquare,
  CreditCard,
  MessageSquare,
  BarChart2,
  Zap,
  Upload,
  Mail,
  Settings,
  Bell,
  TrendingUp,
  Clock,
  AlertCircle,
  ChevronDown,
  DollarSign,
  Filter,
} from "lucide-react";

// Mock data
const dashboardStats = [
  {
    title: "Total Étudiants",
    value: "1,245",
    icon: <Users className="w-8 h-8 text-white" />,
    trend: "+5%",
    color: "from-blue-600",
  },
  {
    title: "Présences du Jour",
    value: "98.5%",
    icon: <CheckSquare className="w-8 h-8 text-white" />,
    trend: "+2%",
    color: "from-green-600",
  },
  {
    title: "Paiements en Attente",
    value: "35",
    icon: <CreditCard className="w-8 h-8 text-white" />,
    trend: "-10%",
    color: "from-yellow-600",
  },
  {
    title: "Messages Non Lus",
    value: "12",
    icon: <MessageSquare className="w-8 h-8 text-white" />,
    trend: "+3",
    color: "from-purple-600",
  },
];

// Evolution des notes
const performanceData = [
  { name: "Janvier", avg_mark: 82, target: 85 },
  { name: "Février", avg_mark: 85, target: 85 },
  { name: "Mars", avg_mark: 83, target: 85 },
  { name: "Avril", avg_mark: 88, target: 85 },
  { name: "Mai", avg_mark: 90, target: 85 },
  { name: "Juin", avg_mark: 87, target: 85 },
];

// Résultats par classe
const classPerformanceData = [
  { subject: "Mathématiques", "3ème A": 88, "3ème B": 85, "3ème C": 90, "4ème A": 83, "4ème B": 86 },
  { subject: "Français", "3ème A": 85, "3ème B": 82, "3ème C": 88, "4ème A": 80, "4ème B": 83 },
  { subject: "Sciences", "3ème A": 90, "3ème B": 88, "3ème C": 92, "4ème A": 85, "4ème B": 87 },
  { subject: "Anglais", "3ème A": 82, "3ème B": 80, "3ème C": 86, "4ème A": 78, "4ème B": 81 },
  { subject: "Histoire", "3ème A": 87, "3ème B": 84, "3ème C": 89, "4ème A": 82, "4ème B": 85 },
];

// Calendrier scolaire
const schoolCalendar = [
  { id: 1, event: "Rentrée Scolaire", date: "2026-02-20", type: "event", color: "bg-blue-500/20 border-blue-500" },
  { id: 2, event: "Fin Trimestre 2", date: "2026-03-15", type: "deadline", color: "bg-red-500/20 border-red-500" },
  { id: 3, event: "Vacances de Printemps", date: "2026-04-10", type: "holiday", color: "bg-green-500/20 border-green-500" },
  { id: 4, event: "Réunion Parents-Profs", date: "2026-04-25", type: "event", color: "bg-yellow-500/20 border-yellow-500" },
];

// Étudiants
const studentsData = [
  { id: 1, name: "Jean Dupont", class: "3ème A", average: 18.5, attendance: 98, status: "excellent" },
  { id: 2, name: "Marie Martin", class: "3ème A", average: 17.0, attendance: 96, status: "bon" },
  { id: 3, name: "Pierre Durand", class: "3ème B", average: 14.5, attendance: 92, status: "moyen", alert: "retard" },
  { id: 4, name: "Sophie Bernard", class: "3ème B", average: 16.2, attendance: 94, status: "bon" },
  { id: 5, name: "Luc François", class: "4ème A", average: 12.3, attendance: 88, status: "insuffisant", alert: "risque" },
  { id: 6, name: "Emma Leclerc", class: "4ème A", average: 19.0, attendance: 99, status: "excellent" },
];

// Alertes retards
const lateAlerts = [
  { id: 1, student: "Pierre Durand", reason: "Retard paiement scolarité", daysLate: 5, amount: "2500 FCFA" },
  { id: 2, student: "Luc François", reason: "Baisse de performance", daysLate: 3, metric: "-15% notes" },
  { id: 3, student: "Paul Sanogo", reason: "Absences répétées", daysLate: 7, metric: "85% présence" },
];

export default function AdminDashboard() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchStudent, setSearchStudent] = useState("");

  // Filtrer les étudiants
  const filteredStudents = useMemo(() => {
    return studentsData.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(searchStudent.toLowerCase());
      const matchesFilter =
        selectedFilter === "all" ||
        student.status === selectedFilter ||
        (selectedFilter === "alerts" && student.alert);
      return matchesSearch && matchesFilter;
    });
  }, [searchStudent, selectedFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold neon mb-2">Tableau de Bord</h1>
        <p className="text-gray-400">Vue d'ensemble complète de votre école - {new Date().toLocaleDateString("fr-FR")}</p>
      </div>

      {/* Widgets Animés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="animate-fade-in">
            <Card hover glass className="relative overflow-hidden group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-white mt-2">{stat.value}</h3>
                  <p className={`text-sm mt-2 ${stat.trend.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                    {stat.trend} ce mois
                  </p>
                </div>
                <div className="text-5xl opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  {stat.icon}
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} to-transparent`}></div>
            </Card>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evolution des Notes */}
        <div className="lg:col-span-2 animate-fade-in">
          <Card>
            <CardHeader title="Évolution Mensuelle des Notes" icon={<TrendingUp className="w-5 h-5" />} />
            <CardBody>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorMark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #4b5563",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="avg_mark"
                    stroke="#0ea5e9"
                    strokeWidth={3}
                    dot={{ fill: "#0ea5e9", r: 6 }}
                    activeDot={{ r: 8 }}
                    fillOpacity={1}
                    fill="url(#colorMark)"
                    name="Moyenne Réelle"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#6b7280"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Objectif"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>

        {/* Actions Rapides */}
        <div className="animate-fade-in">
          <Card>
            <CardHeader title="Actions Rapides" icon={<Zap className="w-5 h-5" />} />
            <CardBody>
              <div className="space-y-3">
                <Button className="w-full" variant="primary" size="md">
                  + Ajouter Étudiant
                </Button>
                <Button className="w-full" variant="secondary" size="md">
                  <Upload className="w-4 h-4 inline mr-2" />
                  Exporter Résultats
                </Button>
                <Button className="w-full" variant="secondary" size="md">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Envoyer Message
                </Button>
                <Button className="w-full" variant="ghost" size="md">
                  <Settings className="w-4 h-4 inline mr-2" />
                  Paramètres
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Radar Chart - Résultats par Classe */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="animate-fade-in">
          <Card>
            <CardHeader title="Performance par Classe" icon={<BarChart2 className="w-5 h-5" />} />
            <CardBody>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={classPerformanceData}>
                  <PolarGrid stroke="#4b5563" />
                  <PolarAngleAxis dataKey="subject" stroke="#9ca3af" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" />
                  <Radar
                    name="3ème A"
                    dataKey="3ème A"
                    stroke="#0ea5e9"
                    fill="#0ea5e9"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="3ème C"
                    dataKey="3ème C"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.4}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #4b5563",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>

        {/* Calendrier Scolaire */}
        <div className="animate-fade-in">
          <Card>
            <CardHeader title="Calendrier Scolaire" icon={<Clock className="w-5 h-5" />} />
            <CardBody>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {schoolCalendar.map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-lg ${event.color}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white font-semibold">{event.event}</p>
                        <p className="text-gray-400 text-sm mt-1">
                          {new Date(event.date).toLocaleDateString("fr-FR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <span className="text-xs font-bold uppercase px-2 py-1 rounded bg-white/10 text-white">
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Alertes Retards */}
      <div className="animate-fade-in">
        <Card>
          <CardHeader title="Alertes Retards & Risques" icon={<AlertCircle className="w-5 h-5 text-red-500" />} />
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lateAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold text-sm">{alert.student}</h4>
                      <p className="text-gray-300 text-xs mt-1">{alert.reason}</p>
                      <div className="flex items-center gap-2 mt-2 text-red-400 text-sm font-medium">
                        <DollarSign className="w-3 h-3" />
                        {alert.amount || alert.metric}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Tableau Étudiants avec Filtres */}
      <div className="animate-fade-in">
        <Card>
          <CardHeader title="Liste Étudiants" icon={<Users className="w-5 h-5" />} />
          <CardBody>
            {/* Filtres */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Rechercher un étudiant..."
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                />
                <div className="relative">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors text-white"
                  >
                    <Filter className="w-4 h-4" />
                    Filtrer
                    <ChevronDown className={`w-4 h-4 transition-transform ${filterOpen ? "rotate-180" : ""}`} />
                  </button>

                  {filterOpen && (
                    <div className="absolute right-0 top-full mt-2 bg-dark-700 rounded-lg shadow-lg border border-dark-600 z-10 min-w-48">
                      {["all", "excellent", "bon", "moyen", "insuffisant", "alerts"].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => {
                            setSelectedFilter(filter);
                            setFilterOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 transition-colors ${
                            selectedFilter === filter ? "bg-primary-500/20 text-primary-400" : "text-gray-300 hover:bg-dark-600"
                          }`}
                        >
                          {filter === "all" ? "Tous" : filter === "alerts" ? "Avec Alertes" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-700 text-left text-sm text-gray-400">
                    <th className="px-4 py-3 font-semibold">Nom</th>
                    <th className="px-4 py-3 font-semibold">Classe</th>
                    <th className="px-4 py-3 font-semibold text-center">Moyenne</th>
                    <th className="px-4 py-3 font-semibold text-center">Présence</th>
                    <th className="px-4 py-3 font-semibold">Statut</th>
                    <th className="px-4 py-3 font-semibold">Alertes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-dark-700 hover:bg-dark-700/50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <span className="text-white font-medium">{student.name}</span>
                      </td>
                      <td className="px-4 py-4 text-gray-400">{student.class}</td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center">
                          <span className={`font-bold ${
                            student.average >= 18 ? "text-green-400" : 
                            student.average >= 15 ? "text-yellow-400" : 
                            "text-red-400"
                          }`}>
                            {student.average}/20
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center">
                          <div className="w-16 bg-dark-600 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                              style={{ width: `${student.attendance}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            student.status === "excellent"
                              ? "bg-green-500/20 text-green-400"
                              : student.status === "bon"
                              ? "bg-blue-500/20 text-blue-400"
                              : student.status === "moyen"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {student.alert ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-400 animate-pulse">
                            <AlertCircle className="w-3 h-3" />
                            {student.alert}
                          </span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-sm text-gray-400">
              Affichage de {filteredStudents.length} sur {studentsData.length} étudiants
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
