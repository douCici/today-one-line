# 今日一行｜90 张卡片内容包

本内容包用于微信小程序《今日一行》的 MVP 版本。

## 文件说明

- `cards_90.json`：完整 90 张卡片 JSON。
- `cards.seed.json`：可作为云数据库 cards 集合导入的种子数据。
- `cards_90.jsonl`：JSON Lines 格式，适合脚本批量导入。
- `cards_90.csv`：表格格式，适合人工审阅和编辑。
- `cards_90.md`：可读版内容清单。
- `source_and_copyright_notes.md`：来源、版权与使用注意事项。

## 内容结构

共 90 张卡片：

- 圣经 30 张
- 经典名著 30 张
- 名人/思想短句 30 张

每张卡片包含：

- `date`：建议发布日期，从 2026-06-03 起连续排期 90 天。
- `quote_text`：卡片主文案。
- `source`：来源。
- `source_ref`：更具体的出处。
- `theme`：主题。
- `morning_action`：早间动作。
- `noon_action`：中间动作。
- `evening_action`：晚间动作。
- `background_type` / `gradient_start` / `gradient_end`：背景样式。
- `status`：发布状态。

## 使用方式

1. 在微信云开发数据库中创建 `cards` 集合。
2. 导入 `cards.seed.json` 或 `cards_90.jsonl`。
3. 小程序云函数按当天日期查询 `cards.date`。
4. 若需要从今天重新排期，可批量修改 `date` 字段。

## 重要提醒

本包用于 MVP 内容验证。正式上线前，建议对每条内容进行人工复核，尤其是圣经译本、经典作品译文和名人短句出处。
