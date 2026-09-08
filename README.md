# Huesitos · Playeras Artesanales

Sitio web de la marca **Huesitos Playeras Artesanales**. Es un sitio estático
(HTML, CSS y JavaScript sin dependencias): se puede publicar en GitHub Pages,
Netlify, Vercel o cualquier hosting, sin servidor ni base de datos.

## Páginas

| Archivo | Qué es |
|---|---|
| `index.html` | Portada: hero, destacados, colecciones, nosotros, ayuda y dónde encontrarnos |
| `tienda.html` | Toda la tienda con filtros por colección |
| `dama.html` · `caballero.html` · `nino.html` | Catálogo por corte |
| `producto.html?id=catrina` | Ficha de producto (se arma sola desde el catálogo) |
| `styles.css` | Toda la hoja de estilos |
| `script.js` | Catálogo, filtros, buscador, ficha, carrito y menú |

## Cómo verlo en tu computadora

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

Ábrelo con un servidor, no con doble clic: la ficha de producto necesita leer
la dirección `?id=` y eso no funciona con `file://`.

## Cómo agregar o cambiar playeras

Todo el catálogo vive en el arreglo `PRODUCTOS` al inicio de `script.js`:

```js
{id:'catrina', nombre:'Catrina de Flores', coleccion:'calaveras',
 secciones:['dama','caballero'], tela:'#141414', tinta:'#f3e7d6',
 imagen:'', nuevo:true, destacado:true, texto:'La Catrina rodeada de...'}
```

- `id` — identificador único, sin espacios ni acentos. Es lo que va en la URL.
- `coleccion` — `calaveras`, `ajolotes`, `mascaras`, `alebrijes` o `tradicion`.
- `secciones` — en qué páginas aparece: `dama`, `caballero`, `nino`.
- `tela` y `tinta` — colores del dibujo de respaldo (la playera ilustrada).
- `imagen` — nombre del archivo dentro de `assets/productos/`. Si va vacío se
  usa el dibujo ilustrado.
- `nuevo` — pone la etiqueta rosa. `destacado` — sale en la portada.

## Publicado en GitHub Pages

El sitio vive en:

    https://eleonardonaranjo-afk.github.io/playeras-huesiitos/

Se publica solo: cada vez que algo llega a la rama `main`, GitHub vuelve a
subir el sitio en uno o dos minutos.

Para activarlo la primera vez: en el repositorio, **Settings → Pages**,
en *Source* elegir **Deploy from a branch**, rama `main` y carpeta `/ (root)`.

## Dónde se cambia cada cosa

- **WhatsApp de pedidos:** la constante `WHATSAPP` en `script.js`.
- **Precios:** las constantes `PRECIO` (dama y caballero, $280) y
  `PRECIO_NINO` ($250) en `script.js`. Una playera puede traer su propio
  precio con el campo `precio`.
- **Fotos de producto:** ver `assets/productos/LEEME.txt`.
- **Imagen que sale al compartir el enlace:** `assets/og.jpg`, de 1200 × 630 px.
- **Dirección del sitio:** si algún día se usa un dominio propio, hay que
  cambiarla en las etiquetas `canonical`, `og:url` y `og:image` de las seis
  páginas, y agregar un archivo `CNAME` con el dominio.

## Cómo funciona el carrito

Vive en el navegador de quien compra (`localStorage`) y el pedido se cierra por
WhatsApp: el botón *Pedir por WhatsApp* arma el mensaje con las piezas, tallas,
cantidades y el total. No se guarda nada en ningún servidor y no hay cobro en
línea; si más adelante quieres pagos automáticos habría que conectar una
pasarela (Mercado Pago, Stripe o Shopify).
