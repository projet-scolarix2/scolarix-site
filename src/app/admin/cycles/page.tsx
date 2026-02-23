"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

const initialCycles = [
  { id: 1, name: "Maternelle", classes: ["PS", "MS", "GS"] },
  { id: 2, name: "Primaire", classes: ["CP", "CE1", "CE2", "CM1", "CM2"] },
  { id: 3, name: "Secondaire", classes: ["6ème", "5ème", "4ème", "3ème", "2nde"] },
];

export default function CyclesPage() {
  const [cycles, setCycles] = useState(initialCycles);

  const addCycle = () => {
    const newId = cycles.length ? Math.max(...cycles.map((c) => c.id)) + 1 : 1;
    setCycles([...cycles, { id: newId, name: `Nouveau Cycle ${newId}`, classes: [] }]);
  };

  const removeClass = (cycleId: number, cls: string) => {
    setCycles(cycles.map((c) => c.id === cycleId ? { ...c, classes: c.classes.filter((x) => x !== cls) } : c));
  };

  const removeCycle = (id: number) => {
    setCycles(cycles.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Cycles & Classes</h1>
          <p className="text-gray-400">Gérez les cycles et leurs classes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md" onClick={addCycle}><Plus className="w-4 h-4 inline mr-2"/>Ajouter Cycle</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cycles.map((cycle) => (
          <Card key={cycle.id} hover glass>
            <CardHeader title={cycle.name} />
            <CardBody>
              <div className="space-y-3">
                {cycle.classes.length === 0 ? (
                  <p className="text-gray-400">Aucune classe définie</p>
                ) : (
                  <ul className="space-y-2">
                    {cycle.classes.map((cls) => (
                      <li key={cls} className="flex items-center justify-between p-2 bg-dark-800 rounded-md">
                        <span className="text-white">{cls}</span>
                        <div className="space-x-2">
                          <Button variant="ghost" size="sm"><Edit2 className="w-4 h-4"/></Button>
                          <Button variant="ghost" size="sm" className="text-red-400" onClick={() => removeClass(cycle.id, cls)}><Trash2 className="w-4 h-4"/></Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm">+ Ajouter Classe</Button>
                  <Button variant="danger" size="sm" onClick={() => removeCycle(cycle.id)}>Supprimer Cycle</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
