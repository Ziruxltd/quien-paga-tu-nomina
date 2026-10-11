# ¿Quién paga tu nómina?

Página interactiva que estima, país por país, cuánta gente vive de un **ingreso público** (empleo público, pensiones, paro, rentas mínimas…) y cuánta de un **ingreso privado** (asalariados privados, autónomos y empresarios), con datos de 2026.

- **Países:** España, Portugal, Suiza y Chile, más una página que los compara (`/{idioma}/compare/`).
- **Idiomas:** español, inglés y portugués. Se cambian con las banderas de la cabecera. La raíz `/` redirige según el idioma del navegador.

Con los supuestos por defecto, España sale en torno a **47 % público / 53 % privado**, Portugal en torno a **50 % / 50 %** Suiza en torno a **43 % / 57 %** (solo residentes) y Chile en torno a **22 % / 78 %** (las pensiones de las AFP cuentan como ingreso privado). Cada página deja activar o desactivar grupos, cambiar la forma de contar la renta mínima (hogares o personas) y aplicar un descuento por doble conteo.

> ⚠ Es una estimación propia, no una estadística oficial. Mezcla datos de fuentes y meses distintos y puede contar a la misma persona en más de un grupo. Cada página explica sus limitaciones.

La página se adapta a móvil y escritorio: cabecera fija en una fila, controles táctiles de 44 px como mínimo y tablas que se apilan en tarjetas en pantallas estrechas.

Está hecha con [Astro](https://astro.build) y se genera como un sitio estático: no tiene servidor ni base de datos. El estado de los supuestos se guarda en el `localStorage` del navegador, por separado para cada país.

## Requisitos

- Node.js 22.12 o superior
- npm

## Uso

```sh
npm install        # instala las dependencias
npm run dev        # servidor de desarrollo en http://localhost:4321
npm run check      # comprueba los tipos (traducciones incompletas, etc.)
npm run build      # comprueba los tipos y genera el sitio estático en dist/
npm run preview    # sirve dist/ para revisarlo antes de publicar
```

## Estructura

```
src/
├── data/
│   ├── paises/
│   │   ├── types.ts        # Tipos: Pais, Grupo, Toggle, Estado, categorías y escenarios
│   │   ├── espana.ts       # Cifras, textos traducidos y fuentes de España
│   │   ├── portugal.ts     # Ídem para Portugal
│   │   ├── suiza.ts        # Ídem para Suiza
│   │   ├── chile.ts        # Ídem para Chile
│   │   └── index.ts        # Lista PAISES
│   └── calculo.ts          # Cálculo compartido (página de cada país y comparativa)
├── i18n/
│   ├── ui.ts               # Idiomas (LOCALES) y textos genéricos de la interfaz
│   └── utils.ts            # t(), fmt() con formato numérico por idioma, pathFor()
├── scripts/estimador.ts    # Lógica interactiva de la página de cada país
├── styles/global.css       # Estilos y paleta (modo claro y oscuro)
├── layouts/Base.astro      # <html>, <head>, hreflang y navegación
├── components/             # Navegacion (pestañas de país + banderas), secciones y Comparativa
└── pages/
    ├── index.astro         # / → redirige al idioma del navegador
    └── [lang]/
        ├── [pais].astro    # /es/spain/, /pt/portugal/…
        ├── compare.astro   # /en/compare/…
        └── index.astro     # /es/ → /es/spain/
```

`¿Quién paga tu nómina_.html` es la versión original en un único HTML y se conserva como referencia.

## Actualizar los datos

Cada país está en `src/data/paises/<país>.ts`, con cifras en millones de personas:

- `grupos`: cada grupo con su lado (`pub` o `priv`), su `categoria` (para la comparativa), su valor `v`, su fuente `src` y `toggle` (si se puede desactivar). `alt` es una forma alternativa de contarlo (p. ej. personas en lugar de hogares).
- `toggles`: el texto de los interruptores. Si cambias una cifra, revisa también su `detalle`.
- `presets`: qué grupos quita cada escenario rápido y qué descuento aplica. Los cuatro escenarios son comunes a todos los países para que la comparativa tenga sentido.
- `cabecera`, `metodo`, `advertencias`, `fechaDatos` y `pie` llevan fechas o cifras en el texto: revísalos al actualizar.

Todos los textos de un país son objetos `{ es, en, pt }`.

## Añadir un país

1. Copia `src/data/paises/espana.ts` a un archivo nuevo, cambia `slug` (será la URL) y rellena datos, textos y fuentes.
2. Añádelo a `PAISES` en `src/data/paises/index.ts`.

Las páginas, la pestaña de la cabecera y la columna de la comparativa se generan solas.

## Añadir un idioma

1. Añade su código a `LOCALES` en `src/i18n/ui.ts` y a `locales` en `astro.config.mjs`.
2. Añade su bloque de textos a `UI` (con `intl`, el código para formatear números).
3. Añade su bandera SVG en `BANDERAS` de `src/components/Navegacion.astro`.
4. Añade la traducción a todos los textos `{ es, en, pt }` de cada país. `npm run check` (y `npm run build`) avisa de los que falten.

## Cálculo

```
% público = (suma de grupos públicos activos − descuento por doble conteo)
            ÷ (total público + total privado)
```

Los asalariados privados se obtienen restando el empleo público al total de asalariados de la encuesta de población activa de cada país (EPA en España, Inquérito ao Emprego en Portugal, SAKE en Suiza, ENE en Chile).

## Despliegue

`npm run build` deja en `dist/` archivos estáticos que se pueden publicar en cualquier hosting estático: Netlify, Vercel, Cloudflare Pages o GitHub Pages. Para GitHub Pages en un subdirectorio, define `site` y `base` en `astro.config.mjs` ([guía](https://docs.astro.build/en/guides/deploy/github/)).

## Fuentes de datos

Las fuentes de cada país están en la sección `fuentes` de su archivo y aparecen al final de su página.
