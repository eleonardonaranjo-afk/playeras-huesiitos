/* ==========================================================================
   HUESITOS · Playeras Artesanales
   Un solo archivo para todo el sitio: catalogo, rejillas, filtros, buscador,
   ficha de producto, carrito con WhatsApp, menu movil y cookies.

   PARA AGREGAR TUS FOTOS REALES:
   guarda la imagen en  assets/productos/  y escribe el nombre del archivo en
   el campo "imagen" del producto, por ejemplo:  imagen:'catrina.jpg'
   Si el campo va vacio se dibuja la playera ilustrada de respaldo.
   ========================================================================== */
(function(){
'use strict';

/* ============ AJUSTES DE LA MARCA ============ */
var TIENDA   = 'Huesitos Playeras Artesanales';
var PRECIO   = 280;
var WHATSAPP = '525643120421';         // numero para recibir pedidos
var RUTA_FOTOS = 'assets/productos/';

var TALLAS = {
  dama:      ['CH','M','G','XG'],
  caballero: ['S','M','L','XL','2XL'],
  nino:      ['2','4','6','8','10','12','14']
};

var NOMBRE_SECCION = { dama:'Dama', caballero:'Caballero', nino:'Niño' };

var NOMBRE_COLECCION = {
  calaveras:'Calaveras', ajolotes:'Ajolotes', mascaras:'Máscaras',
  alebrijes:'Alebrijes', tradicion:'Tradición'
};

/* ============ CATALOGO ============ */
/* tela = color de la playera · tinta = color del estampado de serigrafía */
var PRODUCTOS = [
  /* ================= DAMA =================
     Fotos en assets/productos/. La primera es la de catálogo; las demás
     salen también en la ficha del producto.                              */

  {id:'ajolote-alebrije', nombre:'Ajolote Alebrije',     coleccion:'ajolotes',  secciones:['dama'], tela:'#141414', tinta:'#31c0b8', nuevo:true,  destacado:true,
   imagenes:['ajolote-alebrije.jpg','ajolote-alebrije-modelo.jpg','ajolote-alebrije-modelo2.jpg','ajolote-alebrije-modelo3.jpg'],
   texto:'Un ajolote en clave alebrije: grecas, rombos y puntos de colores sobre negro, con las branquias abiertas como plumas.'},

  {id:'catrina-sombrero', nombre:'Catrina de Sombrero',  coleccion:'calaveras', secciones:['dama'], tela:'#141414', tinta:'#f3e7d6', nuevo:true,  destacado:false,
   imagenes:['catrina-sombrero-producto.jpg','catrina-sombrero.jpg','catrina-sombrero-modelo2.jpg','catrina-sombrero-detalle.jpg'],
   texto:'La Catrina con su sombrero de flores y el vestido de encaje. Es la que más colores lleva de toda la colección.'},

  {id:'frida',            nombre:'Frida entre Flores',   coleccion:'tradicion', secciones:['dama'], tela:'#141414', tinta:'#e6007e', nuevo:true,  destacado:true,
   imagenes:['frida.jpg','frida-modelo.jpg','frida-modelo2.jpg','frida-modelo3.jpg','frida-detalle.jpg'],
   texto:'Frida con su corona de flores y el vestido armado de flores, en colores encendidos sobre negro.'},

  {id:'chihuahua',        nombre:'Chihuahua de Muertos', coleccion:'calaveras', secciones:['dama'], tela:'#141414', tinta:'#ffd166', nuevo:false, destacado:true,
   imagenes:['chihuahua.jpg','chihuahua-modelo.jpg','chihuahua-modelo2.jpg','chihuahua-modelo3.jpg'],
   texto:'Un chihuahueño vuelto calavera de azúcar, con flores en las orejas y el esqueleto estampado en blanco.'},

  {id:'calavera-corazon', nombre:'Calavera Corazón',    coleccion:'calaveras', secciones:['dama'], tela:'#141414', tinta:'#e6007e', nuevo:false, destacado:true,
   imagenes:['calavera-corazon-producto.jpg','calavera-corazon.jpg','calavera-corazon-modelo2.jpg','calavera-corazon-detalle.jpg'],
   texto:'Calavera de azúcar con un corazón rojo al centro de la frente, rodeada de flores y punteado en azul, rosa y naranja.'},

  {id:'ajolote-negro',    nombre:'Ajolote Negro',        coleccion:'ajolotes',  secciones:['dama'], tela:'#141414', tinta:'#dfe4ea', nuevo:false, destacado:true,
   imagenes:['ajolote-negro.jpg','ajolote-negro-modelo.jpg','ajolote-negro-modelo2.jpg','ajolote-negro-detalle.jpg'],
   texto:'Ajolote en punteado plateado sobre negro. De lejos parece piedra; de cerca es serigrafía.'},

  {id:'muneca-lele',      nombre:'Muñeca Lele',          coleccion:'tradicion', secciones:['dama'], tela:'#141414', tinta:'#e6007e', nuevo:true,  destacado:false,
   imagenes:['muneca-lele-producto.jpg','muneca-lele.jpg','muneca-lele-modelo.jpg','muneca-lele-modelo3.jpg'],
   texto:'La muñeca otomí de trenzas y listones, rodeada de rosas. México lindo, y lo dice ahí mismo.'},

  {id:'colibries',        nombre:'Colibríes Otomí',      coleccion:'tradicion', secciones:['dama'], tela:'#141414', tinta:'#31c0b8', nuevo:true,  destacado:false,
   imagenes:['colibries-producto.jpg','colibries.jpg','colibries-modelo2.jpg','colibries-detalle.jpg'],
   texto:'Dos colibríes y un ramo de flores en estilo otomí, en rosa, verde y amarillo sobre negro.'},

  {id:'xolo',             nombre:'Perro Xolo'      ,       coleccion:'alebrijes', secciones:['dama'], tela:'#141414', tinta:'#31c0b8', nuevo:false, destacado:false,
   imagenes:['xolo.jpg','xolo-modelo.jpg'],
   texto:'El xolo, el perro que acompaña a los muertos en su camino, resuelto con grecas en turquesa y naranja.'},

  {id:'calavera-florida', nombre:'Calavera Florida',     coleccion:'calaveras', secciones:['dama'], tela:'#141414', tinta:'#7fb2ff', nuevo:false, destacado:false,
   imagenes:['calavera-florida.jpg'],
   texto:'Calavera cubierta de flores azules y rojas, con un pájaro posado en la frente.'},

  {id:'calavera-huichol-dama', nombre:'Calavera Huichol', coleccion:'calaveras', secciones:['dama'], tela:'#141414', tinta:'#31a8e0', nuevo:true, destacado:true,
   imagenes:['calavera-huichol-dama.jpg','calavera-huichol-dama-modelo.jpg','calavera-huichol-dama-modelo2.jpg','calavera-huichol-dama-detalle.jpg'],
   texto:'Calavera de azúcar llena de figuras de inspiración huichol: flores, aves y grecas en azul, rojo y amarillo sobre negro.'},

  {id:'calavera-grecas-dama', nombre:'Calavera de Grecas',  coleccion:'calaveras', secciones:['dama'], tela:'#141414', tinta:'#dfe4ea', nuevo:true, destacado:true,
   imagenes:['calavera-grecas-dama.jpg','calavera-grecas-dama-modelo.jpg','calavera-grecas-dama-modelo2.jpg'],
   texto:'Calavera armada entera con grecas y rombos en blanco. De lejos es una calavera; de cerca es puro dibujo geométrico.'},

  {id:'catrina-flores',  nombre:'Catrina Flores',           coleccion:'calaveras', secciones:['dama'], tela:'#141414', tinta:'#e6007e', nuevo:true, destacado:true,
   imagenes:['catrina-flores.jpg','catrina-flores-modelo.jpg'],
   texto:'Catrina de sombrero con flores y plumas, con el vestido rosa lleno de calaveritas y mariposas monarca.'},

  {id:'retrato-catrina', nombre:'Retrato de Catrina',       coleccion:'calaveras', secciones:['dama'], tela:'#141414', tinta:'#e6007e', nuevo:true, destacado:false,
   imagenes:['retrato-catrina.jpg','retrato-catrina-modelo.jpg','retrato-catrina-modelo2.jpg'],
   texto:'La Catrina asomada por un marco rojo, como retrato colgado en la pared. Abajo lleva escrito México Lindo.'},

  /* ================= CABALLERO ================= */

  {id:'mascara-luchador', nombre:'Máscara de Luchador', coleccion:'mascaras',  secciones:['caballero'], tela:'#141414', tinta:'#dfe4ea', nuevo:true, destacado:true,
   imagenes:['mascara-luchador.jpg','mascara-luchador-modelo.jpg','mascara-luchador-detalle.jpg'],
   texto:'Máscara de luchador en rojo y plata, con grecas prehispánicas y una calavera en la frente. La pieza más brava del taller.'},

  {id:'calaveras-calle',  nombre:'Calaveras en la Calle', coleccion:'calaveras', secciones:['caballero'], tela:'#141414', tinta:'#e6007e', nuevo:true, destacado:true,
   imagenes:['calaveras-calle.jpg','calaveras-calle-modelo.jpg','calaveras-calle-detalle.jpg'],
   texto:'Cuatro calaveras enmascaradas cruzando el paso de peatones, cada una con su máscara de color. Abajo del taller pasa igual todos los días.'},

  {id:'calavera-neon',    nombre:'Calavera México Lindo', coleccion:'calaveras', secciones:['caballero'], tela:'#141414', tinta:'#f5a300', nuevo:true, destacado:true,
   imagenes:['calavera-neon.jpg','calavera-neon-modelo.jpg','calavera-neon-modelo2.jpg','calavera-neon-detalle.jpg'],
   texto:'Calavera en colores encendidos, con los tonos escurriendo hacia abajo. Al pie, la firma: México lindo.'},

  {id:'calavera-grecas',  nombre:'Calavera de Grecas',   coleccion:'calaveras', secciones:['caballero'], tela:'#141414', tinta:'#dfe4ea', nuevo:true, destacado:true,
   imagenes:['calavera-grecas.jpg','calavera-grecas-modelo.jpg','calavera-grecas-doblada.jpg','calavera-grecas-detalle.jpg'],
   texto:'Calavera armada entera con grecas y rombos en blanco. De lejos es una calavera; de cerca es puro dibujo geométrico.'},

  {id:'calavera-popotillo', nombre:'Calavera Popotillo',  coleccion:'calaveras', secciones:['caballero'], tela:'#141414', tinta:'#e6007e', nuevo:true, destacado:false,
   imagenes:['calavera-popotillo.jpg','calavera-popotillo-modelo.jpg','calavera-popotillo-modelo2.jpg','calavera-popotillo-detalle.jpg'],
   texto:'Es una simulación de una calavera de popotillo. Todo el diseño está hecho en serigrafía.'},

  {id:'ajolote-negro-cab', nombre:'Ajolote Negro',        coleccion:'ajolotes', secciones:['caballero'], tela:'#141414', tinta:'#dfe4ea', nuevo:false, destacado:false,
   imagenes:['ajolote-negro-cab.jpg','ajolote-negro-cab-modelo.jpg','ajolote-negro-cab-detalle.jpg','ajolote-negro-cab-2.jpg'],
   texto:'Ajolote en punteado plateado sobre negro, en corte de caballero. Todo el estampado es serigrafía.'},

  {id:'calavera-huichol', nombre:'Calavera Huichol',     coleccion:'calaveras', secciones:['caballero'], tela:'#141414', tinta:'#31a8e0', nuevo:true, destacado:true,
   imagenes:['calavera-huichol.jpg','calavera-huichol-modelo.jpg','calavera-huichol-modelo2.jpg','calavera-huichol-detalle.jpg'],
   texto:'Calavera de azúcar llena de figuras de inspiración huichol: flores, aves y grecas en azul, rojo y amarillo sobre negro.'},

  {id:'mascara-azul',     nombre:'Máscara Azul',          coleccion:'mascaras',  secciones:['caballero'], tela:'#141414', tinta:'#1a5fd0', nuevo:true, destacado:true,
   imagenes:['mascara-azul.jpg','mascara-azul-modelo.jpg','mascara-azul-modelo2.jpg'],
   texto:'La máscara azul y blanca de las que se ven en la arena. Grande, al centro del pecho y sin más adornos.'},

  {id:'mascara-plata',    nombre:'Máscara de Plata',      coleccion:'mascaras',  secciones:['caballero'], tela:'#141414', tinta:'#dfe4ea', nuevo:true, destacado:true,
   imagenes:['mascara-plata-modelo2.jpg','mascara-plata-modelo.jpg','mascara-plata.jpg','mascara-plata-detalle.jpg'],
   texto:'La máscara del ídolo, en plata y oro sobre negro. El acercamiento deja ver el brillo del estampado.'},

  {id:'quetzalcoatl',     nombre:'Quetzalcóatl',          coleccion:'tradicion', secciones:['caballero'], tela:'#141414', tinta:'#2a9d5c', nuevo:true, destacado:true,
   imagenes:['quetzalcoatl.jpg','quetzalcoatl-modelo.jpg','quetzalcoatl-modelo2.jpg'],
   texto:'La serpiente emplumada entre hojas, con el cuerpo lleno de punteado de colores sobre negro.'},

  {id:'xolo-cab',         nombre:'Perro Xolo'      ,        coleccion:'alebrijes', secciones:['caballero'], tela:'#141414', tinta:'#31c0b8', nuevo:false, destacado:false,
   imagenes:['xolo-cab.jpg','xolo-cab-modelo.jpg','xolo-cab-modelo2.jpg','xolo-cab-detalle.jpg'],
   texto:'El xolo, el perro que acompaña a los muertos en su camino, en corte de caballero. Turquesa y naranja sobre una mancha gris.'},

  {id:'ajolote-alebrije-cab', nombre:'Ajolote Alebrije',  coleccion:'ajolotes',  secciones:['caballero'], tela:'#141414', tinta:'#31c0b8', nuevo:false, destacado:false,
   imagenes:['ajolote-alebrije-cab.jpg','ajolote-alebrije-cab-modelo.jpg','ajolote-alebrije-cab-detalle.jpg'],
   texto:'El ajolote en clave alebrije, en corte de caballero. Grecas, rombos y punteado de colores sobre negro.'},

  /* ================= NIÑO ================= */

  {id:'chihuahua-nino',   nombre:'Chihuahua de Muertos', coleccion:'calaveras', secciones:['nino'], tela:'#141414', tinta:'#ffd166', nuevo:true, destacado:false,
   imagenes:['chihuahua-nino.jpg','chihuahua-nino-modelo.jpg'],
   texto:'Un chihuahueño vuelto calavera de azúcar, con flores en las orejas. En tallas de 2 a 14 años.'},

  {id:'calaveras-calle-nino', nombre:'Calaveras en la Calle', coleccion:'calaveras', secciones:['nino'], tela:'#141414', tinta:'#e6007e', nuevo:true, destacado:false,
   imagenes:['calaveras-calle-nino.jpg','calaveras-calle-nino-detalle.jpg'],
   texto:'Cuatro calaveras enmascaradas cruzando el paso de peatones, cada una con su máscara de color. La favorita de los niños.'},

  {id:'ajolote-alebrije-nino', nombre:'Ajolote Alebrije',  coleccion:'ajolotes',  secciones:['nino'], tela:'#141414', tinta:'#31c0b8', nuevo:true, destacado:false,
   imagenes:['ajolote-alebrije-nino.jpg','ajolote-alebrije-nino-modelo.jpg'],
   texto:'El ajolote en clave alebrije: grecas, rombos y punteado de colores sobre negro, en talla de niño.'},

  {id:'mascara-azul-nino', nombre:'Máscara Azul',          coleccion:'mascaras',  secciones:['nino'], tela:'#141414', tinta:'#1a5fd0', nuevo:true, destacado:false,
   imagenes:['mascara-azul-nino.jpg','mascara-azul-nino-modelo.jpg'],
   texto:'La máscara azul y blanca de la arena, grande y al centro del pecho. Para el que se sube al ring de la sala.'},

  {id:'mascara-plata-nino', nombre:'Máscara de Plata',     coleccion:'mascaras',  secciones:['nino'], tela:'#141414', tinta:'#dfe4ea', nuevo:true, destacado:false,
   imagenes:['mascara-plata-nino.jpg','mascara-plata-nino-modelo.jpg','mascara-plata-nino-detalle.jpg'],
   texto:'La máscara del ídolo, en plata y oro sobre negro. El acercamiento deja ver el brillo del estampado.'},

  {id:'xolo-nino',        nombre:'Perro Xolo',             coleccion:'alebrijes', secciones:['nino'], tela:'#141414', tinta:'#31c0b8', nuevo:true, destacado:false,
   imagenes:['xolo-nino.jpg','xolo-nino-modelo.jpg'],
   texto:'El xolo, el perro que acompaña a los muertos en su camino, en turquesa y naranja sobre una mancha gris.'},

  {id:'frida-nino',       nombre:'Frida entre Flores',     coleccion:'tradicion', secciones:['nino'], tela:'#141414', tinta:'#e6007e', nuevo:true, destacado:false,
   imagenes:['frida-nino.jpg','frida-nino-modelo.jpg'],
   texto:'Frida con su corona de flores y el vestido armado de flores, en colores encendidos sobre negro.'},

  {id:'muneca-lele-nino', nombre:'Muñeca Lele',            coleccion:'tradicion', secciones:['nino'], tela:'#141414', tinta:'#e6007e', nuevo:true, destacado:false,
   imagenes:['muneca-lele-nino.jpg','muneca-lele-nino-modelo.jpg'],
   texto:'La muñeca otomí de trenzas y listones, rodeada de rosas. México lindo, y lo dice ahí mismo.'}
];

/* ============ HERRAMIENTAS ============ */
function $(sel, raiz){ return (raiz||document).querySelector(sel); }
function $$(sel, raiz){ return Array.prototype.slice.call((raiz||document).querySelectorAll(sel)); }

function dinero(n){
  return '$' + n.toLocaleString('es-MX', {minimumFractionDigits:2, maximumFractionDigits:2});
}

function escapar(t){
  return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function sinAcentos(t){
  return String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}

function porId(id){
  for(var i=0;i<PRODUCTOS.length;i++){ if(PRODUCTOS[i].id===id) return PRODUCTOS[i]; }
  return null;
}

function tallasDe(p){
  var s = p.secciones[0];
  return TALLAS[s] || TALLAS.caballero;
}

function guardar(clave, valor){
  try{ localStorage.setItem(clave, JSON.stringify(valor)); }catch(e){}
}
function leer(clave, respaldo){
  try{
    var v = localStorage.getItem(clave);
    return v ? JSON.parse(v) : respaldo;
  }catch(e){ return respaldo; }
}

/* ============ DIBUJOS DE LAS PLAYERAS ============ */
/* Se inyecta un juego de simbolos SVG que se reutiliza en todo el sitio. */
function petalos(){
  var d='', i;
  for(i=0;i<8;i++){
    d += '<path transform="rotate('+(i*45)+')" d="M0,-28 C15,-45 15,-70 0,-86 C-15,-70 -15,-45 0,-28 Z"/>';
  }
  return d;
}

var MOTIVOS = {
  calaveras:
    '<path d="M0,-95 C52,-95 88,-58 88,-12 C88,16 76,36 60,50 C56,68 46,82 28,88 L-28,88 C-46,82 -56,68 -60,50 C-76,36 -88,16 -88,-12 C-88,-58 -52,-95 0,-95 Z"/>'+
    '<ellipse cx="-36" cy="-16" rx="24" ry="27"/><ellipse cx="36" cy="-16" rx="24" ry="27"/>'+
    '<path d="M0,10 L-11,30 L0,38 L11,30 Z"/>'+
    '<path d="M-34,58 H34 M-20,58 V76 M0,58 V78 M20,58 V76"/>'+
    '<path d="M-58,-52 Q0,-72 58,-52"/><circle cx="0" cy="-62" r="9"/>'+
    '<circle cx="-36" cy="-16" r="10" class="relleno"/><circle cx="36" cy="-16" r="10" class="relleno"/>'+
    '<circle cx="-62" cy="24" r="6"/><circle cx="62" cy="24" r="6"/>',

  ajolotes:
    '<path d="M-52,-18 C-52,-52 -26,-74 0,-74 C26,-74 52,-52 52,-18 C52,8 30,26 0,26 C-30,26 -52,8 -52,-18 Z"/>'+
    '<path d="M-28,24 C-34,54 -16,80 14,86 C36,90 50,74 45,58 C41,45 27,44 23,55"/>'+
    '<path d="M-50,-42 L-84,-60 M-53,-24 L-92,-30 M-48,-6 L-84,4"/>'+
    '<path d="M50,-42 L84,-60 M53,-24 L92,-30 M48,-6 L84,4"/>'+
    '<circle cx="-86" cy="-64" r="7"/><circle cx="-95" cy="-31" r="7"/><circle cx="-87" cy="7" r="7"/>'+
    '<circle cx="86" cy="-64" r="7"/><circle cx="95" cy="-31" r="7"/><circle cx="87" cy="7" r="7"/>'+
    '<circle cx="-19" cy="-32" r="7" class="relleno"/><circle cx="19" cy="-32" r="7" class="relleno"/>'+
    '<path d="M-15,-2 Q0,12 15,-2"/>',

  mascaras:
    '<path d="M0,-88 C44,-88 70,-52 70,-8 C70,44 42,84 0,94 C-42,84 -70,44 -70,-8 C-70,-52 -44,-88 0,-88 Z"/>'+
    '<path d="M-50,-20 C-40,-40 -16,-40 -8,-20 C-16,-2 -40,-2 -50,-20 Z"/>'+
    '<path d="M50,-20 C40,-40 16,-40 8,-20 C16,-2 40,-2 50,-20 Z"/>'+
    '<path d="M0,-72 6,-56 23,-56 10,-46 15,-30 0,-40 -15,-30 -10,-46 -23,-56 -6,-56 Z"/>'+
    '<path d="M-9,8 Q0,20 9,8"/><path d="M-28,46 H28"/>'+
    '<path d="M-58,16 Q-40,30 -30,54 M58,16 Q40,30 30,54"/>',

  alebrijes:
    '<path d="M-46,12 C-46,-30 -22,-58 0,-58 C22,-58 46,-30 46,12 C46,42 22,62 0,62 C-22,62 -46,42 -46,12 Z"/>'+
    '<path d="M-30,-46 C-54,-64 -62,-88 -46,-94 C-37,-97 -29,-85 -27,-70"/>'+
    '<path d="M30,-46 C54,-64 62,-88 46,-94 C37,-97 29,-85 27,-70"/>'+
    '<path d="M-44,2 C-78,-16 -98,8 -85,28 C-74,44 -54,37 -45,25"/>'+
    '<path d="M44,2 C78,-16 98,8 85,28 C74,44 54,37 45,25"/>'+
    '<ellipse cx="-19" cy="-14" rx="14" ry="16"/><ellipse cx="19" cy="-14" rx="14" ry="16"/>'+
    '<circle cx="-19" cy="-14" r="6" class="relleno"/><circle cx="19" cy="-14" r="6" class="relleno"/>'+
    '<path d="M-18,30 Q0,44 18,30"/><path d="M-8,10 Q0,18 8,10"/>'+
    '<circle cx="-34" cy="34" r="7"/><circle cx="34" cy="34" r="7"/>',

  tradicion:
    petalos() +
    '<circle cx="0" cy="0" r="26"/><circle cx="0" cy="0" r="12" class="relleno"/>'+
    '<path d="M-62,62 Q0,40 62,62"/>'
};

function inyectarSimbolos(){
  if(document.getElementById('simbolos-huesitos')) return;
  var partes = [];
  Object.keys(MOTIVOS).forEach(function(clave){
    partes.push(
      '<symbol id="playera-'+clave+'" viewBox="0 0 300 340">'+
        '<path fill="currentColor" d="M112 18 L58 40 L8 96 L54 142 L74 122 V332 H226 V122 L246 142 L292 96 L242 40 L188 18 C182 46 118 46 112 18 Z"/>'+
        '<path fill="none" stroke="rgba(0,0,0,.18)" stroke-width="2.5" d="M112 18 C118 46 182 46 188 18"/>'+
        '<g transform="translate(150 198) scale(.58)" fill="none" stroke="var(--motivo,#fff)" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">'+
          MOTIVOS[clave]+
        '</g>'+
      '</symbol>'
    );
  });
  var caja = document.createElement('div');
  caja.id = 'simbolos-huesitos';
  caja.setAttribute('aria-hidden','true');
  caja.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  caja.innerHTML = '<svg width="0" height="0">'+partes.join('')+'</svg>';
  document.body.appendChild(caja);
}

/* Fotos de una pieza: acepta "imagenes" (varias) o "imagen" (una sola) */
function fotosDe(p){
  if(p.imagenes && p.imagenes.length) return p.imagenes;
  return p.imagen ? [p.imagen] : [];
}

/* Dibujo (o foto) de un producto */
function lienzoDe(p, indice){
  var fotos = fotosDe(p);
  var foto  = fotos[indice || 0] || fotos[0];
  if(foto){
    return '<img src="'+RUTA_FOTOS+escapar(foto)+'" alt="Playera '+escapar(p.nombre)+'" loading="lazy">';
  }
  return '<svg viewBox="0 0 300 340" role="img" aria-label="Playera '+escapar(p.nombre)+'" '+
         'style="color:'+p.tela+';--motivo:'+p.tinta+'"><use href="#playera-'+p.coleccion+'"></use></svg>';
}

/* ============ TARJETAS Y REJILLAS ============ */
function tarjeta(p){
  return '<article class="tarjeta">'+
    '<div class="tarjeta__lienzo">'+
      (p.nuevo ? '<span class="tarjeta__etiqueta">Nuevo</span>' : '')+
      lienzoDe(p)+
      '<a class="tarjeta__enlace" href="producto.html?id='+p.id+'" aria-label="Ver '+escapar(p.nombre)+'"></a>'+
      '<button class="tarjeta__agregar" type="button" data-agregar="'+p.id+'">Agregar al carrito</button>'+
    '</div>'+
    '<h3 class="tarjeta__nombre"><a href="producto.html?id='+p.id+'">'+escapar(p.nombre)+'</a></h3>'+
    '<p class="tarjeta__precio">'+dinero(PRECIO)+'</p>'+
    '<p class="tarjeta__coleccion">'+NOMBRE_COLECCION[p.coleccion]+'</p>'+
  '</article>';
}

function pintarRejilla(caja, lista){
  if(!caja) return;
  if(!lista.length){
    caja.innerHTML = '<p class="sin-resultados">Por ahora no hay piezas en esta colección. '+
                     'Escríbenos por WhatsApp y te decimos qué viene en camino.</p>';
    return;
  }
  caja.innerHTML = lista.map(tarjeta).join('');
}

function filtrar(seccion, coleccion){
  return PRODUCTOS.filter(function(p){
    var okSeccion   = !seccion   || seccion==='todo'   || p.secciones.indexOf(seccion) !== -1;
    var okColeccion = !coleccion || coleccion==='todo' || p.coleccion === coleccion;
    return okSeccion && okColeccion;
  });
}

function textoCuenta(n){
  return n === 1 ? '1 pieza' : n + ' piezas';
}

/* --- rejillas de categoria y de tienda (con pestanas) --- */
function iniciarRejillaFiltrable(){
  var caja = $('#rejilla-categoria');
  if(!caja) return;

  var seccion  = caja.getAttribute('data-seccion') || 'todo';
  var pestanas = $$('.pestana-cat');
  var cuenta   = $('#cuenta-productos');

  function aplicar(coleccion){
    var lista = filtrar(seccion, coleccion);
    pintarRejilla(caja, lista);
    if(cuenta) cuenta.textContent = textoCuenta(lista.length);
    pestanas.forEach(function(b){
      b.setAttribute('aria-selected', String(b.getAttribute('data-coleccion') === coleccion));
    });
  }

  pestanas.forEach(function(b){
    b.addEventListener('click', function(){
      var col = b.getAttribute('data-coleccion');
      aplicar(col);
      if(history.replaceState){
        history.replaceState(null, '', col === 'todo' ? location.pathname : '#'+col);
      }
    });
  });

  var inicial = (location.hash || '').replace('#','');
  aplicar(NOMBRE_COLECCION[inicial] ? inicial : 'todo');

  window.addEventListener('hashchange', function(){
    var h = (location.hash || '').replace('#','');
    if(NOMBRE_COLECCION[h]) aplicar(h);
  });
}

/* --- rejilla de destacados de la portada --- */
function iniciarPortada(){
  var caja = $('#rejilla-destacados');
  if(!caja) return;

  var pestanas = $$('.pestana-portada');

  function aplicar(filtro){
    var lista;
    if(filtro === 'destacados'){
      lista = PRODUCTOS.filter(function(p){ return p.destacado; });
    }else if(filtro === 'nuevo'){
      lista = PRODUCTOS.filter(function(p){ return p.nuevo; });
    }else{
      lista = filtrar('todo', filtro);
    }
    pintarRejilla(caja, lista.slice(0,8));
    pestanas.forEach(function(b){
      b.setAttribute('aria-selected', String(b.getAttribute('data-coleccion') === filtro));
    });
  }

  pestanas.forEach(function(b){
    b.addEventListener('click', function(){ aplicar(b.getAttribute('data-coleccion')); });
  });

  aplicar('destacados');
}

/* ============ FICHA DE PRODUCTO ============ */
function iniciarFicha(){
  var caja = $('#ficha');
  if(!caja) return;

  var id = new URLSearchParams(location.search).get('id');
  var p  = porId(id) || PRODUCTOS[0];
  var tallas = tallasDe(p);
  var elegida = tallas[Math.min(1, tallas.length-1)];
  var cantidad = 1;

  document.title = p.nombre + ' · Huesitos';
  var meta = document.querySelector('meta[name="description"]');
  if(meta) meta.setAttribute('content', p.texto);

  caja.innerHTML =
    '<div class="ficha__galeria">'+
      (fotosDe(p).length
        ? fotosDe(p).map(function(_, i){
            return '<div class="ficha__imagen">'+lienzoDe(p, i)+'</div>';
          }).join('')
        : '<div class="ficha__imagen">'+lienzoDe(p)+'</div>')+
    '</div>'+
    '<div class="ficha__datos">'+
      '<p class="migas"><a href="index.html">Inicio</a> / '+
        '<a href="'+p.secciones[0]+'.html">'+NOMBRE_SECCION[p.secciones[0]]+'</a> / '+
        escapar(p.nombre)+'</p>'+
      '<h1>'+escapar(p.nombre)+'</h1>'+
      '<p class="ficha__precio">'+dinero(PRECIO)+'</p>'+
      '<p class="ficha__impuestos">Precio único en toda la tienda · IVA incluido</p>'+
      '<p class="ficha__descripcion">'+escapar(p.texto)+'</p>'+

      '<div class="campo">'+
        '<span class="campo__titulo">Talla · '+
          p.secciones.map(function(s){ return NOMBRE_SECCION[s]; }).join(' / ')+'</span>'+
        '<div class="tallas" id="tallas">'+
          tallas.map(function(t){
            return '<button class="talla" type="button" data-talla="'+t+'" aria-pressed="'+(t===elegida)+'">'+t+'</button>';
          }).join('')+
        '</div>'+
      '</div>'+

      '<div class="campo">'+
        '<span class="campo__titulo">Cantidad</span>'+
        '<div class="cantidad">'+
          '<button type="button" id="menos" aria-label="Quitar una">−</button>'+
          '<span id="cantidad">1</span>'+
          '<button type="button" id="mas" aria-label="Agregar una">+</button>'+
        '</div>'+
      '</div>'+

      '<div id="aviso-ficha"></div>'+

      '<div class="ficha__acciones">'+
        '<button class="boton boton--rosa" type="button" id="agregar-ficha">Agregar al carrito</button>'+
        '<a class="boton boton--linea" id="pedir-ficha" href="#" target="_blank" rel="noopener">Preguntar por WhatsApp</a>'+
      '</div>'+

      '<div class="ficha__detalles">'+
        '<details open><summary>La pieza</summary>'+
          '<ul>'+
            '<li>Colección '+NOMBRE_COLECCION[p.coleccion]+'</li>'+
            '<li>Algodón 100% peinado, cuello reforzado</li>'+
            '<li>Estampado en serigrafía, color por color</li>'+
            '<li>Tinta textil curada con calor: no se cuartea ni se despinta</li>'+
          '</ul>'+
        '</details>'+
        '<details><summary>Cómo se imprime</summary>'+
          '<p>Todo lo que ves en la playera es serigrafía: la tinta pasa a través de una malla '+
          'tensada en un marco, y cada color lleva su propio marco y su propia pasada. Al final '+
          'el estampado se cura con calor para que quede fijado en la tela.</p>'+
          '<p>Algunos diseños imitan otras técnicas, como el popotillo, la pedrería o el bordado, '+
          'pero todos van impresos en serigrafía.</p>'+
        '</details>'+
        '<details><summary>Cuidados</summary>'+
          '<p>Lava a mano o en ciclo delicado con agua fría, del revés. Nada de cloro ni secadora, '+
          'y plancha por dentro. Así el estampado aguanta años.</p>'+
        '</details>'+
        '<details><summary>Envíos y entregas</summary>'+
          '<p>Enviamos a todo México en 3 a 5 días hábiles. También puedes recogerla sin costo '+
          'los sábados en el Bazar de San Jacinto, San Ángel.</p>'+
        '</details>'+
      '</div>'+
    '</div>';

  function mensajeWhats(){
    return 'https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(
      '¡Hola Huesitos! Me interesa la playera "'+p.nombre+'" en talla '+elegida+'. ¿Tienen disponible?'
    );
  }
  $('#pedir-ficha', caja).href = mensajeWhats();

  $('#tallas', caja).addEventListener('click', function(e){
    var b = e.target.closest('.talla');
    if(!b) return;
    elegida = b.getAttribute('data-talla');
    $$('.talla', caja).forEach(function(x){
      x.setAttribute('aria-pressed', String(x === b));
    });
    $('#pedir-ficha', caja).href = mensajeWhats();
  });

  function pintaCantidad(){ $('#cantidad', caja).textContent = cantidad; }
  $('#menos', caja).addEventListener('click', function(){ if(cantidad>1){ cantidad--; pintaCantidad(); } });
  $('#mas',   caja).addEventListener('click', function(){ if(cantidad<20){ cantidad++; pintaCantidad(); } });

  $('#agregar-ficha', caja).addEventListener('click', function(){
    Carrito.agregar(p.id, elegida, cantidad);
    $('#aviso-ficha', caja).innerHTML =
      '<p class="mensaje-agregado">Listo: '+cantidad+' × '+escapar(p.nombre)+' (talla '+elegida+') en tu carrito.</p>';
    Carrito.abrir();
  });

  /* relacionados */
  var relacionados = PRODUCTOS.filter(function(o){
    return o.id !== p.id && o.coleccion === p.coleccion;
  });
  if(relacionados.length < 4){
    PRODUCTOS.forEach(function(o){
      if(o.id !== p.id && relacionados.indexOf(o) === -1 && relacionados.length < 4) relacionados.push(o);
    });
  }
  pintarRejilla($('#rejilla-relacionados'), relacionados.slice(0,4));
}

/* ============ CARRITO ============ */
var Carrito = (function(){
  var CLAVE = 'huesitos-carrito';
  var lineas = leer(CLAVE, []);

  var cajon    = $('#carrito');
  var fondo    = $('#carrito-fondo');
  var lista    = $('#carrito-lista');
  var total    = $('#carrito-total');
  var contador = $('#contador-carrito');
  var enlaceWa = $('#carrito-whatsapp');

  function piezas(){
    return lineas.reduce(function(s,l){ return s + l.cantidad; }, 0);
  }
  function suma(){
    return piezas() * PRECIO;
  }

  function textoPedido(){
    if(!lineas.length) return '¡Hola Huesitos! Quiero hacer un pedido.';
    var t = '¡Hola '+TIENDA+'! Quiero pedir:\n';
    lineas.forEach(function(l){
      var p = porId(l.id);
      if(p) t += '• '+p.nombre+' — talla '+l.talla+' × '+l.cantidad+' = '+dinero(l.cantidad*PRECIO)+'\n';
    });
    t += '\nTotal: '+dinero(suma())+'\n¿Me confirman disponibilidad y envío?';
    return t;
  }

  function pintar(){
    if(contador){
      contador.textContent = piezas();
    }
    if(total) total.textContent = dinero(suma());
    if(enlaceWa) enlaceWa.href = 'https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(textoPedido());

    if(!lista) return;
    if(!lineas.length){
      lista.innerHTML = '<p class="carrito__vacio">Tu carrito está vacío.<br>'+
                        'Todas nuestras piezas cuestan '+dinero(PRECIO)+'.</p>';
      return;
    }
    lista.innerHTML = lineas.map(function(l, i){
      var p = porId(l.id);
      if(!p) return '';
      var opciones = tallasDe(p).map(function(t){
        return '<option value="'+t+'"'+(t===l.talla?' selected':'')+'>Talla '+t+'</option>';
      }).join('');
      return '<div class="linea">'+
        '<div class="linea__lienzo">'+lienzoDe(p)+'</div>'+
        '<div class="linea__cuerpo">'+
          '<p class="linea__nombre">'+escapar(p.nombre)+'</p>'+
          '<p class="linea__precio">'+l.cantidad+' × '+dinero(PRECIO)+' = '+dinero(l.cantidad*PRECIO)+'</p>'+
          '<div class="linea__controles">'+
            '<select data-talla-de="'+i+'" aria-label="Talla">'+opciones+'</select>'+
            '<div class="cantidad">'+
              '<button type="button" data-menos="'+i+'" aria-label="Quitar una">−</button>'+
              '<span>'+l.cantidad+'</span>'+
              '<button type="button" data-mas="'+i+'" aria-label="Agregar una">+</button>'+
            '</div>'+
            '<button class="linea__quitar" type="button" data-quitar="'+i+'">Quitar</button>'+
          '</div>'+
        '</div>'+
      '</div>';
    }).join('');
  }

  function sincronizar(){ guardar(CLAVE, lineas); pintar(); }

  function agregar(id, talla, cantidad){
    var p = porId(id);
    if(!p) return;
    talla = talla || tallasDe(p)[Math.min(1, tallasDe(p).length-1)];
    cantidad = cantidad || 1;
    var existente = null;
    lineas.forEach(function(l){ if(l.id===id && l.talla===talla) existente = l; });
    if(existente) existente.cantidad = Math.min(20, existente.cantidad + cantidad);
    else lineas.push({id:id, talla:talla, cantidad:cantidad});
    sincronizar();
  }

  function abrir(){
    if(!cajon) return;
    cajon.classList.add('abierto');
    cajon.setAttribute('aria-hidden','false');
    if(fondo) fondo.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
  function cerrar(){
    if(!cajon) return;
    cajon.classList.remove('abierto');
    cajon.setAttribute('aria-hidden','true');
    if(fondo) fondo.classList.remove('visible');
    document.body.style.overflow = '';
  }

  if(lista){
    lista.addEventListener('click', function(e){
      var b = e.target.closest('button');
      if(!b) return;
      var i;
      if((i = b.getAttribute('data-mas')) !== null && i !== undefined){
        lineas[+i].cantidad = Math.min(20, lineas[+i].cantidad + 1); sincronizar(); return;
      }
      if((i = b.getAttribute('data-menos')) !== null && i !== undefined){
        lineas[+i].cantidad--;
        if(lineas[+i].cantidad < 1) lineas.splice(+i,1);
        sincronizar(); return;
      }
      if((i = b.getAttribute('data-quitar')) !== null && i !== undefined){
        lineas.splice(+i,1); sincronizar();
      }
    });
    lista.addEventListener('change', function(e){
      var s = e.target.closest('select[data-talla-de]');
      if(!s) return;
      lineas[+s.getAttribute('data-talla-de')].talla = s.value;
      sincronizar();
    });
  }

  var btnCarrito = $('#btn-carrito');
  if(btnCarrito) btnCarrito.addEventListener('click', abrir);
  var btnCerrar = $('#carrito-cerrar');
  if(btnCerrar) btnCerrar.addEventListener('click', cerrar);
  if(fondo) fondo.addEventListener('click', cerrar);

  var vaciar = $('#carrito-vaciar');
  if(vaciar) vaciar.addEventListener('click', function(){ lineas = []; sincronizar(); });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') cerrar();
  });

  /* boton "Agregar al carrito" de cualquier tarjeta */
  document.addEventListener('click', function(e){
    var b = e.target.closest('[data-agregar]');
    if(!b) return;
    agregar(b.getAttribute('data-agregar'));
    abrir();
  });

  pintar();
  return {agregar:agregar, abrir:abrir, cerrar:cerrar};
})();

/* ============ BUSCADOR ============ */
function iniciarBuscador(){
  var boton = $('#btn-buscar');
  var caja  = $('#caja-buscar');
  if(!boton || !caja) return;

  var campo  = caja.querySelector('input');
  var salida = $('#resultados');

  boton.addEventListener('click', function(){
    var abierto = caja.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', String(abierto));
    if(abierto) campo.focus();
  });

  campo.addEventListener('input', function(){
    var q = sinAcentos(campo.value.trim());
    if(q.length < 2){ salida.innerHTML = ''; return; }

    var hallados = PRODUCTOS.filter(function(p){
      return sinAcentos(p.nombre + ' ' + NOMBRE_COLECCION[p.coleccion] + ' ' + p.texto).indexOf(q) !== -1;
    }).slice(0,6);

    if(!hallados.length){
      salida.innerHTML = '<p class="resultado__vacio">No encontramos nada con «'+escapar(campo.value)+'». '+
                         'Prueba con calaveras, ajolotes, máscaras o alebrijes.</p>';
      return;
    }
    salida.innerHTML = hallados.map(function(p){
      return '<a class="resultado" href="producto.html?id='+p.id+'">'+
        '<span class="resultado__miniatura">'+lienzoDe(p)+'</span>'+
        '<span><b>'+escapar(p.nombre)+'</b><span>'+NOMBRE_COLECCION[p.coleccion]+' · '+dinero(PRECIO)+'</span></span>'+
      '</a>';
    }).join('');
  });
}

/* ============ MENU MOVIL ============ */
function iniciarMenu(){
  var boton = $('#btn-menu');
  var nav   = $('#nav');
  if(!boton || !nav) return;

  boton.addEventListener('click', function(){
    var abierto = nav.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', String(abierto));
  });

  /* en movil el primer toque despliega el submenu */
  $$('.nav__item').forEach(function(item){
    var enlace = item.querySelector('.nav__enlace');
    var sub    = item.querySelector('.desplegable');
    if(!sub) return;
    enlace.addEventListener('click', function(e){
      if(window.matchMedia('(max-width:1080px)').matches && !item.classList.contains('desplegado')){
        e.preventDefault();
        $$('.nav__item').forEach(function(o){ if(o!==item) o.classList.remove('desplegado'); });
        item.classList.add('desplegado');
      }
    });
  });
}

/* ============ MARQUESINA SIN COSTURAS ============ */
function iniciarMarquesina(){
  var pista = $('#pista-avisos');
  if(!pista || pista.dataset.duplicada) return;
  pista.innerHTML += pista.innerHTML;
  pista.dataset.duplicada = '1';
}

/* ============ COOKIES ============ */
function iniciarCookies(){
  var caja  = $('#cookies');
  var boton = $('#btn-cookies');
  if(!caja || !boton) return;

  if(leer('huesitos-cookies', false)){ caja.classList.add('oculto'); return; }
  boton.addEventListener('click', function(){
    guardar('huesitos-cookies', true);
    caja.classList.add('oculto');
  });
}

/* ============ ARRANQUE ============ */
function arrancar(){
  inyectarSimbolos();
  iniciarMarquesina();
  iniciarMenu();
  iniciarBuscador();
  iniciarCookies();
  iniciarPortada();
  iniciarRejillaFiltrable();
  iniciarFicha();
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', arrancar);
}else{
  arrancar();
}

})();
