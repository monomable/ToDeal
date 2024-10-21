const express = require('express');
const router = express.Router();
const db = require('../connectDB'); // db.js 파일에서 데이터베이스 연결 가져오기 | 이거 되는지 안되는지 확인할 필요 있음

// 핫딜 목록 가져오기 API
router.get('/', (req, res) => {
  db.query('SELECT * FROM test', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results); // 결과를 JSON 형식으로 반환
  });
});

module.exports = router;
