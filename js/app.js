'use strict';
// Memento — appli de révision statique (aucun serveur : tout est stocké dans le navigateur).

// ---------- Sections ----------
// fields : nom de chaque champ d'une carte ; front : champs du recto ; back : champs du verso ;
// extra : champs affichés sous la réponse ; answer : champ à taper en mode « Écrire » (null = mode désactivé).
const SECTIONS = [
  { id: 'philo', title: 'Philosophie', icon: '🦉', color: '#7c3aed',
    desc: 'Les 17 notions du bac, 50 citations expliquées et remises dans leur contexte pour chacune.',
    fields: ['Citation', 'Auteur', 'Œuvre', 'Contexte', 'Explication'], front: [0], back: [1, 2], extra: [3, 4], answer: 1 },
  { id: 'maths', title: 'Mathématiques', icon: '∑', color: '#2563eb',
    desc: 'Théorèmes et propriétés à connaître par cœur, de la terminale (spécialité + expertes).',
    fields: ['Résultat', 'Énoncé', 'À retenir'], front: [0], back: [1], extra: [2], answer: null },
  { id: 'physique', title: 'Physique', icon: '⚛', color: '#0891b2',
    desc: 'Les formules principales, avec leurs unités et leurs conditions d’emploi.',
    fields: ['Loi / grandeur', 'Formule', 'Unités et remarques'], front: [0], back: [1], extra: [2], answer: null },
  { id: 'allemand', title: 'Allemand', icon: 'DE', color: '#d97706',
    desc: '1 000 mots de vocabulaire en 50 listes thématiques de 20 mots.',
    note: 'Pluriel entre parenthèses : (-e) → Hunde, (¨er) → Häuser, (¨) → Väter, (-) → invariable. Verbes forts : (3e pers. présent, prétérit, participe passé). En mode « Écrire », l’article compte : sans lui, la réponse est « presque » juste.',
    fields: ['Allemand', 'Français'], front: [0], back: [1], extra: [], answer: 1, reverseAnswer: 0 },
];
const USER_SECTION = { id: 'perso', title: 'Mes listes', icon: '✎', color: '#16a34a',
  fields: ['Terme', 'Définition'], front: [0], back: [1], extra: [], answer: 1, reverseAnswer: 0 };

// ---------- Stockage local (protégé : navigation privée, stockage bloqué…) ----------
const store = {
  get(k, d) { try { const v = localStorage.getItem('memento.' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('memento.' + k, JSON.stringify(v)); } catch { toast('Impossible d’enregistrer (stockage bloqué)'); } },
};

// ---------- Utilitaires ----------
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }
let toastTimer;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('on'), 2200); }

// ---------- Lecture des données ----------
// Les cartes fournies (data/) ne peuvent pas être réécrites depuis le navigateur : leurs modifications
// et suppressions sont gardées à part (« edits », « hidden ») et appliquées au chargement, l'identifiant
// de la carte restant celui d'origine (la progression et les favoris sont donc conservés).
let cardEdits = store.get('edits', {});   // id → champs modifiés
let cardHidden = store.get('hidden', {}); // id → 1 (carte supprimée, restaurable)
const DECKS = new Map(); // id → { id, title, desc, section, cards: [{ id, f: [...], orig }], hidden: [...] }
function parseSource(section, text) {
  let deck = null;
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('//')) continue;
    if (line.startsWith('# ')) {
      const title = line.slice(2).trim();
      deck = { id: section + '-' + slug(title), title, desc: '', section, cards: [], hidden: [] };
      DECKS.set(deck.id, deck);
    } else if (line.startsWith('> ') && deck) deck.desc = line.slice(2).trim();
    else if (deck) {
      const f = line.split(' | ').map((x) => x.trim());
      const id = deck.id + ':' + hash(f[0] + '|' + f[1]);
      const card = { id, f: cardEdits[id] ? cardEdits[id].slice() : f, orig: f, n: deck.cards.length + deck.hidden.length };
      (cardHidden[id] ? deck.hidden : deck.cards).push(card);
    }
  }
}
for (const s of window.MEMENTO.sources) parseSource(s.section, s.text);

function userDecks() { return store.get('lists', []); }
function saveUserDecks(l) { store.set('lists', l); }
function userDeckToDeck(u) {
  return { id: u.id, title: u.title || 'Sans titre', desc: u.desc || '', section: 'perso', user: true,
    cards: u.cards.filter((c) => c[0] || c[1]).map((c) => ({ id: u.id + ':' + hash(c[0] + '|' + c[1]), f: [c[0], c[1]] })) };
}
const sectionOf = (id) => SECTIONS.find((s) => s.id === id) || USER_SECTION;
const decksOf = (sid) => (sid === 'perso' ? userDecks().map(userDeckToDeck) : [...DECKS.values()].filter((d) => d.section === sid));
function getDeck(id) {
  if (id.startsWith('tout-')) { // paquet virtuel : toute une section
    const sid = id.slice(5), s = sectionOf(sid);
    return { id, title: s.title + ' — tout', desc: 'Toutes les cartes de la section, mélangées.', section: sid, virtual: true, cards: decksOf(sid).flatMap((d) => d.cards.map((c) => ({ ...c, from: d.title }))) };
  }
  if (id === 'favoris') {
    const fav = store.get('fav', {});
    const all = [...DECKS.values(), ...userDecks().map(userDeckToDeck)];
    return { id, title: 'Favoris', desc: 'Les cartes que tu as marquées d’une étoile.', section: 'mix', virtual: true,
      cards: all.flatMap((d) => d.cards.filter((c) => fav[c.id]).map((c) => ({ ...c, from: d.title, sec: d.section }))) };
  }
  if (id.startsWith('u-')) { const u = userDecks().find((x) => x.id === id); return u && userDeckToDeck(u); }
  return DECKS.get(id);
}
const secOfCard = (deck, card) => sectionOf(card.sec || deck.section);

