  // Manejo del botón de buscar para redirigir directamente al producto por su ID
  document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar recargar la página
    const query = document.getElementById('search_edit').value.trim();
    
    // Redirigir a la página de edición del producto usando el ID
    if (query && !isNaN(query)) {  // Asegurarnos de que el ID sea un número válido
        window.location.href = `/products/productEdit/${query}`; // Asegúrate de que esto sea correcto
    } else {
        alert("Por favor ingresa un ID válido.");
    }
});