const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzPcc3WNrI4tba9NASDHFho8-Czl0FeB3vscIJCvxgSU0bZlIS1g4YqG4Nu5M-D_tNKpw/exec';

document.getElementById('formularioAcepto').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const relacion = document.getElementById('relacion').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !numero || !relacion || !mensaje) {
        mostrarMensajeError('Por favor, completa todos los campos requeridos.');
        return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('numero', numero);
    formData.append('relacion', relacion);
    formData.append('mensaje', mensaje);
    formData.append('fecha', new Date().toLocaleString());

    const boton = document.querySelector('.boton-enviar');
    const textoOriginal = boton.innerHTML;

    try {
        boton.innerHTML = '<span>Enviando...</span>';
        boton.disabled = true;

        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            mostrarPantallaExito(nombre);
            this.reset();
            document.getElementById('mensajeError').style.display = 'none';
        } else {
            throw new Error('Error en la respuesta del servidor');
        }

    } catch (error) {
        console.error('Error:', error);
        mostrarMensajeError('Error al enviar los datos. Por favor, intenta nuevamente.');
    } finally {
        boton.innerHTML = textoOriginal;
        boton.disabled = false;
    }
});

function mostrarPantallaExito(nombre) {
    const pantalla = document.createElement('div');
    pantalla.id = 'pantallaExitoCompleta';
    pantalla.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: #4CAF50; color: white; display: flex; flex-direction: column;
        align-items: center; justify-content: center; z-index: 9999;
        text-align: center; font-family: sans-serif;
    `;

    pantalla.innerHTML = `
        <h1 style="font-size: 2.5rem;">🎉 ¡${nombre}!</h1>
        <p style="font-size: 1.2rem;">Ya estás en la lista de invitados. Nos vemos en la fiesta 🎊</p>
        <button id="cerrarPantallaExito" style="margin-top: 20px; padding: 10px 20px; border-radius: 20px; border: none; background: white; color: #4CAF50; cursor: pointer;">Cerrar</button>
    `;

    document.body.appendChild(pantalla);

    document.getElementById('cerrarPantallaExito').addEventListener('click', () => {
        pantalla.remove();
    });

    // Auto-cerrar después de 5 segundos
    setTimeout(() => pantalla.remove(), 5000);
}

function mostrarMensajeError(mensaje) {
    const mensajeError = document.getElementById('mensajeError');
    mensajeError.textContent = mensaje;
    mensajeError.style.display = 'block';
}

// Validación en tiempo real para el número
document.getElementById('numero').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});

// Validaciones mínimas al salir del campo
document.getElementById('nombre').addEventListener('blur', function() {
    this.style.borderColor = this.value.length < 2 ? '#ff4444' : '';
});
document.getElementById('numero').addEventListener('blur', function() {
    this.style.borderColor = this.value.length < 8 ? '#ff4444' : '';
});
document.getElementById('mensaje').addEventListener('blur', function() {
    this.style.borderColor = this.value.length < 10 ? '#ff4444' : '';
});
