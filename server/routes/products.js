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
    const [rows] = await db.execute(
      `
      SELECT id, product_name, product_price, shop_info, category, product_link, created_at, updated_at, filename
      FROM main_products
      WHERE category = ?
      ORDER BY updated_at DESC
      LIMIT 30
      `,
      [category]
    );

    res.json(rows);
  } catch (error) {
    console.error('DB query error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/latest', async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM main_products ORDER BY id DESC LIMIT 5`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.execute('SELECT * FROM main_products WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'DB error' });
  }
});


module.exports = router;
