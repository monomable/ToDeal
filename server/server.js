// server.js || Mysql 과 Express 프레임워크 연결
const express = require('express');
const dotenv = require('dotenv'); // 서버 포트 사용을 위한 모듈 임포팅
dotenv.config({ path: '.env' }); // 환경변수 사용
const path = require('path');

const dealsRouter = require('./routes/deals');// deals 라우트 가져오기
const postModel = require('./models/model');

/** Create Express */
const app = express();

/** Next.js 모듈 가져오기 */
const next = require('next');
const { parse } = require('url');
const connection = require('./connectDB'); //Mysql 연결 파일

/** Next.js 설정 */
const port = process.env.SERVER_PORT;

// 라우트 설정
//const postRouter = require('./routes/postRouter');
app.use('/deals', dealsRouter); // /deals 경로로 들어오는 요청은 dealsRouter가 처리

/**
 * 개발환경이아니라면 dev 옵션을 false 로 설정하고
 * 서버 시작전에 next build 를 실행해준다.
 */
const nextApp = next({ dev: true, port });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    /** Express Settings */
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    /** static 경로 설정 */
    app.use(express.static(path.join(__dirname, '../', 'public')));

    /** Express Router Settings */
    app.use('/hello', (req, res, next) => {
      res.send('hello!');
    });

    /** Next.js Routing */
    app.get('/', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      nextApp.render(req, res, pathname, query);

      /*
      UserModel.find()
      .then(users => res.json(users))
      .catch(err => res.json(err))
      */
    });
    app.get('/api/list', (req, res) => {
      connection.query('SELECT * FROM Post', function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      })
    });

    /*
    app.get('/api/post/:id', (req, res) =>{
      const id = req.params.id
      postModel.findById(req.params.id, result)
      .then(data => {
        if(!data) {
          console.log('missing find id');
        }
        res.send(result)
      })
      .catch(err =>{
        console.log('error');
      })
    })
    */
    
    app.get('/api/post/:id', (req, res, next) =>{
      connection.query('SELECT * FROM Post', (err, rows) =>{
        if (err) throw err;
        const postview = rows.find(post => post.idx === parseInt(req.params.id));
        if(!postview) {
          return res.status(404).send('해당 글을 찾을 수 없습니다. ');
        }
        res.send(postview);
      })
    })

    app.get('*', (req, res) => {
      return handle(req, res);
    });
    
    app.listen(port, () => {
      console.log(`Express server listen port:${port}`);
      console.log(`http://localhost:${port}`);
    });
    
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

module.exports = app;