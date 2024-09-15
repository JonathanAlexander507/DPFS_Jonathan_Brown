/*=======login validacion=======*/
let form = document.querySelector('#formulario_login');
let Email = document.querySelector('#email_login');
let Password = document.querySelector('#password_login');
let botonForm = document.querySelector("#boton_enviar_login");
let showIcon = document.querySelector('#show_icon')

form.addEventListener("submit", function (e) {
  e.preventDefault();
    if (Email.value.length == 0 || Password.value.length == 0) {
            validacionEmail();
            validacionPassword();
    } else {
        alert('Formulario enviado con exito')
        Email.value = ''
        Password.value = ''
        window.location.href = "/";
    }
});

Email.addEventListener("focus", function () {
    validacionEmail();
});

Email.addEventListener("input", function () {
  validacionEmail();
});

Password.addEventListener("focus", function () {
    validacionPassword();
});

Password.addEventListener("input", function () {
  validacionPassword();
});
  
function validacionEmail() {
  let LoginError = document.querySelector("#errorEmail");
  let emailIcon = document.querySelector("#email_icon");
  if (Email.value.length == 0){
    LoginError.innerHTML = `<li><i class='bx bx-error-circle bx-tada' ></i> Debe ingresar su correo electronico</li>`
    emailIcon.style.color = 'red';
  } else {
    LoginError.innerHTML = "";
    Email.style.marginBottom = '';
    emailIcon.style.color = '';
  }
  
}

function validacionPassword() {
    let LoginError = document.querySelector("#errorPassword");
    let botonInciar = document.querySelector('#boton_enviar')
    let passIcon = document.querySelector("#pass_icon");
    if (Password.value.length == 0){
      LoginError.innerHTML = `<li><i class='bx bx-error-circle bx-tada' ></i>  Debe ingresar su contraseña</li>`
      passIcon.style.color = 'red';
    } else {
      LoginError.innerHTML = "";
      passIcon.style.color = '';
      
    }
  }
 // codigo para mostrar contraseña
 showIcon.addEventListener ("click", e => {
  if (Password.type === "password") {
    Password.type = "text"
    showIcon.classList.remove('bx-show')
    showIcon.classList.add('bx-hide')
  } else {
    Password.type = "password"
    showIcon.classList.remove('bx-hide')
    showIcon.classList.add('bx-show')
  }
 })
