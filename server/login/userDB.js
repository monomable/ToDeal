const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,          // 나중에 포트 변경해야함
  user: process.env.DB_USER,          // MySQL 사용자 이름
  password: process.env.DB_PASSWORD,  // MySQL 비밀번호
  database: 'user_db'     // 사용하려는 데이터베이스 이름
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

module.exports = connection;
