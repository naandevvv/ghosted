"use client";

import { useState } from "react";
import { Bubble, Chip, GameButton, ScreenTitle, Toast, useToast } from "@/components/ui";
import { AMBIANCES, PLAN_TYPES, QUANDS, type Plan, type PlanType } from "@/lib/plan";

type Etape = "type" | "ambiance" | "lieu" | "quand" | "recap";

export function Planner({ onDone }: { onDone: (plan: Plan) => void }) {
  const [etape, setEtape] = useState<Etape>("type");
  const [type, setType] = useState<PlanType | null>(null);
  const [ambiance, setAmbiance] = useState<string | null>(null);
  const [lieu, setLieu] = useState("");
  const [quand, setQuand] = useState<string | null>(null);
  const [toast, montrerToast] = useToast();

  const validerLieu = () => {
    if (lieu.trim().length < 3) {
      montrerToast("Il me faut un vrai spot, précision de sniper 📍");
      return;
    }
    montrerToast("Noté 📍");
    setEtape("quand");
  };

  return (
    <div className="relative flex flex-1 flex-col justify-center gap-4">
      <ScreenTitle>✨ LE plan ✨</ScreenTitle>

      {etape === "type" && (
        <>
          <Bubble>Place au vrai boulot : on construit son plan. On part sur quoi ?</Bubble>
          <div className="grid grid-cols-2 gap-3">
            {PLAN_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setType(t);
                  montrerToast("Excellent choix ✨");
                  setEtape("ambiance");
                }}
                className="flex flex-col items-center gap-1 rounded-bubble bg-white p-4 font-bold shadow-pop-lilas transition active:translate-y-1 active:shadow-none"
              >
                <span aria-hidden className="text-4xl">
                  {t.emoji}
                </span>
                {t.label}
              </button>
            ))}
          </div>
        </>
      )}

      {etape === "ambiance" && (
        <>
          <Bubble>
            {type?.emoji} Très bon goût. Et l&apos;ambiance, on la veut comment ?
          </Bubble>
          <div className="flex flex-wrap justify-center gap-2">
            {AMBIANCES.map((a) => (
              <Chip
                key={a}
                selected={ambiance === a}
                onClick={() => {
                  setAmbiance(a);
                  montrerToast("Ambiance validée 💫");
                  setEtape("lieu");
                }}
              >
                {a}
              </Chip>
            ))}
          </div>
          <BoutonRetour onClick={() => setEtape("type")} />
        </>
      )}

      {etape === "lieu" && type && (
        <>
          <Bubble>{type.question}</Bubble>
          <input
            value={lieu}
            onChange={(e) => setLieu(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") validerLieu();
            }}
            placeholder={type.placeholder}
            maxLength={120}
            className="w-full rounded-bubble border-4 border-rose bg-white px-4 py-3 font-semibold outline-none placeholder:text-encre/40 focus:border-rose-vif"
          />
          <GameButton className="mx-auto" variant="menthe" onClick={validerLieu}>
            C&apos;est là 📍
          </GameButton>
          <BoutonRetour onClick={() => setEtape("ambiance")} />
        </>
      )}

      {etape === "quand" && (
        <>
          <Bubble>Et on programme ça pour quand ?</Bubble>
          <div className="flex flex-col items-center gap-2">
            {QUANDS.map((q) => (
              <Chip
                key={q}
                selected={quand === q}
                onClick={() => {
                  setQuand(q);
                  montrerToast("Agenda mis à jour 🗓️");
                  setEtape("recap");
                }}
              >
                {q}
              </Chip>
            ))}
          </div>
          <BoutonRetour onClick={() => setEtape("lieu")} />
        </>
      )}

      {etape === "recap" && type && ambiance && quand && (
        <>
          <Bubble>Le plan, version finale. Relis bien, après ça devient RÉEL 👀</Bubble>
          <div className="rounded-bubble bg-white p-4 shadow-pop-menthe">
            <Ligne label="Quoi" valeur={`${type.emoji} ${type.label}`} />
            <Ligne label="Ambiance" valeur={ambiance} />
            <Ligne label="Où / détail" valeur={lieu.trim()} />
            <Ligne label="Quand" valeur={quand} />
          </div>
          <GameButton
            className="mx-auto"
            onClick={() =>
              onDone({
                type: `${type.emoji} ${type.label}`,
                ambiance,
                lieu: lieu.trim(),
                quand,
              })
            }
          >
            Valider le plan ✅
          </GameButton>
          <BoutonRetour onClick={() => setEtape("quand")} />
        </>
      )}

      <Toast toast={toast} />
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

function BoutonRetour({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-auto font-bold text-encre/50 underline-offset-2 hover:underline"
    >
      ← revenir
    </button>
  );
}
