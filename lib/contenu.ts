export const TITRE = "Le Grand Soir";

export const LIGNES_CINEMATIQUE = [
  "Les grandes histoires commencent souvent par un ciel comme celui-ci.",
  "Celle-ci commence par une invitation.",
  "Quelqu'un prépare quelque chose. Il ne lui manque qu'une décision.",
  "La tienne.",
] as const;

export const TEXTE_BRIEF =
  "Le principe est simple — et il est réel. Tu vas composer une soirée : son ambiance, son scénario, son lieu, son moment. À la toute fin, ton plan quitte cet écran et lui est envoyé, pour de vrai. Ce n'est pas une simulation : ce que tu décides ici arrivera dans la vraie vie. Trois actes. Aucune mauvaise réponse. Une seule règle : choisis ce qui te ferait vraiment plaisir.";

export type Ambiance = {
  id: string;
  nom: string;
  emoji: string;
  accent: string;
  ciel: readonly [string, string];
  phrase: string;
};

export const AMBIANCES: readonly Ambiance[] = [
  {
    id: "douce",
    nom: "Douce",
    emoji: "🕯️",
    accent: "#ffd88a",
    ciel: ["#231729", "#3a2333"],
    phrase: "Lumière basse, conversations longues, aucune montre.",
  },
  {
    id: "romantique",
    nom: "Romantique",
    emoji: "💫",
    accent: "#ffb3c6",
    ciel: ["#241028", "#3d1b3a"],
    phrase: "Le grand jeu, assumé du début à la fin.",
  },
  {
    id: "electrique",
    nom: "Électrique",
    emoji: "🎇",
    accent: "#b3a4f5",
    ciel: ["#161233", "#2c1b4f"],
    phrase: "Des étincelles, du rire, du mouvement.",
  },
  {
    id: "tranquille",
    nom: "Tranquille",
    emoji: "🌙",
    accent: "#9fe3cd",
    ciel: ["#0e1626", "#17293b"],
    phrase: "Zéro pression. Juste vous deux, et le temps qui ralentit.",
  },
];

export type Scenario = {
  id: string;
  titre: string;
  emoji: string;
  pitch: string;
  question: string;
  placeholder: string;
};

export const SCENARIOS: readonly Scenario[] = [
  {
    id: "table",
    titre: "La Table",
    emoji: "🍽️",
    pitch: "Deux chaises, une adresse qui vaut le détour, et personne ne regarde l'heure.",
    question: "Quelle adresse, exactement ?",
    placeholder: "le nom du resto, la ville, le quartier…",
  },
  {
    id: "toile",
    titre: "La Toile",
    emoji: "🎬",
    pitch: "Une salle sombre, un grand écran, et vos avis qui s'affrontent en sortant.",
    question: "Quel film, quelle salle ?",
    placeholder: "le film que tu veux voir, et où…",
  },
  {
    id: "echappee",
    titre: "L'Échappée",
    emoji: "🌆",
    pitch: "Marcher sans but précis, mais pas sans intention.",
    question: "Quel spot, exactement ?",
    placeholder: "le lieu exact où commencer…",
  },
  {
    id: "inconnu",
    titre: "L'Inconnu",
    emoji: "🎁",
    pitch: "Tu ne sauras rien. Lui saura tout. Il faudra juste dire oui.",
    question: "Un indice de lieu, quand même ✦",
    placeholder: "une direction, une envie, un indice…",
  },
];

export const QUANDS = ["Ce week-end", "Cette semaine", "Très vite"] as const;
