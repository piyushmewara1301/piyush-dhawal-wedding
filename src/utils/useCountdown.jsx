// utils/useCountdown.js (or inside same file at top)
import { useEffect, useState } from "react";

export function useCountdown(targetISO) {
  const [time, setTime] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  useEffect(() => {
    const target = new Date(targetISO).getTime();
    const id = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTime({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        clearInterval(id);
        return;
      }

      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      );
      const hours = String(
        Math.floor((diff / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((diff / (1000 * 60)) % 60)
      ).padStart(2, "0");
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(id);
  }, [targetISO]);

  return time;
}