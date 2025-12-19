document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const mobileBtn = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");
  const icon = mobileBtn.querySelector("i");

  mobileBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Toggle icon between bars and times (X)
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // 2. Sticky Header Effect on Scroll
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
      header.style.padding = "0.5rem 0"; // Shrink slightly
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
      header.style.padding = "1rem 0"; // Return to normal
    }
  });

  // 3. Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // 4. Cart Button interaction (Simple Alert for now)
  const addButtons = document.querySelectorAll(".btn-add");
  const cartBadge = document.querySelector(".badge");
  let cartCount = 0;

  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      cartCount++;
      cartBadge.innerText = cartCount;
      // Optional: Visual feedback
      btn.innerHTML = '<i class="fas fa-check"></i> Added';
      btn.style.backgroundColor = "#10b981"; // Green color
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-plus"></i> Add';
        btn.style.backgroundColor = ""; // Revert color
      }, 2000);
    });
  });
});

// Product page specific functions
function changeImage(thumb) {
  const mainImg = document.getElementById("mainImg");
  mainImg.src = thumb.src.replace("w=150", "w=600");
  document
    .querySelectorAll(".thumb")
    .forEach((t) => t.classList.remove("active"));
  thumb.classList.add("active");
}

function updateQty(delta) {
  const qtyInput = document.getElementById("qtyInput");
  let qty = parseInt(qtyInput.value) + delta;
  if (qty < 1) qty = 1;
  qtyInput.value = qty;
}

function openTab(evt, tabName) {
  document
    .querySelectorAll(".tab-content")
    .forEach((content) => content.classList.remove("active"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

// Add event listeners for color buttons if on product page
document.addEventListener("DOMContentLoaded", () => {
  const colorBtns = document.querySelectorAll(".color-btn");
  colorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".color-btn")
        .forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      document.getElementById("colorName").textContent = btn.dataset.color;
    });
  });
});

// Product page specific functions
function changeImage(thumb) {
  const mainImg = document.getElementById('mainImg');
  mainImg.src = thumb.src.replace('w=150', 'w=600');
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

function updateQty(delta) {
  const qtyInput = document.getElementById('qtyInput');
  let qty = parseInt(qtyInput.value) + delta;
  if (qty < 1) qty = 1;
  qtyInput.value = qty;
}

function openTab(evt, tabName) {
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  evt.currentTarget.classList.add('active');
}

// Add event listeners for color buttons if on product page
document.addEventListener("DOMContentLoaded", () => {
  const colorBtns = document.querySelectorAll('.color-btn');
  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      document.getElementById('colorName').textContent = btn.dataset.color;
    });
  });
});

/* =============================
   ENHANCED PRODUCT PAGE SCRIPTS
   ============================= */

// 1. Zoom Effect Logic
const zoomContainer = document.getElementById('zoom-container');
const mainImg = document.getElementById('mainImg');

if (zoomContainer && mainImg) {
    zoomContainer.addEventListener('mousemove', function(e) {
        const { left, top, width, height } = zoomContainer.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        // Calculate percentage position
        const xPercent = (x / width) * 100;
        const yPercent = (y / height) * 100;

        // Move the image and scale it
        mainImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        mainImg.style.transform = "scale(1.6)"; // Zoom level
    });

    zoomContainer.addEventListener('mouseleave', function() {
        // Reset
        mainImg.style.transform = "scale(1)";
        mainImg.style.transformOrigin = "center center";
    });
}

// 2. Countdown Timer Logic
function startCountdown() {
    const timerDisplay = document.getElementById('timer');
    if (!timerDisplay) return;

    // Set a fake end time (24 hours from now)
    let timeRemaining = 24 * 60 * 60; 

    setInterval(() => {
        let hours = Math.floor(timeRemaining / 3600);
        let minutes = Math.floor((timeRemaining % 3600) / 60);
        let seconds = timeRemaining % 60;

        // Add leading zeros
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timerDisplay.innerText = `${hours}h ${minutes}m ${seconds}s`;
        
        if (timeRemaining > 0) {
            timeRemaining--;
        }
    }, 1000);
}

// Initialize Timer
document.addEventListener('DOMContentLoaded', startCountdown);


/* =============================
   CART & CHECKOUT LOGIC
   ============================= */

// 1. Update Cart Quantity and Recalculate Totals
function updateCartQty(priceId, change) {
    // Find the input relative to the button clicked
    // Note: In a real app, we'd pass the input ID or use event.target
    const priceEl = document.getElementById(priceId);
    if (!priceEl) return;

    // Find the input in the same container (simplified traversal for demo)
    const container = priceEl.parentElement.querySelector('.quantity-selector input');
    if (!container) return; // Logic adjustment needed based on HTML structure if changed

    // Actually, let's grab the input from the button click:
    const btn = event.target;
    const input = btn.parentElement.querySelector('input');
    
    let currentQty = parseInt(input.value);
    let newQty = currentQty + change;

    if (newQty >= 1) {
        input.value = newQty;
        
        // Update Line Item Price
        const basePrice = parseFloat(priceEl.getAttribute('data-base-price'));
        const newTotal = basePrice * newQty;
        priceEl.innerText = '$' + newTotal.toFixed(2);

        // Recalculate Cart Total
        recalculateCart();
    }
}

// 2. Remove Item
function removeItem(itemId) {
    const item = document.getElementById(itemId);
    if (item) {
        item.style.opacity = '0';
        setTimeout(() => {
            item.remove();
            recalculateCart();
        }, 300);
    }
}

// 3. Recalculate Cart Totals (Subtotal, Tax, Total)
function recalculateCart() {
    let subtotal = 0;
    const priceEls = document.querySelectorAll('.item-price');
    
    priceEls.forEach(el => {
        subtotal += parseFloat(el.innerText.replace('$', ''));
    });

    const tax = subtotal * 0.05; // 5% Tax
    const total = subtotal + tax;

    // Update DOM
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');

    if(subtotalEl) subtotalEl.innerText = '$' + subtotal.toFixed(2);
    if(taxEl) taxEl.innerText = '$' + tax.toFixed(2);
    if(totalEl) totalEl.innerText = '$' + total.toFixed(2);
}

// 4. Checkout Process Simulation
function processOrder(e) {
    e.preventDefault();
    
    const btn = document.getElementById('payButton');
    const originalText = btn.innerText;

    // 1. Loading State
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // 2. Simulate API Call (2 seconds)
    setTimeout(() => {
        // Success
        btn.innerHTML = '<i class="fas fa-check"></i> Order Placed!';
        btn.style.backgroundColor = '#10b981'; // Green
        btn.style.borderColor = '#10b981';
        
        // Redirect after success
        setTimeout(() => {
            alert('Thank you for your order! Redirecting to confirmation...');
            window.location.href = 'index.html';
        }, 1000);
    }, 2000);
}



/* =============================
   LOGIN PAGE LOGIC
   ============================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Toggle Password Visibility
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            // Toggle the type attribute
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle the icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // 2. Login Form Simulation
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation check
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if(email && password) {
                // Change button state
                const originalText = loginBtn.innerText;
                loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
                loginBtn.disabled = true;

                // Simulate API delay
                setTimeout(() => {
                    // Success feedback
                    loginBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                    loginBtn.style.background = '#10b981';
                    loginBtn.style.borderColor = '#10b981';

                    // Redirect to Home or Account
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                }, 1500);
            }
        });
    }
});