// ---------- Progression (boîtes de Leitner 0 → 5) ----------
let progress = store.get('progress', {});
const level = (cid) => progress[cid] || 0;
function mark(cid, ok) {
  progress[cid] = ok ? Math.min(5, Math.max(0, level(cid)) + 1) : -1; // -1 = vue mais ratée (≠ jamais vue)
  store.set('progress', progress);
}
const state = (cid) => { const l = progress[cid]; return l == null ? 'new' : l >= 3 ? 'ok' : 'learning'; };
function stats(cards) {
  const s = { new: 0, learning: 0, ok: 0 };
  for (const c of cards) s[state(c.id)]++;
  return s;
}
function progressBar(cards) {
  const s = stats(cards), n = cards.length || 1;
  return `<div class="bar" title="${s.ok} maîtrisées · ${s.learning} en cours · ${s.new} nouvelles">
    <i class="ok" style="width:${(100 * s.ok) / n}%"></i><i class="learning" style="width:${(100 * s.learning) / n}%"></i></div>`;
}

// ---------- Modifier / supprimer une carte ----------
const deckIdOf = (cid) => cid.slice(0, cid.lastIndexOf(':'));
const isUserCard = (cid) => deckIdOf(cid).startsWith('u-');
const userCardIndex = (u, cid) => u.cards.findIndex((c) => u.id + ':' + hash(c[0] + '|' + c[1]) === cid);
function moveCardState(oldId, newId) { // dans une liste perso, l'id dépend du contenu : progression et favori suivent la carte
  if (oldId === newId) return;
  if (progress[oldId] != null) { progress[newId] = progress[oldId]; delete progress[oldId]; store.set('progress', progress); }
  const fav = store.get('fav', {});
  if (fav[oldId]) { fav[newId] = 1; delete fav[oldId]; store.set('fav', fav); }
}
// Enregistre les nouveaux champs d'une carte et met à jour l'objet affiché. Renvoie false si la carte est introuvable.
function saveCardEdit(card, f) {
  const did = deckIdOf(card.id);
  if (isUserCard(card.id)) {
    const all = userDecks(), u = all.find((x) => x.id === did), k = u ? userCardIndex(u, card.id) : -1;
    if (k < 0) return false;
    u.cards[k] = [f[0], f[1]]; saveUserDecks(all);
    const nid = did + ':' + hash(f[0] + '|' + f[1]);
    moveCardState(card.id, nid); card.id = nid;
  } else {
    const base = DECKS.get(did)?.cards.find((c) => c.id === card.id);
    if (!base) return false;
    const same = base.orig.length <= f.length && f.every((x, i) => x === (base.orig[i] || ''));
    if (same) delete cardEdits[card.id]; else cardEdits[card.id] = f;
    store.set('edits', cardEdits);
    base.f.splice(0, base.f.length, ...f);
  }
  card.f.splice(0, card.f.length, ...f); // met aussi à jour les copies (« tout », favoris) qui partagent ce tableau
  return true;
}
// Supprime une carte : retirée d'une liste perso, ou masquée (restaurable) pour une carte fournie.
function deleteCard(card) {
  const did = deckIdOf(card.id);
  if (isUserCard(card.id)) {
    const all = userDecks(), u = all.find((x) => x.id === did), k = u ? userCardIndex(u, card.id) : -1;
    if (k < 0) return false;
    u.cards.splice(k, 1); saveUserDecks(all);
    delete progress[card.id]; store.set('progress', progress);
    const fav = store.get('fav', {}); delete fav[card.id]; store.set('fav', fav);
  } else {
    const d = DECKS.get(did), k = d ? d.cards.findIndex((c) => c.id === card.id) : -1;
    if (k < 0) return false;
    d.hidden.push(...d.cards.splice(k, 1));
    cardHidden[card.id] = 1; store.set('hidden', cardHidden);
  }
  return true;
}
function restoreHidden(d) {
  for (const c of d.hidden) delete cardHidden[c.id];
  store.set('hidden', cardHidden);
  d.cards.push(...d.hidden); d.hidden = [];
  d.cards.sort((a, b) => a.n - b.n);
}
// Fenêtre d'édition d'une carte ; onSaved est appelé après un enregistrement réussi.
function openCardEditor(card, sec, onSaved) {
  const user = isUserCard(card.id);
  const orig = user ? null : DECKS.get(deckIdOf(card.id))?.cards.find((c) => c.id === card.id)?.orig;
  const dlg = document.createElement('dialog');
  dlg.className = 'editor';
  dlg.innerHTML = `<form method="dialog"><h2>Modifier la carte</h2>
    ${sec.fields.map((name, i) => `<label><span class="lbl">${esc(name)}</span><textarea rows="${i ? 3 : 2}" data-i="${i}">${esc(card.f[i] || '')}</textarea></label>`).join('')}
    ${sec.id === 'maths' || sec.id === 'physique' ? '<p class="muted small">Les formules s’écrivent en LaTeX entre $…$.</p>' : ''}
    ${user ? '' : '<p class="muted small">Ta modification reste sur cet appareil (elle est incluse dans la sauvegarde).</p>'}
    <p class="err" hidden>Les deux premiers champs ne peuvent pas être vides tous les deux.</p>
    <div class="row"><button value="save" class="btn primary">Enregistrer</button><button value="cancel" class="btn ghost" formnovalidate>Annuler</button>
      ${orig && cardEdits[card.id] ? '<button type="button" class="btn ghost" id="ce-orig">Revenir à l’original</button>' : ''}</div></form>`;
  document.body.append(dlg);
  const areas = [...dlg.querySelectorAll('textarea')];
  const shut = () => { if (dlg.open) dlg.close(); dlg.remove(); };
  const finish = (f) => {
    shut();
    if (!saveCardEdit(card, f)) toast('Carte introuvable : elle a peut-être déjà été modifiée');
    else { toast('Carte modifiée'); onSaved(); }
  };
  dlg.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
    if (e.submitter && e.submitter.value === 'cancel') return shut();
    const f = areas.map((t) => t.value.trim());
    if (!f[0] && !f[1]) { dlg.querySelector('.err').hidden = false; return; }
    finish(f);
  };
  const reset = dlg.querySelector('#ce-orig');
  if (reset) reset.onclick = () => finish(sec.fields.map((_, i) => orig[i] || ''));
  dlg.addEventListener('close', () => dlg.remove()); // fermeture par Échap
  dlg.showModal();
  areas[0].focus();
}

