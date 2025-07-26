document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    //   1. LÓGICA DEL MENÚ HAMBURGUESA
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
    //   2. LÓGICA DEL CARRITO DE COMPRAS
    // ==========================================================================
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartIconContainer = document.querySelector('.cart-icon-container');
    const cartItemCount = document.querySelector('.cart-item-count');

    // Carga el carrito desde localStorage o crea uno nuevo si no existe
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    // Función para actualizar el contador del ícono del carrito
    const updateCartIcon = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartItemCount) {
            cartItemCount.textContent = totalItems;
        }
    };

    // Función para guardar el carrito en localStorage
    const saveCart = () => {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    };

    // Función para agregar un producto al carrito
    const addToCart = (productId, productName, productPrice) => {
        const existingProductIndex = cart.findIndex(item => item.id === productId);

        if (existingProductIndex > -1) {
            // Si el producto ya está en el carrito, aumenta la cantidad
            cart[existingProductIndex].quantity += 1;
        } else {
            // Si es un producto nuevo, lo añade al carrito
            cart.push({
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                quantity: 1
            });
        }

        saveCart();
        updateCartIcon();
    };

    // Añade el evento a todos los botones "Agregar al Carrito"
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const { productId, productName, productPrice } = button.dataset;
                addToCart(productId, productName, productPrice);
                
                // Feedback visual para el usuario
                button.textContent = '¡Agregado!';
                setTimeout(() => {
                    button.textContent = 'Agregar al Carrito';
                }, 1500);
            });
        });
    }

    // Muestra el contenido del carrito al hacer clic en el ícono (para depuración)
    if (cartIconContainer) {
        cartIconContainer.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Tu carrito está vacío.');
            } else {
                let cartDetails = 'Contenido del carrito:\n';
                cart.forEach(item => {
                    cartDetails += `- ${item.name} (x${item.quantity}) - $${item.price * item.quantity}\n`;
                });
                alert(cartDetails);
            }
        });
    }
    
    // Actualiza el ícono del carrito al cargar la página
    updateCartIcon();

    // ==========================================================================
    //   3. ANIMACIÓN DE SCROLL CON INTERSECTION OBSERVER
    // ==========================================================================
    const sectionsToAnimate = document.querySelectorAll('.animate-on-scroll');
    if (sectionsToAnimate.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        sectionsToAnimate.forEach(section => observer.observe(section));
    }

    // ==========================================================================
    //   4. LÓGICA DE LA GALERÍA DE IMÁGENES
    // ==========================================================================
    const mainImage = document.getElementById('main-product-image');
    const mainImageWebp = document.getElementById('main-product-image-webp');
    const thumbnails = document.querySelectorAll('.thumbnail-image');
    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const largeJpg = thumb.dataset.largeJpg;
                const largeWebp = thumb.dataset.largeWebp;
                mainImage.src = largeJpg;
                if (mainImageWebp) mainImageWebp.srcset = largeWebp;
                thumbnails.forEach(innerThumb => innerThumb.classList.remove('active-thumbnail'));
                thumb.classList.add('active-thumbnail');
            });
        });
    }

    // ==========================================================================
    //   5. LÓGICA DEL FILTRO DE PRODUCTOS
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('#catalogo .product-card-link');
    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filter = button.dataset.filter;
                productCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ==========================================================================
    //   6. LÓGICA DEL BOTÓN "VOLVER ARRIBA"
    // ==========================================================================
    const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('is-visible');
            } else {
                scrollToTopBtn.classList.remove('is-visible');
            }
        });
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================================================
    //   7. INICIALIZACIÓN DEL CARRUSEL SWIPER
    // ==========================================================================
    // Solo inicializa Swiper si el contenedor del carrusel existe en la página actual
    if (document.querySelector('.featured-products-carousel')) {
        const swiper = new Swiper('.featured-products-carousel', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: {
                768: { slidesPerView: 2, spaceBetween: 25 },
                1024: { slidesPerView: 3, spaceBetween: 30 }
            }
        });
    }

});