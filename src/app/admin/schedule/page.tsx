"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Calendar, FileText, Plus, Edit2, X, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const mockSchedule = [
  { day: "Lundi", time: "08:00 - 09:30", subject: "Mathématiques", teacher: "M. Dupont", room: "101", cycle: "Secondaire", class: "3ème A" },
  { day: "Lundi", time: "10:00 - 11:30", subject: "Français", teacher: "Mme Martin", room: "102", cycle: "Secondaire", class: "3ème A" },
  { day: "Mardi", time: "08:00 - 09:30", subject: "Anglais", teacher: "Mme Bernard", room: "103", cycle: "Secondaire", class: "4ème B" },
  { day: "Mardi", time: "10:00 - 11:30", subject: "Histoire", teacher: "M. Laurent", room: "104", cycle: "Secondaire", class: "4ème B" },
  { day: "Mercredi", time: "08:00 - 09:30", subject: "Physique", teacher: "M. Moreau", room: "105", cycle: "Secondaire", class: "5ème C" },
  { day: "Jeudi", time: "08:00 - 09:30", subject: "Chimie", teacher: "Mme Durand", room: "106", cycle: "Secondaire", class: "5ème C" },
  { day: "Vendredi", time: "08:00 - 09:30", subject: "SVT", teacher: "M. Blanc", room: "107", cycle: "Secondaire", class: "3ème A" },
];

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

export default function SchedulePage() {
  const [selectedCycle, setSelectedCycle] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const [scheduleList, setScheduleList] = useState(() => mockSchedule.slice());
  const cycles = [...new Set(scheduleList.map((s) => s.cycle))];
  const classes = selectedCycle
    ? [...new Set(scheduleList.filter((s) => s.cycle === selectedCycle).map((s) => s.class))]
    : [...new Set(scheduleList.map((s) => s.class))];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [form, setForm] = useState({
    day: "Lundi",
    time: "08:00 - 09:30",
    subject: "",
    teacher: "",
    room: "",
    cycle: "",
    class: "",
  });

  const filteredSchedule = scheduleList.filter((s) => {
    const cycleMatch = !selectedCycle || s.cycle === selectedCycle;
    const classMatch = !selectedClass || s.class === selectedClass;
    return cycleMatch && classMatch;
  });

  const openAdd = () => {
    setModalMode("add");
    setEditingIndex(null);
    setForm({ day: "Lundi", time: "08:00 - 09:30", subject: "", teacher: "", room: "", cycle: cycles[0] ?? "", class: classes[0] ?? "" });
    setIsModalOpen(true);
  };

  const openEdit = (index: number) => {
    const item = scheduleList[index];
    setModalMode("edit");
    setEditingIndex(index);
    setForm({ day: item.day, time: item.time, subject: item.subject, teacher: item.teacher, room: item.room, cycle: item.cycle, class: item.class });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = () => {
    if (modalMode === "add") {
      setScheduleList((prev) => [{ ...form }, ...prev]);
    } else if (modalMode === "edit" && editingIndex !== null) {
      setScheduleList((prev) => {
        const copy = prev.slice();
        copy[editingIndex] = { ...form } as any;
        return copy;
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold neon">Emploi du Temps</h1>
        <p className="muted">Gestion de l'emploi du temps</p>
      </div>

      {/* Filters (Cycle & Class) */}
      <Card>
        <div className="space-y-4 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Cycle</label>
              <select
                value={selectedCycle}
                onChange={(e) => { setSelectedCycle(e.target.value); setSelectedClass(""); }}
                className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
              >
                <option value="">Tous les cycles</option>
                {cycles.map((cycle) => (
                  <option key={cycle} value={cycle}>{cycle}</option>
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
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Horaires</h2>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="md" onClick={openAdd}><Plus className="w-4 h-4" />Ajouter</Button>
        </div>
      </div>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader title="Horaire Hebdomadaire" icon={<Calendar className="w-5 h-5" />} />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {days.map((day) => {
              const daySchedules = filteredSchedule.filter((s) => s.day === day);
              return (
                <div key={day} className="bg-dark-700 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-4 pb-2 border-b border-dark-600">{day}</h3>
                  <div className="space-y-3">
                    {daySchedules.map((schedule, idx) => (
                      <div key={idx} className="bg-dark-800 rounded p-3 text-sm">
                        <p className="text-primary-400 font-medium">{schedule.time}</p>
                        <p className="text-white font-semibold">{schedule.subject}</p>
                        <p className="text-gray-400 text-xs">{schedule.teacher}</p>
                        <p className="text-gray-500 text-xs">Salle: {schedule.room}</p>
                        <p className="text-gray-500 text-xs">{schedule.cycle} — {schedule.class}</p>
                        <div className="mt-2 flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openEdit(scheduleList.indexOf(schedule))}><Edit2 className="w-4 h-4" />Modifier</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl p-6">
            <Card>
              <div className="flex items-center justify-between p-4 border-b border-dark-700">
                <h3 className="text-lg font-semibold text-white">{modalMode === "add" ? "Ajouter un Emploi du Temps" : "Modifier l'Emploi du Temps"}</h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Jour</label>
                    <select value={form.day} onChange={(e) => setForm((f) => ({ ...f, day: e.target.value }))} className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white w-full">
                      {days.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Heure</label>
                    <input value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))} className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white w-full" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Matière</label>
                    <input value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white w-full" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Professeur</label>
                    <input value={form.teacher} onChange={(e) => setForm((f) => ({ ...f, teacher: e.target.value }))} className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white w-full" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Salle</label>
                    <input value={form.room} onChange={(e) => setForm((f) => ({ ...f, room: e.target.value }))} className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white w-full" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Cycle</label>
                    <select value={form.cycle} onChange={(e) => setForm((f) => ({ ...f, cycle: e.target.value }))} className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white w-full">
                      {cycles.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Classe</label>
                    <input value={form.class} onChange={(e) => setForm((f) => ({ ...f, class: e.target.value }))} className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white w-full" />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="secondary" size="md" onClick={closeModal}><X className="w-4 h-4" />Annuler</Button>
                  <Button variant="primary" size="md" onClick={handleSave}><Check className="w-4 h-4" />Enregistrer</Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}

      {/* Full Schedule Table */}
      <Card>
        <CardHeader title="Détail Complet" icon={<FileText className="w-5 h-5" />} />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Jour</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Heure</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Matière</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Professeur</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Salle</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedule.map((schedule, idx) => (
                  <tr key={idx} className="border-b border-dark-700 hover:bg-dark-700 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{schedule.day}</td>
                    <td className="px-4 py-3 text-gray-400">{schedule.time}</td>
                    <td className="px-4 py-3 text-white">{schedule.subject}</td>
                    <td className="px-4 py-3 text-gray-400">{schedule.teacher}</td>
                    <td className="px-4 py-3 text-primary-400 font-medium">{schedule.room}</td>
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
