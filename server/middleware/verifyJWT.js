// middleware/verifyJWT.js
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // NextAuth에서 사용한 secret과 동일해야 함
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);

    // JWT payload 정보는 req.user에 넣어주자
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT 검증 실패:', err.message);
    return res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = verifyJWT;
