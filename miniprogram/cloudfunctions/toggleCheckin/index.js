const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

const ALLOWED_FIELDS = ['morning_done', 'noon_done', 'evening_done'];

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

exports.main = async (event) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  const cardId = event.cardId;
  // 点亮状态按“用户当天”保存，而不是按卡片发布日期保存。
  // 这样当天无配置、回退展示最近卡片时，刷新后状态仍能正确读取。
  const date = getShanghaiDate();
  const field = event.field;
  const value = !!event.value;

  if (!cardId) {
    throw new Error('cardId is required');
  }

  if (!ALLOWED_FIELDS.includes(field)) {
    throw new Error('invalid checkin field');
  }

  const query = {
    openid,
    date,
    card_id: cardId
  };

  const existed = await db.collection('checkins')
    .where(query)
    .limit(1)
    .get();

  const updateData = {
    [field]: value,
    updated_at: db.serverDate()
  };

  if (existed.data.length > 0) {
    await db.collection('checkins')
      .doc(existed.data[0]._id)
      .update({
        data: updateData
      });
  } else {
    await db.collection('checkins')
      .add({
        data: {
          ...query,
          morning_done: field === 'morning_done' ? value : false,
          noon_done: field === 'noon_done' ? value : false,
          evening_done: field === 'evening_done' ? value : false,
          created_at: db.serverDate(),
          updated_at: db.serverDate()
        }
      });
  }

  return {
    ok: true,
    field,
    value
  };
};
