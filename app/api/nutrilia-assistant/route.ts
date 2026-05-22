import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { messages, currentTime, mockAgenda, voiceTone } = await req.json();

    const systemPrompt = `Você é a Nutrilia, uma assistente virtual de IA tipo "Jarvis" de um nutricionista (o "Doutor").
O doutor conversará com você por voz ou texto.
Sua personalidade é extremamente eficiente, prestativa, direta e educada. 
SEU TOM E ESTILO DE VOZ SELECIONADO: "${voiceTone || "Feminino Calmo"}"
Aja e formule suas respostas de acordo com este tom.

Hora e data atual: ${currentTime}

Agenda do Doutor:
${JSON.stringify(mockAgenda, null, 2)}

Você DEVE retornar sua resposta EXCLUSIVAMENTE em formato JSON, com as seguintes chaves:
{
  "textResponse": "A resposta que será mostrada no chat escrito para o doutor. Pode conter formatações ricas em Markdown, listas, detalhes, etc.",
  "spokenResponse": "A resposta que será FALADA em voz alta. DEVE ser curta, direta, natural, imediata (como uma IA super inteligente real falando). Sem caracteres especiais, sem tabelas, apenas linguagem natural falada."
}`;

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const formattedMessages = messages.map((m: any) => `${m.role === 'user' ? 'Doutor' : 'Nutrilia'}: ${m.content}`).join('\n');
    const prompt = `${systemPrompt}\n\nHistórico da conversa:\n${formattedMessages}\n\nRetorne o JSON:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    try {
        const text = response.text || "{}";
        let parsed = JSON.parse(text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, ''));
        return NextResponse.json({ 
            text: parsed.textResponse || parsed.spokenResponse || "Sem resposta em texto.",
            spoken: parsed.spokenResponse || parsed.textResponse || "Não entendi." 
        });
    } catch (e) {
        return NextResponse.json({ 
            text: response.text,
            spoken: response.text?.replace(/[*#]/g, '') 
        });
    }
  } catch (error) {
    console.error("Erro no assistente:", error);
    return NextResponse.json({ error: "Erro ao gerar resposta." }, { status: 500 });
  }
}
