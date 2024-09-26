document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Obtiene el primer archivo seleccionado
    const errorMsg = document.getElementById('errorMsg');
    
    if (file) {
      // Validamos el tipo de archivo
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/raw'];
      
      if (!validTypes.includes(file.type)) {
        errorMsg.textContent = 'Por favor selecciona una imagen en formato PNG, JPG o RAW.';
        errorMsg.style.display = 'block';
        return; // Si no es válido, no hacemos nada más
      }
      
      errorMsg.style.display = 'none'; // Ocultamos el mensaje de error si es válido
  
      const reader = new FileReader();
  
      // Cuando la imagen esté cargada, la mostramos en el elemento <img>
      reader.onload = function(e) {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = e.target.result; // Muestra la imagen
        imagePreview.style.display = 'block'; // Asegura que la imagen sea visible
      };
  
      reader.readAsDataURL(file); // Carga el archivo seleccionado como una URL de datos
    }
  });
  