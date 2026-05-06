"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Activity, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Olá, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-slate-500 mt-1">Aqui está o resumo do seu progresso hoje.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Kcal Consumidas</CardTitle>
            <Coffee className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">1,240</div>
            <p className="text-xs text-slate-500 mt-1">Meta: 2,000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Carboidratos</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">120g</div>
            <p className="text-xs text-slate-500 mt-1">Meta: 250g</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Proteínas</CardTitle>
            <TrendingUp className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">85g</div>
            <p className="text-xs text-slate-500 mt-1">Meta: 150g</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
