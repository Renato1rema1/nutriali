"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center text-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-4xl font-bold text-emerald-600 mb-2">Nutrilia</h1>
        <p className="text-slate-500 mb-8">
          A sua plataforma de nutrição inteligente e acompanhamento profissional.
        </p>

        <div className="space-y-4">
          <Button 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg"
            onClick={() => router.push("/login")}
          >
            Fazer Login
          </Button>
          <Button 
            variant="outline"
            className="w-full py-6 text-lg border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            onClick={() => router.push("/login")}
          >
            Criar Conta
          </Button>
        </div>
      </div>
    </div>
  );
}
