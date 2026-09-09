/* ===============================================
   MONSTER LOOT - Lógica da Loja
   =============================================== */

function productImages(folder, count) {
    return Array.from({ length: count }, (_, i) =>
        `assets/img/products/${folder}/${String(i + 1).padStart(2, '0')}.jpg`
    );
}

const PRODUCTS = [
    {
        id: 'human-figure',
        name: 'Figura The Human',
        desc: '* Frisk em PVC, com graveto na mão e base oficial Fangamer.',
        longDesc: '* Figura colecionável THE HUMAN: Frisk com o suéter azul de listras rosa, graveto na mão e base circular preta.\n* Inclui a marcação oficial na base: UNDERTALE, Fangamer e Happy Worker.\n* Também fotografada na edição Hot Dog Stack, equilibrando uma torre de hot dogs em Snowdin.',
        price: 200,
        boss: 'froggit',
        images: productImages('human-figure', 4),
        specs: {
            'Origem': 'Ruínas',
            'Material': 'PVC',
            'Personagem': 'Frisk',
            'Base': 'Circular preta',
            'Raridade': 'Rara'
        }
    },
    {
        id: 'napsta-vinyl',
        name: 'Vinil Chitei de Chill',
        desc: '* Disco duplo do 10º aniversário. Napstablook no comando do set.',
        longDesc: '* UNDERTALE: Chitei de Chill — vinil duplo de aniversário com capa ilustrada do Underground em modo relax.\n* Napstablook DJa na sala enquanto Sans cochila, Papyrus chega com espaguete e Frisk assiste no tapete.\n* oh... você comprou mesmo... obrigado... isso significa muito...',
        price: 350,
        boss: 'napstablook',
        images: productImages('chitei-vinyl', 1),
        specs: {
            'Origem': 'Ruínas',
            'Formato': 'Vinil duplo 12"',
            'Edição': '10º aniversário',
            'Selo': 'Square Enix / Toby Fox',
            'Raridade': 'Incomum'
        }
    },
    {
        id: 'toriel-kitchen',
        name: 'Kit Cozinha da Toriel',
        desc: '* Luva, descanso e avental Delta Rune. A torta é por sua conta.',
        longDesc: '* Kit de cozinha inspirado na casa das Ruínas: luva pelúcia da Toriel, descanso de panela Delta Rune e avental roxo com o símbolo da família.\n* A assadeira ilustrada entra na foto com uma torta de butterscotch-canela recém-saída do forno.\n* Preparado com muito carinho. Não pergunte sobre os caracóis.',
        price: 500,
        boss: 'toriel',
        images: productImages('toriel-kitchen', 2),
        specs: {
            'Origem': 'Ruínas',
            'Itens': 'Luva, descanso, avental',
            'Tema': 'Delta Rune',
            'Uso': 'Cozinha',
            'Raridade': 'Rara'
        }
    },
    {
        id: 'papyrus-plush',
        name: 'Pelúcia Papyrus',
        desc: '* NYEH HEH HEH! O GRANDE PAPYRUS, agora abraçável!',
        longDesc: '* NYEH HEH HEH! CONTEMPLE! UMA PELÚCIA EM ESCALA DO GRANDE PAPYRUS!\n* Caveira costurada com o sorriso triunfante, cachecol laranja e o espírito inabalável da Guarda Real.\n* PERFEITO PARA TREINOS DE PUZZLE NO GRAMADO!',
        price: 750,
        boss: 'papyrus',
        images: productImages('papyrus-plush', 1),
        specs: {
            'Origem': 'Snowdin',
            'Material': 'Pelúcia',
            'Personagem': 'Papyrus',
            'Destaque': 'Cachecol laranja',
            'Raridade': 'Rara'
        }
    },
    {
        id: 'collectors-edition',
        name: "Collector's Edition",
        desc: '* Caixa, relicário musical, trilha, partitura e o jogo físico.',
        longDesc: '* A Collector\'s Edition oficial: caixa com relicário dourado Delta Rune, caixa de música "Best Friends Forever", trilha sonora, livreto de partituras e o jogo físico.\n* Versões Nintendo Switch e Xbox One fotografadas, com pano de microfibra exclusivo no pacote Switch.\n* O relicário toca. Você sente sua DETERMINAÇÃO aumentar.',
        price: 850,
        boss: 'undyne',
        images: productImages('collectors-edition', 10),
        specs: {
            'Origem': 'Underground',
            'Conteúdo': 'Caixa + relicário + OST',
            'Plataformas': 'Switch / Xbox One',
            'Extra': 'Pano de microfibra',
            'Raridade': 'Épica'
        }
    },
    {
        id: 'sans-hoodie',
        name: 'Moletom Sans',
        desc: '* zíper com caveira, capuz sherpa e forro de almas. heh.',
        longDesc: '* moletom azul zip-up do esqueleto mais preguiçoso do underground.\n* capuz com sherpa branca, pingente de caveira no zíper e forro interno com almas, ossos e estrelas.\n* perfeito pra fingir que você tá na sentinela. de nada.',
        price: 999,
        boss: 'sans',
        images: productImages('sans-hoodie', 2),
        specs: {
            'Origem': 'Snowdin',
            'Tipo': 'Moletom zip-up',
            'Detalhe': 'Zíper caveira',
            'Forro': 'Sherpa + almas',
            'Raridade': 'Lendária'
        }
    },
    {
        id: 'flowey-plush',
        name: 'Pelúcia Flowey',
        desc: '* Neste mundo, é matar ou morrer. Ou levar a flor pra casa.',
        longDesc: '* Pelúcia do Flowey no vasinho marrom, pétalas amarelas e aquele sorriso que não convence ninguém.\n* Perfeita para a mesa — e para observar cada movimento seu.\n* Neste mundo, é MATAR ou MORRER. Mas relaxa... essa aqui é só um enfeite. Provavelmente.',
        price: 666,
        boss: 'flowey',
        images: productImages('flowey-plush', 1),
        specs: {
            'Origem': 'Ruínas',
            'Material': 'Pelúcia',
            'Personagem': 'Flowey',
            'Base': 'Vaso de tecido',
            'Raridade': 'Épica'
        }
    },
    {
        id: 'mettaton-plush',
        name: 'Pelúcia Mettaton',
        desc: '* OH YES! A forma caixa da estrela, pronta para o palco.',
        longDesc: '* OH YES! METTATON NA FORMA CAIXA, AGORA DE PELÚCIA!\n* Grade vermelha e amarela, braços de palco e a pose perfeita em cima do piano.\n* As ratings vão explodir, querido!',
        price: 1200,
        boss: 'mettaton',
        images: productImages('mettaton-plush', 1),
        specs: {
            'Origem': 'Hotland',
            'Material': 'Pelúcia',
            'Forma': 'Caixa (Box Form)',
            'Destaque': 'Grade MTT',
            'Raridade': 'Lendária'
        }
    },
    {
        id: 'toriel-keychain',
        name: 'Chaveiro Toriel',
        desc: '* Mini Toriel em PVC, braços abertos e argola reforçada.',
        longDesc: '* Chaveiro 3D da Toriel em PVC: robe roxo, Delta Rune no peito e os braços abertos em boas-vindas.\n* Argola metálica reforçada. Cabe na palma da mão — e no coração, se você deixar.\n* Um pedaço das Ruínas para levar no bolso.',
        price: 180,
        boss: 'toriel',
        images: productImages('toriel-keychain', 3),
        specs: {
            'Origem': 'Ruínas',
            'Material': 'PVC + argola',
            'Personagem': 'Toriel',
            'Uso': 'Chaveiro',
            'Raridade': 'Comum'
        }
    },
    {
        id: 'sans-jacket',
        name: 'Jaqueta Souvenir Sans',
        desc: '* sukajan bordada com Gaster Blasters, ossos e o olho azul.',
        longDesc: '* jaqueta souvenir (sukajan) preta e branca com bordado denso do Sans, Gaster Blasters e chamas azuis.\n* zíper com puxador de osso, bolsos com detalhe ósseo e o verso inteiro em Grillby\'s energy.\n* heh. essa aqui não é pra dormir no posto. ou é?',
        price: 1500,
        boss: 'sans',
        images: productImages('sans-jacket', 5),
        specs: {
            'Origem': 'Snowdin',
            'Tipo': 'Jaqueta souvenir',
            'Bordado': 'Sans + Gaster Blaster',
            'Detalhe': 'Zíper de osso',
            'Raridade': 'Lendária'
        }
    },
    {
        id: 'sans-pet-hoodie',
        name: 'Moletom Pet Sans',
        desc: '* o mesmo azul, agora no tamanho do seu cão sentinela.',
        longDesc: '* moletom zip-up azul para pets, com capuz cinza, pingente de caveira e forro de almas.\n* fotografado em labrador sentado e em pé — porque até o cão merece um turno na sentinela.\n* inclui a calça preta do conjunto. heh.',
        price: 420,
        boss: 'sans',
        images: productImages('sans-pet-hoodie', 2),
        specs: {
            'Origem': 'Snowdin',
            'Tipo': 'Moletom pet',
            'Público': 'Cães',
            'Detalhe': 'Zíper caveira',
            'Raridade': 'Incomum'
        }
    },
    {
        id: 'toriel-plush',
        name: 'Pelúcia Toriel',
        desc: '* A cabra mais acolhedora das Ruínas, com robe e Delta Rune.',
        longDesc: '* Pelúcia da Toriel sentada: orelhas longas, robe roxo e o Delta Rune bordado no peito.\n* Macia o suficiente para um abraço depois de cair no Underground.\n* Minha criança, você quer um pouco de torta?',
        price: 720,
        boss: 'toriel',
        images: productImages('toriel-plush', 1),
        specs: {
            'Origem': 'Ruínas',
            'Material': 'Pelúcia',
            'Personagem': 'Toriel',
            'Pose': 'Sentada',
            'Raridade': 'Rara'
        }
    },
    {
        id: 'temmie-plush',
        name: 'Pelúcia Temmie',
        desc: '* hOI!!!!! tem... pelúcia. na caixa. (paga a faculdade.)',
        longDesc: '* Pelúcia da Temmie no suéter azul e amarelo, orelhas em dobro e a língua de fora.\n* Fotografada dentro de uma caixa de papelão — como convém à Temmie Village.\n* hOI! tem dinheiro da faculdade? (boa sorte.)',
        price: 480,
        boss: 'undyne',
        images: productImages('temmie-plush', 1),
        specs: {
            'Origem': 'Waterfall',
            'Material': 'Pelúcia',
            'Personagem': 'Temmie',
            'Roupa': 'Suéter listrado',
            'Raridade': 'Incomum'
        }
    },
    {
        id: 'napsta-pillow',
        name: 'Almofada Napstablook',
        desc: '* oh... uma almofada fantasma... se quiser...',
        longDesc: '* Almofada pelúcia do Napstablook: branca, alongada, com os olhos tristes e a boca em arco para baixo.\n* oh... você realmente quer isso na sua cama...? tudo bem... obrigado...\n* Combina com noites de Spooktune no volume baixo.',
        price: 310,
        boss: 'napstablook',
        images: productImages('napsta-pillow', 1),
        specs: {
            'Origem': 'Ruínas',
            'Tipo': 'Almofada pelúcia',
            'Personagem': 'Napstablook',
            'Formato': 'Fantasma',
            'Raridade': 'Incomum'
        }
    },
    {
        id: 'papyrus-plate',
        name: 'Prato Master Chef Papyrus',
        desc: '* NYEH! Silken spaghetti, finely aged in an oaken cask...',
        longDesc: '* Prato de cerâmica Master Chef Papyrus, com o grande esqueleto sobre uma montanha de espaguete.\n* Texto no bordo: "Silken spaghetti, finely aged in an oaken cask... Then cooked by me, Master Chef Papyrus!"\n* O Annoying Dog aparece escondido na borda. NYEH HEH HEH!',
        price: 260,
        boss: 'papyrus',
        images: productImages('papyrus-plate', 1),
        specs: {
            'Origem': 'Snowdin',
            'Material': 'Cerâmica',
            'Tipo': 'Prato raso',
            'Tema': 'Master Chef Papyrus',
            'Raridade': 'Incomum'
        }
    },
    {
        id: 'lesser-dog',
        name: 'Figura Lesser Dog',
        desc: '* O pescoço cresce. A lealdade também. Armor inclusa.',
        longDesc: '* Figura do Lesser Dog em armadura da Guarda Real, escudo e espada, no cenário nevado de Snowdin.\n* O pescoço alongado é o ponto do colecionável — quanto mais você acaricia, mais ele cresce.\n* (Você acariciou o Lesser Dog.)',
        price: 640,
        boss: 'papyrus',
        images: productImages('lesser-dog', 1),
        specs: {
            'Origem': 'Snowdin',
            'Material': 'PVC',
            'Personagem': 'Lesser Dog',
            'Acessórios': 'Escudo e espada',
            'Raridade': 'Rara'
        }
    },
    {
        id: 'greater-dog',
        name: 'Figura Greater Dog',
        desc: '* Armadura, escudo Delta Rune e a língua para fora.',
        longDesc: '* Figura do Greater Dog em armadura cinza, escudo com Delta Rune e espada erguida.\n* A língua de fora é obrigatória. A base preta também.\n* Um bom cão. Um ótimo cão. O Greater Dog.',
        price: 680,
        boss: 'papyrus',
        images: productImages('greater-dog', 1),
        specs: {
            'Origem': 'Snowdin',
            'Material': 'PVC',
            'Personagem': 'Greater Dog',
            'Acessórios': 'Escudo Delta Rune',
            'Raridade': 'Rara'
        }
    },
    {
        id: 'undertale-tee',
        name: 'Camiseta Elenco UNDERTALE',
        desc: '* O elenco inteiro em uma estampa. Undyne segura a lança.',
        longDesc: '* Camiseta com o retrato coletivo do Underground: Sans no trombone, Papyrus, Undyne com a lança, Alphys, Mettaton, Toriel, Frisk e o Annoying Dog.\n* Disponível no mockup unissex e no corte women\'s, ambas em vermelho.\n* Asgore observa do fundo. Como sempre.',
        price: 320,
        boss: 'undyne',
        images: productImages('undertale-tee', 2),
        specs: {
            'Origem': 'Underground',
            'Tipo': 'Camiseta',
            'Cortes': 'Unissex / Women\'s',
            'Estampa': 'Elenco completo',
            'Raridade': 'Incomum'
        }
    },
    {
        id: 'annoying-dog-pillow',
        name: 'Almofada Annoying Dog',
        desc: '* O cão pixelado. Rouba a trilha sonora e o sofá.',
        longDesc: '* Almofada em silhueta pixel do Annoying Dog, branca com contorno preto blocado.\n* Feita para o sofá — e para desaparecer com o cartucho quando você menos espera.\n* (O cão está carregando a trilha sonora.)',
        price: 290,
        boss: 'froggit',
        images: productImages('annoying-dog-pillow', 1),
        specs: {
            'Origem': 'Snowdin',
            'Tipo': 'Almofada pixel',
            'Personagem': 'Annoying Dog',
            'Estilo': 'Sprite 8-bit',
            'Raridade': 'Incomum'
        }
    },
    {
        id: 'physical-edition',
        name: 'UNDERTALE Edição Física',
        desc: '* PC, PS4, Xbox One e Switch. O mesmo logo, quatro capas.',
        longDesc: '* Edição física oficial do UNDERTALE nas quatro plataformas: PC, PlayStation 4, Xbox One e Nintendo Switch.\n* Capa preta com o logo pixelado e a silhueta da cidade no rodapé.\n* A versão PS4 inclui o livreto ilustrado. Sem conteúdo extra. (Essa é a piada.)',
        price: 400,
        boss: 'undyne',
        images: productImages('physical-edition', 2),
        specs: {
            'Origem': 'Underground',
            'Plataformas': 'PC / PS4 / Xbox / Switch',
            'Tipo': 'Jogo físico',
            'Capa': 'Logo + cityscape',
            'Raridade': 'Rara'
        }
    },
    {
        id: 'embossed-mug',
        name: 'Caneca Annoying Dog',
        desc: '* Relevo branco: o cão no carrinho, patas e ossos.',
        longDesc: '* Caneca de cerâmica branca com relevo do Annoying Dog no carrinho, pegadas e ossos ao redor.\n* O desenho só aparece na luz — como o cão, quando quer ser visto.\n* Lavável. O cão, infelizmente, não.',
        price: 160,
        boss: 'froggit',
        images: productImages('embossed-mug', 1),
        specs: {
            'Origem': 'Snowdin',
            'Material': 'Cerâmica',
            'Tipo': 'Caneca em relevo',
            'Tema': 'Annoying Dog',
            'Raridade': 'Comum'
        }
    },
    {
        id: 'toriel-tee',
        name: 'Camiseta Toriel',
        desc: '* Toriel entre pétalas douradas, no canto da camiseta vermelha.',
        longDesc: '* Camiseta vermelha com a Toriel em perfil, sobre um tapete de pétalas douradas no canto inferior.\n* Mockup unissex e women\'s. Discreta o suficiente para um passeio nas Ruínas.\n* Você quer mesmo ir embora, minha criança?',
        price: 300,
        boss: 'toriel',
        images: productImages('toriel-tee', 1),
        specs: {
            'Origem': 'Ruínas',
            'Tipo': 'Camiseta',
            'Cortes': 'Unissex / Women\'s',
            'Estampa': 'Toriel + pétalas',
            'Raridade': 'Incomum'
        }
    }
];

