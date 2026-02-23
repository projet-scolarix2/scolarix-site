"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Book, Calendar, Clock, MapPin, User, Download, Bell } from "lucide-react";

const mockScheduleData = {
  "Thomas Dupont": [
    { id: 1, day: "Lundi", subject: "Mathématiques", teacher: "Mr Dubois", start_time: "08:00", end_time: "09:30", room: "107", teacher_email: "dubois@ecole.com" },
    { id: 2, day: "Lundi", subject: "Français", teacher: "Mme Leclerc", start_time: "09:45", end_time: "11:15", room: "108", teacher_email: "leclerc@ecole.com" },
    { id: 3, day: "Lundi", subject: "Physique", teacher: "Mr Martin", start_time: "14:00", end_time: "15:30", room: "Lab1", teacher_email: "martin@ecole.com" },
    { id: 4, day: "Mardi", subject: "Anglais", teacher: "Mme Francoise", start_time: "08:00", end_time: "09:30", room: "109", teacher_email: "francoise@ecole.com" },
    { id: 5, day: "Mardi", subject: "Histoire-Géo", teacher: "Mr Laurent", start_time: "10:00", end_time: "11:30", room: "110", teacher_email: "laurent@ecole.com" },
    { id: 6, day: "Mardi", subject: "SVT", teacher: "Mme Martin", start_time: "14:00", end_time: "15:30", room: "Lab2", teacher_email: "martin.sv@ecole.com" },
    { id: 7, day: "Mercredi", subject: "EPS", teacher: "Mr Dubois", start_time: "08:00", end_time: "09:30", room: "Terrain", teacher_email: "dubois@ecole.com" },
    { id: 8, day: "Mercredi", subject: "Technologie", teacher: "Mr Leclerc", start_time: "14:00", end_time: "15:30", room: "Atelier", teacher_email: "leclerc.tech@ecole.com" },
    { id: 9, day: "Jeudi", subject: "Mathématiques", teacher: "Mr Dubois", start_time: "08:00", end_time: "09:30", room: "107", teacher_email: "dubois@ecole.com" },
    { id: 10, day: "Jeudi", subject: "Français", teacher: "Mme Leclerc", start_time: "10:00", end_time: "11:30", room: "108", teacher_email: "leclerc@ecole.com" },
    { id: 11, day: "Vendredi", subject: "Anglais", teacher: "Mme Francoise", start_time: "08:00", end_time: "09:30", room: "109", teacher_email: "francoise@ecole.com" },
    { id: 12, day: "Vendredi", subject: "Histoire", teacher: "Mr Laurent", start_time: "14:00", end_time: "15:30", room: "110", teacher_email: "laurent@ecole.com" },
  ],
  "Léa Dupont": [
    { id: 13, day: "Lundi", subject: "Mathématiques", teacher: "Mme Leclerc", start_time: "08:00", end_time: "09:30", room: "205", teacher_email: "leclerc@ecole.com" },
    { id: 14, day: "Lundi", subject: "Français", teacher: "Mr Laurent", start_time: "10:00", end_time: "11:30", room: "206", teacher_email: "laurent@ecole.com" },
    { id: 15, day: "Mardi", subject: "Anglais", teacher: "Mme Francoise", start_time: "08:00", end_time: "09:30", room: "207", teacher_email: "francoise@ecole.com" },
    { id: 16, day: "Mardi", subject: "SVT", teacher: "Mme Martin", start_time: "14:00", end_time: "15:30", room: "Lab2", teacher_email: "martin.sv@ecole.com" },
    { id: 17, day: "Mercredi", subject: "EPS", teacher: "Mr Dubois", start_time: "08:00", end_time: "09:30", room: "Terrain", teacher_email: "dubois@ecole.com" },
    { id: 18, day: "Jeudi", subject: "Histoire-Géo", teacher: "Mr Laurent", start_time: "08:00", end_time: "09:30", room: "210", teacher_email: "laurent@ecole.com" },
  ],
};

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

