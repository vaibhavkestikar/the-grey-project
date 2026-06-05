"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

type Props = {
  targetDate: string;
  className?: string;
};

export default function CountdownTimer({ targetDate, className = "" }: Props) {
  const target = new Date(targetDate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calcTimeLeft(target)
  );

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (timeLeft.expired) {
    return (
      <p className={`text-center text-sm font-bold uppercase tracking-widest text-amber-300 ${className}`}>
        Launching very soon. Grab your spot now
      </p>
    );
  }

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <div className={`grid grid-cols-4 gap-2 sm:gap-3 ${className}`}>
      {units.map(({ value, label }) => (
        <div
          key={label}
          className="rounded-2xl border border-white/20 bg-white/10 px-2 py-3 text-center backdrop-blur sm:px-4 sm:py-4"
        >
          <p className="text-2xl font-black tabular-nums text-white sm:text-4xl">
            {String(value).padStart(2, "0")}
          </p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-amber-200 sm:text-xs">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
