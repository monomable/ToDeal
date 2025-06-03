const express = require('express');
const router = express.Router();
const db = require('../DB/userDB');
const verifyJWT = require('../middleware/verifyJWT');

// 🔐 모든 요청에 인증 미들웨어 적용
router.use(verifyJWT);

// ✅ 1. 알림 조회
router.get('/', async (req, res) => {
  const userId = req.user?.sub || req.user?.userId || req.user?.email;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const [rows] = await db.execute(
      `SELECT id, user_id, product_id, product_name, product_price, keyword_matched, is_read, created_at
       FROM user_alerts
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );
    res.json({ alerts: rows });
  } catch (err) {
    console.error('❌ 알림 조회 오류:', err);
    res.status(500).json({ error: 'DB 조회 실패' });
  }
});

// ✅ 2. 알림 추가
router.post('/', async (req, res) => {
  const userId = req.user?.sub || req.user?.userId || req.user?.email;
  const { product_id, product_name, product_price, keyword_matched } = req.body;

  if (!userId || !product_id || !product_name || !product_price || !keyword_matched) {
    return res.status(400).json({ error: '필수 항목 누락' });
  }

  try {
    const [result] = await db.execute(
      `INSERT INTO user_alerts 
       (user_id, product_id, product_name, product_price, keyword_matched, is_read, created_at)
       VALUES (?, ?, ?, ?, ?, 0, NOW())`,
      [userId, product_id, product_name, product_price, keyword_matched]
    );
    res.json({ success: true, alertId: result.insertId });
  } catch (err) {
    console.error('❌ 알림 저장 오류:', err);
    res.status(500).json({ error: '알림 저장 실패' });
  }
});

// ✅ 3. 알림 읽음 처리
router.patch('/:id/read', async (req, res) => {
  const userId = req.user?.sub || req.user?.userId || req.user?.email;
  const alertId = req.params.id;

  if (!userId || !alertId) return res.status(400).json({ error: '필수 파라미터 누락' });

  try {
    await db.execute(
      `UPDATE user_alerts SET is_read = 1 WHERE id = ? AND user_id = ?`,
      [alertId, userId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('❌ 읽음 처리 오류:', err);
    res.status(500).json({ error: '읽음 처리 실패' });
  }
});

router.delete('/:id', async (req, res) => {
  const userId = req.user?.sub || req.user?.userId || req.user?.email;
  const alertId = req.params.id;

  if (!userId || !alertId) return res.status(400).json({ error: '잘못된 요청입니다.' });

  try {
    const [result] = await db.execute(
      `DELETE FROM user_alerts WHERE id = ? AND user_id = ?`,
      [alertId, userId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('❌ 알림 삭제 오류:', err);
    res.status(500).json({ error: '삭제 실패' });
  }
});

module.exports = router;
