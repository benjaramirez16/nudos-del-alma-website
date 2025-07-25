document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    //   1. LÓGICA DEL MENÚ HAMBURGUESA
    //   Este bloque se encarga de mostrar y ocultar el menú en móviles.
    // ==========================================================================
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
        });
    }
});

    // ==========================================================================
    //   2. ANIMACIÓN DE SCROLL CON INTERSECTION OBSERVER
    //   Este bloque se encarga de animar cualquier sección que tenga la clase
    //   '.animate-on-scroll' cuando aparece en la pantalla.
    // ==========================================================================
    
    // Seleccionamos TODOS los elementos que tengan la clase '.animate-on-scroll'
    const sectionsToAnimate = document.querySelectorAll('.animate-on-scroll');

    if (sectionsToAnimate.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Si la sección está en el viewport (visible)
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Dejamos de observar la sección una vez que la animación ha ocurrido
                    // para mejorar el rendimiento.
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1 // La animación se dispara cuando al menos el 10% de la sección es visible
        });

        // Le decimos al observador que vigile cada una de las secciones seleccionadas
        sectionsToAnimate.forEach(section => {
            observer.observe(section);
        });
    }

// ==========================================================================
    //   3. LÓGICA DE LA GALERÍA DE IMÁGENES
    // ==========================================================================
    const mainImage = document.getElementById('main-product-image');
    const mainImageWebp = document.getElementById('main-product-image-webp');
    const thumbnails = document.querySelectorAll('.thumbnail-image');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Cambia la imagen principal
                const largeJpg = thumb.dataset.largeJpg;
                const largeWebp = thumb.dataset.largeWebp;
                
                mainImage.src = largeJpg;
                if (mainImageWebp) {
                    mainImageWebp.srcset = largeWebp;
                }

                // Actualiza la clase activa
                thumbnails.forEach(innerThumb => innerThumb.classList.remove('active-thumbnail'));
                thumb.classList.add('active-thumbnail');
            });
        });
    }

    // ==========================================================================
    //   4. INICIALIZACIÓN DEL CARRUSEL SWIPER
    // ==========================================================================
    const swiper = new swiper('.featured-products-carousel', {
        // Cuántos slides se ven a la vez
        slidesPerView: 1,
        // Espacio entre slides
        spaceBetween: 20,
        // El carrusel es un bucle infinito
        loop: true,
      
        // Paginación (los puntitos)
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      
        // Flechas de navegación
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // Responsive: cambia la cantidad de slides según el ancho de la pantalla
        breakpoints: {
            // Cuando la pantalla sea >= 768px
            768: {
              slidesPerView: 2,
              spaceBetween: 25
            },
            // Cuando la pantalla sea >= 1024px
            1024: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }
      });