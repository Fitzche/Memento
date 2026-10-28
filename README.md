# Memento — révisions

Appli de révision façon Quizlet, 100 % statique (aucun serveur, aucun compte) : il suffit d'ouvrir le lien.
Elle marche sur téléphone et sur PC, et même hors ligne une fois ouverte (on peut l'installer avec « Ajouter à l'écran d'accueil »).

## Contenu

| Section | Contenu |
|---|---|
| **Philosophie** | Les 17 notions du bac, **50 citations par notion** (850 au total), chacune avec son auteur, son œuvre, son contexte et une explication |
| **Mathématiques** | 169 théorèmes et propriétés de terminale (spécialité + maths expertes) : suites, limites, dérivation, exp/ln, intégrales, équations différentielles, trigonométrie, géométrie dans l'espace, dénombrement, probabilités, complexes, arithmétique, matrices et graphes |
| **Physique** | 105 formules : cinématique, lois de Newton, gravitation, énergie, ondes, optique, électricité, thermodynamique, fluides, physique moderne, radioactivité, constantes |
| **Allemand** | **1 000 mots** en 50 listes thématiques de 20 mots (avec pluriels et formes des verbes forts) |
| **Mes listes** | Crée tes propres listes, importe-les depuis un texte (Quizlet, tableur…), partage-les par un simple lien |

## Modes de révision

- **Cartes** : on retourne la carte, on dit si on savait (← / → au clavier).
- **QCM** : quatre propositions (touches 1 à 4).
- **Écrire** : on tape la réponse ; les fautes de frappe et d'accent sont tolérées (allemand, philo, listes perso).
- Options : sens inversé, nombre de cartes, seulement les cartes non maîtrisées, favoris ★, recherche dans tout le contenu.

La progression (boîtes de Leitner), les listes et les favoris sont enregistrés **dans le navigateur**.
Pour changer d'appareil : « Sauvegarder / restaurer » sur la page d'accueil.

## Publier en ligne (GitHub Pages)

1. Crée un dépôt vide sur GitHub (par exemple `Memento`) et pousse ce dossier sur la branche `main` :
   ```bash
   git remote add origin https://github.com/<ton-pseudo>/Memento.git
   git push -u origin main
   ```
2. Sur GitHub : **Settings → Pages → Build and deployment → Source : GitHub Actions**.
3. C'est tout : à chaque `git push`, le workflow `.github/workflows/pages.yml` vérifie les données puis publie le site sur
   `https://<ton-pseudo>.github.io/Memento/`. Il suffit d'envoyer ce lien.

## Tester en local

```bash
node tools/serve.mjs
```
puis ouvrir http://localhost:5174.

```bash
node tools/check.mjs
```
vérifie toutes les cartes (nombre de champs, doublons, formules `$…$` bien fermées).

## Ajouter ou corriger du contenu

Tout le contenu est dans `data/`, en texte simple, une carte par ligne :

```
# Titre du paquet
> Sous-titre facultatif
recto | verso | détails…
```

- Philosophie : `citation | auteur | œuvre (date) | contexte | explication`
- Maths / physique : `nom | énoncé ou formule | à retenir` (formules en LaTeX entre `$…$`)
- Allemand : `allemand | français`

Après une modification, change le numéro de version dans `sw.js` (`memento-1.0.0` → `memento-1.0.1`)
pour que les téléphones qui ont installé l'appli récupèrent bien la nouvelle version.
