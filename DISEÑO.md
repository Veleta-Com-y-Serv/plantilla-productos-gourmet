# Productos artesanos y del campo: brief de diseño

Plantilla `productos-gourmet` creada el 29/10/2026 a partir de `catalogo-productos` con `php artisan plantillas:nueva`
y rediseñada entera (tanda «a ancho completo»). Este fichero se queda en el repo: es lo que lee quien (persona o
agente) rediseñe la plantilla.

## Brief

- **Para quién**: pequeños productores y tiendas del campo: queserías, mieles, aceites y almazaras pequeñas, huertas,
  ganaderías, conserveras, cooperativas y ultramarinos de producto local (`sectores`: alimentacion, gourmet,
  agricultura, ganaderia, cooperativa, queseria, miel). Su cliente entra para ver qué venden, de dónde sale, cuánto
  cuesta y cómo se lo llevan a casa.
- **Qué tiene que conseguir la web**: el pedido. Cada producto tiene «Pedir» (al formulario con el producto elegido)
  y WhatsApp con el producto escrito; banda de llamada a la acción «¿Te preparamos un pedido?» y formulario de pedido
  con localidad de entrega. Secundario: que se fíen (origen, proceso, opiniones) y que sepan dónde comprar.
- **Tono y estilo** (`estilo: rustico`): honesto, terroso, generoso. Sí: etiquetas de tienda de ultramarinos, papel
  de estraza, cuadernos de campo, carteles de mercado. No: «gourmet» de lujo negro y dorado, ni catálogo técnico
  con tablas (eso es `catalogo-productos`), ni tarjetas blancas en una caja estrecha.
- **Paleta de ejemplo**: primario `#4b5726` (verde oliva), acento `#a4532d` (tierra), fondo `#f3ebdb` (crema),
  texto `#2b2519`. Derivados con `color-mix`: `--c-oscuro` (oliva casi negro, pie y galería), `--c-kraft` (papel de
  estraza, con una trama de fibra muy suave), `--c-acento-claro` (tierra legible sobre oliva), `--c-crema` (texto
  sobre bandas oscuras). El diseño aguanta otros cuatro colores siempre que primario y acento sean medios u oscuros.
- **Tipografía**: del sistema. Títulos en serif («Iowan Old Style», «Palatino Linotype», Palatino, Georgia…) a
  700, enormes (portada `clamp(2.75rem, 8.4vw, 7.4rem)`, secciones hasta 4.6 rem); cifras y comillas en serif a
  tamaño cartel; antetítulos, botones y etiquetas en sans de sistema en versalitas con interletrado de .16-.22 em;
  antetítulo con una línea de 2.75 rem de color tierra delante.
- **Forma**: esquinas rectas (radio 0), líneas finas en lugar de tarjetas, puntos de guía entre formato y precio
  (como una etiqueta de tienda), etiqueta colgante con muesca para «Lo más pedido», números romanos en los pasos,
  una rama de olivo dibujada a trazo en la banda de llamada a la acción y en la 404.
- **Ritmo de bandas** (todas de borde a borde; contenido en un contenedor de 90 rem con 16 px de margen en móvil):
  1. `hero` — foto a sangre al 92 % de la pantalla con velo oliva desde abajo; título enorme abajo a la izquierda,
     texto, dos botones y, al pie, franja de rasgos (`items`) separada por líneas finas. Cabecera fija transparente.
  2. `productos` — crema; titular + pestañas por categoría; **estantería de borde a borde** (1 / 2 / 3 / 4 columnas,
     separadas por líneas); en móvil cada producto es una fila con la foto a la izquierda. Ficha: foto, categoría,
     nombre en serif, texto, formato ····· precio, «Pedir» + WhatsApp.
  3. `origen` — fila 50/50: foto a sangre tocando el borde izquierdo y, sobre oliva, la historia y la familia.
  4. `cifras` — tierra plena; datos en serif de hasta 5.6 rem separados por líneas claras.
  5. `proceso` — papel de estraza; franja de 4 fotos a sangre (3:4 en escritorio) con el número romano encima.
  6. `cita` — foto a sangre con velo oliva y la frase en serif cursiva enorme.
  7. `donde-comprar` — crema partida: titular, botón a la tienda online y horario; filas de puntos de venta con
     icono en círculo tierra.
  8. `galeria` — oliva casi negro; mosaico sin márgenes (la primera foto 2×2).
  9. `opiniones` — papel de estraza; columnas con comillas tierra y texto en cursiva.
  10. `preguntas` — crema; titular fijo a la izquierda, acordeón a la derecha.
  11. `cta` — tierra plena con título de hasta 6.25 rem, dos botones y la rama de olivo.
  12. `contacto` — oliva; teléfono grande, datos en filas y formulario de pedido sobre la banda.
  Pie oliva casi negro con el nombre en serif gigante y cuatro columnas.
- **Fotos** (`fotos.json`, 16): dehesa extremeña con encinas, bolos de granito y ovejas merinas (portada 21:9),
  majada de piedra (origen 3:4), pasos del proceso (pasto, cuajada en la cuba, moldes, cava de piedra; 3:4), cielo
  de atardecer con encinas (cita 21:9), siete bodegones de producto en madera y piedra con luz de ventana (1:1) y dos
  de galería (mesa en el campo, colmenas entre brezo). Sin texto legible, sin logotipos, sin personas.
- **Qué no hacer**: volver al catálogo técnico de la base (tablas de características, referencias en monoespaciada,
  barra de utilidades), cajas centradas estrechas con tarjetas blancas, el hero partido 50/50 (lo usan cafetería y
  floristería), esquinas redondeadas o sombras de tarjeta, sellos circulares (cafetería).

## Hecho

- [x] `site.yaml` de ejemplo: «Majada del Berrocal», quesería ficticia de Trujillo (Cáceres), todo activo, al menos
  un elemento por lista, precios entre comillas, listas planas.
- [x] Secciones nuevas en `src/components/secciones/` (pintan bien con listas y campos vacíos); `hero`, `contacto` y
  `texto.astro` rediseñadas. `src/pages/index.astro` sin tocar.
- [x] `template.yaml` con sectores con nombre, secciones, `estilo: rustico`, `plan_minimo: gratis`, `orden: 330` y
  guion del asistente (10 pasos).
- [x] `fotos.json` (16 fotos) y placeholders propios; `favicon.svg` propio.
- [x] `README.md`, `CLAUDE.md`, `aviso-legal.astro` y `404.astro` con el diseño.
- [ ] Fotos y previews definitivas (paso de fotos); repo `Veleta-Com-y-Serv/plantilla-productos-gourmet` y
  etiqueta `v1.0.0`; en la plataforma, `config/plantillas.php` y `plantillas:sync --demos`.
