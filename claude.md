# CLAUDE.md — « Le Grand Soir »

## Ce que c'est
Expérience web **personnelle, à usage unique**. Boukri l'enverra à sa fiancée : **elle est la joueuse**.
Ce n'est **pas** une suite de mini-jeux : c'est une **expérience narrative et cinématique**.
Elle compose une vraie soirée (ambiance, scénario, lieu précis, moment) et, à la fin, son plan
est envoyé **pour de vrai** par e-mail à Boukri via Resend, qui le réalisera dans la vraie vie.
Pas un produit : pas de scaling, pas de SEO, pas d'analytics.

## RÈGLES ABSOLUES
- **AUCUN mini-jeu d'adresse** (pas de timing, pas de Simon, pas de quiz, pas de WarioWare).
  Les interactions sont des **choix narratifs** et de la mise en scène, jamais des épreuves.
- **Tout expliquer à la joueuse** : le principe (« ce que tu choisis ici arrivera réellement »)
  est énoncé clairement dès le début, et rappelé avant l'envoi final.
- Ton : élégant, complice, confiant, un peu cinéma. Jamais de détresse, de ghosting,
  de moral qui s'effondre ni d'humiliation.

## Direction artistique
**Nuit étoilée cinématographique.** Le kawaii n'est qu'une touche discrète (quelques ✦ 💌),
jamais envahissant.
- Fond : dégradés de nuit (`#100e1e` → `#1c1731`), ciel étoilé animé en canvas
  (parallaxe, scintillement, étoiles filantes), le **ciel change de couleur selon
  l'ambiance choisie**.
- Accents pastel doux : blush `#ffb3c6`, or `#ffd88a`, lavande `#b3a4f5`, brume `#9fe3cd`.
  Texte plume `#f4eef8`.
- Typo : **Fraunces** (display, serif expressive) + **Outfit** (UI). Via `next/font`.
- Verre dépoli discret (`bg-white/5`, bordures `white/15`), lueurs douces, transitions
  de scène soignées. `prefers-reduced-motion` respecté partout (ciel statique, textes directs).

## Déroulé
1. **Cinématique d'ouverture** (skippable) : cartons de texte façon générique sur le ciel
   étoilé, puis carton-titre « LE GRAND SOIR — une production rien que pour elle ».
2. **Le brief** : le narrateur explique le principe, clairement (machine à écrire).
3. **Acte I — L'ambiance** : 4 ambiances ; la sélection **change le ciel** en douceur.
4. **Acte II — Le scénario** : 4 scénarios présentés comme des affiches de film
   (La Table, La Toile, L'Échappée, L'Inconnu), pitch au choix.
5. **Acte III — Les coordonnées** : lieu **précis** (champ libre obligatoire), moment,
   et un mot pour lui (optionnel, part dans l'e-mail). Rappel explicite : « il exécutera à la lettre ».
6. **Avant-première** : récap en constellation (cœur tracé entre les étoiles),
   possibilité de modifier chaque choix, avertissement « un seul envoi, et il est réel ».
7. **Envoi + générique** : transmission animée, envoi réel via `POST /api/plan`,
   générique de fin personnalisé, « garde un œil sur tes vrais messages 💌 ».

## Stack & conventions (standing rules Boukri)
- **Next.js 16 + OpenNext sur Cloudflare Workers**, TypeScript **strict**
  (`noUncheckedIndexedAccess`), **Tailwind CSS v4 CSS-first via `@theme`**, **pnpm**.
- **Pas de dossier `src/`**. **Exports nommés** (sauf pages Next.js).
- Pas de D1, pas d'auth, pas de storage : état côté client (React state).
- **Une seule route serveur** : `POST /api/plan` → e-mail via **Resend**
  (expéditeur `updates.naandev.com`, clé API en **secret Worker**, jamais dans le repo).
  Garde anti-double-envoi côté client (ref + localStorage).
- Mobile-first (elle jouera sur téléphone).

## Garde-fous d'écriture
- Textes en français, tutoiement, registre élégant et léger.
- Aucune option « lourde », collante ou pathétique.
- Le titre « Opération charme » est banni : le projet s'appelle « Le Grand Soir ».
