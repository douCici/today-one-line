#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
重新排期 cards_90.json 的 date 字段。
用法：
python reschedule_cards.py 2026-07-01
"""
import json
import sys
from datetime import date, timedelta

if len(sys.argv) < 2:
    print("Usage: python reschedule_cards.py YYYY-MM-DD")
    sys.exit(1)

start = date.fromisoformat(sys.argv[1])

with open("cards_90.json", "r", encoding="utf-8") as f:
    cards = json.load(f)

for i, card in enumerate(cards):
    card["date"] = (start + timedelta(days=i)).isoformat()

with open("cards_90.rescheduled.json", "w", encoding="utf-8") as f:
    json.dump(cards, f, ensure_ascii=False, indent=2)

print("Done: cards_90.rescheduled.json")
