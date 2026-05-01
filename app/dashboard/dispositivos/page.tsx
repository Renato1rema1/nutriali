"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Watch, Smartphone, Link as LinkIcon, CheckCircle2 } from "lucide-react";

export default function WearablesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
          <Watch className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">Dispositivos Vestíveis</h1>
          <p className="text-slate-500">Conecte seus apps e smartwatches para coleta automática de dados.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 pt-4">
        <Card className="border-blue-200 shadow-blue-100/50">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="h-10 w-10 bg-slate-900 text-white rounded-lg flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM13 15V13H11V15H13ZM13 11V7H11V11H13Z" />
                </svg>
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <CheckCircle2 className="h-3 w-3" />
                Conectado
              </span>
            </div>
            <CardTitle>Apple Health</CardTitle>
            <CardDescription>Sincronizando passos, calorias ativas e batimentos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Última sync</span>
              <span className="font-medium">Há 5 min</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">Desconectar</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-10 w-10 bg-[#002A3A] text-white rounded-lg flex items-center justify-center mb-4">
              <Activity className="h-6 w-6" />
            </div>
            <CardTitle>Garmin Connect</CardTitle>
            <CardDescription>Sincronize seus treinos e métricas avançadas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Status</span>
              <span className="font-medium text-slate-400">Desconectado</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button className="w-full gap-2 bg-[#002A3A] hover:bg-[#001D29]">
              <LinkIcon className="h-4 w-4" />
              Conectar
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-10 w-10 bg-[#ff4a3d] text-white rounded-lg flex items-center justify-center mb-4">
              <Smartphone className="h-6 w-6" />
            </div>
            <CardTitle>Google Fit</CardTitle>
            <CardDescription>Conecte seus dados do celular e acessórios Android.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Status</span>
              <span className="font-medium text-slate-400">Desconectado</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button className="w-full gap-2 bg-[#ff4a3d] hover:bg-[#e03d32]">
              <LinkIcon className="h-4 w-4" />
              Conectar
            </Button>
          </CardFooter>
        </Card>
        
      </div>
    </div>
  );
}
