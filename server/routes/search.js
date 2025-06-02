const express = require('express');
const router = express.Router();
const db = require('../searchDB'); // 하나의 MariaDB 커넥션이 여러 DB 접근 가능해야 함

router.get('/', async (req, res) => {
  const search = req.query.search || '';
  const keyword = `%${search}%`;

  try {
    // 🔍 main_products 검색
    const [mainResults] = await db.execute(
      `SELECT 
         id, product_name, product_price, shop_info, category, product_link, filename, created_at, updated_at 
       FROM Main_db.main_products 
       WHERE product_name LIKE ? 
       ORDER BY id DESC 
       LIMIT 30`,
      [keyword]
    );

    // 🔥 hotdeals 검색
    const [hotdealResults] = await db.execute(
      `SELECT 
         id, title, link, category, price, created_at, source_website, filepath
       FROM hotdeals_db.hotdeals 
       WHERE title LIKE ? 
       ORDER BY id DESC 
       LIMIT 30`,
      [keyword]
    );

    res.json({
      main: mainResults,
      hotdeals: hotdealResults,
    });
  } catch (err) {
    console.error('❌ 검색 오류:', err);
    res.status(500).json({ error: '검색 중 오류 발생' });
  }
});

module.exports = router;
