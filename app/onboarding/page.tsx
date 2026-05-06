"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  const { completeOnboarding } = useAuth();
  
  const handleComplete = () => {
    completeOnboarding({ goal: "Ganhar massa magra" });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Bem-vindo à Nutrilia!</h2>
        <p className="text-slate-600 mb-8">
          Personalize sua experiência para começarmos.
        </p>
        <Button onClick={handleComplete} className="w-full bg-emerald-600 hover:bg-emerald-700">
          Concluir Configuração
        </Button>
      </div>
    </div>
  );
}
