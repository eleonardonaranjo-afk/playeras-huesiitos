/* ===================================================================
   HUESITOS · Playeras artesanales
   Script unico del sitio. No depende de librerias externas.

   Indice:
     1. Catalogo (edita aqui para cambiar las piezas)
     2. Dibujos SVG de cada coleccion
     3. Ayudantes
     4. Tarjetas y rejillas
     5. Pestanas de coleccion
     6. Ficha de producto
     7. Buscador
     8. Carrito (se guarda en el navegador)
     9. Encabezado, menu movil, marquesina y cookies
    10. Arranque
   =================================================================== */
(function () {
'use strict';

/* ============ 1. CATALOGO ============
   Cada pieza necesita:
     id          identificador unico, se usa en la URL de producto.html
     nombre      como se muestra
     coleccion   calaveras | ajolotes | mascaras | alebrijes | tradicion
     secciones   en que categorias aparece: dama, caballero, nino
     precio      en pesos
     playera     color de la tela
     motivo      color del dibujo
     etiqueta    'nuevo' | 'ultimas' | '' (opcional)
     texto       descripcion para la ficha
     destacado   true si debe salir en 'Lo mas pedido' de la portada
   ==================================== */
var PRECIO = 280;

var CATALOGO = [
  /* --- calaveras --- */
  { destacado:true, id:'cal-catrina',   nombre:'Calavera Catrina',      coleccion:'calaveras', secciones:['dama','caballero'],       playera:'#171017', motivo:'#ffc700', etiqueta:'nuevo',
    texto:'La Catrina de siempre, con su sombrero de flores pintado trazo por trazo. Nuestra pieza mas pedida en noviembre.' },
  { id:'cal-azucar',    nombre:'Calaverita de Azucar',  coleccion:'calaveras', secciones:['dama','nino'],            playera:'#fdf7f2', motivo:'#e6007e', etiqueta:'',
    texto:'Los colores de una calaverita de azucar de feria, sobre algodon crudo. Ligera y fresca.' },
  { id:'cal-mariachi',  nombre:'Calavera Mariachi',     coleccion:'calaveras', secciones:['caballero'],              playera:'#1d3f7a', motivo:'#ffc700', etiqueta:'',
    texto:'Calavera con sombrero charro y trompeta. Un guino a las noches de Garibaldi.' },
  { id:'cal-florida',   nombre:'Craneo Florido',        coleccion:'calaveras', secciones:['dama'],                   playera:'#6b2fa0', motivo:'#ffffff', etiqueta:'',
    texto:'Craneo cubierto de cempasuchil y margaritas. Cada flor va pintada a pincel fino.' },
  { destacado:true, id:'cal-fiestera',  nombre:'Calavera Fiestera',     coleccion:'calaveras', secciones:['dama','caballero'],       playera:'#00b0a6', motivo:'#171017', etiqueta:'ultimas',
    texto:'La calavera que no se pierde una fiesta. Contraste alto, se ve de lejos.' },
  { id:'cal-traviesa',  nombre:'Calaverita Traviesa',   coleccion:'calaveras', secciones:['nino'],                   playera:'#ffc700', motivo:'#171017', etiqueta:'',
    texto:'Version chiquita y risuena, pensada para los mas pequenos de la casa.' },

  /* --- ajolotes --- */
  { destacado:true, id:'ajo-xochimilco',nombre:'Ajolote de Xochimilco', coleccion:'ajolotes',  secciones:['dama','caballero','nino'],playera:'#fdf7f2', motivo:'#e6007e', etiqueta:'nuevo',
    texto:'Nuestro ajolote insignia, con las branquias abiertas como en las chinampas. Un clasico de la casa.' },
  { destacado:true, id:'ajo-rosa',      nombre:'Ajolote Rosa',          coleccion:'ajolotes',  secciones:['dama','nino'],            playera:'#e6007e', motivo:'#ffffff', etiqueta:'',
    texto:'Rosa mexicano de fondo y ajolote en blanco. La combinacion que mas nos piden en el bazar.' },
  { id:'ajo-nocturno',  nombre:'Ajolote Nocturno',      coleccion:'ajolotes',  secciones:['caballero'],              playera:'#171017', motivo:'#00b0a6', etiqueta:'',
    texto:'Ajolote en turquesa sobre negro. Los detalles brillan bajo luz baja.' },
  { id:'ajo-feliz',     nombre:'Ajolotito Feliz',       coleccion:'ajolotes',  secciones:['nino'],                   playera:'#00b0a6', motivo:'#ffffff', etiqueta:'',
    texto:'El ajolote mas sonriente del catalogo. Tela suave, pensada para jugar.' },
  { id:'ajo-chinampa',  nombre:'Ajolote Chinampa',      coleccion:'ajolotes',  secciones:['dama','caballero'],       playera:'#3f6d3a', motivo:'#ffc700', etiqueta:'ultimas',
    texto:'Verde chinampa con ajolote dorado. Edicion corta de temporada.' },

  /* --- mascaras --- */
  { destacado:true, id:'mas-rayo',      nombre:'Mascara del Rayo',      coleccion:'mascaras',  secciones:['caballero','nino'],       playera:'#c3122f', motivo:'#ffc700', etiqueta:'nuevo',
    texto:'Mascara de luchador con rayo dorado. Rojo y oro, como en la arena.' },
  { id:'mas-estelar',   nombre:'Luchadora Estelar',     coleccion:'mascaras',  secciones:['dama'],                   playera:'#6b2fa0', motivo:'#ffc700', etiqueta:'',
    texto:'Mascara de rudos con estrellas. Corte de dama, cuello redondo.' },
  { id:'mas-plata',     nombre:'Mascara de Plata',      coleccion:'mascaras',  secciones:['caballero'],              playera:'#171017', motivo:'#d8d8d8', etiqueta:'',
    texto:'Homenaje al enmascarado de plata. Trazo limpio en gris metalico.' },
  { id:'mas-chamaco',   nombre:'Enmascarado Chamaco',   coleccion:'mascaras',  secciones:['nino'],                   playera:'#1d3f7a', motivo:'#ffffff', etiqueta:'',
    texto:'Para el luchador de la casa. Se lava sin perder el trazo.' },
  { id:'mas-tricolor',  nombre:'Mascara Tricolor',      coleccion:'mascaras',  secciones:['dama','caballero'],       playera:'#fdf7f2', motivo:'#3f6d3a', etiqueta:'',
    texto:'Mascara en verde, blanco y rojo. La que sale a la calle cada septiembre.' },

  /* --- alebrijes --- */
  { destacado:true, id:'ale-volador',   nombre:'Alebrije Volador',      coleccion:'alebrijes', secciones:['dama','caballero'],       playera:'#171017', motivo:'#e6007e', etiqueta:'nuevo',
    texto:'Alebrije con alas abiertas y cola en espiral. Cada pieza lleva mas de dos horas de pincel.' },
  { id:'ale-oaxaca',    nombre:'Alebrije de Oaxaca',    coleccion:'alebrijes', secciones:['dama'],                   playera:'#ffc700', motivo:'#6b2fa0', etiqueta:'',
    texto:'Inspirado en la talla oaxaquena de copal. Amarillo sol con lineas moradas.' },
  { id:'ale-nocturno',  nombre:'Alebrije Nocturno',     coleccion:'alebrijes', secciones:['caballero'],              playera:'#1d3f7a', motivo:'#00b0a6', etiqueta:'ultimas',
    texto:'Criatura de la noche, en azul profundo y turquesa. Quedan pocas piezas.' },
  { id:'ale-chico',     nombre:'Alebrijito',            coleccion:'alebrijes', secciones:['nino'],                   playera:'#e6007e', motivo:'#ffc700', etiqueta:'',
    texto:'El alebrije de bolsillo. Colores fuertes que aguantan el recreo.' },
  { id:'ale-solar',     nombre:'Alebrije Solar',        coleccion:'alebrijes', secciones:['dama','caballero','nino'],playera:'#fdf7f2', motivo:'#c3122f', etiqueta:'',
    texto:'Alebrije en rojo sobre crudo. Sobrio de lejos, lleno de detalle de cerca.' },

  /* --- tradicion --- */
  { id:'tra-otomi',     nombre:'Flor de Otomi',         coleccion:'tradicion', secciones:['dama'],                   playera:'#fdf7f2', motivo:'#e6007e', etiqueta:'',
    texto:'Bordado otomi de Tenango llevado a pincel. Simetria trabajada a mano libre.' },
  { destacado:true, id:'tra-sol',       nombre:'Sol Mexica',            coleccion:'tradicion', secciones:['caballero','dama'],       playera:'#171017', motivo:'#ffc700', etiqueta:'nuevo',
    texto:'Sol de rayos y circulos concentricos. Oro sobre negro, siempre funciona.' },
  { id:'tra-papel',     nombre:'Papel Picado',          coleccion:'tradicion', secciones:['dama','nino'],            playera:'#00b0a6', motivo:'#ffffff', etiqueta:'',
    texto:'Los calados del papel picado de fiesta patronal, en blanco sobre turquesa.' },
  { id:'tra-talavera',  nombre:'Talavera de Puebla',    coleccion:'tradicion', secciones:['dama'],                   playera:'#ffffff', motivo:'#1d3f7a', etiqueta:'',
    texto:'Azul talavera sobre blanco. La pieza mas serena del catalogo.' },
  { destacado:true, id:'tra-corazon',   nombre:'Corazon Sagrado',       coleccion:'tradicion', secciones:['caballero','dama'],       playera:'#c3122f', motivo:'#ffc700', etiqueta:'ultimas',
    texto:'Corazon con rayos, como los exvotos de hojalata. Rojo intenso.' },
  { id:'tra-milagro',   nombre:'Milagro Bordado',       coleccion:'tradicion', secciones:['dama','nino'],            playera:'#6b2fa0', motivo:'#ffffff', etiqueta:'',
    texto:'Trazo de milagrito de plata, simple y limpio, en blanco sobre morado.' },
  { id:'tra-solyluna',  nombre:'Sol y Luna',            coleccion:'tradicion', secciones:['caballero','nino'],       playera:'#3f6d3a', motivo:'#fdf7f2', etiqueta:'',
    texto:'Sol y luna compartiendo cielo, como en la loteria. Verde nopal de fondo.' }
];

var NOMBRE_COLECCION = {
  calaveras:'Calaveras',
  ajolotes:'Ajolotes',
  mascaras:'Mascaras',
  alebrijes:'Alebrijes',
  tradicion:'Tradicion'
};

var NOMBRE_SECCION = { dama:'Dama', caballero:'Caballero', nino:'Nino' };

var TALLAS = {
  dama:      ['CH','M','G','XG'],
  caballero: ['S','M','L','XL','2XL'],
  nino:      ['2','4','6','8','10','12','14']
};

var WHATSAPP = '525643120421';

/* ============ 2. DIBUJOS SVG DE CADA COLECCION ============
   Se inyecta un <symbol> por coleccion, con la misma silueta de
   playera y un motivo distinto. Las paginas ya traen #tee, que se
   conserva como respaldo.
   ========================================================== */
var SILUETA =
  '<path fill="currentColor" d="M112 18 L58 40 L8 96 L54 142 L74 122 V332 H226 V122 L246 142 L292 96 L242 40 L188 18 C182 46 118 46 112 18 Z"/>' +
  '<path fill="none" stroke="rgba(0,0,0,.22)" stroke-width="2.5" d="M112 18 C118 46 182 46 188 18"/>';

var MOTIVOS = {
  calaveras:
    '<path d="M0,-95 C52,-95 88,-58 88,-12 C88,16 76,36 60,50 C56,68 46,82 28,88 L-28,88 C-46,82 -56,68 -60,50 C-76,36 -88,16 -88,-12 C-88,-58 -52,-95 0,-95 Z"/>' +
    '<ellipse cx="-36" cy="-16" rx="24" ry="27"/><ellipse cx="36" cy="-16" rx="24" ry="27"/>' +
    '<path d="M0,10 L-11,30 L0,38 L11,30 Z"/>' +
    '<path d="M-34,58 H34 M-20,58 V76 M0,58 V78 M20,58 V76"/>' +
    '<path d="M-58,-52 Q0,-72 58,-52"/><circle cx="0" cy="-62" r="9"/>' +
    '<circle cx="-36" cy="-16" r="10" fill="var(--motivo,#fff)" stroke="none"/>' +
    '<circle cx="36" cy="-16" r="10" fill="var(--motivo,#fff)" stroke="none"/>' +
    '<circle cx="-62" cy="24" r="6"/><circle cx="62" cy="24" r="6"/>',

  ajolotes:
    '<path d="M-46,-30 C-46,-64 -22,-80 4,-80 C30,-80 54,-64 54,-30 C54,-8 42,6 22,12 L22,56 C22,74 8,88 -8,88 C-26,88 -38,74 -38,56 L-38,18 C-44,10 -46,-4 -46,-30 Z"/>' +
    '<path d="M-12,-16 Q6,-4 22,-16"/>' +
    '<path d="M-46,-54 L-80,-72 M-46,-38 L-86,-44 M-46,-22 L-80,-8"/>' +
    '<path d="M54,-54 L88,-72 M54,-38 L94,-44 M54,-22 L88,-8"/>' +
    '<circle cx="-80" cy="-72" r="7"/><circle cx="-86" cy="-44" r="7"/><circle cx="-80" cy="-8" r="7"/>' +
    '<circle cx="88" cy="-72" r="7"/><circle cx="94" cy="-44" r="7"/><circle cx="88" cy="-8" r="7"/>' +
    '<path d="M-38,68 Q-58,80 -50,94"/>' +
    '<circle cx="-18" cy="-42" r="8" fill="var(--motivo,#fff)" stroke="none"/>' +
    '<circle cx="26" cy="-42" r="8" fill="var(--motivo,#fff)" stroke="none"/>',

  mascaras:
    '<path d="M0,-90 C48,-90 78,-52 78,-6 C78,46 44,90 0,90 C-44,90 -78,46 -78,-6 C-78,-52 -48,-90 0,-90 Z"/>' +
    '<path d="M-54,-24 Q-30,-46 -8,-24 Q-30,-4 -54,-24 Z"/>' +
    '<path d="M54,-24 Q30,-46 8,-24 Q30,-4 54,-24 Z"/>' +
    '<path d="M0,-62 V-2"/>' +
    '<path d="M-66,-44 Q0,-74 66,-44"/>' +
    '<path d="M-26,34 Q0,50 26,34"/>' +
    '<path d="M-40,60 Q0,74 40,60"/>' +
    '<path d="M-30,8 L-14,20 M30,8 L14,20"/>',

  alebrijes:
    '<path d="M0,-40 C26,-40 44,-22 44,2 C44,26 26,44 0,44 C-26,44 -44,26 -44,2 C-44,-22 -26,-40 0,-40 Z"/>' +
    '<path d="M-42,-14 L-100,-56 L-90,-18 L-104,-2 L-74,12 L-43,12 Z"/>' +
    '<path d="M42,-14 L100,-56 L90,-18 L104,-2 L74,12 L43,12 Z"/>' +
    '<path d="M-18,-40 L-28,-74 M18,-40 L28,-74"/>' +
    '<circle cx="-28" cy="-74" r="7"/><circle cx="28" cy="-74" r="7"/>' +
    '<path d="M-12,16 Q0,26 12,16"/>' +
    '<path d="M0,44 C4,68 -14,76 -22,88 C-28,98 -14,104 -6,94"/>' +
    '<circle cx="-16" cy="-12" r="9" fill="var(--motivo,#fff)" stroke="none"/>' +
    '<circle cx="16" cy="-12" r="9" fill="var(--motivo,#fff)" stroke="none"/>',

  tradicion:
    '<circle cx="0" cy="0" r="17"/><circle cx="0" cy="0" r="36"/>' +
    '<path d="M0,-36 V-74 M0,36 V74 M-36,0 H-74 M36,0 H74"/>' +
    '<path d="M-26,-26 L-54,-54 M26,-26 L54,-54 M-26,26 L-54,54 M26,26 L54,54"/>' +
    '<circle cx="0" cy="-84" r="8"/><circle cx="0" cy="84" r="8"/>' +
    '<circle cx="-84" cy="0" r="8"/><circle cx="84" cy="0" r="8"/>' +
    '<circle cx="-62" cy="-62" r="7"/><circle cx="62" cy="-62" r="7"/>' +
    '<circle cx="-62" cy="62" r="7"/><circle cx="62" cy="62" r="7"/>' +
    '<path d="M-13,-6 L0,-18 L13,-6 L0,8 Z" fill="var(--motivo,#fff)" stroke="none"/>'
};

function inyectarSimbolos() {
  var partes = [];
  for (var clave in MOTIVOS) {
    if (!Object.prototype.hasOwnProperty.call(MOTIVOS, clave)) continue;
    partes.push(
      '<symbol id="tee-' + clave + '" viewBox="0 0 300 340">' + SILUETA +
      '<g transform="translate(150 198) scale(.6)" fill="none" stroke="var(--motivo,#ffffff)" ' +
      'stroke-width="5" stroke-linejoin="round" stroke-linecap="round">' + MOTIVOS[clave] + '</g>' +
      '</symbol>'
    );
  }
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.position = 'absolute';
  svg.innerHTML = partes.join('');
  document.body.insertBefore(svg, document.body.firstChild);
}

/* ============ 3. AYUDANTES ============ */
function $(sel, raiz) { return (raiz || document).querySelector(sel); }
function $$(sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); }

function pesos(n) {
  return '$' + n.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function escapar(txt) {
  return String(txt).replace(/[&<>"']/g, function (c) {
    return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
  });
}

function sinAcentos(txt) {
  return String(txt).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function porId(id) {
  for (var i = 0; i < CATALOGO.length; i++) {
    if (CATALOGO[i].id === id) return CATALOGO[i];
  }
  return null;
}

function precioDe(p) { return p.precio || PRECIO; }

/* Las tallas van agrupadas por corte: una "M" de dama no es una "M" de
   caballero, asi que el pedido tiene que decir de cual se trata. */
function gruposDeTalla(p) {
  return p.secciones.map(function (s) {
    return { corte: NOMBRE_SECCION[s], tallas: TALLAS[s] || [] };
  }).filter(function (g) { return g.tallas.length; });
}

function primeraTalla(p) {
  var grupos = gruposDeTalla(p);
  if (!grupos.length) return { talla: 'Unica', corte: '' };
  return { talla: grupos[0].tallas[0], corte: grupos[0].corte };
}

function etiquetaTalla(renglon) {
  return 'Talla ' + renglon.talla + (renglon.corte ? ' · ' + renglon.corte : '');
}

function dibujo(p, clase) {
  return '<svg class="' + (clase || '') + '" viewBox="0 0 300 340" role="img" aria-label="Playera ' +
    escapar(p.nombre) + '" style="color:' + p.playera + ';--motivo:' + p.motivo + '">' +
    '<use href="#tee-' + p.coleccion + '"></use></svg>';
}

function urlDe(p) { return 'producto.html?id=' + encodeURIComponent(p.id); }

/* Devuelve las piezas que cumplen seccion + coleccion. */
function filtrar(seccion, coleccion, soloDestacados) {
  return CATALOGO.filter(function (p) {
    var okSeccion = !seccion || seccion === 'todo' || p.secciones.indexOf(seccion) !== -1;
    var okColeccion = !coleccion || coleccion === 'todo' || p.coleccion === coleccion;
    var okDestacado = !soloDestacados || p.destacado === true;
    return okSeccion && okColeccion && okDestacado;
  });
}

/* Rellena los huecos decorativos de la portada.
   Uso en el HTML: <div data-dibujo="ajolotes" data-playera="#171017" data-motivo="#ffc700"></div> */
function pintarDibujos() {
  $$('[data-dibujo]').forEach(function (el) {
    var coleccion = el.getAttribute('data-dibujo');
    if (!MOTIVOS[coleccion]) coleccion = 'calaveras';
    var playera = el.getAttribute('data-playera') || '#fdf7f2';
    var motivo = el.getAttribute('data-motivo') || '#e6007e';
    el.insertAdjacentHTML('afterbegin',
      '<svg viewBox="0 0 300 340" aria-hidden="true" style="color:' + playera +
      ';--motivo:' + motivo + '"><use href="#tee-' + coleccion + '"></use></svg>');
  });
}

/* ============ 4. TARJETAS Y REJILLAS ============ */
function tarjeta(p) {
  var etiqueta = '';
  if (p.etiqueta === 'nuevo') {
    etiqueta = '<span class="producto__etiqueta producto__etiqueta--nuevo">Nuevo</span>';
  } else if (p.etiqueta === 'ultimas') {
    etiqueta = '<span class="producto__etiqueta producto__etiqueta--ultimas">Ultimas piezas</span>';
  }
  return '<article class="producto">' +
    '<figure class="producto__figura">' + etiqueta + dibujo(p) + '</figure>' +
    '<div class="producto__cuerpo">' +
      '<span class="producto__coleccion">' + NOMBRE_COLECCION[p.coleccion] + '</span>' +
      '<h3 class="producto__nombre"><a href="' + urlDe(p) + '">' + escapar(p.nombre) + '</a></h3>' +
      '<p class="producto__precio">' + pesos(precioDe(p)) + '</p>' +
      '<button class="boton producto__agregar" type="button" data-agregar="' + p.id + '">Agregar</button>' +
    '</div>' +
  '</article>';
}

/* Pinta una rejilla. El elemento manda con sus data-*:
     data-seccion    dama | caballero | nino | todo
     data-coleccion  calaveras | ... | todo
     data-limite     numero maximo de piezas
     data-excluir    id de una pieza que no debe aparecer
     data-destacados solo las piezas marcadas como destacadas       */
function pintarRejilla(rejilla, coleccionForzada) {
  var seccion = rejilla.getAttribute('data-seccion') || 'todo';
  var coleccion = coleccionForzada || rejilla.getAttribute('data-coleccion') || 'todo';
  var limite = parseInt(rejilla.getAttribute('data-limite'), 10);
  var excluir = rejilla.getAttribute('data-excluir');

  var piezas = filtrar(seccion, coleccion, rejilla.hasAttribute('data-destacados'));
  if (excluir) {
    piezas = piezas.filter(function (p) { return p.id !== excluir; });
  }
  if (limite > 0) piezas = piezas.slice(0, limite);

  if (!piezas.length) {
    rejilla.innerHTML = '<p class="rejilla__vacio">Todavia no hay piezas en esta coleccion. ' +
      'Escribenos por WhatsApp y te contamos que viene en camino.</p>';
  } else {
    rejilla.innerHTML = piezas.map(tarjeta).join('');
  }
  return piezas.length;
}

function actualizarCuenta(n) {
  var cuenta = $('#cuenta-productos');
  if (!cuenta) return;
  cuenta.textContent = n === 1 ? '1 pieza' : n + ' piezas';
}

/* ============ 5. PESTANAS DE COLECCION ============ */
function iniciarPestanas() {
  var pestanas = $$('.pestana-cat');
  var rejilla = $('#rejilla-categoria');
  if (!pestanas.length || !rejilla) return;

  function aplicar(coleccion) {
    pestanas.forEach(function (b) {
      b.setAttribute('aria-selected', String(b.getAttribute('data-coleccion') === coleccion));
    });
    actualizarCuenta(pintarRejilla(rejilla, coleccion));
    if (history.replaceState) {
      history.replaceState(null, '', coleccion === 'todo' ? location.pathname : '#' + coleccion);
    }
  }

  pestanas.forEach(function (b) {
    b.addEventListener('click', function () {
      aplicar(b.getAttribute('data-coleccion'));
    });
  });

  var inicial = location.hash.replace('#', '');
  var valida = pestanas.some(function (b) { return b.getAttribute('data-coleccion') === inicial; });
  aplicar(valida ? inicial : 'todo');

  window.addEventListener('hashchange', function () {
    var h = location.hash.replace('#', '');
    if (pestanas.some(function (b) { return b.getAttribute('data-coleccion') === h; })) aplicar(h);
  });
}

/* ============ 6. FICHA DE PRODUCTO ============ */
function iniciarFicha() {
  var ficha = $('#ficha');
  if (!ficha) return;

  var id = new URLSearchParams(location.search).get('id');
  var p = id ? porId(id) : null;

  if (!p) {
    ficha.innerHTML = '<div class="ficha__vacia">' +
      '<h1>No encontramos esa pieza</h1>' +
      '<p>Puede que ya se haya agotado o que el enlace este incompleto.</p>' +
      '<a class="boton" href="tienda.html">Ver toda la tienda</a></div>';
    document.title = 'Pieza no encontrada · Huesitos';
    var rel = $('#rejilla-relacionados');
    if (rel) { rel.setAttribute('data-limite', '4'); pintarRejilla(rel); }
    return;
  }

  document.title = p.nombre + ' · Huesitos';
  var meta = $('meta[name="description"]');
  if (meta) meta.setAttribute('content', p.texto);

  var grupos = gruposDeTalla(p);
  var secciones = p.secciones.map(function (s) { return NOMBRE_SECCION[s]; }).join(' · ');
  var primera = primeraTalla(p);

  ficha.innerHTML =
    '<div class="ficha__galeria">' + dibujo(p) + '</div>' +
    '<div class="ficha__datos">' +
      '<p class="migas"><a href="index.html">Inicio</a> / <a href="tienda.html">Tienda</a> / ' +
        escapar(p.nombre) + '</p>' +
      '<h1>' + escapar(p.nombre) + '</h1>' +
      '<p class="ficha__precio">' + pesos(precioDe(p)) + '</p>' +
      '<p class="ficha__impuesto">Precio con IVA incluido. Envio calculado al confirmar por WhatsApp.</p>' +
      '<p class="ficha__descripcion">' + escapar(p.texto) + '</p>' +

      '<div class="campo">' +
        '<span class="campo__titulo">Talla</span>' +
        '<div id="tallas">' +
          grupos.map(function (g, gi) {
            return '<div class="grupo-tallas">' +
              (grupos.length > 1 ? '<span class="grupo-tallas__corte">Corte ' + g.corte + '</span>' : '') +
              '<div class="tallas">' +
                g.tallas.map(function (t, i) {
                  return '<button class="talla" type="button" aria-pressed="' +
                    (gi === 0 && i === 0) + '" data-talla="' + t + '" data-corte="' + g.corte +
                    '">' + t + '</button>';
                }).join('') +
              '</div></div>';
          }).join('') +
        '</div>' +
      '</div>' +

      '<div class="campo">' +
        '<span class="campo__titulo">Cantidad</span>' +
        '<div class="cantidad">' +
          '<button type="button" id="menos" aria-label="Quitar una">&minus;</button>' +
          '<output id="cantidad" aria-live="polite">1</output>' +
          '<button type="button" id="mas" aria-label="Agregar una">+</button>' +
        '</div>' +
      '</div>' +

      '<div class="ficha__acciones">' +
        '<button class="boton" type="button" id="agregar-ficha">Agregar al carrito</button>' +
        '<a class="boton boton--linea" id="pedir-directo" href="#" target="_blank" rel="noopener">Pedir por WhatsApp</a>' +
      '</div>' +
      '<p class="ficha__aviso" id="aviso-ficha" role="status"></p>' +

      '<div class="ficha__detalles">' +
        '<details open><summary>Detalles de la pieza</summary><div class="acordeon__cuerpo">' +
          '<p>Coleccion ' + NOMBRE_COLECCION[p.coleccion] + ' · Corte ' + secciones + '</p>' +
          '<p>Algodon 100%, pintada a mano pieza por pieza. Al ser artesanal, ' +
          'no hay dos playeras identicas: pequenas diferencias de trazo son parte del trabajo.</p>' +
        '</div></details>' +
        '<details><summary>Envios y entregas</summary><div class="acordeon__cuerpo">' +
          '<p>Enviamos a todo Mexico en 3 a 5 dias habiles. Tambien puedes recogerla ' +
          'los sabados en el Bazar de San Jacinto, San Angel.</p>' +
        '</div></details>' +
        '<details><summary>Cuidado de la prenda</summary><div class="acordeon__cuerpo">' +
          '<p>Lava a mano o en ciclo delicado con agua fria, del reves. No uses cloro ' +
          'ni secadora, y plancha por el lado sin pintar.</p>' +
        '</div></details>' +
      '</div>' +
    '</div>';

  var cantidad = 1;
  var talla = primera.talla;
  var corte = primera.corte;

  $('#tallas').addEventListener('click', function (e) {
    var b = e.target.closest('.talla');
    if (!b) return;
    talla = b.getAttribute('data-talla');
    corte = b.getAttribute('data-corte') || '';
    $$('.talla', ficha).forEach(function (o) {
      o.setAttribute('aria-pressed', String(o === b));
    });
    enlaceDirecto();
  });

  function pintaCantidad() { $('#cantidad').textContent = String(cantidad); enlaceDirecto(); }
  $('#mas').addEventListener('click', function () { if (cantidad < 20) { cantidad++; pintaCantidad(); } });
  $('#menos').addEventListener('click', function () { if (cantidad > 1) { cantidad--; pintaCantidad(); } });

  function enlaceDirecto() {
    var texto = 'Hola Huesitos, me interesa la playera "' + p.nombre + '" en talla ' + talla +
      (corte ? ' de ' + corte.toLowerCase() : '') +
      ' (' + cantidad + ' pieza' + (cantidad > 1 ? 's' : '') + '). ' + location.href;
    $('#pedir-directo').href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto);
  }
  enlaceDirecto();

  $('#agregar-ficha').addEventListener('click', function () {
    agregar(p.id, talla, corte, cantidad);
    $('#aviso-ficha').textContent = 'Listo, se agrego al carrito.';
    abrirCarrito();
  });

  var relacionados = $('#rejilla-relacionados');
  if (relacionados) {
    relacionados.setAttribute('data-coleccion', p.coleccion);
    relacionados.setAttribute('data-excluir', p.id);
    relacionados.setAttribute('data-limite', '4');
    if (!pintarRejilla(relacionados)) {
      relacionados.removeAttribute('data-coleccion');
      pintarRejilla(relacionados);
    }
  }
}

/* ============ 7. BUSCADOR ============ */
function iniciarBuscador() {
  var boton = $('#btn-buscar');
  var caja = $('#caja-buscar');
  if (!boton || !caja) return;

  var campo = $('input', caja);
  var salida = $('#resultados');

  boton.addEventListener('click', function () {
    var abierto = caja.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', String(abierto));
    if (abierto && campo) campo.focus();
  });

  if (!campo || !salida) return;

  function buscar() {
    var q = sinAcentos(campo.value.trim());
    if (q.length < 2) { salida.innerHTML = ''; return; }

    var hallazgos = CATALOGO.filter(function (p) {
      var heno = sinAcentos([p.nombre, NOMBRE_COLECCION[p.coleccion], p.texto,
        p.secciones.map(function (s) { return NOMBRE_SECCION[s]; }).join(' ')].join(' '));
      return q.split(/\s+/).every(function (parte) { return heno.indexOf(parte) !== -1; });
    }).slice(0, 6);

    if (!hallazgos.length) {
      salida.innerHTML = '<p class="resultados__vacio">Sin coincidencias para &laquo;' +
        escapar(campo.value.trim()) + '&raquo;. Prueba con calaveras, ajolotes, mascaras, ' +
        'alebrijes o tradicion.</p>';
      return;
    }

    salida.innerHTML = '<ul class="resultados__lista">' + hallazgos.map(function (p) {
      return '<li><a href="' + urlDe(p) + '">' + dibujo(p) +
        '<span><b>' + escapar(p.nombre) + '</b>' +
        '<span>' + NOMBRE_COLECCION[p.coleccion] + ' · ' + pesos(precioDe(p)) + '</span></span></a></li>';
    }).join('') + '</ul>';
  }

  campo.addEventListener('input', buscar);
  campo.addEventListener('search', buscar);
  $('form', caja).addEventListener('submit', function (e) { e.preventDefault(); buscar(); });
}

/* ============ 8. CARRITO ============ */
var LLAVE = 'huesitos:carrito';
var carrito = [];

function leerCarrito() {
  try {
    var crudo = localStorage.getItem(LLAVE);
    var datos = crudo ? JSON.parse(crudo) : [];
    carrito = Array.isArray(datos) ? datos.filter(function (r) { return porId(r.id); }) : [];
    carrito.forEach(function (r) { if (typeof r.corte !== 'string') r.corte = ''; });
  } catch (e) {
    carrito = [];
  }
}

function guardarCarrito() {
  try { localStorage.setItem(LLAVE, JSON.stringify(carrito)); } catch (e) { /* modo privado */ }
}

function agregar(id, talla, corte, cantidad) {
  var p = porId(id);
  if (!p) return;
  if (!talla) {
    var inicial = primeraTalla(p);
    talla = inicial.talla;
    corte = inicial.corte;
  }
  corte = corte || '';
  cantidad = cantidad || 1;

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id && carrito[i].talla === talla && carrito[i].corte === corte) {
      carrito[i].cantidad = Math.min(20, carrito[i].cantidad + cantidad);
      guardarCarrito(); pintarCarrito(); return;
    }
  }
  carrito.push({ id: id, talla: talla, corte: corte, cantidad: cantidad });
  guardarCarrito();
  pintarCarrito();
}

