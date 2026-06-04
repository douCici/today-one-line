const envConfig = require('./env');

App({
  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用支持云开发的微信开发者工具基础库');
      return;
    }

    wx.cloud.init({
      env: envConfig.CLOUD_ENV_ID,
      traceUser: true
    });
  }
});
