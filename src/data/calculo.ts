// Cálculo compartido por la página de cada país (en el navegador) y la comparativa (en el build).
import type { Estado, Grupo, Pais, PresetId } from './paises/types';

export const ESTADO_INICIAL: Estado = { off: [], alt: [], over: 0 };

export const estadoPreset = (pais: Pais, id: PresetId): Estado => ({
  off: [...pais.presets[id].apagados],
  alt: [],
  over: pais.presets[id].over,
});

export const activo = (g: Grupo, e: Estado) => !g.toggle || !e.off.includes(g.id);
export const valor = (g: Grupo, e: Estado) => (g.alt && e.alt.includes(g.id) ? g.alt.v : g.v);

export function calcular(grupos: Grupo[], e: Estado) {
  let pub = 0, priv = 0;
  grupos.forEach((g) => {
    if (activo(g, e)) g.side === 'pub' ? (pub += valor(g, e)) : (priv += valor(g, e));
  });
  const over = Math.min(+e.over, pub);
  pub -= over;
  const tot = pub + priv;
  const pp = (pub / tot) * 100;
  return { pub, priv, over, tot, pp, pv: 100 - pp, ratio: priv / pub };
}