// ---------- Réglages ----------
const settings = Object.assign({ reverse: false, count: 20, filter: 'all', theme: 'auto' }, store.get('settings', {}));
const saveSettings = () => store.set('settings', settings);
function applyTheme() { document.documentElement.dataset.theme = settings.theme; }
applyTheme();
$('#theme').onclick = () => {
  settings.theme = { auto: 'dark', dark: 'light', light: 'auto' }[settings.theme];
  saveSettings(); applyTheme(); toast({ auto: 'Thème : automatique', dark: 'Thème : sombre', light: 'Thème : clair' }[settings.theme]);
};

// ---------- Rendu des cartes ----------
function fieldHtml(sec, card, idx, labels) {
  return idx.filter((i) => card.f[i]).map((i) =>
    `<div class="fld fld-${i}">${labels ? `<span class="lbl">${esc(sec.fields[i])}</span>` : ''}${esc(card.f[i])}</div>`).join('');
}
function sides(sec, card, reverse) {
  return reverse ? { front: sec.back, back: sec.front } : { front: sec.front, back: sec.back };
}
function renderMath(el) {
  if (window.renderMathInElement) {
    try { window.renderMathInElement(el, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false }); } catch { /* formule invalide : on laisse le texte brut */ }
  }
}

// ---------- Vues ----------
const app = $('#app');
let cleanup = null; // retire les raccourcis clavier de la vue précédente
function view(html) {
  if (cleanup) { cleanup(); cleanup = null; }
  app.innerHTML = html; renderMath(app); window.scrollTo(0, 0);
}
function onKeys(fn) {
  const h = (e) => { if (!document.querySelector('dialog[open]')) fn(e); }; // pas de raccourcis pendant l'édition d'une carte
  document.addEventListener('keydown', h); cleanup = () => document.removeEventListener('keydown', h);
}

function home() {
  const fav = Object.keys(store.get('fav', {})).length;
  const tiles = SECTIONS.map((s) => {
    const decks = decksOf(s.id), cards = decks.flatMap((d) => d.cards);
    return `<a class="tile" href="#/s/${s.id}" style="--c:${s.color}">
      <span class="ico">${s.icon}</span><h2>${s.title}</h2><p>${s.desc}</p>
      <small>${decks.length} paquets · ${cards.length} cartes</small>${progressBar(cards)}</a>`;
  }).join('');
  const ul = userDecks();
  view(`<section class="hero"><h1>Réviser, un peu chaque jour.</h1>
      <p>Choisis une matière, puis un paquet : cartes à retourner, QCM ou réponse à écrire. Ta progression reste sur cet appareil.</p></section>
    <div class="tiles">${tiles}
      <a class="tile" href="#/listes" style="--c:${USER_SECTION.color}"><span class="ico">${USER_SECTION.icon}</span><h2>Mes listes</h2>
        <p>Crée tes propres listes, importe-les depuis un texte et partage-les par lien.</p><small>${ul.length} liste${ul.length > 1 ? 's' : ''}</small></a>
      ${fav ? `<a class="tile" href="#/d/favoris" style="--c:#e11d48"><span class="ico">★</span><h2>Favoris</h2><p>Les cartes marquées d’une étoile.</p><small>${fav} cartes</small></a>` : ''}
    </div>
    <p class="foot">Astuce : sur téléphone, « Ajouter à l’écran d’accueil » installe Memento comme une appli (fonctionne hors ligne).
      · <a href="#/sauvegarde">Sauvegarder / restaurer</a></p>`);
}

function sectionView(sid) {
  const s = sectionOf(sid), decks = decksOf(sid);
  if (sid === 'perso') return listsView();
  const all = decks.flatMap((d) => d.cards);
  view(`<div class="crumbs"><a href="#/">Accueil</a></div>
    <h1 style="--c:${s.color}" class="sec-title"><span class="ico">${s.icon}</span>${s.title}</h1><p class="muted">${s.desc}</p>${s.note ? `<p class="note">${s.note}</p>` : ''}
    <div class="row"><a class="btn primary" href="#/d/tout-${sid}">Réviser toute la section (${all.length} cartes)</a></div>
    ${progressBar(all)}
    <div class="decks">${decks.map((d) => `<a class="deck" href="#/d/${d.id}">
      <b>${esc(d.title)}</b>${d.desc ? `<span class="muted">${esc(d.desc)}</span>` : ''}
      <small>${d.cards.length} cartes · ${stats(d.cards).ok} maîtrisées</small>${progressBar(d.cards)}</a>`).join('')}</div>`);
}

