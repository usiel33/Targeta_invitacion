const nombre = document.getElementById('nombre').value;
const relacion = document.getElementById('relacion').value;
const mensaje = document.getElementById('mensaje').value;
// Funcionalidad del formulario
document.getElementById('formularioAcepto').addEventListener('submit', function (e) {
    e.preventDefault();

    if (nombre && relacion && mensaje) {
        // Animación de éxito
        const boton = document.querySelector('.boton-enviar');
        boton.textContent = '¡Enviado! 🎉';
        boton.style.background = 'linear-gradient(135deg, #2196F3, #1976D2)';

        setTimeout(() => {
            alert(`¡Gracias ${nombre}! Tu aceptación ha sido enviada. Nos vemos en la fiesta! 🎊`);

            // Resetear formulario después de 2 segundos
            setTimeout(() => {
                this.reset();
                boton.textContent = 'Aceptar Invitación';
                boton.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            }, 2000);
        }, 500);
    }
});


//funcion para enviar mensaje por whatsapth
function enviarWhatsApp() {
    const nombre = document.getElementById('nombre').value.trim();
    const relacion = document.getElementById('relacion').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !relacion || !mensaje) {
        alert("Por favor, completa todos los campos del formulario.");
        return;
    }

    const datos = {
        Nombre: nombre,
        Relacion: relacion,
        Mensaje: mensaje
    };

    const urlScript = 'https://script.google.com/macros/s/AKfycbyR-yuilgssFnBDZv4V-ymJYYFWKTYSrX69zrytfH1ub-6LvcpwiOewN2yeS6iWBMwuKQ/exec'; // Usa aquí tu URL real

    fetch(urlScript, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                alert("🎉 Tu asistencia ha sido registrada con éxito. ¡Gracias por confirmar!");
                document.getElementById('formularioAcepto').reset();
            } else {
                alert("⚠️ Ocurrió un problema al registrar tu asistencia. Intenta nuevamente.");
            }
        })
        .catch(error => {
            console.error("Error al enviar:", error);
            alert("❌ Error al conectar con el servidor. Verifica tu conexión o intenta más tarde.");
        });
}






// Funcionalidad del botón de audio (simulada)
document.querySelector('.boton-audio').addEventListener('click', function () {
    const input = document.getElementById('relacion');

    // Simular grabación de audio
    this.textContent = '🔴';
    this.style.background = 'rgba(255, 0, 0, 0.3)';

    setTimeout(() => {
        this.textContent = '🎤';
        this.style.background = 'rgba(255, 255, 255, 0.2)';

        // Simular transcripción
        const relaciones = ['Primo hermano', 'Mejor amigo', 'Compañero de trabajo', 'Vecino', 'Amigo de la infancia'];
        const relacionAleatoria = relaciones[Math.floor(Math.random() * relaciones.length)];
        input.value = relacionAleatoria;

        // Efecto de escritura
        input.style.animation = 'focusGlow 0.5s ease-in-out';
    }, 2000);
});

// Funcionalidad del video (simulada)
document.querySelector('.video-container').addEventListener('click', function () {
    this.style.background = 'rgba(255, 255, 255, 0.2)';

    // Simular reproducción de video
    let contador = 3;
    const intervalo = setInterval(() => {
        this.querySelector('.video-text').textContent = `Reproduciendo... ${contador}s`;
        contador--;

        if (contador < 0) {
            clearInterval(intervalo);
            this.querySelector('.video-text').textContent = 'Vídeo completado ✓';
            this.style.background = 'rgba(76, 175, 80, 0.3)';

            setTimeout(() => {
                this.querySelector('.video-text').textContent = 'Vídeo feliz';
                this.style.background = 'rgba(255, 255, 255, 0.1)';
            }, 3000);
        }
    }, 1000);
});

// Efectos de entrada suaves para los campos
const campos = document.querySelectorAll('.campo-formulario');
campos.forEach((campo, index) => {
    campo.style.opacity = '0';
    campo.style.transform = 'translateY(20px)';

    setTimeout(() => {
        campo.style.transition = 'all 0.5s ease';
        campo.style.opacity = '1';
        campo.style.transform = 'translateY(0)';
    }, 200 * (index + 1));
});