"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

const mockSchedule = [
  {
    id: 1,
    day: "Lundi",
    subject: "Mathématiques",
    teacher: "Mr Dubois",
    start_time: "08:00",
    end_time: "09:30",
    room: "107",
    class: "3ème A",
    cycle: "Secondaire",
  },
  {
    id: 2,
    day: "Lundi",
    subject: "Français",
    teacher: "Mme Leclerc",
    start_time: "09:45",
    end_time: "11:15",
    room: "108",
    class: "3ème A",
    cycle: "Secondaire",
  },
  {
    id: 3,
    day: "Lundi",
    subject: "Physique",
    teacher: "Mr Martin",
    start_time: "11:30",
    end_time: "13:00",
    room: "Lab1",
    class: "4ème B",
    cycle: "Secondaire",
  },
  {
    id: 4,
    day: "Mardi",
    subject: "Anglais",
    teacher: "Mme Francoise",
    start_time: "08:00",
    end_time: "09:30",
    room: "109",
    class: "5ème C",
    cycle: "Secondaire",
  },
  {
    id: 5,
    day: "Mardi",
    subject: "Histoire-Géo",
    teacher: "Mr Laurent",
    start_time: "14:00",
    end_time: "15:30",
    room: "110",
    class: "3ème A",
    cycle: "Secondaire",
  },
];

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Lundi");
  const [selectedCycle, setSelectedCycle] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const cycles = [...new Set(mockSchedule.map((s) => s.cycle))];
  const classes = selectedCycle
    ? [...new Set(mockSchedule.filter((s) => s.cycle === selectedCycle).map((s) => s.class))]
    : [...new Set(mockSchedule.map((s) => s.class))];

  const filteredSchedule = mockSchedule.filter((event) => {
    const dayMatch = event.day === selectedDay;
    const cycleMatch = !selectedCycle || event.cycle === selectedCycle;
    const classMatch = !selectedClass || event.class === selectedClass;
    return dayMatch && cycleMatch && classMatch;
  });

  const sortedSchedule = [...filteredSchedule].sort((a, b) => {
    const column = sortColumn || "start_time";
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Emploi du Temps</h1>
          <p className="text-gray-400">Gestion de l'emploi du temps</p>
        </div>
        <Button variant="primary" size="lg">
          <Plus className="w-4 h-4 inline mr-2" />Ajouter Cours
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Jour</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
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

      {/* Schedule Grid */}
      <div className="space-y-4">
        {sortedSchedule.length > 0 ? (
          sortedSchedule.map((event) => (
            <Card key={event.id} hover>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{event.subject}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Professeur</p>
                      <p className="text-white font-medium">{event.teacher}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Horaire</p>
                      <p className="text-white font-medium">
                        {event.start_time} - {event.end_time}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Cycle</p>
                      <p className="text-white font-medium">{event.cycle}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Classe</p>
                      <p className="text-white font-medium">{event.class}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
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
    </div>
  );
}