let cart = [];
let toastTimeout = null;
let currentProduct = null;
let detailQty = 1;
let pendingPurchase = null;
// Um combate por vez. `battleActive` cobre também os 400ms entre o clique e o
// início da luta, e `resultClosedAt` evita que um clique duplo no botão da
// tela de resultado atravesse e dispare outro combate no que está embaixo.
let battleActive = false;
let resultClosedAt = 0;

function init() {
    loadCart();
    initCurrency();
    renderProducts();
    updateCartUI();
    initAudio();
}

// ========== CURRENCY ==========
// Os preços dos produtos são armazenados em G (gold do Underground).
// As taxas abaixo são fixas e convertem G → moeda escolhida; nenhuma
// API externa é consultada.

const CURRENCIES = {
    BRL: { label: 'R$ BRL', locale: 'pt-BR', rate: 0.10 },
    USD: { label: '$ USD',  locale: 'en-US', rate: 0.02 },
    EUR: { label: '€ EUR',  locale: 'de-DE', rate: 0.018 },
    // Easter egg: última moeda da lista, a original do jogo.
    G:   { label: '♥ G',    locale: null,    rate: 1, easterEgg: true },
};

const DEFAULT_CURRENCY = 'USD';

let currency = DEFAULT_CURRENCY;

// Detecta a moeda regional pelo fuso horário e, como reserva, pelo idioma.
function detectCurrency() {
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        if (/^America\/(Sao_Paulo|Bahia|Fortaleza|Recife|Belem|Manaus|Cuiaba|Campo_Grande|Boa_Vista|Porto_Velho|Rio_Branco|Maceio|Araguaina|Santarem|Noronha)$/.test(tz)) return 'BRL';
        if (tz.startsWith('Europe/')) return 'EUR';
        if (tz.startsWith('America/')) return 'USD';
    } catch (e) { /* Intl indisponível */ }

    const lang = (navigator.language || '').toLowerCase();
    if (lang.startsWith('pt')) return 'BRL';
    if (lang.startsWith('en')) return 'USD';
    if (lang) return 'EUR';

    return DEFAULT_CURRENCY;
}

