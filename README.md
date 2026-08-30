# UNDERVENDA - Loja do Underground

Loja online temática inspirada em **UNDERTALE** — trabalho de faculdade.

## Como usar

Abra o `index.html` no navegador (precisa de conexão para carregar a fonte Google Fonts).

### Fluxo

1. Navegue pelo catálogo e adicione produtos ao carrinho
2. Clique em **FINALIZAR COMPRA**
3. Sobreviva à batalha estilo Undertale para concluir a compra!

### Controles da Batalha

| Tecla | Ação |
|-------|------|
| `←` `→` | Navegar menu / Mover coração |
| `↑` `↓` | Mover coração / Navegar sub-menu |
| `Z` / `Enter` | Confirmar |
| `X` / `Shift` | Cancelar / Voltar |

## Stack

- **HTML5** — estrutura das páginas
- **CSS3** — estilização pixel-art (fonte Press Start 2P)
- **JavaScript (vanilla)** — lógica do carrinho + sistema de batalha
- **Canvas API** — renderização do combate (game loop com `requestAnimationFrame`)
- **LocalStorage** — persistência do carrinho

## Estrutura

```
├── index.html          # Página principal
├── css/style.css       # Estilos Undertale
├── js/
│   ├── shop.js         # Catálogo, carrinho, checkout
│   └── battle.js       # Sistema de combate Canvas
└── assets/sprites/     # Sprites do jogo
    ├── soul/           # Coração do jogador
    ├── buttons/        # FIGHT, ACT, ITEM, MERCY
    ├── bosses/         # Sprites dos chefes
    ├── attacks/        # Projéteis (ossos, fogo, lanças)
    └── ui/             # Elementos de interface
```

## Créditos

- **UNDERTALE** © Toby Fox — todos os sprites pertencem ao autor original
- Projeto acadêmico — 2026
