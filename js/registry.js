// Les fichiers de data/ s'enregistrent ici. Format texte, une carte par ligne :
//   # Titre du paquet          → commence un nouveau paquet
//   > description              → (facultatif) sous-titre du paquet
//   champ 1 | champ 2 | ...    → une carte ; les champs dépendent de la section (voir SECTIONS dans app.js)
//   // commentaire             → ignoré
// Les formules s'écrivent en LaTeX entre $...$ (rendu par KaTeX).
window.MEMENTO = { sources: [], add(section, text) { this.sources.push({ section, text }); } };
