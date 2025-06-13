// Función para enviar el mensaje
function sendMessage() {
    const name = document.getElementById('nameInput').value.trim();
    const message = document.getElementById('messageTextarea').value.trim();
    const reason = document.getElementById('reasonTextarea').value.trim();
    
    // Validar campos obligatorios
    if (!name) {
        showNotification('¡Ohana significa familia! Por favor ingresa tu nombre 💙', 'error');
        document.getElementById('nameInput').focus();
        return;
    }
    
    if (!message) {
        showNotification('¡Stitch necesita tu mensaje! No olvides escribir algo bonito 🌺', 'error');
        document.getElementById('messageTextarea').focus();
        return;
    }
    
    // Simular envío exitoso
    showNotification('¡Mensaje enviado! Stitch está muy feliz 🎉', 'success');
    
    // Opcional: limpiar el formulario después del envío
    setTimeout(() => {
        if (confirm('¿Quieres enviar otro mensaje?')) {
            clearForm();
        }
    }, 2000);
    
    // Aquí puedes agregar la lógica para enviar los datos a un servidor
    console.log('Datos del formulario:', {
        nombre: name,
        mensaje: message,
        razon: reason || 'No especificada',
        fecha: new Date().toISOString()
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Remover notificación existente si la hay
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00d4ff, #ff6b9d)' : 'linear-gradient(135deg, #ff6b9d, #ff4757)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Función para limpiar el formulario
function clearForm() {
    document.getElementById('nameInput').value = '';
    document.getElementById('messageTextarea').value = '';
    document.getElementById('reasonTextarea').value = '';
    document.getElementById('nameInput').focus();
}

// Agregar animaciones CSS para las notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Agregar efecto de escritura automática en los placeholders
function typewriterEffect(element, text, speed = 100) {
    let i = 0;
    element.placeholder = '';
    
    function typeWriter() {
        if (i < text.length) {
            element.placeholder += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
}

// Inicializar efectos cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de focus mejorado en inputs
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Contador de caracteres para las áreas de texto
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLength = 500; // Límite de caracteres
        
        // Crear contador
        const counter = document.createElement('div');
        counter.style.cssText = `
            text-align: right;
            font-size: 12px;
            color: #00d4ff;
            margin-top: 5px;
            opacity: 0.7;
        `;
        
        textarea.parentElement.appendChild(counter);
        
        // Actualizar contador
        function updateCounter() {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${textarea.value.length}/${maxLength}`;
            
            if (remaining < 50) {
                counter.style.color = '#ff6b9d';
            } else {
                counter.style.color = '#00d4ff';
            }
        }
        
        textarea.addEventListener('input', updateCounter);
        textarea.setAttribute('maxlength', maxLength);
        updateCounter(); // Inicializar
    });
    
    // Efecto de partículas flotantes
    createFloatingParticles();
});

// Función para crear partículas flotantes
function createFloatingParticles() {
    const particles = ['⭐', '💙', '🌺', '✨', '💫'];
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.cssText = `
            position: fixed;
            font-size: 20px;
            pointer-events: none;
            z-index: -1;
            opacity: 0.3;
            animation: floatUp 8s linear infinite;
            left: ${Math.random() * 100}vw;
            top: 100vh;
        `;
        
        document.body.appendChild(particle);
        
        // Remover después de la animación
        setTimeout(() => particle.remove(), 8000);
    }
    
    // Crear partícula cada 3 segundos
    setInterval(createParticle, 3000);
}

// Agregar animación de partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatUp {
        from {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Permitir envío con Enter (Ctrl+Enter para textareas)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        if (e.target.tagName === 'INPUT') {
            e.preventDefault();
            sendMessage();
        } else if (e.target.tagName === 'TEXTAREA' && e.ctrlKey) {
            e.preventDefault();
            sendMessage();
        }
    }
});