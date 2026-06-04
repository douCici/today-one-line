# 今日一行 - 微信小程序 MVP

一个只有一页的极简每日卡片小程序：

- 每日一句话
- 早 / 中 / 晚三个微动作
- 点亮打卡
- 无输入框
- 无记录页
- 无反馈文案

## 目录结构

```text
app.js
app.json
app.wxss
pages/index/
  index.js
  index.wxml
  index.wxss
  index.json
cloudfunctions/
  getTodayCard/
  toggleCheckin/
database/
  cards.seed.json
```

## 部署步骤

1. 用微信开发者工具打开本项目。
2. 复制 `env.example.js` 为 `env.js`，在 `env.js` 中填写自己的云开发环境 ID。
3. 复制 `project.private.config.example.json` 为 `project.private.config.json`，填写自己的小程序 AppID。
4. 在微信开发者工具中开通云开发。
5. 在云数据库中创建集合：`cards`、`checkins`。
6. 将 `database/cards.seed.jsonl` 中的数据按 JSON Lines 格式导入 `cards` 集合。
7. 上传并部署云函数：`getTodayCard`、`toggleCheckin`。
8. 编译运行。

> `env.js` 和 `project.private.config.json` 是本地个人配置，已加入 `.gitignore`，不要上传到 GitHub。

## 数据集合

### cards

字段：

- date
- quote_text
- source
- theme
- morning_action
- noon_action
- evening_action
- background_type
- background_url
- color_theme
- status

### checkins

字段：

- openid
- date
- card_id
- morning_done
- noon_done
- evening_done
- created_at
- updated_at