function cambiarCantidad(indice, delta) {
  var r = carrito[indice];
  if (!r) return;
  r.cantidad += delta;
  if (r.cantidad < 1) carrito.splice(indice, 1);
  else r.cantidad = Math.min(20, r.cantidad);
  guardarCarrito();
  pintarCarrito();
}

function totalCarrito() {
  return carrito.reduce(function (suma, r) {
    var p = porId(r.id);
    return suma + (p ? precioDe(p) * r.cantidad : 0);
  }, 0);
}

function piezasCarrito() {
  return carrito.reduce(function (suma, r) { return suma + r.cantidad; }, 0);
}

function mensajeWhatsApp() {
  if (!carrito.length) return 'https://wa.me/' + WHATSAPP;
  var lineas = carrito.map(function (r) {
    var p = porId(r.id);
    return '• ' + p.nombre + ' — talla ' + r.talla +
      (r.corte ? ' de ' + r.corte.toLowerCase() : '') +
      ' × ' + r.cantidad + ' — ' + pesos(precioDe(p) * r.cantidad);
  });
  var texto = 'Hola Huesitos, quiero hacer este pedido:\n\n' + lineas.join('\n') +
    '\n\nTotal: ' + pesos(totalCarrito()) + '\n\n¿Me confirman disponibilidad y envio?';
  return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto);
}

