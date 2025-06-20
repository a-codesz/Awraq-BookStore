let cartItems = [
            {
                id: 1,
                name: "Jannat kai pattay",
                price: 1200,
                quantity: 1,
                image: "📚"
            },
            {
                id: 2,
                name: "Mala",
                price: 1500,
                quantity: 1,
                image: "📖"
            }
        ];

        // Open cart sidebar
        function openCart() {
            const sidebar = document.getElementById('cartSidebar');
            const overlay = document.querySelector('.cart-overlay');
            
            sidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            renderCartItems();
        }

        // Close cart sidebar
        function closeCart() {
            const sidebar = document.getElementById('cartSidebar');
            const overlay = document.querySelector('.cart-overlay');
            
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }

        // Render cart items
        function renderCartItems() {
            const cartContent = document.getElementById('cartContent');
            
            if (cartItems.length === 0) {
                cartContent.innerHTML = `
                    <div class="cart-empty">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <p>Your cart is empty</p>
                    </div>
                `;
                updateCartTotal();
                return;
            }

            let html = '';
            cartItems.forEach(item => {
                html += `
                    <div class="cart-item">
                        <div class="item-image">
                            ${item.image}
                        </div>
                        <div class="item-details">
                            <div class="item-name">${item.name}</div>
                            <div class="item-price">Rs${item.price.toFixed(2)}</div>
                            <div class="quantity-controls">
                                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span>${item.quantity}</span>
                                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                                <button class="qty-btn" onclick="removeItem(${item.id})" style="margin-left: 10px; color: red;">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });

            cartContent.innerHTML = html;
            updateCartTotal();
        }

        // Update item quantity
        function updateQuantity(itemId, change) {
            const item = cartItems.find(item => item.id === itemId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeItem(itemId);
                    return;
                }
                renderCartItems();
                updateCartCount();
            }
        }

        // Remove item from cart
        function removeItem(itemId) {
            cartItems = cartItems.filter(item => item.id !== itemId);
            renderCartItems();
            updateCartCount();
        }

        // Update cart total
        function updateCartTotal() {
            const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            document.getElementById('cartTotal').textContent = `Rs${total.toFixed(2)}`;
        }

        // Update cart count badge
        function updateCartCount() {
            const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('count').textContent = count;
        }

        // Checkout function
        function checkout() {
            // Here you would typically redirect to checkout page or process payment
        }

        // Close cart when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeCart();
            }
        });

        // Initialize cart count on page load
        document.addEventListener('DOMContentLoaded', function() {
            updateCartCount();
        });
    
        function openView() {
            const sidebar = document.getElementById('cartSidebar');
            const overlay = document.querySelector('.cart-overlay');
            
            sidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            renderCartItems();
        }

         let currentBook = {};

        function openView(title, imageSrc, price, author, description) {
            // Store book data
            currentBook = { title, imageSrc, price, author, description };
            
            // Update modal content
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalAuthor').textContent = `بذریعہ: ${author}`;
            document.getElementById('modalPrice').textContent = price;
            document.getElementById('modalDescription').textContent = description;
            document.getElementById('modalBookImage').src = imageSrc;
            
            // Show modal with animation
            const modal = document.getElementById('bookModal');
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }

        function closeModal(event) {
            // Close only if clicking overlay or close button
            if (event && event.target !== event.currentTarget && !event.target.classList.contains('close-btn')) {
                return;
            }
            
            const modal = document.getElementById('bookModal');
            modal.classList.remove('active');
            
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }

        function addToCart() {
            alert(`"${currentBook.title}" آپ کی کارٹ میں شامل کر دیا گیا!`);
            closeModal();
        }

        function viewPreview() {
            alert(`"${currentBook.title}" کا پیش نظارہ دکھایا جا رہا ہے...`);
        }

        // Close modal on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });
