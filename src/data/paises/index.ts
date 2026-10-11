// Para añadir un país: crea su archivo en esta carpeta (copia espana.ts) y añádelo a PAISES.
import { chile } from './chile';
import { espana } from './espana';
import { portugal } from './portugal';
import { suiza } from './suiza';
import type { Pais } from './types';

export const PAISES: Pais[] = [espana, portugal, suiza, chile];

// Los ids se escriben a mano: una errata haría que un preset o interruptor no apagase nada sin avisar. Falla el build.
for (const p of PAISES) {
  const conToggle = new Set(p.grupos.filter((g) => g.toggle).map((g) => g.id));
  const ids = [...p.toggles.map((t) => t.grupo), ...Object.values(p.presets).flatMap((x) => x.apagados)];
  const malos = ids.filter((id) => !conToggle.has(id));
  if (malos.length) throw new Error(`${p.slug}: ids sin grupo con toggle: ${malos.join(', ')}`);
  if (Object.values(p.presets).some((x) => x.over > p.overMax)) throw new Error(`${p.slug}: preset con over > overMax`);
}

export const getPais = (slug: string) => PAISES.find((p) => p.slug === slug);
