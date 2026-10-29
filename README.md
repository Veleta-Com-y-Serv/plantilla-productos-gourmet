# Plantilla NoExpertise · Productos artesanos y del campo

Web de una sola página, a todo el ancho y rústica, para queserías, mieles, aceites, huertas, ganaderías,
cooperativas y tiendas de producto local. Astro 5 + Tailwind 4, derivada de [AstroWind](https://github.com/onwidget/astrowind)
(MIT, ver `LICENSE-ASTROWIND.md`). El contenido sale entero de `site.yaml`; el ejemplo es una quesería ficticia de
Trujillo (Cáceres), «Majada del Berrocal».

- **Estilo**: verde oliva + tierra + crema, serif del sistema muy grande, bandas a sangre (ver `DISEÑO.md`).
- **Plan mínimo**: gratis · **Sectores**: alimentacion, gourmet, agricultura, ganaderia, cooperativa, queseria, miel.

## Secciones (en el orden del ejemplo)

| id | Qué es | Campos propios |
|---|---|---|
| `hero` | Portada a sangre con título enorme y dos botones | `items` (rasgos al pie: titulo, texto) |
| `productos` | La despensa: estantería de borde a borde con pestañas | `productos` (nombre, categoria, formato, precio, destacado, texto, imagen), `cta` |
| `origen` | Foto a sangre + historia + la familia | `texto` (párrafos), `imagen`, `cta`, `personas` (nombre, cargo, foto, texto) |
| `cifras` | Banda tierra con datos grandes | `items` (titulo = dato, texto) |
| `proceso` | Del campo a la mesa: fotos a sangre con números romanos | `items` (titulo, texto, imagen) |
| `cita` | Frase grande sobre foto con velo | `declaracion`, `autor`, `imagen` |
| `donde-comprar` | Puntos de venta y tienda online | `items` (titulo, texto, icono, url), `cta` |
| `galeria` | Mosaico de fotos sin márgenes | `galeria` (rutas) |
| `opiniones` | Opiniones en columnas | `testimonios` (texto, autor, lugar) |
| `preguntas` | Acordeón de preguntas frecuentes | `preguntas` (pregunta, respuesta) |
| `cta` | Banda de llamada a la acción | `cta`, `cta_secundario` |
| `contacto` | Datos y formulario de pedido (`mailto`) | `cta.texto` (botón) |

Además, `texto.astro` es el diseño genérico para apartados nuevos (`tipo: texto`). Todas pintan bien con listas y
campos vacíos: sin precio no hay precio, sin cifras no hay banda de cifras, sin opiniones no hay opiniones.

## Construir

```
npm ci
npm run build        # dist/
npx astro preview
```

Fotos: `fotos.json` (16, se generan aparte); mientras no existan se ven los SVG de `public/placeholders/`.
Contrato de plantillas de la plataforma: `docs/plantillas.md` y `docs/seo-base.md` del repo de NoExpertise.
