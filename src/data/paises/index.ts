// Para añadir un país: crea su archivo en esta carpeta (copia espana.ts) y añádelo a PAISES.
import { chile } from './chile';
import { espana } from './espana';
import { portugal } from './portugal';
import { suiza } from './suiza';
import type { Pais } from './types';

export const PAISES: Pais[] = [espana, portugal, suiza, chile];

export const getPais = (slug: string) => PAISES.find((p) => p.slug === slug);
