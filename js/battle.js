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
      fire_0:      'assets/sprites/attacks/fire_0.png',
      fire_1:      'assets/sprites/attacks/fire_1.png',
      spear:       'assets/sprites/attacks/spear.png',
      teardrop:    'assets/sprites/attacks/teardrop.png',
      bullet_0:    'assets/sprites/attacks/bullet_0.png',
      bullet_1:    'assets/sprites/attacks/bullet_1.png',
    },
    gaster: [
      'assets/sprites/attacks/gaster_0.png',
      'assets/sprites/attacks/gaster_1.png',
      'assets/sprites/attacks/gaster_2.png',
      'assets/sprites/attacks/gaster_3.png',
      'assets/sprites/attacks/gaster_4.png',
      'assets/sprites/attacks/gaster_5.png',
    ],
    ui: {
      hp_name: 'assets/sprites/ui/hp_name.png',
      border:  'assets/sprites/ui/border.png',
      target:  'assets/sprites/ui/target.png',
    },
  };

  // ── Boss data ─────────────────────────────────────────────
  const BOSSES = {
    froggit: {
      name: 'Froggit',
      hp: 30, maxHp: 30, atk: 4, def: 2,
      spriteKeys: ['froggit'],
      spriteScale: 4,
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
      hp: 44, maxHp: 44, atk: 5, def: 2,
      spriteKeys: ['napstablook'],
      spriteScale: 4,
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
      hp: 80, maxHp: 80, atk: 8, def: 3,
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
      hp: 60, maxHp: 60, atk: 8, def: 3,
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
      hp: 70, maxHp: 70, atk: 10, def: 4,
      spriteKeys: ['undyne'],
      spriteScale: 1.5,
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
      hp: 1, maxHp: 1, atk: 25, def: 1,
      spriteKeys: ['sans'],
      spriteScale: 3,
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
      hp: 50, maxHp: 50, atk: 7, def: 2,
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
      hp: 90, maxHp: 90, atk: 9, def: 5,
      spriteKeys: ['mettaton'],
      spriteScale: 5,
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
    ENEMY_TURN: 'ENEMY_TURN',
    WIN: 'WIN',
    LOSE: 'LOSE',
  };

  const CANVAS_W = 640;
  const CANVAS_H = 480;

  // ── Battle Box geometry ───────────────────────────────────
  const BOX_W = 575;
  const BOX_H = 140;
  const BOX_BORDER = 3;
  const BOX_X = (CANVAS_W - BOX_W) / 2;
  const BOX_Y = 255;

  const SOUL_SCALE = 2;
  const SOUL_SIZE = 16 * SOUL_SCALE;
  const SOUL_SPEED = 3;
  const PLAYER_MAX_HP = 20;
  const INVINCIBILITY_MS = 1000;

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
    }

    update(keys, box, dt) {
      const spd = SOUL_SPEED;
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

      const hpDiff = this.displayHp - this.hp;
      if (Math.abs(hpDiff) > 0.1)
        this.displayHp -= hpDiff * Math.min(1, dt * 0.005);
      else
        this.displayHp = this.hp;
    }

    takeDamage(amount) {
      if (this.invTimer > 0) return false;
      this.hp = Math.max(0, this.hp - amount);
      this.invTimer = INVINCIBILITY_MS;
      return true;
    }

    render(ctx, sprites) {
      if (!this.visible) return;
      const img = sprites[SPRITE.soul];
      ctx.drawImage(img, this.x, this.y, this.w, this.h);
    }

    getHitbox() {
      const shrink = 4;
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
    }

    update(dt) {
      const t = dt / 16.67;
      this.x += this.vx * t;
      this.y += this.vy * t;
      this.age += dt;
      if (this.x < -60 || this.x > CANVAS_W + 60 ||
          this.y < -60 || this.y > CANVAS_H + 60)
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

  // ── AABB collision ────────────────────────────────────────
  function aabb(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
  }

  // ── Attack pattern generators ─────────────────────────────
  // Each returns an array of projectile configs spawned at a given tick time.
  function generateAttacks(type, elapsed, box) {
    const projs = [];
    const cx = box.x + box.w / 2;
    const cy = box.y + box.h / 2;
    const t = elapsed;

    switch (type) {
      case 'froggit': {
        if (t % 400 < 16) {
          const startX = cx + (Math.random() - 0.5) * box.w * 0.8;
          const p = new Projectile(
            startX, box.y - 10,
            Math.sin(t * 0.003) * 1.2, 2.5,
            24, 24, SPRITE.attacks.bullet_0
          );
          projs.push(p);
        }
        break;
      }
      case 'napstablook': {
        if (t % 300 < 16) {
          const cols = 5;
          const col = Math.floor(Math.random() * cols);
          const gap = box.w / cols;
          const p = new Projectile(
            box.x + gap * col + gap / 2 - 12, box.y - 10,
            0, 2.0 + Math.random(),
            16, 22, SPRITE.attacks.teardrop
          );
          projs.push(p);
        }
        break;
      }
      case 'toriel': {
        if (t % 500 < 16) {
          const fromLeft = Math.random() > 0.5;
          const startX = fromLeft ? box.x - 20 : box.x + box.w + 20;
          const vx = fromLeft ? 2.5 : -2.5;
          const sprite = Math.random() > 0.5 ? SPRITE.attacks.fire_0 : SPRITE.attacks.fire_1;
          const p = new Projectile(
            startX, cy + (Math.random() - 0.5) * box.h * 0.6,
            vx, Math.sin(t * 0.005) * 1.5,
            30, 30, sprite
          );
          projs.push(p);
        }
        break;
      }
      case 'papyrus': {
        if (t % 350 < 16) {
          const fromBottom = Math.random() > 0.5;
          const startY = fromBottom ? box.y + box.h + 10 : box.y - 20;
          const vy = fromBottom ? -3.0 : 3.0;
          const startX = box.x + Math.random() * box.w;
          const isH = Math.random() > 0.5;
          const p = new Projectile(
            startX, startY,
            0, vy,
            isH ? 42 : 12, isH ? 12 : 56,
            isH ? SPRITE.attacks.bone_h : SPRITE.attacks.bone_v
          );
          projs.push(p);
        }
        break;
      }
      case 'undyne': {
        if (t % 250 < 16) {
          const side = Math.floor(Math.random() * 4);
          let x, y, vx, vy, angle;
          const spd = 3.5;
          switch (side) {
            case 0: x = box.x - 20;          y = cy + (Math.random() - 0.5) * box.h * 0.8; vx = spd; vy = 0; angle = 0; break;
            case 1: x = box.x + box.w + 20;  y = cy + (Math.random() - 0.5) * box.h * 0.8; vx = -spd; vy = 0; angle = Math.PI; break;
            case 2: x = cx + (Math.random() - 0.5) * box.w * 0.8; y = box.y - 20;          vx = 0; vy = spd; angle = Math.PI / 2; break;
            default: x = cx + (Math.random() - 0.5) * box.w * 0.8; y = box.y + box.h + 20; vx = 0; vy = -spd; angle = -Math.PI / 2; break;
          }
          const p = new Projectile(x, y, vx, vy, 58, 14, SPRITE.attacks.spear);
          p.angle = angle;
          projs.push(p);
        }
        break;
      }
      case 'sans': {
        // Bones from multiple sides
        if (t % 200 < 16) {
          const side = Math.floor(Math.random() * 4);
          let x, y, vx, vy;
          const spd = 4;
          switch (side) {
            case 0: x = box.x - 20;          y = cy + (Math.random() - 0.5) * box.h; vx = spd; vy = 0; break;
            case 1: x = box.x + box.w + 20;  y = cy + (Math.random() - 0.5) * box.h; vx = -spd; vy = 0; break;
            case 2: x = cx + (Math.random() - 0.5) * box.w; y = box.y - 20;          vx = 0; vy = spd; break;
            default: x = cx + (Math.random() - 0.5) * box.w; y = box.y + box.h + 20; vx = 0; vy = -spd; break;
          }
          const isH = Math.abs(vx) > Math.abs(vy);
          const p = new Projectile(x, y, vx, vy,
            isH ? 42 : 12, isH ? 12 : 56,
            isH ? SPRITE.attacks.bone_h : SPRITE.attacks.bone_v);
          projs.push(p);
        }
        // Gaster blaster wave (every 2 seconds)
        if (t % 2000 < 16) {
          const gx = box.x + Math.random() * (box.w - 60);
          const p = new Projectile(gx, box.y - 30, 0, 3.0, 56, 64, SPRITE.gaster[0]);
          p._gasterFrame = 0;
          p._gasterTimer = 0;
          p.updateCustom = function (dt) {
            this._gasterTimer += dt;
            if (this._gasterTimer > 80) {
              this._gasterTimer = 0;
              this._gasterFrame = (this._gasterFrame + 1) % SPRITE.gaster.length;
              this.spriteKey = SPRITE.gaster[this._gasterFrame];
            }
          };
          projs.push(p);
        }
        break;
      }
      case 'flowey': {
        if (t % 250 < 16) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.max(box.w, box.h) / 2 + 30;
          const startX = cx + Math.cos(angle) * dist;
          const startY = cy + Math.sin(angle) * dist;
          const spd = 2.8;
          const vx = -Math.cos(angle) * spd;
          const vy = -Math.sin(angle) * spd;
          const sprite = Math.random() > 0.5 ? SPRITE.attacks.bullet_0 : SPRITE.attacks.bullet_1;
          const p = new Projectile(startX, startY, vx, vy, 18, 18, sprite);
          projs.push(p);
        }
        break;
      }
      case 'mettaton': {
        if (t % 300 < 16) {
          const fromLeft = Math.random() > 0.5;
          const startX = fromLeft ? box.x - 20 : box.x + box.w + 20;
          const vx = fromLeft ? 3.0 : -3.0;
          const startY = box.y + Math.random() * box.h;
          const p = new Projectile(startX, startY, vx, 0, 58, 14, SPRITE.attacks.spear);
          p.angle = fromLeft ? 0 : Math.PI;
          projs.push(p);
        }
        if (t % 600 < 16) {
          const startX = box.x + Math.random() * box.w;
          const p = new Projectile(startX, box.y - 20, 0, 3.5, 24, 24, SPRITE.attacks.bullet_0);
          projs.push(p);
        }
        break;
      }
    }
    return projs;
  }

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

    render(ctx, x, y, maxWidth) {
      ctx.fillStyle = '#fff';
      ctx.font = '18px "Press Start 2P", monospace';
      const words = this.displayText.split(' ');
      let line = '';
      let ly = y;
      for (const word of words) {
        const test = line + (line ? ' ' : '') + word;
        if (ctx.measureText(test).width > maxWidth && line) {
          ctx.fillText(line, x, ly);
          line = word;
          ly += 28;
        } else {
          line = test;
        }
      }
      if (line) ctx.fillText(line, x, ly);
    }
  }

  // ── Floating damage number ────────────────────────────────
  class FloatingText {
    constructor(text, x, y, color) {
      this.text = text;
      this.x = x;
      this.y = y;
      this.color = color || '#fff';
      this.life = 1200;
      this.age = 0;
    }

    update(dt) {
      this.age += dt;
      this.y -= 0.8;
    }

    get alive() { return this.age < this.life; }

    render(ctx) {
      const alpha = Math.max(0, 1 - this.age / this.life);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = this.color;
      ctx.font = '24px "Press Start 2P", monospace';
      ctx.fillText(this.text, this.x, this.y);
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
      this.floatingTexts = [];
      this.typewriter = new Typewriter();
      this.sprites = {};
      this.running = false;

      this.menuIndex = 0;
      this.menuOptions = ['fight', 'act', 'item', 'mercy'];
      this.subMenuIndex = 0;
      this.subMenuItems = [];

      this.fightBar = { active: false, pos: 0, speed: 6, stopped: false };
      this.enemyTurnTimer = 0;
      this.enemyTurnDuration = 0;
      this.introStep = 0;
      this.dialogueIndex = 0;
      this.winTimer = 0;
      this.loseTimer = 0;
      this.losePhase = 0;
      this.retryAvailable = false;

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

    setState(newState) {
      this.state = newState;
      switch (newState) {
        case STATE.INTRO:
          this.introStep = 0;
          this.dialogueIndex = 0;
          this.typewriter.setText(
            this.boss.dialogue[0],
            () => { this.introStep = 1; }
          );
          break;
        case STATE.MENU:
          this.menuIndex = 0;
          break;
        case STATE.FIGHT_ANIM:
          this.fightBar = { active: true, pos: 0, speed: 6, stopped: false };
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
        case STATE.ENEMY_TURN:
          this.enemyTurnTimer = 0;
          this.enemyTurnDuration = 5000 + Math.random() * 3000;
          this.projectiles = [];
          this.soul.x = this.battleBox.x + this.battleBox.w / 2 - SOUL_SIZE / 2;
          this.soul.y = this.battleBox.y + this.battleBox.h / 2 - SOUL_SIZE / 2;
          break;
        case STATE.WIN:
          this.winTimer = 0;
          this.typewriter.setText('* VOCÊ VENCEU!');
          break;
        case STATE.LOSE:
          this.loseTimer = 0;
          this.losePhase = 0;
          this.retryAvailable = false;
          break;
      }
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
      this.floatingTexts = this.floatingTexts.filter(f => { f.update(dt); return f.alive; });

      if (this.boss.shakeTimer > 0) this.boss.shakeTimer -= dt;

      switch (this.state) {
        case STATE.INTRO:
          if (this._pressed('confirm')) {
            if (!this.typewriter.done) {
              this.typewriter.skip();
            } else if (this.dialogueIndex < this.boss.dialogue.length - 1) {
              this.dialogueIndex++;
              this.typewriter.setText(this.boss.dialogue[this.dialogueIndex]);
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
                  this.typewriter.setText('* Não é possível poupar ainda...');
                  this.setState(STATE.ENEMY_TURN);
                }
                break;
            }
          }
          break;

        case STATE.FIGHT_ANIM:
          if (!this.fightBar.stopped) {
            this.fightBar.pos += this.fightBar.speed * (dt / 16.67);
            if (this.fightBar.pos >= 100) {
              this.fightBar.pos = 100;
              this.fightBar.stopped = true;
              this._applyFightDamage();
            }
            if (this._pressed('confirm')) {
              this.fightBar.stopped = true;
              this._applyFightDamage();
            }
          } else if (this.fightBar._resultTimer !== undefined) {
            this.fightBar._resultTimer -= dt;
            if (this.fightBar._resultTimer <= 0) {
              if (this.boss.currentHp <= 0) this.setState(STATE.WIN);
              else this.setState(STATE.ENEMY_TURN);
            }
          }
          break;

        case STATE.ACT_SELECT:
          if (this._pressed('ArrowUp'))   this.subMenuIndex = Math.max(0, this.subMenuIndex - 1);
          if (this._pressed('ArrowDown')) this.subMenuIndex = Math.min(this.subMenuItems.length - 1, this.subMenuIndex + 1);
          if (this._pressed('cancel'))    this.setState(STATE.MENU);
          if (this._pressed('confirm')) {
            if (this.subMenuIndex === 0) {
              this.typewriter.setText(`* ${this.boss.name} - ATK ${this.boss.atk} DEF ${this.boss.def}`);
            } else {
              this.boss.actCount++;
              if (this.boss.actCount >= this.boss.spareAfterActs) {
                this.boss.spareable = true;
                this.typewriter.setText(`* ${this.boss.name} parece estar cedendo...`);
              } else {
                const msgs = [
                  `* Você usou ${this.subMenuItems[this.subMenuIndex]} em ${this.boss.name}.`,
                  `* ${this.boss.name} não sabe como reagir.`,
                ];
                this.typewriter.setText(msgs[Math.floor(Math.random() * msgs.length)]);
              }
            }
            this.setState(STATE.ENEMY_TURN);
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
              this.typewriter.setText(`* Você usou ${item.name}. Recuperou ${item.heal} HP!`);
              this.cartItems.splice(this.subMenuIndex, 1);
            }
            this.setState(STATE.ENEMY_TURN);
          }
          break;

        case STATE.ENEMY_TURN:
          this.soul.update(this.keys, this.battleBox, dt);
          this.enemyTurnTimer += dt;

          const newProjs = generateAttacks(
            this.boss.attackType, this.enemyTurnTimer, this.battleBox
          );
          this.projectiles.push(...newProjs);

          const soulBox = this.soul.getHitbox();
          for (const p of this.projectiles) {
            p.update(dt);
            if (p.updateCustom) p.updateCustom(dt);
            if (p.alive && aabb(soulBox, p.getHitbox())) {
              if (this.soul.takeDamage(this.boss.atk)) {
                this.floatingTexts.push(
                  new FloatingText(`-${this.boss.atk}`, this.soul.x, this.soul.y - 10, '#ff0')
                );
              }
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
            this.typewriter.setText(nextDialogue);
            this.setState(STATE.MENU);
          }
          break;

        case STATE.WIN:
          this.winTimer += dt;
          if (this.winTimer > 3000) {
            this.destroy();
            this._removeOverlay();
            this.onWin();
          }
          break;

        case STATE.LOSE:
          this.loseTimer += dt;
          if (this.losePhase === 0 && this.loseTimer > 1500) {
            this.losePhase = 1;
            this.retryAvailable = true;
          }
          if (this.losePhase === 1 && this._pressed('confirm')) {
            this.soul.hp = this.soul.maxHp;
            this.soul.displayHp = this.soul.maxHp;
            this.boss.currentHp = this.boss.maxHp;
            this.boss.actCount = 0;
            this.boss.spareable = false;
            this.projectiles = [];
            this.floatingTexts = [];
            this.setState(STATE.INTRO);
          }
          if (this.losePhase === 1 && this._pressed('cancel')) {
            this.destroy();
            this._removeOverlay();
            this.onLose();
          }
          break;
      }
    }

    _applyFightDamage() {
      const accuracy = 1 - Math.abs(this.fightBar.pos - 50) / 50;
      const baseDmg = 6 + Math.floor(accuracy * 14);
      const dmg = Math.max(1, baseDmg - this.boss.def);
      this.boss.currentHp = Math.max(0, this.boss.currentHp - dmg);
      this.boss.shakeTimer = 400;
      const bossDrawY = 50;
      this.floatingTexts.push(
        new FloatingText(String(dmg), CANVAS_W / 2 - 10, bossDrawY + 40, '#ff0')
      );
      this.fightBar._resultTimer = 1200;
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

      if (this.state !== STATE.FIGHT_ANIM) {
        this._renderDialogue(ctx);
      }

      this._renderBattleBox(ctx);

      if (this.state === STATE.ENEMY_TURN) {
        for (const p of this.projectiles) p.render(ctx, this.sprites);
        this.soul.render(ctx, this.sprites);
      }

      if (this.state === STATE.FIGHT_ANIM) {
        this._renderFightBar(ctx);
      }

      if (this.state === STATE.ACT_SELECT || this.state === STATE.ITEM_SELECT) {
        this._renderSubMenu(ctx);
      }

      if (this.state === STATE.MENU) {
        this._renderMenu(ctx);
      }

      this._renderHUD(ctx);

      for (const f of this.floatingTexts) f.render(ctx);

      if (this.state === STATE.WIN) {
        this._renderWin(ctx);
      }
    }

    _renderBoss(ctx) {
      const scale = this.boss.spriteScale || 3;
      const keys = this.boss.spriteKeys;
      let shakeX = 0;
      if (this.boss.shakeTimer > 0)
        shakeX = (Math.random() - 0.5) * 6;

      if (this.boss.name === 'Sans') {
        // Composite Sans from 3 parts
        const face = this.sprites[SPRITE.bosses.sans[0]];
        const torso = this.sprites[SPRITE.bosses.sans[1]];
        const legs = this.sprites[SPRITE.bosses.sans[2]];
        const cx = CANVAS_W / 2;
        const baseY = 30;
        if (legs)  ctx.drawImage(legs,  cx - (29 * scale) / 2 + shakeX, baseY + 27 * scale + 32 * scale, 29 * scale, 29 * scale);
        if (torso) ctx.drawImage(torso, cx - (37 * scale) / 2 + shakeX, baseY + 27 * scale, 37 * scale, 32 * scale);
        if (face)  ctx.drawImage(face,  cx - (27 * scale) / 2 + shakeX, baseY, 27 * scale, 27 * scale);
      } else {
        const key = keys[0];
        const img = this.sprites[SPRITE.bosses[key] && SPRITE.bosses[key][0]];
        if (img) {
          const w = img.width * scale;
          const h = img.height * scale;
          const dx = (CANVAS_W - w) / 2 + shakeX;
          const dy = Math.max(10, BOX_Y - h - 20);
          ctx.drawImage(img, dx, dy, w, h);
        }
      }
    }

    _renderBattleBox(ctx) {
      const b = this.battleBox;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = BOX_BORDER;
      ctx.strokeRect(b.x + 1, b.y + 1, b.w - 2, b.h - 2);
    }

    _renderMenu(ctx) {
      const btnNames = ['fight', 'act', 'item', 'mercy'];
      const btnW = 108;
      const btnH = 42;
      const scale = 2;
      const totalW = btnNames.length * btnW * scale + (btnNames.length - 1) * 16;
      let startX = (CANVAS_W - totalW) / 2;
      const y = BOX_Y + BOX_H + 18;

      for (let i = 0; i < btnNames.length; i++) {
        const sel = i === this.menuIndex ? 1 : 0;
        const key = SPRITE.buttons[btnNames[i]][sel];
        const img = this.sprites[key];
        if (img) {
          ctx.drawImage(img, startX, y, btnW * scale, btnH * scale);
        }
        if (i === this.menuIndex) {
          const heartImg = this.sprites[SPRITE.soul];
          if (heartImg)
            ctx.drawImage(heartImg, startX - 24, y + (btnH * scale) / 2 - 8, 16, 16);
        }
        startX += btnW * scale + 16;
      }
    }

    _renderSubMenu(ctx) {
      const b = this.battleBox;
      const x = b.x + 30;
      let y = b.y + 30;
      ctx.font = '16px "Press Start 2P", monospace';

      for (let i = 0; i < this.subMenuItems.length; i++) {
        const label = typeof this.subMenuItems[i] === 'string'
          ? this.subMenuItems[i]
          : this.subMenuItems[i].name || String(this.subMenuItems[i]);

        if (i === this.subMenuIndex) {
          ctx.fillStyle = '#ff0';
          const heartImg = this.sprites[SPRITE.soul];
          if (heartImg)
            ctx.drawImage(heartImg, x - 20, y - 10, 14, 14);
        } else {
          ctx.fillStyle = '#fff';
        }
        ctx.fillText(label, x, y);
        y += 28;
      }
    }

    _renderFightBar(ctx) {
      const barW = 300;
      const barH = 14;
      const bx = (CANVAS_W - barW) / 2;
      const by = BOX_Y + BOX_H / 2 - barH / 2;

      ctx.fillStyle = '#333';
      ctx.fillRect(bx, by, barW, barH);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.strokeRect(bx, by, barW, barH);

      // Center mark
      ctx.fillStyle = '#0f0';
      ctx.fillRect(bx + barW / 2 - 2, by - 4, 4, barH + 8);

      // Moving cursor
      if (!this.fightBar.stopped) {
        const cx = bx + (this.fightBar.pos / 100) * barW;
        ctx.fillStyle = '#fff';
        ctx.fillRect(cx - 2, by - 6, 4, barH + 12);
      } else {
        const cx = bx + (this.fightBar.pos / 100) * barW;
        ctx.fillStyle = '#ff0';
        ctx.fillRect(cx - 2, by - 6, 4, barH + 12);
      }
    }

    _renderDialogue(ctx) {
      this.typewriter.render(ctx, BOX_X + 20, BOX_Y - 30, BOX_W - 40);
    }

    _renderHUD(ctx) {
      const y = BOX_Y + BOX_H + 10;
      const hudY = this.state === STATE.MENU ? y + 95 : y + 15;

      ctx.font = '14px "Press Start 2P", monospace';

      // Name
      ctx.fillStyle = '#ff0';
      ctx.fillText('CHARA', BOX_X, hudY);

      // LV
      ctx.fillStyle = '#fff';
      ctx.fillText('LV 1', BOX_X + 110, hudY);

      // HP label
      ctx.fillStyle = '#fff';
      ctx.fillText('HP', BOX_X + 200, hudY);

      // HP bar background (red = lost health)
      const barX = BOX_X + 240;
      const barW = 120;
      const barH = 16;
      ctx.fillStyle = '#600';
      ctx.fillRect(barX, hudY - 12, barW, barH);

      // HP bar fill (yellow = current)
      const ratio = Math.max(0, this.soul.displayHp / this.soul.maxHp);
      ctx.fillStyle = '#ff0';
      ctx.fillRect(barX, hudY - 12, barW * ratio, barH);

      // HP numbers
      ctx.fillStyle = '#fff';
      ctx.fillText(`${Math.ceil(this.soul.hp)} / ${this.soul.maxHp}`, barX + barW + 10, hudY);
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
      const sub = '* A compra foi finalizada com sucesso!';
      const sw = ctx.measureText(sub).width;
      ctx.fillText(sub, (CANVAS_W - sw) / 2, CANVAS_H / 2 + 40);
    }

    _renderLoseScreen(ctx) {
      // Heart break animation
      const cx = CANVAS_W / 2;
      const cy = CANVAS_H / 2 - 40;

      if (this.losePhase === 0) {
        // Heart cracks
        const progress = Math.min(1, this.loseTimer / 1500);
        if (progress < 0.5) {
          const img = this.sprites[SPRITE.soul];
          ctx.drawImage(img, cx - 24, cy - 24, 48, 48);
        } else {
          const img = this.sprites[SPRITE.soulBreak];
          const spread = (progress - 0.5) * 2 * 30;
          ctx.drawImage(img, cx - 24 - spread, cy - 24, 24, 48);
          ctx.save();
          ctx.scale(-1, 1);
          ctx.drawImage(img, -(cx + spread + 24), cy - 24, 24, 48);
          ctx.restore();
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
