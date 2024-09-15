//=========menu==============
//animacion del boton de menu
const nav = document.querySelector('#nav-bar')
const abrir = document.querySelector('#abrir')
const cerrar = document.querySelector('#cerrar')
const buscador = document.querySelector('#buscador')

abrir.addEventListener ('click',() => {
  nav.classList.toggle('visible')
})
cerrar.addEventListener ('click',() => {
  nav.classList.remove('visible')
})