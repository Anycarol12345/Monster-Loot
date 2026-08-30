/* ===============================================
   MONSTER LOOT - Lógica da Loja
   =============================================== */

const PRODUCTS = [
    {
        id: 'froggit-keychain',
        name: 'Froggit Chaveiro',
        desc: '* Froggit não entende o que está acontecendo, mas faz o melhor que pode.',
        longDesc: '* Um chaveiro de borracha macia com o formato do Froggit, o monstro mais amigável das Ruínas.\n* Ele não entende muito bem o que você está dizendo, mas está fazendo o melhor que pode.\n* Acompanha argola metálica reforçada e brilha levemente no escuro.',
        price: 200,
        boss: 'froggit',
        sprite: 'assets/sprites/bosses/froggit.png',
        scale: 4,
        images: [],
        specs: {
            'Origem': 'Ruínas',
            'Material': 'Borracha PVC',
            'Dimensões': '5 x 5 cm',
            'Peso': '30 g',
            'Raridade': 'Comum'
        }
    },
    {
        id: 'napsta-vinyl',
        name: 'Napstablook Vinyl',
        desc: '* Um disco de vinil com as melhores faixas fantasmagóricas do Underground.',
        longDesc: '* Disco de vinil 12" prensado em vinil translúcido, com as melhores faixas do DJ fantasma mais tímido do Underground.\n* Inclui a faixa oculta "Spooktune" e o remix "Ghouliday".\n* oh... você comprou mesmo... obrigado... isso significa muito...',
        price: 350,
        boss: 'napstablook',
        sprite: 'assets/sprites/bosses/napstablook.png',
        scale: 3,
        images: [],
        specs: {
            'Origem': 'Ruínas',
            'Formato': 'Vinil 12" 33 RPM',
            'Faixas': '8 + 1 oculta',
            'Peso': '180 g',
            'Raridade': 'Incomum'
        }
    },
    {
        id: 'toriel-pie',
        name: 'Torta da Toriel',
        desc: '* Torta de Butterscotch-Cinnamon. Feita com muito carinho materno.',
        longDesc: '* Torta artesanal de butterscotch com canela, assada na lareira da casa das Ruínas.\n* Restaura HP completo e aquece o coração de qualquer humano perdido.\n* Preparada com muito carinho. Não pergunte sobre os caracóis.',
        price: 500,
        boss: 'toriel',
        sprite: 'assets/sprites/bosses/toriel.png',
        scale: 2,
        images: [],
        specs: {
            'Origem': 'Ruínas',
            'Sabor': 'Butterscotch-Canela',
            'Validade': '7 dias',
            'Cura': 'HP máximo',
            'Raridade': 'Rara'
        }
    },
    {
        id: 'papyrus-figure',
        name: 'Papyrus Action Figure',
        desc: '* NYEH HEH HEH! Uma réplica perfeita do GRANDE PAPYRUS!',
        longDesc: '* NYEH HEH HEH! CONTEMPLE! UMA RÉPLICA EM ESCALA DO GRANDE PAPYRUS!\n* Figura articulada com 12 pontos de movimento, cachecol de tecido real e acessórios: um prato de espaguete e dois ossos de ataque.\n* ACOMPANHA BASE DE EXIBIÇÃO COM O EMBLEMA DA GUARDA REAL!',
        price: 750,
        boss: 'papyrus',
        sprite: 'assets/sprites/bosses/papyrus.png',
        scale: 1.5,
        images: [],
        specs: {
            'Origem': 'Snowdin',
            'Material': 'PVC + ABS',
            'Altura': '18 cm',
            'Articulações': '12 pontos',
            'Raridade': 'Rara'
        }
    },
    {
        id: 'undyne-spear',
        name: 'Lança da Undyne',
        desc: '* Uma réplica da lança energética. NGAHHH!! incluído.',
        longDesc: '* Réplica em tamanho real da lança de energia da Capitã da Guarda Real.\n* Haste de alumínio com ponta em resina translúcida e LED azul integrado.\n* NGAHHH!! Não use para desafiar seus vizinhos para um duelo. (Ela faria isso.)',
        price: 850,
        boss: 'undyne',
        sprite: 'assets/sprites/bosses/undyne.png',
        scale: 1.8,
        images: [],
        specs: {
            'Origem': 'Waterfall',
            'Material': 'Alumínio + Resina',
            'Comprimento': '150 cm',
            'Iluminação': 'LED azul',
            'Raridade': 'Épica'
        }
    },
    {
        id: 'sans-plush',
        name: 'Sans Pelúcia',
        desc: '* o esqueleto mais preguiçoso do underground. vem com ketchup.',
        longDesc: '* uma pelúcia bem macia do esqueleto mais preguiçoso do underground.\n* perfeita pra tirar um cochilo. ou pra colocar na sua estação de sentinela e fingir que você tá trabalhando.\n* acompanha um frasco de ketchup em miniatura. de nada.',
        price: 999,
        boss: 'sans',
        sprite: 'assets/sprites/bosses/sans_face.png',
        scale: 4,
        images: [],
        specs: {
            'Origem': 'Snowdin',
            'Material': 'Poliéster / Algodão',
            'Altura': '30 cm',
            'Acessórios': 'Ketchup',
            'Raridade': 'Lendária'
        }
    },
    {
        id: 'flowey-pot',
        name: 'Flowey no Vaso',
        desc: '* Neste mundo, é matar ou morrer. Mas neste caso... é comprar ou morrer.',
        longDesc: '* Uma linda flor dourada em vaso de cerâmica pintado à mão.\n* Perfeita para decorar sua mesa e observar cada movimento seu.\n* Neste mundo, é MATAR ou MORRER. Mas relaxa... essa aqui é só um enfeite. Provavelmente.',
        price: 666,
        boss: 'flowey',
        sprite: 'assets/sprites/bosses/flowey.png',
        scale: 3,
        images: [],
        specs: {
            'Origem': 'Ruínas',
            'Material': 'Cerâmica + Seda',
            'Altura': '22 cm',
            'Cuidados': 'Não regar',
            'Raridade': 'Épica'
        }
    },
    {
        id: 'mettaton-figure',
        name: 'Mettaton EX Figure',
        desc: '* OH YES! A estrela do Underground em forma colecionável.',
        longDesc: '* OH YES! A ESTRELA MAIS BRILHANTE DO UNDERGROUND, AGORA NA SUA ESTANTE!\n* Figura premium com pintura metálica, pernas articuladas e base giratória com holofotes de LED.\n* Edição limitada numerada. As ratings vão explodir, querido!',
        price: 1200,
        boss: 'mettaton',
        sprite: 'assets/sprites/bosses/mettaton_ex.png',
        scale: 3,
        images: [],
        specs: {
            'Origem': 'Hotland',
            'Material': 'PVC metalizado',
            'Altura': '25 cm',
            'Extras': 'Base giratória LED',
            'Raridade': 'Lendária'
        }
    }
];

