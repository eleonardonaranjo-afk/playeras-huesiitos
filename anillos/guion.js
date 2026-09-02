/* ===================================================================
   SOPLO · Anillos de cristal soplado a mano

   Guion unico del sitio. Sin librerias, sin compilacion.

   Indice:
     1. Marca y ajustes  (edita aqui el nombre, el telefono y los envios)
     2. Catalogo         (edita aqui los anillos)
     3. Dibujos de cristal
     4. Ayudantes
     5. Tarjetas y rejillas
     6. Filtros
     7. Ficha de producto
     8. Buscador
     9. Bolsa (se guarda en el navegador)
    10. Encabezado, menu y avisos
    11. Arranque
   =================================================================== */
(function () {
'use strict';

/* ============ 1. MARCA Y AJUSTES ============ */
var MARCA = {
  nombre:'Soplo',
  lema:'Anillos de cristal soplado a mano',
  whatsapp:'525643120421',      /* solo digitos, con lada del pais */
  instagram:'https://www.instagram.com/',
  envioGratis:1200,             /* pedidos desde este monto no pagan envio */
  moneda:'MXN'
};

/* ============ 2. CATALOGO ============
   Campos de cada anillo:
     id          identificador unico; va en la URL de la ficha
     nombre      como se muestra
     familia     aros | gotas | flores | apilables
     precio      en pesos
     cristal     color del vidrio ('transparente' para el cristal limpio)
     acento      segundo color: las gotitas, el centro de la flor
     medidas     numeros de anillo disponibles, o ['Ajustable']
     etiqueta    'nuevo' | 'ultima' | '' (opcional)
     destacado   true para que salga en la portada
     texto       descripcion de la ficha
     foto        ruta de tu foto, ej. 'imagenes/aro-cielo.jpg'.
                 Si no la pones, se dibuja la pieza en SVG.
   ==================================== */
var CATALOGO = [
  /* --- aros macizos --- */
  { id:'aro-azul', nombre:'Aro Cielo', familia:'aros', precio:780,
    cristal:'#5fa8d8', acento:'#bfe4fb', medidas:['5','6','7','8'], etiqueta:'nuevo', destacado:true,
    texto:'Aro macizo de vidrio azul, doblado a mano en caliente. La silueta sale distinta cada vez: por eso ninguno es exactamente igual a este.' },
  { id:'aro-cobalto', nombre:'Aro Cobalto', familia:'aros', precio:820,
    cristal:'#2a5ba8', acento:'#8fb6ee', medidas:['5','6','7','8'], etiqueta:'', destacado:true,
    texto:'Azul profundo, casi tinta contra la sombra. Al sol se le ve la veta clara que dejo la varilla al torcerse.' },
  { id:'aro-ambar', nombre:'Aro Ambar', familia:'aros', precio:820,
    cristal:'#a83c12', acento:'#ffb765', medidas:['5','6','7','8'], etiqueta:'', destacado:true,
    texto:'Del color exacto del vidrio cuando sale de la llama. Contra la luz se enciende entero, en naranja y rojo.' },
  { id:'aro-rosa', nombre:'Aro Rosa', familia:'aros', precio:780,
    cristal:'#e58fae', acento:'#ffd3e2', medidas:['5','6','7','8'], etiqueta:'', destacado:true,
    texto:'Rosa translucido, macizo y redondo. De los que se notan sin hacer ruido.' },
  { id:'aro-esmeralda', nombre:'Aro Esmeralda', familia:'aros', precio:840,
    cristal:'#1f8f4a', acento:'#8ce8b0', medidas:['6','7','8'], etiqueta:'ultima', destacado:false,
    texto:'Verde botella con burbujas atrapadas dentro del cristal. Queda una sola pieza de este color.' },
  { id:'aro-limpio', nombre:'Aro Limpio', familia:'aros', precio:720,
    cristal:'transparente', acento:'#e2eef4', medidas:['4','5','6','7','8','9'], etiqueta:'', destacado:false,
    texto:'Cristal sin color, pulido a la llama. Toma el tono de lo que traigas puesto.' },

  /* --- espirales --- */
  { id:'esp-marea', nombre:'Espiral Marea', familia:'espirales', precio:1150,
    cristal:'#4fbfd0', acento:'#c9f2f6', medidas:['6','7','8'], etiqueta:'nuevo', destacado:true,
    texto:'El vidrio se enrolla sobre si mismo mientras esta blando, como un caracol. La espiral queda distinta en cada pieza porque se hace de un tiron, sin poder corregir.' },
  { id:'esp-rubi', nombre:'Espiral Rubi', familia:'espirales', precio:1190,
    cristal:'#a81222', acento:'#ff8a8a', medidas:['6','7','8'], etiqueta:'', destacado:true,
    texto:'Rojo profundo que se abre en vetas mas claras hacia el centro del rollo. Contra la luz se ve el recorrido completo del vidrio.' },
  { id:'esp-nube', nombre:'Espiral Nube', familia:'espirales', precio:1150,
    cristal:'#e9e4de', acento:'#ffffff', medidas:['6','7','8'], etiqueta:'', destacado:false,
    texto:'Blanco opalino, casi lechoso. Es la mas discreta de las espirales y la que mejor va con todo.' },
  { id:'esp-tabaco', nombre:'Espiral Tabaco', familia:'espirales', precio:1190,
    cristal:'#7a3a1c', acento:'#e0a06a', medidas:['6','7','8'], etiqueta:'ultima', destacado:false,
    texto:'Cafe con reflejos miel. De lejos parece ambar oscuro; de cerca se le ven las capas.' },

  /* --- racimos de piedras --- */
  { id:'rac-mixto', nombre:'Racimo Mixto', familia:'racimos', precio:1290,
    cristal:'transparente', acento:'#8e8ccc', medidas:['6','7','8'], etiqueta:'nuevo', destacado:true,
    texto:'Siete piedras de cristal pulido, cada una soplada aparte y pegada en caliente sobre el aro. Van mezcladas: transparentes, lilas y azules.' },
  { id:'rac-marino', nombre:'Racimo Marino', familia:'racimos', precio:1290,
    cristal:'#4f8fd0', acento:'#1f4f8f', medidas:['6','7','8'], etiqueta:'', destacado:false,
    texto:'El mismo racimo en toda la gama de azules, del cielo al cobalto.' },
  { id:'rac-limpio', nombre:'Racimo Limpio', familia:'racimos', precio:1220,
    cristal:'transparente', acento:'#dbe9f0', medidas:['6','7','8'], etiqueta:'', destacado:false,
    texto:'Todas las piedras sin color. De frente parece espuma detenida sobre el dedo.' },

  /* --- coronas de gotitas --- */
  { id:'got-limpia', nombre:'Gotas de Escarcha', familia:'gotas', precio:980,
    cristal:'transparente', acento:'#dff0f7', medidas:['5','6','7','8'], etiqueta:'nuevo', destacado:true,
    texto:'Una cresta de gotitas de cristal, puestas una por una sobre el aro. Son cerca de treinta, y cada una se sopla y se pega por separado.' },
  { id:'got-verde', nombre:'Gotas de Musgo', familia:'gotas', precio:1020,
    cristal:'transparente', acento:'#7cc24a', medidas:['5','6','7','8'], etiqueta:'', destacado:true,
    texto:'Las mismas gotitas, en verde limon sobre aro transparente. Es la que mas se voltea a ver.' },
  { id:'got-azul', nombre:'Gotas de Hielo', familia:'gotas', precio:1020,
    cristal:'transparente', acento:'#7fb8e8', medidas:['5','6','7','8'], etiqueta:'', destacado:false,
    texto:'Gotitas azul claro apinadas sobre el aro limpio. De cerca parece agua congelada a medio caer.' },
  { id:'got-rosa', nombre:'Gotas de Rubor', familia:'gotas', precio:1020,
    cristal:'transparente', acento:'#f0a8c4', medidas:['6','7','8'], etiqueta:'ultima', destacado:false,
    texto:'La version rosa palido. Cambia bastante segun la luz: casi blanca en interiores, rosa al sol.' },

  /* --- flores --- */
  { id:'flo-azul', nombre:'Flor Azul', familia:'flores', precio:1180,
    cristal:'#8fb9e8', acento:'#1f5fa8', medidas:['6','7','8'], etiqueta:'nuevo', destacado:true,
    texto:'Cinco petalos soplados hueco por hueco y unidos en caliente, con una gota azul en el centro. Es la pieza que mas tiempo lleva del taller.' },
  { id:'flo-limpia', nombre:'Flor Limpia', familia:'flores', precio:1120,
    cristal:'transparente', acento:'#cfe2ec', medidas:['6','7','8'], etiqueta:'', destacado:true,
    texto:'La misma flor, toda en cristal sin color. Los petalos se ven huecos por dentro, como vidrio soplado de verdad.' },
  { id:'flo-ambar', nombre:'Flor Ambar', familia:'flores', precio:1180,
    cristal:'#e8a24a', acento:'#c2521f', medidas:['6','7','8'], etiqueta:'', destacado:false,
    texto:'Petalos color miel con el corazon rojo. Es la mas calida de las tres.' },

  /* --- apilables --- */
  { id:'api-limpio', nombre:'Apilable Limpio', familia:'apilables', precio:520,
    cristal:'transparente', acento:'#e4eef3', medidas:['4','5','6','7','8','9'], etiqueta:'', destacado:true,
    texto:'Aro delgado y liso, para traer solo o para juntar con otros. El mas facil de usar todos los dias.' },
  { id:'api-verde', nombre:'Apilable Bosque', familia:'apilables', precio:560,
    cristal:'#14563a', acento:'#5fb98a', medidas:['5','6','7','8'], etiqueta:'', destacado:false,
    texto:'Verde oscuro, casi negro en sombra. Se ve muy bien encimado con el ambar.' },
  { id:'api-ambar', nombre:'Apilable Miel', familia:'apilables', precio:560,
    cristal:'#d98218', acento:'#ffd79a', medidas:['5','6','7','8'], etiqueta:'', destacado:false,
    texto:'Miel translucido con vetas mas oscuras. Cambia de tono segun donde le pegue la luz.' },
  { id:'api-torcido', nombre:'Apilable Torcido', familia:'apilables', precio:620,
    cristal:'transparente', acento:'#d6e6ee', medidas:['Ajustable'], etiqueta:'nuevo', destacado:false,
    texto:'Se tuerce en caliente antes de cerrar el aro, asi que la torsion nunca sale igual. Se abre y cierra un poco con los dedos para ajustar.' }
];

var NOMBRE_FAMILIA = {
  aros:'Aros',
  espirales:'Espirales',
  gotas:'Gotas',
  racimos:'Racimos',
  flores:'Flores',
  apilables:'Apilables'
};

var TEXTO_FAMILIA = {
  aros:'Macizos y organicos, doblados a mano en caliente.',
  espirales:'Vidrio enrollado sobre si mismo, de un tiron.',
  gotas:'Una cresta de gotitas puestas una por una.',
  racimos:'Piedras pulidas, sopladas y pegadas en caliente.',
  flores:'Petalos soplados hueco por hueco.',
  apilables:'Aros delgados, para traer solos o encimados.'
};

/* ============ 3. DIBUJOS DE CRISTAL ============
   Los anillos se dibujan en SVG, no son fotos. Cada pieza arma sus
   propios degradados, por eso lleva un numero de serie que no se repite.
   Cuando tengas fotos del taller, cambia dibujo() por una etiqueta <img>.
   ============================================== */
var serie = 0;

function tonos(anillo) {
  if (anillo.cristal === 'transparente') {
    return { claro:'#ffffff', medio:'#dcebf2', hondo:'#9fb9c6' };
  }
  return { claro:anillo.acento || '#ffffff', medio:anillo.cristal, hondo:anillo.cristal };
}

function degradados(anillo, n) {
  var t = tonos(anillo);
  var ac = anillo.acento || t.medio;
  return '<defs>' +
    /* el cuerpo del vidrio: claro arriba a la izquierda, hondo abajo */
    '<linearGradient id="v' + n + '" x1="16%" y1="2%" x2="78%" y2="100%">' +
      '<stop offset="0%"   stop-color="#ffffff" stop-opacity=".92"/>' +
      '<stop offset="22%"  stop-color="' + t.claro + '" stop-opacity=".7"/>' +
      '<stop offset="58%"  stop-color="' + t.medio + '" stop-opacity=".72"/>' +
      '<stop offset="100%" stop-color="' + t.hondo + '" stop-opacity=".86"/>' +
    '</linearGradient>' +
    /* el borde: donde el vidrio se ve mas denso porque lo cruzas de canto */
    '<linearGradient id="b' + n + '" x1="0%" y1="0%" x2="60%" y2="100%">' +
      '<stop offset="0%"   stop-color="' + t.hondo + '" stop-opacity=".5"/>' +
      '<stop offset="50%"  stop-color="' + t.medio + '" stop-opacity=".8"/>' +
      '<stop offset="100%" stop-color="' + t.hondo + '" stop-opacity=".6"/>' +
    '</linearGradient>' +
    /* las gotitas, piedras y centros de flor */
    '<radialGradient id="g' + n + '" cx="33%" cy="26%" r="78%">' +
      '<stop offset="0%"   stop-color="#ffffff" stop-opacity=".9"/>' +
      '<stop offset="42%"  stop-color="' + ac + '" stop-opacity=".55"/>' +
      '<stop offset="100%" stop-color="' + ac + '" stop-opacity=".82"/>' +
    '</radialGradient>' +
    '<filter id="s' + n + '" x="-20%" y="-20%" width="140%" height="140%">' +
      '<feDropShadow dx="3" dy="7" stdDeviation="7" flood-color="#3a4a55" flood-opacity=".2"/>' +
    '</filter>' +
  '</defs>';
}

function brillo(cx, cy, rx, ry, giro, alfa) {
  return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry +
    '" fill="#ffffff" opacity="' + (alfa === undefined ? .7 : alfa) + '" transform="rotate(' +
    (giro === undefined ? -30 : giro) + ' ' + cx + ' ' + cy + ')"/>';
}

/* El aro macizo. El contorno va desparejo a proposito: se dobla a mano,
   no sale redondo. 'hueco' abre mas el centro, para los apilables. */
var ARO_FUERA = 'M148 40 C197 37 243 65 255 110 C267 155 250 203 213 231 ' +
                'C185 253 147 263 115 253 C71 239 41 199 39 151 ' +
                'C37 104 70 60 116 45 C126 41 137 40 148 40 Z';

function aroDentro(hueco) {
  return hueco
    ? 'M150 88 C191 85 220 116 219 153 C218 191 188 219 149 219 ' +
      'C111 219 82 190 83 152 C84 116 112 90 150 88 Z'
    : 'M157 107 C188 105 210 126 209 153 C208 184 185 205 156 207 ' +
      'C125 209 100 189 99 162 C98 135 122 111 150 108 C152 107.6 155 107 157 107 Z';
}

function aro(n, hueco) {
  var dentro = aroDentro(hueco);
  return '<g filter="url(#s' + n + ')">' +
    '<path d="' + ARO_FUERA + ' ' + dentro + '" fill-rule="evenodd" fill="url(#v' + n + ')"/>' +
    /* canto exterior e interior: el vidrio se ve mas denso de perfil */
    '<path d="' + ARO_FUERA + '" fill="none" stroke="url(#b' + n + ')" stroke-width="4"/>' +
    '<path d="' + dentro + '" fill="none" stroke="url(#b' + n + ')" stroke-width="3.4"/>' +
    /* filo iluminado por dentro y por fuera */
    '<path d="' + ARO_FUERA + '" fill="none" stroke="#ffffff" stroke-opacity=".7" stroke-width="1.5"/>' +
    '<path d="' + dentro + '" fill="none" stroke="#ffffff" stroke-opacity=".8" stroke-width="1.5"/>' +
  '</g>' +
    /* reflejos largos, como los que deja una ventana sobre el vidrio */
    brillo(86, 92, 34, 8, -44, .72) +
    brillo(70, 132, 15, 5, -70, .5) +
    brillo(214, 214, 19, 6, -40, .55);
}

/* Gotitas repartidas sobre la mitad de arriba del aro. */
function cresta(n) {
  var gotas = [
    [ 66, 130, 12], [ 74, 100, 14], [ 95,  78, 15], [122,  61, 16],
    [151,  52, 17], [180,  59, 16], [206,  75, 15], [227,  97, 14],
    [239, 125, 12], [ 91, 108, 11], [116,  89, 12], [147,  81, 13],
    [178,  87, 12], [206, 106, 11], [ 57, 155,  9], [247, 152,  9]
  ];
  return gotas.map(function (g) {
    return '<circle cx="' + g[0] + '" cy="' + g[1] + '" r="' + g[2] +
      '" fill="url(#g' + n + ')" stroke="#ffffff" stroke-opacity=".7" stroke-width="1.3"/>' +
      brillo(g[0] - g[2] * .33, g[1] - g[2] * .37, g[2] * .33, g[2] * .19, -30, .85);
  }).join('');
}

/* Cinco petalos soplados alrededor del centro. */
function flor(n) {
  var partes = '';
  for (var i = 0; i < 5; i++) {
    var giro = i * 72;
    var rad = (giro - 90) * Math.PI / 180;
    var cx = (150 + Math.cos(rad) * 46).toFixed(1);
    var cy = (128 + Math.sin(rad) * 46).toFixed(1);
    var eje = 'transform="rotate(' + giro + ' ' + cx + ' ' + cy + ')"';
    partes +=
      '<ellipse cx="' + cx + '" cy="' + cy + '" rx="25" ry="45" ' + eje +
        ' fill="url(#v' + n + ')" stroke="#ffffff" stroke-opacity=".75" stroke-width="1.6"/>' +
      '<ellipse cx="' + cx + '" cy="' + cy + '" rx="11" ry="27" ' + eje +
        ' fill="none" stroke="#ffffff" stroke-opacity=".55" stroke-width="1.2"/>';
  }
  return '<g filter="url(#s' + n + ')">' + partes + '</g>' +
    '<circle cx="150" cy="128" r="19" fill="url(#g' + n + ')" ' +
    'stroke="#ffffff" stroke-opacity=".7" stroke-width="1.4"/>' +
    brillo(143, 121, 7, 4, -30, .85);
}

/* La espiral: el vidrio enrollado sobre si mismo, como un caracol. */
function espiral(n) {
  var puntos = [];
  for (var i = 0; i <= 120; i++) {
    var t = i / 120 * Math.PI * 3.6;          /* poco menos de dos vueltas */
    var r = 12 + t * 9.4;
    puntos.push((150 + Math.cos(t - Math.PI / 2) * r).toFixed(1) + ' ' +
                (146 + Math.sin(t - Math.PI / 2) * r).toFixed(1));
  }
  var trazo = 'M' + puntos.join(' L');

  return '<g filter="url(#s' + n + ')">' +
    '<path d="M150 42 C206 42 254 88 254 146 C254 204 206 250 150 250 ' +
      'C94 250 46 204 46 146 C46 88 94 42 150 42 Z" fill="url(#v' + n + ')"/>' +
    '<path d="' + trazo + '" fill="none" stroke="url(#b' + n + ')" stroke-width="27" ' +
      'stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="' + trazo + '" fill="none" stroke="#ffffff" stroke-opacity=".45" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round"/>' +
    '<circle cx="150" cy="146" r="104" fill="none" stroke="#ffffff" stroke-opacity=".7" stroke-width="2"/>' +
  '</g>' +
    brillo(104, 92, 36, 12, -42, .6) +
    brillo(198, 212, 16, 6, -40, .45);
}

/* El racimo: piedras pulidas de distintos tamanos sobre el aro. */
function racimo(n) {
  var piedras = [
    [104, 150, 30, 27], [150, 127, 37, 34], [197, 148, 31, 28],
    [126, 191, 27, 24], [175, 191, 28, 25], [ 83, 195, 21, 19], [217, 193, 21, 19]
  ];
  return '<g filter="url(#s' + n + ')">' + piedras.map(function (pi, i) {
    var relleno = i % 2 ? 'url(#g' + n + ')' : 'url(#v' + n + ')';
    return '<ellipse cx="' + pi[0] + '" cy="' + pi[1] + '" rx="' + pi[2] + '" ry="' + pi[3] +
      '" fill="' + relleno + '" stroke="#ffffff" stroke-opacity=".7" stroke-width="1.5"/>';
  }).join('') + '</g>' +
  piedras.map(function (pi) {
    return brillo(pi[0] - pi[2] * .34, pi[1] - pi[3] * .38, pi[2] * .3, pi[3] * .18, -30, .8);
  }).join('');
}

/* Dibujo de respaldo, para cuando la pieza todavia no tiene foto. */
function ilustracion(anillo, clase) {
  var n = ++serie;
  var cuerpo;

  if (anillo.familia === 'gotas') {
    cuerpo = aro(n) + cresta(n);

  } else if (anillo.familia === 'espirales') {
    cuerpo = espiral(n);

  } else if (anillo.familia === 'racimos') {
    cuerpo = '<g transform="translate(0 96) scale(.66)" opacity=".9">' + aro(n, true) + '</g>' +
      racimo(n);

  } else if (anillo.familia === 'flores') {
    cuerpo = '<g transform="translate(0 118) scale(.62)" opacity=".95">' + aro(n, true) + '</g>' +
      flor(n);

  } else if (anillo.familia === 'apilables') {
    /* dos aros delgados encimados, que es como se usan */
    cuerpo = '<g transform="translate(14 16) scale(.94)" opacity=".5">' + aro(n, true) + '</g>' +
      aro(n, true);

  } else {
    cuerpo = aro(n);
  }

  return '<svg class="' + (clase || '') + '" viewBox="0 0 300 300" role="img" ' +
    'aria-label="Anillo ' + escapar(anillo.nombre) + '">' +
    degradados(anillo, n) + cuerpo +
  '</svg>';
}

/* Lo que se ve de cada pieza: la foto si ya la tienes, y si no, el dibujo.
   Para usar tus fotos, agregale a la pieza en el CATALOGO:
       foto:'imagenes/aro-cielo.jpg'
   Cuadradas y de 900 px por lado se ven bien en todos lados. */
function dibujo(anillo, clase) {
  if (!anillo.foto) return ilustracion(anillo, clase);
  return '<img class="' + (clase || '') + '" src="' + escapar(anillo.foto) +
    '" alt="Anillo ' + escapar(anillo.nombre) + '" loading="lazy" width="900" height="900">';
}

/* ============ 4. AYUDANTES ============ */
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

function urlDe(a) { return 'producto.html?id=' + encodeURIComponent(a.id); }

function filtrar(familia, soloDestacados) {
  return CATALOGO.filter(function (a) {
    var okFamilia = !familia || familia === 'todo' || a.familia === familia;
    return okFamilia && (!soloDestacados || a.destacado === true);
  });
}

/* ============ 5. TARJETAS Y REJILLAS ============ */
function tarjeta(a) {
  var etiqueta = '';
  if (a.etiqueta === 'nuevo')  etiqueta = '<span class="pieza__marca">Nuevo</span>';
  if (a.etiqueta === 'ultima') etiqueta = '<span class="pieza__marca pieza__marca--ultima">Ultima pieza</span>';

  return '<article class="pieza">' +
    '<figure class="pieza__foto">' + etiqueta + dibujo(a) + '</figure>' +
    '<div class="pieza__cuerpo">' +
      '<span class="pieza__familia">' + NOMBRE_FAMILIA[a.familia] + '</span>' +
      '<h3 class="pieza__nombre"><a href="' + urlDe(a) + '">' + escapar(a.nombre) + '</a></h3>' +
      '<p class="pieza__precio">' + pesos(a.precio) + '</p>' +
      '<button class="enlace-boton" type="button" data-agregar="' + a.id + '">Agregar a la bolsa</button>' +
    '</div>' +
  '</article>';
}

function pintarRejilla(rejilla, familiaForzada) {
  var familia = familiaForzada || rejilla.getAttribute('data-familia') || 'todo';
  var limite = parseInt(rejilla.getAttribute('data-limite'), 10);
  var excluir = rejilla.getAttribute('data-excluir');

  var piezas = filtrar(familia, rejilla.hasAttribute('data-destacados'));
  if (excluir) piezas = piezas.filter(function (a) { return a.id !== excluir; });
  if (limite > 0) piezas = piezas.slice(0, limite);

  rejilla.innerHTML = piezas.length
    ? piezas.map(tarjeta).join('')
    : '<p class="rejilla__vacio">Por ahora no hay piezas en esta familia. ' +
      'Escribenos y te avisamos cuando salga la siguiente hornada.</p>';
  return piezas.length;
}

function actualizarCuenta(n) {
  var cuenta = $('#cuenta-piezas');
  if (cuenta) cuenta.textContent = n === 1 ? '1 pieza' : n + ' piezas';
}

/* ============ 6. FILTROS ============ */
function iniciarFiltros() {
  var botones = $$('.filtro');
  var rejilla = $('#rejilla-catalogo');
  if (!botones.length || !rejilla) return;

  function aplicar(familia) {
    botones.forEach(function (b) {
      b.setAttribute('aria-selected', String(b.getAttribute('data-familia') === familia));
    });
    actualizarCuenta(pintarRejilla(rejilla, familia));
    if (history.replaceState) {
      history.replaceState(null, '', familia === 'todo' ? location.pathname : '#' + familia);
    }
  }

  botones.forEach(function (b) {
    b.addEventListener('click', function () { aplicar(b.getAttribute('data-familia')); });
  });

  var inicial = location.hash.replace('#', '');
  var valida = botones.some(function (b) { return b.getAttribute('data-familia') === inicial; });
  aplicar(valida ? inicial : 'todo');

  window.addEventListener('hashchange', function () {
    var h = location.hash.replace('#', '');
    if (botones.some(function (b) { return b.getAttribute('data-familia') === h; })) aplicar(h);
  });
}

/* ============ 7. FICHA DE PRODUCTO ============ */
function iniciarFicha() {
  var ficha = $('#ficha');
  if (!ficha) return;

  var id = new URLSearchParams(location.search).get('id');
  var a = id ? porId(id) : null;

  if (!a) {
    ficha.innerHTML = '<div class="ficha__vacia"><h1>No encontramos esa pieza</h1>' +
      '<p>Puede que ya se haya vendido o que el enlace este incompleto.</p>' +
      '<a class="boton" href="tienda.html">Ver todos los anillos</a></div>';
    document.title = 'Pieza no encontrada · ' + MARCA.nombre;
    var otra = $('#rejilla-relacionados');
    if (otra) { otra.setAttribute('data-limite', '4'); pintarRejilla(otra); }
    return;
  }

  document.title = a.nombre + ' · ' + MARCA.nombre;
  var meta = $('meta[name="description"]');
  if (meta) meta.setAttribute('content', a.texto);

  var ajustable = a.medidas.length === 1 && a.medidas[0] === 'Ajustable';

  ficha.innerHTML =
    '<div class="ficha__vista">' + dibujo(a) + '</div>' +
    '<div class="ficha__datos">' +
      '<p class="migas"><a href="index.html">Inicio</a> / <a href="tienda.html">Anillos</a> / ' +
        escapar(a.nombre) + '</p>' +
      '<span class="ficha__familia">' + NOMBRE_FAMILIA[a.familia] + '</span>' +
      '<h1>' + escapar(a.nombre) + '</h1>' +
      '<p class="ficha__precio">' + pesos(a.precio) + '</p>' +
      '<p class="ficha__nota">Precio con IVA. Envio gratis desde ' + pesos(MARCA.envioGratis) + '.</p>' +
      '<p class="ficha__texto">' + escapar(a.texto) + '</p>' +

      '<div class="campo">' +
        '<span class="campo__titulo">' + (ajustable ? 'Medida' : 'Numero de anillo') + '</span>' +
        '<div class="medidas" id="medidas">' +
          a.medidas.map(function (m, i) {
            return '<button class="medida" type="button" aria-pressed="' + (i === 0) +
              '" data-medida="' + m + '">' + m + '</button>';
          }).join('') +
        '</div>' +
        (ajustable
          ? '<p class="campo__pista">Se abre y cierra un poco con los dedos para ajustar.</p>'
          : '<p class="campo__pista"><a href="index.html#medidas">¿Como se cual es mi numero?</a></p>') +
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
        '<button class="boton" type="button" id="agregar-ficha">Agregar a la bolsa</button>' +
        '<a class="boton boton--linea" id="pedir-directo" href="#" target="_blank" rel="noopener">Preguntar por WhatsApp</a>' +
      '</div>' +
      '<p class="ficha__aviso" id="aviso-ficha" role="status"></p>' +

      '<div class="desplegables">' +
        '<details open><summary>Como se hizo</summary><div class="desplegables__cuerpo">' +
          '<p>Vidrio de borosilicato trabajado al soplete, pieza por pieza. No hay molde: ' +
          'el aro se forma en caliente y el remate se sopla y se pega a mano.</p>' +
          '<p>Por eso no hay dos anillos iguales. Diferencias minimas de grosor, ' +
          'tono o burbujas internas son parte del trabajo, no un defecto.</p>' +
        '</div></details>' +
        '<details><summary>Cuidados</summary><div class="desplegables__cuerpo">' +
          '<p>Es cristal: aguanta el uso diario pero se rompe si cae sobre piso duro. ' +
          'Quitatelo para hacer ejercicio, cargar cosas pesadas o dormir.</p>' +
          '<p>Se limpia con agua tibia y jabon neutro. No uses limpiadores con cloro ' +
          'ni lo metas al ultrasonido de joyeria.</p>' +
        '</div></details>' +
        '<details><summary>Envios y cambios</summary><div class="desplegables__cuerpo">' +
          '<p>Sale del taller en 2 a 4 dias habiles, empacado en caja rigida. ' +
          'Envio gratis desde ' + pesos(MARCA.envioGratis) + '.</p>' +
          '<p>Si te queda mal la medida, lo cambiamos dentro de los 15 dias siguientes. ' +
          'Si llega roto, mandanos una foto y lo reponemos sin costo.</p>' +
        '</div></details>' +
      '</div>' +
    '</div>';

  var cantidad = 1;
  var medida = a.medidas[0];

  $('#medidas').addEventListener('click', function (e) {
    var b = e.target.closest('.medida');
    if (!b) return;
    medida = b.getAttribute('data-medida');
    $$('.medida', ficha).forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
    enlaceDirecto();
  });

  function pintaCantidad() { $('#cantidad').textContent = String(cantidad); enlaceDirecto(); }
  $('#mas').addEventListener('click', function () { if (cantidad < 10) { cantidad++; pintaCantidad(); } });
  $('#menos').addEventListener('click', function () { if (cantidad > 1) { cantidad--; pintaCantidad(); } });

  function enlaceDirecto() {
    var texto = 'Hola ' + MARCA.nombre + ', me interesa el anillo "' + a.nombre + '" en medida ' +
      medida + ' (' + cantidad + ' pieza' + (cantidad > 1 ? 's' : '') + '). ' + location.href;
    $('#pedir-directo').href = 'https://wa.me/' + MARCA.whatsapp + '?text=' + encodeURIComponent(texto);
  }
  enlaceDirecto();

  $('#agregar-ficha').addEventListener('click', function () {
    agregar(a.id, medida, cantidad);
    $('#aviso-ficha').textContent = 'Listo, ya esta en tu bolsa.';
    abrirBolsa();
  });

  var relacionados = $('#rejilla-relacionados');
  if (relacionados) {
    relacionados.setAttribute('data-familia', a.familia);
    relacionados.setAttribute('data-excluir', a.id);
    relacionados.setAttribute('data-limite', '4');
    if (!pintarRejilla(relacionados)) {
      relacionados.removeAttribute('data-familia');
      pintarRejilla(relacionados);
    }
  }
}

/* ============ 8. BUSCADOR ============ */
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

    var hallazgos = CATALOGO.filter(function (a) {
      var heno = sinAcentos([a.nombre, NOMBRE_FAMILIA[a.familia], a.texto].join(' '));
      return q.split(/\s+/).every(function (parte) { return heno.indexOf(parte) !== -1; });
    }).slice(0, 6);

    salida.innerHTML = hallazgos.length
      ? '<ul class="resultados__lista">' + hallazgos.map(function (a) {
          return '<li><a href="' + urlDe(a) + '">' + dibujo(a) +
            '<span><b>' + escapar(a.nombre) + '</b>' +
            '<span>' + NOMBRE_FAMILIA[a.familia] + ' · ' + pesos(a.precio) + '</span></span></a></li>';
        }).join('') + '</ul>'
      : '<p class="resultados__vacio">Nada con &laquo;' + escapar(campo.value.trim()) +
        '&raquo;. Prueba con aros, espirales, gotas, racimos, flores o apilables.</p>';
  }

  campo.addEventListener('input', buscar);
  campo.addEventListener('search', buscar);
  $('form', caja).addEventListener('submit', function (e) { e.preventDefault(); buscar(); });
}

