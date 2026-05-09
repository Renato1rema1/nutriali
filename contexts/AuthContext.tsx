"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export interface User {
  id: string;
  name: string;
  email: string;
  isOnboarded: boolean;
  role?: "user" | "nutricionista";
  crn?: string;
  preferences?: any;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoaded: boolean;
  login: (email: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  registerNutricionista: (name: string, email: string, crn: string) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: (preferences: any) => Promise<void>;
  connectAppleWatch: () => Promise<void>;
  disconnectAppleWatch: () => Promise<void>;
  connectGoogleFit: () => Promise<void>;
  disconnectGoogleFit: () => Promise<void>;
  connectGarmin: () => Promise<void>;
  disconnectGarmin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check active sessions and sets the user
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await fetchProfile(session.user.id, session.user.email || '');
      } else {
        setIsLoaded(true);
      }
    };

    checkSession();

    // Listen for changes on auth state
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchProfile(session.user.id, session.user.email || '');
      } else {
        setUser(null);
        setIsLoaded(true);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (id: string, email: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (profile) {
        setUser({ ...profile, email });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  const login = async (email: string) => {
    // Simulating passwordless login for ease of demo or you can use OTP
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/dashboard'
      }
    });

    if (error) {
      alert("Erro ao fazer login: " + error.message);
      return;
    }
    alert("Check your email for the login link!");
  };

  const register = async (name: string, email: string) => {
    // Registration logic
    const { data, error } = await supabase.auth.signInWithOtp({ 
      email,
      options: {
        data: {
          name,
          role: 'user'
        },
        emailRedirectTo: window.location.origin + '/dashboard'
      }
    });
    if (error) {
       console.error(error);
       return;
    }
    
    // On magic link click, we would create their profile.
    // For now, since Supabase requires email verification, we just notify.
    alert("Enviamos um link de confirmação para " + email);
  };

  const registerNutricionista = async (name: string, email: string, crn: string) => {
    // Similar registration flow
    const { data, error } = await supabase.auth.signInWithOtp({ 
      email,
      options: {
        data: {
          name,
          crn,
          role: 'nutricionista'
        },
        emailRedirectTo: window.location.origin + '/dashboard-nutricionista'
      }
    });
    if (error) {
       console.error(error);
       return;
    }
    
    // We would store the metadata wait for confirmation
    // Or you can create an RPC to handle this automatically
    alert("Enviamos um link de confirmação para seu email nutricional.");
  };

  const completeOnboarding = async (preferences: any) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('profiles')
      .update({ isOnboarded: true, preferences })
      .eq('id', user.id);

    if (!error) {
      setUser({ ...user, isOnboarded: true, preferences });
      if (user.role === 'nutricionista') {
        router.push("/dashboard-nutricionista");
      } else {
        router.push("/dashboard");
      }
    }
  };

  const connectAppleWatch = async () => {};
  const disconnectAppleWatch = async () => {};
  const connectGoogleFit = async () => {};
  const disconnectGoogleFit = async () => {};
  const connectGarmin = async () => {};
  const disconnectGarmin = async () => {};

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    if (isLoaded) {
      if (pathname?.startsWith("/dashboard")) {
        if (!user) {
          router.push("/login");
        } else if (user.role === 'nutricionista' && !pathname.startsWith("/dashboard-nutricionista")) {
          router.push("/dashboard-nutricionista");
        } else if (user.role !== 'nutricionista' && pathname.startsWith("/dashboard-nutricionista")) {
          router.push("/dashboard");
        } else if (!user.isOnboarded && user.role !== 'nutricionista') {
          router.push("/onboarding");
        }
      }

      if (pathname === "/onboarding") {
        if (!user) {
          router.push("/login");
        } else if (user.role === 'nutricionista') {
          router.push("/dashboard-nutricionista");
        } else if (user.isOnboarded) {
          router.push("/dashboard");
        }
      }
      
      if (pathname === "/login" && user) {
        if (user.role === 'nutricionista') {
          router.push("/dashboard-nutricionista");
        } else if (user.isOnboarded) {
          router.push("/dashboard");
        } else {
          router.push("/onboarding");
        }
      }
    }
  }, [user, pathname, isLoaded, router]);

  return (
    <AuthContext.Provider value={{
      user,
      isLoaded,
      login,
      register,
      registerNutricionista,
      logout,
      completeOnboarding,
      connectAppleWatch,
      disconnectAppleWatch,
      connectGoogleFit,
      disconnectGoogleFit,
      connectGarmin,
      disconnectGarmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