function deckView(id) {
  const d = getDeck(id);
  if (!d) return notFound();
  const s = sectionOf(d.section), fav = store.get('fav', {});
  const writable = d.section === 'mix' || (settings.reverse ? s.reverseAnswer != null : s.answer != null);
  const st = stats(d.cards);
  const back = d.section === 'mix' ? '#/' : d.user ? '#/listes' : `#/s/${d.section}`;
  view(`<div class="crumbs"><a href="#/">Accueil</a> › <a href="${back}">${d.section === 'mix' ? 'Accueil' : s.title}</a></div>
    <h1>${esc(d.title)}</h1>${d.desc ? `<p class="muted">${esc(d.desc)}</p>` : ''}
    <p class="legend"><span class="dot ok"></span>${st.ok} maîtrisées <span class="dot learning"></span>${st.learning} en cours <span class="dot new"></span>${st.new} nouvelles</p>
    ${progressBar(d.cards)}
    ${d.cards.length ? `<div class="modes">
      <a class="mode" href="#/d/${id}/cartes"><b>🃏 Cartes</b><span>Retourne la carte, dis si tu savais.</span></a>
      <a class="mode" href="#/d/${id}/qcm"><b>☑ QCM</b><span>Choisis la bonne réponse parmi quatre.</span></a>
      ${writable ? `<a class="mode" href="#/d/${id}/ecrire"><b>⌨ Écrire</b><span>Tape la réponse toi-même.</span></a>` : ''}
    </div>
    <details class="opts" ${store.get('optsOpen', false) ? 'open' : ''}><summary>Options de révision</summary>
      <label><input type="checkbox" id="o-rev" ${settings.reverse ? 'checked' : ''}> Sens inversé (${esc(s.fields[s.back[0]] || 'verso')} → ${esc(s.fields[s.front[0]] || 'recto')})</label>
      <label>Cartes par séance <select id="o-count">${[10, 20, 50, 0].map((n) => `<option value="${n}" ${settings.count === n ? 'selected' : ''}>${n || 'Toutes'}</option>`).join('')}</select></label>
      <label>Quelles cartes <select id="o-filter">
        <option value="all" ${settings.filter === 'all' ? 'selected' : ''}>Toutes (priorité aux moins sues)</option>
        <option value="todo" ${settings.filter === 'todo' ? 'selected' : ''}>Seulement celles non maîtrisées</option>
        <option value="new" ${settings.filter === 'new' ? 'selected' : ''}>Seulement les nouvelles</option></select></label>
      <button class="btn small ghost" id="o-reset">Remettre la progression de ce paquet à zéro</button>
    </details>` : '<p class="empty">Ce paquet est vide.</p>'}
    <div class="row">${d.user ? `<a class="btn" href="#/edit/${id}">Modifier</a><button class="btn" id="share">Partager par lien</button>`
      : d.virtual ? '' : `<button class="btn" id="copy">Copier dans mes listes</button>`}</div>
    <h2 class="sub">Les ${d.cards.length} cartes</h2>
    ${d.hidden && d.hidden.length ? `<p class="muted">${d.hidden.length} carte${d.hidden.length > 1 ? 's' : ''} supprimée${d.hidden.length > 1 ? 's' : ''} de ce paquet · <button class="btn small ghost" id="restore">Les rétablir</button></p>` : ''}
    <div class="cards">${d.cards.map((c) => { const cs = secOfCard(d, c); return `<div class="card-row st-${state(c.id)}">
      <div class="cr-tools"><button class="star ${fav[c.id] ? 'on' : ''}" data-id="${c.id}" title="Favori">★</button>
        <button class="ct" data-edit="${c.id}" title="Modifier">✎</button><button class="ct" data-del="${c.id}" title="Supprimer">✕</button></div>
      <div class="cr-front">${fieldHtml(cs, c, cs.front)}</div>
      <div class="cr-back">${fieldHtml(cs, c, cs.back)}${cs.extra.length ? `<details><summary>Détails</summary>${fieldHtml(cs, c, cs.extra, true)}</details>` : ''}${c.from ? `<small class="muted">${esc(c.from)}</small>` : ''}</div>
    </div>`; }).join('')}</div>`);

  const opts = $('.opts');
  if (opts) {
    opts.ontoggle = () => store.set('optsOpen', opts.open);
    $('#o-rev').onchange = (e) => { settings.reverse = e.target.checked; saveSettings(); deckView(id); };
    $('#o-count').onchange = (e) => { settings.count = +e.target.value; saveSettings(); };
    $('#o-filter').onchange = (e) => { settings.filter = e.target.value; saveSettings(); };
    $('#o-reset').onclick = () => {
      if (!confirm('Remettre à zéro la progression des ' + d.cards.length + ' cartes de ce paquet ?')) return;
      for (const c of d.cards) delete progress[c.id];
      store.set('progress', progress); deckView(id);
    };
  }
  app.querySelectorAll('.star').forEach((b) => b.onclick = () => {
    const f = store.get('fav', {});
    if (f[b.dataset.id]) delete f[b.dataset.id]; else f[b.dataset.id] = 1;
    store.set('fav', f); b.classList.toggle('on');
  });
  const find = (cid) => d.cards.find((c) => c.id === cid);
  app.querySelectorAll('[data-edit]').forEach((b) => b.onclick = () => {
    const c = find(b.dataset.edit); if (c) openCardEditor(c, secOfCard(d, c), () => deckView(id));
  });
  app.querySelectorAll('[data-del]').forEach((b) => b.onclick = () => {
    const c = find(b.dataset.del); if (!c) return;
    if (!confirm(isUserCard(c.id) ? 'Supprimer définitivement cette carte de ta liste ?' : 'Supprimer cette carte ? Tu pourras la rétablir en bas de cette page.')) return;
    if (deleteCard(c)) { toast('Carte supprimée'); deckView(id); } else toast('Suppression impossible');
  });
  const restore = $('#restore');
  if (restore) restore.onclick = () => { const n = d.hidden.length; restoreHidden(d); toast(n + ' carte' + (n > 1 ? 's' : '') + ' rétablie' + (n > 1 ? 's' : '')); deckView(id); };
  const copy = $('#copy');
  if (copy) copy.onclick = () => {
    const l = userDecks(), nid = 'u-' + Date.now().toString(36);
    l.push({ id: nid, title: d.title, desc: 'Copié de ' + s.title, cards: d.cards.map((c) => [s.front.map((i) => c.f[i]).join(' — '), s.back.map((i) => c.f[i]).filter(Boolean).join(' — ')]) });
    saveUserDecks(l); toast('Copié dans « Mes listes »'); location.hash = '#/edit/' + nid;
  };
  const share = $('#share');
  if (share) share.onclick = () => shareDeck(userDecks().find((x) => x.id === id));
}

// Sélection des cartes d'une séance : on privilégie celles qu'on sait le moins.
function pickCards(d) {
  let cards = d.cards;
  if (settings.filter === 'todo') cards = cards.filter((c) => state(c.id) !== 'ok');
  if (settings.filter === 'new') cards = cards.filter((c) => state(c.id) === 'new');
  cards = shuffle(cards).sort((a, b) => (progress[a.id] ?? 0.5) - (progress[b.id] ?? 0.5));
  if (settings.count) cards = cards.slice(0, settings.count);
  return shuffle(cards);
}

