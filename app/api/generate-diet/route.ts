import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { goal, preferences } = await req.json();

    const prompt = `Atue como um nutricionista virtual altamente qualificado. 
Crie um plano alimentar diário (1 dia de exemplo) focado no objetivo: ${goal}.
Lembre-se das seguintes preferências ou restrições do paciente: ${preferences || "Nenhuma especificada"}.

O formato deve ser em Markdown bem estruturado, contendo:
- Título do Plano e Resumo dos Objetivos
- Refeições: Café da manhã, Lanche da manhã, Almoço, Lanche da tarde, Jantar e Ceia.
- Para cada refeição, liste os ingredientes/quantidades aproximadas e uma dica de substituição.
- Uma seção final de orientações de hidratação.

Limite sua resposta ao essencial e seja prático e encorajador.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Erro na API do Gemini:", error.message);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
