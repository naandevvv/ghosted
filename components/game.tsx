"use client";

import { useState } from "react";
import { Finale } from "@/components/finale";
import { Intro } from "@/components/intro";
import { EnvoiGame } from "@/components/minigames/envoi";
import { MessageGame } from "@/components/minigames/message";
import { MoveGame } from "@/components/minigames/move";
import { StyleGame } from "@/components/minigames/style";
import { VannesGame } from "@/components/minigames/vannes";
import { Planner } from "@/components/planner";
import { ConsoleFrame, LevelClear } from "@/components/ui";
import type { Plan } from "@/lib/plan";

type Phase =
  | "intro"
  | "style"
  | "message"
  | "envoi"
  | "vannes"
  | "move"
  | "planner"
  | "finale";

const SUIVANTE: Record<Phase, Phase> = {
  intro: "style",
  style: "message",
  message: "envoi",
  envoi: "vannes",
  vannes: "move",
  move: "planner",
  planner: "finale",
  finale: "finale",
};

export function Game() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [etoiles, setEtoiles] = useState(0);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [niveauGagne, setNiveauGagne] = useState<number | null>(null);

  const gagnerNiveau = () => {
    const n = etoiles + 1;
    setEtoiles(n);
    setNiveauGagne(n);
  };

  const continuer = () => {
    setNiveauGagne(null);
    setPhase((p) => SUIVANTE[p]);
  };

  return (
    <main className="flex flex-1 items-center justify-center p-3 sm:p-6">
      <ConsoleFrame stars={etoiles}>
        {phase === "intro" && <Intro onDone={() => setPhase("style")} />}
        {phase === "style" && <StyleGame onWin={gagnerNiveau} />}
        {phase === "message" && <MessageGame onWin={gagnerNiveau} />}
        {phase === "envoi" && <EnvoiGame onWin={gagnerNiveau} />}
        {phase === "vannes" && <VannesGame onWin={gagnerNiveau} />}
        {phase === "move" && <MoveGame onWin={gagnerNiveau} />}
        {phase === "planner" && (
          <Planner
            onDone={(p) => {
              setPlan(p);
              setPhase("finale");
            }}
          />
        )}
        {phase === "finale" && plan && <Finale plan={plan} />}
        {niveauGagne !== null && <LevelClear level={niveauGagne} onNext={continuer} />}
      </ConsoleFrame>
    </main>
  );
}
