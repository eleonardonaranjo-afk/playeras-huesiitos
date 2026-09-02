# ¡Huesitos! · Playeras artesanales

Sitio de la tienda: catálogo, fichas de producto, buscador y carrito que
cierra el pedido por WhatsApp. Es HTML, CSS y JavaScript planos —no hay
compilación, ni dependencias, ni servidor—, así que se publica copiando los
archivos tal cual.

## Archivos

| Archivo | Qué es |
| --- | --- |
| `index.html` | Portada: colecciones, quiénes somos, ayuda y dónde encontrarnos |
| `tienda.html` | Catálogo completo con filtros por colección |
| `dama.html`, `caballero.html`, `nino.html` | Catálogo filtrado por corte |
| `producto.html` | Ficha de una pieza. Se abre como `producto.html?id=ajo-xochimilco` |
| `styles.css` | Toda la hoja de estilos |
| `script.js` | Catálogo, dibujos, buscador y carrito |
| `assets/favicon.svg` | Icono de la pestaña del navegador |
| `assets/og.jpg` | Imagen que se ve al compartir el enlace |
| `assets/og-fuente.html` | De donde sale `og.jpg` (ver más abajo) |

## Verlo en tu computadora

Abrir `index.html` con doble clic funciona, pero es mejor levantar un
servidor local para que las rutas se comporten igual que en internet:

```bash
python3 -m http.server 8000
# y abre http://localhost:8000
```

## Publicarlo

1. Sube todos los archivos a tu hosting (GitHub Pages, Netlify, Vercel,
   Hostinger... cualquiera sirve, porque no hace falta backend).
2. **Importante:** busca y reemplaza `huesitos.mx` por tu dominio real en
   los seis `<link rel="canonical">`, `og:url`, `og:image` y
   `twitter:image` de cada página. Sin la URL absoluta correcta, WhatsApp
   y Facebook no muestran la vista previa al compartir el enlace.

## Cambiar las playeras

Todo el catálogo vive en un solo lugar: la constante `CATALOGO`, al
principio de `script.js`. Cada pieza se ve así:

```js
{ id:'ajo-rosa', nombre:'Ajolote Rosa', coleccion:'ajolotes',
  secciones:['dama','nino'], playera:'#e6007e', motivo:'#ffffff',
  etiqueta:'', destacado:true,
  texto:'Rosa mexicano de fondo y ajolote en blanco.' }
```

- `id` — identificador único; es lo que va en la URL de la ficha.
- `coleccion` — `calaveras`, `ajolotes`, `mascaras`, `alebrijes` o `tradicion`.
- `secciones` — en qué cortes aparece: `dama`, `caballero`, `nino`.
  De aquí salen las tallas que se ofrecen.
- `playera` y `motivo` — colores de la tela y del dibujo.
- `etiqueta` — `nuevo`, `ultimas` o vacío.
- `destacado` — `true` para que salga en «Lo más pedido» de la portada.

Agregar, quitar o reordenar piezas en esa lista actualiza sola la portada,
la tienda, las tres páginas de corte, el buscador y los relacionados.

### Precio

Todas las piezas usan la constante `PRECIO` (`$280`). Si alguna cuesta
distinto, agrégale su propio campo `precio: 350`.

### Teléfono de pedidos

La constante `WHATSAPP` en `script.js` guarda el número al que llegan los
pedidos. Los enlaces del encabezado y el pie están escritos directamente en
el HTML de cada página.

## Las ilustraciones

Las playeras no son fotos: son dibujos SVG que se arman en `script.js`
(constantes `SILUETA` y `MOTIVOS`), uno por colección, y se colorean con los
campos `playera` y `motivo` de cada pieza. Cuando tengas fotos reales,
puedes reemplazar la función `dibujo()` por una etiqueta `<img>`.

## Regenerar `assets/og.jpg`

La imagen para compartir se arma desde `assets/og-fuente.html`. Ábrelo en el
navegador con la ventana a 1200×630 px y toma una captura, o hazlo
automático con Playwright:

```bash
python3 -m http.server 8000 &
npx playwright screenshot --viewport-size=1200,630 \
  http://localhost:8000/assets/og-fuente.html assets/og.jpg
```

## Lo que este sitio no hace

El carrito guarda el pedido en el navegador de quien visita (no hay base de
datos) y el cobro se cierra por WhatsApp: no hay pasarela de pago ni
inventario. El formulario del boletín tampoco manda correos; solo confirma
en pantalla. Si más adelante quieres cobros en línea, ahí es donde habría
que conectar un servicio.
