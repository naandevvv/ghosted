import { getCloudflareContext } from "@opennextjs/cloudflare";

const EMAIL_TO = "naoufelboukri@gmail.com";
const EMAIL_FROM = "Cupidon 💘 <cupidon@updates.naandev.com>";

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

  const type = champ(data.type, 60);
  const ambiance = champ(data.ambiance, 60);
  const lieu = champ(data.lieu, 300);
  const quand = champ(data.quand, 60);
  if (!type || !ambiance || !lieu || !quand) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const { env } = getCloudflareContext();
  const { RESEND_API_KEY } = env as { RESEND_API_KEY?: string };
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY manquant : wrangler secret put RESEND_API_KEY");
    return Response.json({ ok: false }, { status: 500 });
  }

  const texte = [
    "Le plan est validé 💘",
    "",
    `Quoi : ${type}`,
    `Ambiance : ${ambiance}`,
    `Lieu / détail : ${lieu}`,
    `Quand : ${quand}`,
    "",
    "À toi de jouer 😎",
  ].join("\n");

  const reponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: [EMAIL_TO],
      subject: `💘 Plan validé : ${type} · ${quand}`,
      text: texte,
    }),
  });

  if (!reponse.ok) {
    console.error("Resend a répondu", reponse.status, await reponse.text());
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
