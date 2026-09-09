// ============================================================
// Undertale-style Battle Engine — Canvas API, vanilla JS
// ============================================================

(function () {
  'use strict';

  // ── Sprite paths ──────────────────────────────────────────
  const SPRITE = {
    soul:       'assets/sprites/soul/heart.png',
    soulBreak:  'assets/sprites/soul/heart_break.png',
    buttons: {
      fight:  ['assets/sprites/buttons/fight_0.png', 'assets/sprites/buttons/fight_1.png'],
      act:    ['assets/sprites/buttons/act_0.png',   'assets/sprites/buttons/act_1.png'],
      item:   ['assets/sprites/buttons/item_0.png',  'assets/sprites/buttons/item_1.png'],
      mercy:  ['assets/sprites/buttons/mercy_0.png', 'assets/sprites/buttons/mercy_1.png'],
    },
    bosses: {
      froggit:     ['assets/sprites/bosses/froggit.png'],
      napstablook: ['assets/sprites/bosses/napstablook.png'],
      toriel:      ['assets/sprites/bosses/toriel.png'],
      papyrus:     ['assets/sprites/bosses/papyrus.png'],
      undyne:      ['assets/sprites/bosses/undyne.png'],
      sans:        ['assets/sprites/bosses/sans_face.png',
                    'assets/sprites/bosses/sans_torso.png',
                    'assets/sprites/bosses/sans_legs.png'],
      flowey:      ['assets/sprites/bosses/flowey.png'],
      mettaton:    ['assets/sprites/bosses/mettaton_ex.png'],
    },
    attacks: {
      bone_h:      'assets/sprites/attacks/bone_h.png',
      bone_v:      'assets/sprites/attacks/bone_v.png',
      bone_top:    'assets/sprites/attacks/bone_top.png',
      bone_bottom: 'assets/sprites/attacks/bone_bottom.png',
      bone_loop:   'assets/sprites/attacks/bone_loop.png',
      fire_0:      'assets/sprites/attacks/fire_0.png',
      fire_1:      'assets/sprites/attacks/fire_1.png',
      flame_0:     'assets/sprites/attacks/flame_0.png',
      flame_1:     'assets/sprites/attacks/flame_1.png',
      spear:       'assets/sprites/attacks/spear.png',
      spear_white: 'assets/sprites/attacks/spear_white.png',
      teardrop:    'assets/sprites/attacks/teardrop.png',
      bullet_0:    'assets/sprites/attacks/bullet_0.png',
      bullet_1:    'assets/sprites/attacks/bullet_1.png',
      fly_0:       'assets/sprites/attacks/fly_0.png',
      fly_1:       'assets/sprites/attacks/fly_1.png',
      frog_bullet: 'assets/sprites/attacks/frog_bullet.png',
      smallfrog_0: 'assets/sprites/attacks/spr_smallfrogbullet_0.png',
      smallfrog_1: 'assets/sprites/attacks/spr_smallfrogbullet_1.png',
      bomb_0:      'assets/sprites/attacks/spr_bulletgenmd_0.png',
      bomb_1:      'assets/sprites/attacks/spr_bulletgenmd_1.png',
      bomb_2:      'assets/sprites/attacks/spr_bulletgenmd_2.png',
    },
    gaster: [
      'assets/sprites/attacks/gaster_0.png',
      'assets/sprites/attacks/gaster_1.png',
      'assets/sprites/attacks/gaster_2.png',
      'assets/sprites/attacks/gaster_3.png',
      'assets/sprites/attacks/gaster_4.png',
      'assets/sprites/attacks/gaster_5.png',
    ],
    fight: {
      target: 'assets/sprites/fight/target.png',
      fadebar: {
        cyan:   'assets/sprites/fight/fadebar_cyan.png',
        red:    'assets/sprites/fight/fadebar_red.png',
        yellow: 'assets/sprites/fight/fadebar_yellow.png',
      },
      dmgDigits: [
        'assets/sprites/fight/dmg_0.png',
        'assets/sprites/fight/dmg_1.png',
        'assets/sprites/fight/dmg_2.png',
        'assets/sprites/fight/dmg_3.png',
        'assets/sprites/fight/dmg_4.png',
        'assets/sprites/fight/dmg_5.png',
        'assets/sprites/fight/dmg_6.png',
        'assets/sprites/fight/dmg_7.png',
        'assets/sprites/fight/dmg_8.png',
        'assets/sprites/fight/dmg_9.png',
      ],
      dmgMiss: 'assets/sprites/fight/dmg_miss.png',
      slash: {
        glove: [
          'assets/sprites/fight/slash_glove_0.png',
          'assets/sprites/fight/slash_glove_1.png',
          'assets/sprites/fight/slash_glove_2.png',
          'assets/sprites/fight/slash_glove_3.png',
          'assets/sprites/fight/slash_glove_4.png',
          'assets/sprites/fight/slash_glove_5.png',
        ],
        shoe: [
          'assets/sprites/fight/slash_shoe_0.png',
          'assets/sprites/fight/slash_shoe_1.png',
          'assets/sprites/fight/slash_shoe_2.png',
          'assets/sprites/fight/slash_shoe_3.png',
          'assets/sprites/fight/slash_shoe_4.png',
          'assets/sprites/fight/slash_shoe_5.png',
        ],
      },
    },
    ui: {
      hp_name:      'assets/sprites/ui/hp_name.png',
      border:       'assets/sprites/ui/border.png',
      target:       'assets/sprites/ui/target.png',
      bubbleLeft:   'assets/sprites/ui/bubble_tail_left.png',
      bubbleRight:  'assets/sprites/ui/bubble_tail_right.png',
    },
  };

  // ── Boss data ─────────────────────────────────────────────
  const BOSSES = {
    froggit: {
      name: 'Froggit',
      hp: 30, maxHp: 30, atk: 2, def: 2,
      spriteKeys: ['froggit'],
      spriteScale: 2,
      dialogue: [
        '* Froggit te encarou ameaçadoramente.',
        '* (Mas está fazendo o melhor que pode.)',
      ],
      actOptions: ['Check', 'Elogiar'],
      spareAfterActs: 2,
      attackType: 'froggit',
    },
    napstablook: {
      name: 'Napstablook',
      hp: 44, maxHp: 44, atk: 3, def: 2,
      spriteKeys: ['napstablook'],
      spriteScale: 2.5,
      dialogue: [
        '* Ah... você quer comprar algo?... ok eu acho...',
        '* realmente não to afim agora...',
      ],
      actOptions: ['Check', 'Animar'],
      spareAfterActs: 3,
      attackType: 'napstablook',
    },
    toriel: {
      name: 'Toriel',
      hp: 80, maxHp: 80, atk: 4, def: 3,
      spriteKeys: ['toriel'],
      spriteScale: 2,
      dialogue: [
        '* Você não pode sair sem provar minha torta!',
        '* Ataque ou fuja. Mas não queime minha cozinha.',
      ],
      actOptions: ['Check', 'Conversar'],
      spareAfterActs: 3,
      attackType: 'toriel',
    },
    papyrus: {
      name: 'Papyrus',
      hp: 60, maxHp: 60, atk: 4, def: 3,
      spriteKeys: ['papyrus'],
      spriteScale: 1.2,
      dialogue: [
        '* NYEH HEH HEH! ESSA COMPRA SERÁ SUA ÚLTIMA!',
        '* EU, O GRANDE PAPYRUS, PROTEJO ESSES PRODUTOS!',
      ],
      actOptions: ['Check', 'Flertar'],
      spareAfterActs: 2,
      attackType: 'papyrus',
    },
    undyne: {
      name: 'Undyne',
      hp: 70, maxHp: 70, atk: 5, def: 4,
      spriteKeys: ['undyne'],
      spriteScale: 1,
      dialogue: [
        '* NGAHHH!! Você acha que pode comprar isso assim?!',
        '* PRIMEIRO, PROVE QUE É DIGNO!',
      ],
      actOptions: ['Check', 'Desafiar'],
      spareAfterActs: 3,
      attackType: 'undyne',
    },
    sans: {
      name: 'Sans',
      hp: 1, maxHp: 1, atk: 7, def: 1,
      spriteKeys: ['sans'],
      spriteScale: 2,
      dialogue: [
        '* heh. beleza, vamos lá.',
        '* é um lindo dia lá fora... pássaros cantando, flores desabrochando...',
      ],
      actOptions: ['Check', 'Julgar'],
      spareAfterActs: 4,
      attackType: 'sans',
    },
    flowey: {
      name: 'Flowey',
      hp: 50, maxHp: 50, atk: 4, def: 2,
      spriteKeys: ['flowey'],
      spriteScale: 4,
      dialogue: [
        '* Neste mundo, é COMPRAR ou MORRER!',
        '* Você REALMENTE achou que conseguiria levar isso de graça?',
      ],
      actOptions: ['Check', 'Ignorar'],
      spareAfterActs: 3,
      attackType: 'flowey',
    },
    mettaton: {
      name: 'Mettaton EX',
      hp: 90, maxHp: 90, atk: 5, def: 5,
      spriteKeys: ['mettaton'],
      spriteScale: 2.8,
      dialogue: [
        '* OH YES! HORA DO SHOW, QUERIDO!',
        '* ESSAS RATINGS VÃO EXPLODIR!',
      ],
      actOptions: ['Check', 'Posar'],
      spareAfterActs: 3,
      attackType: 'mettaton',
    },
  };

  // ── States ────────────────────────────────────────────────
  const STATE = {
    INTRO: 'INTRO',
    MENU: 'MENU',
    FIGHT_ANIM: 'FIGHT_ANIM',
    ACT_SELECT: 'ACT_SELECT',
    ITEM_SELECT: 'ITEM_SELECT',
    MESSAGE: 'MESSAGE',
    ENEMY_TURN: 'ENEMY_TURN',
    WIN: 'WIN',
    LOSE: 'LOSE',
  };

  // ── Layout: proporções canônicas do Undertale ─────────────
  // Área de batalha 640x480, caixa de batalha 565x140.
  const CANVAS_W = 640;
  const CANVAS_H = 480;

  const BOX_W = 565;
  const BOX_H = 140;
  const BOX_BORDER = 5;
  const BOX_X = Math.round((CANVAS_W - BOX_W) / 2);
  const BOX_Y = 250;

  // Faixa vertical reservada ao monstro — nunca invade a caixa de batalha.
  // A folga até a caixa precisa comportar a barra de HP do inimigo, que é
  // desenhada logo abaixo do sprite.
  const BOSS_AREA_TOP = 18;
  const BOSS_AREA_BOTTOM = BOX_Y - 44;

  // Botões FIGHT/ACT/ITEM/MERCY: 110x42 (tamanho nativo dos sprites).
  const MENU_BTN_W = 110;
  const MENU_BTN_H = 42;
  const MENU_GAP = (BOX_W - MENU_BTN_W * 4) / 3;
  const MENU_Y = BOX_Y + BOX_H + 42;
  const HUD_Y = BOX_Y + BOX_H + 22;

  // Quem está lutando é o comprador, não a Chara do jogo original.
  const PLAYER_NAME = 'COMPRADOR';

  const SOUL_SCALE = 1;
  const SOUL_SIZE = 16 * SOUL_SCALE;
  const SOUL_SPEED = 2.2;
  const PLAYER_MAX_HP = 20;
  const INVINCIBILITY_MS = 1000;

  // Velocidade da barra de ataque (% da barra por frame a 60fps).
  // 100 / 1.6 ≈ 62 frames ≈ 1,05s de varredura — não alterar.
  const FIGHT_BAR_SPEED = 1.6;

  // Sequência do FIGHT (ms).
  const FIGHT_FREEZE_MS = 340;   // cursor parado, visível, antes do golpe
  const SLASH_FRAME_MS = 66;     // ~1/15s por quadro
  const FIGHT_RESULT_MS = 900;
  const CRIT_ACCURACY = 0.9;
  const CRIT_MULTIPLIER = 2.2;

  // Tela de morte: coração inteiro → rachado → estilhaçado → aviso.
  // A carência depois do aviso existe para um Z martelado durante a morte
  // não escolher sozinho.
  const LOSE_CRACK_MS = 550;
  const LOSE_SHATTER_MS = 1000;
  const LOSE_PROMPT_MS = 1900;
  const LOSE_INPUT_GRACE_MS = 700;

  // A caixa muda de tamanho conforme o ataque, como no jogo.
  const BOX_RESIZE_MS = 260;

  // Barra de HP do inimigo.
  const ENEMY_HP_W = 110;
  const ENEMY_HP_H = 14;
  const ENEMY_HP_DRAIN_MS = 500;
  const ENEMY_HP_HOLD_MS = 1500;
  const ENEMY_HP_FADE_MS = 250;

  // spr_dmgnum tem 30x30 com ~3px de folga; 26 encosta os dígitos.
  const DMG_DIGIT_ADVANCE = 26;

  // Golpe de cada monstro — fixo para não trocar entre turnos.
  const SLASH_BY_BOSS = {
    froggit: 'glove',
    napstablook: 'shoe',
    toriel: 'shoe',
    papyrus: 'glove',
    undyne: 'glove',
    sans: 'glove',
    flowey: 'shoe',
    mettaton: 'shoe',
  };

  // 9-slice dos balões: os insets mantêm bico e cantos fora das faixas
  // esticadas. Tamanho mínimo resultante ≈ 72x70.
  const BUBBLE_INSETS = {
    left:  { left: 48, right: 24, top: 46, bottom: 24 },
    right: { left: 24, right: 48, top: 46, bottom: 24 },
  };
  const BUBBLE_TAIL_GUTTER = 25;  // faixa do bico, transparente no corpo
  const BUBBLE_TAIL_Y = 35;       // centro do bico medido do topo do sprite

  // ── Preloader ─────────────────────────────────────────────
  function collectAllPaths() {
    const paths = new Set();
    paths.add(SPRITE.soul);
    paths.add(SPRITE.soulBreak);
    for (const b of Object.values(SPRITE.buttons))
      b.forEach(p => paths.add(p));
    for (const arr of Object.values(SPRITE.bosses))
      arr.forEach(p => paths.add(p));
    for (const p of Object.values(SPRITE.attacks))
      paths.add(p);
    SPRITE.gaster.forEach(p => paths.add(p));
    paths.add(SPRITE.fight.target);
    paths.add(SPRITE.fight.dmgMiss);
    for (const p of Object.values(SPRITE.fight.fadebar))
      paths.add(p);
    SPRITE.fight.dmgDigits.forEach(p => paths.add(p));
    for (const arr of Object.values(SPRITE.fight.slash))
      arr.forEach(p => paths.add(p));
    for (const p of Object.values(SPRITE.ui))
      paths.add(p);
    return paths;
  }

  function preloadImages() {
    const cache = {};
    const paths = collectAllPaths();
    const promises = [];
    for (const src of paths) {
      promises.push(new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => { cache[src] = img; resolve(); };
        img.onerror = () => {
          console.warn('Sprite not found, using placeholder:', src);
          const c = document.createElement('canvas');
          c.width = 16; c.height = 16;
          const cx = c.getContext('2d');
          cx.fillStyle = '#f0f';
          cx.fillRect(0, 0, 16, 16);
          cache[src] = c;
          resolve();
        };
        img.src = src;
      }));
    }
    return Promise.all(promises).then(() => cache);
  }

  // ── Quebra de linha compartilhada (caixa de texto e balão) ─
  function wrapText(ctx, text, maxWidth) {
    const lines = [];
    let line = '';
    for (const word of text.split(' ')) {
      const test = line + (line ? ' ' : '') + word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  // ── 9-slice ───────────────────────────────────────────────
  // Cantos em tamanho nativo; só as faixas central/laterais esticam.
  function drawNineSlice(ctx, img, dx, dy, dw, dh, insets) {
    const l = insets.left, r = insets.right, t = insets.top, b = insets.bottom;
    const sw = img.width, sh = img.height;
    const srcMidW = sw - l - r;
    const srcMidH = sh - t - b;
    const dstMidW = Math.max(0, dw - l - r);
    const dstMidH = Math.max(0, dh - t - b);

    const part = (sx, sy, spw, sph, px, py, pw, ph) => {
      if (spw <= 0 || sph <= 0 || pw <= 0 || ph <= 0) return;
      ctx.drawImage(img, sx, sy, spw, sph, px, py, pw, ph);
    };

    const midX = dx + l, rightX = dx + l + dstMidW;
    const midY = dy + t, bottomY = dy + t + dstMidH;

    part(0,      0,      l,       t,       dx,     dy,      l,       t);
    part(l,      0,      srcMidW, t,       midX,   dy,      dstMidW, t);
    part(sw - r, 0,      r,       t,       rightX, dy,      r,       t);

    part(0,      t,      l,       srcMidH, dx,     midY,    l,       dstMidH);
    part(l,      t,      srcMidW, srcMidH, midX,   midY,    dstMidW, dstMidH);
    part(sw - r, t,      r,       srcMidH, rightX, midY,    r,       dstMidH);

    part(0,      sh - b, l,       b,       dx,     bottomY, l,       b);
    part(l,      sh - b, srcMidW, b,       midX,   bottomY, dstMidW, b);
    part(sw - r, sh - b, r,       b,       rightX, bottomY, r,       b);
  }

  // ── Soul ──────────────────────────────────────────────────
  class Soul {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.w = SOUL_SIZE;
      this.h = SOUL_SIZE;
      this.hp = PLAYER_MAX_HP;
      this.maxHp = PLAYER_MAX_HP;
      this.displayHp = PLAYER_MAX_HP;
      this.invTimer = 0;
      this.visible = true;
      this.scale = 1;
      this.entry = null;
    }

    // Entrada estilo Undertale: a alma surge pequena, voa até o centro
    // da caixa e pisca duas vezes antes de assumir o controle.
    startEntry(fromX, fromY, toX, toY) {
      this.entry = {
        fromX, fromY, toX, toY,
        timer: 0,
        moveMs: 420,
        blinkMs: 400,
      };
      this.x = fromX;
      this.y = fromY;
      this.scale = 0.25;
      this.visible = true;
    }

    get entering() { return this.entry !== null; }

    _updateEntry(dt) {
      const e = this.entry;
      e.timer += dt;

      if (e.timer <= e.moveMs) {
        const k = e.timer / e.moveMs;
        const ease = 1 - Math.pow(1 - k, 3);
        this.x = e.fromX + (e.toX - e.fromX) * ease;
        this.y = e.fromY + (e.toY - e.fromY) * ease;
        this.scale = 0.25 + 0.75 * ease;
        this.visible = true;
        return;
      }

      this.x = e.toX;
      this.y = e.toY;
      this.scale = 1;

      // Duas piscadas = 4 alternâncias em blinkMs.
      const blinkT = e.timer - e.moveMs;
      if (blinkT < e.blinkMs) {
        this.visible = Math.floor(blinkT / (e.blinkMs / 4)) % 2 === 0;
        return;
      }

      this.visible = true;
      this.entry = null;
    }

    update(keys, box, dt) {
      if (this.entry) {
        this._updateEntry(dt);
        this._updateHpDisplay(dt);
        return;
      }

      const spd = SOUL_SPEED * (dt / 16.67);
      if (keys['ArrowLeft'])  this.x -= spd;
      if (keys['ArrowRight']) this.x += spd;
      if (keys['ArrowUp'])    this.y -= spd;
      if (keys['ArrowDown'])  this.y += spd;

      const inner = {
        x: box.x + BOX_BORDER,
        y: box.y + BOX_BORDER,
        w: box.w - BOX_BORDER * 2,
        h: box.h - BOX_BORDER * 2,
      };
      this.x = Math.max(inner.x, Math.min(this.x, inner.x + inner.w - this.w));
      this.y = Math.max(inner.y, Math.min(this.y, inner.y + inner.h - this.h));

      if (this.invTimer > 0) {
        this.invTimer -= dt;
        this.visible = Math.floor(this.invTimer / 80) % 2 === 0;
      } else {
        this.visible = true;
      }

      this._updateHpDisplay(dt);
    }

    _updateHpDisplay(dt) {
      const hpDiff = this.displayHp - this.hp;
      if (Math.abs(hpDiff) > 0.1)
        this.displayHp -= hpDiff * Math.min(1, dt * 0.005);
      else
        this.displayHp = this.hp;
    }

    takeDamage(amount) {
      if (this.invTimer > 0 || this.entry) return false;
      this.hp = Math.max(0, this.hp - amount);
      this.invTimer = INVINCIBILITY_MS;
      return true;
    }

    render(ctx, sprites) {
      if (!this.visible) return;
      const img = sprites[SPRITE.soul];
      const w = this.w * this.scale;
      const h = this.h * this.scale;
      ctx.drawImage(img, this.x + (this.w - w) / 2, this.y + (this.h - h) / 2, w, h);
    }

    getHitbox() {
      const shrink = 3;
      return {
        x: this.x + shrink,
        y: this.y + shrink,
        w: this.w - shrink * 2,
        h: this.h - shrink * 2,
      };
    }
  }

  // ── Projectile ────────────────────────────────────────────
  class Projectile {
    constructor(x, y, vx, vy, w, h, spriteKey) {
      this.x = x; this.y = y;
      this.vx = vx; this.vy = vy;
      this.w = w; this.h = h;
      this.spriteKey = spriteKey;
      this.alive = true;
      this.age = 0;
      this.angle = 0;
      this.gravity = 0;
      this.wobble = null;
      this.frames = null;
      this.path = null;
      this.spin = 0;
      this.lifetime = 0;
    }

    // Animação por quadros (moscas, chamas, blasters, bombas...).
    setFrames(frames, msPerFrame) {
      this.frames = frames;
      this.frameMs = msPerFrame;
      this._frameTimer = 0;
      this._frameIndex = 0;
      this.spriteKey = frames[0];
      return this;
    }

    // Oscilação horizontal senoidal em torno da posição de origem.
    setWobble(amplitude, frequency) {
      this.wobble = { amp: amplitude, freq: frequency, baseX: this.x };
      return this;
    }

    // Trajetória própria, aplicada depois da física: ziguezague, espiral,
    // perseguição, ricochete. Recebe (projétil, idade em ms).
    setPath(fn) {
      this.path = fn;
      return this;
    }

    // Giro contínuo do sprite, em radianos por ms.
    setSpin(radPerMs) {
      this.spin = radPerMs;
      return this;
    }

    // Some sozinho depois de um tempo, para ataques que ficam presos na caixa.
    setLifetime(ms) {
      this.lifetime = ms;
      return this;
    }

    update(dt) {
      const t = dt / 16.67;
      this.vy += this.gravity * t;
      this.x += this.vx * t;
      this.y += this.vy * t;
      this.age += dt;

      if (this.wobble) {
        this.wobble.baseX += this.vx * t;
        this.x = this.wobble.baseX + Math.sin(this.age * this.wobble.freq) * this.wobble.amp;
      }

      if (this.spin) this.angle += this.spin * dt;
      if (this.path) this.path(this, this.age);
      if (this.lifetime && this.age > this.lifetime) this.alive = false;

      if (this.frames) {
        this._frameTimer += dt;
        if (this._frameTimer >= this.frameMs) {
          this._frameTimer = 0;
          this._frameIndex = (this._frameIndex + 1) % this.frames.length;
          this.spriteKey = this.frames[this._frameIndex];
        }
      }

      if (this.x < -80 || this.x > CANVAS_W + 80 ||
          this.y < -80 || this.y > CANVAS_H + 80)
        this.alive = false;
    }

    render(ctx, sprites) {
      const img = sprites[this.spriteKey];
      if (!img) return;
      if (this.angle) {
        ctx.save();
        ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        ctx.rotate(this.angle);
        ctx.drawImage(img, -this.w / 2, -this.h / 2, this.w, this.h);
        ctx.restore();
      } else {
        ctx.drawImage(img, this.x, this.y, this.w, this.h);
      }
    }

    getHitbox() {
      return { x: this.x, y: this.y, w: this.w, h: this.h };
    }
  }

  // ── Estilhaços da alma ────────────────────────────────────
  // O coração racha e depois se parte em muitos cacos. Como não existe
  // sprite de caco, cada pedaço é um recorte do próprio heart_break em
  // grade, arremessado para fora com gravidade e giro.
  const SHARD_COLS = 5;
  const SHARD_ROWS = 4;
  const SHARD_SCALE = 3;
  const SHARD_GRAVITY = 0.0011;   // px/ms²

  class SoulShard {
    constructor(sx, sy, sw, sh, x, y, vx, vy, spin) {
      this.sx = sx; this.sy = sy; this.sw = sw; this.sh = sh;
      this.x = x; this.y = y;
      this.vx = vx; this.vy = vy;
      this.angle = 0; this.spin = spin;
    }

    update(dt) {
      this.vy += SHARD_GRAVITY * dt;
      this.x += this.vx * dt;
      this.y += this.vy * dt;
      this.angle += this.spin * dt;
    }

    render(ctx, img) {
      const w = this.sw * SHARD_SCALE;
      const h = this.sh * SHARD_SCALE;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(img, this.sx, this.sy, this.sw, this.sh, -w / 2, -h / 2, w, h);
      ctx.restore();
    }
  }

  // Recorta o sprite em grade e joga cada caco para longe do centro.
  function makeSoulShards(img, cx, cy) {
    const cellW = img.width / SHARD_COLS;
    const cellH = img.height / SHARD_ROWS;
    const shards = [];

    for (let row = 0; row < SHARD_ROWS; row++) {
      for (let col = 0; col < SHARD_COLS; col++) {
        // Posição do caco na tela, mantendo o desenho do coração no instante
        // em que ele se parte.
        const px = cx + (col - (SHARD_COLS - 1) / 2) * cellW * SHARD_SCALE;
        const py = cy + (row - (SHARD_ROWS - 1) / 2) * cellH * SHARD_SCALE;

        const dx = px - cx;
        const dy = py - cy;
        const dist = Math.max(1, Math.hypot(dx, dy));

        shards.push(new SoulShard(
          col * cellW, row * cellH, cellW, cellH,
          px, py,
          (dx / dist) * rand(0.10, 0.26) + rand(-0.05, 0.05),
          (dy / dist) * rand(0.08, 0.20) - rand(0.10, 0.28),
          rand(-0.008, 0.008)
        ));
      }
    }
    return shards;
  }

  // ── AABB collision ────────────────────────────────────────
  function aabb(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
  }

  // ── Attack patterns ───────────────────────────────────────
  // Cada monstro tem vários padrões; o engine sorteia um por turno e
  // nunca repete o mesmo duas vezes seguidas (ver _pickAttackPattern).
  // spawn(t, dt, box, soul) devolve os projéteis criados neste frame;
  // `soul` permite ataques mirados no jogador.

  // Dispara uma vez a cada `ms`, independente da variação do dt.
  function beat(t, dt, ms) {
    return Math.floor(t / ms) !== Math.floor(Math.max(0, t - dt) / ms);
  }

  function rand(min, max) { return min + Math.random() * (max - min); }

  const ATTACK_PATTERNS = {
    froggit: [
      {
        // Moscas atravessam a caixa subindo e descendo em onda.
        id: 'flyzigzag',
        box: [380, 130],
        spawn(t, dt, box) {
          if (!beat(t, dt, 560)) return [];
          const fromLeft = Math.random() > 0.5;
          const baseY = rand(box.y + 24, box.y + box.h - 40);
          const amp = rand(16, 30);
          const p = new Projectile(
            fromLeft ? box.x - 24 : box.x + box.w + 24, baseY,
            fromLeft ? 1.8 : -1.8, 0, 16, 16, SPRITE.attacks.fly_0
          );
          p.setFrames([SPRITE.attacks.fly_0, SPRITE.attacks.fly_1], 120);
          p.setPath((s, age) => { s.y = baseY + Math.sin(age * 0.006) * amp; });
          return [p];
        },
      },
      {
        id: 'flies',
        box: [300, 140],
        spawn(t, dt, box) {
          if (!beat(t, dt, 420)) return [];
          const p = new Projectile(
            rand(box.x + 10, box.x + box.w - 30), box.y - 14,
            0, rand(1.6, 2.4), 24, 24, SPRITE.attacks.fly_0
          );
          p.setFrames([SPRITE.attacks.fly_0, SPRITE.attacks.fly_1], 120);
          p.setWobble(18, 0.006);
          return [p];
        },
      },
      {
        id: 'hop',
        box: [340, 130],
        spawn(t, dt, box) {
          if (!beat(t, dt, 900)) return [];
          const fromLeft = Math.random() > 0.5;
          const p = new Projectile(
            fromLeft ? box.x - 20 : box.x + box.w + 20,
            box.y + box.h - 30,
            fromLeft ? 2.2 : -2.2, -3.4,
            30, 30, SPRITE.attacks.frog_bullet
          );
          p.gravity = 0.13;
          return [p];
        },
      },
      {
        id: 'swarm',
        box: [430, 110],
        spawn(t, dt, box) {
          if (!beat(t, dt, 340)) return [];
          const fromLeft = Math.random() > 0.5;
          const p = new Projectile(
            fromLeft ? box.x - 24 : box.x + box.w + 24,
            rand(box.y + 8, box.y + box.h - 28),
            fromLeft ? 2.6 : -2.6, 0,
            20, 20, SPRITE.attacks.smallfrog_0
          );
          p.setFrames([SPRITE.attacks.smallfrog_0, SPRITE.attacks.smallfrog_1], 150);
          return [p];
        },
      },
    ],

    napstablook: [
      {
        // Lágrimas caem escorregando na direção do jogador: dá para desviar,
        // mas não adianta ficar parado.
        id: 'tearchase',
        box: [320, 140],
        spawn(t, dt, box, soul) {
          if (!beat(t, dt, 300)) return [];
          const p = new Projectile(
            rand(box.x + 10, box.x + box.w - 26), box.y - 18,
            0, 2.0, 16, 18, SPRITE.attacks.teardrop
          );
          p.setPath((s) => {
            const target = soul.x + soul.w / 2 - s.w / 2;
            s.x += Math.max(-0.9, Math.min(0.9, (target - s.x) * 0.02));
          });
          return [p];
        },
      },
      {
        id: 'tears',
        box: [280, 140],
        spawn(t, dt, box) {
          if (!beat(t, dt, 300)) return [];
          const cols = 5;
          const gap = box.w / cols;
          const col = Math.floor(Math.random() * cols);
          return [new Projectile(
            box.x + gap * col + gap / 2 - 8, box.y - 14,
            0, rand(2.0, 3.0), 16, 18, SPRITE.attacks.teardrop
          )];
        },
      },
      {
        id: 'tearwall',
        box: [430, 130],
        spawn(t, dt, box) {
          // Parede de lágrimas com uma única brecha para escapar.
          if (!beat(t, dt, 1400)) return [];
          const cols = 7;
          const gap = box.w / cols;
          const hole = Math.floor(Math.random() * cols);
          const projs = [];
          for (let i = 0; i < cols; i++) {
            if (i === hole) continue;
            projs.push(new Projectile(
              box.x + gap * i + gap / 2 - 8, box.y - 20,
              0, 2.2, 16, 18, SPRITE.attacks.teardrop
            ));
          }
          return projs;
        },
      },
      {
        id: 'tearrain',
        box: [340, 140],
        spawn(t, dt, box) {
          if (!beat(t, dt, 220)) return [];
          const fromLeft = Math.random() > 0.5;
          return [new Projectile(
            rand(box.x, box.x + box.w), box.y - 16,
            fromLeft ? 1.1 : -1.1, 2.4, 16, 18, SPRITE.attacks.teardrop
          )];
        },
      },
    ],

    toriel: [
      {
        // Espiral de chamas: o raio cresce enquanto o anel gira.
        id: 'firespiral',
        box: [300, 140],
        spawn(t, dt, box) {
          if (!beat(t, dt, 1400)) return [];
          const cx = box.x + box.w / 2;
          const cy = box.y + box.h / 2;
          const dir = Math.random() > 0.5 ? 1 : -1;
          const offset = Math.random() * Math.PI * 2;
          const count = 8;
          const projs = [];
          for (let i = 0; i < count; i++) {
            const a0 = offset + (i / count) * Math.PI * 2;
            const p = new Projectile(cx, cy, 0, 0, 24, 24, SPRITE.attacks.fire_0);
            p.setFrames([SPRITE.attacks.fire_0, SPRITE.attacks.fire_1], 110);
            p.setPath((s, age) => {
              const a = a0 + dir * age * 0.0016;
              const r = 16 + age * 0.10;
              s.x = cx + Math.cos(a) * r - s.w / 2;
              s.y = cy + Math.sin(a) * r - s.h / 2;
            });
            p.setLifetime(4200);
            projs.push(p);
          }
          return projs;
        },
      },
      {
        id: 'firewave',
        box: [440, 110],
        spawn(t, dt, box) {
          if (!beat(t, dt, 480)) return [];
          const fromLeft = Math.random() > 0.5;
          const p = new Projectile(
            fromLeft ? box.x - 24 : box.x + box.w + 24,
            rand(box.y + 10, box.y + box.h - 34),
            fromLeft ? 2.4 : -2.4, 0,
            24, 24, SPRITE.attacks.fire_0
          );
          p.setFrames([SPRITE.attacks.fire_0, SPRITE.attacks.fire_1], 110);
          return [p];
        },
      },
      {
        id: 'pillars',
        box: [360, 140],
        spawn(t, dt, box) {
          // Colunas de chamas subindo do chão da caixa.
          if (!beat(t, dt, 700)) return [];
          const projs = [];
          for (let i = 0; i < 2; i++) {
            const p = new Projectile(
              rand(box.x + 10, box.x + box.w - 42), box.y + box.h + 20,
              0, -2.0, 32, 32, SPRITE.attacks.flame_0
            );
            p.setFrames([SPRITE.attacks.flame_0, SPRITE.attacks.flame_1], 130);
            projs.push(p);
          }
          return projs;
        },
      },
      {
        id: 'firering',
        box: [280, 140],
        spawn(t, dt, box) {
          if (!beat(t, dt, 1100)) return [];
          const cx = box.x + box.w / 2;
          const cy = box.y + box.h / 2;
          const dist = Math.max(box.w, box.h) / 2 + 40;
          const projs = [];
          const count = 6;
          const offset = Math.random() * Math.PI * 2;
          for (let i = 0; i < count; i++) {
            const a = offset + (i / count) * Math.PI * 2;
            const p = new Projectile(
              cx + Math.cos(a) * dist, cy + Math.sin(a) * dist,
              -Math.cos(a) * 2.0, -Math.sin(a) * 2.0,
              24, 24, SPRITE.attacks.fire_0
            );
            p.setFrames([SPRITE.attacks.fire_0, SPRITE.attacks.fire_1], 110);
            projs.push(p);
          }
          return projs;
        },
      },
    ],

    papyrus: [
      {
        // Escadinha de ossos: as alturas sobem e descem em sequência e a
        // escada troca de chão para teto, então o jogador acompanha um ritmo
        // em vez de reagir a cada osso solto.
        id: 'bonestair',
        box: [460, 130],
        spawn(t, dt, box) {
          if (!beat(t, dt, 240)) return [];
          const step = Math.floor(t / 240) % 20;
          const fromCeiling = step >= 10;
          const h = 20 + Math.abs(4.5 - (step % 10)) * 9;
          return [new Projectile(
            box.x + box.w + 20,
            fromCeiling ? box.y : box.y + box.h - h,
            -3.2, 0, 10, h, SPRITE.attacks.bone_v
          )];
        },
      },
      {
        id: 'bonesides',
        box: [480, 100],
        spawn(t, dt, box) {
          if (!beat(t, dt, 420)) return [];
          const fromLeft = Math.random() > 0.5;
          return [new Projectile(
            fromLeft ? box.x - 60 : box.x + box.w + 60,
            rand(box.y + 10, box.y + box.h - 22),
            fromLeft ? 3.0 : -3.0, 0,
            50, 10, SPRITE.attacks.bone_h
          )];
        },
      },
      {
        id: 'bonejump',
        box: [440, 120],
        spawn(t, dt, box) {
          // Ossos subindo do chão: o clássico "pule!" do Papyrus.
          if (!beat(t, dt, 620)) return [];
          const h = rand(28, 62);
          return [new Projectile(
            rand(box.x + 12, box.x + box.w - 22), box.y + box.h + h,
            -2.6, 0, 10, h, SPRITE.attacks.bone_v
          )];
        },
      },
      {
        id: 'bonegate',
        box: [420, 140],
        spawn(t, dt, box) {
          // Par de ossos (topo + base) deixando uma passagem no meio.
          if (!beat(t, dt, 800)) return [];
          const gapCenter = rand(box.y + 40, box.y + box.h - 40);
          const gap = 46;
          const topH = gapCenter - gap / 2 - box.y;
          const botH = box.y + box.h - (gapCenter + gap / 2);
          const x = box.x + box.w + 20;
          const projs = [];
          if (topH > 12)
            projs.push(new Projectile(x, box.y, -3.2, 0, 10, topH, SPRITE.attacks.bone_loop));
          if (botH > 12)
            projs.push(new Projectile(x, gapCenter + gap / 2, -3.2, 0, 10, botH, SPRITE.attacks.bone_loop));
          return projs;
        },
      },
    ],

    undyne: [
      {
        // Lanças miram onde o jogador estava no instante do disparo.
        id: 'spearaim',
        box: [300, 140],
        spawn(t, dt, box, soul) {
          if (!beat(t, dt, 620)) return [];
          const cx = box.x + box.w / 2;
          const cy = box.y + box.h / 2;
          const a0 = Math.random() * Math.PI * 2;
          const dist = Math.max(box.w, box.h);
          const sx = cx + Math.cos(a0) * dist;
          const sy = cy + Math.sin(a0) * dist;
          const tx = soul.x + soul.w / 2;
          const ty = soul.y + soul.h / 2;
          const d = Math.max(1, Math.hypot(tx - sx, ty - sy));
          const spd = 3.0;
          const p = new Projectile(
            sx, sy, ((tx - sx) / d) * spd, ((ty - sy) / d) * spd,
            12, 34, SPRITE.attacks.spear
          );
          p.angle = Math.atan2(ty - sy, tx - sx) + Math.PI / 2;
          return [p];
        },
      },
      {
        id: 'spearcross',
        box: [260, 140],
        spawn(t, dt, box) {
          if (!beat(t, dt, 300)) return [];
          const cx = box.x + box.w / 2;
          const cy = box.y + box.h / 2;
          const side = Math.floor(Math.random() * 4);
          let x, y, vx, vy, angle;
          const spd = 3.2;
          switch (side) {
            case 0: x = box.x - 30;         y = rand(box.y, box.y + box.h); vx = spd;  vy = 0;   angle = Math.PI / 2; break;
            case 1: x = box.x + box.w + 30; y = rand(box.y, box.y + box.h); vx = -spd; vy = 0;   angle = -Math.PI / 2; break;
            case 2: x = rand(box.x, box.x + box.w); y = box.y - 30;         vx = 0;    vy = spd; angle = Math.PI; break;
            default: x = rand(box.x, box.x + box.w); y = box.y + box.h + 30; vx = 0;   vy = -spd; angle = 0; break;
          }
          const p = new Projectile(x, y, vx, vy, 14, 56, SPRITE.attacks.spear);
          p.angle = angle;
          return [p];
        },
      },
      {
        id: 'spearrain',
        box: [420, 130],
        spawn(t, dt, box) {
          if (!beat(t, dt, 260)) return [];
          const p = new Projectile(
            rand(box.x + 8, box.x + box.w - 22), box.y - 60,
            0, 4.0, 14, 56, SPRITE.attacks.spear
          );
          p.angle = Math.PI;
          return [p];
        },
      },
      {
        id: 'spearburst',
        box: [260, 140],
        spawn(t, dt, box) {
          // Rajada radial de lanças brancas.
          if (!beat(t, dt, 1300)) return [];
          const cx = box.x + box.w / 2;
          const cy = box.y + box.h / 2;
          const dist = Math.max(box.w, box.h) / 2 + 50;
          const count = 8;
          const offset = Math.random() * Math.PI * 2;
          const projs = [];
          for (let i = 0; i < count; i++) {
            const a = offset + (i / count) * Math.PI * 2;
            const p = new Projectile(
              cx + Math.cos(a) * dist - 14, cy + Math.sin(a) * dist - 14,
              -Math.cos(a) * 2.6, -Math.sin(a) * 2.6,
              28, 28, SPRITE.attacks.spear_white
            );
            projs.push(p);
          }
          return projs;
        },
      },
    ],

    sans: [
      {
        // Ossos rápidos que trocam de altura no meio do caminho.
        id: 'bonezig',
        box: [420, 140],
        spawn(t, dt, box) {
          if (!beat(t, dt, 280)) return [];
          const fromLeft = Math.random() > 0.5;
          const baseY = rand(box.y + 20, box.y + box.h - 34);
          const p = new Projectile(
            fromLeft ? box.x - 60 : box.x + box.w + 60, baseY,
            fromLeft ? 4.2 : -4.2, 0, 50, 10, SPRITE.attacks.bone_h
          );
          p.setPath((s, age) => { s.y = baseY + Math.sin(age * 0.009) * 32; });
          return [p];
        },
      },
      {
        id: 'bonebarrage',
        box: [300, 140],
        spawn(t, dt, box) {
          if (!beat(t, dt, 220)) return [];
          const cx = box.x + box.w / 2;
          const cy = box.y + box.h / 2;
          const side = Math.floor(Math.random() * 4);
          let x, y, vx, vy;
          const spd = 3.6;
          switch (side) {
            case 0: x = box.x - 60;         y = rand(box.y, box.y + box.h); vx = spd;  vy = 0;   break;
            case 1: x = box.x + box.w + 60; y = rand(box.y, box.y + box.h); vx = -spd; vy = 0;   break;
            case 2: x = rand(box.x, box.x + box.w); y = box.y - 60;         vx = 0;    vy = spd; break;
            default: x = rand(box.x, box.x + box.w); y = box.y + box.h + 60; vx = 0;   vy = -spd; break;
          }
          const isH = Math.abs(vx) > Math.abs(vy);
          return [new Projectile(x, y, vx, vy,
            isH ? 50 : 10, isH ? 10 : 50,
            isH ? SPRITE.attacks.bone_h : SPRITE.attacks.bone_v)];
        },
      },
      {
        id: 'blasters',
        box: [420, 140],
        spawn(t, dt, box) {
          if (!beat(t, dt, 1200)) return [];
          const p = new Projectile(
            rand(box.x, box.x + box.w - 44), box.y - 70,
            0, 2.6, 43, 57, SPRITE.gaster[0]
          );
          p.setFrames(SPRITE.gaster, 80);
          return [p];
        },
      },
      {
        id: 'bonewall',
        box: [400, 140],
        spawn(t, dt, box) {
          // Paredes alternadas em cima e embaixo — força movimento vertical.
          if (!beat(t, dt, 700)) return [];
          const fromTop = Math.floor(t / 700) % 2 === 0;
          const h = box.h * 0.55;
          return [new Projectile(
            box.x + box.w + 20,
            fromTop ? box.y : box.y + box.h - h,
            -4.0, 0, 10, h, SPRITE.attacks.bone_loop
          )];
        },
      },
    ],

    flowey: [
      {
        // Espiral de "amizade": os pellets saem do centro girando devagar.
        id: 'pelletspiral',
        box: [300, 140],
        spawn(t, dt, box) {
          if (!beat(t, dt, 95)) return [];
          const cx = box.x + box.w / 2;
          const cy = box.y + box.h / 2;
          const a = (t / 95) * 0.55;
          const spd = 1.9;
          const p = new Projectile(
            cx - 8, cy - 8,
            Math.cos(a) * spd, Math.sin(a) * spd,
            16, 16, SPRITE.attacks.bullet_0
          );
          p.setFrames([SPRITE.attacks.bullet_0, SPRITE.attacks.bullet_1], 100);
          return [p];
        },
      },
      {
        id: 'pelletring',
        box: [280, 140],
        spawn(t, dt, box) {
          if (!beat(t, dt, 260)) return [];
          const cx = box.x + box.w / 2;
          const cy = box.y + box.h / 2;
          const a = Math.random() * Math.PI * 2;
          const dist = Math.max(box.w, box.h) / 2 + 34;
          const spd = 2.6;
          const sprite = Math.random() > 0.5 ? SPRITE.attacks.bullet_0 : SPRITE.attacks.bullet_1;
          return [new Projectile(
            cx + Math.cos(a) * dist, cy + Math.sin(a) * dist,
            -Math.cos(a) * spd, -Math.sin(a) * spd,
            16, 16, sprite
          )];
        },
      },
      {
        id: 'pelletwave',
        box: [440, 120],
        spawn(t, dt, box) {
          if (!beat(t, dt, 340)) return [];
          const p = new Projectile(
            box.x + box.w + 20, rand(box.y + 12, box.y + box.h - 28),
            -2.4, 0, 16, 16, SPRITE.attacks.bullet_1
          );
          p.setWobble(22, 0.008);
          return [p];
        },
      },
      {
        id: 'pelletrain',
        box: [360, 140],
        spawn(t, dt, box) {
          if (!beat(t, dt, 500)) return [];
          const projs = [];
          for (let i = 0; i < 3; i++) {
            projs.push(new Projectile(
              rand(box.x + 6, box.x + box.w - 22), box.y - 20 - i * 26,
              0, 3.0, 16, 16, SPRITE.attacks.bullet_0
            ));
          }
          return projs;
        },
      },
    ],

    mettaton: [
      {
        // Bombas de palco ricocheteando nas paredes da caixa.
        id: 'discobounce',
        box: [420, 140],
        spawn(t, dt, box) {
          if (!beat(t, dt, 900)) return [];
          const p = new Projectile(
            rand(box.x + 40, box.x + box.w - 64),
            rand(box.y + 24, box.y + box.h - 48),
            rand(1.4, 2.2) * (Math.random() > 0.5 ? 1 : -1),
            rand(1.2, 2.0) * (Math.random() > 0.5 ? 1 : -1),
            24, 24, SPRITE.attacks.bomb_0
          );
          p.setFrames(
            [SPRITE.attacks.bomb_0, SPRITE.attacks.bomb_1, SPRITE.attacks.bomb_2], 120
          );
          p.setSpin(0.004);
          p.setPath((s) => {
            const l = box.x + BOX_BORDER;
            const r = box.x + box.w - BOX_BORDER - s.w;
            const tp = box.y + BOX_BORDER;
            const bt = box.y + box.h - BOX_BORDER - s.h;
            if (s.x < l)  { s.x = l;  s.vx = Math.abs(s.vx); }
            if (s.x > r)  { s.x = r;  s.vx = -Math.abs(s.vx); }
            if (s.y < tp) { s.y = tp; s.vy = Math.abs(s.vy); }
            if (s.y > bt) { s.y = bt; s.vy = -Math.abs(s.vy); }
          });
          // Nunca sai da caixa, então precisa de prazo de validade.
          p.setLifetime(5200);
          return [p];
        },
      },
      {
        id: 'bombs',
        box: [420, 130],
        spawn(t, dt, box) {
          if (!beat(t, dt, 360)) return [];
          const p = new Projectile(
            rand(box.x + 8, box.x + box.w - 32), box.y - 24,
            0, 2.4, 24, 24, SPRITE.attacks.bomb_0
          );
          p.setFrames([SPRITE.attacks.bomb_0, SPRITE.attacks.bomb_1, SPRITE.attacks.bomb_2], 100);
          return [p];
        },
      },
      {
        id: 'legs',
        box: [480, 100],
        spawn(t, dt, box) {
          if (!beat(t, dt, 320)) return [];
          const fromLeft = Math.random() > 0.5;
          const p = new Projectile(
            fromLeft ? box.x - 30 : box.x + box.w + 30,
            rand(box.y + 6, box.y + box.h - 20),
            fromLeft ? 3.2 : -3.2, 0,
            14, 56, SPRITE.attacks.spear
          );
          p.angle = fromLeft ? Math.PI / 2 : -Math.PI / 2;
          return [p];
        },
      },
      {
        id: 'showtime',
        box: [400, 140],
        spawn(t, dt, box) {
          const projs = [];
          if (beat(t, dt, 500)) {
            const p = new Projectile(
              rand(box.x + 8, box.x + box.w - 32), box.y - 24,
              rand(-0.8, 0.8), 2.6, 24, 24, SPRITE.attacks.bomb_0
            );
            p.setFrames([SPRITE.attacks.bomb_0, SPRITE.attacks.bomb_1, SPRITE.attacks.bomb_2], 100);
            projs.push(p);
          }
          if (beat(t, dt, 380)) {
            projs.push(new Projectile(
              rand(box.x + 8, box.x + box.w - 24), box.y + box.h + 20,
              0, -3.0, 16, 16, SPRITE.attacks.bullet_1
            ));
          }
          return projs;
        },
      },
    ],
  };

  // ── Typewriter ────────────────────────────────────────────
  class Typewriter {
    constructor() {
      this.text = '';
      this.displayText = '';
      this.charIndex = 0;
      this.timer = 0;
      this.speed = 30;
      this.done = false;
      this.onDone = null;
    }

    setText(text, onDone) {
      this.text = text;
      this.displayText = '';
      this.charIndex = 0;
      this.timer = 0;
      this.done = false;
      this.onDone = onDone || null;
    }

    skip() {
      this.displayText = this.text;
      this.charIndex = this.text.length;
      this.done = true;
    }

    update(dt) {
      if (this.done) return;
      this.timer += dt;
      while (this.timer >= this.speed && this.charIndex < this.text.length) {
        this.timer -= this.speed;
        this.displayText += this.text[this.charIndex];
        this.charIndex++;
      }
      if (this.charIndex >= this.text.length) {
        this.done = true;
        if (this.onDone) this.onDone();
      }
    }

    render(ctx, x, y, maxWidth, opts) {
      const o = opts || {};
      ctx.fillStyle = o.color || '#fff';
      ctx.font = o.font || '15px "Press Start 2P", monospace';
      const lineHeight = o.lineHeight || 26;
      let ly = y;
      for (const line of wrapText(ctx, this.displayText, maxWidth)) {
        ctx.fillText(line, x, ly);
        ly += lineHeight;
      }
    }
  }

  // ── Número de dano (spr_dmgnum) ───────────────────────────
  // Dígitos compostos a partir de dmg_0..9; `value` null = MISS.
  class DamageNumber {
    constructor(value, centerX, centerY, big) {
      this.digits = value === null ? null : String(value).split('');
      this.centerX = centerX;
      this.centerY = centerY;
      this.scale = big ? 1.35 : 1;
      this.life = 1300;
      this.age = 0;
    }

    update(dt) { this.age += dt; }

    get alive() { return this.age < this.life; }

    render(ctx, sprites) {
      // Sobe alguns pixels no início e depois só desvanece.
      const y = this.centerY - Math.min(1, this.age / 300) * 16;
      const k = this.age / this.life;
      ctx.globalAlpha = k < 0.65 ? 1 : Math.max(0, 1 - (k - 0.65) / 0.35);

      if (!this.digits) {
        const img = sprites[SPRITE.fight.dmgMiss];
        if (img) {
          const w = img.width * this.scale;
          const h = img.height * this.scale;
          ctx.drawImage(img, this.centerX - w / 2, y - h / 2, w, h);
        }
      } else {
        const adv = DMG_DIGIT_ADVANCE * this.scale;
        const first = sprites[SPRITE.fight.dmgDigits[0]];
        const glyphW = (first ? first.width : 30) * this.scale;
        const totalW = adv * (this.digits.length - 1) + glyphW;
        let x = this.centerX - totalW / 2;
        for (const d of this.digits) {
          const img = sprites[SPRITE.fight.dmgDigits[Number(d)]];
          if (img) {
            const w = img.width * this.scale;
            const h = img.height * this.scale;
            ctx.drawImage(img, x, y - h / 2, w, h);
          }
          x += adv;
        }
      }

      ctx.globalAlpha = 1;
    }
  }

  // ── BattleEngine ──────────────────────────────────────────
  class BattleEngine {
    constructor(canvasId, bossConfig, cartItems, onWin, onLose) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = CANVAS_W;
      this.canvas.height = CANVAS_H;
      this.ctx.imageSmoothingEnabled = false;

      this.boss = Object.assign({}, bossConfig);
      this.boss.currentHp = this.boss.hp;
      this.boss.shakeTimer = 0;
      this.boss.actCount = 0;
      this.boss.spareable = false;

      this.cartItems = (cartItems || []).map(it => ({
        name: it.name,
        price: it.price,
        heal: Math.max(2, Math.round(it.price / 5)),
      }));

      this.onWin = onWin || (() => {});
      this.onLose = onLose || (() => {});

      this.state = STATE.INTRO;
      this.prevTime = 0;
      this.keys = {};
      this.justPressed = {};

      this.soul = new Soul(
        BOX_X + BOX_W / 2 - SOUL_SIZE / 2,
        BOX_Y + BOX_H / 2 - SOUL_SIZE / 2
      );

      this.battleBox = { x: BOX_X, y: BOX_Y, w: BOX_W, h: BOX_H };
      this.projectiles = [];
      this.damageNumbers = [];
      this.typewriter = new Typewriter();
      this.sprites = {};
      this.running = false;

      // Fala do monstro → balão ao lado dele; resto → caixa de texto.
      this.speechActive = false;
      this.bossRect = { x: CANVAS_W / 2 - 40, y: BOSS_AREA_TOP, w: 80, h: 80 };

      this.menuIndex = 0;
      this.menuOptions = ['fight', 'act', 'item', 'mercy'];
      this.subMenuIndex = 0;
      this.subMenuItems = [];

      this.fightBar = this._newFightBar();
      this.slashKind = SLASH_BY_BOSS[this.boss.attackType] || 'glove';
      this.enemyHpBar = { visible: false, timer: 0, from: 1, to: 1, display: 1 };
      this.enemyTurnTimer = 0;
      this.enemyTurnDuration = 0;
      this.attackPattern = null;
      this.lastAttackId = null;
      this.soulEntered = false;
      this.introStep = 0;
      this.dialogueIndex = 0;
      this.messageTimer = 0;
      this.messageNext = STATE.MENU;
      this.winTimer = 0;
      this.loseTimer = 0;
      this.losePhase = 0;
      this.retryAvailable = false;
      this.finished = false;
      this.boxAnim = null;
      this.soulShards = null;

      this._boundKeyDown = this._onKeyDown.bind(this);
      this._boundKeyUp = this._onKeyUp.bind(this);
      this._rafId = null;
    }

    async start() {
      this.sprites = await preloadImages();
      document.addEventListener('keydown', this._boundKeyDown);
      document.addEventListener('keyup', this._boundKeyUp);
      this.running = true;
      this.setState(STATE.INTRO);
      this._rafId = requestAnimationFrame(ts => this.gameLoop(ts));
    }

    destroy() {
      this.running = false;
      if (this._rafId) cancelAnimationFrame(this._rafId);
      document.removeEventListener('keydown', this._boundKeyDown);
      document.removeEventListener('keyup', this._boundKeyUp);
    }

    _onKeyDown(e) {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','z','x','Z','X','Enter','Shift'].includes(e.key)) {
        e.preventDefault();
        const k = this._normalizeKey(e.key);
        if (!this.keys[k]) this.justPressed[k] = true;
        this.keys[k] = true;
      }
    }

    _onKeyUp(e) {
      const k = this._normalizeKey(e.key);
      this.keys[k] = false;
    }

    _normalizeKey(key) {
      if (key === 'z' || key === 'Z' || key === 'Enter') return 'confirm';
      if (key === 'x' || key === 'X' || key === 'Shift') return 'cancel';
      return key;
    }

    _pressed(k) { return !!this.justPressed[k]; }

    // Fala do monstro (balão) x texto de sistema (caixa de texto).
    _say(text, isSpeech) {
      this.speechActive = !!isSpeech;
      this.typewriter.setText(text);
    }

    // Mostra um texto e só então avança para o próximo estado.
    _showMessage(text, isSpeech, nextState) {
      this.messageNext = nextState;
      this.messageTimer = 0;
      this._say(text, isSpeech);
      this.setState(STATE.MESSAGE);
    }

    // Fases: idle → sweep → freeze → slash → result.
    _newFightBar() {
      return {
        phase: 'idle',
        pos: 0,
        speed: FIGHT_BAR_SPEED,
        timer: 0,
        accuracy: 0,
        crit: false,
        miss: false,
      };
    }

    // Sorteia um padrão diferente do usado no turno anterior.
    _pickAttackPattern() {
      const all = ATTACK_PATTERNS[this.boss.attackType] || [];
      if (all.length === 0) return null;
      const pool = all.length > 1
        ? all.filter(p => p.id !== this.lastAttackId)
        : all;
      const chosen = pool[Math.floor(Math.random() * pool.length)];
      this.lastAttackId = chosen.id;
      return chosen;
    }

    setState(newState) {
      this.state = newState;
      // Fora do turno inimigo a caixa sempre volta ao tamanho cheio.
      if (newState !== STATE.ENEMY_TURN) this._setBoxSize(BOX_W, BOX_H);
      switch (newState) {
        case STATE.INTRO:
          this.introStep = 0;
          this.dialogueIndex = 0;
          this._say(this.boss.dialogue[0], true);
          this.typewriter.onDone = () => { this.introStep = 1; };
          break;
        case STATE.MENU:
          this.menuIndex = 0;
          break;
        case STATE.FIGHT_ANIM:
          this.fightBar = this._newFightBar();
          this.fightBar.phase = 'sweep';
          break;
        case STATE.ACT_SELECT:
          this.subMenuIndex = 0;
          this.subMenuItems = this.boss.actOptions;
          break;
        case STATE.ITEM_SELECT:
          this.subMenuIndex = 0;
          this.subMenuItems = this.cartItems.length > 0
            ? this.cartItems.map(it => `${it.name} (+${it.heal}HP)`)
            : ['(Sem itens)'];
          break;
        case STATE.ENEMY_TURN: {
          this.enemyTurnTimer = 0;
          this.enemyTurnDuration = 5000 + Math.random() * 3000;
          this.projectiles = [];
          this.attackPattern = this._pickAttackPattern();
          this.speechActive = false;
          const size = this.attackPattern && this.attackPattern.box;
          this._setBoxSize(size ? size[0] : BOX_W, size ? size[1] : BOX_H);
          this._placeSoulForTurn();
          break;
        }
        case STATE.WIN:
          this.winTimer = 0;
          this._say('* VOCÊ VENCEU!', false);
          break;
        case STATE.LOSE:
          this.loseTimer = 0;
          this.losePhase = 0;
          this.retryAvailable = false;
          this.soulShards = null;
          // Morrer no meio do turno deixava o ataque pendurado no estado.
          this.projectiles = [];
          break;
      }
    }

    // A caixa cresce/encolhe em torno do próprio centro, como no jogo.
    _setBoxSize(w, h) {
      const toW = Math.min(BOX_W, w);
      const toH = Math.min(BOX_H, h);
      const b = this.battleBox;
      if (Math.abs(b.w - toW) < 0.5 && Math.abs(b.h - toH) < 0.5) {
        this.boxAnim = null;
        return;
      }
      this.boxAnim = { fromW: b.w, fromH: b.h, toW, toH, timer: 0 };
    }

    _updateBox(dt) {
      const a = this.boxAnim;
      if (!a) return;
      a.timer += dt;
      const k = Math.min(1, a.timer / BOX_RESIZE_MS);
      const ease = 1 - Math.pow(1 - k, 3);
      const b = this.battleBox;
      b.w = a.fromW + (a.toW - a.fromW) * ease;
      b.h = a.fromH + (a.toH - a.fromH) * ease;
      b.x = BOX_X + BOX_W / 2 - b.w / 2;
      b.y = BOX_Y + BOX_H / 2 - b.h / 2;
      if (k >= 1) this.boxAnim = null;
    }

    // No primeiro turno a alma entra voando do menu; depois só reposiciona.
    _placeSoulForTurn() {
      const targetX = this.battleBox.x + this.battleBox.w / 2 - SOUL_SIZE / 2;
      const targetY = this.battleBox.y + this.battleBox.h / 2 - SOUL_SIZE / 2;

      if (this.soulEntered) {
        this.soul.x = targetX;
        this.soul.y = targetY;
        return;
      }

      this.soulEntered = true;
      this.soul.startEntry(
        BOX_X - 20, MENU_Y + MENU_BTN_H / 2 - SOUL_SIZE / 2,
        targetX, targetY
      );
    }

    gameLoop(timestamp) {
      if (!this.running) return;
      const dt = this.prevTime ? Math.min(timestamp - this.prevTime, 50) : 16.67;
      this.prevTime = timestamp;
      this.update(dt);
      this.render();
      this.justPressed = {};
      this._rafId = requestAnimationFrame(ts => this.gameLoop(ts));
    }

    // ── UPDATE ────────────────────────────────────────────────
    update(dt) {
      this.typewriter.update(dt);
      this._updateBox(dt);
      this.damageNumbers = this.damageNumbers.filter(d => { d.update(dt); return d.alive; });
      this._updateEnemyHpBar(dt);

      if (this.boss.shakeTimer > 0) this.boss.shakeTimer -= dt;

      switch (this.state) {
        case STATE.INTRO:
          if (this._pressed('confirm')) {
            if (!this.typewriter.done) {
              this.typewriter.skip();
            } else if (this.dialogueIndex < this.boss.dialogue.length - 1) {
              this.dialogueIndex++;
              this._say(this.boss.dialogue[this.dialogueIndex], true);
            } else {
              this.setState(STATE.MENU);
            }
          }
          break;

        case STATE.MENU:
          if (this._pressed('ArrowLeft'))  this.menuIndex = (this.menuIndex + 3) % 4;
          if (this._pressed('ArrowRight')) this.menuIndex = (this.menuIndex + 1) % 4;
          if (this._pressed('confirm')) {
            switch (this.menuOptions[this.menuIndex]) {
              case 'fight': this.setState(STATE.FIGHT_ANIM); break;
              case 'act':   this.setState(STATE.ACT_SELECT); break;
              case 'item':  this.setState(STATE.ITEM_SELECT); break;
              case 'mercy':
                if (this.boss.spareable) {
                  this.setState(STATE.WIN);
                } else {
                  this._showMessage('* Não é possível poupar ainda...', false, STATE.ENEMY_TURN);
                }
                break;
            }
          }
          break;

        case STATE.FIGHT_ANIM:
          this._updateFightSequence(dt);
          break;

        case STATE.ACT_SELECT:
          if (this._pressed('ArrowUp'))   this.subMenuIndex = Math.max(0, this.subMenuIndex - 1);
          if (this._pressed('ArrowDown')) this.subMenuIndex = Math.min(this.subMenuItems.length - 1, this.subMenuIndex + 1);
          if (this._pressed('cancel'))    this.setState(STATE.MENU);
          if (this._pressed('confirm')) {
            if (this.subMenuIndex === 0) {
              this._showMessage(
                `* ${this.boss.name} - ATK ${this.boss.atk} DEF ${this.boss.def}`,
                false, STATE.ENEMY_TURN
              );
            } else {
              this.boss.actCount++;
              if (this.boss.actCount >= this.boss.spareAfterActs) {
                this.boss.spareable = true;
                this._showMessage(
                  `* ${this.boss.name} parece estar cedendo...`,
                  false, STATE.ENEMY_TURN
                );
              } else {
                const msgs = [
                  `* Você usou ${this.subMenuItems[this.subMenuIndex]} em ${this.boss.name}.`,
                  `* ${this.boss.name} não sabe como reagir.`,
                ];
                this._showMessage(
                  msgs[Math.floor(Math.random() * msgs.length)],
                  false, STATE.ENEMY_TURN
                );
              }
            }
          }
          break;

        case STATE.ITEM_SELECT:
          if (this._pressed('ArrowUp'))   this.subMenuIndex = Math.max(0, this.subMenuIndex - 1);
          if (this._pressed('ArrowDown')) this.subMenuIndex = Math.min(this.subMenuItems.length - 1, this.subMenuIndex + 1);
          if (this._pressed('cancel'))    this.setState(STATE.MENU);
          if (this._pressed('confirm')) {
            if (this.cartItems.length > 0) {
              const item = this.cartItems[this.subMenuIndex];
              this.soul.hp = Math.min(this.soul.maxHp, this.soul.hp + item.heal);
              this.cartItems.splice(this.subMenuIndex, 1);
              this._showMessage(
                `* Você usou ${item.name}. Recuperou ${item.heal} HP!`,
                false, STATE.ENEMY_TURN
              );
            } else {
              this._showMessage('* Você não tem itens.', false, STATE.MENU);
            }
          }
          break;

        case STATE.MESSAGE:
          if (this._pressed('confirm')) {
            if (!this.typewriter.done) this.typewriter.skip();
            else this.setState(this.messageNext);
          } else if (this.typewriter.done) {
            this.messageTimer += dt;
            if (this.messageTimer > 1400) this.setState(this.messageNext);
          }
          break;

        case STATE.ENEMY_TURN: {
          this.soul.update(this.keys, this.battleBox, dt);
          this.enemyTurnTimer += dt;

          if (this.attackPattern && !this.soul.entering) {
            this.projectiles.push(
              ...this.attackPattern.spawn(this.enemyTurnTimer, dt, this.battleBox, this.soul)
            );
          }

          const soulBox = this.soul.getHitbox();
          for (const p of this.projectiles) {
            p.update(dt);
            if (p.alive && aabb(soulBox, p.getHitbox())) {
              this.soul.takeDamage(this.boss.atk);
            }
          }
          this.projectiles = this.projectiles.filter(p => p.alive);

          if (this.soul.hp <= 0) {
            this.setState(STATE.LOSE);
          } else if (this.enemyTurnTimer >= this.enemyTurnDuration) {
            this.projectiles = [];
            const nextDialogue = this.boss.dialogue[
              Math.floor(Math.random() * this.boss.dialogue.length)
            ];
            this.setState(STATE.MENU);
            this._say(nextDialogue, true);
          }
          break;
        }

        case STATE.WIN:
          this.winTimer += dt;
          if (this.winTimer > 3000) this._finish(this.onWin);
          break;

        case STATE.LOSE:
          this.loseTimer += dt;

          if (!this.soulShards && this.loseTimer >= LOSE_SHATTER_MS) {
            const img = this.sprites[SPRITE.soulBreak];
            if (img) this.soulShards = makeSoulShards(img, CANVAS_W / 2, CANVAS_H / 2 - 40);
          }
          if (this.soulShards) for (const s of this.soulShards) s.update(dt);

          if (this.losePhase === 0 && this.loseTimer > LOSE_PROMPT_MS) {
            this.losePhase = 1;
            this.retryAvailable = true;
            // Quem acabou de morrer costuma estar martelando Z. Sem descartar
            // o buffer, esse Z era consumido no mesmo quadro em que o aviso
            // aparecia e o combate reiniciava sem o jogador escolher nada.
            this.justPressed = {};
            break;
          }
          // Só aceita a escolha depois do aviso ficar legível por um instante.
          if (this.losePhase !== 1 ||
              this.loseTimer < LOSE_PROMPT_MS + LOSE_INPUT_GRACE_MS) break;

          if (this._pressed('confirm')) {
            this.soul.hp = this.soul.maxHp;
            this.soul.displayHp = this.soul.maxHp;
            this.boss.currentHp = this.boss.maxHp;
            this.boss.actCount = 0;
            this.boss.spareable = false;
            this.projectiles = [];
            this.damageNumbers = [];
            this.enemyHpBar.visible = false;
            this.soulEntered = false;
            this.soulShards = null;
            this.setState(STATE.INTRO);
          } else if (this._pressed('cancel')) {
            this._finish(this.onLose);
          }
          break;
      }
    }

    // Encerra o combate uma única vez: sem isso um quadro extra podia
    // disparar onWin/onLose de novo e reabrir o fluxo de compra.
    _finish(callback) {
      if (this.finished) return;
      this.finished = true;
      this.destroy();
      this._removeOverlay();
      callback();
    }

    _slashFrames() {
      return SPRITE.fight.slash[this.slashKind] || SPRITE.fight.slash.glove;
    }

    _updateFightSequence(dt) {
      const f = this.fightBar;
      f.timer += dt;

      switch (f.phase) {
        case 'sweep':
          if (this._pressed('confirm')) {
            this._lockFightCursor(false);
          } else {
            f.pos += f.speed * (dt / 16.67);
            if (f.pos >= 100) {
              f.pos = 100;
              this._lockFightCursor(true);  // deixou passar = MISS
            }
          }
          break;

        case 'freeze':
          if (f.timer >= FIGHT_FREEZE_MS) {
            f.timer = 0;
            if (f.miss) {
              f.phase = 'result';
              this._spawnDamageNumber(null, false);
            } else {
              f.phase = 'slash';
              this.boss.shakeTimer = this._slashFrames().length * SLASH_FRAME_MS + 140;
            }
          }
          break;

        case 'slash':
          if (f.timer >= this._slashFrames().length * SLASH_FRAME_MS) {
            f.timer = 0;
            f.phase = 'result';
            this._applyFightDamage();
          }
          break;

        case 'result':
          if (f.timer >= FIGHT_RESULT_MS) {
            if (this.boss.currentHp <= 0) this.setState(STATE.WIN);
            else this.setState(STATE.ENEMY_TURN);
          }
          break;
      }
    }

    // Congela o cursor onde ele parou; a precisão é a distância ao centro.
    _lockFightCursor(miss) {
      const f = this.fightBar;
      f.phase = 'freeze';
      f.timer = 0;
      f.miss = miss;
      f.accuracy = miss ? 0 : 1 - Math.abs(f.pos - 50) / 50;
      f.crit = !miss && f.accuracy > CRIT_ACCURACY;
    }

    // O número nasce no topo do monstro: os dígitos são brancos com
    // contorno preto e sumiriam sobre o corpo (branco) dos sprites.
    _spawnDamageNumber(value, big) {
      const r = this.bossRect;
      this.damageNumbers.push(
        new DamageNumber(value, r.x + r.w / 2, Math.max(38, r.y + r.h * 0.12), big)
      );
    }

    _applyFightDamage() {
      const f = this.fightBar;
      const baseDmg = 6 + Math.floor(f.accuracy * 14);
      let dmg = Math.max(1, baseDmg - this.boss.def);
      if (f.crit) dmg = Math.round(dmg * CRIT_MULTIPLIER);

      const before = this.boss.currentHp;
      this.boss.currentHp = Math.max(0, before - dmg);
      this._spawnDamageNumber(dmg, f.crit);
      this._showEnemyHpBar(before);
    }

    // A barra drena a partir do HP anterior (ou de onde a anterior parou).
    _showEnemyHpBar(previousHp) {
      const bar = this.enemyHpBar;
      const max = this.boss.maxHp || 1;
      bar.from = bar.visible ? bar.display : previousHp / max;
      bar.to = this.boss.currentHp / max;
      bar.display = bar.from;
      bar.timer = 0;
      bar.visible = true;
    }

    _updateEnemyHpBar(dt) {
      const bar = this.enemyHpBar;
      if (!bar.visible) return;
      bar.timer += dt;
      const k = Math.min(1, bar.timer / ENEMY_HP_DRAIN_MS);
      bar.display = bar.from + (bar.to - bar.from) * (1 - Math.pow(1 - k, 3));
      if (bar.timer >= ENEMY_HP_HOLD_MS + ENEMY_HP_FADE_MS) bar.visible = false;
    }

    _removeOverlay() {
      const overlay = document.getElementById('battle-overlay');
      if (overlay) overlay.classList.remove('active');
    }

    // ── RENDER ────────────────────────────────────────────────
    render() {
      const ctx = this.ctx;
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      this._renderBoss(ctx);

      if (this.state === STATE.LOSE) {
        this._renderLoseScreen(ctx);
        return;
      }

      if (this.state === STATE.FIGHT_ANIM) this._renderSlash(ctx);
      this._renderEnemyHpBar(ctx);

      this._renderBattleBox(ctx);

      if (this.state === STATE.ENEMY_TURN) {
        // A caixa recorta os projéteis, como no jogo: eles entram e saem
        // pelas bordas em vez de aparecer sobre o HUD.
        const b = this.battleBox;
        ctx.save();
        ctx.beginPath();
        ctx.rect(b.x + BOX_BORDER, b.y + BOX_BORDER,
                 b.w - BOX_BORDER * 2, b.h - BOX_BORDER * 2);
        ctx.clip();
        for (const p of this.projectiles) p.render(ctx, this.sprites);
        ctx.restore();
        // A alma fica fora do recorte para a animação de entrada, que
        // começa lá no menu, continuar visível.
        this.soul.render(ctx, this.sprites);
      } else if (this.state === STATE.FIGHT_ANIM) {
        this._renderFightBar(ctx);
      } else if (this.state === STATE.ACT_SELECT || this.state === STATE.ITEM_SELECT) {
        this._renderSubMenu(ctx);
      } else if (this.speechActive) {
        this._renderSpeechBubble(ctx);
      } else {
        this._renderDialogue(ctx);
      }

      if (this.state === STATE.MENU) {
        this._renderMenu(ctx);
      }

      this._renderHUD(ctx);

      for (const d of this.damageNumbers) d.render(ctx, this.sprites);

      if (this.state === STATE.WIN) {
        this._renderWin(ctx);
      }
    }

    _renderBoss(ctx) {
      const keys = this.boss.spriteKeys;
      let shakeX = 0;
      if (this.boss.shakeTimer > 0)
        shakeX = (Math.random() - 0.5) * 6;

      const areaH = BOSS_AREA_BOTTOM - BOSS_AREA_TOP;
      const areaW = CANVAS_W - 120;

      if (this.boss.name === 'Sans') {
        // Composite Sans from 3 parts
        const face = this.sprites[SPRITE.bosses.sans[0]];
        const torso = this.sprites[SPRITE.bosses.sans[1]];
        const legs = this.sprites[SPRITE.bosses.sans[2]];
        if (!face || !torso || !legs) return;

        const natW = Math.max(face.width, torso.width, legs.width);
        const natH = face.height + torso.height + legs.height;
        const scale = Math.min(this.boss.spriteScale || 2, areaH / natH, areaW / natW);
        const w = natW * scale;
        const h = natH * scale;
        const cx = CANVAS_W / 2 + shakeX;
        let y = BOSS_AREA_BOTTOM - h;

        ctx.drawImage(face, cx - (face.width * scale) / 2, y, face.width * scale, face.height * scale);
        y += face.height * scale;
        ctx.drawImage(torso, cx - (torso.width * scale) / 2, y, torso.width * scale, torso.height * scale);
        y += torso.height * scale;
        ctx.drawImage(legs, cx - (legs.width * scale) / 2, y, legs.width * scale, legs.height * scale);

        this.bossRect = { x: cx - w / 2, y: BOSS_AREA_BOTTOM - h, w, h };
        return;
      }

      const key = keys[0];
      const img = this.sprites[SPRITE.bosses[key] && SPRITE.bosses[key][0]];
      if (!img) return;

      // A escala do sprite é limitada pela faixa reservada, então o
      // monstro nunca cobre a caixa onde fica a alma.
      const scale = Math.min(this.boss.spriteScale || 2, areaH / img.height, areaW / img.width);
      const w = img.width * scale;
      const h = img.height * scale;
      const dx = (CANVAS_W - w) / 2 + shakeX;
      const dy = BOSS_AREA_BOTTOM - h;
      ctx.drawImage(img, dx, dy, w, h);

      this.bossRect = { x: dx, y: dy, w, h };
    }

    _renderBattleBox(ctx) {
      const b = this.battleBox;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = BOX_BORDER;
      ctx.strokeRect(
        b.x + BOX_BORDER / 2, b.y + BOX_BORDER / 2,
        b.w - BOX_BORDER, b.h - BOX_BORDER
      );
    }

    _renderMenu(ctx) {
      const btnNames = ['fight', 'act', 'item', 'mercy'];
      let x = BOX_X;

      for (let i = 0; i < btnNames.length; i++) {
        const sel = i === this.menuIndex ? 1 : 0;
        const img = this.sprites[SPRITE.buttons[btnNames[i]][sel]];
        if (img) ctx.drawImage(img, x, MENU_Y, MENU_BTN_W, MENU_BTN_H);

        if (i === this.menuIndex) {
          const heartImg = this.sprites[SPRITE.soul];
          if (heartImg)
            ctx.drawImage(heartImg, x - 20, MENU_Y + MENU_BTN_H / 2 - 8, 16, 16);
        }
        x += MENU_BTN_W + MENU_GAP;
      }
    }

    _renderSubMenu(ctx) {
      const b = this.battleBox;
      const x = b.x + 44;
      let y = b.y + 38;
      ctx.font = '15px "Press Start 2P", monospace';

      for (let i = 0; i < this.subMenuItems.length; i++) {
        const label = typeof this.subMenuItems[i] === 'string'
          ? this.subMenuItems[i]
          : this.subMenuItems[i].name || String(this.subMenuItems[i]);

        if (i === this.subMenuIndex) {
          ctx.fillStyle = '#ff0';
          const heartImg = this.sprites[SPRITE.soul];
          if (heartImg)
            ctx.drawImage(heartImg, x - 26, y - 12, 14, 14);
        } else {
          ctx.fillStyle = '#fff';
        }
        ctx.fillText(label, x, y);
        y += 30;
      }
    }

    // spr_target dentro da caixa + cursor (fadebar) varrendo por cima.
    _renderFightBar(ctx) {
      const f = this.fightBar;
      if (f.phase !== 'sweep' && f.phase !== 'freeze') return;

      const target = this.sprites[SPRITE.fight.target];
      if (!target) return;

      const b = this.battleBox;
      const pad = BOX_BORDER + 8;
      const scale = Math.min(
        (b.w - pad * 2) / target.width,
        (b.h - pad * 2) / target.height
      );
      const tw = target.width * scale;
      const th = target.height * scale;
      const tx = b.x + (b.w - tw) / 2;
      const ty = b.y + (b.h - th) / 2;
      ctx.drawImage(target, tx, ty, tw, th);

      const barKey = f.phase === 'sweep'
        ? SPRITE.fight.fadebar.cyan
        : f.crit ? SPRITE.fight.fadebar.yellow : SPRITE.fight.fadebar.red;
      const bar = this.sprites[barKey];

      if (bar) {
        const bw = bar.width * scale;
        const bh = bar.height * scale;
        const bx = tx + (f.pos / 100) * (tw - bw);
        const by = ty + (th - bh) / 2;
        // Congelado, o cursor pisca antes de sumir — como no jogo.
        if (f.phase === 'freeze' && Math.floor(f.timer / 70) % 2 === 1)
          ctx.globalAlpha = 0.45;
        ctx.drawImage(bar, bx, by, bw, bh);
        ctx.globalAlpha = 1;
      }

      // Crítico: flash branco dentro da caixa.
      if (f.crit && f.phase === 'freeze' && f.timer < 140) {
        ctx.globalAlpha = 0.55 * (1 - f.timer / 140);
        ctx.fillStyle = '#fff';
        ctx.fillRect(b.x + BOX_BORDER, b.y + BOX_BORDER,
                     b.w - BOX_BORDER * 2, b.h - BOX_BORDER * 2);
        ctx.globalAlpha = 1;
      }
    }

    // Animação de golpe centralizada sobre o monstro.
    _renderSlash(ctx) {
      const f = this.fightBar;
      if (f.phase !== 'slash') return;

      const frames = this._slashFrames();
      const idx = Math.min(frames.length - 1, Math.floor(f.timer / SLASH_FRAME_MS));
      const img = this.sprites[frames[idx]];
      if (!img) return;

      const r = this.bossRect;
      const s = Math.max(0.9, Math.min(2.2, (r.h * 1.15) / img.height));
      const w = img.width * s;
      const h = img.height * s;
      ctx.drawImage(img, r.x + r.w / 2 - w / 2, r.y + r.h / 2 - h / 2, w, h);
    }

    _renderEnemyHpBar(ctx) {
      const bar = this.enemyHpBar;
      if (!bar.visible) return;

      const r = this.bossRect;
      const x = Math.round(r.x + r.w / 2 - ENEMY_HP_W / 2);
      const y = Math.round(Math.min(r.y + r.h + 8, BOX_Y - ENEMY_HP_H - 12));

      ctx.globalAlpha = bar.timer > ENEMY_HP_HOLD_MS
        ? Math.max(0, 1 - (bar.timer - ENEMY_HP_HOLD_MS) / ENEMY_HP_FADE_MS)
        : 1;
      ctx.fillStyle = '#7f0000';
      ctx.fillRect(x, y, ENEMY_HP_W, ENEMY_HP_H);
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(x, y, ENEMY_HP_W * Math.max(0, bar.display), ENEMY_HP_H);
      ctx.globalAlpha = 1;
    }

    _renderDialogue(ctx) {
      this.typewriter.render(
        ctx, BOX_X + 26, BOX_Y + 42, BOX_W - 52,
        { font: '15px "Press Start 2P", monospace', lineHeight: 28 }
      );
    }

    // Balão de fala estilo Undertale, ancorado ao lado do monstro.
    _renderSpeechBubble(ctx) {
      const r = this.bossRect;
      const font = '13px "Press Start 2P", monospace';
      const lineHeight = 22;
      const capHeight = 16;
      const padX = 14;
      const padY = 20;
      const gap = 10;

      // O texto se ajusta ao espaço livre do lado mais folgado, senão o
      // balão estouraria a tela e cobriria o monstro.
      const roomRight = CANVAS_W - 8 - (r.x + r.w + gap);
      const roomLeft = (r.x - gap) - 8;
      const maxTextW = Math.max(120, Math.min(230,
        Math.max(roomRight, roomLeft) - padX * 2 - BUBBLE_TAIL_GUTTER));

      ctx.font = font;
      // O balão é dimensionado pelo texto completo para não "crescer"
      // enquanto o typewriter digita.
      const fullLines = wrapText(ctx, this.typewriter.text, maxTextW);
      const textW = Math.max(...fullLines.map(l => ctx.measureText(l).width));
      const textH = (fullLines.length - 1) * lineHeight + capHeight;
      // A largura total inclui a faixa transparente do bico.
      const w = Math.max(72, Math.ceil(textW) + padX * 2 + BUBBLE_TAIL_GUTTER);
      const h = Math.max(70, textH + padY * 2);

      // Prefere a direita do monstro; cai para a esquerda se não couber.
      let bx = r.x + r.w + gap;
      let tailRight = false;
      if (bx + w > CANVAS_W - 8) {
        bx = r.x - gap - w;
        tailRight = true;
      }
      bx = Math.max(8, Math.min(bx, CANVAS_W - w - 8));

      // O bico fica a BUBBLE_TAIL_Y do topo do sprite; alinha ele à cabeça.
      let by = r.y + r.h * 0.25 - BUBBLE_TAIL_Y;
      by = Math.max(10, Math.min(by, BOX_Y - h - 14));

      const img = this.sprites[tailRight ? SPRITE.ui.bubbleRight : SPRITE.ui.bubbleLeft];
      if (img) {
        drawNineSlice(ctx, img, bx, by, w, h,
                      tailRight ? BUBBLE_INSETS.right : BUBBLE_INSETS.left);
      }

      const textX = tailRight ? bx + padX : bx + BUBBLE_TAIL_GUTTER + padX;
      this.typewriter.render(
        ctx, textX, by + (h - textH) / 2 + capHeight, maxTextW,
        { color: '#000', font, lineHeight }
      );
    }

    _renderHUD(ctx) {
      ctx.font = '14px "Press Start 2P", monospace';

      // O nome é mais largo que o "CHARA" original, então o resto do HUD
      // é posicionado a partir da largura medida em vez de offsets fixos.
      let x = BOX_X;
      ctx.fillStyle = '#ff0';
      ctx.fillText(PLAYER_NAME, x, HUD_Y);
      x += ctx.measureText(PLAYER_NAME).width + 22;

      ctx.fillStyle = '#fff';
      ctx.fillText('LV 1', x, HUD_Y);
      x += ctx.measureText('LV 1').width + 22;

      ctx.fillStyle = '#fff';
      ctx.fillText('HP', x, HUD_Y);
      x += ctx.measureText('HP').width + 12;

      // HP bar background (red = lost health)
      const barX = x;
      const barW = 120;
      const barH = 16;
      ctx.fillStyle = '#600';
      ctx.fillRect(barX, HUD_Y - 12, barW, barH);

      // HP bar fill (yellow = current)
      const ratio = Math.max(0, this.soul.displayHp / this.soul.maxHp);
      ctx.fillStyle = '#ff0';
      ctx.fillRect(barX, HUD_Y - 12, barW * ratio, barH);

      // HP numbers
      ctx.fillStyle = '#fff';
      ctx.fillText(`${Math.ceil(this.soul.hp)} / ${this.soul.maxHp}`, barX + barW + 10, HUD_Y);
    }

    _renderWin(ctx) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.font = '28px "Press Start 2P", monospace';
      ctx.fillStyle = '#ff0';
      const text = 'VOCÊ VENCEU!';
      const tw = ctx.measureText(text).width;
      ctx.fillText(text, (CANVAS_W - tw) / 2, CANVAS_H / 2);

      ctx.font = '14px "Press Start 2P", monospace';
      ctx.fillStyle = '#fff';
      const sub = '* O item foi adicionado ao carrinho!';
      const sw = ctx.measureText(sub).width;
      ctx.fillText(sub, (CANVAS_W - sw) / 2, CANVAS_H / 2 + 40);
    }

    _renderLoseScreen(ctx) {
      const cx = CANVAS_W / 2;
      const cy = CANVAS_H / 2 - 40;

      if (this.soulShards) {
        const img = this.sprites[SPRITE.soulBreak];
        if (img) for (const s of this.soulShards) s.render(ctx, img);
      } else if (this.loseTimer < LOSE_CRACK_MS) {
        const img = this.sprites[SPRITE.soul];
        if (img) ctx.drawImage(img, cx - 24, cy - 24, 48, 48);
      } else {
        // Rachado e tremendo, no instante antes de se partir.
        const img = this.sprites[SPRITE.soulBreak];
        if (img) {
          const w = 48 * (img.width / img.height);
          const shake = rand(-1.5, 1.5);
          ctx.drawImage(img, cx - w / 2 + shake, cy - 24, w, 48);
        }
      }

      if (this.losePhase === 1) {
        // Game Over text
        ctx.font = '36px "Press Start 2P", monospace';
        ctx.fillStyle = '#c00';
        const go = 'GAME OVER';
        const gow = ctx.measureText(go).width;
        ctx.fillText(go, (CANVAS_W - gow) / 2, cy);

        ctx.font = '14px "Press Start 2P", monospace';
        ctx.fillStyle = '#fff';
        const retry = '[Z] Tentar novamente    [X] Desistir';
        const rw = ctx.measureText(retry).width;
        ctx.fillText(retry, (CANVAS_W - rw) / 2, cy + 60);
      }
    }
  }

  // ── Overlay + public API ──────────────────────────────────
  function createOverlay() {
    const overlay = document.getElementById('battle-overlay');
    if (overlay) overlay.classList.add('active');

    let canvas = document.getElementById('battle-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'battle-canvas';
      canvas.width = CANVAS_W;
      canvas.height = CANVAS_H;
      canvas.style.imageRendering = 'pixelated';
      canvas.style.maxWidth = '100%';
      if (overlay) overlay.appendChild(canvas);
    }
    return canvas;
  }

  window.BattleEngine = BattleEngine;

  window.startBattle = function (bossKey, cartItems, onWin, onLose) {
    const bossConfig = BOSSES[bossKey];
    if (!bossConfig) {
      console.error('Boss desconhecido:', bossKey);
      return;
    }
    createOverlay();
    const engine = new BattleEngine('battle-canvas', bossConfig, cartItems, onWin, onLose);
    engine.start();
    return engine;
  };
})();
