const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../DB/userDB'); // MariaDB 커넥션을 불러온다고 가정

const POSTS_PER_PAGE = 10;
const SALT_ROUNDS = 10;

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

// ✅ 글 작성 처리
router.post('/create', async (req, res) => {
  try {
    const { title, writer, password, content } = req.body;

    if (!title || !writer || !password || !content) {
      return res.status(400).json({ error: '모든 필드를 입력해주세요.' });
    }

    // bcrypt 해시 적용
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await db.execute(
      `INSERT INTO Post (title, writer, password, content, regdate) 
       VALUES (?, ?, ?, ?, NOW())`,
      [title, writer, hashedPassword, content]
    );

    res.redirect('/community/post'); // 성공 시 목록 페이지로 이동
  } catch (err) {
    console.error('게시글 작성 오류:', err);
    res.status(500).json({ error: '게시글을 저장하지 못했습니다.' });
  }
});

router.post('/:id/verify-password', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const [rows] = await db.execute(
      `SELECT password FROM Post WHERE board_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }

    const hashed = rows[0].password;
    const isMatch = await bcrypt.compare(password, hashed);

    if (!isMatch) {
      return res.json({ success: false });
    }

    res.json({ success: true });

  } catch (err) {
    console.error('비밀번호 검증 오류:', err);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 📌 게시글 삭제 API
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute(`DELETE FROM Post WHERE board_id = ?`, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '삭제할 게시글이 없습니다.' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('게시글 삭제 오류:', err);
    res.status(500).json({ error: '게시글 삭제에 실패했습니다.' });
  }
});

router.post('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const { title, writer, content, password } = req.body;

  try {
    const [rows] = await db.execute('SELECT password FROM Post WHERE board_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: '게시글 없음' });

    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) return res.status(403).json({ error: '비밀번호 불일치' });

    await db.execute(
      `UPDATE Post SET title = ?, writer = ?, content = ?, \`update\` = NOW() WHERE board_id = ?`,
      [title, writer, content, id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('게시글 수정 오류:', err);
    res.status(500).json({ error: '수정 실패' });
  }
});

module.exports = router;
