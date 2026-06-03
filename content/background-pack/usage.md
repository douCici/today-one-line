# 小程序使用说明

## 1. 本地资源方式

将 `backgrounds/` 目录复制到小程序项目：

```text
miniprogram/assets/backgrounds/
```

然后在 cards 表里写：

```json
{
  "background_type": "image",
  "background_url": "/assets/backgrounds/bg_01_hope_morning_path.jpg"
}
```

页面中使用：

```wxml
<view class="page-bg" style="background-image: url('{{card.background_url}}');">
  ...
</view>
```

## 2. 云开发存储方式

如果不想增加小程序主包体积，可以上传到云开发存储：

```text
云开发 → 存储 → 上传 backgrounds/ 内的 JPG 文件
```

然后把云存储 fileID 写入 `cards.background_url`。

小程序端可以通过云函数或 `wx.cloud.getTempFileURL` 获取临时 URL 后展示。

## 3. 建议 CSS

```css
.page-bg {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  padding: 64rpx 40rpx;
  box-sizing: border-box;
}

.quote-card {
  border-radius: 48rpx;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(18px);
  box-shadow: 0 24rpx 80rpx rgba(0, 0, 0, 0.12);
}
```

## 4. 与 cards 表的建议关联

```json
{
  "date": "2026-06-03",
  "theme": "希望",
  "background_type": "image",
  "background_url": "/assets/backgrounds/bg_01_hope_morning_path.jpg"
}
```

如果你希望自动匹配，可以按 `theme` 从 `backgrounds.json` 中随机选择同主题背景。
