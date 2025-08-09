// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart from localStorage or empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // DOM Elements
  const cartIcon = document.getElementById('cart-icon');
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const checkoutBtn = document.getElementById('checkout-btn');
  const shoppingCart = document.getElementById('shoppingCart') ? 
    new bootstrap.Offcanvas(document.getElementById('shoppingCart')) : null;
    
  // Check if we're on the store page
  const isStorePage = document.querySelector('.product-card') !== null;
  
  // Update cart count in navbar
  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
  }
  
  // Render cart items
  function renderCart() {
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="text-center p-4 text-muted">
          <i class='bx bx-cart-download bx-lg mb-2'></i>
          <p class="mb-0">Your cart is empty</p>
        </div>
      `;
      cartSubtotal.textContent = '$0.00';
      checkoutBtn.disabled = true;
      return;
    }
    
    let subtotal = 0;
    let itemsHtml = '';
    
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      itemsHtml += `
        <div class="card border-0 border-bottom rounded-0" data-product-id="${item.id}">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <img src="${item.image}" alt="${item.name}" class="rounded me-3" width="60" height="60">
              <div class="flex-grow-1">
                <h6 class="mb-1">${item.name}</h6>
                <div class="d-flex align-items-center">
                  <button class="btn btn-sm btn-outline-secondary change-quantity" data-action="decrease" data-index="${index}">-</button>
                  <span class="mx-2">${item.quantity}</span>
                  <button class="btn btn-sm btn-outline-secondary change-quantity" data-action="increase" data-index="${index}">+</button>
                  <span class="ms-auto fw-bold">$${itemTotal.toFixed(2)}</span>
                </div>
              </div>
              <button type="button" class="btn-close remove-item" data-index="${index}" aria-label="Remove"></button>
            </div>
          </div>
        </div>
      `;
    });
    
    cartItems.innerHTML = itemsHtml;
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    checkoutBtn.disabled = false;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.change-quantity').forEach(button => {
      button.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        const index = parseInt(this.getAttribute('data-index'));
        updateQuantity(index, action);
      });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        removeFromCart(index);
      });
    });
  }
  
  // Add to cart
  function addToCart(productId, productName, productPrice, productImage = '/img/discounts/pc.png') {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        quantity: 1,
        image: productImage
      });
    }
    
    saveCart();
    updateCartCount();
    
    // If on store page, use the store's updateCart function if it exists
    if (isStorePage && typeof updateCart === 'function') {
      updateCart();
      // Show the cart sidebar on store page
      const storeCart = document.getElementById('shopping-cart-sidebar');
      if (storeCart) storeCart.style.display = 'block';
    } else {
      renderCart();
    }
    
    // Show toast notification if we're not on the store page
    if (!isStorePage) {
      const toast = new bootstrap.Toast(document.getElementById('cart-toast'));
      toast.show();
    }
  }
  
  // Update quantity
  function updateQuantity(index, action) {
    if (action === 'increase') {
      cart[index].quantity += 1;
    } else if (action === 'decrease') {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        removeFromCart(index);
        return;
      }
    }
    
    saveCart();
    updateCartCount();
    renderCart();
  }
  
  // Remove from cart
  function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCart();
  }
  
  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Initialize
  updateCartCount();
  renderCart();
  
  // Hide cart count badge if cart is empty
  if (cart.length === 0) {
    cartCount.style.display = 'none';
  }
  
  // Event Listeners
  if (cartIcon) {
    cartIcon.addEventListener('click', function(e) {
      e.preventDefault();
      // On store page, show the store's cart sidebar
      if (isStorePage) {
        const storeCart = document.getElementById('shopping-cart-sidebar');
        if (storeCart) storeCart.style.display = 'block';
      } 
      // On other pages, show the offcanvas cart
      else if (shoppingCart) {
        shoppingCart.show();
      }
    });
  }
  
  // Handle checkout button click
  checkoutBtn.addEventListener('click', function() {
    // Add your checkout logic here
    alert('Proceeding to checkout with ' + cart.length + ' items');
  });
  
  // Handle add to cart buttons
  document.addEventListener('click', function(e) {
    if (e.target.closest('.add-to-cart-btn')) {
      const button = e.target.closest('.add-to-cart-btn');
      const productId = button.getAttribute('data-product-id');
      const productName = button.getAttribute('data-product-name');
      const productPrice = button.getAttribute('data-product-price');
      const productImage = button.closest('.product-card').querySelector('img').src;
      
      addToCart(productId, productName, productPrice, productImage);
      
      // Show toast notification
      const toast = new bootstrap.Toast(document.getElementById('cart-toast'));
      toast.show();
      
      // Update cart count
      updateCartCount();
    }
  });
});
