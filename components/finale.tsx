"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Elle, Lui } from "@/components/characters";
import { Bubble, GameButton } from "@/components/ui";
import type { Plan } from "@/lib/plan";

const CLE_ENVOI = "plan-envoye";

type Statut = "vol" | "envoye" | "erreur";

export function Finale({ plan }: { plan: Plan }) {
  const [statut, setStatut] = useState<Statut>("vol");
  const demarreRef = useRef(false);

  const envoyer = useCallback(async () => {
    // Garde anti-double-envoi : si le plan est déjà parti, on ne renvoie jamais.
    if (window.localStorage.getItem(CLE_ENVOI) === "1") {
      setStatut("envoye");
      return;
    }
    setStatut("vol");
    const suspense = new Promise((r) => setTimeout(r, 2400));
    try {
      const [reponse] = await Promise.all([
        fetch("/api/plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(plan),
        }),
        suspense,
      ]);
      if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
      window.localStorage.setItem(CLE_ENVOI, "1");
      setStatut("envoye");
    } catch {
      setStatut("erreur");
    }
  }, [plan]);

  useEffect(() => {
    // Un seul envoi automatique, même si l'effet se rejoue.
    if (demarreRef.current) return;
    demarreRef.current = true;
    void envoyer();
  }, [envoyer]);

  if (statut === "vol") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <div className="relative h-40 w-full overflow-hidden">
          <span aria-hidden className="absolute left-1/2 top-1/2 animate-fly text-5xl">
            ✈️
          </span>
        </div>
        <p className="text-xl font-extrabold">Envoi du plan dans le vrai monde…</p>
        <p className="font-semibold text-encre/60">(oui oui, le vrai)</p>
      </div>
    );
  }

  if (statut === "erreur") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <span aria-hidden className="text-5xl">🌬️</span>
        <Bubble>Oups, l&apos;avion en papier s&apos;est pris un courant d&apos;air. On le relance ?</Bubble>
        <GameButton onClick={() => void envoyer()}>On renvoie ✈️</GameButton>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <div aria-hidden className="flex gap-1 text-3xl">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="animate-pop" style={{ animationDelay: `${i * 0.15}s` }}>
            ⭐
          </span>
        ))}
      </div>
      <p className="text-2xl font-extrabold">Mission accomplie, t&apos;as géré 😎</p>
      <div className="flex items-end justify-center">
        <Lui expression="sunglasses" className="w-28 sm:w-32" />
        <Elle expression="laugh" className="w-28 sm:w-32" />
      </div>
      <div className="w-full rounded-bubble bg-white p-4 text-left shadow-pop-menthe">
        <Ligne label="Quoi" valeur={plan.type} />
        <Ligne label="Ambiance" valeur={plan.ambiance} />
        <Ligne label="Où / détail" valeur={plan.lieu} />
        <Ligne label="Quand" valeur={plan.quand} />
      </div>
      <Bubble className="w-full">
        Le plan est parti pour de vrai ✈️ Garde un œil sur tes <strong>vrais</strong> messages ces
        prochains jours 👀
      </Bubble>
    </div>
  );
}

function Ligne({ label, valeur }: { label: string; valeur: string }) {
  return (
    <p className="border-b-2 border-coton py-2 font-semibold last:border-0">
      <span className="mr-2 text-sm font-extrabold uppercase text-encre/50">{label}</span>
      {valeur}
    </p>
  );
}
