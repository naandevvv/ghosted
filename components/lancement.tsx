"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bouton, useReducedMotion } from "@/components/ui";
import type { Plan } from "@/lib/plan";

const CLE_ENVOI = "grand-soir-envoye";

type Statut = "transmission" | "envoye" | "erreur";

export function Lancement({ plan }: { plan: Plan }) {
  const [statut, setStatut] = useState<Statut>("transmission");
  const demarreRef = useRef(false);
  const reduced = useReducedMotion();

  const envoyer = useCallback(async () => {
    // Garde anti-double-envoi : si le plan est déjà parti, on ne renvoie jamais.
    if (window.localStorage.getItem(CLE_ENVOI) === "1") {
      setStatut("envoye");
      return;
    }
    setStatut("transmission");
    const suspense = new Promise((r) => setTimeout(r, 2800));
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
    if (demarreRef.current) return;
    demarreRef.current = true;
    void envoyer();
  }, [envoyer]);

  if (statut === "transmission") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-8 text-center">
        <div className="relative h-32 w-64">
          <span
            aria-hidden
            className={`absolute left-1/2 top-1/2 text-3xl text-(--accent) ${
              reduced ? "animate-lueur" : "animate-comete"
            }`}
          >
            ✦
          </span>
        </div>
        <p className="animate-lueur font-display text-2xl">Transmission vers le monde réel…</p>
        <p className="text-sm text-plume/50">ton plan quitte l&apos;écran</p>
      </div>
    );
  }

  if (statut === "erreur") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
        <span aria-hidden className="text-4xl">🌫️</span>
        <p className="max-w-sm font-display text-2xl leading-relaxed">
          La transmission s&apos;est perdue entre deux étoiles.
        </p>
        <p className="text-plume/60">Rien n&apos;est parti — on peut la relancer sans risque.</p>
        <Bouton onClick={() => void envoyer()}>Relancer la transmission ✦</Bouton>
      </div>
    );
  }

  const credits: readonly [string, string][] = [
    ["Idée originale", "lui"],
    ["Direction artistique", "toi"],
    ["Ambiance", plan.ambiance],
    ["Scénario", plan.scenario],
    ["Décor", plan.lieu],
    ["Première", plan.quand],
    ["Production", "vous deux"],
  ];

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-16 text-center">
      <div className="animate-fade-up">
        <p className="text-xs font-medium uppercase tracking-[0.5em] text-(--accent)">
          c&apos;est envoyé — pour de vrai
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold">Générique</h2>
      </div>

      <dl className="w-full max-w-sm">
        {credits.map(([role, nom], i) => (
          <div
            key={role}
            className="animate-fade-up flex items-baseline justify-between gap-6 border-b border-white/10 py-3 last:border-0"
            style={{ animationDelay: `${0.4 + i * 0.35}s` }}
          >
            <dt className="shrink-0 text-xs font-medium uppercase tracking-[0.2em] text-plume/50">
              {role}
            </dt>
            <dd className="text-right font-display text-lg">{nom}</dd>
          </div>
        ))}
      </dl>

      <div
        className="animate-fade-up max-w-sm space-y-3"
        style={{ animationDelay: `${0.4 + credits.length * 0.35 + 0.4}s` }}
      >
        <p className="font-display text-xl italic text-plume/90">
          La suite se joue hors écran.
        </p>
        <p className="text-plume/60">
          Garde un œil sur tes vrais messages ces prochains jours 💌
        </p>
      </div>
    </div>
  );
}
