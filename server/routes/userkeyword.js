const express = require('express');
const router = express.Router();
const db = require('../DB/userDB');
const verifyJWT = require('../middleware/verifyJWT'); // ✅ 인증 미들웨어

// 🔒 모든 라우터에 verifyJWT 적용
router.use(verifyJWT);

// ✅ 사용자 키워드 조회
router.get('/my', async (req, res) => {
  const userId = req.user?.sub || req.user?.userId || req.user?.email;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const [rows] = await db.execute(
      'SELECT id, keyword FROM user_keywords WHERE user_id = ?',
      [userId]
    );
    res.json({ keywords: rows });
  } catch (err) {
    console.error('키워드 조회 오류:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ 키워드 추가
router.post('/add', async (req, res) => {
  const userId = req.user?.sub || req.user?.userId || req.user?.email;
  const { keyword } = req.body;

  if (!userId || !keyword) return res.status(400).json({ error: 'Missing fields' });

  try {
    await db.execute(
      'INSERT INTO user_keywords (user_id, keyword) VALUES (?, ?)',
      [userId, keyword]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('키워드 추가 오류:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ 키워드 삭제
router.delete('/delete/:id', async (req, res) => {
  const userId = req.user?.sub || req.user?.userId || req.user?.email;
  const keywordId = req.params.id;

  if (!userId || !keywordId) return res.status(400).json({ error: 'Missing parameters' });

  try {
    await db.execute(
      'DELETE FROM user_keywords WHERE id = ? AND user_id = ?',
      [keywordId, userId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('키워드 삭제 오류:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
