let img1 = document.querySelector('#img_detalles_producto_1')
let img2 = document.querySelector('#img_detalles_producto_2')
let img3 = document.querySelector('#img_detalles_producto_3')
let img4 = document.querySelector('#img_detalles_producto_4')
let img5 = document.querySelector('#img_detalles_producto_5')

let flechaIzq = document.querySelector('#flecha_izq')
let flechaDer = document.querySelector('#flecha_der')

let currentIndex = 0; // Índice actual de la miniatura seleccionada
const thumbnails = document.querySelectorAll('.thumbnails img'); // Todas las miniaturas
function cambiarImagen(thumbnail) {
  const mainImage = document.getElementById('mainImage'); // Imagen principal
  // Cambiar la imagen principal
  mainImage.src = thumbnail.src;
  // Eliminar la clase "active" de todas las miniaturas
  thumbnails.forEach(img => img.classList.remove('active'));
  // Añadir la clase "active" solo a la miniatura seleccionada
  thumbnail.classList.add('active');
  // Actualizar el índice actual
  currentIndex = Array.from(thumbnails).indexOf(thumbnail);
}
function moverIzquierda() {
  // Retroceder al índice anterior
  currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length; 
  // Cambiar a la imagen correspondiente
  cambiarImagen(thumbnails[currentIndex]);
}
function moverDerecha() {
  // Avanzar al siguiente índice
  currentIndex = (currentIndex + 1) % thumbnails.length;

  // Cambiar a la imagen correspondiente
  cambiarImagen(thumbnails[currentIndex]);
}
function entrarPantallaCompleta() {
  const modal = document.getElementById('modalFullscreen');
  const fullscreenImage = document.getElementById('fullscreenImage'); 
  // Mostrar el modal y actualizar la imagen en pantalla completa
  modal.style.display = 'flex';
  fullscreenImage.src = thumbnails[currentIndex].src;
}

function salirPantallaCompleta() {
  const modal = document.getElementById('modalFullscreen');
  
  // Ocultar el modal de pantalla completa
  modal.style.display = 'none';
}

function moverIzquierdaFull() {
  // Retroceder la imagen en pantalla completa
  moverIzquierda();
  document.getElementById('fullscreenImage').src = thumbnails[currentIndex].src;
}

function moverDerechaFull() {
  // Avanzar la imagen en pantalla completa
  moverDerecha();
  document.getElementById('fullscreenImage').src = thumbnails[currentIndex].src;
}