function sessionHeader(d, i, n, mode) {
  return `<div class="sess-top"><a href="#/d/${d.id}" class="btn small ghost">✕ Quitter</a>
    <span class="sess-tools"><button class="btn small ghost" id="c-edit" title="Modifier cette carte" aria-label="Modifier cette carte">✎<span class="wide"> Modifier</span></button><button class="btn small ghost bad" id="c-del" title="Supprimer cette carte" aria-label="Supprimer cette carte">🗑<span class="wide"> Supprimer</span></button></span>
    <span>${mode} · ${Math.min(i + 1, n)} / ${n}</span></div><div class="bar thin"><i class="ok" style="width:${(100 * i) / n}%"></i></div>`;
}
// Note une réponse en gardant le niveau précédent, pour pouvoir l'annuler si la carte est modifiée ou supprimée.
function record(results, c, ok) { results.push({ card: c, ok, prev: progress[c.id] }); mark(c.id, ok); }
// Boutons « Modifier » / « Supprimer » de la carte en cours ; show() réaffiche la séance.
function bindCardTools(d, cards, i, results, show) {
  const card = cards[i];
  const undo = () => { // carte déjà notée dans cette séance : on annule la note, elle sera reposée
    const r = results[results.length - 1];
    if (!r || r.card !== card) return;
    results.pop();
    if (r.prev == null) delete progress[card.id]; else progress[card.id] = r.prev;
    store.set('progress', progress);
  };
  $('#c-edit').onclick = () => openCardEditor(card, secOfCard(d, card), () => { undo(); show(); });
  $('#c-del').onclick = () => {
    const user = isUserCard(card.id);
    if (!confirm(user ? 'Supprimer définitivement cette carte de ta liste ?' : 'Supprimer cette carte ? Tu pourras la rétablir depuis la page du paquet.')) return;
    undo();
    if (!deleteCard(card)) return toast('Suppression impossible');
    const k = d.cards.indexOf(card); if (k >= 0) d.cards.splice(k, 1); // ne plus la proposer comme mauvaise réponse
    cards.splice(i, 1); toast('Carte supprimée'); show();
  };
}
function emptySession(d) {
  view(`<div class="done"><h1>Rien à réviser ici</h1><p>Avec le filtre choisi, aucune carte ne correspond. Change les options du paquet.</p>
    <a class="btn primary" href="#/d/${d.id}">Retour au paquet</a></div>`);
}
function endSession(d, results, mode) {
  if (!results.length) { location.hash = '#/d/' + d.id; return; } // toutes les cartes restantes ont été supprimées
  const ok = results.filter((r) => r.ok).length, missed = results.filter((r) => !r.ok);
  view(`<div class="done"><h1>${ok === results.length ? 'Parfait ! 🎉' : 'Séance terminée'}</h1>
    <p class="score">${ok} / ${results.length}</p>
    <div class="row center">${missed.length ? `<button class="btn primary" id="again">Revoir les ${missed.length} ratée${missed.length > 1 ? 's' : ''}</button>` : ''}
      <a class="btn" href="#/d/${d.id}/${mode}?${Date.now()}">Nouvelle séance</a><a class="btn ghost" href="#/d/${d.id}">Retour au paquet</a></div>
    ${missed.length ? `<h2 class="sub">À revoir</h2><div class="cards">${missed.map((r) => { const cs = secOfCard(d, r.card); return `<div class="card-row"><div class="cr-front">${fieldHtml(cs, r.card, cs.front)}</div><div class="cr-back">${fieldHtml(cs, r.card, cs.back)}</div></div>`; }).join('')}</div>` : ''}
  </div>`);
  const again = $('#again');
  if (again) again.onclick = () => ({ cartes: flashcards, qcm: quiz, ecrire: writeMode })[mode](d, shuffle(missed.map((r) => r.card)));
}

// --- Mode Cartes ---
function flashcards(d, list) {
  const cards = list || pickCards(d);
  if (!cards.length) return emptySession(d);
  let i = 0, flipped = false;
  const results = [];
  function show() {
    if (i >= cards.length) return endSession(d, results, 'cartes');
    const c = cards[i], cs = secOfCard(d, c), sd = sides(cs, c, settings.reverse);
    flipped = false;
    view(`${sessionHeader(d, i, cards.length, 'Cartes')}
      <div class="flip" id="card" tabindex="0"><div class="flip-in">
        <div class="face front">${fieldHtml(cs, c, sd.front)}<small class="hint">Touche la carte (ou Espace) pour la retourner</small></div>
        <div class="face back"><div class="recall">${fieldHtml(cs, c, sd.front)}</div>${fieldHtml(cs, c, sd.back)}${cs.extra.length ? `<div class="extra">${fieldHtml(cs, c, cs.extra, true)}</div>` : ''}</div>
      </div></div>
      <div class="answer-btns"><button class="btn bad" id="no">✗ Je ne savais pas <kbd>←</kbd></button><button class="btn good" id="yes">✓ Je savais <kbd>→</kbd></button></div>`);
    bindCardTools(d, cards, i, results, show);
    $('#card').onclick = flip;
    $('#no').onclick = () => answer(false);
    $('#yes').onclick = () => answer(true);
    onKeys((e) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
      else if (e.key === 'ArrowLeft') answer(false);
      else if (e.key === 'ArrowRight') answer(true);
    });
  }
  function flip() { flipped = !flipped; $('#card').classList.toggle('on', flipped); $('#card .front').classList.add('again'); }
  function answer(ok) {
    if (!flipped) { flip(); return; } // on doit voir la réponse avant de juger
    record(results, cards[i], ok); i++; show();
  }
  show();
}

