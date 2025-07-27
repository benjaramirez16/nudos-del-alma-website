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
    //   2. LÓGICA DEL CARRITO DE COMPRAS (VERSIÓN AVANZADA Y CORREGIDA)
    // ==========================================================================
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
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

    // Función para guardar el carrito y volver a renderizar si es necesario
    const saveCart = () => {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        // Si estamos en la página del carrito, la volvemos a renderizar para mostrar los cambios
        if (document.getElementById('cart-items-container')) {
            renderCartPage();
        }
    };

    // Función para agregar un producto al carrito
    const addToCart = (productId, productName, productPrice, productImage) => {
        const existingProductIndex = cart.findIndex(item => item.id === productId);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                image: productImage,
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
                const { productId, productName, productPrice, productImage } = button.dataset;
                addToCart(productId, productName, productPrice, productImage);
                
                button.textContent = '¡Agregado!';
                setTimeout(() => {
                    button.textContent = 'Agregar al Carrito';
                }, 1500);
            });
        });
    }
    
    // Actualiza el ícono del carrito al cargar cualquier página
    updateCartIcon();

    // ==========================================================================
    //   8. LÓGICA PARA RENDERIZAR Y GESTIONAR LA PÁGINA DEL CARRITO (CORREGIDO)
    // ==========================================================================
    const cartItemsContainer = document.getElementById('cart-items-container');
    
    // Esta función se encarga de "dibujar" los productos en la página del carrito
    const renderCartPage = () => {
        if (!cartItemsContainer) return; // Si no estamos en la página del carrito, no hace nada

        const cartSummary = document.getElementById('cart-summary');
        const cartSubtotalElem = document.getElementById('cart-subtotal');
        const cartTotalElem = document.getElementById('cart-total');
        const checkoutBtn = document.querySelector('.checkout-btn');

        cartItemsContainer.innerHTML = ''; // Limpiamos el contenedor

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Tu carrito de compras está vacío.</p>';
            cartSummary.style.display = 'none';
        } else {
            cartSummary.style.display = 'block';
            let subtotal = 0;

            cart.forEach(item => {
                subtotal += item.price * item.quantity;
                const itemHTML = `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <a href="#" class="cart-item-title">${item.name}</a>
                            <button class="cart-item-remove" data-product-id="${item.id}">Eliminar</button>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" data-action="decrease" data-product-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" data-action="increase" data-product-id="${item.id}">+</button>
                        </div>
                        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                `;
                cartItemsContainer.innerHTML += itemHTML;
            });

            cartSubtotalElem.textContent = `$${subtotal.toFixed(2)}`;
            cartTotalElem.textContent = `$${subtotal.toFixed(2)}`;
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = 'Finalizar Pedido por WhatsApp';
        }
    };

    // Solo se ejecuta esta lógica si estamos en la página del carrito
    if (cartItemsContainer) {
        renderCartPage(); // Dibuja el estado inicial del carrito

        // Listener para los botones de la página del carrito
        cartItemsContainer.addEventListener('click', (e) => {
            const target = e.target;
            const productId = target.dataset.productId;
            if (!productId) return;

            const productIndex = cart.findIndex(item => item.id === productId);
            if (productIndex === -1) return;

            // Lógica para botones de cantidad
            if (target.classList.contains('quantity-btn')) {
                const action = target.dataset.action;
                let newQuantity = cart[productIndex].quantity;
                if (action === 'increase') newQuantity++;
                if (action === 'decrease') newQuantity--;
                
                if (newQuantity > 0) {
                    cart[productIndex].quantity = newQuantity;
                } else {
                    cart.splice(productIndex, 1); // Si la cantidad es 0, elimina el item
                }
            }

            // Lógica para el botón de eliminar
            if (target.classList.contains('cart-item-remove')) {
                cart.splice(productIndex, 1);
            }

            saveCart();
            updateCartIcon();
        });

        // Listener para el botón de Checkout
        const checkoutBtn = document.querySelector('.checkout-btn');
        const tuNumeroDeWhatsApp = '542921471599'; 
        
        checkoutBtn.addEventListener('click', () => {
            let mensaje = '¡Hola! Quisiera hacer el siguiente pedido:\n\n';
            let total = 0;
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                mensaje += `*Producto:* ${item.name}\n`;
                mensaje += `*Cantidad:* ${item.quantity}\n`;
                mensaje += `*Subtotal:* $${itemTotal.toFixed(2)}\n\n`;
                total += itemTotal;
            });
            mensaje += `*TOTAL DEL PEDIDO: $${total.toFixed(2)}*\n\n`;
            mensaje += `Quedo a la espera de los datos para el pago. ¡Gracias!`;
            const linkWhatsApp = `https://wa.me/${542921471599}?text=${encodeURIComponent(mensaje)}`;
            window.open(linkWhatsApp, '_blank');
        });
    }

    // ==========================================================================
    //   4. ANIMACIÓN DE SCROLL CON INTERSECTION OBSERVER
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
    //   5. LÓGICA DE LA GALERÍA DE IMÁGENES
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
    //   6. LÓGICA DEL FILTRO DE PRODUCTOS
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
    //   7. LÓGICA DEL BOTÓN "VOLVER ARRIBA"
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
    //   8. INICIALIZACIÓN DEL CARRUSEL SWIPER
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