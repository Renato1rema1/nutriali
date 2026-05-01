"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, Github } from "lucide-react";
import { Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const isRegister = searchParams.get("tab") === "register";

  return (
    <div className="w-full max-w-md">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl">{isRegister ? "Criar sua conta" : "Bem-vindo de volta"}</CardTitle>
          <CardDescription>
            {isRegister ? "Comece sua jornada para uma vida mais saudável" : "Faça login para ver seu progresso"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Link href="/dashboard" className="w-full block">
              <Button variant="outline" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continuar com Google
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full block">
              <Button variant="outline" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z" fill="#1877F2"/>
                </svg>
                Continuar com Facebook
              </Button>
            </Link>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">ou com email</span>
            </div>
          </div>

          <div className="space-y-4">
            {isRegister && (
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" placeholder="Seu nome" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                {!isRegister && (
                  <Link href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                    Esqueceu a senha?
                  </Link>
                )}
              </div>
              <Input id="password" type="password" />
            </div>
          </div>

          <Link href="/dashboard" className="w-full block mt-4">
            <Button className="w-full">{isRegister ? "Criar conta" : "Entrar"}</Button>
          </Link>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-slate-600">
          {isRegister ? (
            <p>
              Já tem uma conta? <Link href="/login" className="text-emerald-600 font-medium hover:underline">Entre aqui</Link>
            </p>
          ) : (
            <p>
              Não tem uma conta? <Link href="/login?tab=register" className="text-emerald-600 font-medium hover:underline">Registre-se</Link>
            </p>
          )}
        </CardFooter>
      </Card>
      
      <p className="mt-8 text-sm text-slate-500 max-w-sm text-center">
        Clicando em continuar para o dashboard (simulação), você aceita nossos termos de serviço e a política de privacidade.
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2 text-emerald-600 mb-8 hover:opacity-80 transition-opacity">
        <Apple className="h-8 w-8" />
        <span className="font-display font-bold text-2xl tracking-tight">Nutrilia</span>
      </Link>

      <Suspense fallback={<div className="h-96 w-full max-w-md bg-white rounded-xl shadow animate-pulse" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
