const SKIN = "#c98a5e";
const HAIR = "#241d2b";
const INK = "#6b4a5c";
const BLUSH = "#ff9ec4";

export type LuiExpression = "cool" | "wink" | "smirk" | "sunglasses" | "thinking";

function LuiVisage({ expression }: { expression: LuiExpression }) {
  const sourire = (
    <path d="M68 76 Q80 86 92 76" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
  );
  const yeux = (
    <>
      <circle cx="66" cy="57" r="3.6" fill={HAIR} />
      <circle cx="94" cy="57" r="3.6" fill={HAIR} />
      <circle cx="67.4" cy="55.6" r="1.1" fill="#fff" />
      <circle cx="95.4" cy="55.6" r="1.1" fill="#fff" />
    </>
  );
  const sourcils = (
    <>
      <path d="M59 47 q7 -5 14 -1" stroke={HAIR} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M87 46 q7 -4 14 1" stroke={HAIR} strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  );

  switch (expression) {
    case "cool":
      return (
        <g>
          {sourcils}
          {yeux}
          {sourire}
        </g>
      );
    case "wink":
      return (
        <g>
          {sourcils}
          <circle cx="66" cy="57" r="3.6" fill={HAIR} />
          <circle cx="67.4" cy="55.6" r="1.1" fill="#fff" />
          <path d="M88 57 q6 5 12 0" stroke={HAIR} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {sourire}
        </g>
      );
    case "smirk":
      return (
        <g>
          <path d="M59 47 q7 -5 14 -1" stroke={HAIR} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M87 43 q7 -4 14 1" stroke={HAIR} strokeWidth="3" fill="none" strokeLinecap="round" />
          {yeux}
          <path d="M70 78 Q82 85 92 73" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </g>
      );
    case "sunglasses":
      return (
        <g>
          <rect x="52" y="49" width="24" height="14" rx="6" fill={HAIR} />
          <rect x="84" y="49" width="24" height="14" rx="6" fill={HAIR} />
          <path d="M76 54 h8" stroke={HAIR} strokeWidth="4" strokeLinecap="round" />
          <path d="M57 53 l6 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <path d="M89 53 l6 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          {sourire}
        </g>
      );
    case "thinking":
      return (
        <g>
          <path d="M58 44 q7 -6 14 -2" stroke={HAIR} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M88 48 q7 -3 13 1" stroke={HAIR} strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="67" cy="53" r="3.4" fill={HAIR} />
          <circle cx="93" cy="53" r="3.4" fill={HAIR} />
          <path d="M75 80 q5 -5 10 0" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </g>
      );
  }
}

export function Lui({
  expression = "cool",
  className = "",
}: {
  expression?: LuiExpression;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 160 210" className={className} role="img" aria-label="Lui">
      {/* jambes (pantalon noir) */}
      <rect x="60" y="148" width="16" height="46" rx="7" fill={HAIR} />
      <rect x="84" y="148" width="16" height="46" rx="7" fill={HAIR} />
      <ellipse cx="66" cy="197" rx="13" ry="6" fill={INK} />
      <ellipse cx="94" cy="197" rx="13" ry="6" fill={INK} />
      {/* bras */}
      <rect x="36" y="102" width="14" height="42" rx="7" fill="#fff" stroke="#f0dbe6" strokeWidth="2" />
      <rect x="110" y="102" width="14" height="42" rx="7" fill="#fff" stroke="#f0dbe6" strokeWidth="2" />
      <circle cx="43" cy="148" r="7" fill={SKIN} />
      <circle cx="117" cy="148" r="7" fill={SKIN} />
      {/* polo blanc */}
      <rect x="46" y="94" width="68" height="62" rx="18" fill="#fff" stroke="#f0dbe6" strokeWidth="2" />
      <path d="M70 96 L80 110 L90 96 Z" fill="#f6e7ee" />
      {/* tête */}
      <circle cx="80" cy="52" r="36" fill={HAIR} />
      <circle cx="46" cy="64" r="6" fill={SKIN} />
      <circle cx="114" cy="64" r="6" fill={SKIN} />
      <circle cx="80" cy="62" r="32" fill={SKIN} />
      {/* joues */}
      <circle cx="58" cy="72" r="5" fill={BLUSH} opacity="0.5" />
      <circle cx="102" cy="72" r="5" fill={BLUSH} opacity="0.5" />
      <LuiVisage expression={expression} />
    </svg>
  );
}

export type ElleExpression = "smile" | "laugh";

const BOUCLES = [
  { cx: 56, cy: 30, r: 14 },
  { cx: 74, cy: 22, r: 15 },
  { cx: 94, cy: 24, r: 14 },
  { cx: 110, cy: 34, r: 13 },
  { cx: 44, cy: 48, r: 13 },
  { cx: 40, cy: 68, r: 12 },
  { cx: 42, cy: 88, r: 11 },
  { cx: 46, cy: 106, r: 10 },
  { cx: 118, cy: 50, r: 13 },
  { cx: 122, cy: 70, r: 12 },
  { cx: 120, cy: 90, r: 11 },
  { cx: 116, cy: 106, r: 10 },
];

function ElleVisage({ expression }: { expression: ElleExpression }) {
  return (
    <g>
      {/* lunettes noires */}
      <circle cx="67" cy="60" r="10" fill="none" stroke={HAIR} strokeWidth="3" />
      <circle cx="93" cy="60" r="10" fill="none" stroke={HAIR} strokeWidth="3" />
      <path d="M77 60 h6" stroke={HAIR} strokeWidth="3" strokeLinecap="round" />
      {expression === "smile" ? (
        <>
          <circle cx="67" cy="60" r="3" fill={HAIR} />
          <circle cx="93" cy="60" r="3" fill={HAIR} />
          <path d="M72 78 q8 7 16 0" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M63 60 q4 -5 8 0" stroke={HAIR} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M89 60 q4 -5 8 0" stroke={HAIR} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M70 75 q10 14 20 0 z" fill="#a4566b" />
        </>
      )}
    </g>
  );
}

export function Elle({
  expression = "smile",
  className = "",
}: {
  expression?: ElleExpression;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 160 210" className={className} role="img" aria-label="Elle">
      {/* boucles longues */}
      {BOUCLES.map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={HAIR} />
      ))}
      {/* jambes */}
      <rect x="60" y="146" width="16" height="46" rx="7" fill={HAIR} />
      <rect x="84" y="146" width="16" height="46" rx="7" fill={HAIR} />
      <ellipse cx="66" cy="195" rx="13" ry="6" fill={INK} />
      <ellipse cx="94" cy="195" rx="13" ry="6" fill={INK} />
      {/* bras */}
      <rect x="38" y="100" width="13" height="40" rx="6" fill="#c8a2ff" />
      <rect x="109" y="100" width="13" height="40" rx="6" fill="#c8a2ff" />
      <circle cx="44" cy="144" r="6.5" fill={SKIN} />
      <circle cx="116" cy="144" r="6.5" fill={SKIN} />
      {/* haut lilas */}
      <rect x="48" y="92" width="64" height="60" rx="18" fill="#c8a2ff" />
      {/* tête */}
      <circle cx="80" cy="58" r="30" fill={SKIN} />
      {/* frange bouclée */}
      <circle cx="58" cy="36" r="10" fill={HAIR} />
      <circle cx="78" cy="30" r="11" fill={HAIR} />
      <circle cx="100" cy="36" r="10" fill={HAIR} />
      {/* joues */}
      <circle cx="60" cy="72" r="5" fill={BLUSH} opacity="0.6" />
      <circle cx="100" cy="72" r="5" fill={BLUSH} opacity="0.6" />
      <ElleVisage expression={expression} />
    </svg>
  );
}
