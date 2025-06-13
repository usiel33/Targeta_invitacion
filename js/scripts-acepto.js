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

 const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbywaIMksKt_P8EswnNJf_J-0vwuVjHuT15fArrFPIiwlZJll4RVqZH--vYGZtQp2X2fgw/exec';

        document.getElementById('formularioAcepto').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData();
            formData.append('nombre', document.getElementById('nombre').value);
            formData.append('relacion', document.getElementById('relacion').value);
            formData.append('mensaje', document.getElementById('mensaje').value);
            formData.append('fecha', new Date().toLocaleString());

            try {
                // Mostrar que se está enviando
                const boton = document.querySelector('.boton-enviar');
                const textoOriginal = boton.innerHTML;
                boton.innerHTML = '<span>Enviando...</span>';
                boton.disabled = true;

                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    document.getElementById('mensajeExito').style.display = 'block';
                    document.getElementById('mensajeError').style.display = 'none';
                    document.getElementById('formularioAcepto').reset();
                } else {
                    throw new Error('Error en la respuesta del servidor');
                }

                // Restaurar botón
                boton.innerHTML = textoOriginal;
                boton.disabled = false;

            } catch (error) {
                console.error('Error:', error);
                document.getElementById('mensajeError').style.display = 'block';
                document.getElementById('mensajeExito').style.display = 'none';
                
                // Restaurar botón
                const boton = document.querySelector('.boton-enviar');
                boton.innerHTML = '<span>ACEPTAR INVITACION</span>';
                boton.disabled = false;
            }
        });

        // Funcionalidad del botón de audio (placeholder)
        document.querySelector('.boton-audio').addEventListener('click', function() {
            alert('Funcionalidad de audio por implementar');
        });





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