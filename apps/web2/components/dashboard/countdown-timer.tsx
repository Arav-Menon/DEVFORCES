"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
}

export function CountdownTimer({ targetDate, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      };
    };

    setTimeLeft(calc());
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const blocks = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hrs" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" },
  ];

  return (
    <div className={`flex gap-3 ${className}`}>
      {blocks.map((b, i) => (
        <div key={b.label} className="flex flex-col items-center">
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 min-w-[52px] text-center">
            <span className="text-2xl font-bold text-white tabular-nums">
              {String(b.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs text-zinc-500 mt-1">{b.label}</span>
          {i < blocks.length - 1 && (
            <span className="absolute -right-2 top-2 text-zinc-600 text-lg font-bold hidden">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
