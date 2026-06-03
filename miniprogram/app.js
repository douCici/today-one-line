App({
  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用支持云开发的微信开发者工具基础库');
      return;
    }

    wx.cloud.init({
      // TODO: 替换为你的云开发环境 ID，例如：prod-xxxxxx
      env: 'YOUR_CLOUD_ENV_ID',
      traceUser: true
    });
  }
});
