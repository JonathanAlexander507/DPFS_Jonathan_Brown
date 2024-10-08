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

searchInput.addEventListener('input', async function () {
  const query = searchInput.value;

  if (query.length > 2) {
      const response = await fetch(`/products/search-suggestions?query=${query}`);
      const suggestions = await response.json();

      suggestionsBox.innerHTML = ''; // Limpia las sugerencias anteriores

      suggestions.forEach(product => {
          const suggestionItem = document.createElement('div');
          suggestionItem.classList.add('suggestion-item');
          suggestionItem.innerText = product.name;
          suggestionItem.onclick = () => {
              searchInput.value = product.name; // Completa el input con la sugerencia
              suggestionsBox.innerHTML = ''; // Limpia las sugerencias
          };

          suggestionsBox.appendChild(suggestionItem);
      });
  } else {
      suggestionsBox.innerHTML = ''; // Limpia si no hay suficientes caracteres
  }
});

