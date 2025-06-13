let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slider = document.getElementById('slider');

// 🗓 Establece aquí la fecha y hora del evento (formato: "YYYY-MM-DDTHH:MM:SS")
const fechaObjetivo = new Date("2025-07-10T18:00:00").getTime();

const actualizarContador = () => {
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
        document.getElementById("dias").textContent = "00";
        document.getElementById("horas").textContent = "00";
        document.getElementById("minutos").textContent = "00";
        document.getElementById("segundos").textContent = "00";
        return;
    }

    const segundos = Math.floor((diferencia / 1000) % 60);
    const minutos = Math.floor((diferencia / 1000 / 60) % 60);
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    document.getElementById("dias").textContent = String(dias).padStart(2, "0");
    document.getElementById("horas").textContent = String(horas).padStart(2, "0");
    document.getElementById("minutos").textContent = String(minutos).padStart(2, "0");
    document.getElementById("segundos").textContent = String(segundos).padStart(2, "0");
};

// Actualizar cada segundo
setInterval(actualizarContador, 1000);
actualizarContador(); // ejecutar de inmediato al cargar


function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto-slide every 3 seconds
setInterval(nextSlide, 3000);

// Touch/swipe functionality
let startX = 0;
let currentX = 0;
let isDragging = false;

slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diffX = startX - currentX;

    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            // Swipe left - next slide
            currentSlide = (currentSlide + 1) % totalSlides;
        } else {
            // Swipe right - previous slide
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        }
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        isDragging = false;
    }
});

slider.addEventListener('touchend', () => {
    isDragging = false;
});

// Mouse drag functionality for desktop
slider.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
    slider.style.cursor = 'grabbing';
});

slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
    const diffX = startX - currentX;

    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            currentSlide = (currentSlide + 1) % totalSlides;
        } else {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        }
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        isDragging = false;
        slider.style.cursor = 'grab';
    }
});

slider.addEventListener('mouseup', () => {
    isDragging = false;
    slider.style.cursor = 'grab';
});

slider.addEventListener('mouseleave', () => {
    isDragging = false;
    slider.style.cursor = 'grab';
});



