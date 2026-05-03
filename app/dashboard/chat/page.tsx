"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";

type Message = {
  role: "user" | "model";
  content: string;
};

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "Olá! Sou a IA da Nutrilia. Como posso te ajudar com sua dieta, alimentação ou rotina hoje?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      
      const history = messages.slice(1).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));

      const context = `
      Você é a Nutrilia AI, uma assistente virtual especializada em nutrição, dietas e estilo de vida saudável.
      O nome do usuário é ${user?.name || "Usuário"}. 
      Ele tem ${user?.preferences?.age || "idade não informada"} anos, pesa ${user?.preferences?.weight || "não informado"} kg e tem como objetivo: ${user?.preferences?.goal || "saúde"}.
      Responda sempre em português do Brasil de forma empática, clara e objetiva.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: [
          { role: "user", parts: [{ text: context }] },
          { role: "model", parts: [{ text: "Entendido! Estou pronta para ajudar." }] },
          ...history,
          { role: "user", parts: [{ text: userMessage }] }
        ],
      });

      const text = response.text || "Desculpe, não consegui gerar uma resposta.";
      setMessages(prev => [...prev, { role: "model", content: text }]);
    } catch (error) {
      console.error("Erro ao gerar resposta:", error);
      setMessages(prev => [...prev, { role: "model", content: "Desculpe, encontrei um erro ao processar sua pergunta. Por favor, verifique sua conexão ou tente novamente mais tarde." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-3 shrink-0">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Chat IA</h1>
          <p className="text-sm text-slate-500">Tire suas dúvidas sobre nutrição a qualquer momento.</p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-indigo-100 shadow-sm">
        <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-slate-200 text-slate-600" : "bg-indigo-600 text-white"}`}>
                {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div 
                className={`p-3 rounded-2xl ${msg.role === "user" ? "bg-slate-900 text-white rounded-tr-none" : "bg-indigo-50 text-slate-800 rounded-tl-none border border-indigo-100"}`}
              >
                <div className="text-sm prose prose-sm max-w-none">
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    <Markdown>{msg.content}</Markdown>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 rounded-tl-none flex items-center gap-2 text-indigo-400">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>
        
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre alimentos, quantidade de água, dicas..."
              className="flex-1 rounded-full px-4 border-indigo-200 focus-visible:ring-indigo-500"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shrink-0"
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-center text-[10px] text-slate-400 mt-2">A IA pode cometer erros. Consulte o seu profissional de saúde.</p>
        </div>
      </Card>
    </div>
  );
}
