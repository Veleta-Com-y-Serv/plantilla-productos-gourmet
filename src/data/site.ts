// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';

export interface Enlace { texto: string; url: string }
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; url?: string }
/** Producto de la sección `productos`. Todo escalar; `precio` siempre cadena ("24 €", "Consultar" o vacío). */
export interface Producto {
  nombre: string;
  categoria?: string;   // agrupa y filtra («Quesos», «Miel»…)
  formato?: string;     // tamaño o presentación («Pieza de 1 kg», «Tarro de 500 g»)
  texto?: string;
  precio?: string;
  destacado?: boolean;  // etiqueta «Lo más pedido»
  imagen?: string;
}
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
export interface Testimonio { texto: string; autor: string; lugar?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
export interface Proyecto { titulo: string; texto?: string; imagen?: string; categoria?: string; anio?: string }
export interface Noticia { fecha: string; titulo: string; texto?: string; url?: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace;
  cta_secundario?: Enlace;
  declaracion?: string;
  autor?: string;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  proyectos: Proyecto[];
  noticias: Noticia[];
  productos: Producto[];
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = (datos ?? {}) as Crudo;
function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
const texto = (v: unknown) => (v == null ? '' : String(v));
/** Botón `{texto, url}` normalizado (o undefined si no es un objeto). */
const enlace = (v: unknown): Enlace | undefined =>
  v && typeof v === 'object' ? { texto: texto((v as Crudo).texto), url: texto((v as Crudo).url).trim() } : undefined;

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    titulo: texto(s.titulo),
    antetitulo: texto(s.antetitulo),
    texto: texto(s.texto),
    imagen: texto(s.imagen),
    declaracion: texto(s.declaracion),
    autor: texto(s.autor),
    cta: enlace(s.cta),
    cta_secundario: enlace(s.cta_secundario),
    items: lista<Crudo>(s.items).map((i) => ({
      ...i,
      titulo: texto(i.titulo),
      texto: texto(i.texto),
      icono: texto(i.icono),
      imagen: texto(i.imagen),
      url: texto(i.url).trim(),
    })) as Item[],
    personas: lista<Crudo>(s.personas).map((p) => ({ ...p, nombre: texto(p.nombre), cargo: texto(p.cargo), foto: texto(p.foto), texto: texto(p.texto) })) as Persona[],
    testimonios: lista<Crudo>(s.testimonios).map((t) => ({ ...t, texto: texto(t.texto), autor: texto(t.autor), lugar: texto(t.lugar) })) as Testimonio[],
    galeria: lista<unknown>(s.galeria).map(texto).filter(Boolean),
    horario: lista<Crudo>(s.horario).map((h) => ({ ...h, dia: texto(h.dia), horas: texto(h.horas) })) as Horario[],
    preguntas: lista<Crudo>(s.preguntas).map((p) => ({ ...p, pregunta: texto(p.pregunta), respuesta: texto(p.respuesta) })) as Pregunta[],
    proyectos: lista<Proyecto>(s.proyectos),
    noticias: lista<Noticia>(s.noticias),
    productos: lista<Crudo>(s.productos).map((p) => ({
      ...p,
      nombre: texto(p.nombre),
      categoria: texto(p.categoria).trim(),
      formato: texto(p.formato),
      texto: texto(p.texto),
      precio: texto(p.precio),
      destacado: p.destacado === true,
      imagen: texto(p.imagen),
    })) as Producto[],
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi negocio',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#4b5726', acento: '#a4532d', fondo: '#f3ebdb', texto: '#2b2519', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'Store',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);

/** Primera sección activa con ese id o con `tipo:` igual (cabecera, pie, formulario). Devuelve su id y sus datos. */
export function buscarSeccion(diseno: string): { id: string; s: Seccion } | null {
  const id = Object.keys(site.secciones).find((k) => site.secciones[k].activa && (k === diseno || site.secciones[k].tipo === diseno));
  return id ? { id, s: site.secciones[id] } : null;
}

/** Diseño con el que se pinta una sección: su `tipo:` o su id. */
export const disenoDe = (id: string) => {
  const t = site.secciones[id]?.tipo;
  return typeof t === 'string' && t.trim() ? t.trim() : id;
};

/** Clave sin tildes ni espacios para filtros y anclas ("Quesos curados" → "quesos-curados"). */
export const clave = (t = '') =>
  t.trim().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** ¿El precio se puede enseñar? ("Consultar" o vacío, no). */
export const conPrecio = (p?: string) => !!p && !!p.trim() && !/^consultar$/i.test(p.trim());

/** Número romano para los pasos (1 → I, 4 → IV…); a partir de 40, la cifra. */
export function romano(n: number): string {
  if (n < 1 || n >= 40) return String(n);
  const tabla: [number, string][] = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let r = '';
  for (const [v, l] of tabla) while (n >= v) { r += l; n -= v; }
  return r;
}