let cart = [];
let toastTimeout = null;
let currentProduct = null;
let detailQty = 1;

function init() {
    loadCart();
    renderProducts();
    updateCartUI();
    initAudio();
}

// ========== PRODUCTS ==========

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    PRODUCTS.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openProduct(product.id);
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
                            onclick="event.stopPropagation(); addToCart('${product.id}')">
                        + CARRINHO
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ========== PRODUCT DETAIL ==========

function openProduct(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    currentProduct = product;
    detailQty = 1;
    renderProductDetail();
    showSection('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderProductDetail() {
    const p = currentProduct;
    if (!p) return;

    const gallery = p.images.length > 0 ? p.images : [p.sprite];
    const placeholders = Math.max(0, 4 - gallery.length);

    const thumbs = gallery.map((src, i) => `
        <div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="setMainImage('${src}', this)">
            <img src="${src}" alt="${p.name} ${i + 1}">
        </div>
    `).join('') + Array.from({ length: placeholders }, () =>
        `<div class="gallery-thumb placeholder">?</div>`
    ).join('');

    const specs = Object.entries(p.specs).map(([key, value]) => `
        <div class="spec-row">
            <span class="spec-key">${key}</span>
            <span class="spec-value">${value}</span>
        </div>
    `).join('');

    const descLines = p.longDesc.split('\n').map(l => `<p>${l}</p>`).join('');

    document.getElementById('detail-layout').innerHTML = `
        <div class="detail-gallery">
            <div class="gallery-main" id="gallery-main">
                <img src="${gallery[0]}" alt="${p.name}" style="transform: scale(${p.scale})">
            </div>
            <div class="gallery-thumbs">${thumbs}</div>
        </div>

        <div class="detail-info">
            <h2 class="detail-name">${p.name}</h2>
            <div class="detail-price"><small>G</small> ${p.price}</div>
            <div class="detail-desc">${descLines}</div>

            <div class="detail-specs">
                <h3>✦ ESPECIFICAÇÕES ✦</h3>
                ${specs}
            </div>

            <div class="detail-warning">
                <strong>⚠ AVISO:</strong> Este item é protegido por
                <strong>${p.boss.toUpperCase()}</strong>.
                Ao finalizar a compra, você poderá ser desafiado para um combate.
            </div>

            <div class="detail-actions">
                <div class="qty-selector">
                    <button onclick="changeDetailQty(-1)">-</button>
                    <span id="detail-qty">${detailQty}</span>
                    <button onclick="changeDetailQty(1)">+</button>
                </div>
                <button class="detail-add-btn" onclick="addDetailToCart()">
                    ♥ ADICIONAR AO CARRINHO
                </button>
            </div>
        </div>
    `;
}

function setMainImage(src, thumbEl) {
    const main = document.getElementById('gallery-main');
    if (main) main.querySelector('img').src = src;

    document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
    if (thumbEl) thumbEl.classList.add('active');
}

function changeDetailQty(delta) {
    detailQty = Math.max(1, Math.min(99, detailQty + delta));
    const el = document.getElementById('detail-qty');
    if (el) el.textContent = detailQty;
}

function addDetailToCart() {
    if (!currentProduct) return;
    for (let i = 0; i < detailQty; i++) addToCart(currentProduct.id, true);
    showToast(`* ${detailQty}x ${currentProduct.name} adicionado ao carrinho!`);
}

// ========== CART ==========

function addToCart(productId, silent) {
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

    if (silent) return;

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
        localStorage.setItem('monsterloot-cart', JSON.stringify(cart));
    } catch (e) { /* localStorage indisponível */ }
}

