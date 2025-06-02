const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../userDB');
const maindb = require('../mainDB');

// 장바구니에 상품 추가
router.post('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.sub || decoded.email || decoded.id;

    const { item_id, quantity } = req.body;

    if (!item_id || !quantity) {
      return res.status(400).json({ error: 'item_id and quantity are required' });
    }

    await db.execute(
      `
      INSERT INTO user_cart (user_id, item_id, Quantity, created_at)
      VALUES (?, ?, ?, NOW())
      ON DUPLICATE KEY UPDATE Quantity = Quantity + ?
      `,
      [userId, item_id, quantity, quantity]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('JWT Verify Error:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// 내 장바구니 목록 조회
router.get('/my', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.sub || decoded.email;

    const [cartRows] = await db.execute(
      'SELECT item_id, Quantity FROM user_cart WHERE user_id = ?',
      [userId]
    );

    const itemIds = cartRows.map(row => row.item_id);
    if (itemIds.length === 0) {
      return res.json({ products: [] });
    }

    const placeholders = itemIds.map(() => '?').join(', ');
    const [productRows] = await maindb.execute(
      `
      SELECT id, product_name, product_price, shop_info, category, product_link, created_at, updated_at, filename
      FROM main_products
      WHERE id IN (${placeholders})
      `,
      itemIds
    );

    // 수량과 함께 매핑
    const productMap = Object.fromEntries(cartRows.map(row => [row.item_id, row.Quantity]));
    const enrichedProducts = productRows.map(product => ({
      ...product,
      quantity: productMap[product.id] || 1,
    }));

    res.json({ products: enrichedProducts });
  } catch (err) {
    console.error('🔴 Error in /cart/my:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// 장바구니에서 상품 제거
router.delete('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.sub || decoded.email;

    const { item_id } = req.body;
    if (!item_id) return res.status(400).json({ error: 'item_id is required' });

    await db.execute(
      'DELETE FROM user_cart WHERE user_id = ? AND item_id = ?',
      [userId, item_id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('❌ 삭제 실패:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
