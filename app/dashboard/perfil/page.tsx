"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export default function PerfilPage() {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">Meu Perfil</h1>
        <p className="text-slate-500">Gerencie suas informações pessoais e preferências.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>Atualize seus dados para a IA ser mais precisa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user.email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idade">Idade</Label>
              <Input id="idade" type="number" defaultValue={user.preferences?.age || "28"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="peso">Peso Atual (kg)</Label>
              <Input id="peso" type="number" step="0.1" defaultValue={user.preferences?.weight || "77.9"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="altura">Altura (cm)</Label>
              <Input id="altura" type="number" defaultValue={user.preferences?.height || "175"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="objetivo">Meta/Objetivo</Label>
              <Input id="objetivo" defaultValue={user.preferences?.goal || "Emagrecimento"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genero">Gênero Biológico</Label>
              <Input id="genero" defaultValue={user.preferences?.gender || "Não informado"} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end border-t border-slate-100 p-4">
          <Button>Salvar Alterações</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferências Alimentares</CardTitle>
          <CardDescription>O que você gosta de comer e o que evita</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="restricoes">Restrições e Alergias</Label>
            <textarea 
              id="restricoes" 
              className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
              defaultValue="Nenhuma restrição alimentar."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rotina">Nível de Atividade</Label>
            <textarea 
              id="rotina" 
              className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
              defaultValue={user.preferences?.activityLevel || "Moderado"}
            />
          </div>
        </CardContent>
        <CardFooter className="justify-end border-t border-slate-100 p-4">
          <Button>Salvar Preferências</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
