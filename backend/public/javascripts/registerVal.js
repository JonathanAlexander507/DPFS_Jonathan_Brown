document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar los elementos del formulario
  let inputName = document.querySelector('#name');
  let errorName = document.querySelector('#nameError');
  let inputLastName = document.querySelector('#last_name');
  let errorLastName = document.querySelector('#lastNameError');
  let inputEmail = document.querySelector('#email');
  let errorEmail = document.querySelector('#emailError');
  let inputPassword = document.querySelector('#password');
  let errorPassword = document.querySelector('#passwordError');
  let inputConfirmPassword = document.querySelector('#confirm_password');
  let errorConfirmPassword = document.querySelector('#confirmPasswordError');
  let termsCheckbox = document.querySelector('#terms');
  let errorTerms = document.querySelector('#termsError');
  let selectProvince = document.querySelector('#province');
  let errorProvince = document.querySelector('#provinceError');
  let inputImage = document.querySelector('#profile_image');  // Campo de imagen
  let errorImage = document.querySelector('#imageError');  // Error de imagen
  let formulario = document.querySelector('#registro_form'); // Asegúrate de que este ID sea correcto
  let userType = document.querySelector('#user_type');
let errorUserType = document.querySelector('#userTypeError');

  // Función para cargar usuarios desde el archivo JSON
  async function cargarUsuarios() {
      try {
          let response = await fetch('/database/user.json'); // Asegúrate de que esta ruta sea correcta
          let users = await response.json();
          return users;
      } catch (error) {
          console.error('Error al cargar usuarios:', error);
          return [];
      }
  }

  // Función para validar el nombre
  function validacionName() {
      if (inputName.value.length < 3) {
          errorName.innerHTML = "El nombre debe tener al menos 3 caracteres.";
          return false;
      } else {
          errorName.innerHTML = "";
          return true;
      }
  }

  // Función para validar el apellido
  function validacionLastName() {
      if (inputLastName.value.length < 3) {
          errorLastName.innerHTML = "El apellido debe tener al menos 3 caracteres.";
          return false;
      } else {
          errorLastName.innerHTML = "";
          return true;
      }
  }

  // Función para validar el email
  async function validacionEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputEmail.value)) {
          errorEmail.innerHTML = "El correo electrónico no es válido.";
          return false;
      }

      let usuarios = await cargarUsuarios(); // Cargar usuarios del archivo JSON
      let emailExistente = usuarios.find(user => user.email === inputEmail.value);

      if (emailExistente) {
          errorEmail.innerHTML = "Este correo ya está registrado. Por favor, usa uno diferente.";
          return false;
      } else {
          errorEmail.innerHTML = "";
          return true;
      }
  }

  // Función para validar la contraseña
  function validacionPassword() {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
      if (inputPassword.value.length < 8 || !passwordRegex.test(inputPassword.value)) {
          errorPassword.innerHTML = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.";
          return false;
      } else {
          errorPassword.innerHTML = "";
          return true;
      }
  }

  // Función para validar la confirmación de la contraseña
  function validacionConfirmPassword() {
      if (inputConfirmPassword.value !== inputPassword.value) {
          errorConfirmPassword.innerHTML = "Las contraseñas no coinciden.";
          return false;
      } else {
          errorConfirmPassword.innerHTML = "";
          return true;
      }
  }

  // Función para validar el checkbox de términos y condiciones
  function validacionTerms() {
      if (!termsCheckbox.checked) {
          errorTerms.innerHTML = "Debes aceptar los términos y condiciones.";
          return false;
      } else {
          errorTerms.innerHTML = "";
          return true;
      }
  }

  // Función para validar el selector de provincias
  function validacionProvince() {
      if (selectProvince.value === "") {
          errorProvince.innerHTML = "Debes seleccionar una provincia.";
          return false;
      } else {
          errorProvince.innerHTML = "";
          return true;
      }
  }

  // Función para validar el archivo de imagen
  function validacionImage() {
      const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/raw'];
      if (inputImage.files.length === 0) {
          errorImage.innerHTML = "Por favor, selecciona una imagen.";
          return false;
      } else if (!validExtensions.includes(inputImage.files[0].type)) {
          errorImage.innerHTML = "Formato de imagen no válido. Usa png, jpg, jpeg o raw.";
          return false;
      } else {
          errorImage.innerHTML = "";
          return true;
      }
  }

  // Validación del tipo de usuario
function validacionUserType() {
  if (userType.value === "") {
      errorUserType.innerHTML = "Debe seleccionar un tipo de usuario.";
      return false;
  } else {
      errorUserType.innerHTML = "";
      return true;
  }
}

  // Evento para validar al enviar el formulario
  formulario.addEventListener("submit", async function (e) {
      e.preventDefault(); // Evitar el envío del formulario por defecto

      // Validar cada campo
      let nameValid = validacionName();
      let lastNameValid = validacionLastName();
      let emailValid = await validacionEmail();
      let passwordValid = validacionPassword();
      let confirmPasswordValid = validacionConfirmPassword();
      let termsValid = validacionTerms();
      let provinceValid = validacionProvince();
      let userTypeValid = validacionUserType();
      let imageValid = validacionImage();  // Validar imagen

      // Verificar si todos los campos son válidos antes de enviar
      if (nameValid && lastNameValid && emailValid && passwordValid &&
          confirmPasswordValid && termsValid && provinceValid && userTypeValid && imageValid ) {
          formulario.submit(); // Enviar el formulario si todo es válido
      } else {
          console.log('Hay errores en el formulario');
      }
  });

  // Eventos para convertir la primera letra a mayúscula en nombre y apellido
  inputName.addEventListener('input', function() {
      this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
  });

  inputLastName.addEventListener('input', function() {
      this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
  });
});
