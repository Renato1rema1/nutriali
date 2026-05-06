"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Watch, CheckCircle2, Link as LinkIcon } from "lucide-react";

export default function WearablesPage() {
  const { user, connectAppleWatch, disconnectAppleWatch } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dispositivos & Apps</h1>
        <p className="text-slate-500 mt-2">Conecte seus wearables para sincronizar dados automaticamente.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={user?.isAppleWatchConnected ? "border-emerald-200 shadow-emerald-100/50" : ""}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="h-10 w-10 bg-slate-900 text-white rounded-lg flex items-center justify-center mb-4">
                <Watch className="h-6 w-6" />
              </div>
              {user?.isAppleWatchConnected && (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <CheckCircle2 className="h-3 w-3" />
                  Conectado
                </span>
              )}
            </div>
            <CardTitle>Apple Watch</CardTitle>
            <CardDescription>Sincronize gastos calóricos, passos e treinos via Apple Health.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Status</span>
              <span className={user?.isAppleWatchConnected ? "font-medium text-emerald-600" : "font-medium text-slate-400"}>
                {user?.isAppleWatchConnected ? "Ativo (Última sync: Há 2 min)" : "Desconectado"}
              </span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            {user?.isAppleWatchConnected ? (
              <Button onClick={disconnectAppleWatch} variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">Desconectar</Button>
            ) : (
              <Button onClick={connectAppleWatch} className="w-full gap-2 bg-slate-900 hover:bg-slate-800">
                <LinkIcon className="h-4 w-4" />
                Conectar
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
