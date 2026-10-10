// Cifras del cálculo, en millones de personas. Para actualizar los datos, edita este archivo.

export type Lado = 'pub' | 'priv';
export type ClaveToggle = 'tAut' | 'tPens' | 'tClas' | 'tNoc' | 'tParo' | 'tImv';

export interface Grupo {
  id: string;
  side: Lado;
  name: string;
  src: string;
  /** Valor en millones de personas */
  v: number;
  /** Solo IMV: valor contando personas en lugar de hogares */
  vP?: number;
  /** Interruptor que lo activa; null = siempre se cuenta */
  key: ClaveToggle | null;
}

export const GRUPOS: Grupo[] = [
  { id: 'apub', side: 'pub', name: 'Asalariados del sector público', src: 'EPA 2T 2026 (INE)', v: 3.6469, key: null },
  { id: 'pens', side: 'pub', name: 'Pensionistas de la Seguridad Social', src: 'Seguridad Social, junio 2026', v: 9.5, key: 'tPens' },
  { id: 'clas', side: 'pub', name: 'Clases pasivas', src: 'Prensa, 2026 (dato de pensiones)', v: 0.737, key: 'tClas' },
  { id: 'noc', side: 'pub', name: 'Pensiones no contributivas', src: 'Prensa, 2026 (aprox.)', v: 0.5, key: 'tNoc' },
  { id: 'paro', side: 'pub', name: 'Prestación o subsidio por desempleo', src: 'SEPE, mayo 2026', v: 1.686936, key: 'tParo' },
  { id: 'imv', side: 'pub', name: 'Ingreso Mínimo Vital', src: 'INSS, junio 2026', v: 0.860458, vP: 2.627344, key: 'tImv' },
  { id: 'apriv', side: 'priv', name: 'Asalariados del sector privado', src: 'EPA 2T 2026: 19,59 M − 3,65 M', v: 15.9385, key: null },
  { id: 'aut', side: 'priv', name: 'Autónomos y empresarios', src: 'EPA 2T 2026 (no asalariados)', v: 3.1936, key: 'tAut' },
];

/** Interruptores simples del panel de supuestos (el IMV tiene su propio control). */
export const TOGGLES: { key: Exclude<ClaveToggle, 'tImv'>; titulo: string; detalle: string; lado: Lado }[] = [
  { key: 'tAut', lado: 'priv', titulo: 'Contar autónomos y empresarios', detalle: '3,19 M. Son ingreso privado, aunque no sean asalariados.' },
  { key: 'tPens', lado: 'pub', titulo: 'Contar pensionistas de la Seguridad Social', detalle: '~9,5 M de personas que cobran 10,5 M de pensiones.' },
  { key: 'tClas', lado: 'pub', titulo: 'Contar clases pasivas', detalle: '~0,74 M. Pensiones de funcionarios del régimen antiguo del Estado.' },
  { key: 'tNoc', lado: 'pub', titulo: 'Contar pensiones no contributivas', detalle: '~0,5 M. Para quien no cotizó lo suficiente.' },
  { key: 'tParo', lado: 'pub', titulo: 'Contar prestaciones por desempleo', detalle: '1,69 M beneficiarios de paro o subsidio.' },
];

export interface Estado extends Record<ClaveToggle, boolean> {
  imvMode: 'h' | 'p';
  /** Descuento por doble conteo, en millones */
  over: number;
}

export const ESTADO_INICIAL: Estado = {
  tAut: true, tPens: true, tClas: true, tNoc: true, tParo: true, tImv: true, imvMode: 'h', over: 0,
};

export const PRESETS: Record<string, { label: string; estado: Estado }> = {
  empleo: { label: 'Solo empleo', estado: { tAut: false, tPens: false, tClas: false, tNoc: false, tParo: false, tImv: false, imvMode: 'h', over: 0 } },
  pens: { label: 'Empleo + pensiones', estado: { tAut: true, tPens: true, tClas: true, tNoc: true, tParo: false, tImv: false, imvMode: 'h', over: 0 } },
  base: { label: 'Todo (base)', estado: { ...ESTADO_INICIAL } },
  ajust: { label: 'Todo, ajustado', estado: { ...ESTADO_INICIAL, over: 0.9 } },
};

export const FUENTES: { texto: string; url: string }[] = [
  { texto: 'INE · Encuesta de Población Activa, 2.º trimestre 2026', url: 'https://www.ine.es/dyngs/Prensa/EPA2T26.pdf' },
  { texto: 'esdiario · Asalariados y no asalariados, EPA 2T 2026', url: 'https://www.esdiario.com/economia/260728/194255/mercado-laboral-bate-record-ocupacion-subempleo-sigue-alza-indefinidos.html' },
  { texto: 'Europa Press · Nómina de pensiones de junio 2026', url: 'https://www.bolsamania.com/noticias_print/economia/economia--amp-la-seguridad-social-destina-en-junio-28432-millones-a-la-paga-ordinaria-y-la-extra-de-las-pensiones--22844972.html' },
  { texto: 'Vozpópuli · Clases pasivas y no contributivas', url: 'https://www.vozpopuli.com/economia/macroeconomia/la-factura-de-las-pensiones-supera-la-barrera-de-los-16000-millones-al-mes-con-la-ultima-subida.html' },
  { texto: 'Roams · Beneficiarios de prestación por desempleo (SEPE, mayo 2026)', url: 'https://roams.es/actualidad/finanzas/cuando-se-cobra-paro-agosto-2026-caixabank-santander-bbva-bancos/' },
  { texto: 'La Moncloa · Ingreso Mínimo Vital, junio 2026', url: 'https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/inclusion/Paginas/2026/070726-ingreso-minimo-vital-junio.aspx' },
];
