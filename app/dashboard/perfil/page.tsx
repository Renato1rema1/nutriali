"use client";

import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Camera, User as UserIcon } from "lucide-react";

export default function PerfilPage() {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  if (!user) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateProfile({ profilePicture: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">Meu Perfil</h1>
        <p className="text-slate-500">Gerencie suas informações pessoais e preferências.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex sm:flex-row flex-col sm:items-center gap-6 pb-4 mb-4 border-b border-slate-100">
            <div className="relative isolate flex-shrink-0 mx-auto sm:mx-0">
              <div 
                className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-md overflow-hidden flex items-center justify-center cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Foto de perfil" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-12 h-12 text-slate-400 group-hover:text-slate-500 transition-colors" />
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            <div className="text-center sm:text-left">
              <CardTitle className="text-xl">{user.name}</CardTitle>
              <CardDescription className="mt-1">Clique na imagem para alterar sua foto de perfil</CardDescription>
            </div>
          </div>

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