function pintarCarrito() {
  var contador = $('#contador-carrito');
  var n = piezasCarrito();
  if (contador) {
    contador.textContent = String(n);
    contador.classList.toggle('visible', n > 0);
  }

  var lista = $('#carrito-lista');
  if (!lista) return;

  if (!carrito.length) {
    lista.innerHTML = '<p class="carrito__vacio">Tu carrito esta vacio.<br>' +
      'Todas nuestras playeras cuestan ' + pesos(PRECIO) + '.</p>';
  } else {
    lista.innerHTML = carrito.map(function (r, i) {
      var p = porId(r.id);
      return '<div class="renglon">' +
        '<figure class="renglon__figura">' + dibujo(p) + '</figure>' +
        '<div>' +
          '<b>' + escapar(p.nombre) + '</b>' +
          '<small>' + escapar(etiquetaTalla(r)) + '</small>' +
          '<div class="renglon__control">' +
            '<button type="button" data-menos="' + i + '" aria-label="Quitar una">&minus;</button>' +
            '<span>' + r.cantidad + '</span>' +
            '<button type="button" data-mas="' + i + '" aria-label="Agregar una">+</button>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<p class="renglon__precio">' + pesos(precioDe(p) * r.cantidad) + '</p>' +
          '<button class="renglon__quitar" type="button" data-quitar="' + i + '">Quitar</button>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  var total = $('#carrito-total');
  if (total) total.textContent = pesos(totalCarrito());

  var boton = $('#carrito-whatsapp');
  if (boton) {
    boton.href = mensajeWhatsApp();
    boton.setAttribute('aria-disabled', String(!carrito.length));
  }
}

function abrirCarrito() {
  var panel = $('#carrito'), fondo = $('#carrito-fondo');
  if (!panel) return;
  panel.classList.add('abierto');
  panel.setAttribute('aria-hidden', 'false');
  if (fondo) fondo.classList.add('visible');
  var cerrar = $('#carrito-cerrar');
  if (cerrar) cerrar.focus();
}

function cerrarCarrito() {
  var panel = $('#carrito'), fondo = $('#carrito-fondo');
  if (!panel) return;
  panel.classList.remove('abierto');
  panel.setAttribute('aria-hidden', 'true');
  if (fondo) fondo.classList.remove('visible');
}

function iniciarCarrito() {
  leerCarrito();
  pintarCarrito();

  var btn = $('#btn-carrito');
  if (btn) btn.addEventListener('click', abrirCarrito);

  var cerrar = $('#carrito-cerrar');
  if (cerrar) cerrar.addEventListener('click', cerrarCarrito);

  var fondo = $('#carrito-fondo');
  if (fondo) fondo.addEventListener('click', cerrarCarrito);

  var vaciar = $('#carrito-vaciar');
  if (vaciar) vaciar.addEventListener('click', function () {
    carrito = [];
    guardarCarrito();
    pintarCarrito();
  });

  var lista = $('#carrito-lista');
  if (lista) lista.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-mas'))    cambiarCantidad(+b.getAttribute('data-mas'), 1);
    if (b.hasAttribute('data-menos'))  cambiarCantidad(+b.getAttribute('data-menos'), -1);
    if (b.hasAttribute('data-quitar')) {
      carrito.splice(+b.getAttribute('data-quitar'), 1);
      guardarCarrito();
      pintarCarrito();
    }
  });

  var whats = $('#carrito-whatsapp');
  if (whats) whats.addEventListener('click', function (e) {
    if (!carrito.length) e.preventDefault();
  });

  /* Boton "Agregar" de cualquier tarjeta, en cualquier rejilla. */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-agregar]');
    if (!b) return;
    e.preventDefault();
    agregar(b.getAttribute('data-agregar'));
    abrirCarrito();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarCarrito();
  });
}

