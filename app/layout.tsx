import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Geist } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Nutrilia - Nutricionista Virtual',
  description: 'Plataforma inteligente de nutrição e acompanhamento profissional.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={cn(space.variable, "font-sans", geist.variable)}>
      <body className="font-sans antialiased text-slate-800 bg-slate-50 min-h-screen flex flex-col" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
