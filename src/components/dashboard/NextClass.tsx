"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { 
  Clock, 
  MapPin, 
  User,
  ChevronRight
} from "lucide-react";

interface ScheduleItem {
  id: number;
  childName: string;
  subject: string;
  startTime: string;
  endTime: string;
  classroom: string;
  teacher: string;
  status: "upcoming" | "ongoing" | "completed";
}

interface NextClassProps {
  schedules: ScheduleItem[];
}

export default function NextClass({ schedules }: NextClassProps) {
  // Get the next upcoming class
  const nextClass = schedules.find(s => s.status === "upcoming") || schedules[0];
  
  // Get other upcoming classes
  const otherClasses = schedules.filter(s => s.id !== nextClass?.id).slice(0, 2);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "text-amber-400";
      case "ongoing":
        return "text-green-400";
      case "completed":
        return "text-gray-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "upcoming":
        return "À venir";
      case "ongoing":
        return "En cours";
      case "completed":
        return "Terminé";
      default:
        return "";
    }
  };

  const parseTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return { hours, minutes };
  };

  const getTimeUntil = (startTime: string) => {
    const now = new Date();
    const [hours, minutes] = startTime.split(":").map(Number);
    const classTime = new Date();
    classTime.setHours(hours, minutes, 0);

    const diff = classTime.getTime() - now.getTime();
    const diffMinutes = Math.floor(diff / 60000);

    if (diffMinutes < 0) return "Terminé";
    if (diffMinutes === 0) return "Maintenant";
    if (diffMinutes < 60) return `${diffMinutes}m`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours}h ${diffMinutes % 60}m`;
  };

  if (!nextClass) {
    return (
      <Card>
        <CardHeader 
          title="Emploi du Temps" 
          icon={<Clock className="w-5 h-5" />} 
        />
        <CardBody>
          <p className="text-gray-400 text-center py-8">Aucun cours aujourd'hui</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader 
        title="Prochain Cours Aujourd'hui" 
        icon={<Clock className="w-5 h-5" />} 
      />
      <CardBody>
        {/* Main Upcoming Class */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-600/20 via-primary-600/10 to-accent-600/10 border border-primary-500/30 mb-6 animate-slide-up">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold text-white mb-1 truncate">{nextClass.subject}</h3>
              <p className="text-gray-300 truncate">{nextClass.childName}</p>
            </div>
            <div className={`text-center flex-shrink-0 ml-4`}>
              <p className={`text-sm font-bold ${getStatusColor(nextClass.status)}`}>
                {getStatusLabel(nextClass.status)}
              </p>
              <p className="text-2xl font-bold text-primary-400 mt-1">
                {getTimeUntil(nextClass.startTime)}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-primary-500/20">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span className="text-gray-300 truncate">
                {nextClass.startTime} - {nextClass.endTime}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-gray-300 truncate">Salle {nextClass.classroom}</span>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <span className="text-gray-300 truncate">{nextClass.teacher}</span>
            </div>
          </div>
        </div>

        {/* Other Classes Today */}
        {otherClasses.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-3">Plus tard aujourd'hui</h4>
            <div className="space-y-2">
              {otherClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="p-4 rounded-xl bg-dark-700/50 border border-dark-600 hover:bg-dark-700 transition-all hover:scale-102 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium group-hover:text-primary-400 transition-colors truncate">
                            {cls.subject}
                          </p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                            <span className="truncate">{cls.startTime}</span>
                            <span className="truncate">Salle {cls.classroom}</span>
                          </div>
                        </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
