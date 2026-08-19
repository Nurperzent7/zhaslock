#!/usr/bin/env python3
"""Studio-style catalog images for Zhaslock products (no stock Unsplash photos)."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = Path("/workspace/public/products")
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1200, 1500


def font(size: int):
    for path in (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    ):
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def rr(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def glow_circle(img, cx, cy, r, color, alpha=90):
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(*color, alpha))
    blurred = overlay.filter(ImageFilter.GaussianBlur(18))
    return Image.alpha_composite(img, blurred)


def panel(draw, x, y, w, h, body, glass, accent, kind):
    rr(draw, (x, y, x + w, y + h), 36, body, outline=accent, width=2)
    inner = (x + 14, y + 18, x + w - 14, y + h - 18)
    rr(draw, inner, 28, glass)

    cx = x + w // 2
    if kind in {"h4", "qleung", "x9"}:
        # camera / face module
        draw.rounded_rectangle((x + 28, y + 32, x + w - 28, y + 150), 16, fill=(18, 22, 28))
        draw.ellipse((cx - 28, y + 58, cx + 28, y + 114), outline=(90, 200, 220), width=3)
        draw.ellipse((cx - 12, y + 74, cx + 12, y + 98), fill=(30, 40, 50))
        if kind == "h4":
            draw.ellipse((cx - 52, y + 78, cx - 38, y + 92), fill=(70, 90, 110))
            draw.ellipse((cx + 38, y + 78, cx + 52, y + 92), fill=(70, 90, 110))
        keypad_top = y + 175
    else:
        keypad_top = y + 48

    # keypad
    kw, kh = 22, 18
    gap = 10
    cols, rows = 3, 4
    grid_w = cols * kw + (cols - 1) * gap
    gx0 = cx - grid_w // 2
    for r in range(rows):
        for c in range(cols):
            gx = gx0 + c * (kw + gap)
            gy = keypad_top + r * (kh + gap)
            rr(draw, (gx, gy, gx + kw, gy + kh), 4, (40, 48, 58), outline=(90, 110, 125))

    handle_top = keypad_top + rows * (kh + gap) + 28
    handle_h = 260 if kind != "s008" else 90
    hx = x + 36
    hw = w - 72
    if kind == "s008":
        # lever handle
        rr(draw, (hx, handle_top, hx + hw, handle_top + 54), 22, accent)
        draw.ellipse((hx + hw - 70, handle_top - 6, hx + hw - 8, handle_top + 56), outline=(80, 220, 235), width=4)
    else:
        rr(draw, (hx, handle_top, hx + 42, handle_top + handle_h), 16, accent)
        # fingerprint on handle
        fy = handle_top + 18
        draw.ellipse((hx + 6, fy, hx + 36, fy + 30), outline=(80, 220, 235), width=3)

    # bottom knob / scanner
    by = y + h - 90
    draw.ellipse((cx - 28, by, cx + 28, by + 56), outline=accent, width=3)
    if kind == "s008":
        rr(draw, (cx - 40, by + 64, cx + 40, by + 78), 6, (50, 60, 70))


def render(name, title, subtitle, price, kind, body, glass, accent, label):
    img = Image.new("RGBA", (W, H), (8, 12, 18, 255))
    draw = ImageDraw.Draw(img)

    # vignette
    for i, a in enumerate((18, 12, 8)):
        rr(draw, (40 + i * 8, 40 + i * 8, W - 40 - i * 8, H - 40 - i * 8), 48, None, outline=(14, 124, 134, 40), width=1)

    draw.text((80, 72), "ZHASLOCK", font=font(22), fill=(140, 210, 215))
    draw.text((80, 108), title, font=font(54), fill=(245, 247, 250))
    draw.text((80, 174), subtitle, font=font(24), fill=(170, 180, 190))

    panel_w, panel_h = 320, 980
    gap = 48
    total = panel_w * 2 + gap
    x0 = (W - total) // 2
    y0 = 250

    img = glow_circle(img, x0 + panel_w // 2, y0 + 90, 90, (14, 124, 134), 70)
    img = glow_circle(img, x0 + panel_w + gap + panel_w // 2, y0 + 90, 90, (14, 124, 134), 70)
    draw = ImageDraw.Draw(img)

    panel(draw, x0, y0, panel_w, panel_h, body, glass, accent, kind)
    panel(draw, x0 + panel_w + gap, y0, panel_w, panel_h, body, glass, accent, kind)

    draw.text((x0 + 18, y0 + panel_h + 18), "INTERIOR", font=font(16), fill=(150, 160, 170))
    draw.text((x0 + panel_w + gap + 18, y0 + panel_h + 18), "EXTERIOR", font=font(16), fill=(150, 160, 170))

    draw.text((80, H - 120), price, font=font(42), fill=(255, 255, 255))
    draw.text((80, H - 70), label, font=font(20), fill=(14, 180, 170))

    rgb = img.convert("RGB")
    path = OUT / name
    rgb.save(path, "PNG", optimize=True)
    print("wrote", path)


BLACK = (28, 30, 34)
GLASS = (16, 18, 22)
TEAL = (70, 90, 98)
GOLD = (176, 141, 87)
ROSE = (176, 112, 98)
GOLD_BODY = (58, 48, 36)
ROSE_BODY = (42, 32, 32)

render(
    "x9.png",
    "MY HOME X9",
    "Face · Palm · Fingerprint · Tuya",
    "95 000 ₸",
    "x9",
    BLACK,
    GLASS,
    TEAL,
    "Kaspi RED · рассрочка 0-0-12",
)
render(
    "h4-fv-black.png",
    "SHARP H4-FV",
    "3D Face ID · Palm Vein · Wi-Fi",
    "185 000 ₸",
    "h4",
    BLACK,
    GLASS,
    TEAL,
    "Видеоглазок · уведомления",
)
render(
    "h4-fv-gold.png",
    "SHARP H4-FV",
    "Бронза / Gold · AI peephole",
    "185 000 ₸",
    "h4",
    GOLD_BODY,
    (22, 18, 14),
    GOLD,
    "3D Facial Recognition AI Camera",
)
render(
    "h4-fv-rose.png",
    "SHARP H4-FV",
    "Чёрный + rose gold",
    "185 000 ₸",
    "h4",
    ROSE_BODY,
    GLASS,
    ROSE,
    "AI Camera · Wi-Fi 2.4 GHz",
)
render(
    "s008.png",
    "S008",
    "Tuya · TTLock · IP68",
    "Умный замок",
    "s008",
    BLACK,
    GLASS,
    TEAL,
    "Пароль · IC · отпечаток · Type-C",
)
render(
    "qleung.png",
    "QLEUNG",
    "3D Face Recognition · видеоглазок",
    "Умный замок",
    "qleung",
    BLACK,
    GLASS,
    TEAL,
    "Экран внутри · камера снаружи",
)

print("done")
