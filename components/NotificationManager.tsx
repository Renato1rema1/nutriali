"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function NotificationManager() {
  const { user } = useAuth();
  const notifiedRef = useRef<Record<string, string>>({}); // { mealId: dateString }

  useEffect(() => {
    if (!user || !user.mealReminders || user.mealReminders.length === 0) return;

    const checkReminders = () => {
      const now = new Date();
      const currentHour = now.getHours().toString().padStart(2, "0");
      const currentMinute = now.getMinutes().toString().padStart(2, "0");
      const currentTime = `${currentHour}:${currentMinute}`;
      const todayString = now.toDateString();

      user.mealReminders?.forEach((reminder) => {
        if (!reminder.enabled) return;

        // Check if current time matches reminder time (H:M)
        if (reminder.time === currentTime) {
          // Ensure we only notify once per day for this specific meal
          const lastNotifiedDate = notifiedRef.current[reminder.id];
          
          if (lastNotifiedDate !== todayString) {
            sendNotification(reminder.label);
            notifiedRef.current[reminder.id] = todayString;
            
            // Persist notified state to avoid duplicate on refresh if same minute
            localStorage.setItem(`last_notified_${user.email}_${reminder.id}`, todayString);
          }
        }
      });
    };

    const sendNotification = (mealLabel: string) => {
      if (!("Notification" in window)) return;

      if (Notification.permission === "granted") {
        new Notification("Hora de Comer! 🍎", {
          body: `Está na hora do seu ${mealLabel}. Não esqueça de registrar no Nutrilia!`,
          icon: "/icon.png",
          tag: `meal-${mealLabel}`, // Group notifications
          vibrate: [200, 100, 200]
        });
      }
    };

    // Initial check on load
    // Sync with localStorage
    user.mealReminders?.forEach(r => {
      const saved = localStorage.getItem(`last_notified_${user.email}_${r.id}`);
      if (saved) notifiedRef.current[r.id] = saved;
    });

    // Check every minute
    const interval = setInterval(checkReminders, 60000);
    
    // Also check immediately
    checkReminders();

    return () => clearInterval(interval);
  }, [user]);

  // This component doesn't render anything visible
  return null;
}
