# Soplo · Anillos de cristal

Tienda de anillos de cristal soplado a mano: catálogo con filtros, ficha de
producto con medidas, bolsa que se guarda en el navegador y pedido que se
cierra por WhatsApp. Es HTML, CSS y JavaScript planos —sin compilación, sin
dependencias, sin servidor—, así que se publica copiando los archivos.

## Lo primero: poner tus fotos

Los anillos que se ven ahora son **dibujos SVG**, no fotos: sirven de relleno
mientras llegan las tuyas. Para cambiarlos:

1. Guarda cada foto en `imagenes/`, nombrada como el id de la pieza
   (`aro-cielo.jpg`, `esp-rubi.jpg`, …). Cuadradas y de 900 × 900 px.
2. En `guion.js`, agrégale a esa pieza el campo `foto`:

```js
{ id:'aro-cielo', nombre:'Aro Cielo', familia:'aros', precio:780,
  foto:'imagenes/aro-cielo.jpg',
  cristal:'#5fa8d8', acento:'#bfe4fb', medidas:['5','6','7','8'], ... }
```

Cada pieza que tenga `foto` usa la foto; las que no, siguen con el dibujo. Se
pueden ir cambiando de a poco.

## Archivos

| Archivo | Qué es |
| --- | --- |
| `index.html` | Portada: familias, piezas de la hornada, el taller, medidas y preguntas |
| `tienda.html` | Catálogo completo con filtros por familia |
| `producto.html` | Ficha de una pieza. Se abre como `producto.html?id=esp-rubi` |
| `estilos.css` | Toda la hoja de estilos |
| `guion.js` | Marca, catálogo, dibujos, buscador y bolsa |
| `imagenes/` | Tus fotos de producto |
| `assets/favicon.svg` | Icono de la pestaña |
| `assets/og.jpg` | Imagen que se ve al compartir el enlace |
| `assets/og-fuente.html` | De donde sale `og.jpg` |

## Verlo en tu computadora

```bash
python3 -m http.server 8000
# y abre http://localhost:8000/anillos/
```

## Cambiar la marca

Al principio de `guion.js` está todo junto:

```js
var MARCA = {
  nombre:'Soplo',
  lema:'Anillos de cristal soplado a mano',
  whatsapp:'525643120421',   // solo dígitos, con lada del país
  instagram:'https://www.instagram.com/',
  envioGratis:1200,          // pedidos desde este monto no pagan envío
  moneda:'MXN'
};
```

El nombre visible del encabezado y el pie está escrito en el HTML de cada
página, así que si cambias `MARCA.nombre` busca y reemplaza `SOPLO` y `Soplo`
en los tres `.html`.

## Cambiar el catálogo

La lista `CATALOGO` en `guion.js` manda sobre todo el sitio: portada, tienda,
buscador, relacionados y ficha. Cada pieza es así:

```js
{ id:'got-verde', nombre:'Gotas de Musgo', familia:'gotas', precio:1020,
  cristal:'transparente', acento:'#7cc24a',
  medidas:['5','6','7','8'], etiqueta:'', destacado:true,
  texto:'Las mismas gotitas, en verde limón sobre aro transparente.' }
```

- `familia` — `aros`, `espirales`, `gotas`, `racimos`, `flores` o `apilables`.
- `cristal` y `acento` — colores del dibujo. No hacen nada si ya pusiste `foto`.
- `medidas` — números disponibles, o `['Ajustable']`.
- `etiqueta` — `nuevo`, `ultima` o vacío.
- `destacado` — `true` para que salga en la portada.

Agregar, quitar o reordenar piezas ahí actualiza solo todo lo demás.

### Cuando se vende una pieza

Como cada anillo es único, lo normal es borrar su renglón del `CATALOGO` (o
ponerle `etiqueta:'ultima'` mientras queda una).

## Publicarlo

1. Sube la carpeta a tu hosting (GitHub Pages, Netlify, Vercel, el que sea:
   no hace falta backend).
2. Busca y reemplaza `cristaldesoplo.mx` por tu dominio real en los seis
   `canonical`, `og:url`, `og:image` y `twitter:image` de las tres páginas.
   Sin la URL absoluta correcta, WhatsApp e Instagram no muestran la vista
   previa al compartir el enlace.

## Lo que este sitio no hace

La bolsa guarda el pedido en el navegador de quien visita (no hay base de
datos) y el cobro se cierra por WhatsApp: no hay pasarela de pago ni control
de inventario. El formulario del boletín tampoco manda correos, solo confirma
en pantalla. Ahí es donde habría que conectar un servicio si más adelante
quieres cobrar en línea.
