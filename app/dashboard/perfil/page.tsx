"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PerfilPage() {
  const { user, updateProfile } = useAuth();
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Meu Perfil</h1>
      <Card>
        <CardHeader>
          <CardTitle>Dados Pessoais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Nome</p>
              <p className="text-base text-slate-900">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Email</p>
              <p className="text-base text-slate-900">{user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
