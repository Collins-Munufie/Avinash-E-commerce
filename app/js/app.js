const App = {
    cart: [],
    wishlist: [],
    user: null,

    init() {
        this.loadState();
        this.initHeader();
        this.initMobileMenu();
        this.initSearch();
        this.initBackToTop();
        this.updateCartBadge();
        this.updateWishlistBadge();
        this.initToasts();
        this.initProductCards();
        this.initFaqs();
        this.initNewsletter();
        this.initCountdown();
        this.scrollToHash();
    },

    loadState() {
        try {
            this.cart = JSON.parse(localStorage.getItem('am_cart') || '[]');
            this.wishlist = JSON.parse(localStorage.getItem('am_wishlist') || '[]');
            this.user = JSON.parse(localStorage.getItem('am_user') || 'null');
        } catch(e) { console.error('State load error:', e); }
    },

    saveState() {
        localStorage.setItem('am_cart', JSON.stringify(this.cart));
        localStorage.setItem('am_wishlist', JSON.stringify(this.wishlist));
        if (this.user) localStorage.setItem('am_user', JSON.stringify(this.user));
    },

    initHeader() {
        const header = document.querySelector('.header');
        if (!header) return;
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    header.classList.toggle('scrolled', window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        });
    },

    initMobileMenu() {
        const toggle = document.querySelector('.mobile-toggle');
        const menu = document.querySelector('.mobile-menu');
        const close = document.querySelector('.mobile-menu-close');
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (!toggle || !menu) return;
        const openMenu = () => { menu.classList.add('active'); document.body.style.overflow = 'hidden'; };
        const closeMenu = () => { menu.classList.remove('active'); document.body.style.overflow = ''; };
        toggle.addEventListener('click', openMenu);
        if (close) close.addEventListener('click', closeMenu);
        if (overlay) overlay.addEventListener('click', closeMenu);
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
        menu.querySelectorAll('.mobile-menu-nav a').forEach(a => a.addEventListener('click', closeMenu));
    },

    initSearch() {
        const searchInput = document.querySelector('.header-search input');
        if (!searchInput) return;
        searchInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const q = searchInput.value.trim();
                if (q) window.location.href = `shop.html?q=${encodeURIComponent(q)}`;
            }
        });
    },

    initBackToTop() {
        const btn = document.querySelector('.back-to-top');
        if (!btn) return;
        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    },

    updateCartBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const count = this.cart.reduce((sum, item) => sum + item.qty, 0);
        badges.forEach(b => { b.textContent = count > 0 ? count : ''; b.style.display = count > 0 ? 'flex' : 'none'; });
    },

    updateWishlistBadge() {
        const badges = document.querySelectorAll('.wishlist-badge');
        badges.forEach(b => { b.textContent = this.wishlist.length > 0 ? this.wishlist.length : ''; b.style.display = this.wishlist.length > 0 ? 'flex' : 'none'; });
    },

    addToCart(productId, qty = 1) {
        const product = getProductById(productId);
        if (!product || !product.inStock) { this.showToast('Product is out of stock', 'error'); return; }
        const existing = this.cart.find(item => item.id === productId);
        if (existing) { existing.qty += qty; } else { this.cart.push({ id: productId, qty }); }
        this.saveState();
        this.updateCartBadge();
        this.showToast(`${product.name} added to cart`);
        const btn = document.querySelector(`[data-add-cart="${productId}"]`);
        if (btn) {
            btn.classList.add('added');
            btn.innerHTML = '<i class="fas fa-check"></i> Added';
            setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart'; }, 2000);
        }
    },

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveState();
        this.updateCartBadge();
        const el = document.querySelector(`[data-cart-item="${productId}"]`);
        if (el) { el.style.opacity = '0'; el.style.transform = 'translateX(-20px)'; setTimeout(() => el.remove(), 300); }
    },

    updateCartQty(productId, delta) {
        const item = this.cart.find(i => i.id === productId);
        if (!item) return;
        item.qty += delta;
        if (item.qty < 1) { this.removeFromCart(productId); return; }
        this.saveState();
        this.updateCartBadge();
    },

    toggleWishlist(productId) {
        const idx = this.wishlist.indexOf(productId);
        const product = getProductById(productId);
        if (!product) return;
        if (idx > -1) { this.wishlist.splice(idx, 1); this.showToast(`${product.name} removed from wishlist`); }
        else { this.wishlist.push(productId); this.showToast(`${product.name} added to wishlist`); }
        this.saveState();
        this.updateWishlistBadge();
        document.querySelectorAll(`[data-wishlist="${productId}"]`).forEach(btn => {
            const isWished = this.wishlist.includes(productId);
            btn.classList.toggle('wishlisted', isWished);
            btn.innerHTML = isWished ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
        });
    },

    showToast(message, type = 'success') {
        const container = document.querySelector('.toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type === 'error' ? 'toast-error' : ''}`;
        toast.innerHTML = `
            <span class="toast-icon">${type === 'error' ? '<i class="fas fa-exclamation-circle text-danger"></i>' : '<i class="fas fa-check-circle text-success"></i>'}</span>
            <span class="toast-message">${message}</span>
            <span class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></span>
        `;
        container.appendChild(toast);
        setTimeout(() => { if (toast.parentElement) toast.remove(); }, 3000);
    },

    initToasts() {
        if (!document.querySelector('.toast-container')) {
            const container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
    },

    initProductCards() {
        document.querySelectorAll('[data-add-cart]').forEach(btn => {
            btn.addEventListener('click', () => this.addToCart(parseInt(btn.dataset.addCart)));
        });
        document.querySelectorAll('[data-wishlist]').forEach(btn => {
            const id = parseInt(btn.dataset.wishlist);
            const isWished = this.wishlist.includes(id);
            btn.classList.toggle('wishlisted', isWished);
            btn.innerHTML = isWished ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
            btn.addEventListener('click', () => this.toggleWishlist(id));
        });
    },

    initFaqs() {
        document.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.parentElement;
                const answer = item.querySelector('.faq-answer');
                const inner = answer.querySelector('.faq-answer-inner');
                const isActive = item.classList.contains('active');
                document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.faq-answer').style.maxHeight = '0';
                });
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = inner.scrollHeight + 'px';
                }
            });
        });
    },

    initNewsletter() {
        const forms = document.querySelectorAll('.newsletter-form');
        forms.forEach(form => {
            form.addEventListener('submit', e => {
                e.preventDefault();
                const input = form.querySelector('input[type="email"]');
                if (input && input.value) {
                    this.showToast('Thanks for subscribing! Check your email for 10% off.');
                    input.value = '';
                }
            });
        });
    },

    initCountdown() {
        const timerEl = document.getElementById('promo-timer');
        if (!timerEl) return;
        const end = new Date();
        end.setHours(end.getHours() + 24);
        const update = () => {
            const now = new Date();
            const diff = Math.max(0, end - now);
            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            timerEl.innerHTML = `
                <div class="time-box"><span class="num">${String(h).padStart(2,'0')}</span><span class="label">Hours</span></div>
                <div class="time-box"><span class="num">${String(m).padStart(2,'0')}</span><span class="label">Mins</span></div>
                <div class="time-box"><span class="num">${String(s).padStart(2,'0')}</span><span class="label">Secs</span></div>
            `;
        };
        update();
        setInterval(update, 1000);
    },

    scrollToHash() {
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
