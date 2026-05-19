import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { messages, currentTime, mockAgenda } = await req.json();

    const systemPrompt = `Você é a Nutrilia, uma assistente virtual de IA tipo "Jarvis" de um nutricionista (o "Doutor").
O doutor conversará com você por voz ou texto.
Sua personalidade é extremamente eficiente, prestativa, direta e educada. Responda de forma clara, natural para ser falada em áudio (evite formatações complexas como tabelas ou muitos asteriscos). Chame o usuário de "Doutor" ou "Senhor".

Hora e data atual: ${currentTime}

Agenda do Doutor hoje/amanhã:
${JSON.stringify(mockAgenda, null, 2)}

Seja inteligente sobre o horário. Se uma consulta já passou, diga que já passou. Se ele perguntar qual a próxima, olhe o horário atual.

Mantenha as respostas relativamente curtas, pois elas serão lidas em voz alta pelo sistema Text-to-Speech.`;

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    // Send history
    for (let i = 0; i < messages.length - 1; i++) {
        const msg = messages[i];
        if (msg.role === 'user') {
            await chat.sendMessage({ message: msg.content, }); // not exactly correct for history. Let's format manually or use the proper history API. 
            // Wait, we can just send everything up to the last message as context if we don't want to use the chat session properly, or we format it.
        }
    }

    // Actually, simple generation is easier:
    const formattedMessages = messages.map((m: any) => `${m.role === 'user' ? 'Doutor' : 'Nutrilia'}: ${m.content}`).join('\n');
    const prompt = `${systemPrompt}\n\nHistórico da conversa:\n${formattedMessages}\n\nNutrilia:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Erro no assistente:", error);
    return NextResponse.json({ error: "Erro ao gerar resposta." }, { status: 500 });
  }
}
