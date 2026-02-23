"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { useAuth } from "@/contexts/AuthContext";
import ChildCard from "@/components/dashboard/ChildCard";
import PaymentStatus from "@/components/dashboard/PaymentStatus";
import NextClass from "@/components/dashboard/NextClass";
import GradesWidget from "@/components/dashboard/GradesWidget";
import { Calendar, MessageSquare, FileText } from "lucide-react";

// Mock data for children
const mockChildren = [
  {
    id: 1,
    name: "Thomas Dupont",
    class: "3ème A",
    average: 16.5,
    presence: 98,
    absences: 0,
    lastGrades: [
      { subject: "Mathématiques", grade: 17, coefficient: 3 },
      { subject: "Français", grade: 16, coefficient: 3 },
      { subject: "Anglais", grade: 15.5, coefficient: 2 },
    ],
    paymentStatus: "paid" as const,
    paymentAmount: 0,
  },
  {
    id: 2,
    name: "Léa Dupont",
    class: "5ème B",
    average: 17,
    presence: 99,
    absences: 0,
    lastGrades: [
      { subject: "Mathématiques", grade: 18, coefficient: 3 },
      { subject: "Français", grade: 17, coefficient: 3 },
      { subject: "Anglais", grade: 16, coefficient: 2 },
    ],
    paymentStatus: "pending" as const,
    paymentAmount: 50000,
  },
];

// Mock grades data
const mockGrades = [
  {
    id: 1,
    childName: "Thomas Dupont",
    subject: "Mathématiques",
    grade: 17,
    coefficient: 3,
    maxGrade: 20,
    date: "2026-02-15",
    trend: "up" as const,
  },
  {
    id: 2,
    childName: "Thomas Dupont",
    subject: "Français",
    grade: 16,
    coefficient: 3,
    maxGrade: 20,
    date: "2026-02-14",
    trend: "stable" as const,
  },
  {
    id: 3,
    childName: "Léa Dupont",
    subject: "Sciences",
    grade: 18,
    coefficient: 3,
    maxGrade: 20,
    date: "2026-02-15",
    trend: "up" as const,
  },
  {
    id: 4,
    childName: "Léa Dupont",
    subject: "Histoire-Géo",
    grade: 17,
    coefficient: 2,
    maxGrade: 20,
    date: "2026-02-13",
    trend: "down" as const,
  },
];

// Mock payment data
const mockPayments = [
  {
    id: 1,
    childName: "Thomas Dupont",
    amount: 100000,
    dueDate: "2026-02-10",
    status: "paid" as const,
    paidDate: "2026-02-08",
  },
  {
    id: 2,
    childName: "Léa Dupont",
    amount: 100000,
    dueDate: "2026-02-20",
    status: "pending" as const,
  },
];

// Mock schedule data
const mockSchedule = [
  {
    id: 1,
    childName: "Thomas Dupont",
    subject: "Mathématiques",
    startTime: "08:00",
    endTime: "09:00",
    classroom: "306",
    teacher: "M. Diallo",
    status: "upcoming" as const,
  },
  {
    id: 2,
    childName: "Thomas Dupont",
    subject: "Français",
    startTime: "09:15",
    endTime: "10:15",
    classroom: "308",
    teacher: "Mme Sall",
    status: "upcoming" as const,
  },
  {
    id: 3,
    childName: "Léa Dupont",
    subject: "Sciences",
    startTime: "10:30",
    endTime: "11:30",
    classroom: "Lab",
    teacher: "M. Ba",
    status: "upcoming" as const,
  },
];

// Mock upcoming events
const mockUpcomingEvents = [
  {
    id: 1,
    title: "Réunion Parents-Profs",
    date: "2026-02-20",
    time: "17:00",
  },
  {
    id: 2,
    title: "Remise de Bulletins",
    date: "2026-02-27",
    time: "14:00",
  },
  {
    id: 3,
    title: "Sortie Pédagogique",
    date: "2026-03-05",
    time: "08:00",
  },
];

export default function ParentDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold neon mb-2 animate-slide-in">
          Bienvenue {user?.name}! 👋
        </h1>
        <p className="muted text-lg">
          Suivez la scolarité de vos enfants en temps réel
        </p>
      </div>

      {/* Children Cards - Visual Cards */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-8 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></span>
          Vos enfants
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockChildren.map((child, idx) => (
            <div key={child.id} style={{ animationDelay: `${idx * 100}ms` }} className="animate-slide-up">
              <ChildCard {...child} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Widgets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Next Class Today */}
          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <NextClass schedules={mockSchedule} />
          </div>

          {/* Recent Grades */}
          <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
            <GradesWidget grades={mockGrades} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Payment Status */}
          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <PaymentStatus payments={mockPayments} />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-4 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <Card glass hover className="transition-all duration-500 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Messages Non Lus</p>
                  <h3 className="text-3xl font-bold text-blue-400 mt-2">3</h3>
                  <p className="text-blue-500 text-xs mt-1">De l'école</p>
                </div>
                <MessageSquare className="w-10 h-10 text-blue-400/30" />
              </div>
            </Card>
            <Card glass hover className="transition-all duration-500 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Documents Récents</p>
                  <h3 className="text-3xl font-bold text-green-400 mt-2">5</h3>
                  <p className="text-green-500 text-xs mt-1">À consulter</p>
                </div>
                <FileText className="w-10 h-10 text-green-400/30" />
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="animate-slide-up" style={{ animationDelay: "400ms" }}>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-8 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></span>
          Événements à Venir
        </h2>
        <Card>
          <CardHeader title="Agenda Scolaire" icon={<Calendar className="w-5 h-5" />} />
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockUpcomingEvents.map((event, idx) => (
                <div
                  key={event.id}
                  className="p-4 rounded-xl bg-gradient-to-br from-primary-600/10 to-accent-600/10 border border-primary-500/20 hover:border-primary-500/50 transition-all hover:scale-105 hover:shadow-lg cursor-pointer group"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
                        {event.title}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-400 mt-3 pt-3 border-t border-dark-700/50">
                      <p>{new Date(event.date).toLocaleDateString("fr-FR", { 
                        weekday: "long",
                        day: "numeric",
                        month: "long"
                      })}</p>
                      <p className="text-primary-400 font-semibold">{event.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
