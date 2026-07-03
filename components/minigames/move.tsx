"use client";

import { useEffect, useState } from "react";
import { Lui } from "@/components/characters";
import { Bubble, GameButton, ScreenTitle } from "@/components/ui";

const PADS = ["🕺", "💃", "🔥", "⭐"] as const;
const LONGUEUR_FINALE = 4;

type Mode = "pret" | "regarde" | "rejoue" | "rate" | "gagne";

function tire(): number {
  return Math.floor(Math.random() * PADS.length);
}

export function MoveGame({ onWin }: { onWin: () => void }) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [mode, setMode] = useState<Mode>("pret");
  const [surbrillance, setSurbrillance] = useState<number | null>(null);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (mode !== "regarde") return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    sequence.forEach((pad, i) => {
      timers.push(setTimeout(() => setSurbrillance(pad), 650 * i + 500));
      timers.push(setTimeout(() => setSurbrillance(null), 650 * i + 950));
    });
    timers.push(
      setTimeout(() => {
        setPosition(0);
        setMode("rejoue");
      }, 650 * sequence.length + 600),
    );
    return () => timers.forEach(clearTimeout);
  }, [mode, sequence]);

  function appuyer(i: number) {
    if (mode !== "rejoue") return;
    const attendu = sequence[position];
    if (attendu === undefined) return;
    if (i !== attendu) {
      setMode("rate");
      return;
    }
    const suivant = position + 1;
    if (suivant < sequence.length) {
      setPosition(suivant);
      return;
    }
    if (sequence.length >= LONGUEUR_FINALE) {
      setMode("gagne");
      return;
    }
    setSequence((s) => [...s, tire()]);
    setMode("regarde");
  }

  if (mode === "pret") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <ScreenTitle>Défi 5 — Le move</ScreenTitle>
        <Lui expression="wink" className="w-32 sm:w-40" />
        <Bubble>
          Dernier défi : la choré de la victoire. Regarde bien la séquence, puis rejoue-la !
        </Bubble>
        <GameButton
          onClick={() => {
            setSequence([tire(), tire()]);
            setMode("regarde");
          }}
        >
          Montre-moi 🎵
        </GameButton>
      </div>
    );
  }

  if (mode === "gagne") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <Lui expression="sunglasses" className="w-36 animate-pop sm:w-44" />
        <Bubble>Chorégraphie validée. Le dancefloor tremble encore.</Bubble>
        <GameButton onClick={onWin}>⭐ La suite</GameButton>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-4 text-center">
      <ScreenTitle>Défi 5 — Le move</ScreenTitle>
      <p className="font-bold text-encre/70">
        Choré {Math.min(sequence.length - 1, 3)}/3 ·{" "}
        {mode === "regarde" ? "Regarde bien… 👀" : mode === "rejoue" ? "À toi ! 🎵" : "Presque !"}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {PADS.map((emoji, i) => (
          <button
            key={emoji}
            type="button"
            disabled={mode !== "rejoue"}
            onClick={() => appuyer(i)}
            className={`flex h-24 items-center justify-center rounded-bubble text-5xl transition active:translate-y-1 active:shadow-none ${
              surbrillance === i
                ? "scale-105 bg-soleil shadow-pop"
                : "bg-white shadow-pop-lilas disabled:opacity-80"
            }`}
          >
            <span aria-hidden>{emoji}</span>
          </button>
        ))}
      </div>
      {mode === "rate" && (
        <div className="flex flex-col items-center gap-3">
          <p className="font-bold">Presque ! On la rejoue 🎵</p>
          <GameButton
            variant="lilas"
            onClick={() => {
              setPosition(0);
              setMode("regarde");
            }}
          >
            Revoir la choré 🔄
          </GameButton>
        </div>
      )}
    </div>
  );
}
