"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Coffee, Apple, Pizza } from "lucide-react";

export default function RefeicoesPage() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Refeições e Lembretes</h1>
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Refeições</CardTitle>
        </CardHeader>
        <CardContent>
          {user?.recordedMeals && user.recordedMeals.length > 0 ? (
            <ul className="space-y-2">
              {user.recordedMeals.map((mealId) => (
                <li key={mealId} className="p-3 bg-slate-50 rounded-md border text-sm text-slate-700">Refeição ID: {mealId}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 text-sm">Nenhuma refeição registrada ainda.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