/* ============ 9. ENCABEZADO, MENU, MARQUESINA Y COOKIES ============ */
function iniciarEncabezado() {
  var cabecera = $('#cabecera');
  if (cabecera) {
    var alSubir = function () {
      cabecera.classList.toggle('flotando', window.scrollY > 8);
    };
    window.addEventListener('scroll', alSubir, { passive: true });
    alSubir();
  }

  var btnMenu = $('#btn-menu');
  var nav = $('#nav');
  if (btnMenu && nav) {
    btnMenu.addEventListener('click', function () {
      var abierto = nav.classList.toggle('abierto');
      btnMenu.setAttribute('aria-expanded', String(abierto));
      document.body.style.overflow = abierto ? 'hidden' : '';
    });

    /* En movil, la flecha abre el submenu en vez de navegar. */
    $$('.nav__item').forEach(function (item) {
      var flecha = $('.nav__flecha', item);
      if (!flecha) return;
      flecha.addEventListener('click', function (e) {
        if (window.matchMedia('(max-width:860px)').matches) {
          e.preventDefault();
          item.classList.toggle('desplegado');
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('abierto')) return;
      if (nav.contains(e.target) || btnMenu.contains(e.target)) return;
      nav.classList.remove('abierto');
      btnMenu.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }

  /* La marquesina se duplica para que el bucle sea continuo. */
  var pista = $('#pista-avisos');
  if (pista && !pista.dataset.duplicada) {
    pista.innerHTML += pista.innerHTML;
    pista.dataset.duplicada = '1';
  }
}

function iniciarCookies() {
  var caja = $('#cookies');
  var boton = $('#btn-cookies');
  if (!caja || !boton) return;

  var aceptadas = false;
  try { aceptadas = localStorage.getItem('huesitos:cookies') === '1'; } catch (e) {}
  if (aceptadas) { caja.remove(); return; }

  setTimeout(function () { caja.classList.add('visible'); }, 900);
  boton.addEventListener('click', function () {
    caja.classList.remove('visible');
    try { localStorage.setItem('huesitos:cookies', '1'); } catch (e) {}
    setTimeout(function () { caja.remove(); }, 400);
  });
}

/* Los formularios del sitio no tienen servidor: confirmamos en pantalla. */
function iniciarFormularios() {
  $$('.pie__boletin form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var campo = $('input', form);
      if (campo && !campo.checkValidity()) { campo.reportValidity(); return; }
      form.innerHTML = '<p style="margin:0;text-align:center;width:100%">' +
        'Gracias, ya estas en la lista. Te escribimos cuando salga la proxima coleccion.</p>';
    });
  });
}

/* ============ 10. ARRANQUE ============ */
function iniciar() {
  inyectarSimbolos();
  pintarDibujos();

  /* Rejillas estaticas (portada, tienda, relacionados). */
  $$('.rejilla').forEach(function (r) {
    if (r.id === 'rejilla-categoria' || r.id === 'rejilla-relacionados') return;
    pintarRejilla(r);
  });

  /* Rejilla de categoria: la manejan las pestanas si existen. */
  var categoria = $('#rejilla-categoria');
  if (categoria && !$('.pestana-cat')) actualizarCuenta(pintarRejilla(categoria));

  iniciarPestanas();
  iniciarFicha();
  iniciarBuscador();
  iniciarCarrito();
  iniciarEncabezado();
  iniciarCookies();
  iniciarFormularios();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciar);
} else {
  iniciar();
}

})();
