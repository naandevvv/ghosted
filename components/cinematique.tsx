"use client";

import { useEffect, useState } from "react";
import { LIGNES_CINEMATIQUE, TITRE } from "@/lib/contenu";
import { Bouton, Etincelle, useReducedMotion } from "@/components/ui";

export function Cinematique({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const auTitre = index >= LIGNES_CINEMATIQUE.length;

  useEffect(() => {
    if (auTitre) return;
    const duree = reduced ? 2200 : 3600;
    const id = setTimeout(() => setIndex((i) => i + 1), duree);
    return () => clearTimeout(id);
  }, [index, auTitre, reduced]);

  const ligne = LIGNES_CINEMATIQUE[index];

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      {!auTitre && ligne && (
        <p
          key={index}
          className={`max-w-md font-display text-2xl leading-relaxed text-plume/90 sm:text-3xl ${
            reduced ? "" : "animate-carton"
          }`}
        >
          {ligne}
        </p>
      )}

      {auTitre && (
        <div className="flex flex-col items-center gap-8">
          <div className="animate-fade-up">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.5em] text-plume/50">
              une production rien que pour toi
            </p>
            <h1 className="font-display text-5xl font-bold tracking-wide sm:text-6xl">
              {TITRE.toUpperCase()}
            </h1>
            <p className="mt-4 text-plume/60">
              <Etincelle /> séance unique <Etincelle />
            </p>
          </div>
          <Bouton onClick={onDone} className="animate-fade-up [animation-delay:0.6s]">
            Entrer ✦
          </Bouton>
        </div>
      )}

      {!auTitre && (
        <div className="absolute bottom-8 right-8">
          <Bouton variant="discret" onClick={() => setIndex(LIGNES_CINEMATIQUE.length)}>
            passer l&apos;intro →
          </Bouton>
        </div>
      )}
    </div>
  );
}
