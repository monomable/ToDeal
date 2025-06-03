const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../DB/userDB'); // 사용자 DB 연결
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey'; // 환경변수에 등록 권장

// 회원가입
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, error: '이메일과 비밀번호가 필요합니다.' });

  try {
    const [existing] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, error: '이미 존재하는 이메일입니다.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashed]);

    res.json({ success: true });
  } catch (err) {
    console.error('❌ 회원가입 오류:', err);
    res.status(500).json({ success: false, error: '서버 오류' });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, error: '이메일과 비밀번호가 필요합니다.' });

  try {
    const [[user]] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) return res.status(401).json({ success: false, error: '존재하지 않는 사용자입니다.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, error: '비밀번호가 일치하지 않습니다.' });

    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, token });
  } catch (err) {
    console.error('❌ 로그인 오류:', err);
    res.status(500).json({ success: false, error: '서버 오류' });
  }
});

module.exports = router;
