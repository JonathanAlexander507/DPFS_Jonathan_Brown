document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector('#formulario_login');
    let emailInput = document.querySelector('#email_login');
    let passwordInput = document.querySelector('#password_login');
    let emailError = document.querySelector('#errorEmail');
    let passwordError = document.querySelector('#errorPassword');
    let emailIcon = document.querySelector('#email_icon');
    let passIcon = document.querySelector('#pass_icon');
    let showIcon = document.querySelector('#show_icon');
  
    // Función para validar campos vacíos
    function validarCamposVacios() {
      let isValid = true;
  
      if (emailInput.value.length === 0) {
        emailError.innerHTML = `<li><i class='bx bx-error-circle bx-tada'></i> Debe ingresar su correo electrónico</li>`;
        emailIcon.style.color = 'red';
        isValid = false;
      } else {
        emailError.innerHTML = '';
        emailIcon.style.color = '';
      }
  
      if (passwordInput.value.length === 0) {
        passwordError.innerHTML = `<li><i class='bx bx-error-circle bx-tada'></i> Debe ingresar su contraseña</li>`;
        passIcon.style.color = 'red';
        isValid = false;
      } else {
        passwordError.innerHTML = '';
        passIcon.style.color = '';
      }
  
      return isValid;
    }
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Validar campos vacíos
      if (!validarCamposVacios()) {
        return;
      }
  
      // Enviar el formulario al servidor para validar el correo y la contraseña
      form.submit();
    });
  
    // Mostrar u ocultar la contraseña
    showIcon.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showIcon.classList.remove('bx-show');
        showIcon.classList.add('bx-hide');
      } else {
        passwordInput.type = "password";
        showIcon.classList.remove('bx-hide');
        showIcon.classList.add('bx-show');
      }
    });
  });
  