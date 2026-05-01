import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity, Apple, Heart, Stethoscope } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2 text-emerald-600">
          <Apple className="h-6 w-6" />
          <span className="font-display font-bold text-xl tracking-tight">Nutrilia</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="#funcionalidades" className="hover:text-emerald-600 transition-colors">Funcionalidades</Link>
          <Link href="#profissionais" className="hover:text-emerald-600 transition-colors">Para Profissionais</Link>
          <Link href="#planos" className="hover:text-emerald-600 transition-colors">Planos</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Entrar</Button>
          </Link>
          <Link href="/login?tab=register">
            <Button>Começar Agora</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-6 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Sua Nutricionista Virtual com IA
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
            Transforme sua relação com a <span className="text-emerald-600">alimentação</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Planos alimentares gerados por IA, acompanhamento em tempo real com dispositivos vestíveis e acesso aos melhores nutricionistas do Brasil.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login?tab=register">
              <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8">Criar Conta Grátis</Button>
            </Link>
            <Link href="#funcionalidades">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8">Conhecer o App</Button>
            </Link>
          </div>
        </section>

        <section id="funcionalidades" className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="font-display text-3xl font-bold mb-4">Tudo que você precisa para uma vida saudável</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Nossa inteligência artificial analisa seus hábitos, preferências e dados de saúde para criar a rotina perfeita para você.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <Apple className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Dietas por IA</h3>
                <p className="text-slate-600 leading-relaxed">Receba pratos personalizados e adaptados à sua rotina, com opções de substituição fáceis e listas de compras geradas automaticamente.</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Integração Smartwatches</h3>
                <p className="text-slate-600 leading-relaxed">Conecte seus dispositivos vestíveis. Nós coletamos seus passos, gasto calórico e sono para ajustar seu plano dinamicamente.</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Profissionais Reais</h3>
                <p className="text-slate-600 leading-relaxed">Encontre o nutricionista ideal para o seu perfil e tire dúvidas diretamente pelo nosso chat integrado e envie exames.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 border-t py-12 px-6 text-center text-slate-400">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-white mb-6">
            <Apple className="h-5 w-5 text-emerald-500" />
            <span className="font-display font-bold text-lg tracking-tight">Nutrilia</span>
          </div>
          <p className="mb-4">© 2026 Nutrilia - Saúde & Tecnologia. Todos os direitos reservados.</p>
          <p className="text-sm">Nota: Esta é uma simulação para fins de demonstração.</p>
        </div>
      </footer>
    </div>
  );
}
