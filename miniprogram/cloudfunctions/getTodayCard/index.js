const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

function getShanghaiDate() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());

  const map = {};
  parts.forEach(part => {
    map[part.type] = part.value;
  });

  return `${map.year}-${map.month}-${map.day}`;
}

function defaultCard(today) {
  return {
    _id: 'demo-card',
    date: today,
    quote_text: '世界上只有一种真正的英雄主义，\n就是认清生活的真相后\n依然热爱生活。',
    source: '罗曼·罗兰',
    theme: '希望',
    morning_action: '写一难处',
    noon_action: '做一小事',
    evening_action: '记一好处',
    background_type: 'solid',
    background_url: '',
    color_theme: '#F5EFE6',
    status: 'published'
  };
}

exports.main = async () => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  const today = getShanghaiDate();

  let card = null;

  const todayCards = await db.collection('cards')
    .where({
      date: today,
      status: 'published'
    })
    .limit(1)
    .get();

  if (todayCards.data.length > 0) {
    card = todayCards.data[0];
  } else {
    const latestCards = await db.collection('cards')
      .where({
        status: 'published',
        date: _.lte(today)
      })
      .orderBy('date', 'desc')
      .limit(1)
      .get();

    card = latestCards.data[0] || defaultCard(today);
  }

  const checkins = await db.collection('checkins')
    .where({
      openid,
      date: today,
      card_id: card._id
    })
    .limit(1)
    .get();

  const checkin = checkins.data[0] || {
    morning_done: false,
    noon_done: false,
    evening_done: false
  };

  return {
    card,
    checkin: {
      morning_done: !!checkin.morning_done,
      noon_done: !!checkin.noon_done,
      evening_done: !!checkin.evening_done
    }
  };
};
