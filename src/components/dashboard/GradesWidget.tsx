"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { 
  Award, 
  TrendingUp,
  TrendingDown
} from "lucide-react";

interface Grade {
  id: number;
  childName: string;
  subject: string;
  grade: number;
  coefficient: number;
  maxGrade: number;
  date: string;
  trend: "up" | "down" | "stable";
}

interface GradesWidgetProps {
  grades: Grade[];
}

export default function GradesWidget({ grades }: GradesWidgetProps) {
  const averageGrade = grades.length > 0
    ? (grades.reduce((sum, g) => sum + g.grade, 0) / grades.length)
    : 0;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getGradeColor = (grade: number, maxGrade: number = 20) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 70) return "text-blue-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getGradeBg = (grade: number, maxGrade: number = 20) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 80) return "from-green-500/10 to-green-600/5 border-green-500/20";
    if (percentage >= 70) return "from-blue-500/10 to-blue-600/5 border-blue-500/20";
    if (percentage >= 60) return "from-yellow-500/10 to-yellow-600/5 border-yellow-500/20";
    return "from-red-500/10 to-red-600/5 border-red-500/20";
  };

  return (
    <Card>
      <CardHeader 
        title="Résultats Récents" 
        icon={<Award className="w-5 h-5" />} 
      />
      <CardBody>
        {/* Average Summary */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-accent-600/20 to-primary-600/10 border border-accent-500/30 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Moyenne des derniers résultats</p>
              <p className={`text-4xl font-bold ${getGradeColor(averageGrade)}`}>
                {averageGrade.toFixed(2)}/20
              </p>
            </div>
            <Award className="w-12 h-12 text-accent-400 opacity-50" />
          </div>
        </div>

        {/* Grades List */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {grades.length > 0 ? (
            grades.map((grade) => (
              <div
                key={grade.id}
                className={`p-4 rounded-xl bg-gradient-to-br ${getGradeBg(grade.grade)} border transition-all hover:scale-102 hover:shadow-lg overflow-hidden`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{grade.subject}</h4>
                    <p className="text-gray-400 text-sm truncate">{grade.childName}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 text-center min-w-[5.5rem]">
                    {getTrendIcon(grade.trend)}
                    <span className={`text-2xl font-bold ${getGradeColor(grade.grade)}`}>
                      {grade.grade.toFixed(1)}
                    </span>
                    <span className="text-gray-500">/ {grade.maxGrade}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="truncate">Coefficient: {grade.coefficient}</span>
                  <span className="truncate">{new Date(grade.date).toLocaleDateString("fr-FR")}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">Aucune note disponible</p>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
