document.addEventListener("DOMContentLoaded", function() {
// Añadir evento de click al botón de eliminar cuenta
document.getElementById('deleteAccountButton').addEventListener('click', function() {
    const confirmed = confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.");
    if (confirmed) {
        fetch('/user/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parsear la respuesta como JSON
            } else {
                throw new Error('Error en la eliminación de cuenta'); // Lanzar un error si la respuesta no es exitosa
            }
        })
        .then(data => {
            alert(data.message); // Mostrar mensaje de éxito
            window.location.href = "/"; // Redirige a la página de inicio
        })
        .catch(error => {
            console.error('Error al eliminar la cuenta:', error);
            alert("Hubo un problema al eliminar tu cuenta. Inténtalo de nuevo.");
        });
    }
});

document.getElementById('logoutButton').addEventListener('click', function() {
    fetch('/user/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        window.location.href = '/user/login'; // Redirige a la página de inicio de sesión
    });
});
})