"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Apple } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export default function PlansPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(user ? "/dashboard" : "/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <a href="#" onClick={handleBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors" aria-label="Voltar">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="text-sm font-medium">{t('nav.back')}</span>
        </a>
        <div className="flex items-center gap-2" aria-hidden="true">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Apple className="h-5 w-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-800">Nutrilia</span>
        </div>
        <div className="w-16" aria-hidden="true"></div> {/* Spacer for centering */}
      </header>

      <main className="flex-1 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              {t('plans.title')}
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {t('plans.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">{t('plans.free.name')}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">{t('plans.free.price')}</span>
                  <span className="text-slate-500 font-medium">{t('plans.free.period')}</span>
                </div>
                <p className="text-sm text-slate-500 mt-3">{t('plans.free.desc')}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </div>
                  <span className="text-sm">{t('plans.free.feat1')}</span>
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </div>
                  <span className="text-sm">{t('plans.free.feat2')}</span>
                </li>
              </ul>

              <Link href="/login?tab=register">
                <Button variant="outline" className="w-full h-12 text-base font-semibold border-slate-200 text-slate-700 hover:bg-slate-50">{t('plans.free.btn')}</Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-slate-900 rounded-3xl p-8 border-0 shadow-xl flex flex-col relative overflow-hidden ring-4 ring-emerald-500/20">
              <div className="absolute top-0 right-0 p-6">
                <div className="text-[10px] uppercase tracking-wider font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-3 py-1 rounded-full shadow-sm">
                  {t('plans.pro.badge')}
                </div>
              </div>
              <div className="mb-6 relative z-10">
                <h3 className="text-xl font-bold text-white">{t('plans.pro.name')}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{t('plans.pro.price')}</span>
                  <span className="text-slate-400 font-medium">{t('plans.pro.period')}</span>
                </div>
                <p className="text-sm text-slate-400 mt-3">{t('plans.pro.desc')}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1 relative z-10">
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-emerald-400" />
                  </div>
                  <span className="text-sm">{t('plans.pro.feat1')}</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-emerald-400" />
                  </div>
                  <span className="text-sm">{t('plans.pro.feat2')}</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-emerald-400" />
                  </div>
                  <span className="text-sm">{t('plans.pro.feat3')}</span>
                </li>
              </ul>

              <Link href="/login?tab=register&plan=pro" className="relative z-10">
                <Button className="w-full h-12 text-base font-semibold bg-emerald-500 hover:bg-emerald-400 text-white border-0">{t('plans.pro.btn')}</Button>
              </Link>

              {/* Background decoration */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
