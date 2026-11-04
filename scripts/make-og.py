#!/usr/bin/env python3
"""生成社交分享图 public/og-image.png（1200×630）。改文案或配色后重跑：python3 scripts/make-og.py"""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
PAPER, INK, INK2 = (238, 239, 234), (21, 23, 27), (70, 75, 83)
LINES = ['#ff5b14', '#2340c8', '#0a9874', '#76ad24', '#df2f7c', '#f2ad00', '#d4241c']
FONT = '/usr/share/fonts/google-noto-sans-cjk-vf-fonts/NotoSansCJK-VF.ttc'

def font(size, bold=True):
    f = ImageFont.truetype(FONT, size)
    try:
        f.set_variation_by_name('Bold' if bold else 'Regular')
    except Exception:
        pass
    return f

im = Image.new('RGB', (W, H), PAPER)
d = ImageDraw.Draw(im)

# 站标（与 favicon 同构）
mx, my, ms = 96, 96, 112
d.rounded_rectangle([mx, my, mx + ms, my + ms], radius=24, fill=INK)
k = ms / 64
d.ellipse([mx + 11 * k, my + 12 * k, mx + 33 * k, my + 34 * k], fill=LINES[0])
d.rounded_rectangle([mx + 33 * k, my + 12 * k, mx + 53 * k, my + 32 * k], radius=5, fill=LINES[1])
d.polygon([(mx + 12 * k, my + 52 * k), (mx + 24 * k, my + 34 * k), (mx + 36 * k, my + 52 * k)], fill=LINES[2])
d.ellipse([mx + 40 * k, my + 38 * k, mx + 54 * k, my + 52 * k], fill=LINES[5])

# 全部按基线（anchor='ls'）定位，避免 CJK 字体的行高偏移
d.text((92, 356), '任孟锴', font=font(124), fill=INK, anchor='ls')
d.text((100, 428), '一人公司 · 纬蚂科技（上海）有限公司', font=font(34, bold=False), fill=INK2, anchor='ls')
d.text((100, 482), '河北工厂网 · 校服SHOP · MedAtlas 医院周边系统', font=font(34, bold=False), fill=INK2, anchor='ls')
d.text((100, 556), 'mengkai.ren', font=font(28), fill=INK, anchor='ls')

# 底部七色线路带
seg = W / len(LINES)
for i, c in enumerate(LINES):
    d.rectangle([i * seg, H - 18, (i + 1) * seg, H], fill=c)

im.save('public/og-image.png', optimize=True)
print('written public/og-image.png')
