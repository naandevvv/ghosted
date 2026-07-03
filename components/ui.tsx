"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

export function Bouton({
  children,
  onClick,
  disabled = false,
  variant = "plein",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "plein" | "ghost" | "discret";
  className?: string;
}) {
  const styles = {
    plein:
      "bg-(--accent) text-nuit font-semibold shadow-[0_0_32px_-8px_var(--accent)] hover:brightness-110",
    ghost: "border border-white/20 text-plume hover:border-white/50 hover:bg-white/5",
    discret: "text-plume/50 hover:text-plume text-sm",
  } as const;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full px-7 py-3 transition duration-300 disabled:pointer-events-none disabled:opacity-40 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Acte({ numero, titre }: { numero: string; titre: string }) {
  return (
    <div className="animate-fade text-center">
      <p className="text-xs font-medium uppercase tracking-[0.35em] text-(--accent)">
        Acte {numero}
      </p>
      <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{titre}</h2>
    </div>
  );
}

export function Typewriter({
  text,
  onDone,
  speed = 24,
}: {
  text: string;
  onDone?: () => void;
  speed?: number;
}) {
  const reduced = useReducedMotion();
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

export function Etincelle({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`animate-scintille inline-block text-(--accent) ${className}`}>
      ✦
    </span>
  );
}
