#!/usr/bin/env python3
"""
为 cards_90.json 生成渐变背景版 cards seed。

使用方式：
    python3 scripts/assign_backgrounds.py

输入：content/cards_90.json
输出：
  - content/cards.seed.json
  - miniprogram/database/cards.seed.json
  - miniprogram/database/cards.import.json  # JSON Lines 内容，.json 扩展名供微信云数据库导入
  - miniprogram/database/cards.seed.jsonl

说明：当前版本不再把本地背景图片放入 miniprogram 主包，避免触发微信 2MB 限制。
"""

import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent

THEME_GRADIENTS = {
    '希望': ('#F6EDE8', '#E6F0EA'),
    '平安': ('#EAF2F1', '#F7EFE3'),
    '感恩': ('#F8EEE2', '#F1E4D0'),
    '行动': ('#EEF1E6', '#E4ECF5'),
    '节制': ('#ECE9E2', '#DDE6E0'),
    '勇气': ('#F3E7D7', '#E8F0DC'),
    '诚实': ('#EEF0E8', '#E7EDF4'),
    '温柔': ('#F6EDE8', '#E6F0EA'),
    '学习': ('#EEF1E6', '#E4ECF5'),
    '爱': ('#F8EEE2', '#F1E4D0'),
    '忍耐': ('#ECE9E2', '#DDE6E0'),
    '谦卑': ('#ECE9E2', '#DDE6E0'),
    '专注': ('#EEF1E6', '#E4ECF5'),
    '宽恕': ('#EAF2F1', '#F7EFE3'),
    '清醒': ('#EEF1E6', '#E4ECF5'),
}


def load_json(path):
    with open(path, encoding='utf-8') as f:
        return json.load(f)


def write_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')


def write_json_lines(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        for item in data:
            f.write(json.dumps(item, ensure_ascii=False, separators=(',', ':')) + '\n')


def main():
    cards = load_json(ROOT / 'content' / 'cards_90.json')

    for card in cards:
        start, end = THEME_GRADIENTS.get(card.get('theme'), ('#F5EFE6', '#E6F0EA'))
        card['background_type'] = 'gradient'
        card['background_url'] = ''
        card['color_theme'] = card.get('color_theme') or start
        card['gradient_start'] = card.get('gradient_start') or start
        card['gradient_end'] = card.get('gradient_end') or end

    json_paths = [
        ROOT / 'content' / 'cards.seed.json',
        ROOT / 'miniprogram' / 'database' / 'cards.seed.json',
    ]
    for path in json_paths:
        write_json(path, cards)
        print(f'✅ 已输出 {len(cards)} 条 → {path}')

    write_json_lines(ROOT / 'miniprogram' / 'database' / 'cards.import.json', cards)
    write_json_lines(ROOT / 'miniprogram' / 'database' / 'cards.seed.jsonl', cards)

    gradient_count = sum(1 for card in cards if card.get('background_type') == 'gradient' and not card.get('background_url'))
    print(f'✅ 渐变背景卡片: {gradient_count}/{len(cards)}')


if __name__ == '__main__':
    main()
