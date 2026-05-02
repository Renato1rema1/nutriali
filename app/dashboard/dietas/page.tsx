"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Apple, Bot, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export default function DietasIAPage() {
  const [goal, setGoal] = useState("");
  const [preferences, setPreferences] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal) return;

    setLoading(true);
    setResult(null);

    const prompt = `Atue como um nutricionista virtual altamente qualificado. 
Crie um plano alimentar diário (1 dia de exemplo) focado no objetivo: ${goal}.
Lembre-se das seguintes preferências ou restrições do paciente: ${preferences || "Nenhuma especificada"}.

O formato deve ser em Markdown bem estruturado, contendo:
- Título do Plano e Resumo dos Objetivos
- Refeições: Café da manhã, Lanche da manhã, Almoço, Lanche da tarde, Jantar e Ceia.
- Para cada refeição, liste os ingredientes/quantidades aproximadas e uma dica de substituição.
- Uma seção final de orientações de hidratação.

Limite sua resposta ao essencial e seja prático e encorajador.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
      });

      setResult(response.text);
    } catch (error: any) {
      console.error(error);
      setResult("Desculpe, ocorreu um erro ao gerar a sua dieta. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">Nutricionista IA</h1>
          <p className="text-slate-500">Crie planos alimentares personalizados em segundos.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        <Card className="md:col-span-1 sticky top-24">
          <CardHeader>
            <CardTitle className="text-lg">Configurar Dieta</CardTitle>
            <CardDescription>O que você quer alcançar?</CardDescription>
          </CardHeader>
          <form onSubmit={handleGenerate}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal">Objetivo Principal*</Label>
                <Input 
                  id="goal" 
                  placeholder="Ex: Emagrecimento, Hipertrofia..." 
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferences">Preferências / Restrições</Label>
                <textarea 
                  id="preferences" 
                  className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                  placeholder="Ex: Sou vegetariano, não gosto de tomate, tenho intolerância a lactose..."
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full gap-2" disabled={loading || !goal}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {loading ? "Processando..." : "Gerar Plano IA"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card className="md:col-span-2 min-h-[400px]">
          <CardHeader>
            <CardTitle>Seu Plano Alimentar</CardTitle>
            <CardDescription>
              {result ? "Pronto! Veja o que a IA preparou para você." : "Preencha os dados ao lado para gerar sua dieta."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-48 flex flex-col items-center justify-center text-slate-400 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                <p>Nossa IA está calculando as melhores opções para você...</p>
              </div>
            ) : result ? (
              <div className="prose prose-slate prose-sm sm:prose-base max-w-none prose-headings:font-display prose-headings:text-emerald-700 prose-a:text-emerald-600">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-slate-400 text-center px-4">
                <Apple className="h-12 w-12 mb-3 opacity-20" />
                <p>Nenhum plano gerado ainda.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
