// Vérifie les données avant publication : node tools/check.mjs
// Contrôle le nombre de champs de chaque carte, les doublons et affiche le nombre de cartes par section.
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const FIELDS = { philo: [5, 5], maths: [2, 3], physique: [2, 3], allemand: [2, 2] };
const sources = [];
globalThis.MEMENTO = { add: (section, text) => sources.push({ section, text }) };
for (const f of readdirSync(root + 'data').filter((x) => x.endsWith('.js')).sort()) new Function(readFileSync(root + 'data/' + f, 'utf8'))();

let errors = 0;
const totals = {};
for (const { section, text } of sources) {
  let deck = null;
  const seen = new Set();
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('//') || line.startsWith('> ')) continue;
    if (line.startsWith('# ')) { deck = line.slice(2); seen.clear(); continue; }
    const f = line.split(' | ');
    const [min, max] = FIELDS[section];
    if (f.length < min || f.length > max || f.some((x) => !x.trim())) { errors++; console.error(`✗ ${section} › ${deck} : ${f.length} champ(s) — ${line.slice(0, 80)}`); }
    if (seen.has(f[0])) { errors++; console.error(`✗ doublon dans ${section} › ${deck} : ${f[0].slice(0, 60)}`); }
    seen.add(f[0]);
    if ((line.match(/\$/g) || []).length % 2) { errors++; console.error(`✗ $ non fermé dans ${section} › ${deck} : ${line.slice(0, 80)}`); }
    totals[section] = (totals[section] || 0) + 1;
  }
}
console.log(Object.entries(totals).map(([s, n]) => `${s} : ${n} cartes`).join('\n'));
if (errors) { console.error(`${errors} erreur(s)`); process.exit(1); }
console.log('Données valides ✓');
