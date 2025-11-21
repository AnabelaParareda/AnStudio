// ==========================================================
// 1. CÓDIGO EJECUTADO AL CARGAR EL DOCUMENTO (JQUERY READY)
// ==========================================================
$(document).ready(function(){
    
    // --- MENÚ HAMBURGUESA ---
    $('.menu-icon').click(function(){
        $('nav .lista').slideToggle();
    });

    // --- INICIALIZACIÓN DE OWL CAROUSEL ---
    $('.owl-carousel').owlCarousel({
        loop: true, 
        margin: 10, 
        nav: true,
        autoplay: true, 
        autoplayTimeout: 4000, 
        autoplayHoverPause: true, 
        responsive:{ 
            0:{
                items: 1 
            },
            768:{
                items: 2 
            }, 
            1024:{
                items: 3 
            }
        }
    });

    // ==========================================================
    // 2. LÓGICA LIGHTBOX/MODAL (CORREGIDA PARA LA APERTURA)
    // ==========================================================
    var modal = $('#imageModal');
    var modalImg = $('#modalImage');
    var captionText = $('#caption');

    // 1. Manejar el clic SOLAMENTE en las imágenes del carrusel
    $('.owl-carousel').on('click', '.item img', function() {
        
        // Carga la fuente y la descripción
        modalImg.attr('src', $(this).attr('src'));
        captionText.text($(this).siblings('p').text());

        // Muestra el modal
        modal.css('display', 'flex'); // Usamos 'flex' para centrar gracias al CSS
    });

    // 2. Manejar el clic en el botón de cerrar (X)
    $('.close-btn').on('click', function() {
        modal.css('display', 'none');
    });

    // 3. Manejar el clic fuera de la imagen (cerrar al hacer clic en el fondo)
    $(window).on('click', function(event) {
        if ($(event.target).is(modal)) {
            modal.css('display', 'none');
        }
    });
});


// ==========================================================
// 3. EFECTO DE TIPEO (VANILLA JS)
// ==========================================================
const typingElement = document.querySelector('.typing-effect');
const sobreMiNavBtn = document.querySelector('a[href="#sobre-mi"]');

if (typingElement && sobreMiNavBtn) { 
    const originalText = typingElement.textContent.trim(); 
    typingElement.textContent = ''; 
    
    let charIndex = 0; 
    const characters = originalText.split(''); 
    const baseSpeed = 50; 
    
    let typingTimeout; 

    const typeChar = () => {
        if (charIndex < characters.length) {
            typingElement.textContent += characters[charIndex];
            const char = characters[charIndex];
            charIndex++;

            let delay = baseSpeed;
            
            if (char === '.' || char === '?' || char === '!') {
                delay += 500; 
            } else if (char === ',' || char === ':') {
                delay += 250;
            }
            
            typingTimeout = setTimeout(typeChar, delay);
        } else {
            typingElement.classList.add('completed'); 
            typingTimeout = null; 
        }
    };

    const resetAndStartTyping = () => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
            typingTimeout = null;
        }

        charIndex = 0;
        typingElement.textContent = '';
        typingElement.classList.remove('completed');

        typeChar();
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { 
                resetAndStartTyping(); 
                observer.unobserve(typingElement); 
            }
        });
    };

    const options = { root: null, rootMargin: '0px', threshold: 0.8 };
    const observer = new IntersectionObserver(observerCallback, options);
    observer.observe(typingElement);

    sobreMiNavBtn.addEventListener('click', () => {
        resetAndStartTyping();
    });
}