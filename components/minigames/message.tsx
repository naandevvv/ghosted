"use client";

import { useState } from "react";
import { Bubble, Chip, GameButton, ScreenTitle } from "@/components/ui";

const DEBUTS = ["Coucou toi 👋", "Flash info ⚡", "Question très sérieuse :"] as const;

const FINS = [
  "j'ai un plan parfait qui te concerne. Tiens-toi prête 👀",
  "une soirée mémorable se prépare. Bloque ta soirée.",
  "t'es libre bientôt ? J'ai eu une idée de génie (comme d'hab).",
] as const;

export function MessageGame({ onWin }: { onWin: () => void }) {
  const [debut, setDebut] = useState<string | null>(null);
  const [fin, setFin] = useState<string | null>(null);
  const [valide, setValide] = useState(false);

  if (valide) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <span aria-hidden className="animate-pop text-5xl">
          ✍️
        </span>
        <Bubble>
          Chef-d&apos;œuvre enregistré. Il ne reste plus qu&apos;à l&apos;envoyer au bon moment…
        </Bubble>
        <GameButton onClick={onWin}>Évidemment →</GameButton>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-4">
      <ScreenTitle>Défi 2 — Le message</ScreenTitle>
      <Bubble>On lui écrit le message parfait. Choisis le début :</Bubble>
      <div className="flex flex-wrap justify-center gap-2">
        {DEBUTS.map((d) => (
          <Chip key={d} selected={debut === d} onClick={() => setDebut(d)}>
            {d}
          </Chip>
        ))}
      </div>
      {debut && (
        <>
          <Bubble className="animate-pop">…et la suite :</Bubble>
          <div className="flex flex-col items-stretch gap-2">
            {FINS.map((f) => (
              <Chip key={f} selected={fin === f} onClick={() => setFin(f)}>
                {f}
              </Chip>
            ))}
          </div>
        </>
      )}
      {debut && fin && (
        <div className="animate-pop rounded-bubble bg-menthe/40 p-3">
          <p className="mb-2 text-center text-sm font-bold text-encre/60">Aperçu 📱</p>
          <div className="ml-auto w-fit max-w-[85%] rounded-bubble rounded-br-sm bg-rose-vif px-4 py-2 font-semibold text-white">
            {debut} {fin}
          </div>
          <div className="mt-3 text-center">
            <GameButton variant="menthe" onClick={() => setValide(true)}>
              Garder ce chef-d&apos;œuvre ✉️
            </GameButton>
          </div>
        </div>
      )}
    </div>
  );
}
