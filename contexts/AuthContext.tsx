"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  name: string;
  email: string;
  isOnboarded: boolean;
  preferences?: any;
  isAppleWatchConnected?: boolean;
  recordedMeals?: string[];
  savedPlans?: any[];
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  completeOnboarding: (preferences: any) => void;
  connectAppleWatch: () => void;
  disconnectAppleWatch: () => void;
  toggleMeal: (mealId: string) => void;
  savePlan: (plan: any) => void;
  removePlan: (planId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedUser = localStorage.getItem("nutrilia_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoaded(true);
  }, []);

  const login = (name: string, email: string) => {
    const db = JSON.parse(localStorage.getItem("nutrilia_users_db") || "{}");
    const existingUser = db[email];
    
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem("nutrilia_user", JSON.stringify(existingUser));
      router.push("/dashboard");
    } else {
      // If user not found, treat as new or just let them in with basic info
      const mockUser: User = { name: name || "Usuário Retornando", email, isOnboarded: false };
      setUser(mockUser);
      localStorage.setItem("nutrilia_user", JSON.stringify(mockUser));
      db[email] = mockUser;
      localStorage.setItem("nutrilia_users_db", JSON.stringify(db));
      router.push("/onboarding");
    }
  };

  const register = (name: string, email: string) => {
    const db = JSON.parse(localStorage.getItem("nutrilia_users_db") || "{}");
    const existingUser = db[email];
    
    if (existingUser && existingUser.isOnboarded) {
      // Already registered and onboarded
      setUser(existingUser);
      localStorage.setItem("nutrilia_user", JSON.stringify(existingUser));
      router.push("/dashboard");
    } else {
      const newUser: User = { name, email, isOnboarded: false };
      setUser(newUser);
      localStorage.setItem("nutrilia_user", JSON.stringify(newUser));
      db[email] = newUser;
      localStorage.setItem("nutrilia_users_db", JSON.stringify(db));
      router.push("/onboarding");
    }
  };

  const completeOnboarding = (preferences: any) => {
    if (user) {
      const updatedUser = { ...user, isOnboarded: true, preferences };
      setUser(updatedUser);
      localStorage.setItem("nutrilia_user", JSON.stringify(updatedUser));
      
      // update db
      const db = JSON.parse(localStorage.getItem("nutrilia_users_db") || "{}");
      db[user.email] = updatedUser;
      localStorage.setItem("nutrilia_users_db", JSON.stringify(db));
      
      router.push("/dashboard");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nutrilia_user");
    router.push("/");
  };

  const connectAppleWatch = () => {
    if (user) {
      const updatedUser = { ...user, isAppleWatchConnected: true };
      setUser(updatedUser);
      localStorage.setItem("nutrilia_user", JSON.stringify(updatedUser));
      const db = JSON.parse(localStorage.getItem("nutrilia_users_db") || "{}");
      db[user.email] = updatedUser;
      localStorage.setItem("nutrilia_users_db", JSON.stringify(db));
    }
  };

  const disconnectAppleWatch = () => {
    if (user) {
      const updatedUser = { ...user, isAppleWatchConnected: false };
      setUser(updatedUser);
      localStorage.setItem("nutrilia_user", JSON.stringify(updatedUser));
      const db = JSON.parse(localStorage.getItem("nutrilia_users_db") || "{}");
      db[user.email] = updatedUser;
      localStorage.setItem("nutrilia_users_db", JSON.stringify(db));
    }
  };

  const toggleMeal = (mealId: string) => {
    if (user) {
      const currentMeals = user.recordedMeals || [];
      const isRecorded = currentMeals.includes(mealId);
      const newMeals = isRecorded 
        ? currentMeals.filter(m => m !== mealId) 
        : [...currentMeals, mealId];
      
      const updatedUser = { ...user, recordedMeals: newMeals };
      setUser(updatedUser);
      localStorage.setItem("nutrilia_user", JSON.stringify(updatedUser));
      const db = JSON.parse(localStorage.getItem("nutrilia_users_db") || "{}");
      db[user.email] = updatedUser;
      localStorage.setItem("nutrilia_users_db", JSON.stringify(db));
    }
  };

  const savePlan = (plan: any) => {
    if (user) {
      const currentPlans = user.savedPlans || [];
      const planWithId = { ...plan, id: Date.now().toString() };
      const updatedUser = { ...user, savedPlans: [...currentPlans, planWithId] };
      setUser(updatedUser);
      localStorage.setItem("nutrilia_user", JSON.stringify(updatedUser));
      const db = JSON.parse(localStorage.getItem("nutrilia_users_db") || "{}");
      db[user.email] = updatedUser;
      localStorage.setItem("nutrilia_users_db", JSON.stringify(db));
    }
  };

  const removePlan = (planId: string) => {
    if (user) {
      const currentPlans = user.savedPlans || [];
      const updatedUser = { ...user, savedPlans: currentPlans.filter((p: any) => p.id !== planId) };
      setUser(updatedUser);
      localStorage.setItem("nutrilia_user", JSON.stringify(updatedUser));
      const db = JSON.parse(localStorage.getItem("nutrilia_users_db") || "{}");
      db[user.email] = updatedUser;
      localStorage.setItem("nutrilia_users_db", JSON.stringify(db));
    }
  };

  // Basic protection: if we go to dashboard without login
  useEffect(() => {
    if (isLoaded) {
      if (pathname?.startsWith("/dashboard")) {
        if (!user) {
          router.push("/login");
        } else if (!user.isOnboarded) {
          router.push("/onboarding");
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
    <AuthContext.Provider value={{ user, login, register, logout, completeOnboarding, connectAppleWatch, disconnectAppleWatch, toggleMeal, savePlan, removePlan }}>
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
