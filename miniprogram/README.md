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
2. 在微信开发者工具中开通云开发。
3. 将 `app.js` 里的 `YOUR_CLOUD_ENV_ID` 替换成自己的云环境 ID。
4. 在云数据库中创建集合：`cards`、`checkins`。
5. 将 `database/cards.seed.json` 中的数据导入 `cards` 集合。
6. 上传并部署云函数：`getTodayCard`、`toggleCheckin`。
7. 编译运行。

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
