// URL de tu Google Apps Script Web App
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz5-WLlt3_XY5k2NgJyyHepMjk2r0oAzrCeGSIaqNkTjm1Oe9Ua1gRlGNVxQDUBfcwZOg/exec';

// Función para validar el formulario
function validateForm() {
    const name = document.getElementById('nameInput').value.trim();
    const message = document.getElementById('messageTextarea').value.trim();
    
    if (!name) {
        showNotification('Por favor, ingresa tu nombre', 'error');
        document.getElementById('nameInput').focus();
        return false;
    }
    
    if (name.length < 2) {
        showNotification('El nombre debe tener al menos 2 caracteres', 'error');
        document.getElementById('nameInput').focus();
        return false;
    }
    
    if (!message) {
        showNotification('Por favor, escribe un mensaje de felicitaciones', 'error');
        document.getElementById('messageTextarea').focus();
        return false;
    }
    
    if (message.length < 5) {
        showNotification('El mensaje debe tener al menos 5 caracteres', 'error');
        document.getElementById('messageTextarea').focus();
        return false;
    }
    
    return true;
}

// Función para mostrar notificaciones
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
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
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
        border-radius: 10px;
        color: white;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 350px;
        word-wrap: break-word;
    `;
    
    // Color según el tipo
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f44336';
    } else {
        notification.style.backgroundColor = '#2196F3';
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
        }, 300);
    }, 5000);
}

// Función para deshabilitar/habilitar el botón
function toggleButton(disabled) {
    const button = document.querySelector('.send-button');
    const span = button.querySelector('span');
    
    if (disabled) {
        button.disabled = true;
        button.style.opacity = '0.6';
        button.style.cursor = 'not-allowed';
        span.textContent = 'ENVIANDO...';
    } else {
        button.disabled = false;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
        span.textContent = 'ENVIAR MENSAJE';
    }
}

// Función principal para enviar el mensaje
async function sendMessage() {
    // Validar formulario
    if (!validateForm()) {
        return;
    }
    
    // Obtener datos del formulario
    const name = document.getElementById('nameInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const message = document.getElementById('messageTextarea').value.trim();
    const reason = document.getElementById('reasonTextarea').value.trim();
    
    // Deshabilitar botón mientras se envía
    toggleButton(true);
    
    try {
        // Preparar datos para enviar
        const formData = new URLSearchParams();
        formData.append('nombre', name);
        formData.append('numero', phone); // Número de teléfono opcional
        formData.append('relacion', ''); // No aplica para los que no asisten
        formData.append('mensaje', message);
        formData.append('estado', 'no_asiste');
        formData.append('motivoNoAsistencia', reason);
        formData.append('fecha', new Date().toLocaleString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }));
        
        showNotification('Enviando tu mensaje...', 'info');
        
        // Enviar datos al Google Apps Script
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('¡Tu mensaje ha sido enviado exitosamente! 💙', 'success');
            
            // Limpiar formulario después del envío exitoso
            setTimeout(() => {
                clearForm();
            }, 2000);
            
        } else {
            throw new Error(result.error || 'Error desconocido');
        }
        
    } catch (error) {
        console.error('Error al enviar:', error);
        showNotification('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
    } finally {
        // Rehabilitar botón
        toggleButton(false);
    }
}

// Función para limpiar el formulario
function clearForm() {
    document.getElementById('nameInput').value = '';
    document.getElementById('phoneInput').value = '';
    document.getElementById('messageTextarea').value = '';
    document.getElementById('reasonTextarea').value = '';
    
    // Mostrar mensaje de confirmación final
    showNotification('Gracias por enviar tus buenos deseos 💕', 'success');
}

// Función para manejar Enter en los campos de texto
function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        
        // Si estamos en el campo de nombre, mover al siguiente campo
        if (event.target.id === 'nameInput') {
            document.getElementById('messageTextarea').focus();
        }
        // Si estamos en el textarea de mensaje y hay texto, enviar
        else if (event.target.id === 'messageTextarea' && event.target.value.trim()) {
            sendMessage();
        }
    }
}

// Función para contar caracteres en tiempo real
function updateCharCount(textareaId, maxChars = 500) {
    const textarea = document.getElementById(textareaId);
    const currentLength = textarea.value.length;
    
    // Crear o actualizar contador si no existe
    let counter = textarea.parentNode.querySelector('.char-counter');
    if (!counter) {
        counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            font-size: 12px;
            color: #666;
            text-align: right;
            margin-top: 5px;
        `;
        textarea.parentNode.appendChild(counter);
    }
    
    counter.textContent = `${currentLength}/${maxChars}`;
    
    // Cambiar color si se acerca al límite
    if (currentLength > maxChars * 0.8) {
        counter.style.color = '#ff9800';
    } else if (currentLength >= maxChars) {
        counter.style.color = '#f44336';
    } else {
        counter.style.color = '#666';
    }
}

// Event listeners cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listener para Enter
    document.getElementById('nameInput').addEventListener('keypress', handleKeyPress);
    document.getElementById('messageTextarea').addEventListener('keypress', handleKeyPress);
    
    // Agregar contador de caracteres
    document.getElementById('messageTextarea').addEventListener('input', function() {
        updateCharCount('messageTextarea', 500);
    });
    
    document.getElementById('reasonTextarea').addEventListener('input', function() {
        updateCharCount('reasonTextarea', 300);
    });
    
    // Inicializar contadores
    updateCharCount('messageTextarea', 500);
    updateCharCount('reasonTextarea', 300);
    
    // Auto-focus en el campo de nombre
    document.getElementById('nameInput').focus();
    
    console.log('Formulario de no asistencia inicializado correctamente');
});

// Función auxiliar para testing (opcional)
function testConnection() {
    fetch(SCRIPT_URL + '?action=test')
        .then(response => response.json())
        .then(data => {
            console.log('Conexión exitosa:', data);
            showNotification('Conexión con el servidor exitosa', 'success');
        })
        .catch(error => {
            console.error('Error de conexión:', error);
            showNotification('Error de conexión con el servidor', 'error');
        });
}