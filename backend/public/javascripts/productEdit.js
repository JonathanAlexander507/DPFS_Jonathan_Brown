document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form"); // Selecciona el formulario

    form.addEventListener("submit", (event) => {
        // Obtener los campos
        const name = document.querySelector("#name").value;
        const description = document.querySelector("#description").value;

        let errors = [];

        // Validar que el nombre tenga al menos 5 caracteres
        if (name.length < 5) {
            errors.push("El nombre del producto debe tener al menos 5 caracteres.");
        }

        // Validar que la descripción tenga al menos 20 caracteres
        if (description.length < 20) {
            errors.push("La descripción del producto debe tener al menos 20 caracteres.");
        }

        // Si hay errores, prevenir el envío del formulario y mostrar los errores
        if (errors.length > 0) {
            event.preventDefault(); // Prevenir el envío del formulario
            alert(errors.join("\n")); // Mostrar los errores en una alerta (puedes personalizar la UI)
        }
    });
});
