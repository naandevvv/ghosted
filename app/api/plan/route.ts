import { getCloudflareContext } from "@opennextjs/cloudflare";

const EMAIL_TO = "naoufelboukri@gmail.com";
const EMAIL_FROM = "Le Grand Soir 💌 <legrandsoir@updates.naandev.com>";

function champ(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  return v.length > 0 && v.length <= max ? v : null;
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const ambiance = champ(data.ambiance, 60);
  const scenario = champ(data.scenario, 60);
  const lieu = champ(data.lieu, 300);
  const quand = champ(data.quand, 60);
  const note = typeof data.note === "string" ? data.note.trim().slice(0, 500) : "";
  if (!ambiance || !scenario || !lieu || !quand) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const { env } = getCloudflareContext();
  const { RESEND_API_KEY } = env as { RESEND_API_KEY?: string };
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY manquant : wrangler secret put RESEND_API_KEY");
    return Response.json({ ok: false }, { status: 500 });
  }

  const lignes = [
    "Le Grand Soir — plan reçu ✦",
    "",
    `Ambiance : ${ambiance}`,
    `Scénario : ${scenario}`,
    `Décor : ${lieu}`,
    `Première : ${quand}`,
  ];
  if (note) lignes.push("", `Son mot pour toi : « ${note} »`);
  lignes.push("", "À toi de jouer. Elle a dit oui au plan — le reste t'appartient.");

  const reponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: [EMAIL_TO],
      subject: `✦ Le Grand Soir : ${scenario} · ${quand}`,
      text: lignes.join("\n"),
    }),
  });

  if (!reponse.ok) {
    console.error("Resend a répondu", reponse.status, await reponse.text());
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
