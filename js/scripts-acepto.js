const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz5-WLlt3_XY5k2NgJyyHepMjk2r0oAzrCeGSIaqNkTjm1Oe9Ua1gRlGNVxQDUBfcwZOg/exec';

// Función para mostrar notificaciones con estilo mejorado
function showNotification(message, type = 'info') {
    // Remover notificación existente si hay una
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '🎉' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        padding: 15px 20px;
        border-radius: 15px;
        color: white;
        font-weight: bold;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 400px;
        word-wrap: break-word;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        backdrop-filter: blur(10px);
    `;
    
    // Color según el tipo
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #2196F3, #1976D2)';
    }
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 5000);
}

// Función para deshabilitar/habilitar el botón con estilo
function toggleButton(disabled) {
    const boton = document.querySelector('.boton-enviar');
    
    if (disabled) {
        boton.disabled = true;
        boton.style.opacity = '0.6';
        boton.style.cursor = 'not-allowed';
        boton.innerHTML = '<span>🎊 Enviando...</span>';
    } else {
        boton.disabled = false;
        boton.style.opacity = '1';
        boton.style.cursor = 'pointer';
        // Restaurar el contenido original del botón
        boton.innerHTML = '<span>CONFIRMAR ASISTENCIA</span>'; // Ajusta según tu HTML original
    }
}

document.getElementById('formularioAcepto').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const relacion = document.getElementById('relacion').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !numero || !relacion || !mensaje) {
        showNotification('Por favor, completa todos los campos requeridos.', 'error');
        return;
    }

    // Validaciones adicionales
    if (nombre.length < 2) {
        showNotification('El nombre debe tener al menos 2 caracteres', 'error');
        document.getElementById('nombre').focus();
        return;
    }

    if (numero.length < 8) {
        showNotification('El número de teléfono debe tener al menos 8 dígitos', 'error');
        document.getElementById('numero').focus();
        return;
    }

    if (mensaje.length < 5) {
        showNotification('El mensaje debe tener al menos 5 caracteres', 'error');
        document.getElementById('mensaje').focus();
        return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('numero', numero);
    formData.append('relacion', relacion);
    formData.append('mensaje', mensaje);
    formData.append('estado', 'asiste');
    formData.append('motivoNoAsistencia', '');
    formData.append('fecha', new Date().toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }));

    // Deshabilitar botón mientras se envía
    toggleButton(true);

    try {
        showNotification('Confirmando tu asistencia...', 'info');

        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            showNotification(`¡Perfecto ${nombre}! Ya estás en la lista de invitados 🎊`, 'success');
            
            // Limpiar formulario después del envío exitoso
            setTimeout(() => {
                this.reset();
                // Ocultar mensaje de error si estaba visible
                const mensajeError = document.getElementById('mensajeError');
                if (mensajeError) {
                    mensajeError.style.display = 'none';
                }
            }, 2000);

            // Mostrar mensaje adicional de confirmación
            setTimeout(() => {
                showNotification('¡Nos vemos en la fiesta! 🎉✨', 'success');
            }, 3000);

        } else {
            throw new Error(result.error || 'Error en la respuesta del servidor');
        }

    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al confirmar tu asistencia. Por favor, intenta nuevamente.', 'error');
    } finally {
        // Rehabilitar botón
        toggleButton(false);
    }
});

// Función mejorada para mostrar mensajes de error (mantener compatibilidad)
function mostrarMensajeError(mensaje) {
    showNotification(mensaje, 'error');
}

// Validación en tiempo real para el número
document.getElementById('numero').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});

// Validaciones visuales mejoradas al salir del campo
document.getElementById('nombre').addEventListener('blur', function() {
    if (this.value.length < 2) {
        this.style.borderColor = '#ff4444';
        this.style.boxShadow = '0 0 5px rgba(255, 68, 68, 0.5)';
    } else {
        this.style.borderColor = '#4CAF50';
        this.style.boxShadow = '0 0 5px rgba(76, 175, 80, 0.3)';
    }
});

document.getElementById('numero').addEventListener('blur', function() {
    if (this.value.length < 8) {
        this.style.borderColor = '#ff4444';
        this.style.boxShadow = '0 0 5px rgba(255, 68, 68, 0.5)';
    } else {
        this.style.borderColor = '#4CAF50';
        this.style.boxShadow = '0 0 5px rgba(76, 175, 80, 0.3)';
    }
});

document.getElementById('mensaje').addEventListener('blur', function() {
    if (this.value.length < 5) {
        this.style.borderColor = '#ff4444';
        this.style.boxShadow = '0 0 5px rgba(255, 68, 68, 0.5)';
    } else {
        this.style.borderColor = '#4CAF50';
        this.style.boxShadow = '0 0 5px rgba(76, 175, 80, 0.3)';
    }
});

document.getElementById('relacion').addEventListener('blur', function() {
    if (this.value.length < 2) {
        this.style.borderColor = '#ff4444';
        this.style.boxShadow = '0 0 5px rgba(255, 68, 68, 0.5)';
    } else {
        this.style.borderColor = '#4CAF50';
        this.style.boxShadow = '0 0 5px rgba(76, 175, 80, 0.3)';
    }
});

// Limpiar estilos cuando el usuario empiece a escribir
document.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
    });
});

// Auto-focus en el primer campo al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('nombre').focus();
    console.log('Formulario de confirmación inicializado correctamente');
});