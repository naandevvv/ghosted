"use client";

import { useState } from "react";
import { Lui, type LuiExpression } from "@/components/characters";
import { Bubble, GameButton, ScreenTitle } from "@/components/ui";

type Style = {
  emoji: string;
  label: string;
  punchline: string;
  expression: LuiExpression;
};

const STYLES: readonly Style[] = [
  {
    emoji: "😎",
    label: "Décontracté",
    punchline: "Simple. Efficace. Le charme fait le reste.",
    expression: "cool",
  },
  {
    emoji: "🤵",
    label: "Élégant",
    punchline: "Classe absolue. Les miroirs vont applaudir.",
    expression: "smirk",
  },
  {
    emoji: "🏀",
    label: "Sportif",
    punchline: "Souple, rapide, disponible. Comme mes vannes.",
    expression: "wink",
  },
  {
    emoji: "✨",
    label: "Mode charme",
    punchline: "Réglage charme : MAXIMUM. Sortez les lunettes.",
    expression: "sunglasses",
  },
];

export function StyleGame({ onWin }: { onWin: () => void }) {
  const [choix, setChoix] = useState<Style | null>(null);

  if (choix) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <Lui expression={choix.expression} className="w-36 animate-pop sm:w-44" />
        <Bubble>« {choix.punchline} »</Bubble>
        <GameButton onClick={onWin}>Nickel →</GameButton>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-5">
      <ScreenTitle>Défi 1 — Le style</ScreenTitle>
      <Bubble>Grande occasion en approche. On lui met quoi ?</Bubble>
      <div className="grid grid-cols-2 gap-3">
        {STYLES.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setChoix(s)}
            className="flex flex-col items-center gap-1 rounded-bubble bg-white p-4 font-bold shadow-pop-lilas transition active:translate-y-1 active:shadow-none"
          >
            <span aria-hidden className="text-4xl">
              {s.emoji}
            </span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
