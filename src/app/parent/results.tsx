"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Award, BarChart2, TrendingUp, Download, Filter } from "lucide-react";

const mockResultsData = {
  "Thomas Dupont": [
    { id: 1, subject: "Mathématiques", mark: 18.5, coefficient: 3, period: "Trimestre 1", remark: "Excellent" },
    { id: 2, subject: "Français", mark: 17, coefficient: 3, period: "Trimestre 1", remark: "Très bien" },
    { id: 3, subject: "Physique", mark: 15.5, coefficient: 2, period: "Trimestre 1", remark: "Bien" },
    { id: 4, subject: "Anglais", mark: 19, coefficient: 2, period: "Trimestre 1", remark: "Excellent" },
    { id: 5, subject: "Histoire-Géo", mark: 16, coefficient: 2, period: "Trimestre 1", remark: "Très bien" },
    { id: 6, subject: "SVT", mark: 17.5, coefficient: 2, period: "Trimestre 1", remark: "Très bien" },
    { id: 7, subject: "EPS", mark: 18, coefficient: 1, period: "Trimestre 1", remark: "Excellent" },
  ],
  "Léa Dupont": [
    { id: 8, subject: "Mathématiques", mark: 19, coefficient: 3, period: "Trimestre 1", remark: "Excellent" },
    { id: 9, subject: "Français", mark: 18.5, coefficient: 3, period: "Trimestre 1", remark: "Excellent" },
    { id: 10, subject: "Anglais", mark: 19.5, coefficient: 2, period: "Trimestre 1", remark: "Excellent" },
    { id: 11, subject: "Physique", mark: 17, coefficient: 2, period: "Trimestre 1", remark: "Très bien" },
    { id: 12, subject: "SVT", mark: 18, coefficient: 2, period: "Trimestre 1", remark: "Excellent" },
  ],
};

const periods = ["Trimestre 1", "Trimestre 2", "Trimestre 3"];

export default function ParentResultsPage() {
  const [selectedChild, setSelectedChild] = useState("Thomas Dupont");
  const [selectedPeriod, setSelectedPeriod] = useState("Trimestre 1");

  const currentResults = mockResultsData[selectedChild as keyof typeof mockResultsData] || [];
  const filteredResults = currentResults.filter(r => r.period === selectedPeriod);

  const avgMark = filteredResults.length > 0 
    ? (filteredResults.reduce((sum, r) => sum + r.mark * r.coefficient, 0) /
       filteredResults.reduce((sum, r) => sum + r.coefficient, 0)).toFixed(2)
    : "0";

  const getMarkColor = (mark: number) => {
    if (mark >= 18) return "text-green-400 bg-green-500/10";
    if (mark >= 15) return "text-blue-400 bg-blue-500/10";
    if (mark >= 12) return "text-yellow-400 bg-yellow-500/10";
    return "text-red-400 bg-red-500/10";
  };

  const getRemarkColor = (remark: string) => {
    if (remark === "Excellent") return "text-green-400";
    if (remark === "Très bien") return "text-blue-400";
    if (remark === "Bien") return "text-yellow-400";
    return "text-orange-400";
  };

  const subjectStats = filteredResults.map(r => ({
    subject: r.subject,
    mark: r.mark,
    trend: Math.random() > 0.5 ? "↑" : "↓"
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold neon">Résultats Scolaires</h1>
          <p className="muted">Suivi complet des résultats académiques</p>
        </div>
        <Button variant="primary" size="lg">
          <Download className="w-4 h-4 inline mr-2" />Télécharger
        </Button>
      </div>

      {/* Child Selection */}
      <Card>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.keys(mockResultsData).map((child) => (
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

      {/* Period Selector */}
      <Card>
        <div className="flex gap-2">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPeriod === period
                  ? "bg-primary-600 text-white"
                  : "bg-dark-700 text-gray-400 hover:bg-dark-600"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </Card>

      {/* Average Mark */}
      <Card>
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-2">Moyenne Générale</p>
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
            {avgMark}/20
          </h2>
          <p className={`mt-4 ${parseFloat(avgMark) >= 15 ? "text-green-400" : "text-yellow-400"}`}>
            <Award className="w-5 h-5 inline mr-2" />
            {parseFloat(avgMark) >= 18 ? "Excellent résultat!" : parseFloat(avgMark) >= 15 ? "Très bien!" : "À améliorer"}
          </p>
        </div>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader title="Détails des Notes" icon={<BarChart2 className="w-5 h-5" />} />
        <CardBody>
          {filteredResults.length > 0 ? (
            <div className="space-y-3">
              {filteredResults.map((result) => (
                <div key={result.id} className="p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white truncate">{result.subject}</h3>
                      <p className="text-gray-400 text-sm truncate">Coefficient: {result.coefficient}</p>
                    </div>
                    <div className={`text-3xl font-bold px-4 py-3 rounded-lg ${getMarkColor(result.mark)} flex-shrink-0 text-center min-w-[5.5rem]`}> 
                      {result.mark}/20
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm gap-4">
                    <span className={`font-medium ${getRemarkColor(result.remark)} truncate max-w-[60%]`}>{result.remark}</span>
                    <span className="text-gray-400 truncate">Tendance: <span className="text-primary-400">{subjectStats.find(s => s.subject === result.subject)?.trend}</span></span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">Aucun résultat pour cette période</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Grade Legend */}
      <Card>
        <CardHeader title="Légende des Appréciations" icon={<Filter className="w-5 h-5" />} />
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-dark-700 rounded-lg">
              <div className="text-green-400 font-bold mb-1">18-20</div>
              <p className="text-gray-400">Excellent</p>
            </div>
            <div className="p-3 bg-dark-700 rounded-lg">
              <div className="text-blue-400 font-bold mb-1">15-17</div>
              <p className="text-gray-400">Très Bien</p>
            </div>
            <div className="p-3 bg-dark-700 rounded-lg">
              <div className="text-yellow-400 font-bold mb-1">12-14</div>
              <p className="text-gray-400">Bien</p>
            </div>
            <div className="p-3 bg-dark-700 rounded-lg">
              <div className="text-orange-400 font-bold mb-1">0-11</div>
              <p className="text-gray-400">Insuffisant</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Performance Trend */}
      <Card>
        <CardHeader title="Évolution des Notes" icon={<TrendingUp className="w-5 h-5" />} />
        <CardBody>
          <div className="space-y-4">
            {subjectStats.slice(0, 5).map((subject) => (
              <div key={subject.subject}>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium">{subject.subject}</span>
                  <span className={`font-bold ${getMarkColor(subject.mark)}`}>{subject.mark}/20</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      subject.mark >= 18 ? "bg-green-500" : subject.mark >= 15 ? "bg-blue-500" : "bg-yellow-500"
                    }`}
                    style={{ width: `${(subject.mark / 20) * 100}%` }}
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
