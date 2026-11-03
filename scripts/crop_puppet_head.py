#!/usr/bin/env python3
"""
Automated Puppet Head Crop & Die-Cut Preparation Tool (scripts/crop_puppet_head.py)
Extracts a portrait head from an authentic archival reference plate, applies a tactile
die-cut paper border (#F4EFE6), and exports a transparent PNG ready for <CutoutPuppet headSrc="..." />.

Usage:
  python scripts/crop_puppet_head.py --input projects/<slug>/plates/plate_03.jpg --output projects/<slug>/plates/faheem_head.png --pct-box 30,10,40,40 --shape oval
  python scripts/crop_puppet_head.py --input photo.jpg --output head.png --box 100,50,350,380 --border-width 4
"""

import argparse
import sys
import os

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

from PIL import Image, ImageDraw, ImageEnhance, ImageOps

def parse_box(box_str, img_width, img_height, is_pct=False):
    parts = [float(p.strip()) for p in box_str.split(',')]
    if len(parts) != 4:
        raise ValueError("Box must contain 4 values: left,top,width,height or left,top,right,bottom")
    
    if is_pct:
        # Expected: left_pct, top_pct, width_pct, height_pct (0-100)
        l = (parts[0] / 100.0) * img_width
        t = (parts[1] / 100.0) * img_height
        w = (parts[2] / 100.0) * img_width
        h = (parts[3] / 100.0) * img_height
        return int(l), int(t), int(l + w), int(t + h)
    else:
        # If 4th value < 2nd value, assume it's width/height; otherwise right/bottom
        l, t, r, b = parts
        if r < l:
            r = l + r
        if b < t:
            b = t + b
        return int(l), int(t), int(r), int(b)

def hex_to_rgba(hex_str, alpha=255):
    hex_str = hex_str.lstrip('#')
    if len(hex_str) == 6:
        r, g, b = tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))
        return (r, g, b, alpha)
    elif len(hex_str) == 8:
        return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4, 6))
    return (244, 239, 230, alpha)

def create_die_cut_head(
    input_path,
    output_path,
    crop_box=None,
    pct_box=None,
    shape='oval',
    border_color='#F4EFE6',
    border_width=4,
    contrast=1.05,
    brightness=1.02,
    target_size=(320, 360)
):
    if not os.path.exists(input_path):
        print(f"Error: Input image not found: {input_path}", file=sys.stderr)
        sys.exit(1)

    img = Image.open(input_path).convert('RGBA')
    w, h = img.size

    # 1. Resolve crop coordinates
    if pct_box:
        l, t, r, b = parse_box(pct_box, w, h, is_pct=True)
    elif crop_box:
        l, t, r, b = parse_box(crop_box, w, h, is_pct=False)
    else:
        # Default center-upper crop for portrait plate
        l = int(w * 0.25)
        t = int(h * 0.08)
        r = int(w * 0.75)
        b = int(h * 0.65)

    # Clamp coordinates
    l = max(0, min(w - 1, l))
    t = max(0, min(h - 1, t))
    r = max(l + 10, min(w, r))
    b = max(t + 10, min(h, b))

    cropped = img.crop((l, t, r, b))
    cw, ch = cropped.size

    # 2. Resize to target size for Remotion canvas consistency
    cropped = cropped.resize(target_size, Image.Resampling.LANCZOS)
    tw, th = target_size

    # 3. Tone and contrast enhancement for tactile documentary look
    if contrast != 1.0:
        enhancer = ImageEnhance.Contrast(cropped)
        cropped = enhancer.enhance(contrast)
    if brightness != 1.0:
        enhancer = ImageEnhance.Brightness(cropped)
        cropped = enhancer.enhance(brightness)

    # 4. Generate shape mask
    mask = Image.new('L', (tw, th), 0)
    draw_mask = ImageDraw.Draw(mask)

    pad = border_width + 1
    shape_box = (pad, pad, tw - pad, th - pad)

    if shape == 'circle':
        side = min(tw, th) - pad * 2
        cx, cy = tw // 2, th // 2
        circle_box = (cx - side // 2, cy - side // 2, cx + side // 2, cy + side // 2)
        draw_mask.ellipse(circle_box, fill=255)
    elif shape == 'oval':
        # Slightly egg-shaped / oval portrait head
        draw_mask.ellipse(shape_box, fill=255)
    elif shape == 'rounded':
        radius = int(min(tw, th) * 0.25)
        draw_mask.rounded_rectangle(shape_box, radius=radius, fill=255)
    else:
        draw_mask.rectangle(shape_box, fill=255)

    # 5. Apply die-cut tactile border (#F4EFE6)
    result = Image.new('RGBA', (tw, th), (0, 0, 0, 0))
    # Paste masked crop
    result.paste(cropped, (0, 0), mask=mask)

    if border_width > 0:
        border_rgba = hex_to_rgba(border_color, 255)
        draw_res = ImageDraw.Draw(result)
        for i in range(border_width):
            b_box = (pad - i, pad - i, tw - pad + i, th - pad + i)
            if shape in ('circle', 'oval'):
                draw_res.ellipse(b_box, outline=border_rgba)
            elif shape == 'rounded':
                radius = int(min(tw, th) * 0.25)
                draw_res.rounded_rectangle(b_box, radius=radius, outline=border_rgba)
            else:
                draw_res.rectangle(b_box, outline=border_rgba)

    # Ensure output dir exists
    out_dir = os.path.dirname(output_path)
    if out_dir and not os.path.exists(out_dir):
        os.makedirs(out_dir, exist_ok=True)

    result.save(output_path, 'PNG')
    print(f"[SUCCESS] Cutout head exported to: {output_path} ({tw}x{th}, shape={shape}, border={border_color})")

def main():
    parser = argparse.ArgumentParser(description="Crop and prepare a die-cut puppet head for Remotion CutoutPuppet.")
    parser.add_argument("--input", "-i", required=True, help="Input archival reference plate path")
    parser.add_argument("--output", "-o", required=True, help="Output PNG path")
    parser.add_argument("--box", "-b", help="Bounding box in pixels: left,top,right,bottom")
    parser.add_argument("--pct-box", "-p", help="Bounding box in percentages: left_pct,top_pct,width_pct,height_pct")
    parser.add_argument("--shape", choices=['oval', 'circle', 'rounded', 'rect'], default='oval', help="Cutout shape (default: oval)")
    parser.add_argument("--border-color", default='#F4EFE6', help="Die-cut paper border hex color (default: #F4EFE6)")
    parser.add_argument("--border-width", type=int, default=4, help="Die-cut border width in pixels (default: 4)")
    parser.add_argument("--contrast", type=float, default=1.05, help="Contrast multiplier (default: 1.05)")

    args = parser.parse_args()

    create_die_cut_head(
        input_path=args.input,
        output_path=args.output,
        crop_box=args.box,
        pct_box=args.pct_box,
        shape=args.shape,
        border_color=args.border_color,
        border_width=args.border_width,
        contrast=args.contrast
    )

if __name__ == '__main__':
    main()
