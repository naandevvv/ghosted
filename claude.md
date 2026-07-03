# CLAUDE.md — Jeu "Opération charme" (nom de code)

## Ce que c'est
Petit jeu web **personnel, à usage unique**. Boukri l'enverra à sa fiancée : **elle est la joueuse**.
Elle aide l'avatar de Boukri à préparer un plan pour "quelqu'un de spécial" (clin d'œil : c'est elle,
elle le sait, on ne l'explique pas dans le jeu). À la fin, le plan qu'elle configure (type, ambiance,
lieu précis, date) est envoyé **pour de vrai** par e-mail à Boukri via Resend, qui le réalisera dans
la vraie vie. Pas un produit : pas de scaling, pas de SEO, pas d'analytics.

## Ton — RÈGLE ABSOLUE
Drôle, léger, complice. L'avatar de Boukri est **cool, confiant, un peu malin**.
**INTERDIT** : détresse, désespoir, ghosting, moral qui s'effondre, larmes, humiliation,
courir après elle. L'humour vient de la confiance et du second degré.
Échec dans un mini-jeu = « presque ! on refait » bienveillant. Jamais de moquerie.
Exception unique : l'intro, où il est en **panne d'inspiration comique** (moue 🤔, nuages de
réflexion, il tourne en rond) — jamais triste — jusqu'à ce que la joueuse accepte de l'aider.

## Direction artistique
Kawaii pastel, façon console/Tamagotchi rose.
- Palette : rose `#ff9ec4` / `#ff6aa8`, lilas `#c8a2ff`, menthe `#8ee6c8`,
  jaune `#ffd66b`, encre douce `#6b4a5c`, fond rose très clair `#fff0f6`.
- Police : **Baloo 2** (Google Fonts).
- Coins très arrondis, ombres portées épaisses colorées, cœurs flottants en ambiance,
  feedback ludique (étoiles ⭐, pops, réactions mignonnes).
- Cadre de jeu = une "console" rose avec écran intégré.

## Personnages (composants SVG, variantes d'expression)
- **Lui** : peau mate, cheveux noirs courts, yeux noirs, polo blanc, pantalon noir, bien taillé.
  Expressions : cool, clin d'œil, sourire en coin, lunettes de soleil, + "réflexion comique"
  (intro uniquement). Jamais triste.
- **Elle** : peau mate, cheveux noirs bouclés assez longs, lunettes noires.
  Expressions : sourire, rire.

## Déroulé du jeu
1. **Intro (cinématique)** : il tourne en rond 🤔💭 → la joueuse clique « Je vais l'aider ! »
   → le narrateur (🧚, machine à écrire) explique le principe.
2. **5 mini-jeux** (esprit WarioWare kawaii, barre d'étoiles, transition "niveau réussi ⭐") :
   - **Le style** : elle choisit son vibe (décontracté/élégant/sportif/charme), punchline assumée.
   - **Le message** : assemblage début + fin parmi des options toutes smooth/drôles.
   - **L'envoi parfait** : timing — curseur en aller-retour, envoyer dans la zone verte.
     Réussite = "timing de sniper" puis beat positif ("elle a vu… et elle sourit 😊").
   - **La battle de vannes** : elle choisit sa réplique du tac au tac (timer fun, sans échec humiliant).
   - **Le move** : Simon kawaii (séquence d'emojis à reproduire).
3. **Le planificateur** : type (resto/ciné/balade/surprise) → ambiance (chips) →
   **champ libre pour le lieu/film/spot PRÉCIS** → quand (ce week-end/cette semaine/bientôt).
   Le plan doit être **actionnable** (où, quoi, quand), validations avec toasts mignons.
4. **Fin** : avion en papier ("envoi dans le vrai monde…"), récap du plan,
   "Mission accomplie, t'as géré 😎 ⭐⭐⭐⭐⭐", clin d'œil final :
   « garde un œil sur tes vrais messages ces prochains jours 👀 ».

## Stack & conventions (standing rules Boukri)
- **Next.js 16 + OpenNext sur Cloudflare Workers**, TypeScript **strict**
  (`noUncheckedIndexedAccess` activé), **Tailwind CSS v4 CSS-first via `@theme`**, **pnpm**.
- **Pas de dossier `src/`**. **Exports nommés** (sauf pages Next.js).
- Pas de D1, pas d'auth, pas de storage : tout l'état du jeu est côté client (React state).
- **Une seule route serveur** : `POST /api/plan` → envoie le mail via **Resend**
  (domaine expéditeur `updates.naandev.com`, déjà vérifié ; clé API en **secret Worker**,
  jamais en clair dans le repo). Corps du mail : plan formaté proprement
  (type, ambiance, lieu/détail, date). Garde anti-double-envoi côté client.
- Mobile-first : elle jouera probablement sur téléphone. Respecter `prefers-reduced-motion`.

## Plan d'exécution — lots séquentiels
Un lot à la fois. **Aucun code du lot N+1 avant validation explicite du lot N par Boukri.**

- **Lot 0 — Socle** : init projet, tokens `@theme`, secret Resend, déploiement hello-world sur Workers.
- **Lot 1 — Design system + personnages** : composants UI (console, boutons, chips, bulles,
  toast, cœurs), personnages SVG avec toutes les expressions. Page de démo des expressions.
- **Lot 2 — Moteur + intro** : machine à états des phases, étoiles, transitions,
  narrateur machine à écrire, cinématique d'intro jouable.
- **Lot 3 — Mini-jeux 1-3** : Le style, Le message, L'envoi parfait.
- **Lot 4 — Mini-jeux 4-5** : Battle de vannes, Le move.
- **Lot 5 — Planificateur** : configuration complète du plan, validations.
- **Lot 6 — Fin + Resend** : animation finale, écran de fin, route `POST /api/plan`,
  test avec un vrai mail reçu.
- **Lot 7 — Polish + recette** : passe mobile, micro-animations, relecture des textes,
  test de bout en bout, déploiement final sur URL discrète.

MVP jouable = fin du Lot 6.

## Garde-fous d'écriture (textes in-game)
- Toutes les options de dialogue proposées à la joueuse sont **positives et drôles** :
  jamais d'option "lourde", collante ou pathétique, même en gag.
- Le narrateur parle à la joueuse avec complicité, jamais en rabaissant l'avatar.
- Textes en français, registre léger, tutoiement.