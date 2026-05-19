"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { User, Settings, Save, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export default function PerfilPage() {
  const { user } = useAuth();
  const initials = user?.name ? user.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() : 'NU';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight flex items-center gap-2">
            <User className="h-6 w-6 text-slate-700" />
            Meu Perfil
          </h1>
          <p className="text-slate-500">Gerencie suas informações profissionais e preferencias.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-0 shadow-sm bg-gradient-to-b from-white to-slate-50">
           <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4 rounded-full bg-slate-200 border-4 border-white shadow-md flex items-center justify-center font-bold text-2xl text-slate-500">
                 {initials}
              </div>
              <h2 className="text-xl font-bold text-slate-900">{user?.name || "Nutricionista"}</h2>
              <p className="text-sm text-emerald-600 font-medium mb-4">CRN-3: 12345/P</p>
              
              <div className="w-full space-y-3 mt-4 text-left border-t border-slate-200 pt-4">
                 <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="truncate">{user?.email || "email@clinica.com"}</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>(11) 99999-9999</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>São Paulo, SP</span>
                 </div>
              </div>
           </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-sm border-slate-200">
           <CardHeader>
             <CardTitle>Informações Pessoais</CardTitle>
             <CardDescription>Atualize seus dados profissionais visíveis aos pacientes.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Nome Completo</Label>
                    <Input defaultValue={user?.name || ""} />
                 </div>
                 <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input defaultValue={user?.email || ""} disabled />
                 </div>
                 <div className="space-y-2">
                    <Label>Registro (CRN)</Label>
                    <Input defaultValue="CRN-3: 12345/P" />
                 </div>
                 <div className="space-y-2">
                    <Label>Telefone / WhatsApp</Label>
                    <Input defaultValue="(11) 99999-9999" />
                 </div>
                 <div className="space-y-2 sm:col-span-2">
                    <Label>Biografia Curta</Label>
                    <textarea 
                      className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950" 
                      defaultValue="Especialista em nutrição esportiva e emagrecimento saudável."
                    />
                 </div>
              </div>
           </CardContent>
           <CardFooter className="bg-slate-50 border-t justify-end py-3">
              <Button className="gap-2 bg-slate-900">
                <Save className="h-4 w-4" />
                Salvar Alterações
              </Button>
           </CardFooter>
        </Card>
      </div>
    </div>
  );
}