function loadCart() {
    try {
        const saved = localStorage.getItem('monsterloot-cart');
        if (saved) {
            cart = JSON.parse(saved);
            if (!Array.isArray(cart)) cart = [];
        }
    } catch (e) {
        cart = [];
    }
}

// ========== BACKGROUND MUSIC ==========

let audioEl = null;
let audioUnlocked = false;

function initAudio() {
    audioEl = document.getElementById('bg-music');
    if (!audioEl) return;

    let volume = 40;
    try {
        const saved = localStorage.getItem('monsterloot-volume');
        if (saved !== null) volume = parseInt(saved, 10);
    } catch (e) { /* ignore */ }

    const slider = document.getElementById('volume-slider');
    if (slider) slider.value = volume;
    audioEl.volume = volume / 100;

    // Navegadores bloqueiam autoplay: inicia no primeiro gesto do usuário
    audioEl.play().then(() => {
        audioUnlocked = true;
        updateMusicIcon();
    }).catch(() => {
        updateMusicIcon();
        const unlock = () => {
            if (audioUnlocked) return;
            audioEl.play().then(() => {
                audioUnlocked = true;
                updateMusicIcon();
            }).catch(() => {});
            document.removeEventListener('click', unlock);
            document.removeEventListener('keydown', unlock);
        };
        document.addEventListener('click', unlock);
        document.addEventListener('keydown', unlock);
    });
}

function toggleMusic() {
    if (!audioEl) return;

    if (audioEl.paused) {
        audioEl.play().then(() => { audioUnlocked = true; }).catch(() => {});
    } else {
        audioEl.pause();
    }
    setTimeout(updateMusicIcon, 50);
}

function setVolume(value) {
    if (!audioEl) return;

    audioEl.volume = value / 100;
    try {
        localStorage.setItem('monsterloot-volume', value);
    } catch (e) { /* ignore */ }

    if (value > 0 && audioEl.paused && audioUnlocked) {
        audioEl.play().catch(() => {});
    }
    updateMusicIcon();
}

function updateMusicIcon() {
    const btn = document.getElementById('music-btn');
    const icon = document.getElementById('music-icon');
    if (!btn || !icon || !audioEl) return;

    const silent = audioEl.paused || audioEl.volume === 0;
    icon.textContent = silent ? '▶' : '♪';
    btn.classList.toggle('muted', silent);
}

// ========== NAVIGATION ==========

function showSection(section) {
    document.getElementById('section-shop').classList.toggle('hidden', section !== 'shop');
    document.getElementById('section-about').classList.toggle('hidden', section !== 'about');
    document.getElementById('section-product').classList.toggle('hidden', section !== 'product');
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

        if (audioEl && !audioEl.paused) {
            audioEl.pause();
            audioEl.dataset.resumeAfterBattle = 'true';
            updateMusicIcon();
        }

        if (typeof window.startBattle === 'function') {
            window.startBattle(bossKey, cartForBattle, onBattleWin, onBattleLose);
        } else {
            console.error('Battle system not loaded');
            overlay.classList.remove('active');
            resumeMusic();
            showResult(true);
        }
    }, 400);
}

function resumeMusic() {
    if (!audioEl) return;
    if (audioEl.dataset.resumeAfterBattle === 'true') {
        delete audioEl.dataset.resumeAfterBattle;
        audioEl.play().catch(() => {});
        setTimeout(updateMusicIcon, 50);
    }
}

function onBattleWin() {
    document.getElementById('battle-overlay').classList.remove('active');
    resumeMusic();
    showResult(true);
}

function onBattleLose() {
    document.getElementById('battle-overlay').classList.remove('active');
    resumeMusic();
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
