# ¿Quién paga tu nómina?

Página interactiva que estima cuánta gente en España vive de un **ingreso público** (empleo público, pensiones, paro, Ingreso Mínimo Vital…) y cuánta de un **ingreso privado** (asalariados privados, autónomos y empresarios), con datos de 2026.

Con los supuestos por defecto el reparto sale en torno a **47 % público / 53 % privado**. La página deja activar o desactivar cada grupo, contar el IMV por hogares o por personas y aplicar un descuento por doble conteo para ver cómo cambia el resultado.

> ⚠ Es una estimación propia, no una estadística oficial. Mezcla datos de fuentes y meses distintos y puede contar a la misma persona en más de un grupo. La propia página explica estas limitaciones.

Está hecha con [Astro](https://astro.build) y se genera como un sitio estático: no tiene servidor ni base de datos. El estado de los supuestos se guarda en el `localStorage` del navegador.

## Requisitos

- Node.js 22.12 o superior
- npm

## Uso

```sh
npm install        # instala las dependencias
npm run dev        # servidor de desarrollo en http://localhost:4321
npm run build      # genera el sitio estático en dist/
npm run preview    # sirve dist/ para revisarlo antes de publicar
```

## Estructura

```
src/
├── data/grupos.ts        # Cifras, fuentes, interruptores, escenarios y enlaces
├── scripts/estimador.ts  # Lógica interactiva (cálculo, barras, tabla, persistencia)
├── styles/global.css     # Estilos y paleta (modo claro y oscuro)
├── layouts/Base.astro    # <html>, <head>, fuentes y CSS global
├── components/           # Una sección de la página por componente
│   ├── Cabecera.astro
│   ├── Resultado.astro
│   ├── Supuestos.astro
│   ├── Desglose.astro
│   ├── Calculo.astro
│   ├── Advertencias.astro
│   └── Fuentes.astro
└── pages/index.astro     # Página principal que une todo
```

`¿Quién paga tu nómina_.html` es la versión original en un único HTML y se conserva como referencia.

## Actualizar los datos

Todas las cifras están en `src/data/grupos.ts`, en millones de personas:

- `GRUPOS`: cada grupo con su lado (`pub` o `priv`), valor `v`, fuente `src` e interruptor `key`. El IMV tiene también `vP`, que cuenta personas en lugar de hogares.
- `TOGGLES`: el texto de los interruptores. Si cambias una cifra, revisa también su `detalle`.
- `PRESETS`: los escenarios rápidos.
- `FUENTES`: los enlaces de la sección de fuentes.

Hay textos que también llevan fechas o cifras y que conviene revisar: el pie en `src/pages/index.astro`, la cabecera en `Cabecera.astro` y la advertencia sobre fechas en `Advertencias.astro`.

## Cálculo

```
% público = (suma de grupos públicos activos − descuento por doble conteo)
            ÷ (total público + total privado)
```

Los asalariados privados se obtienen restando los asalariados públicos al total de asalariados de la EPA.

## Despliegue

`npm run build` deja en `dist/` archivos estáticos que se pueden publicar en cualquier hosting estático: Netlify, Vercel, Cloudflare Pages o GitHub Pages. Para GitHub Pages en un subdirectorio, define `site` y `base` en `astro.config.mjs` ([guía](https://docs.astro.build/en/guides/deploy/github/)).

## Fuentes de datos

- [INE · Encuesta de Población Activa, 2.º trimestre 2026](https://www.ine.es/dyngs/Prensa/EPA2T26.pdf)
- [esdiario · Asalariados y no asalariados, EPA 2T 2026](https://www.esdiario.com/economia/260728/194255/mercado-laboral-bate-record-ocupacion-subempleo-sigue-alza-indefinidos.html)
- [Europa Press · Nómina de pensiones de junio 2026](https://www.bolsamania.com/noticias_print/economia/economia--amp-la-seguridad-social-destina-en-junio-28432-millones-a-la-paga-ordinaria-y-la-extra-de-las-pensiones--22844972.html)
- [Vozpópuli · Clases pasivas y no contributivas](https://www.vozpopuli.com/economia/macroeconomia/la-factura-de-las-pensiones-supera-la-barrera-de-los-16000-millones-al-mes-con-la-ultima-subida.html)
- [Roams · Beneficiarios de prestación por desempleo (SEPE, mayo 2026)](https://roams.es/actualidad/finanzas/cuando-se-cobra-paro-agosto-2026-caixabank-santander-bbva-bancos/)
- [La Moncloa · Ingreso Mínimo Vital, junio 2026](https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/inclusion/Paginas/2026/070726-ingreso-minimo-vital-junio.aspx)
