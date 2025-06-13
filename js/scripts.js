  let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;
        const slider = document.getElementById('slider');
        
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
        
       