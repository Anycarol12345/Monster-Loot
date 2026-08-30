# MONSTER LOOT - Loja do Underground

Loja online temática inspirada em **UNDERTALE** — trabalho de faculdade.

## Como usar

Abra o `index.html` no navegador (precisa de conexão para carregar a fonte Google Fonts).

### Fluxo

1. **Home** — logo + catálogo de produtos
2. **Tela de produto** — clique em qualquer card para ver descrição completa, galeria de imagens e especificações
3. **Carrinho** — adicione itens e clique em **FINALIZAR COMPRA**
4. **Batalha** — sobreviva ao combate estilo Undertale para concluir a compra!

### Controles da Batalha

| Tecla | Ação |
|-------|------|
| `←` `→` | Navegar menu / Mover coração |
| `↑` `↓` | Mover coração / Navegar sub-menu |
| `Z` / `Enter` | Confirmar |
| `X` / `Shift` | Cancelar / Voltar |

### Música

A música de fundo toca automaticamente na home (após a primeira interação, por restrição dos navegadores).
Use o botão `♪` no header para pausar/tocar e o slider ao lado para ajustar o volume.
O volume fica salvo no LocalStorage e a música pausa durante as batalhas.

## Stack

- **HTML5** — estrutura das páginas
- **CSS3** — estilização pixel-art (fonte Press Start 2P)
- **JavaScript (vanilla)** — lógica do carrinho + sistema de batalha
- **Canvas API** — renderização do combate (game loop com `requestAnimationFrame`)
- **LocalStorage** — persistência do carrinho e do volume

## Estrutura

```
├── index.html          # Home, tela de produto, sobre, carrinho, batalha
├── css/style.css       # Estilos Undertale
├── js/
│   ├── shop.js         # Catálogo, tela de produto, carrinho, música, checkout
│   └── battle.js       # Sistema de combate Canvas
└── assets/
    ├── img/logo.png    # Logo do hero
    ├── audio/          # Música de fundo
    └── sprites/        # Sprites do jogo
        ├── soul/       # Coração do jogador
        ├── buttons/    # FIGHT, ACT, ITEM, MERCY
        ├── bosses/     # Sprites dos chefes
        ├── attacks/    # Projéteis (ossos, fogo, lanças)
        └── ui/         # Elementos de interface
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
