"use client";

import { useState } from "react";
import { CielEtoile } from "@/components/ciel";
import { Cinematique } from "@/components/cinematique";
import { Lancement } from "@/components/lancement";
import { Acte, Bouton, Etincelle, Typewriter, useReducedMotion } from "@/components/ui";
import {
  AMBIANCES,
  QUANDS,
  SCENARIOS,
  TEXTE_BRIEF,
  type Ambiance,
  type Scenario,
} from "@/lib/contenu";
import type { Plan } from "@/lib/plan";

type Phase = "cine" | "brief" | "ambiance" | "scenario" | "details" | "recap" | "envoi";

const CIEL_DEFAUT: readonly [string, string] = ["#14101f", "#221a38"];

export function Experience() {
  const [phase, setPhase] = useState<Phase>("cine");
  const [ambiance, setAmbiance] = useState<Ambiance | null>(null);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [lieu, setLieu] = useState("");
  const [quand, setQuand] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [erreurLieu, setErreurLieu] = useState(false);
  const [retourRecap, setRetourRecap] = useState(false);
  const reduced = useReducedMotion();

  const avancer = (suite: Phase) => {
    setPhase(retourRecap ? "recap" : suite);
    setRetourRecap(false);
  };

  const modifier = (cible: Phase) => {
    setRetourRecap(true);
    setPhase(cible);
  };

  const validerDetails = () => {
    if (lieu.trim().length < 3 || !quand) {
      setErreurLieu(true);
      return;
    }
    setErreurLieu(false);
    avancer("recap");
  };

  const plan: Plan | null =
    ambiance && scenario && quand && lieu.trim().length >= 3
      ? {
          ambiance: `${ambiance.emoji} ${ambiance.nom}`,
          scenario: `${scenario.emoji} ${scenario.titre}`,
          lieu: lieu.trim(),
          quand,
          note: note.trim(),
        }
      : null;

  const ciel = ambiance?.ciel ?? CIEL_DEFAUT;

  return (
    <main
      className="relative flex min-h-dvh flex-1 flex-col overflow-hidden"
      style={{ "--accent": ambiance?.accent ?? "#ffb3c6" } as React.CSSProperties}
    >
      {/* Ciel : un calque par ambiance, fondu croisé */}
      <div
        aria-hidden
        className="absolute inset-0 transition-[background] duration-1000"
        style={{ background: `linear-gradient(180deg, ${ciel[0]} 0%, ${ciel[1]} 100%)` }}
      />
      {AMBIANCES.map((a) => (
        <div
          key={a.id}
          aria-hidden
          className="absolute inset-0 transition-opacity duration-[1400ms]"
          style={{
            opacity: ambiance?.id === a.id ? 1 : 0,
            background: `linear-gradient(180deg, ${a.ciel[0]} 0%, ${a.ciel[1]} 100%)`,
          }}
        />
      ))}
      <CielEtoile />

      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-1 flex-col px-5 py-10">
        {phase !== "cine" && phase !== "envoi" && (
          <ProgressionActes phase={phase} />
        )}

        {phase === "cine" && <Cinematique onDone={() => setPhase("brief")} />}

        {phase === "brief" && (
          <section key="brief" className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
            <Etincelle className="text-3xl" />
            <p className="min-h-40 max-w-md font-display text-xl leading-relaxed text-plume/90 sm:text-2xl">
              <Typewriter text={TEXTE_BRIEF} speed={reduced ? 0 : 22} />
            </p>
            <Bouton onClick={() => setPhase("ambiance")}>
              Compris. On compose →
            </Bouton>
          </section>
        )}

        {phase === "ambiance" && (
          <section key="ambiance" className="animate-fade-up flex flex-1 flex-col justify-center gap-8">
            <Acte numero="I" titre="La couleur de la soirée" />
            <p className="text-center text-plume/60">
              Choisis une ambiance — regarde le ciel, il t&apos;écoute.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {AMBIANCES.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAmbiance(a)}
                  className={`rounded-3xl border p-5 text-left transition duration-500 ${
                    ambiance?.id === a.id
                      ? "border-(--accent) bg-white/10 shadow-[0_0_40px_-12px_var(--accent)]"
                      : "border-white/10 bg-white/5 hover:border-white/30"
                  }`}
                >
                  <span aria-hidden className="text-2xl">
                    {a.emoji}
                  </span>
                  <p className="mt-2 font-display text-xl">{a.nom}</p>
                </button>
              ))}
            </div>
            {ambiance && (
              <div className="animate-fade-up flex flex-col items-center gap-5 text-center">
                <p className="font-display text-lg italic text-plume/80">
                  « {ambiance.phrase} »
                </p>
                <Bouton onClick={() => avancer("scenario")}>C&apos;est cette couleur →</Bouton>
              </div>
            )}
          </section>
        )}

        {phase === "scenario" && (
          <section key="scenario" className="animate-fade-up flex flex-1 flex-col justify-center gap-8">
            <Acte numero="II" titre="Le scénario" />
            <p className="text-center text-plume/60">
              Quatre films possibles ce soir-là. Un seul passera à l&apos;écran.
            </p>
            <div className="flex flex-col gap-3">
              {SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setScenario(s)}
                  className={`rounded-3xl border p-5 text-left transition duration-500 ${
                    scenario?.id === s.id
                      ? "border-(--accent) bg-white/10 shadow-[0_0_40px_-12px_var(--accent)]"
                      : "border-white/10 bg-white/5 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span aria-hidden className="text-xl">
                      {s.emoji}
                    </span>
                    <p className="font-display text-xl">{s.titre}</p>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-plume/60">{s.pitch}</p>
                </button>
              ))}
            </div>
            {scenario && (
              <div className="animate-fade-up text-center">
                <Bouton onClick={() => avancer("details")}>On tourne celui-là →</Bouton>
              </div>
            )}
          </section>
        )}

        {phase === "details" && scenario && (
          <section key="details" className="animate-fade-up flex flex-1 flex-col justify-center gap-6">
            <Acte numero="III" titre="Les coordonnées" />
            <p className="text-center text-plume/60">
              Dernier acte. Sois précise : ce que tu écris ici lui sera transmis tel quel,
              et il exécutera <em>à la lettre</em>.
            </p>

            <label className="block">
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-(--accent)">
                {scenario.question}
              </span>
              <input
                value={lieu}
                onChange={(e) => setLieu(e.target.value)}
                placeholder={scenario.placeholder}
                maxLength={140}
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-plume outline-none transition placeholder:text-plume/30 focus:border-(--accent)"
              />
              {erreurLieu && lieu.trim().length < 3 && (
                <span className="mt-2 block text-sm text-blush">
                  Il lui faut un vrai point de départ ✦ sois plus précise.
                </span>
              )}
            </label>

            <div>
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-(--accent)">
                La première a lieu…
              </span>
              <div className="flex flex-wrap gap-2">
                {QUANDS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuand(q)}
                    className={`rounded-full border px-5 py-2.5 transition ${
                      quand === q
                        ? "border-(--accent) bg-white/10 text-plume"
                        : "border-white/15 bg-white/5 text-plume/70 hover:border-white/35"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
              {erreurLieu && !quand && (
                <span className="mt-2 block text-sm text-blush">Choisis un moment ✦</span>
              )}
            </div>

            <label className="block">
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-plume/50">
                Un mot pour lui — optionnel, il partira dans le message
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="ce que tu veux qu'il lise…"
                maxLength={280}
                rows={2}
                className="w-full resize-none rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-plume outline-none transition placeholder:text-plume/30 focus:border-(--accent)"
              />
            </label>

            <div className="text-center">
              <Bouton onClick={validerDetails}>Voir l&apos;avant-première →</Bouton>
            </div>
          </section>
        )}

        {phase === "recap" && plan && (
          <section key="recap" className="animate-fade-up flex flex-1 flex-col items-center justify-center gap-6 text-center">
            <ConstellationCoeur />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-(--accent)">
                avant-première
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold">Votre soirée</h2>
            </div>
            <dl className="w-full max-w-sm">
              <LigneRecap role="Ambiance" valeur={plan.ambiance} onEdit={() => modifier("ambiance")} />
              <LigneRecap role="Scénario" valeur={plan.scenario} onEdit={() => modifier("scenario")} />
              <LigneRecap role="Décor" valeur={plan.lieu} onEdit={() => modifier("details")} />
              <LigneRecap role="Première" valeur={plan.quand} onEdit={() => modifier("details")} />
              {plan.note && (
                <LigneRecap role="Ton mot" valeur={plan.note} onEdit={() => modifier("details")} />
              )}
            </dl>
            <p className="max-w-sm text-sm text-plume/60">
              En appuyant, ton plan quitte l&apos;écran et lui est envoyé — réellement.
              Un seul envoi, et il compte.
            </p>
            <Bouton onClick={() => setPhase("envoi")}>Envoyer dans le vrai monde ✦</Bouton>
          </section>
        )}

        {phase === "envoi" && plan && <Lancement plan={plan} />}
      </div>
    </main>
  );
}

