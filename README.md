# 今日一行

今日一行，是一个极简每日卡片小程序。用户每天看到一句来自《圣经》、经典名著或名人名言的话，并点亮早、中、晚三个极小行动。

## 当前阶段

MVP / 产品定义阶段

## 核心闭环

看见一句话，点亮三个小行动。

## 第一版范围

- 每日显示一张卡片
- 展示句子、来源、主题、早中晚动作
- 支持早/中/晚点亮与取消点亮
- 自动保存当天状态
- 后台支持每日卡片配置
- 使用基础素色视觉模板

## 目录结构

```text
今日一行/
├── docs/                  # 产品文档
│   └── PRD.md
└── miniprogram/           # 微信小程序 MVP 代码
    ├── pages/index/       # 首页卡片
    ├── cloudfunctions/    # 云函数
    └── database/          # 种子数据
```

## 文档

- [PRD 草案](docs/PRD.md)
- [小程序 README](miniprogram/README.md)

## 开发入口

用微信开发者工具打开：

`/home/c1/program/myProgram/今日一行/miniprogram`
