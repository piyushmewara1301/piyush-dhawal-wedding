import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ComingSoon = () => {
  // COUNTDOWN TARGET
  const targetDate = new Date('2026-02-10T23:00:00+05:30'); // Wedding Start

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date();
    const diff = targetDate - now;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#fef7e9] text-[#5a4328] px-6 relative overflow-hidden">

      {/* Floating golden sparkles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-[#d8b887] rounded-full blur-sm"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.2,
              scale: 0.6,
            }}
            animate={{
              y: "-20vh",
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 6 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mb-8"
      >
       <img
        src="/piyush-dhawal-wedding/images/new-logo.jpeg"
        alt="Wedding Logo"
        className="w-40 h-40"
        />
      </motion.div>

      {/* Heading */}
      <motion.h1
  className="relative ext-5xl md:text-6xl font-[Great_Vibes] text-center text-[#a47c48]"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  Piyush ❤️ Dhawal

  {/* Shine effect */}
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_2.5s_ease-in-out_infinite]" />
</motion.h1>

<style>
{`
@keyframes shine {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(100%); }
}
`}
</style>

      <p className="mt-3 text-lg md:text-xl opacity-90 text-center">
        Our wedding website is coming soon!
      </p>

      {/* Countdown */}
      <motion.div
        className="mt-10 grid grid-cols-4 gap-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
          const values = [
            timeLeft.days,
            timeLeft.hours,
            timeLeft.minutes,
            timeLeft.seconds,
          ];

          return (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-bold text-[#c19a6b]">
                {String(values[i]).padStart(2, "0")}
              </div>
              <div className="mt-1 text-sm tracking-wide text-[#7a5e3c]">
                {label}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Bottom text */}
    <motion.div
  className="mt-12 text-center"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1 }}
>
  <motion.p
    className="text-[#a47c48] text-sm md:text-lg"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1 }}
  >
    Save the Dates · February 9–10, 2026 · Pushkar
  </motion.p>

  <motion.div
    className="mx-auto mt-2 w-32 h-[2px] bg-[#d6b98d] rounded-full"
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1.2, ease: "easeOut", delay: 1.2 }}
  />
</motion.div>


    </section>
  );
};

export default ComingSoon;