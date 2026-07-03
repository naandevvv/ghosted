"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

type ButtonVariant = "rose" | "lilas" | "menthe" | "blanc";

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  rose: "bg-rose-vif text-white shadow-[0_5px_0_0_#d94f8b]",
  lilas: "bg-lilas text-white shadow-[0_5px_0_0_#a87fe8]",
  menthe: "bg-menthe text-encre shadow-[0_5px_0_0_#5fc9a4]",
  blanc: "bg-white text-encre shadow-[0_5px_0_0_#f0d3e0]",
};

export function GameButton({
  children,
  onClick,
  disabled = false,
  variant = "rose",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full px-6 py-3 text-lg font-bold transition active:translate-y-1 active:shadow-none disabled:opacity-40 ${BUTTON_STYLES[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Chip({
  children,
  onClick,
  selected = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 font-bold transition active:translate-y-0.5 ${
        selected
          ? "bg-rose-vif text-white shadow-[0_4px_0_0_#d94f8b]"
          : "bg-white text-encre shadow-[0_4px_0_0_#f0d3e0]"
      }`}
    >
      {children}
    </button>
  );
}

export function Bubble({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-bubble bg-white px-5 py-4 text-center font-semibold shadow-pop-lilas ${className}`}
    >
      {children}
    </div>
  );
}

export function ScreenTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto w-fit rounded-full bg-lilas px-4 py-1 text-sm font-extrabold text-white shadow-[0_3px_0_0_#a87fe8]">
      {children}
    </p>
  );
}

export function StarBar({ earned, total = 5 }: { earned: number; total?: number }) {
  return (
    <div
      className="flex gap-1 rounded-full bg-white/60 px-3 py-1 text-sm"
      role="img"
      aria-label={`${earned} étoiles sur ${total}`}
    >
      {Array.from({ length: total }, (_, i) => (
        <span key={i} aria-hidden className={i < earned ? "animate-pop" : "opacity-30 grayscale"}>
          ⭐
        </span>
      ))}
    </div>
  );
}

const HEARTS = [
  { left: "6%", delay: "0s", duration: "6s", emoji: "💗" },
  { left: "22%", delay: "2.4s", duration: "7s", emoji: "💖" },
  { left: "45%", delay: "4.2s", duration: "6.5s", emoji: "💕" },
  { left: "68%", delay: "1.3s", duration: "7.5s", emoji: "💗" },
  { left: "86%", delay: "3.2s", duration: "6.2s", emoji: "💘" },
];

export function Hearts() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {HEARTS.map((h, i) => (
        <span
          key={i}
          className="absolute bottom-0 animate-rise text-xl opacity-0"
          style={{ left: h.left, animationDelay: h.delay, animationDuration: h.duration }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

export function Typewriter({
  text,
  onDone,
  speed = 26,
}: {
  text: string;
  onDone?: () => void;
  speed?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  });

  const done = reduced || count >= text.length;

  useEffect(() => {
    if (reduced || done) return;
    const id = setInterval(() => setCount((c) => Math.min(c + 1, text.length)), speed);
    return () => clearInterval(id);
  }, [text, speed, reduced, done]);

  useEffect(() => {
    if (done) doneRef.current?.();
  }, [done]);

  return <span>{reduced ? text : text.slice(0, count)}</span>;
}

export type ToastData = { id: number; text: string };

export function useToast(): [ToastData | null, (text: string) => void] {
  const [toast, setToast] = useState<ToastData | null>(null);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  return [toast, (text: string) => setToast({ id: Date.now(), text })];
}

export function Toast({ toast }: { toast: ToastData | null }) {
  if (!toast) return null;
  return (
    <div key={toast.id} className="pointer-events-none absolute inset-x-4 bottom-4 z-30 animate-pop">
      <p className="mx-auto w-fit rounded-full bg-encre px-5 py-2 text-center font-bold text-white">
        {toast.text}
      </p>
    </div>
  );
}

const COMPLIMENTS = [
  "Styliste de génie détectée 💅",
  "Plume légendaire ✍️",
  "Timing de sniper 🎯",
  "Répartie niveau légende 🎤",
  "Le dancefloor s'en souvient encore 🕺",
];

export function LevelClear({ level, onNext }: { level: number; onNext: () => void }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-bubble bg-coton/95 p-6 text-center">
      <span aria-hidden className="animate-pop text-6xl">
        ⭐
      </span>
      <p className="text-2xl font-extrabold">Niveau {level} réussi !</p>
      <p className="font-semibold text-encre/70">{COMPLIMENTS[level - 1] ?? "Trop fort ⭐"}</p>
      <GameButton onClick={onNext}>La suite →</GameButton>
    </div>
  );
}

export function ConsoleFrame({
  stars,
  children,
}: {
  stars: number;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md rounded-console bg-rose p-3 pb-5 shadow-pop sm:p-4 sm:pb-6">
      <div className="mb-2 flex items-center justify-between px-2 pt-1">
        <span aria-hidden className="text-xl">
          💘
        </span>
        <StarBar earned={stars} />
      </div>
      <div className="relative flex max-h-[80vh] min-h-[70vh] flex-col overflow-hidden rounded-bubble bg-coton sm:min-h-[560px]">
        <Hearts />
        <div className="relative z-10 flex flex-1 flex-col overflow-y-auto p-4 sm:p-5">
          {children}
        </div>
      </div>
      <div aria-hidden className="mt-4 flex items-center justify-between px-6">
        <div className="h-8 w-8 rounded-full bg-rose-vif/70 shadow-[0_3px_0_0_#d94f8b]" />
        <div className="flex gap-2">
          <div className="h-4 w-10 rounded-full bg-lilas/80" />
          <div className="h-4 w-10 rounded-full bg-menthe/80" />
        </div>
      </div>
    </div>
  );
}