function initCurrency() {
    let saved = null;
    try {
        saved = localStorage.getItem('monsterloot-currency');
    } catch (e) { /* localStorage indisponível */ }

    currency = (saved && CURRENCIES[saved]) ? saved : detectCurrency();

    const select = document.getElementById('currency-select');
    if (select) {
        select.innerHTML = Object.keys(CURRENCIES).map(code =>
            `<option value="${code}">${CURRENCIES[code].label}</option>`
        ).join('');
        select.value = currency;
    }
    applyGoldMode();
}

function setCurrency(code) {
    if (!CURRENCIES[code]) return;

    currency = code;
    try {
        localStorage.setItem('monsterloot-currency', code);
    } catch (e) { /* ignore */ }

    applyGoldMode();
    renderProducts();
    if (currentProduct) renderProductDetail();
    updateCartUI();

    if (CURRENCIES[code].easterEgg) triggerGoldEasterEgg();
    else showToast(`* Moeda do mercado alterada para ${code}.`);
}

function formatPrice(priceInG) {
    const c = CURRENCIES[currency] || CURRENCIES[DEFAULT_CURRENCY];
    if (!c.locale) return `G ${Math.round(priceInG * c.rate)}`;

    return new Intl.NumberFormat(c.locale, {
        style: 'currency',
        currency: currency,
    }).format(priceInG * c.rate);
}

