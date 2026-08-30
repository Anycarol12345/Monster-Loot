/* ===============================================
   UNDERVENDA - Lógica da Loja
   =============================================== */

const PRODUCTS = [
    {
        id: 'froggit-keychain',
        name: 'Froggit Chaveiro',
        desc: '* Froggit não entende muito bem o que está acontecendo, mas está fazendo o melhor que pode.',
        price: 200,
        boss: 'froggit',
        sprite: 'assets/sprites/bosses/froggit.png',
        scale: 4
    },
    {
        id: 'napsta-vinyl',
        name: 'Napstablook Vinyl',
        desc: '* Um disco de vinil com as melhores faixas fantasmagóricas do Underground.',
        price: 350,
        boss: 'napstablook',
        sprite: 'assets/sprites/bosses/napstablook.png',
        scale: 3
    },
    {
        id: 'toriel-pie',
        name: 'Torta da Toriel',
        desc: '* Torta de Butterscotch-Cinnamon. Feita com muito carinho materno.',
        price: 500,
        boss: 'toriel',
        sprite: 'assets/sprites/bosses/toriel.png',
        scale: 2
    },
    {
        id: 'papyrus-figure',
        name: 'Papyrus Action Figure',
        desc: '* NYEH HEH HEH! Uma réplica perfeita do GRANDE PAPYRUS!',
        price: 750,
        boss: 'papyrus',
        sprite: 'assets/sprites/bosses/papyrus.png',
        scale: 1.5
    },
    {
        id: 'undyne-spear',
        name: 'Lança da Undyne',
        desc: '* Uma réplica da lança energética. NGAHHH!! incluído.',
        price: 850,
        boss: 'undyne',
        sprite: 'assets/sprites/bosses/undyne.png',
        scale: 1.8
    },
    {
        id: 'sans-plush',
        name: 'Sans Pelúcia',
        desc: '* o esqueleto mais preguiçoso do underground. vem com ketchup.',
        price: 999,
        boss: 'sans',
        sprite: 'assets/sprites/bosses/sans_face.png',
        scale: 4
    },
    {
        id: 'flowey-pot',
        name: 'Flowey no Vaso',
        desc: '* Neste mundo, é matar ou morrer. Mas neste caso... é comprar ou morrer.',
        price: 666,
        boss: 'flowey',
        sprite: 'assets/sprites/bosses/flowey.png',
        scale: 3
    },
    {
        id: 'mettaton-figure',
        name: 'Mettaton EX Figure',
        desc: '* OH YES! A estrela do Underground em forma colecionável.',
        price: 1200,
        boss: 'mettaton',
        sprite: 'assets/sprites/bosses/mettaton_ex.png',
        scale: 3
    }
];

let cart = [];
let toastTimeout = null;

function init() {
    loadCart();
    renderProducts();
    updateCartUI();
}

// ========== PRODUCTS ==========

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    PRODUCTS.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.sprite}"
                     alt="${product.name}"
                     style="transform: scale(${product.scale})"
                     loading="lazy">
                <span class="product-boss-tag">BOSS: ${product.boss.toUpperCase()}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price}</span>
                    <button class="add-to-cart-btn"
                            id="btn-${product.id}"
                            onclick="addToCart('${product.id}')">
                        + CARRINHO
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ========== CART ==========

function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id: productId, qty: 1 });
    }

    saveCart();
    updateCartUI();

    const btn = document.getElementById(`btn-${productId}`);
    if (btn) {
        btn.classList.add('added');
        btn.textContent = '♥ ADICIONADO';
        setTimeout(() => {
            btn.classList.remove('added');
            btn.textContent = '+ CARRINHO';
        }, 800);
    }

    showToast(`* ${product.name} adicionado ao carrinho!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    updateCartUI();
}

function getCartTotal() {
    return cart.reduce((sum, item) => {
        const product = PRODUCTS.find(p => p.id === item.id);
        return sum + (product ? product.price * item.qty : 0);
    }, 0);
}

function getCartItems() {
    return cart.map(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        return product ? { ...product, qty: item.qty } : null;
    }).filter(Boolean);
}

function updateCartUI() {
    const countEl = document.getElementById('cart-count');
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total-value');
    const checkoutBtn = document.getElementById('checkout-btn');

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    countEl.textContent = totalQty;

    if (cart.length === 0) {
        itemsEl.innerHTML = '<p class="cart-empty">* O carrinho está vazio...</p>';
        checkoutBtn.disabled = true;
    } else {
        itemsEl.innerHTML = '';
        cart.forEach(item => {
            const product = PRODUCTS.find(p => p.id === item.id);
            if (!product) return;

            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <div class="cart-item-sprite">
                    <img src="${product.sprite}" alt="${product.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-price">G ${product.price * item.qty}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="cart-qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
                    <span class="cart-item-qty">${item.qty}</span>
                    <button class="cart-qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">✕</button>
                </div>
            `;
            itemsEl.appendChild(el);
        });
        checkoutBtn.disabled = false;
    }

    totalEl.textContent = `G ${getCartTotal()}`;
}

