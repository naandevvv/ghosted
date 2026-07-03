# Le Grand Soir ✦

Expérience web narrative personnelle (voir `claude.md` pour le brief complet).

## Stack

Next.js 16 (App Router) · TypeScript strict · Tailwind CSS v4 (`@theme`) · pnpm · OpenNext sur Cloudflare Workers.

## Développement

```bash
pnpm install
pnpm dev        # dev server Next.js
pnpm typecheck  # tsc --noEmit
pnpm lint
```

## Cloudflare Workers

```bash
pnpm preview    # build OpenNext + preview local via workerd
pnpm deploy     # build OpenNext + déploiement sur Workers
pnpm cf-typegen # régénère cloudflare-env.d.ts depuis wrangler.jsonc
```

### Secret Resend (à faire une fois, jamais commité)

```bash
pnpm wrangler secret put RESEND_API_KEY
```

En local, créer un fichier `.dev.vars` (ignoré par git) :

```
RESEND_API_KEY=re_xxx
```
