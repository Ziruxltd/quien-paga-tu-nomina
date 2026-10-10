import { ESTADO_INICIAL, GRUPOS, PRESETS, type ClaveToggle, type Estado, type Grupo } from '../data/grupos';

const CLAVES: ClaveToggle[] = ['tAut', 'tPens', 'tClas', 'tNoc', 'tParo', 'tImv'];
const MAX = 16;

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

const state: Estado = { ...ESTADO_INICIAL };
try {
  const s = JSON.parse(localStorage.getItem('ipp-state') || 'null');
  if (s) Object.assign(state, s);
} catch (e) {}

const fmt = (x: number, d = 1) => x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });
const val = (g: Grupo) => (g.id === 'imv' && state.imvMode === 'p' ? g.vP! : g.v);
const on = (g: Grupo) => !g.key || state[g.key];
const nombre = (g: Grupo) => (g.id === 'imv' ? g.name + (state.imvMode === 'p' ? ' (personas)' : ' (hogares)') : g.name);

function render() {
  CLAVES.forEach((k) => ($<HTMLInputElement>(k).checked = state[k]));
  $('imvH').setAttribute('aria-pressed', String(state.imvMode === 'h'));
  $('imvP').setAttribute('aria-pressed', String(state.imvMode === 'p'));
  $<HTMLInputElement>('sOver').value = String(state.over);
  $('vOver').textContent = fmt(+state.over) + ' M';

  let pub = 0, priv = 0;
  GRUPOS.forEach((g) => {
    if (on(g)) g.side === 'pub' ? (pub += val(g)) : (priv += val(g));
  });
  const over = Math.min(+state.over, pub);
  pub -= over;
  const tot = pub + priv, pp = (pub / tot) * 100, pv = 100 - pp;
  $('pctPub').textContent = fmt(pp, 0) + '%';
  $('pctPriv').textContent = fmt(pv, 0) + '%';
  $('absPub').textContent = fmt(pub) + ' M personas';
  $('absPriv').textContent = fmt(priv) + ' M personas';
  $('bPub').style.flexBasis = pp + '%';
  $('bPriv').style.flexBasis = pv + '%';
  $('bar100').setAttribute('aria-label', `Público ${fmt(pp, 0)}%, privado ${fmt(pv, 0)}%`);
  const r = priv / pub;
  $('ratio').innerHTML = r >= 1
    ? `Por cada persona con ingreso público hay <strong>${fmt(r, 2)}</strong> con ingreso privado.`
    : `Hay más personas con ingreso público: <strong>${fmt(1 / r, 2)}</strong> por cada una con ingreso privado.`;

  // filas
  const rows = $('rows');
  rows.innerHTML = '';
  const list: (Grupo | { adj: true })[] = [
    ...GRUPOS.filter((g) => g.side === 'pub'),
    ...(over > 0 ? [{ adj: true as const }] : []),
    ...GRUPOS.filter((g) => g.side === 'priv'),
  ];
  list.forEach((g) => {
    const d = document.createElement('div');
    if ('adj' in g) {
      d.className = 'row adj';
      d.innerHTML = `<div class="top"><span>Descuento por doble conteo (supuesto)</span><span class="num">−${fmt(over, 2)} M</span></div><div class="track"><div class="fill" style="width:${(over / MAX) * 100}%"></div></div>`;
    } else {
      const v = val(g);
      d.className = 'row ' + g.side + (on(g) ? '' : ' off');
      d.innerHTML = `<div class="top"><span>${nombre(g)}</span><span class="num">${fmt(v, 2)} M</span></div><div class="track"><div class="fill" style="width:${Math.min(v / MAX, 1) * 100}%"></div></div>`;
    }
    rows.appendChild(d);
  });

  // tabla
  const tb = $('tbody');
  tb.innerHTML = '';
  const addRow = (cls: string, a: string, b: string, c: string) => {
    const tr = document.createElement('tr');
    if (cls) tr.className = cls;
    tr.innerHTML = `<td>${a}</td><td>${b}</td><td class="n">${c}</td>`;
    tb.appendChild(tr);
  };
  const dot = (s: string) => `<span class="dot" style="background:var(--${s})"></span>`;
  GRUPOS.filter((g) => g.side === 'pub').forEach((g) => addRow(on(g) ? '' : 'excl', dot('pub') + nombre(g), g.src, fmt(val(g), 2) + ' M'));
  if (over > 0) addRow('', dot('warn') + 'Descuento por doble conteo', 'Supuesto del usuario', '−' + fmt(over, 2) + ' M');
  addRow('tot', 'Total público', '', fmt(pub, 2) + ' M');
  GRUPOS.filter((g) => g.side === 'priv').forEach((g) => addRow(on(g) ? '' : 'excl', dot('priv') + g.name, g.src, fmt(val(g), 2) + ' M'));
  addRow('tot', 'Total privado', '', fmt(priv, 2) + ' M');

  $('formula').innerHTML = `% público = ${fmt(pub, 2)} ÷ (${fmt(pub, 2)} + ${fmt(priv, 2)}) = <strong>${fmt(pp, 1)}%</strong>`;
  try {
    localStorage.setItem('ipp-state', JSON.stringify(state));
  } catch (e) {}
}

CLAVES.forEach((k) =>
  $<HTMLInputElement>(k).addEventListener('change', (e) => {
    state[k] = (e.target as HTMLInputElement).checked;
    render();
  }),
);
$('imvH').addEventListener('click', () => { state.imvMode = 'h'; render(); });
$('imvP').addEventListener('click', () => { state.imvMode = 'p'; render(); });
$<HTMLInputElement>('sOver').addEventListener('input', (e) => {
  state.over = +(e.target as HTMLInputElement).value;
  render();
});
document.querySelectorAll<HTMLButtonElement>('[data-preset]').forEach((b) =>
  b.addEventListener('click', () => {
    Object.assign(state, PRESETS[b.dataset.preset!].estado);
    render();
  }),
);
render();
