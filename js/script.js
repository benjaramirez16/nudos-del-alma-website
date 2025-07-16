document.addEventListener('DOMContentLoaded', () => {
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
//   ANIMACIÓN DE SCROLL CON INTERSECTION OBSERVER
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {

    const sectionsToAnimate = document.querySelectorAll('.feature-section, .values-section');

    if (sectionsToAnimate.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Si la sección está en el viewport (visible)
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Dejamos de observar la sección una vez que la animación ha ocurrido
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1 // La animación se dispara cuando al menos el 10% de la sección es visible
        });

        sectionsToAnimate.forEach(section => {
            observer.observe(section);
        });
    }
});