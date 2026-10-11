# ¿Quién paga tu nómina?

Sitio estático en Astro 7 (sin framework de UI, sin servidor) que estima qué parte de la población vive de ingresos públicos frente a privados en España, Portugal, Suiza y Chile, en es/en/pt. El README tiene la estructura completa y cómo actualizar datos; aquí solo lo que hace falta para trabajar en el código.

## Comandos

- Servidor de desarrollo: `astro dev --background` (gestionar con `astro dev stop | status | logs`). URL: http://localhost:4321/es/spain/
- Build: `npm run build` → `dist/`. Ejecuta primero `astro check` (tipos) y después `astro build`; si falla la comprobación de tipos, no se genera nada. Solo tipos: `npm run check`.
- **Es la única verificación que hay** (no hay tests ni linter): ejecútalo tras cualquier cambio en `src/`. `astro build` por sí solo no comprueba tipos; es `astro check` el que detecta traducciones `{ es, en, pt }` incompletas.
- Despliegue: Netlify (`netlify.toml`, Node 22).

## Arquitectura

- **Datos por país**: `src/data/paises/<país>.ts` exporta un `Pais` (tipos en `types.ts`); se registra en `PAISES` (`index.ts`). Todas las páginas, pestañas y columnas de la comparativa salen de ahí.
- **Cálculo único**: `src/data/calculo.ts` (`calcular`, `activo`, `valor`, `estadoPreset`). Lo usan tanto el navegador (`src/scripts/estimador.ts`) como la comparativa en build (`Comparativa.astro`). No dupliques la fórmula.
- **Paso de datos al cliente**: `[lang]/[pais].astro` serializa un `Config` en `<script type="application/json" id="cfg">` (escapando `<`), y `estimador.ts` lo lee. Si añades campos al cliente, amplía `Config` en `estimador.ts`.
- **Estado del usuario**: `localStorage` con clave `ipp-state-v<N>-<slug>` (`VERSION_ESTADO` en `estimador.ts`). Al cargar, `validarEstado` rehace el `Estado` campo a campo (ids existentes en `off`/`alt`, `over` numérico entre 0 y `overMax`) y descarta lo demás. Si cambias la forma de `Estado`, amplía `validarEstado` y sube `VERSION_ESTADO` cuando lo guardado ya no se pueda interpretar.
- **i18n**: textos genéricos en `src/i18n/ui.ts` (`UI`, `LOCALES`); textos de cada país como objetos `Txt` `{ es, en, pt }`. Helpers en `src/i18n/utils.ts`: `t()`, `fmt()` (formato numérico por idioma), `plantilla()`, `pathFor()`. Rutas siempre con prefijo de idioma: `/{lang}/{slug}/`, `/{lang}/compare/`.

## Convenciones

- Identificadores, comentarios y commits en español (`grupos`, `apagados`, `fechaDatos`…). Sigue ese estilo.
- Cifras en **millones de personas**. Cada `Grupo` lleva su fuente en `src`; al cambiar una cifra revisa también `toggles[].detalle`, `cabecera`, `metodo`, `advertencias`, `fechaDatos` y `pie`, que repiten números o fechas.
- Los cuatro presets (`empleo`, `pens`, `base`, `ajust`) y las `Categoria` son comunes a todos los países: la comparativa depende de ello.
- Añadir un idioma toca a la vez `LOCALES` y su bloque en `UI` (con `intl`, que usa `fmt()`) en `ui.ts`, `locales` en `astro.config.mjs`, `BANDERAS` en `Navegacion.astro` y todos los `Txt`.
- Estilos en `src/styles/global.css` con modo claro/oscuro; diseño móvil primero (controles táctiles ≥ 44 px, tablas que se apilan).
- `¿Quién paga tu nómina_.html` en la raíz es la versión original de referencia: no editarla.

## Documentación de Astro

https://docs.astro.build — en especial [routing](https://docs.astro.build/en/guides/routing/), [i18n](https://docs.astro.build/en/guides/internationalization/) y [componentes](https://docs.astro.build/en/basics/astro-components/).