function ProgressionActes({ phase }: { phase: Phase }) {
  const actes: { cle: Phase[]; nom: string }[] = [
    { cle: ["ambiance"], nom: "I" },
    { cle: ["scenario"], nom: "II" },
    { cle: ["details", "recap"], nom: "III" },
  ];
  return (
    <div className="mb-2 flex items-center justify-center gap-6">
      {actes.map((a) => (
        <span
          key={a.nom}
          className={`font-display text-sm transition ${
            a.cle.includes(phase) ? "text-(--accent)" : "text-plume/25"
          }`}
        >
          {a.nom}
        </span>
      ))}
    </div>
  );
}

function LigneRecap({
  role,
  valeur,
  onEdit,
}: {
  role: string;
  valeur: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3 text-left last:border-0">
      <dt className="shrink-0 text-xs font-medium uppercase tracking-[0.2em] text-plume/50">
        {role}
      </dt>
      <dd className="flex min-w-0 items-baseline gap-3">
        <span className="min-w-0 break-words text-right font-display text-lg">{valeur}</span>
        <button
          type="button"
          onClick={onEdit}
          className="shrink-0 text-xs text-plume/40 underline-offset-2 transition hover:text-plume hover:underline"
        >
          modifier
        </button>
      </dd>
    </div>
  );
}

function ConstellationCoeur() {
  return (
    <svg viewBox="0 0 100 90" className="h-28 w-28" aria-hidden>
      <path
        d="M50 78 C22 58 8 40 13 26 C17 13 35 9 50 25 C65 9 83 13 87 26 C92 40 78 58 50 78 Z"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
        className="animate-trace"
        opacity="0.85"
      />
      {[
        [50, 78],
        [22, 52],
        [13, 26],
        [33, 12],
        [50, 25],
        [67, 12],
        [87, 26],
        [78, 52],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="1.6"
          fill="#fff"
          className="animate-scintille"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </svg>
  );
}