/* ============ 9. BOLSA ============ */
var LLAVE = 'soplo:bolsa';
var bolsa = [];

function leerBolsa() {
  try {
    var crudo = localStorage.getItem(LLAVE);
    var datos = crudo ? JSON.parse(crudo) : [];
    bolsa = Array.isArray(datos) ? datos.filter(function (r) { return porId(r.id); }) : [];
  } catch (e) { bolsa = []; }
}

function guardarBolsa() {
  try { localStorage.setItem(LLAVE, JSON.stringify(bolsa)); } catch (e) { /* modo privado */ }
}

function agregar(id, medida, cantidad) {
  var a = porId(id);
  if (!a) return;
  medida = medida || a.medidas[0];
  cantidad = cantidad || 1;

  for (var i = 0; i < bolsa.length; i++) {
    if (bolsa[i].id === id && bolsa[i].medida === medida) {
      bolsa[i].cantidad = Math.min(10, bolsa[i].cantidad + cantidad);
      guardarBolsa(); pintarBolsa(); return;
    }
  }
  bolsa.push({ id: id, medida: medida, cantidad: cantidad });
  guardarBolsa();
  pintarBolsa();
}

function cambiarCantidad(i, delta) {
  var r = bolsa[i];
  if (!r) return;
  r.cantidad += delta;
  if (r.cantidad < 1) bolsa.splice(i, 1);
  else r.cantidad = Math.min(10, r.cantidad);
  guardarBolsa();
  pintarBolsa();
}

