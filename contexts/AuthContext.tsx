"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface User {
  name: string;
  email: string;
  isOnboarded: boolean;
  preferences?: any;
  isAppleWatchConnected?: boolean;
  recordedMeals?: string[];
  savedPlans?: any[];
  profilePicture?: string;
  mealReminders?: {
    id: string;
    label: string;
    time: string;
    enabled: boolean;
  }[];
  goalTargetDates?: Record<string, string>;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string, password?: string) => Promise<void>;
  register: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: (preferences: any) => void;
  connectAppleWatch: () => void;
  disconnectAppleWatch: () => void;
  toggleMeal: (mealId: string) => void;
  savePlan: (plan: any) => void;
  removePlan: (planId: string) => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const parseSupabaseUser = (sbUser: any): User => {
    return {
      email: sbUser.email,
      name: sbUser.user_metadata?.name || "Usuário",
      isOnboarded: sbUser.user_metadata?.isOnboarded || false,
      preferences: sbUser.user_metadata?.preferences,
      isAppleWatchConnected: sbUser.user_metadata?.isAppleWatchConnected,
      recordedMeals: sbUser.user_metadata?.recordedMeals || [],
      savedPlans: sbUser.user_metadata?.savedPlans || [],
      profilePicture: sbUser.user_metadata?.profilePicture,
      mealReminders: sbUser.user_metadata?.mealReminders,
      goalTargetDates: sbUser.user_metadata?.goalTargetDates,
    };
  };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // Fallback for when Supabase is not configured yet. 
      // It allows the app to not break immediately.
      const savedUser = localStorage.getItem("nutrilia_user");
      if (savedUser) setUser(JSON.parse(savedUser));
      setIsLoaded(true);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(parseSupabaseUser(session.user));
      }
      setIsLoaded(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(parseSupabaseUser(session.user));
      } else {
        setUser(null);
      }
      setIsLoaded(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const syncToLocalAsFallback = (updatedUser: User) => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setUser(updatedUser);
      localStorage.setItem("nutrilia_user", JSON.stringify(updatedUser));
    }
  };

  const updateUserMetadata = async (metadataPatch: any) => {
    if (!user) return;
    const updatedUser = { ...user, ...metadataPatch };
    setUser(updatedUser); // Optimistic UI update

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      await supabase.auth.updateUser({
        data: metadataPatch
      });
    } else {
      syncToLocalAsFallback(updatedUser);
    }
  };

  const login = async (name: string, email: string, password?: string) => {
    if (!password) password = "DefaultPassword123!";
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert("Erro ao fazer login. Verifique suas credenciais no Supabase.");
        console.error(error);
        return;
      }
      router.push("/dashboard");
    } else {
      const mockUser: User = { name: name || "Usuário Retornando", email, isOnboarded: true };
      syncToLocalAsFallback(mockUser);
      router.push("/dashboard");
    }
  };

  const register = async (name: string, email: string, password?: string) => {
    if (!password) password = "DefaultPassword123!";
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            isOnboarded: false,
          }
        }
      });
      if (error) {
        alert("Erro ao registrar no Supabase: " + error.message);
        console.error(error);
        return;
      }
      router.push("/onboarding");
    } else {
      const newUser: User = { name, email, isOnboarded: false };
      syncToLocalAsFallback(newUser);
      router.push("/onboarding");
    }
  };

  const completeOnboarding = (preferences: any) => {
    updateUserMetadata({ isOnboarded: true, preferences });
    router.push("/dashboard");
  };

  const logout = async () => {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem("nutrilia_user");
    router.push("/");
  };

  const connectAppleWatch = () => updateUserMetadata({ isAppleWatchConnected: true });
  const disconnectAppleWatch = () => updateUserMetadata({ isAppleWatchConnected: false });

  const toggleMeal = (mealId: string) => {
    if (user) {
      const currentMeals = user.recordedMeals || [];
      const isRecorded = currentMeals.includes(mealId);
      const newMeals = isRecorded 
        ? currentMeals.filter(m => m !== mealId) 
        : [...currentMeals, mealId];
      
      let updatedReminders = user.mealReminders;
      if (!isRecorded && user.mealReminders) {
        updatedReminders = user.mealReminders.map(reminder => 
          reminder.id === mealId ? { ...reminder, enabled: false } : reminder
        );
      }
      
      updateUserMetadata({ recordedMeals: newMeals, mealReminders: updatedReminders });
    }
  };

  const savePlan = (plan: any) => {
    if (user) {
      const currentPlans = user.savedPlans || [];
      const planWithId = { ...plan, id: Date.now().toString() };
      updateUserMetadata({ savedPlans: [...currentPlans, planWithId] });
    }
  };

  const removePlan = (planId: string) => {
    if (user) {
      const currentPlans = user.savedPlans || [];
      updateUserMetadata({ savedPlans: currentPlans.filter((p: any) => p.id !== planId) });
    }
  };

  const updateProfile = (data: Partial<User>) => {
    updateUserMetadata(data);
  };

  useEffect(() => {
    if (isLoaded) {
      if (pathname?.startsWith("/dashboard")) {
        if (!user) {
          router.push("/login");
        } else if (!user.isOnboarded && pathname !== "/onboarding") {
          // Allow routing on dashboard if onboarded
        }
      }
      
      if (pathname === "/onboarding") {
        if (!user) {
          router.push("/login");
        } else if (user.isOnboarded) {
          router.push("/dashboard");
        }
      }
    }
  }, [user, pathname, isLoaded, router]);

  return (
    <AuthContext.Provider value={{ 
      user, login, register, logout, completeOnboarding, 
      connectAppleWatch, disconnectAppleWatch, 
      toggleMeal, savePlan, removePlan, updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
