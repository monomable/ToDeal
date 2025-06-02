const express = require('express');
const router = express.Router();
const db = require('../hotdealDB'); // 위에서 만든 pool 가져오기

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 12;
    const offset = (page - 1) * limit;

    // 전체 개수 조회 (페이지네이션 총 페이지 계산용)
    const [[{ total }]] = await db.execute('SELECT COUNT(*) AS total FROM hotdeals');

    // 해당 페이지의 핫딜 데이터 조회
    const [rows] = await db.execute(
      `SELECT id, title, link, category, price, created_at, source_website, filepath
       FROM hotdeals
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    res.json({
      hotdeals: rows,
      total,             // 전체 개수
      page,              // 현재 페이지
      totalPages: Math.ceil(total / limit) // 총 페이지 수
    });
  } catch (err) {
    console.error('🔥 핫딜 DB 조회 실패:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
