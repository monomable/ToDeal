// routes/products.js
const express = require('express');
const router = express.Router();
const db = require('../mainDB'); // ✅ 연결된 DB 객체

const categoryMap = {
  drink: ['drink', 'tea', 'beverage', 'water'],
  healthy: ['health', 'healthy'],
};

router.get('/', async (req, res) => {
  let { category, page = 1 } = req.query;
  const pageSize = 20;
  const offset = (Number(page) - 1) * pageSize;

  try {
    let rows, count;

    // ✅ category가 없으면 전체 조회
    if (!category) {
      [rows] = await db.execute(
        `
        SELECT id, product_name, product_price, shop_info, category, product_link, created_at, updated_at, filename
        FROM main_products
        ORDER BY updated_at DESC
        LIMIT ? OFFSET ?
        `,
        [pageSize, offset]
      );

      [count] = await db.execute(`SELECT COUNT(*) as total FROM main_products`);
    } else {
      // ✅ category가 있을 경우 like 검색
      let searchTerms = [];

      if (typeof category === 'string') {
        const baseCategory = category.toLowerCase();
        searchTerms = categoryMap[baseCategory] || [baseCategory];
      }

      const likeConditions = searchTerms.map(() => `category LIKE ?`).join(' OR ');
      const likeValues = searchTerms.map(term => `%${term}%`);

      [rows] = await db.execute(
        `
        SELECT id, product_name, product_price, shop_info, category, product_link, created_at, updated_at, filename
        FROM main_products
        WHERE ${likeConditions}
        ORDER BY updated_at DESC
        LIMIT ? OFFSET ?
        `,
        [...likeValues, pageSize, offset]
      );

      [count] = await db.execute(
        `SELECT COUNT(*) as total FROM main_products WHERE ${likeConditions}`,
        likeValues
      );
    }

    res.json({ products: rows, total: count[0].total });
  } catch (err) {
    console.error('❌ DB query error:', err);
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

router.get('/trend', async (req, res) => {
  const { product_link } = req.query;

  const [rows] = await db.query(`
    SELECT recorded_price, recorded_date
    FROM main_price_history
    WHERE TRIM(product_link) = ?
    ORDER BY recorded_date ASC
  `, [decodeURIComponent(req.query.product_link).trim()]);

  const data = rows.map(row => ({
    date: new Date(row.recorded_date).toISOString().slice(5, 10).replace("-", "."),
    price: row.recorded_price
  }));

  const avg = Math.round(rows.reduce((acc, cur) => acc + cur.recorded_price, 0) / rows.length);

  res.json({ priceData: data, avgPrice: avg });
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
