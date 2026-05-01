"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Activity, Flame, Utensils, Droplet, NotebookPen } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";

const weightData = [
  { name: 'Sem 1', peso: 80.5 },
  { name: 'Sem 2', peso: 79.8 },
  { name: 'Sem 3', peso: 79.0 },
  { name: 'Sem 4', peso: 78.4 },
  { name: 'Sem 5', peso: 77.9 },
];

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">Oii, João!</h1>
        <p className="text-slate-500">Aqui está o resumo do seu progresso hoje.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl shadow-sm border-0 border-l-4 border-l-orange-500">
          <div>
            <p className="text-slate-500 text-xs font-semibold mb-1 uppercase tracking-wider">Kcal Consumidas</p>
            <h3 className="text-2xl font-bold font-display text-slate-900">1.850</h3>
            <p className="text-xs text-orange-600 mt-1">Sua meta é 2.200</p>
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-2xl shadow-sm border-0 border-l-4 border-l-blue-500">
          <div>
            <p className="text-slate-500 text-xs font-semibold mb-1 uppercase tracking-wider">Água hoje</p>
            <h3 className="text-2xl font-bold font-display text-slate-900">2.1L</h3>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl shadow-sm border-0 border-l-4 border-l-emerald-500">
          <div>
            <p className="text-slate-500 text-xs font-semibold mb-1 uppercase tracking-wider">Passos</p>
            <h3 className="text-2xl font-bold font-display text-slate-900">6.540</h3>
            <p className="text-xs text-emerald-600 mt-1">+12% vs ontem</p>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl shadow-sm border-0 border-l-4 border-l-purple-500">
          <div>
            <p className="text-slate-500 text-xs font-semibold mb-1 uppercase tracking-wider">Refeições Feitas</p>
            <h3 className="text-2xl font-bold font-display text-slate-900">3 / 5</h3>
            <p className="text-xs text-slate-500 mt-1 uppercase">Pendente: Lanche</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Progresso de Peso</CardTitle>
            <CardDescription>Sua evolução nas últimas 5 semanas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="peso" stroke="#059669" strokeWidth={3} dot={{ r: 4, fill: '#059669', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Próxima Refeição</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-slate-900">Lanche da Tarde</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">16:00</span>
                </div>
                <p className="text-sm text-slate-600">Iogurte natural c/ chia e 1 maçã média.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Nutricionista</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500 overflow-hidden">
                  <img src="https://picsum.photos/seed/doctor1/100" alt="Dra. Mariana" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Dra. Mariana S.</p>
                  <p className="text-xs text-slate-500">Próx. Consulta: 15/Mai</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <NotebookPen className="h-4 w-4" />
                Diário / Anotações
              </CardTitle>
            </CardHeader>
            <CardContent>
               <textarea 
                  className="w-full text-sm border-0 bg-slate-50 rounded-lg p-3 focus:ring-1 focus:ring-emerald-500 resize-none h-24 text-slate-700" 
                  placeholder="Como você se sentiu hoje com a dieta? Alguma dificuldade?"
                />
            </CardContent>
            <CardFooter className="pt-0">
               <Button size="sm" className="w-full">Salvar Nota</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
