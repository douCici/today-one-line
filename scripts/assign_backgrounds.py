#!/usr/bin/env python3
"""
为 cards_90.json 按主题映射背景图，生成更新后的 cards.seed.json。

使用方式：
    python3 scripts/assign_backgrounds.py

输入：content/cards_90.json + content/background-pack/backgrounds.json
输出：miniprogram/database/cards.seed.json（含 background_type + background_url 的种子数据）
"""

import json
import pathlib
import random

ROOT = pathlib.Path(__file__).resolve().parent.parent

# 卡片主题 → 背景主题 映射
THEME_MAP = {
    '希望': '希望',
    '平安': '平静',
    '感恩': '感恩',
    '行动': '行动',
    '节制': '节制',
    '勇气': '希望',
    '诚实': '行动',
    '温柔': '平静',
    '学习': '行动',
    '爱':     '感恩',
    '忍耐': '节制',
    '谦卑': '节制',
    '专注': '行动',
    '宽恕': '平静',
    '清醒': '行动',
}

def load_json(path):
    with open(path, encoding='utf-8') as f:
        return json.load(f)

def main():
    cards = load_json(ROOT / 'content' / 'cards_90.json')
    bgs = load_json(ROOT / 'content' / 'background-pack' / 'backgrounds.json')

    # 按背景主题分组背景图
    bg_by_theme = {}
    for bg in bgs:
        t = bg['theme_cn']
        bg_by_theme.setdefault(t, []).append(bg)

    # 每个背景主题用一个计数器做 round-robin 分配
    theme_counter = {t: 0 for t in bg_by_theme}
    stats = {}

    for card in cards:
        ct = card['theme']
        bt = THEME_MAP.get(ct)
        if not bt:
            bt = '希望'  # fallback

        pool = bg_by_theme.get(bt, bg_by_theme.get('希望', []))
        idx = theme_counter.get(bt, 0) % len(pool)
        bg = pool[idx]
        theme_counter[bt] = idx + 1

        card['background_type'] = 'image'
        # 上传到云存储后替换为 cloud:// 格式的 fileID
        card['background_url'] = f"/assets/backgrounds/{bg['filename']}"

        stats.setdefault(f'{ct}→{bt}', 0)
        stats[f'{ct}→{bt}'] += 1

    # 统计
    print('主题映射与背景分配:')
    for mapping, count in sorted(stats.items()):
        print(f'  {mapping}: {count}张卡片')

    # 输出
    seed_path = ROOT / 'miniprogram' / 'database' / 'cards.seed.json'
    with open(seed_path, 'w', encoding='utf-8') as f:
        json.dump(cards, f, ensure_ascii=False, indent=2)
    print(f'\n✅ 已输出 {len(cards)} 条 → {seed_path}')

    # 检查覆盖率
    has_bg = sum(1 for c in cards if c.get('background_url'))
    print(f'✅ 有背景图的卡片: {has_bg}/{len(cards)}')

if __name__ == '__main__':
    main()
