# PRD — Once Upon a Time in Hollywood (Gala privé pour Lavinia)

## Original Problem Statement
Initialement : "Build a visually stunning 3D website for the 2026 oscars ceremony". Évolué en : site d'invitation privé, entièrement en français (titre en anglais), pour un gala "Once Upon a Time in Hollywood" donné par M. et Mme Anton Cox pour leur fille Lavinia, le 03/10/2026 à 20h au Piesmont (Lasne). Niveau Awwwards : hero 3D Oscar, révélation masquée ligne par ligne, marquee éditorial, chapitres numérotés, framer-motion + lenis.

## Architecture
- Frontend : React 19 + Tailwind + framer-motion + lenis + @react-three/fiber/drei.
- Modèle 3D : vrai Oscar (STL de stlmodels.ru, converti en GLB 60k faces via trimesh) → `/app/frontend/public/models/oscar.glb`, matériau or appliqué au runtime.
- Vidéo teaser : `/app/frontend/public/videos/teaser.mp4` (tapis rouge, Pixabay CDN).
- Backend : FastAPI + MongoDB. RSVP : first_name, last_name, email, attending, vegetarian, message.
- Sections : Accueil (hero 3D + compte à rebours), Teaser, Marquee, Invitation (carton officiel + déroulement 20h/21h/23h + infos pratiques), Dress Code, Photos (à venir), RSVP, Footer (crédit Charles-Edouard de Meeûs).

## Personas
- Invité(e) du gala : lit l'invitation, consulte le déroulement et le dress code, confirme sa présence.
- Hôtes (famille Cox) : collectent les réponses RSVP.

## Implémenté (2026-08-24, mise à jour 2)
- E-mail de confirmation doré automatique à chaque RSVP (Resend managé, EMERGENT_EMAIL_KEY, template FR dark/gold, gate de sécurité _assert_safe_email).
- Page hôtes protégée /hotes : mot de passe (HOST_PASSWORD dans .env) → JWT 12h → registre des réponses, stats (présents/absents/végétariens), export CSV, copie des e-mails. Anti brute-force : 5 échecs = blocage 15 min.
- Bande-son « Bossa Antigua » (Kevin MacLeod, CC BY 4.0, crédit en footer) avec bouton lecture/pause flottant doré.
- Footer : crédit cliquable www.cedemeeus.be + mailto.
- Vérifié : envoi e-mail (HTTP 202 vers delivered@resend.dev), login hôtes OK/KO, tableau + stats, lecture audio réelle.
- Site intégralement en français ; titre conservé en anglais ; aucune référence à 1969 ou au film.
- Invitation avec texte exact demandé + déroulement en 3 étapes (Cocktail 20h, Dîner & Cérémonie 21h, Soirée 23h).
- Informations pratiques : date, portes 20h, Le Piesmont, Allée des Grands Clos 8 · 1380 Lasne, dress code.
- Photos : message "disponibles après la soirée".
- RSVP : prénom/nom/e-mail, présent(e)/absent(e), végétarien(ne) ou non, mot pour les hôtes → MongoDB. Aucun système de placement.
- Footer : crédit "Site réalisé par Charles-Edouard de Meeûs · hello@cedemeeus.be" (mailto).
- Vérifié : API RSVP (curl), soumission UI de bout en bout, teaser play/pause, compte à rebours actif (3 oct. 2026).

## Notes
- Modèle Oscar : STL 25MB simplifié en GLB ~1MB ; rotation corrigée (Y-up, à l'endroit).
- Erreur console PostHog (boilerplate plateforme) sans impact.

## Backlog
- P1 : Envoi d'un e-mail de confirmation RSVP (Resend).
- P1 : Page admin/lecture des réponses pour les hôtes (export liste).
- P2 : Galerie photos réelle après la soirée.
- P2 : Version néerlandaise/anglaise si besoin.
