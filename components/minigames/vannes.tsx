"use client";

import { useEffect, useState } from "react";
import { Lui } from "@/components/characters";
import { Bubble, GameButton, ScreenTitle } from "@/components/ui";

const MANCHES = [
  {
    vanne: "Je te préviens : niveau répartie, je suis champion régional.",
    repliques: [
      "Régional ? Mignon. Moi c'est intergalactique.",
      "Champion régional ? Je signe des autographes après.",
      "Parfait. J'adore battre les champions.",
    ],
    reaction: "…Ok. Respect. 😏",
  },
  {
    vanne: "Avoue, tu répètes tes punchlines devant le miroir.",
    repliques: [
      "Le miroir a demandé un rappel.",
      "Non, lui, il applaudit tout seul.",
      "Jaloux ? Je peux te coacher.",
    ],
    reaction: "Bon. J'ai trouvé mon égale. 😎",
  },
] as const;

const DUREE_MS = 8000;

type Etat = "joue" | "trop-tard" | "reaction";

export function VannesGame({ onWin }: { onWin: () => void }) {
  const [manche, setManche] = useState(0);
  const [etat, setEtat] = useState<Etat>("joue");
  const [tempsRestant, setTempsRestant] = useState(100);

  useEffect(() => {
    if (etat !== "joue") return;
    const depart = Date.now();
    const id = setInterval(() => {
      const reste = Math.max(0, 100 - ((Date.now() - depart) / DUREE_MS) * 100);
      setTempsRestant(reste);
      if (reste <= 0) setEtat("trop-tard");
    }, 100);
    return () => clearInterval(id);
  }, [etat, manche]);

  const actuelle = MANCHES[manche];
  if (!actuelle) return null;
  const derniere = manche >= MANCHES.length - 1;

  if (etat === "trop-tard") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <span aria-hidden className="text-5xl">⏰</span>
        <Bubble>Le chrono a filé ! Une bonne vanne mérite un deuxième essai 😄</Bubble>
        <GameButton
          variant="lilas"
          onClick={() => {
            setTempsRestant(100);
            setEtat("joue");
          }}
        >
          On la refait 🔄
        </GameButton>
      </div>
    );
  }

  if (etat === "reaction") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <Lui expression={derniere ? "sunglasses" : "smirk"} className="w-36 animate-pop sm:w-44" />
        <Bubble>« {actuelle.reaction} »</Bubble>
        {derniere ? (
          <GameButton onClick={onWin}>⭐ Victoire</GameButton>
        ) : (
          <GameButton
            onClick={() => {
              setManche((m) => m + 1);
              setTempsRestant(100);
              setEtat("joue");
            }}
          >
            Manche 2 🎤
          </GameButton>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-4">
      <ScreenTitle>Défi 4 — La battle de vannes</ScreenTitle>
      <div className="flex items-end gap-3">
        <Lui expression="smirk" className="w-20 shrink-0" />
        <Bubble className="flex-1 text-left">« {actuelle.vanne} »</Bubble>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-white">
        <div className="h-full rounded-full bg-soleil" style={{ width: `${tempsRestant}%` }} />
      </div>
      <p className="text-center text-sm font-bold text-encre/60">Ta réplique, vite ! ⚡</p>
      <div className="flex flex-col gap-2">
        {actuelle.repliques.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setEtat("reaction")}
            className="rounded-bubble bg-white px-4 py-3 text-left font-bold shadow-pop-lilas transition active:translate-y-1 active:shadow-none"
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}
