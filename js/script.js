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

});