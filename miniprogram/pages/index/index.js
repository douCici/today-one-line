function normalizeBackgroundUrl(url) {
  if (!url || typeof url !== 'string') return '';
  return url.replace('/assets/backgrounds/backgrounds/', '/assets/backgrounds/');
}

function normalizeCard(card) {
  return {
    ...card,
    background_url: normalizeBackgroundUrl(card.background_url)
  };
}

const DEFAULT_CARD = {
  _id: 'demo-card',
  date: '',
  quote_text: '世界上只有一种真正的英雄主义，\n就是认清生活的真相后\n依然热爱生活。',
  source: '罗曼·罗兰',
  theme: '希望',
  morning_action: '写一难处',
  noon_action: '做一小事',
  evening_action: '记一好处',
  background_type: 'solid',
  background_url: '',
  color_theme: '#F5EFE6'
};

Page({
  data: {
    loading: false,
    card: DEFAULT_CARD,
    checkin: {
      morning_done: false,
      noon_done: false,
      evening_done: false
    },
    pageBgStyle: 'background: #F5EFE6;',
    cardClass: 'solid'
  },

  onLoad() {
    this.loadTodayCard();
  },

  async loadTodayCard() {
    this.setData({ loading: true });

    try {
      const res = await wx.cloud.callFunction({
        name: 'getTodayCard'
      });

      const result = res.result || {};
      const card = normalizeCard(result.card || DEFAULT_CARD);
      const checkin = result.checkin || this.data.checkin;

      this.setData({
        card,
        checkin,
        ...this.buildVisualState(card)
      });
    } catch (err) {
      console.warn('[getTodayCard] failed:', err);
      this.setData({
        card: DEFAULT_CARD,
        checkin: this.data.checkin,
        ...this.buildVisualState(DEFAULT_CARD)
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  async toggleCheckin(event) {
    if (this.data.loading || !this.data.card) return;

    const field = event.currentTarget.dataset.field;
    if (!['morning_done', 'noon_done', 'evening_done'].includes(field)) return;

    const currentValue = !!this.data.checkin[field];
    const nextValue = !currentValue;
    const oldCheckin = { ...this.data.checkin };
    const nextCheckin = {
      ...oldCheckin,
      [field]: nextValue
    };

    this.setData({ checkin: nextCheckin });

    try {
      await wx.cloud.callFunction({
        name: 'toggleCheckin',
        data: {
          cardId: this.data.card._id,
          field,
          value: nextValue
        }
      });
    } catch (err) {
      console.warn('[toggleCheckin] failed:', err);
      this.setData({ checkin: oldCheckin });
    }
  },

  buildVisualState(card) {
    const backgroundUrl = normalizeBackgroundUrl(card.background_url);

    if (card.background_type === 'image' && backgroundUrl) {
      return {
        pageBgStyle: `background-image: url(${backgroundUrl});`,
        cardClass: ''
      };
    }

    const gradientStart = card.gradient_start || card.color_theme || '#F5EFE6';
    const gradientEnd = card.gradient_end || '#E6F0EA';

    return {
      pageBgStyle: `background: linear-gradient(160deg, ${gradientStart} 0%, ${gradientEnd} 100%);`,
      cardClass: 'solid'
    };
  }
});
