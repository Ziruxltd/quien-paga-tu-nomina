import { activo, calcular, ESTADO_INICIAL, estadoPreset, valor } from '../data/calculo';
import type { Estado, Grupo, Pais, PresetId } from '../data/paises/types';
import type { Locale } from '../i18n/ui';
import { fmt as fmtL, plantilla, t } from '../i18n/utils';

/** Datos que la página del país deja en <script type="application/json" id="cfg"> */
export interface Config {
  lang: Locale;
  slug: string;
  escalaMax: number;
  overMax: number;
  grupos: Grupo[];
  presets: Pais['presets'];
}

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

const cfg: Config = JSON.parse($('cfg').textContent!);
const { lang, grupos, escalaMax: MAX } = cfg;
const tx = t(lang);
const fmt = (x: number, d = 1) => fmtL(lang, x, d);
// Sube VERSION_ESTADO al cambiar la forma de Estado: los estados guardados con otra versión se ignoran.
const VERSION_ESTADO = 1;
const CLAVE = `ipp-state-v${VERSION_ESTADO}-${cfg.slug}`;
const CLAVE_SIN_VERSION = 'ipp-state-' + cfg.slug;

const ids = new Set(grupos.map((g) => g.id));
const listaIds = (x: unknown) => (Array.isArray(x) ? [...new Set(x.filter((id): id is string => typeof id === 'string' && ids.has(id)))] : []);

/** Rehace un Estado válido a partir de lo guardado; descarta campos desconocidos o con tipo incorrecto. */
function validarEstado(s: unknown): Estado | null {
  if (!s || typeof s !== 'object') return null;
  const { off, alt, over } = s as Record<string, unknown>;
  return {
    off: listaIds(off),
    alt: listaIds(alt),
    over: typeof over === 'number' && Number.isFinite(over) ? Math.min(Math.max(over, 0), cfg.overMax) : ESTADO_INICIAL.over,
  };
}

function leer(clave: string) {
  try {
    return validarEstado(JSON.parse(localStorage.getItem(clave) || 'null'));
  } catch (e) {
    return null;
  }
}

// La clave sin versión tenía la misma forma que la v1: se migra una vez y se borra.
const state: Estado = leer(CLAVE) ?? leer(CLAVE_SIN_VERSION) ?? { ...ESTADO_INICIAL, off: [], alt: [] };
try {
  localStorage.removeItem(CLAVE_SIN_VERSION);
} catch (e) {}

const val = (g: Grupo) => valor(g, state);
const on = (g: Grupo) => activo(g, state);
const nombre = (g: Grupo) =>
  g.alt ? `${g.name[lang]} (${(state.alt.includes(g.id) ? g.alt.label : g.alt.baseLabel)[lang].toLowerCase()})` : g.name[lang];

const checks = document.querySelectorAll<HTMLInputElement>('input[data-grupo]');
const altBtns = document.querySelectorAll<HTMLButtonElement>('button[data-alt]');

function render() {
  checks.forEach((c) => (c.checked = !state.off.includes(c.dataset.grupo!)));
  altBtns.forEach((b) => b.setAttribute('aria-pressed', String(state.alt.includes(b.dataset.alt!) === (b.dataset.valor === '1'))));
  $<HTMLInputElement>('sOver').value = String(state.over);
  $('vOver').textContent = fmt(+state.over) + ' M';

  const { pub, priv, over, pp, pv, ratio: r } = calcular(grupos, state);
  $('pctPub').textContent = fmt(pp, 0) + '%';
  $('pctPriv').textContent = fmt(pv, 0) + '%';
  $('absPub').textContent = plantilla(tx.mPersonas, { x: fmt(pub) });
  $('absPriv').textContent = plantilla(tx.mPersonas, { x: fmt(priv) });
  $('bPub').style.flexBasis = pp + '%';
  $('bPriv').style.flexBasis = pv + '%';
  $('bar100').setAttribute('aria-label', plantilla(tx.barAria, { pub: fmt(pp, 0), priv: fmt(pv, 0) }));
  // Con el descuento al máximo pub puede quedar en 0 y el ratio sería infinito.
  $('ratio').innerHTML = !pub ? '' : r >= 1 ? plantilla(tx.ratioPriv, { x: fmt(r, 2) }) : plantilla(tx.ratioPub, { x: fmt(1 / r, 2) });

  // filas
  const rows = $('rows');
  rows.innerHTML = '';
  const list: (Grupo | { adj: true })[] = [
    ...grupos.filter((g) => g.side === 'pub'),
    ...(over > 0 ? [{ adj: true as const }] : []),
    ...grupos.filter((g) => g.side === 'priv'),
  ];
  list.forEach((g) => {
    const d = document.createElement('div');
    if ('adj' in g) {
      d.className = 'row adj';
      d.innerHTML = `<div class="top"><span>${tx.overFila}</span><span class="num">−${fmt(over, 2)} M</span></div><div class="track"><div class="fill" style="width:${Math.min(over / MAX, 1) * 100}%"></div></div>`;
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
  grupos.filter((g) => g.side === 'pub').forEach((g) => addRow(on(g) ? '' : 'excl', dot('pub') + nombre(g), g.src[lang], fmt(val(g), 2) + ' M'));
  if (over > 0) addRow('', dot('warn') + tx.overTitulo, tx.overFuente, '−' + fmt(over, 2) + ' M');
  addRow('tot', tx.totPub, '', fmt(pub, 2) + ' M');
  grupos.filter((g) => g.side === 'priv').forEach((g) => addRow(on(g) ? '' : 'excl', dot('priv') + nombre(g), g.src[lang], fmt(val(g), 2) + ' M'));
  addRow('tot', tx.totPriv, '', fmt(priv, 2) + ' M');

  $('formula').innerHTML = `${tx.formulaPub} = ${fmt(pub, 2)} ÷ (${fmt(pub, 2)} + ${fmt(priv, 2)}) = <strong>${fmt(pp, 1)}%</strong>`;
  try {
    localStorage.setItem(CLAVE, JSON.stringify(state));
  } catch (e) {}
}

const alterna = (lista: string[], id: string, incluir: boolean) => (incluir ? [...new Set([...lista, id])] : lista.filter((x) => x !== id));

checks.forEach((c) =>
  c.addEventListener('change', () => {
    state.off = alterna(state.off, c.dataset.grupo!, !c.checked);
    render();
  }),
);
altBtns.forEach((b) =>
  b.addEventListener('click', () => {
    state.alt = alterna(state.alt, b.dataset.alt!, b.dataset.valor === '1');
    render();
  }),
);
$<HTMLInputElement>('sOver').addEventListener('input', (e) => {
  state.over = +(e.target as HTMLInputElement).value;
  render();
});
document.querySelectorAll<HTMLButtonElement>('[data-preset]').forEach((b) =>
  b.addEventListener('click', () => {
    Object.assign(state, estadoPreset(cfg.presets, b.dataset.preset as PresetId));
    render();
  }),
);
render();