// --- Mode QCM ---
function answerText(cs, c, reverse) { return (reverse ? cs.front : cs.back).map((i) => c.f[i]).filter(Boolean).join(' — '); }
function quiz(d, list) {
  const cards = list || pickCards(d);
  if (!cards.length) return emptySession(d);
  // réservoir de mauvaises réponses : le paquet, puis toute la section si besoin
  const pool = (c) => {
    const cs = secOfCard(d, c), mine = answerText(cs, c, settings.reverse);
    let others = [...new Set(d.cards.filter((x) => secOfCard(d, x) === cs).map((x) => answerText(cs, x, settings.reverse)))].filter((t) => t !== mine);
    if (others.length < 3 && cs.id !== 'perso') others = [...new Set(decksOf(cs.id).flatMap((x) => x.cards).map((x) => answerText(cs, x, settings.reverse)))].filter((t) => t !== mine);
    // en philo, le même auteur peut revenir avec une autre œuvre : on évite deux options du même auteur
    if (cs.id === 'philo' && !settings.reverse) { const a = c.f[1]; others = others.filter((t) => !t.startsWith(a + ' — ') && t !== a); }
    return shuffle(others).slice(0, 3);
  };
  let i = 0;
  const results = [];
  function show() {
    if (i >= cards.length) return endSession(d, results, 'qcm');
    const c = cards[i], cs = secOfCard(d, c), sd = sides(cs, c, settings.reverse), right = answerText(cs, c, settings.reverse);
    const opts = shuffle([right, ...pool(c)]);
    view(`${sessionHeader(d, i, cards.length, 'QCM')}
      <div class="q">${fieldHtml(cs, c, sd.front)}</div>
      <div class="choices">${opts.map((o, k) => `<button class="choice" data-k="${k}"><kbd>${k + 1}</kbd><span>${esc(o)}</span></button>`).join('')}</div>
      <div id="fb"></div>`);
    bindCardTools(d, cards, i, results, show);
    let answered = false;
    const pick = (k) => {
      if (answered) return; answered = true;
      const ok = opts[k] === right;
      record(results, c, ok);
      app.querySelectorAll('.choice').forEach((b) => { const v = opts[+b.dataset.k]; b.disabled = true; if (v === right) b.classList.add('right'); else if (+b.dataset.k === k) b.classList.add('wrong'); });
      $('#fb').innerHTML = `<div class="feedback ${ok ? 'good' : 'bad'}"><b>${ok ? 'Bonne réponse !' : 'Raté.'}</b>
        ${cs.extra.length ? fieldHtml(cs, c, cs.extra, true) : ''}${settings.reverse ? fieldHtml(cs, c, cs.front) : ''}</div>
        <button class="btn primary" id="next">Continuer <kbd>Entrée</kbd></button>`;
      renderMath($('#fb'));
      $('#next').onclick = () => { i++; show(); };
      $('#next').focus();
    };
    app.querySelectorAll('.choice').forEach((b) => b.onclick = () => pick(+b.dataset.k));
    onKeys((e) => {
      if (!answered && /^[1-4]$/.test(e.key) && +e.key <= opts.length) pick(+e.key - 1);
      else if (answered && e.key === 'Enter') { e.preventDefault(); i++; show(); }
    });
  }
  show();
}

// --- Mode Écrire ---
const norm = (s) => s.toLowerCase().replace(/[’']/g, "'").replace(/\s*\(.*?\)\s*/g, ' ').replace(/[.!?;:«»"]/g, '').replace(/\s+/g, ' ').trim();
const noAccent = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss');
const ARTICLES = /^(der|die|das|den|dem|des|ein|eine|le|la|les|l'|un|une|des|du|se|s'|sich|to)\s*/;
const FR_ARTICLES = /^(le|la|les|l'|un|une|des|du|se|s')\s*/; // facultatifs : « chien » vaut « le chien »
function lev(a, b) {
  const m = a.length, n = b.length; let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
  return prev[n];
}
// Renvoie 'ok', 'almost' (faute d'accent, de frappe ou d'article) ou 'no'.
function check(input, target, isAuthor) {
  const a = norm(input);
  if (!a) return 'no';
  // les parenthèses (pluriel, formes du verbe, date…) ne font pas partie de la réponse attendue
  let alts = target.replace(/\([^)]*\)/g, ' ').split(/\s*[,;/]\s*|\s+ou\s+/).map(norm).filter((x) => x && !x.startsWith('-'));
  if (isAuthor) { // un nom de l'auteur suffit (« Kant », « Emmanuel Kant », « Engels » pour « Marx et Engels »)
    const words = new Set(alts.flatMap((x) => noAccent(x).split(/[\s-]+/)).filter((w) => w.length >= 3 && !['et', 'des', 'les', 'saint', 'von', 'van'].includes(w)));
    if (noAccent(a).split(/[\s-]+/).some((w) => words.has(w))) return 'ok';
  }
  let best = 'no';
  for (const t of alts) {
    if (a === t || a.replace(FR_ARTICLES, '') === t.replace(FR_ARTICLES, '')) return 'ok';
    const a2 = noAccent(a), t2 = noAccent(t);
    if (a2 === t2 || a2.replace(ARTICLES, '') === t2.replace(ARTICLES, '') || (t2.length >= 5 && lev(a2, t2) <= 1)) best = 'almost';
  }
  return best;
}
function writeMode(d, list) {
  const cards = list || pickCards(d);
  if (!cards.length) return emptySession(d);
  let i = 0;
  const results = [];
  function show() {
    if (i >= cards.length) return endSession(d, results, 'ecrire');
    const c = cards[i], cs = secOfCard(d, c);
    const ai = settings.reverse ? cs.reverseAnswer : cs.answer;
    if (ai == null) { i++; return show(); } // carte d'une section où l'écriture n'a pas de sens
    const sd = sides(cs, c, settings.reverse), target = c.f[ai];
    view(`${sessionHeader(d, i, cards.length, 'Écrire')}
      <div class="q">${fieldHtml(cs, c, sd.front)}</div>
      <form id="wf" class="write" autocomplete="off"><label for="w">${esc(cs.fields[ai])}</label>
        <input id="w" autocapitalize="off" spellcheck="false" placeholder="Ta réponse…">
        <div class="row"><button class="btn primary">Valider</button><button type="button" class="btn ghost" id="skip">Je ne sais pas</button></div>
        ${cs.id === 'allemand' || cs.id === 'perso' ? '<div class="keys">' + ['ä', 'ö', 'ü', 'ß', 'é', 'è', 'ç'].map((k) => `<button type="button" class="key">${k}</button>`).join('') + '</div>' : ''}
      </form><div id="fb"></div>`);
    bindCardTools(d, cards, i, results, show);
    const inp = $('#w'); inp.focus();
    app.querySelectorAll('.key').forEach((k) => k.onclick = () => { inp.setRangeText(k.textContent, inp.selectionStart, inp.selectionEnd, 'end'); inp.focus(); });
    let done = false;
    const finish = (res) => {
      if (done) return; done = true;
      let ok = res !== 'no';
      inp.disabled = true;
      $('#wf .row').remove();
      const render = () => {
        $('#fb').innerHTML = `<div class="feedback ${ok ? 'good' : 'bad'}"><b>${res === 'ok' ? 'Exact !' : res === 'almost' ? 'Presque — compté juste' : ok ? 'Corrigé : compté juste' : 'Raté.'}</b>
          <div class="fld">Réponse : <b>${esc(target)}</b></div>${fieldHtml(cs, c, sd.back.filter((x) => x !== ai))}${cs.extra.length ? fieldHtml(cs, c, cs.extra, true) : ''}</div>
          <div class="row">${!ok && inp.value.trim() ? '<button class="btn ghost" id="over">J’avais juste</button>' : ''}<button class="btn primary" id="next">Continuer <kbd>Entrée</kbd></button></div>`;
        renderMath($('#fb'));
        $('#next').onclick = next; $('#next').focus();
        const over = $('#over');
        if (over) over.onclick = () => { ok = true; results[results.length - 1].ok = true; progress[c.id] = Math.max(1, level(c.id) + 1); store.set('progress', progress); render(); };
      };
      record(results, c, ok); render();
    };
    const next = () => { i++; show(); };
    $('#wf').onsubmit = (e) => { e.preventDefault(); if (!done) finish(check(inp.value, target, cs.id === 'philo')); };
    $('#skip').onclick = () => finish('no');
    onKeys((e) => { if (done && e.key === 'Enter') { e.preventDefault(); next(); } });
  }
  show();
}

