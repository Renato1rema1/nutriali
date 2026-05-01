"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Apple, 
  LayoutDashboard, 
  MessageSquare, 
  Watch, 
  User, 
  Crown,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const sidebarLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Visão Geral" },
  { href: "/dashboard/dietas", icon: Apple, label: "Dietas IA" },
  { href: "/dashboard/atendimento", icon: MessageSquare, label: "Nutricionistas" },
  { href: "/dashboard/dispositivos", icon: Watch, label: "Wearables" },
  { href: "/dashboard/perfil", icon: User, label: "Meu Perfil" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 flex flex-col",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
          <Link href="/dashboard" className="flex items-center gap-2 text-emerald-600">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Apple className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-800">NutriAI</span>
          </Link>
          <button 
            className="md:hidden text-slate-500"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-colors",
                  isActive 
                    ? "bg-emerald-50 text-emerald-700 font-medium" 
                    : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
                )}
              >
                <link.icon className={cn("h-5 w-5", isActive ? "" : "text-slate-400")} />
                {link.label}
              </Link>
            )
          })}
        </div>
        
        <div className="p-4 mb-4">
          <div className="bg-slate-900 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold premium-pill px-2 py-0.5 rounded uppercase">Premium</span>
            </div>
            <p className="text-sm text-slate-400 mb-3">Acesso à IA avançada e especialistas elite.</p>
            <Link href="/dashboard/premium">
              <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg text-sm font-semibold transition-colors border-0">
                Upgrade
              </Button>
            </Link>
          </div>
          <Link 
            href="/"
            className="flex items-center gap-3 px-3 py-2 mt-2 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-4 sm:px-8 bg-white border-b border-slate-200 sticky top-0 z-30">
          <button 
            className="md:hidden p-2 -ml-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-4 hidden md:flex">
            <h1 className="text-xl font-bold text-slate-800">Bem-vindo, João</h1>
            <div className="flex items-center text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
              Relógio Conectado
            </div>
          </div>
          <div className="flex-1 md:hidden" />
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block leading-none">
              <p className="text-sm font-bold leading-none mb-1">João Silva</p>
              <p className="text-[10px] text-slate-500">Plano Gratuito</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center font-bold text-slate-500">
              JS
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
