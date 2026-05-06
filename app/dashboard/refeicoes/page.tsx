"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const MEALS = [
  { id: "breakfast", label: "Café da Manhã", time: "08:00", description: "Ovos mexidos com mamão e aveia." },
  { id: "snack1", label: "Lanche da Manhã", time: "10:30", description: "Fruta (Maçã ou Pera)" },
  { id: "lunch", label: "Almoço", time: "13:00", description: "Arroz integral, feijão, frango grelhado e salada." },
  { id: "snack2", label: "Lanche da Tarde", time: "16:00", description: "Iogurte natural com castanhas." },
  { id: "dinner", label: "Jantar", time: "19:30", description: "Sopa de legumes com carne magra." }
];

export default function MealsPage() {
  const { user, toggleMeal } = useAuth();
  const { t } = useLanguage();

  const recordedMeals = user?.recordedMeals || [];
  const progress = Math.round((recordedMeals.length / MEALS.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
          <Utensils className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Refeições Registradas</h1>
          <p className="text-sm text-slate-500">Acompanhe e registre suas refeições diárias aqui.</p>
        </div>
      </div>

      <Card className="border-emerald-200 bg-emerald-50 mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-emerald-800 text-lg">Progresso Diário</CardTitle>
          <CardDescription className="text-emerald-700">
            Você registrou {recordedMeals.length} de {MEALS.length} refeições hoje.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="w-full bg-emerald-200/50 h-3 rounded-full overflow-hidden" 
            role="progressbar" 
            aria-valuenow={recordedMeals.length} 
            aria-valuemin={0} 
            aria-valuemax={MEALS.length}
            aria-label="Progresso de registro de refeições"
          >
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4" role="list">
        {MEALS.map((meal) => {
          const isRecorded = recordedMeals.includes(meal.id);
          
          return (
            <Card 
              key={meal.id} 
              role="button"
              tabIndex={0}
              aria-pressed={isRecorded}
              aria-label={`Registrar ${meal.label}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleMeal(meal.id);
                }
              }}
              className={`transition-all transition-shadow outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${isRecorded ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 hover:border-emerald-200 cursor-pointer'}`}
              onClick={() => toggleMeal(meal.id)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div 
                    className={`w-6 h-6 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      isRecorded ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                    }`}
                  >
                    {isRecorded && <Check className="h-4 w-4" />}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isRecorded ? 'text-emerald-800' : 'text-slate-800'}`}>
                      {meal.label} <span className="text-slate-400 text-xs font-normal ml-2">{meal.time}</span>
                    </h3>
                    <p className={`text-sm mt-1 ${isRecorded ? 'text-emerald-600/80' : 'text-slate-500'}`}>
                      {meal.description}
                    </p>
                  </div>
                </div>
                {isRecorded && (
                  <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded hidden sm:inline-block">
                    Registrada
                  </span>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
