# Plantilla «Productos artesanos y del campo» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **rústico**
(verde oliva + tierra + crema, títulos en serif del sistema muy grandes, antetítulos en versalitas con una línea de
color, esquinas rectas, bandas a todo el ancho que alternan foto a sangre, oliva, tierra, crema y papel de estraza).
Para queserías, mieles, aceites, huertas, ganaderías y cooperativas. Todo en castellano de España, frases cortas, sin jerga.
El brief de diseño completo está en `DISEÑO.md`.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga, lo tipa y normaliza las listas; no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario = oliva, acento = tierra, fondo = crema, texto). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…) y Tailwind los expone como `bg-primario`, `text-acento`… Los derivados (`--c-oscuro` del pie, `--c-kraft` del papel de estraza, `--c-acento-texto`, `--c-acento-claro`, `--c-crema`, `--c-linea`, `--c-suave`) se calculan con `color-mix` en `src/styles/global.css`. Sobre oliva y tierra el texto es crema: el primario y el acento deben ser colores oscuros o medios.
- **Tipografías y aspecto general**: `src/styles/global.css` (`--fuente-titulos` serif del sistema; bandas `.banda--crema|kraft|oliva|tierra|oscura`; botones `.btn` tierra, `.btn-sec` contorno, `.btn-claro` crema, `.btn-pedir`; `.hero-sangre`, `.estanteria`, `.franja-pasos`, `.mosaico`, `.etiqueta-colgante`, `.linea-precio`, `.filtro`; cabecera `.cabecera--campo`; pie `.pie--campo`). Fuentes del sistema: no añadas fuentes externas.
- **Cabecera** (`src/components/Header.astro`): fija a todo el ancho; transparente sobre la foto de portada y oliva al bajar (script mínimo; sin JavaScript, siempre oliva). En páginas sin portada deja un hueco de su altura.
- **Pie** (`src/components/Footer.astro`): el nombre en serif gigante como firma y columnas de marca y redes, menú, categorías de la despensa y contacto.
- **Imágenes**: en `public/`. Fotos en `public/fotos/` (las genera el coordinador desde `fotos.json`); respaldo en `public/placeholders/` (`producto.svg`, `paisaje.svg`, `persona.svg`). En `site.yaml` se referencian con ruta absoluta (`/fotos/producto-1.jpg`). Si una foto falta, `Imagen.astro` muestra su SVG de respaldo. Fotos de personas: `/placeholders/persona.svg`.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = hoja + nombre en serif.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie` (se oculta solo con `false`).

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`. Se pintan en el orden en que aparecen en `site.yaml`.
- `hero` → `secciones/hero.astro` · portada a sangre (92 % de la pantalla), título enorme, dos botones y franja de rasgos al pie.
- `productos` → `secciones/productos.astro` · la despensa: estantería de borde a borde con pestañas por categoría, «Pedir» y WhatsApp.
- `origen` → `secciones/origen.astro` · fila 50/50: foto a sangre + historia sobre oliva + la familia (`personas`).
- `cifras` → `secciones/cifras.astro` · banda tierra con datos en serif enorme (no se pinta sin items).
- `proceso` → `secciones/proceso.astro` · del campo a la mesa: franja de fotos a sangre con números romanos.
- `cita` → `secciones/cita.astro` · frase grande en cursiva sobre foto a sangre con velo oliva.
- `donde-comprar` → `secciones/donde-comprar.astro` · puntos de venta en filas + botón a la tienda online.
- `galeria` → `secciones/galeria.astro` · mosaico de fotos de borde a borde sin márgenes.
- `opiniones` → `secciones/opiniones.astro` · opiniones en columnas sobre papel de estraza (no se pinta vacía).
- `preguntas` → `secciones/preguntas.astro` · acordeón `details/summary` (no se pinta vacía).
- `cta` → `secciones/cta.astro` · banda tierra con título enorme y dos botones.
- `contacto` → `secciones/contacto.astro` · banda oliva con datos y formulario de pedido («Producto» relleno con la despensa).
- `texto` → `secciones/texto.astro` · apartado genérico para secciones nuevas (`tipo: texto`), con foto a sangre opcional.