function totalBolsa() {
  return bolsa.reduce(function (s, r) {
    var a = porId(r.id);
    return s + (a ? a.precio * r.cantidad : 0);
  }, 0);
}

function piezasBolsa() {
  return bolsa.reduce(function (s, r) { return s + r.cantidad; }, 0);
}

function mensajeWhatsApp() {
  if (!bolsa.length) return 'https://wa.me/' + MARCA.whatsapp;
  var lineas = bolsa.map(function (r) {
    var a = porId(r.id);
    return '• ' + a.nombre + ' — medida ' + r.medida + ' × ' + r.cantidad +
      ' — ' + pesos(a.precio * r.cantidad);
  });
  var total = totalBolsa();
  var envio = total >= MARCA.envioGratis
    ? '\nEnvio: gratis'
    : '\nEnvio: por confirmar segun codigo postal';
  var texto = 'Hola ' + MARCA.nombre + ', quiero este pedido:\n\n' + lineas.join('\n') +
    '\n\nTotal: ' + pesos(total) + envio + '\n\n¿Me confirman disponibilidad?';
  return 'https://wa.me/' + MARCA.whatsapp + '?text=' + encodeURIComponent(texto);
}

function pintarBolsa() {
  var n = piezasBolsa();
  var contador = $('#contador-bolsa');
  if (contador) {
    contador.textContent = String(n);
    contador.classList.toggle('visible', n > 0);
  }

  var lista = $('#bolsa-lista');
  if (!lista) return;

  lista.innerHTML = bolsa.length
    ? bolsa.map(function (r, i) {
        var a = porId(r.id);
        return '<div class="renglon">' +
          '<figure class="renglon__foto">' + dibujo(a) + '</figure>' +
          '<div>' +
            '<b>' + escapar(a.nombre) + '</b>' +
            '<small>Medida ' + escapar(r.medida) + '</small>' +
            '<div class="renglon__control">' +
              '<button type="button" data-menos="' + i + '" aria-label="Quitar una">&minus;</button>' +
              '<span>' + r.cantidad + '</span>' +
              '<button type="button" data-mas="' + i + '" aria-label="Agregar una">+</button>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<p class="renglon__precio">' + pesos(a.precio * r.cantidad) + '</p>' +
            '<button class="renglon__quitar" type="button" data-quitar="' + i + '">Quitar</button>' +
          '</div>' +
        '</div>';
      }).join('')
    : '<p class="bolsa__vacia">Tu bolsa esta vacia.</p>';

  var total = totalBolsa();
  var elTotal = $('#bolsa-total');
  if (elTotal) elTotal.textContent = pesos(total);

  var envio = $('#bolsa-envio');
  if (envio) {
    if (!bolsa.length) envio.textContent = '';
    else if (total >= MARCA.envioGratis) envio.textContent = 'Tu pedido ya lleva envio gratis.';
    else envio.textContent = 'Te faltan ' + pesos(MARCA.envioGratis - total) + ' para el envio gratis.';
  }

  var boton = $('#bolsa-whatsapp');
  if (boton) {
    boton.href = mensajeWhatsApp();
    boton.setAttribute('aria-disabled', String(!bolsa.length));
  }
}

