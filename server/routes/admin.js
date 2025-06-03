// routes/admin.js
const express = require('express');
const router = express.Router();
const db = require('../DB/userDB');
const maindb = require('../DB/mainDB');

// ✅ 관리자 인증
router.post('/verify', async (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ success: false });

  try {
    const [rows] = await db.execute(
      `SELECT * FROM admin WHERE access_key = ?`,
      [key]
    );
    if (rows.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error('❌ 관리자 인증 실패:', err);
    res.status(500).json({ success: false });
  }
});

// ✅ 전체 사용자에게 알림 전송
router.post('/notify-all', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: '알림 메시지가 비어있습니다.' });

  try {
    const [users] = await db.execute(`SELECT DISTINCT user_id FROM user_keywords`);
    if (users.length === 0) return res.json({ success: false, error: '수신 대상 없음' });

    const now = new Date();
    const values = users.map(user => [
      user.user_id,
      -1,                    // 관리자 알림이므로 product_id는 -1
      '[관리자 알림]',       // 상품명 대신 관리자 안내문
      0,                     // 가격 없음
      message,
      now,
    ]);

    await db.query(
      `INSERT INTO user_alerts (user_id, product_id, product_name, product_price, keyword_matched, created_at)
       VALUES ?`,
      [values]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('❌ 전체 알림 전송 오류:', err);
    res.status(500).json({ error: '서버 오류' });
  }
});

// ✅ 특정 상품 + 매칭 키워드로 알림 전송
router.post('/notify-product', async (req, res) => {
  const { productId, matchedKeyword } = req.body;
  if (!productId || !matchedKeyword)
    return res.status(400).json({ error: '상품 ID와 키워드가 모두 필요합니다.' });

  try {
    const [[product]] = await maindb.execute(
      `SELECT id, product_name, product_price FROM Main_db.main_products WHERE id = ?`,
      [productId]
    );

    if (!product) {
      return res.status(404).json({ error: '해당 상품을 찾을 수 없습니다.' });
    }

    const [users] = await db.execute('SELECT DISTINCT user_id FROM user_keywords');
    if (users.length === 0)
      return res.status(200).json({ success: false, error: '수신 대상 없음' });

    const now = new Date();
    const values = users.map(u => [
      u.user_id,
      product.id,
      product.product_name,
      product.product_price,
      matchedKeyword,
      now,
    ]);

    await db.query(
      `INSERT INTO user_alerts (user_id, product_id, product_name, product_price, keyword_matched, created_at)
       VALUES ?`,
      [values]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('❌ 상품 알림 전송 오류:', err);
    res.status(500).json({ error: 'DB 오류' });
  }
});

module.exports = router;