// ========== PERSISTENCE ==========

function saveCart() {
    try {
        localStorage.setItem('undervenda-cart', JSON.stringify(cart));
    } catch (e) { /* localStorage indisponível */ }
}

function loadCart() {
    try {
        const saved = localStorage.getItem('undervenda-cart');
        if (saved) {
            cart = JSON.parse(saved);
            if (!Array.isArray(cart)) cart = [];
        }
    } catch (e) {
        cart = [];
    }
}

// ========== NAVIGATION ==========

function showSection(section) {
    document.getElementById('section-shop').classList.toggle('hidden', section !== 'shop');
    document.getElementById('section-about').classList.toggle('hidden', section !== 'about');
    document.getElementById('hero').classList.toggle('hidden', section !== 'shop');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === section);
    });
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    const isOpen = sidebar.classList.contains('open');

    sidebar.classList.toggle('open', !isOpen);
    overlay.classList.toggle('open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
}

// ========== CHECKOUT → BATTLE ==========

function checkout() {
    toggleCart();

    const items = getCartItems();
    if (items.length === 0) return;

    const bosses = [...new Set(items.map(i => i.boss))];
    const bossKey = bosses[Math.floor(Math.random() * bosses.length)];

    const cartForBattle = items.map(i => ({
        name: i.name,
        price: i.price,
        qty: i.qty
    }));

    setTimeout(() => {
        const overlay = document.getElementById('battle-overlay');
        overlay.classList.add('active');

        if (typeof window.startBattle === 'function') {
            window.startBattle(bossKey, cartForBattle, onBattleWin, onBattleLose);
        } else {
            console.error('Battle system not loaded');
            overlay.classList.remove('active');
            showResult(true);
        }
    }, 400);
}

function onBattleWin() {
    const overlay = document.getElementById('battle-overlay');
    overlay.classList.remove('active');
    showResult(true);
}

function onBattleLose() {
    const overlay = document.getElementById('battle-overlay');
    overlay.classList.remove('active');
    showResult(false);
}

function showResult(success) {
    const screen = document.getElementById('result-screen');
    const content = document.getElementById('result-content');

    if (success) {
        const total = getCartTotal();
        content.innerHTML = `
            <div class="result-success">
                <h2>♥ COMPRA FINALIZADA ♥</h2>
                <p>* Você venceu a batalha!</p>
                <p>* Seus itens serão enviados para o Underground.</p>
                <p style="color: #ffff00; margin-top: 16px;">Total: G ${total}</p>
                <br>
                <button class="result-btn primary" onclick="finishPurchase()">CONTINUAR</button>
            </div>
        `;
        cart = [];
        saveCart();
        updateCartUI();
    } else {
        content.innerHTML = `
            <div class="result-fail">
                <h2 style="color: #ff0000;">GAME OVER</h2>
                <p>* Você não sobreviveu à batalha...</p>
                <p>* Mas não desista! Tente novamente.</p>
                <br>
                <button class="result-btn" onclick="retryPurchase()">TENTAR NOVAMENTE</button>
                <button class="result-btn" onclick="closeResult()">VOLTAR À LOJA</button>
            </div>
        `;
    }

    screen.classList.add('active');
}

function finishPurchase() {
    closeResult();
    showToast('* Obrigado pela compra! ♥');
}

function retryPurchase() {
    closeResult();
    checkout();
}

function closeResult() {
    document.getElementById('result-screen').classList.remove('active');
}

// ========== TOAST ==========

function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ========== INIT ==========

document.addEventListener('DOMContentLoaded', init);
