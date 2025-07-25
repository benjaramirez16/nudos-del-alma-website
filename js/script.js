document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    //   CORRECCIÓN: Todo el código ahora está DENTRO de DOMContentLoaded
    // ==========================================================================

    // 1. LÓGICA DEL MENÚ HAMBURGUESA
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
        });
    }

    // 2. ANIMACIÓN DE SCROLL CON INTERSECTION OBSERVER
    const sectionsToAnimate = document.querySelectorAll('.animate-on-scroll');

    if (sectionsToAnimate.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        sectionsToAnimate.forEach(section => {
            observer.observe(section);
        });
    }

    // 3. LÓGICA DE LA GALERÍA DE IMÁGENES
    const mainImage = document.getElementById('main-product-image');
    const mainImageWebp = document.getElementById('main-product-image-webp');
    const thumbnails = document.querySelectorAll('.thumbnail-image');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const largeJpg = thumb.dataset.largeJpg;
                const largeWebp = thumb.dataset.largeWebp;
                
                mainImage.src = largeJpg;
                if (mainImageWebp) {
                    mainImageWebp.srcset = largeWebp;
                }

                thumbnails.forEach(innerThumb => innerThumb.classList.remove('active-thumbnail'));
                thumb.classList.add('active-thumbnail');
            });
        });
    }

    // 4. INICIALIZACIÓN DEL CARRUSEL SWIPER
    // CORRECCIÓN: 'swiper' cambiado a 'Swiper' (con S mayúscula)
    const swiper = new Swiper('.featured-products-carousel', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
      
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        breakpoints: {
            768: {
              slidesPerView: 2,
              spaceBetween: 25
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }
      });

});