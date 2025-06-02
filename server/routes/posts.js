const express = require('express');
const router = express.Router();
const db = require('../userDB'); // MariaDB 커넥션을 불러온다고 가정

const POSTS_PER_PAGE = 10;

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * POSTS_PER_PAGE;

    const [countRows] = await db.execute('SELECT COUNT(*) AS count FROM Post');
    const totalPages = Math.ceil(countRows[0].count / POSTS_PER_PAGE);

    const [posts] = await db.execute(
      `SELECT board_id, writer, title, content, regdate, \`update\` 
       FROM Post
       ORDER BY regdate DESC 
       LIMIT ? OFFSET ?`,
      [POSTS_PER_PAGE, offset]
    );

    res.json({ posts, totalPages });
  } catch (err) {
    console.error('게시글 조회 오류:', err);
    res.status(500).json({ error: '게시글을 불러오지 못했습니다.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      `SELECT board_id, writer, title, content, regdate, \`update\` 
       FROM Post 
       WHERE board_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }

    res.json(rows[0]); // 단일 게시글
  } catch (err) {
    console.error('게시글 단일 조회 오류:', err);
    res.status(500).json({ error: '게시글을 불러오지 못했습니다.' });
  }
});

module.exports = router;