// ---------- Mes listes ----------
function listsView() {
  const l = userDecks();
  view(`<div class="crumbs"><a href="#/">Accueil</a></div><h1>Mes listes</h1>
    <p class="muted">Tes listes sont enregistrées dans ce navigateur. Pour les retrouver ailleurs, partage-les par lien ou fais une sauvegarde.</p>
    <div class="row"><a class="btn primary" href="#/edit/new">+ Nouvelle liste</a><a class="btn" href="#/sauvegarde">Sauvegarder / restaurer</a></div>
    ${l.length ? `<div class="decks">${l.map((u) => { const d = userDeckToDeck(u); return `<a class="deck" href="#/d/${u.id}">
      <b>${esc(d.title)}</b>${d.desc ? `<span class="muted">${esc(d.desc)}</span>` : ''}<small>${d.cards.length} cartes</small>${progressBar(d.cards)}</a>`; }).join('')}</div>`
      : '<p class="empty">Aucune liste pour l’instant. Crée-en une, ou ouvre un paquet existant et choisis « Copier dans mes listes ».</p>'}`);
}

function editView(id) {
  const l = userDecks();
  let u = id === 'new' ? { id: 'u-' + Date.now().toString(36), title: '', desc: '', cards: [['', ''], ['', ''], ['', '']] } : l.find((x) => x.id === id);
  if (!u) return notFound();
  u = JSON.parse(JSON.stringify(u));
  const rows = () => u.cards.map((c, k) => `<div class="erow" data-k="${k}"><span class="num">${k + 1}</span>
    <textarea rows="1" data-f="0" placeholder="Terme">${esc(c[0])}</textarea><textarea rows="1" data-f="1" placeholder="Définition">${esc(c[1])}</textarea>
    <button class="btn small ghost del" title="Supprimer la ligne">✕</button></div>`).join('');
  view(`<div class="crumbs"><a href="#/">Accueil</a> › <a href="#/listes">Mes listes</a></div>
    <h1>${id === 'new' ? 'Nouvelle liste' : 'Modifier la liste'}</h1>
    <div class="form"><input id="e-title" placeholder="Titre (ex. : Verbes irréguliers anglais)" value="${esc(u.title)}">
      <input id="e-desc" placeholder="Description (facultatif)" value="${esc(u.desc)}"></div>
    <details class="opts"><summary>Importer depuis un texte (Quizlet, tableur, notes…)</summary>
      <p class="muted">Une carte par ligne, terme et définition séparés par une tabulation, « | », « ; » ou « - ». Les formules entre $…$ sont rendues en LaTeX.</p>
      <textarea id="bulk" rows="6" placeholder="der Hund | le chien&#10;die Katze | le chat"></textarea>
      <button class="btn" id="do-import">Ajouter ces lignes</button></details>
    <div id="rows">${rows()}</div>
    <div class="row"><button class="btn" id="add">+ Ajouter une carte</button></div>
    <div class="row sticky"><button class="btn primary" id="save">Enregistrer</button><a class="btn ghost" href="${id === 'new' ? '#/listes' : '#/d/' + id}">Annuler</a>
      ${id === 'new' ? '' : '<button class="btn bad ghost" id="remove">Supprimer la liste</button>'}</div>`);
  const sync = () => app.querySelectorAll('.erow').forEach((r) => r.querySelectorAll('textarea').forEach((t) => { u.cards[+r.dataset.k][+t.dataset.f] = t.value; }));
  const grow = (t) => { t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; };
  const bind = () => {
    app.querySelectorAll('#rows textarea').forEach((t) => { grow(t); t.oninput = () => grow(t); });
    app.querySelectorAll('.del').forEach((b) => b.onclick = () => { sync(); u.cards.splice(+b.closest('.erow').dataset.k, 1); redraw(); });
  };
  const redraw = () => { $('#rows').innerHTML = rows(); bind(); };
  bind();
  $('#add').onclick = () => { sync(); u.cards.push(['', '']); redraw(); app.querySelector('.erow:last-child textarea').focus(); };
  $('#do-import').onclick = () => {
    sync();
    const lines = $('#bulk').value.split('\n').map((x) => x.trim()).filter(Boolean);
    const parsed = lines.map((x) => { const m = x.split(/\t| \| |\|| ; |;| - | – | — | = /); return [m[0].trim(), m.slice(1).join(' — ').trim()]; });
    u.cards = u.cards.filter((c) => c[0] || c[1]).concat(parsed);
    $('#bulk').value = ''; redraw(); toast(parsed.length + ' cartes ajoutées');
  };
  $('#save').onclick = () => {
    sync();
    u.title = $('#e-title').value.trim() || 'Sans titre'; u.desc = $('#e-desc').value.trim();
    u.cards = u.cards.filter((c) => c[0].trim() || c[1].trim());
    const all = userDecks(), k = all.findIndex((x) => x.id === u.id);
    if (k >= 0) all[k] = u; else all.push(u);
    saveUserDecks(all); toast('Liste enregistrée'); location.hash = '#/d/' + u.id;
  };
  const rm = $('#remove');
  if (rm) rm.onclick = () => { if (confirm('Supprimer définitivement « ' + u.title + ' » ?')) { saveUserDecks(userDecks().filter((x) => x.id !== u.id)); location.hash = '#/listes'; } };
}

