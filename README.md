# MONSTER LOOT - Loja do Underground

Loja online temática inspirada em **UNDERTALE** — trabalho de faculdade.

## Como usar

Abra o `index.html` no navegador (precisa de conexão para carregar a fonte Google Fonts).

### Fluxo

1. **Home** — logo + catálogo de produtos
2. **Tela de produto** — clique em qualquer card para ver descrição completa, galeria de imagens e especificações
3. **Batalha** — o combate começa no instante em que você adiciona um item ao carrinho.
   Vencer (ou poupar) guarda o item; perder **esvazia o carrinho inteiro**.
   Itens já conquistados viram consumíveis de cura no menu `ITEM`.
4. **Carrinho** — revise o que sobreviveu e clique em **FINALIZAR COMPRA** para fechar o pedido.

### Moeda

O mercado detecta a moeda pela região do navegador (fuso horário, com fallback no idioma) e
permite alternar entre `BRL`, `USD` e `EUR` pelo seletor no header. A escolha fica no LocalStorage.
O `G` original do jogo continua disponível como easter egg no fim da lista.

### Controles da Batalha

| Tecla | Ação |
|-------|------|
| `←` `→` | Navegar menu / Mover coração |
| `↑` `↓` | Mover coração / Navegar sub-menu |
| `Z` / `Enter` | Confirmar |
| `X` / `Shift` | Cancelar / Voltar |

### Música

A música de fundo toca automaticamente na home (após a primeira interação, por restrição dos navegadores).
O ícone `♪` no header expande e recolhe os controles — o play/pause e o slider de volume só
aparecem quando o painel está aberto. O volume fica salvo no LocalStorage e a música pausa
durante as batalhas.

## Stack

- **HTML5** — estrutura das páginas
- **CSS3** — estilização pixel-art (fonte Press Start 2P)
- **JavaScript (vanilla)** — lógica do carrinho + sistema de batalha
- **Canvas API** — renderização do combate (game loop com `requestAnimationFrame`)
- **LocalStorage** — persistência do carrinho, do volume e da moeda
- **Intl** — detecção de região e formatação de preço por moeda
- **Python + Pillow** — script offline que fatia as spritesheets de referência (`tools/`)

## Estrutura

```
├── index.html          # Home, tela de produto, sobre, carrinho, batalha
├── css/style.css       # Estilos Undertale
├── js/
│   ├── shop.js         # Catálogo, tela de produto, carrinho, moeda, música, checkout
│   └── battle.js       # Sistema de combate Canvas
├── tools/
│   └── slice_sprites.py  # Regera os recortes a partir das spritesheets originais
└── assets/
    ├── img/logo.png    # Logo do hero
    ├── audio/          # Música de fundo
    └── sprites/        # Sprites do jogo
        ├── soul/       # Coração do jogador
        ├── buttons/    # FIGHT, ACT, ITEM, MERCY
        ├── bosses/     # Sprites dos chefes
        ├── attacks/    # Projéteis (ossos, fogo, lanças)
        ├── fight/      # Barra de alvo, cursores, números de dano, golpes
        └── ui/         # Elementos de interface
```

## Regerar os sprites de combate

Os recortes em `assets/sprites/fight/` e os balões em `assets/sprites/ui/` saem de duas
spritesheets do Spriters Resource que não ficam no repo. Para regerar:

```sh
pip install pillow
python tools/slice_sprites.py "Attack Effects.png" "Text Bubbles.png"
```

## Adicionar imagens dos produtos

As imagens reais dos produtos ainda estão sendo coletadas. Para adicionar, preencha o array
`images` do produto em `js/shop.js`:

```js
{
    id: 'sans-plush',
    // ...
    images: [
        'assets/img/produtos/sans-1.png',
        'assets/img/produtos/sans-2.png'
    ],
}
```

A galeria usa a primeira imagem como principal e gera as miniaturas automaticamente.
Enquanto o array estiver vazio, o sprite do boss é usado como imagem principal e os
slots vazios aparecem como `?`.

## Créditos

- **UNDERTALE** © Toby Fox — todos os sprites e músicas pertencem ao autor original
- Projeto acadêmico — 2026