function abrirBolsa() {
  var panel = $('#bolsa'), fondo = $('#bolsa-fondo');
  if (!panel) return;
  panel.classList.add('abierta');
  panel.setAttribute('aria-hidden', 'false');
  if (fondo) fondo.classList.add('visible');
  var cerrar = $('#bolsa-cerrar');
  if (cerrar) cerrar.focus();
}

function cerrarBolsa() {
  var panel = $('#bolsa'), fondo = $('#bolsa-fondo');
  if (!panel) return;
  panel.classList.remove('abierta');
  panel.setAttribute('aria-hidden', 'true');
  if (fondo) fondo.classList.remove('visible');
}

function iniciarBolsa() {
  leerBolsa();
  pintarBolsa();

  var btn = $('#btn-bolsa');
  if (btn) btn.addEventListener('click', abrirBolsa);

  var cerrar = $('#bolsa-cerrar');
  if (cerrar) cerrar.addEventListener('click', cerrarBolsa);

  var fondo = $('#bolsa-fondo');
  if (fondo) fondo.addEventListener('click', cerrarBolsa);

  var vaciar = $('#bolsa-vaciar');
  if (vaciar) vaciar.addEventListener('click', function () {
    bolsa = []; guardarBolsa(); pintarBolsa();
  });

  var lista = $('#bolsa-lista');
  if (lista) lista.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-mas'))   cambiarCantidad(+b.getAttribute('data-mas'), 1);
    if (b.hasAttribute('data-menos')) cambiarCantidad(+b.getAttribute('data-menos'), -1);
    if (b.hasAttribute('data-quitar')) {
      bolsa.splice(+b.getAttribute('data-quitar'), 1);
      guardarBolsa(); pintarBolsa();
    }
  });

  var whats = $('#bolsa-whatsapp');
  if (whats) whats.addEventListener('click', function (e) { if (!bolsa.length) e.preventDefault(); });

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-agregar]');
    if (!b) return;
    e.preventDefault();
    agregar(b.getAttribute('data-agregar'));
    abrirBolsa();
  });

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrarBolsa(); });
}

