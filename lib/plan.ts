export type Plan = {
  type: string;
  ambiance: string;
  lieu: string;
  quand: string;
};

export type PlanType = {
  id: string;
  emoji: string;
  label: string;
  question: string;
  placeholder: string;
};

export const PLAN_TYPES: readonly PlanType[] = [
  {
    id: "resto",
    emoji: "🍽️",
    label: "Resto",
    question: "Quel resto exactement ?",
    placeholder: "ex. le petit italien près de chez toi",
  },
  {
    id: "cine",
    emoji: "🎬",
    label: "Ciné",
    question: "Quel film, quel ciné ?",
    placeholder: "ex. la nouvelle rom-com, au Pathé",
  },
  {
    id: "balade",
    emoji: "🌸",
    label: "Balade",
    question: "Quel spot exactement ?",
    placeholder: "ex. les quais, côté coucher de soleil",
  },
  {
    id: "surprise",
    emoji: "🎁",
    label: "Surprise",
    question: "Un indice de lieu, quand même 👀",
    placeholder: "ex. quelque part avec une belle vue…",
  },
];

export const AMBIANCES = [
  "🕯️ Cosy",
  "💐 Romantique",
  "🎉 Fun",
  "😌 Chill",
  "🎩 Grand jeu",
] as const;

export const QUANDS = [
  "Ce week-end",
  "Cette semaine",
  "Bientôt (mais pas trop)",
] as const;
