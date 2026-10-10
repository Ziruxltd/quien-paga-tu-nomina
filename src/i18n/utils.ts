import { LOCALES, UI, type Locale } from './ui';

export const esLocale = (x: string | undefined): x is Locale => LOCALES.includes(x as Locale);

export const t = (lang: Locale) => UI[lang];

/** Formatea un número con el separador decimal del idioma. */
export const fmt = (lang: Locale, x: number, d = 1) =>
  x.toLocaleString(UI[lang].intl, { minimumFractionDigits: d, maximumFractionDigits: d });

/** Sustituye {clave} en una plantilla. */
export const plantilla = (s: string, vars: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

/** URL de una página: ruta es el slug del país o 'compare'. */
export const pathFor = (lang: Locale, ruta: string) => `/${lang}/${ruta}/`;