/* ============ 10. ENCABEZADO, MENU Y AVISOS ============ */
function iniciarEncabezado() {
  var cabecera = $('#cabecera');
  if (cabecera) {
    var alSubir = function () { cabecera.classList.toggle('flotando', window.scrollY > 8); };
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
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('abierto')) return;
      if (nav.contains(e.target) || btnMenu.contains(e.target)) return;
      nav.classList.remove('abierto');
      btnMenu.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }
}

/* Rellena los huecos decorativos de la portada:
   <div data-pieza="esf-azul"></div> dibuja ese anillo. */
function pintarHuecos() {
  $$('[data-pieza]').forEach(function (el) {
    var a = porId(el.getAttribute('data-pieza'));
    if (a) el.insertAdjacentHTML('afterbegin', dibujo(a));
  });
}

/* Los formularios no tienen servidor: confirmamos en pantalla. */
function iniciarFormularios() {
  $$('form[data-boletin]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var campo = $('input', form);
      if (campo && !campo.checkValidity()) { campo.reportValidity(); return; }
      form.innerHTML = '<p class="boletin__gracias">Gracias, ya estas en la lista. ' +
        'Te avisamos cuando salga la siguiente hornada.</p>';
    });
  });
}

/* ============ 11. ARRANQUE ============ */
function iniciar() {
  pintarHuecos();

  $$('.rejilla').forEach(function (r) {
    if (r.id === 'rejilla-catalogo' || r.id === 'rejilla-relacionados') return;
    pintarRejilla(r);
  });

  var catalogo = $('#rejilla-catalogo');
  if (catalogo && !$('.filtro')) actualizarCuenta(pintarRejilla(catalogo));

  iniciarFiltros();
  iniciarFicha();
  iniciarBuscador();
  iniciarBolsa();
  iniciarEncabezado();
  iniciarFormularios();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciar);
} else {
  iniciar();
}

})();
