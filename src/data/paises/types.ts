import type { Txt } from '../../i18n/ui';

export type Lado = 'pub' | 'priv';
export type Categoria = 'empleoPub' | 'pensiones' | 'desempleo' | 'rentaMinima' | 'asalPriv' | 'autonomos' | 'pensionesPriv';
export const CATEGORIAS: Categoria[] = ['empleoPub', 'pensiones', 'desempleo', 'rentaMinima', 'asalPriv', 'autonomos', 'pensionesPriv'];

export type PresetId = 'empleo' | 'pens' | 'base' | 'ajust';
export const PRESET_IDS: PresetId[] = ['empleo', 'pens', 'base', 'ajust'];

export interface Grupo {
  id: string;
  side: Lado;
  /** Tipo de grupo, para la comparativa entre países */
  categoria: Categoria;
  name: Txt;
  src: Txt;
  /** Valor en millones de personas */
  v: number;
  /** Forma alternativa de contar el grupo (p. ej. personas en lugar de hogares) */
  alt?: { v: number; label: Txt; baseLabel: Txt };
  /** true = el usuario puede quitarlo del cálculo con un interruptor */
  toggle: boolean;
}

export interface Toggle {
  /** id del grupo que activa o desactiva */
  grupo: string;
  titulo: Txt;
  detalle: Txt;
}

export interface Pais {
  /** Segmento de la URL: /{lang}/{slug}/ */
  slug: string;
  nombre: Txt;
  grupos: Grupo[];
  /** Interruptores del panel de supuestos, en orden */
  toggles: Toggle[];
  /** Grupos que cada escenario quita del cálculo y descuento por doble conteo que aplica */
  presets: Record<PresetId, { apagados: string[]; over: number }>;
  /** Máximo del deslizador de doble conteo, en millones */
  overMax: number;
  /** Escala de las barras del desglose, en millones */
  escalaMax: number;
  cabecera: { eyebrow: Txt; titulo: Txt; lede: Txt };
  /** Texto bajo el título de «Cómo se ha calculado» */
  metodo: Txt;
  /** Fecha de los datos, para la comparativa */
  fechaDatos: Txt;
  advertencias: { dir: Txt; titulo: Txt; texto: Txt }[];
  fuentes: { texto: string; url: string }[];
  pie: Txt;
}

export interface Estado {
  /** Grupos desactivados */
  off: string[];
  /** Grupos contados con su valor alternativo */
  alt: string[];
  /** Descuento por doble conteo, en millones */
  over: number;
}