// Partage : la liste entière tient dans le lien (encodée en base64).
const b64e = (s) => btoa(String.fromCharCode(...new TextEncoder().encode(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64d = (s) => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0)));
function shareDeck(u) {
  const url = location.href.split('#')[0] + '#/import/' + b64e(JSON.stringify({ t: u.title, d: u.desc, c: u.cards }));
  if (navigator.share) navigator.share({ title: u.title, url }).catch(() => {});
  else navigator.clipboard.writeText(url).then(() => toast('Lien copié !'), () => prompt('Copie ce lien :', url));
}
function importView(code) {
  let data;
  try { data = JSON.parse(b64d(code)); } catch { return view('<h1>Lien invalide</h1><p>Ce lien de partage est abîmé.</p><a class="btn" href="#/">Accueil</a>'); }
  view(`<h1>Importer « ${esc(data.t)} »</h1><p class="muted">${data.c.length} cartes. Elles seront ajoutées à « Mes listes ».</p>
    <div class="cards">${data.c.slice(0, 8).map((c) => `<div class="card-row"><div class="cr-front">${esc(c[0])}</div><div class="cr-back">${esc(c[1])}</div></div>`).join('')}</div>
    ${data.c.length > 8 ? '<p class="muted">…</p>' : ''}<div class="row"><button class="btn primary" id="ok">Ajouter à mes listes</button><a class="btn ghost" href="#/">Annuler</a></div>`);
  $('#ok').onclick = () => { const l = userDecks(), id = 'u-' + Date.now().toString(36); l.push({ id, title: data.t, desc: data.d || '', cards: data.c }); saveUserDecks(l); location.hash = '#/d/' + id; };
}

// ---------- Sauvegarde ----------
function backupView() {
  view(`<div class="crumbs"><a href="#/">Accueil</a></div><h1>Sauvegarder / restaurer</h1>
    <p class="muted">Tout (listes, progression, favoris) est stocké dans ce navigateur. Télécharge une sauvegarde pour le transférer sur un autre appareil.</p>
    <div class="row"><button class="btn primary" id="dl">Télécharger la sauvegarde</button>
      <label class="btn">Restaurer un fichier…<input type="file" id="up" accept=".json,application/json" hidden></label></div>`);
  $('#dl').onclick = () => {
    const blob = new Blob([JSON.stringify({ memento: 1, lists: userDecks(), progress, fav: store.get('fav', {}), edits: cardEdits, hidden: cardHidden })], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'memento-sauvegarde.json'; a.click(); URL.revokeObjectURL(a.href);
  };
  $('#up').onchange = async (e) => {
    try {
      const j = JSON.parse(await e.target.files[0].text());
      if (!j.memento) throw 0;
      const l = userDecks(), ids = new Set(l.map((x) => x.id));
      saveUserDecks(l.concat((j.lists || []).filter((x) => !ids.has(x.id))));
      progress = Object.assign(progress, j.progress || {}); store.set('progress', progress);
      store.set('fav', Object.assign(store.get('fav', {}), j.fav || {}));
      store.set('edits', Object.assign(cardEdits, j.edits || {}));
      store.set('hidden', Object.assign(cardHidden, j.hidden || {}));
      // les cartes fournies sont lues au chargement : on recharge pour appliquer modifications et suppressions
      location.hash = '#/'; location.reload();
    } catch { toast('Fichier non reconnu'); }
  };
}

// ---------- Recherche ----------
function searchView(q = '') {
  view(`<div class="crumbs"><a href="#/">Accueil</a></div><h1>Rechercher</h1>
    <input id="q" class="search" placeholder="Un mot, un auteur, un théorème…" value="${esc(q)}"><div id="res"></div>`);
  const inp = $('#q'); inp.focus();
  const all = [...DECKS.values(), ...userDecks().map(userDeckToDeck)];
  let t;
  const run = () => {
    const s = noAccent(inp.value.toLowerCase().trim());
    history.replaceState(null, '', '#/recherche/' + encodeURIComponent(inp.value));
    if (s.length < 2) { $('#res').innerHTML = ''; return; }
    const hits = [];
    for (const d of all) for (const c of d.cards) if (noAccent(c.f.join(' ').toLowerCase()).includes(s)) { hits.push([d, c]); if (hits.length >= 60) break; }
    $('#res').innerHTML = hits.length ? `<p class="muted">${hits.length >= 60 ? '60 premiers résultats' : hits.length + ' résultat' + (hits.length > 1 ? 's' : '')}</p><div class="cards">${hits.map(([d, c]) => { const cs = sectionOf(d.section); return `<a class="card-row" href="#/d/${d.id}">
      <div class="cr-front">${fieldHtml(cs, c, cs.front)}</div><div class="cr-back">${fieldHtml(cs, c, cs.back)}<small class="muted">${esc(cs.title)} › ${esc(d.title)}</small></div></a>`; }).join('')}</div>` : '<p class="empty">Aucun résultat.</p>';
    renderMath($('#res'));
  };
  inp.oninput = () => { clearTimeout(t); t = setTimeout(run, 150); };
  if (q) run();
}

function notFound() { view('<h1>Introuvable</h1><p>Cette page n’existe pas (ou plus).</p><a class="btn" href="#/">Accueil</a>'); }

// ---------- Routage ----------
function route() {
  const h = location.hash.replace(/^#\/?/, '').replace(/\?.*$/, '');
  const [a, b, c] = h.split('/');
  if (!a) return home();
  if (a === 's') return sectionView(b);
  if (a === 'listes') return listsView();
  if (a === 'edit') return editView(b);
  if (a === 'import') return importView(b);
  if (a === 'sauvegarde') return backupView();
  if (a === 'recherche') return searchView(decodeURIComponent(b || ''));
  if (a === 'd') {
    const d = getDeck(b);
    if (!d) return notFound();
    if (c === 'cartes') return flashcards(d);
    if (c === 'qcm') return quiz(d);
    if (c === 'ecrire') return writeMode(d);
    return deckView(b);
  }
  notFound();
}
window.addEventListener('hashchange', route);
route();
// KaTeX se charge en différé : on relance le rendu des formules quand il est prêt.
window.addEventListener('load', () => renderMath(app));

if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