export default function ParentSchedulePage() {
  const [selectedChild, setSelectedChild] = useState("Thomas Dupont");
  const [selectedDay, setSelectedDay] = useState("Lundi");
  const [expanded, setExpanded] = useState<number | null>(null);

  const currentSchedule = mockScheduleData[selectedChild as keyof typeof mockScheduleData] || [];
  const daySchedule = currentSchedule.filter((event) => event.day === selectedDay);
  const classStartTime = daySchedule.length > 0 ? daySchedule[0].start_time : "N/A";
  const classEndTime = daySchedule.length > 0 ? daySchedule[daySchedule.length - 1].end_time : "N/A";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold neon">Emploi du Temps</h1>
          <p className="muted">Emploi du temps complet et détaillé</p>
        </div>
        <Button variant="primary" size="lg">
          <Download className="w-4 h-4 inline mr-2" />Télécharger
        </Button>
      </div>

      {/* Child Selection */}
      <Card>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.keys(mockScheduleData).map((child) => (
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

      {/* Day Selector */}
      <Card>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedDay === day
                  ? "bg-primary-600 text-white"
                  : "bg-dark-700 text-gray-400 hover:bg-dark-600"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </Card>

      {/* Daily Summary */}
      {daySchedule.length > 0 && (
        <Card glass hover>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-400 text-sm">Heure de Début</p>
              <p className="text-2xl font-bold text-primary-400">{classStartTime}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Nombre de Cours</p>
              <p className="text-2xl font-bold text-blue-400">{daySchedule.length}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Fin de Journée</p>
              <p className="text-2xl font-bold text-green-400">{classEndTime}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Schedule for Selected Day */}
      <div className="space-y-4">
        {daySchedule.length > 0 ? (
          daySchedule.map((event) => (
            <Card key={event.id} hover glass>
              <button
                onClick={() => setExpanded(expanded === event.id ? null : event.id)}
                className="w-full text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary-400">{event.subject}</h3>
                    <div className="flex items-center gap-4 mt-3 text-gray-400">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {event.start_time} - {event.end_time}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Salle {event.room}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Professeur</p>
                    <p className="font-medium text-white">{event.teacher}</p>
                  </div>
                </div>
              </button>

              {expanded === event.id && (
                <div className="mt-4 pt-4 border-t border-dark-700">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 mb-1">Durée</p>
                      <p className="text-white font-medium">1h30</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Salle</p>
                      <p className="text-white font-medium">{event.room}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-400 mb-1">Contacter le professeur</p>
                      <a href={`mailto:${event.teacher_email}`} className="text-primary-400 hover:text-primary-300 font-medium">
                        {event.teacher_email}
                      </a>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="w-full mt-3">
                    <Bell className="w-4 h-4 inline mr-2" />Recevoir une notification
                  </Button>
                </div>
              )}
            </Card>
          ))
        ) : (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Aucun cours prévu pour ce jour</p>
            </div>
          </Card>
        )}
      </div>

      {/* Weekly View */}
      <Card>
        <CardHeader title="Vue Hebdomadaire" icon={<Calendar className="w-5 h-5" />} />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="px-4 py-2 text-left text-gray-300">Jour</th>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <th key={i} className="px-4 py-2 text-left text-gray-300">Cours {i + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => {
                  const dayCourses = currentSchedule.filter((e) => e.day === day);
                  return (
                    <tr key={day} className="border-b border-dark-700 hover:bg-dark-700/50">
                      <td className="px-4 py-3 font-medium text-white">{day}</td>
                      {[0, 1, 2, 3, 4].map((slot) => (
                        <td key={slot} className="px-4 py-3 text-gray-400 text-xs">
                          {dayCourses[slot] ? (
                            <div className="bg-dark-700 rounded p-2">
                              <p className="font-medium text-white">{dayCourses[slot].subject}</p>
                              <p className="text-xs text-gray-400">{dayCourses[slot].start_time}</p>
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                      ))}
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