## Campos propios de esta plantilla (además del esquema común)
- `hero.items[]`: rasgos al pie de la portada (`titulo` = rasgo, `texto` = detalle). Vacío = no se pinta.
- `productos.productos[]`: `{ nombre, categoria, formato, precio, destacado, texto, imagen }`.
  - `categoria`: agrupa y crea las pestañas («Quesos», «Miel»…). Con una sola categoría no hay pestañas.
  - `formato`: tamaño o presentación («Pieza de 1 kg», «Tarro de 500 g»); sale con una línea de puntos hasta el precio.
  - `precio`: **cadena**. `"Consultar"` o vacío = no se muestra precio y el botón dice «Consultar». Nunca inventes precios.
  - `destacado: true` = etiqueta colgante «Lo más pedido».
  - El botón «Pedir» lleva a `contacto` y deja el producto elegido en el formulario; el de WhatsApp (si hay `contacto.whatsapp`) abre el chat con el producto escrito.
  - Lista vacía = se muestra el `texto` y el botón `cta`.
- `origen`: `texto` con líneas en blanco entre párrafos; `imagen`; `cta`; `personas[] { nombre, cargo, foto, texto }`.
- `cifras.items[]`: `{ titulo (dato), texto }`. No inventes cifras.
- `proceso.items[]`: `{ titulo, texto, imagen }` (el número romano se pone solo).
- `cita`: `declaracion` (la frase), `autor`, `imagen` (fondo).
- `donde-comprar`: `items[] { titulo, texto, icono, url }` (`url` opcional: con ella la fila es un enlace) y `cta` (tienda online; sin `url` no sale). Debajo sale el `contacto.horario`.
- `galeria.galeria[]`: rutas de fotos (la primera, grande).
- `opiniones.testimonios[]`: `{ texto, autor, lugar }`. No inventes opiniones.
- `cta`: `cta` sin `url` → WhatsApp del negocio o el formulario; `cta_secundario` sin `url` → el teléfono.
- `contacto.cta.texto`: texto del botón del formulario.
- Iconos disponibles: ver `src/components/ui/Icono.astro` (casa, calendario, mapa, camion, tienda, queso, tarro, espiga, hoja, gota, sol, regalo…).

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`.
3. **Cambiar textos, teléfonos, horarios, fotos, productos**: solo en `site.yaml`. Si un texto contiene comas o «: » dentro de `{ … }` (también «11,50 €»), ponlo entre comillas.
4. **Listas planas**: ningún elemento de lista puede llevar otra lista dentro. Máximo 24 elementos por lista.
5. **Página nueva**: crea `src/pages/<slug>.astro` usando `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`, empezando por una banda (`<section class="banda banda--oliva sobre-oscuro">`); enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
6. **Sección nueva**: mejor con `tipo:` (`tipo: texto`, `tipo: cita`, `tipo: productos`…) y un id propio en `site.yaml`. Si hace falta un diseño nuevo, crea `src/components/secciones/<id>.astro` copiando la estructura de una existente (`seccion(Astro.props.id)`, `Seccion` con su `banda`, `Titular`). Cada sección es una banda a todo el ancho: nada de cajas estrechas centradas. `src/pages/index.astro` la recoge sola.
7. **No tocar** `src/layouts/Base.astro`, `src/pages/index.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Los ids `hero` y `contacto` no se cambian. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts`: son el SEO de base (canónica, og:image, `noindex` si `seo.indexable: false`, JSON-LD del negocio y de las preguntas, robots, sitemap y llms.txt), salen solos de `site.yaml` y el fichero es el mismo en todas las plantillas. `seo.url` y `seo.indexable` los pone la plataforma: no los cambies.
8. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` (carga diferida), sin JavaScript nuevo salvo necesidad real (ya hay cuatro scripts mínimos: cabecera, pestañas de la despensa, menú móvil y asunto del formulario), 16 px de margen lateral del texto (`.contenedor`), fotos y fondos a sangre, botones de 44 px como mínimo, sin scroll horizontal en móvil. Imágenes de contenido con `alt` sacado del contenido (`altHero`, `altFicha`, `altGaleria`, `altSeccion` de `src/lib/seo.ts`, o el `nombre` de la ficha); las decorativas, `alt=""` (Imagen.astro les pone `aria-hidden`).
9. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`. Para envío real, cambia `action` en `src/components/ui/FormularioContacto.astro`.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.