function applyGoldMode() {
    const select = document.getElementById('currency-select');
    if (select) select.classList.toggle('gold-mode', currency === 'G');
}

function triggerGoldEasterEgg() {
    const flash = document.createElement('div');
    flash.className = 'gold-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 1000);

    showToast('* Você sente sua DETERMINAÇÃO aumentar.');
}

// ========== PRODUCTS ==========

function productGallery(product) {
    if (product.images && product.images.length > 0) return product.images;
    if (product.sprite) return [product.sprite];
    return [];
}

function productMainImage(product) {
    const gallery = productGallery(product);
    return gallery[0] || '';
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    PRODUCTS.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openProduct(product.id);
        card.innerHTML = `
            <div class="product-image">
                <img src="${productMainImage(product)}"
                     alt="${product.name}"
                     loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
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
}

function renderProductDetail() {
    const p = currentProduct;
    if (!p) return;

    const gallery = productGallery(p);
    const placeholders = gallery.length > 0 ? 0 : 4;

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
                <img src="${gallery[0]}" alt="${p.name}">
            </div>
            <div class="gallery-thumbs${gallery.length < 2 ? ' hidden' : ''}">${thumbs}</div>
        </div>

        <div class="detail-info">
            <h2 class="detail-name">${p.name}</h2>
            <div class="detail-price">${formatPrice(p.price)}</div>
            <div class="detail-desc">${descLines}</div>

            <div class="detail-specs">
                <h3>✦ ESPECIFICAÇÕES ✦</h3>
                ${specs}
            </div>

            <div class="detail-warning">
                <strong>⚠ AVISO:</strong> Este item é protegido por
                <strong>${p.boss.toUpperCase()}</strong>.
                O combate começa assim que você adicionar ao carrinho — se perder,
                todo o carrinho é perdido.
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
    addToCart(currentProduct.id, detailQty);
}

// ========== CART ==========

// Adicionar ao carrinho NÃO guarda o item de imediato: o monstro que
// protege o produto ataca na hora. O item só entra no carrinho se o
// jogador vencer (ou poupar) — ver onBattleWin/onBattleLose.
function addToCart(productId, qty) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    if (pendingPurchase || battleActive) return;
    if (Date.now() - resultClosedAt < 400) return;

    startProductBattle(product, Math.max(1, qty || 1));
}

function commitPendingToCart(pending) {
    const existing = cart.find(item => item.id === pending.id);
    if (existing) {
        existing.qty += pending.qty;
    } else {
        cart.push({ id: pending.id, qty: pending.qty });
    }

    saveCart();
    updateCartUI();
}

function resetAddButton(productId) {
    const btn = document.getElementById(`btn-${productId}`);
    if (!btn) return;
    btn.classList.remove('added');
    btn.textContent = '+ CARRINHO';
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    // Cada unidade a mais é uma nova adição — e portanto um novo combate.
    if (delta > 0) {
        if (document.getElementById('cart-sidebar').classList.contains('open')) toggleCart();
        addToCart(productId, delta);
        return;
    }

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
                    <img src="${productMainImage(product)}" alt="${product.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-price">${formatPrice(product.price * item.qty)}</div>
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

    totalEl.textContent = formatPrice(getCartTotal());
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

// O ícone ♪ apenas colapsa/expande o painel; o play/pause fica dentro dele.
function toggleMusicPanel() {
    const control = document.getElementById('music-control');
    const toggle = document.getElementById('music-toggle');
    if (!control || !toggle) return;

    const expanded = control.classList.toggle('expanded');
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.title = expanded
        ? 'Ocultar controles de música'
        : 'Mostrar controles de música';
}

function updateMusicIcon() {
    const toggle = document.getElementById('music-toggle');
    const btn = document.getElementById('music-btn');
    const state = document.getElementById('music-state');
    if (!audioEl) return;

    const silent = audioEl.paused || audioEl.volume === 0;
    if (state) state.textContent = audioEl.paused ? '▶' : '❚❚';
    if (toggle) toggle.classList.toggle('muted', silent);
    if (btn) btn.classList.toggle('muted', silent);
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

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    const isOpen = sidebar.classList.contains('open');

    sidebar.classList.toggle('open', !isOpen);
    overlay.classList.toggle('open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
}

// ========== ADD TO CART → BATTLE ==========

function startProductBattle(product, qty) {
    pendingPurchase = { id: product.id, qty: qty };
    battleActive = true;

    const btn = document.getElementById(`btn-${product.id}`);
    if (btn) {
        btn.classList.add('added');
        btn.textContent = '! COMBATE !';
    }

    showToast(`* ${product.boss.toUpperCase()} bloqueia o caminho!`);

    // Itens já conquistados viram consumíveis de cura durante a luta.
    const cartForBattle = getCartItems().map(i => ({
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
            window.startBattle(product.boss, cartForBattle, onBattleWin, onBattleLose);
        } else {
            console.error('Battle system not loaded');
            overlay.classList.remove('active');
            resumeMusic();
            onBattleWin();
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

// Vitória (ou MERCY): o item finalmente entra no carrinho.
function onBattleWin() {
    if (!battleActive) return;
    battleActive = false;

    document.getElementById('battle-overlay').classList.remove('active');
    resumeMusic();

    const pending = pendingPurchase;
    pendingPurchase = null;
    if (!pending) return;

    resetAddButton(pending.id);
    commitPendingToCart(pending);
    showBattleResult(true, pending);
}

// Derrota: o carrinho inteiro é perdido, não só o item em disputa.
function onBattleLose() {
    if (!battleActive) return;
    battleActive = false;

    document.getElementById('battle-overlay').classList.remove('active');
    resumeMusic();

    const pending = pendingPurchase;
    pendingPurchase = null;
    if (pending) resetAddButton(pending.id);

    cart = [];
    saveCart();
    updateCartUI();
    showBattleResult(false, pending);
}

function showBattleResult(success, pending) {
    const screen = document.getElementById('result-screen');
    const content = document.getElementById('result-content');
    const product = pending ? PRODUCTS.find(p => p.id === pending.id) : null;
    if (!product) return;

    if (success) {
        content.innerHTML = `
            <div class="result-success">
                <h2>♥ ITEM CONQUISTADO ♥</h2>
                <p>* Você derrotou ${product.boss.toUpperCase()}!</p>
                <p>* ${pending.qty}x ${product.name} entrou no carrinho.</p>
                <p style="color: #ffff00; margin-top: 16px;">Carrinho: ${formatPrice(getCartTotal())}</p>
                <br>
                <button class="result-btn primary" onclick="closeResult()">CONTINUAR</button>
            </div>
        `;
    } else {
        content.innerHTML = `
            <div class="result-fail">
                <h2 style="color: #ff0000;">GAME OVER</h2>
                <p>* ${product.boss.toUpperCase()} te derrotou...</p>
                <p>* Todo o conteúdo do carrinho ficou para trás no Underground.</p>
                <br>
                <button class="result-btn" onclick="retryBattle('${product.id}', ${pending.qty})">TENTAR NOVAMENTE</button>
                <button class="result-btn" onclick="closeResult()">VOLTAR À LOJA</button>
            </div>
        `;
    }

    screen.classList.add('active');
}

// Retry é intenção explícita, então passa por cima da carência de clique.
function retryBattle(productId, qty) {
    closeResult();
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || battleActive) return;
    startProductBattle(product, Math.max(1, qty || 1));
}

// ========== CHECKOUT ==========
// Os combates já aconteceram item a item, então aqui só fechamos o pedido.

function checkout() {
    if (cart.length === 0) return;

    toggleCart();
    const total = getCartTotal();

    cart = [];
    saveCart();
    updateCartUI();

    document.getElementById('result-content').innerHTML = `
        <div class="result-success">
            <h2>♥ COMPRA FINALIZADA ♥</h2>
            <p>* Você sobreviveu a todos os monstros.</p>
            <p>* Seus itens serão enviados para o Underground.</p>
            <p style="color: #ffff00; margin-top: 16px;">Total: ${formatPrice(total)}</p>
            <br>
            <button class="result-btn primary" onclick="finishPurchase()">CONTINUAR</button>
        </div>
    `;
    document.getElementById('result-screen').classList.add('active');
}

function finishPurchase() {
    closeResult();
    showToast('* Obrigado pela compra! ♥');
}

function closeResult() {
    document.getElementById('result-screen').classList.remove('active');
    resultClosedAt = Date.now();
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
