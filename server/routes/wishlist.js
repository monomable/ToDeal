// routes/wishlist.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../DB/userDB');
const maindb = require('../DB/mainDB');

router.post('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    // 👇 여기에서 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.sub || decoded.email || decoded.id;

    const { item_id } = req.body;
    await db.execute(
      'INSERT IGNORE INTO user_wishlist (user_id, item_id) VALUES (?, ?)',
      [userId, item_id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('JWT Verify Error:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
});

router.get('/my', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.sub || decoded.email;

    const [rows] = await db.execute(
      'SELECT item_id FROM user_wishlist WHERE user_id = ?',
      [userId]
    );

    const itemIds = rows.map(row => row.item_id);
    res.json({ wishlistItemIds: itemIds });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

router.get('/mylist', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.sub || decoded.email;

    const [wishlistRows] = await db.execute(
      'SELECT item_id FROM user_wishlist WHERE user_id = ?',
      [userId]
    );

    const itemIds = wishlistRows.map(row => row.item_id);

    if (itemIds.length === 0) {
      return res.json({ products: [] }); // 찜한 상품이 없음
    }

    // itemIds 배열을 IN 쿼리에 사용할 문자열로 변환 (예: "1,2,3")
    const placeholders = itemIds.map(() => '?').join(', ');
    const [productRows] = await maindb.execute(
      `
      SELECT id, product_name, product_price, shop_info, category, product_link, created_at, updated_at, filename
      FROM main_products
      WHERE id IN (${placeholders})
      `,
      itemIds
    );

    res.json({ products: productRows });
  } catch (err) {
    console.error('🔴 Error in /wishlist/my:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
});


router.delete('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.sub || decoded.email;
    const { item_id } = req.body;

    await db.execute(
      'DELETE FROM user_wishlist WHERE user_id = ? AND item_id = ?',
      [userId, item_id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
