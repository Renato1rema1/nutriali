"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, Mic, X, Loader2, Sparkles, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "bot";
  content: string;
}

export function NutriliaAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSendVoice(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Remove markdowns roughly for speech
      const cleanText = text.replace(/[*#]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.pitch = 1.1; // A slightly higher pitch for a female AI voice
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialGreeting = `Olá, Dr. ${user?.name?.split(' ')[0] || "Nutricionista"}! Sou a Nutrilia, sua assistente pessoal.\nEstou acompanhando sua agenda. No que posso ajudar?`;
      setMessages([
        { role: "bot", content: initialGreeting }
      ]);
      speak(initialGreeting);
    }
  }, [isOpen, messages.length, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendVoice = async (text: string) => {
    if (!text.trim()) return;
    processMessage(text);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    processMessage(input);
  };

  const processMessage = async (userText: string) => {
    setMessages(prev => [...prev, { role: "user", content: userText }]);
    setInput("");
    setIsTyping(true);

    try {
      const mockAgenda = [
         { time: "14:00", patient: "Carlos Ferreira", status: "Confirmado e pago via PIX" },
         { time: "20:00", patient: "Maria Silva", status: "Confirmado presencialmente" },
      ];
      
      const now = new Date();
      const currentTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + ' de ' + now.toLocaleDateString('pt-BR');

      const response = await fetch('/api/nutrilia-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userText }],
          currentTime,
          mockAgenda
        })
      });

      const data = await response.json();
      
      if (data.text) {
        setMessages(prev => [...prev, { role: "bot", content: data.text }]);
        speak(data.text);
      } else {
        throw new Error("No text response");
      }
    } catch (error) {
      const errorMsg = "Desculpe, tive um problema de conexão com meus servidores.";
      setMessages(prev => [...prev, { role: "bot", content: errorMsg }]);
      speak(errorMsg);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleListen = () => {
    if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
    } else {
        setInput("");
        setIsListening(true);
        try {
           recognitionRef.current?.start();
        } catch(e) {
           console.error("Microphone in use", e);
        }
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button 
            onClick={() => setIsOpen(true)}
            className="h-16 w-16 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl flex items-center justify-center group relative"
          >
            <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-20"></div>
            <Bot className="h-8 w-8 group-hover:scale-110 transition-transform text-white" />
          </Button>
        )}
      </div>

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[380px] h-[550px] shadow-2xl flex flex-col z-50 overflow-hidden border-slate-200 animate-in slide-in-from-bottom-5">
          <CardHeader className="bg-slate-900 text-white px-4 py-3 pb-4 flex flex-row items-center justify-between shrink-0 rounded-t-xl rounded-b-none items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                 <div className="absolute inset-0 bg-purple-500 rounded-full blur-sm animate-pulse"></div>
                 <div className="h-10 w-10 bg-slate-800 border-2 border-purple-500 rounded-full flex items-center justify-center relative z-10">
                    <Sparkles className="h-5 w-5 text-purple-300" />
                 </div>
              </div>
              <div>
                <CardTitle className="text-base font-display">Nutrilia (IA)</CardTitle>
                <div className="text-xs text-slate-300 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Sua Assistente Pessoal
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white hover:bg-slate-800 -mr-2">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            <div className="text-center text-xs text-slate-400 mb-2">Conexão Segura Estabelecida</div>
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mr-2 shrink-0 mt-1">
                     <Bot className="h-3 w-3 text-purple-400" />
                  </div>
                )}
                <div 
                  className={`max-w-[80%] p-3 text-sm rounded-2xl whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-slate-900 text-white rounded-tr-sm' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                  }`}
                >
                  <div className="prose prose-sm prose-p:leading-relaxed prose-slate max-w-none">
                    <ReactMarkdown>
                     {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mr-2 shrink-0">
                     <Bot className="h-3 w-3 text-purple-400" />
                </div>
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                  <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                  <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
             {isListening && (
                 <div className="text-center mb-2 animate-pulse text-purple-600 text-xs font-semibold flex items-center justify-center gap-2">
                     <Volume2 className="h-3 w-3" />
                     Ouvindo... (Fale agora)
                 </div>
             )}
             <div className="flex items-center gap-2">
                <Button 
                   variant={isListening ? "default" : "outline"} 
                   size="icon" 
                   className={`shrink-0 rounded-full transition-all ${isListening ? "bg-purple-600 hover:bg-purple-700 shadow-md scale-110" : ""}`}
                   onClick={toggleListen}
                >
                   <Mic className={`h-4 w-4 ${isListening ? "text-white" : ""}`} />
                </Button>
                <Input 
                  placeholder="Peça algo à Nutrilia..." 
                  className="flex-1 rounded-full bg-slate-50" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend} size="sm" className="rounded-full bg-slate-900 px-4">
                  Enviar
                </Button>
             </div>
          </div>
        </Card>
      )}
    </>
  );
}
