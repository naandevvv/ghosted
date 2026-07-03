"use client";

import { useState } from "react";
import { Lui } from "@/components/characters";
import { Bubble, GameButton, Typewriter } from "@/components/ui";

const TEXTE_NARRATEUR =
  "Salut toi ✨ Merci de venir à la rescousse. Le programme : 5 petits défis pour réveiller son inspiration, puis LE plan parfait à construire. Toi, tu décides de tout. Lui, il exécute. Prête ?";

export function Intro({ onDone }: { onDone: () => void }) {
  const [etape, setEtape] = useState<"scene" | "narrateur">("scene");
  const [texteFini, setTexteFini] = useState(false);

  if (etape === "scene") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <div className="relative">
          <Lui expression="thinking" className="w-36 animate-wobble sm:w-44" />
          <span aria-hidden className="absolute -right-10 -top-6 animate-float text-4xl">
            💭
          </span>
          <span aria-hidden className="absolute -right-3 -top-12 text-2xl">
            🤔
          </span>
        </div>
        <Bubble>
          Lui, d&apos;habitude, il déborde d&apos;idées. Mais là, il doit préparer un truc pour{" "}
          <strong>quelqu&apos;un de spécial</strong>… et son inspiration est partie en pause café.
        </Bubble>
        <GameButton onClick={() => setEtape("narrateur")}>Je vais l&apos;aider !</GameButton>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <span aria-hidden className="animate-float text-5xl">
        🧚
      </span>
      <Bubble className="min-h-36 w-full text-left">
        <Typewriter text={TEXTE_NARRATEUR} onDone={() => setTexteFini(true)} />
      </Bubble>
      {texteFini && (
        <GameButton onClick={onDone} className="animate-pop">
          C&apos;est parti ⭐
        </GameButton>
      )}
    </div>
  );
}
