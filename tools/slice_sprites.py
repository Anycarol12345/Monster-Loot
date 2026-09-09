"""Fatia as spritesheets de referencia do Undertale nos PNGs usados pelo jogo.

Uso:
    python tools/slice_sprites.py <attack_effects.png> <text_bubbles.png>

As sheets originais vem do Spriters Resource e ficam fora do repo; este script
existe para que os recortes em assets/sprites/fight e assets/sprites/ui possam
ser regerados sem trabalho manual.
"""

import os
import sys
from collections import Counter

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIGHT_DIR = os.path.join(ROOT, "assets", "sprites", "fight")
UI_DIR = os.path.join(ROOT, "assets", "sprites", "ui")

SHEET_BG = (139, 90, 156)      # fundo roxo da sheet de efeitos
BUBBLE_BG = (153, 51, 153)     # fundo roxo da sheet de baloes
BUBBLE_KEY = (255, 102, 255)   # magenta = transparente nos baloes


def near(px, ref, tol):
    return all(abs(px[i] - ref[i]) <= tol for i in range(3))


def denoise(img, keep=12):
    """A sheet de efeitos passou por JPEG; reduz ao palette dominante."""
    px = list(img.getdata())
    buckets = Counter(tuple(c // 8 * 8 for c in p[:3]) for p in px)
    palette = [c for c, _ in buckets.most_common(keep)]
    cache = {}
    out = []
    for p in px:
        rgb = p[:3]
        hit = cache.get(rgb)
        if hit is None:
            hit = min(palette, key=lambda c: sum((c[i] - rgb[i]) ** 2 for i in range(3)))
            cache[rgb] = hit
        out.append(hit + (p[3],))
    res = Image.new("RGBA", img.size)
    res.putdata(out)
    return res


def is_purple(p):
    """Fundo da sheet e fundo lavanda dos tiles variam muito por causa do JPEG,
    entao a chave e a familia de cor e nao um RGB fixo."""
    r, g, b = p[:3]
    return b > g + 45 and r > g + 25 and b > 120


def cut(sheet, box, *, drop_bg=None, drop_dark=None, drop_purple=False,
        clean=True, tol=26):
    """Recorta uma regiao e transforma fundo/preto em transparencia."""
    img = sheet.crop(box).convert("RGBA")
    if clean:
        img = denoise(img)
    out = []
    for p in img.getdata():
        if drop_bg and near(p, drop_bg, tol):
            out.append((0, 0, 0, 0))
        elif drop_purple and is_purple(p):
            out.append((0, 0, 0, 0))
        elif drop_dark is not None and sum(p[:3]) <= drop_dark:
            out.append((0, 0, 0, 0))
        else:
            out.append(p)
    img.putdata(out)
    return img


def save(img, folder, name):
    os.makedirs(folder, exist_ok=True)
    path = os.path.join(folder, name + ".png")
    img.save(path)
    return path


def slice_attacks(path):
    sheet = Image.open(path).convert("RGBA")
    written = []

    # Barra de alvo do FIGHT (spr_target). O preto vira transparente para o
    # sprite compor sobre o interior da caixa de batalha.
    written.append(save(
        cut(sheet, (4, 18, 450, 120), drop_bg=SHEET_BG, drop_dark=110),
        FIGHT_DIR, "target"))

    # Cursor que varre a barra.
    for name, x0, x1 in (("red", 748, 761), ("cyan", 764, 777), ("yellow", 779, 794)):
        written.append(save(
            cut(sheet, (x0, 292, x1, 368), drop_bg=SHEET_BG),
            FIGHT_DIR, "fadebar_" + name))

    # Numeros de dano: 21 tiles de ~29px. 0..9 lisos, 10 = variante vermelha,
    # 11..20 repetem com contorno preto (melhor leitura sobre o monstro).
    digit_x = [4, 36, 69, 101, 134, 166, 198, 231, 264, 296,
               329,
               361, 394, 426, 458, 492, 524, 556, 589, 622, 654]
    for d in range(10):
        x = digit_x[11 + d]
        written.append(save(
            cut(sheet, (x, 138, x + 30, 168), drop_purple=True),
            FIGHT_DIR, "dmg_%d" % d))
    written.append(save(
        cut(sheet, (687, 138, 786, 168), drop_purple=True),
        FIGHT_DIR, "dmg_miss"))

    # Animacoes de golpe: 6 quadros cada, fundo preto vira transparente.
    for label, y in (("glove", 379), ("shoe", 186)):
        for i, x in enumerate((4, 87, 171, 254, 337, 420 if label == "glove" else 421)):
            written.append(save(
                cut(sheet, (x, y, x + 79, y + 174), drop_bg=SHEET_BG, drop_dark=110),
                FIGHT_DIR, "slash_%s_%d" % (label, i)))

    return written


def slice_bubbles(path):
    sheet = Image.open(path).convert("RGBA")
    written = []
    # Baloes com contorno preto e bico lateral: o bico aponta para quem fala.
    for name, x in (("left", 20), ("right", 284)):
        written.append(save(
            cut(sheet, (x, 450, x + 237, 450 + 104),
                drop_bg=BUBBLE_KEY, clean=False, tol=8),
            UI_DIR, "bubble_tail_" + name))
    for name, x in (("left", 20), ("right", 284)):
        img = Image.open(os.path.join(UI_DIR, "bubble_tail_" + name + ".png")).convert("RGBA")
        out = [(0, 0, 0, 0) if near(p, BUBBLE_BG, 8) else p for p in img.getdata()]
        img.putdata(out)
        img.save(os.path.join(UI_DIR, "bubble_tail_" + name + ".png"))
    return written


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        return 1
    for p in slice_attacks(sys.argv[1]) + slice_bubbles(sys.argv[2]):
        print("wrote", os.path.relpath(p, ROOT))
    return 0


if __name__ == "__main__":
    sys.exit(main())
