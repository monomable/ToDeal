// routes/products.js
const express = require('express');
const router = express.Router();
const db = require('../mainDB'); // ✅ 연결된 DB 객체

router.get('/', async (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }

  try {
    // 최신순 (id 기준 내림차순)
    const [rows] = await db.execute(
      `
      (
        SELECT id, product_name, product_price, shop_info, category, product_link, created_at, updated_at, filename
        FROM kurly_products
        WHERE category = ?
        ORDER BY updated_at DESC
        LIMIT 100
      )
      UNION ALL
      (
        SELECT id, product_name, product_price, shop_info, category, product_link, created_at, updated_at, filename
        FROM gmarket_products
        WHERE category = ?
        ORDER BY updated_at DESC
        LIMIT 100
      )
      UNION ALL
      (
        SELECT id, product_name, product_price, shop_info, category, product_link, created_at, updated_at, filename
        FROM emart_products
        WHERE category = ?
        ORDER BY updated_at DESC
        LIMIT 100
      )
      UNION ALL
      (
        SELECT id, product_name, product_price, shop_info, category, product_link, created_at, updated_at, filename
        FROM coupang_products
        WHERE category = ?
        ORDER BY updated_at DESC
        LIMIT 100
      )
      ORDER BY updated_at DESC
      LIMIT 30
      `,
      [category, category, category, category]
    );

    res.json(rows);
  } catch (error) {
    console.error('DB query error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
