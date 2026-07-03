"use client";

import { useEffect, useState } from "react";
import { Elle } from "@/components/characters";
import { Bubble, GameButton, ScreenTitle, usePrefersReducedMotion } from "@/components/ui";

const ZONE_MIN = 36;
const ZONE_MAX = 64;

type Etat = "vise" | "rate" | "touche" | "reaction";

export function EnvoiGame({ onWin }: { onWin: () => void }) {
  const [etat, setEtat] = useState<Etat>("vise");
  const [pos, setPos] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (etat !== "vise") return;
    const vitesse = reduced ? 0.3 : 0.75; // allers-retours par seconde
    let raf = 0;
    const depart = performance.now();
    const boucle = (t: number) => {
      const x = (((t - depart) / 1000) * vitesse * 2) % 2;
      setPos((x < 1 ? x : 2 - x) * 100);
      raf = requestAnimationFrame(boucle);
    };
    raf = requestAnimationFrame(boucle);
    return () => cancelAnimationFrame(raf);
  }, [etat, reduced]);

  if (etat === "touche") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <span aria-hidden className="animate-pop text-5xl">
          🎯
        </span>
        <Bubble>TIMING DE SNIPER. Le message est parti.</Bubble>
        <GameButton onClick={() => setEtat("reaction")}>Et maintenant… 👀</GameButton>
      </div>
    );
  }

  if (etat === "reaction") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <Elle expression="smile" className="w-36 animate-pop sm:w-44" />
        <Bubble>
          ✓✓ Vu à l&apos;instant… <strong>et elle sourit 😊</strong>
        </Bubble>
        <GameButton onClick={onWin}>⭐ Continuer</GameButton>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-5 text-center">
      <ScreenTitle>Défi 3 — L&apos;envoi parfait</ScreenTitle>
      <Bubble>
        Le message est prêt. Appuie sur <strong>ENVOYER</strong> pile quand le curseur est dans la
        zone verte !
      </Bubble>
      <div className="relative h-8 w-full overflow-hidden rounded-full bg-white shadow-[inset_0_2px_6px_rgba(107,74,92,0.2)]">
        <div
          className="absolute inset-y-0 bg-menthe"
          style={{ left: `${ZONE_MIN}%`, width: `${ZONE_MAX - ZONE_MIN}%` }}
        />
        <div
          className="absolute inset-y-1 w-2.5 -translate-x-1/2 rounded-full bg-rose-vif"
          style={{ left: `${pos}%` }}
        />
      </div>
      {etat === "rate" ? (
        <div className="flex flex-col items-center gap-3">
          <p className="font-bold">Ouh, presque ! Le wifi a tremblé 😄</p>
          <GameButton variant="lilas" onClick={() => setEtat("vise")}>
            On refait 🔄
          </GameButton>
        </div>
      ) : (
        <GameButton
          className="mx-auto"
          onClick={() => setEtat(pos >= ZONE_MIN && pos <= ZONE_MAX ? "touche" : "rate")}
        >
          ENVOYER 📨
        </GameButton>
      )}
    </div>
  );
}
