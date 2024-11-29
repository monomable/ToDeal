var express = require('express');
var router = express.Router();

var template = require('./template.js');
var db = require('./userDB.js');
const bcrypt = require('bcrypt'); // 비밀번호 해싱 모듈
const saltRounds = 10; // 비밀번호 해싱 라운드 수

// 로그인 화면 대체 완료
/*router.get('/login', function (request, response) {
    var title = '로그인';
    var html = template.HTML(title,`
            <h2>로그인</h2>
            <form action="/auth/login_process" method="post">
            <p><input class="login" type="text" name="username" placeholder="이메일"></p>
            <p><input class="login" type="password" name="pwd" placeholder="비밀번호"></p>
            <p><input class="btn" type="submit" value="로그인"></p>
            </form>            
            <p>계정이 없으신가요?  <a href="/auth/register">회원가입</a></p> 
        `, '');
    response.send(html);
}); */

// 로그인 프로세스
router.post('/login_process', function (request, response) {
    const username = request.body.username;
    const password = request.body.pwd;

    if (username && password) {             
        db.query('SELECT * FROM users WHERE email = ?', [username], function(error, results) {
            if (error) {
                console.error(error);
                response.status(500).send('서버 오류');
                return;
            }
            if (results.length > 0) {
                // 비밀번호 검증
                bcrypt.compare(password, results[0].password_hash, function(err, isMatch) {
                    if (err) {
                        console.error(err);
                        response.status(500).send('서버 오류');
                        return;
                    }
                    
                    if (isMatch) {
                        // 세션 설정
                        request.session.isLoggedIn = true;      
                        request.session.username = username;
                        request.session.save(function (err) {
                            if (err) {
                                console.error('세션 저장 오류:', err);
                                response.status(500).send('서버 오류');
                                return;
                            }
                            response.redirect('/home');
                        });
                    } else {
                        response.send(`<script type="text/javascript">alert("비밀번호가 일치하지 않습니다."); 
                        document.location.href="/";</script>`);
                        return;
                    }
                });
            } else {              
                response.send(`<script type="text/javascript">alert("존재하지 않는 아이디입니다."); 
                document.location.href="/";</script>`);
                return;
            }            
        });
    } else {
        response.send(`<script type="text/javascript">alert("아이디와 비밀번호를 입력하세요!"); 
        document.location.href="/";</script>`);    
        return;
    }
    /**
     * 기존 로그인 프로세스
    if (username && password) {             
        db.query('SELECT * FROM users WHERE email = ? AND password_hash = ?', [username, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {       
                request.session.isLoggedIn = true;      
                request.session.username = username;
                request.session.save(function (err) {
                    if (err) {
                        console.error('세션 저장 오류:', err);
                        response.status(500).send('서버 오류');
                        return;
                    }
                    response.redirect('/home');
                });
            } else {              
                response.send(`<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); 
                document.location.href="/";</script>`);    
            }            
        });
    } else {
        response.send(`<script type="text/javascript">alert("아이디와 비밀번호를 입력하세요!"); 
        document.location.href="/";</script>`);    
    }
        */
});

// 로그아웃 프로세스 (/auth/logout)
router.get('/logout', function (request, response) {
    request.session.destroy(function (err) {
        if (err) {
            console.error('세션 삭제 오류:', err);
            response.status(500).send('서버 오류');
            return;
        }
        response.redirect('/');
    });
});


// 회원가입 화면 대체 완료
/*router.get('/register', function(request, response) {
    var title = '회원가입';    
    var html = template.HTML(title, `
    <h2>회원가입</h2>
    <form action="/auth/register_process" method="post">
    <p><input class="login" type="text" name="username" placeholder="이메일"></p>
    <p><input class="login" type="password" name="pwd" placeholder="비밀번호"></p>
    <p><input class="login" type="password" name="pwd2" placeholder="비밀번호 재확인"></p>
    <p><input class="login" type="text" name="nickname" placeholder="닉네임"></p>
    <p><input class="btn" type="submit" value="제출"></p>
    </form>            
    <p><a href="/auth/login">로그인화면으로 돌아가기</a></p>
    `, '');
    response.send(html);
});*/
 
/**
 * 기존 회원가입 프로세스
 router.post('/register_process', function(request, response) {    
    var username = request.body.username;
    var nickname = request.body.nickname;
    var password = request.body.pwd;    
    var password2 = request.body.pwd2;

    if (username && password && password2) {
        
        db.query('SELECT * FROM users WHERE email = ?', [username], function(error, results, fields) { // DB에 같은 이름의 회원아이디가 있는지 확인
            if (error) throw error;
            if (results.length <= 0 && password == password2) {     // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우 
                db.query('INSERT INTO users (email, password_hash, nickname) VALUES(?,?,?)', [username, password, nickname], function (error, data) {
                    if (error) throw error2;
                    response.send(`<script type="text/javascript">alert("회원가입이 완료되었습니다!");
                    document.location.href="/home";</script>`);
                });
            } else if (password != password2) {                     // 비밀번호가 올바르게 입력되지 않은 경우
                response.send(`<script type="text/javascript">alert("입력된 비밀번호가 서로 다릅니다."); 
                document.location.href="/login/signup";</script>`);    
            }
            else {                                                  // DB에 같은 이름의 회원아이디가 있는 경우
                response.send(`<script type="text/javascript">alert("이미 존재하는 아이디 입니다."); 
                document.location.href="/login/signup";</script>`);    
            }            
        });

    } else {        // 입력되지 않은 정보가 있는 경우
        response.send(`<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); 
        document.location.href="/login/signup";</script>`);
    }
});
 */

// 회원가입 프로세스
router.post('/register_process', function(request, response) {    
    var username = request.body.username;
    var nickname = request.body.nickname;
    var password = request.body.pwd;    
    var password2 = request.body.pwd2;

    if (username && password && password2) {
        if (password !== password2) {
            response.send(`<script type="text/javascript">alert("입력된 비밀번호가 서로 다릅니다."); 
            document.location.href="/login/signup";</script>`);
            return;
        }
        
        db.query('SELECT * FROM users WHERE email = ?', [username], function(error, results) {
            if (error) throw error;
            if (results.length > 0) {
                response.send(`<script type="text/javascript">alert("이미 존재하는 아이디 입니다."); 
                document.location.href="/login/signup";</script>`);
                return;
            }

            // 비밀번호 해싱
            bcrypt.hash(password, saltRounds, function(err, hash) {
                if (err) throw err;
                
                db.query('INSERT INTO users (email, password_hash, nickname) VALUES(?,?,?)', 
                    [username, hash, nickname], 
                    function (error, data) {
                        if (error) throw error;
                        response.send(`<script type="text/javascript">alert("회원가입이 완료되었습니다!");
                        document.location.href="/";</script>`);
                    }
                );
            });
        });
    } else {
        response.send(`<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); 
        document.location.href="/login/signup";</script>`);
    }
});

// 게스트 로그인 프로세스
router.post('/guest_login', function (request, response) {
    const guestEmail = 'Guest';
    //const guestPassword = '123456';
    
    db.query('SELECT * FROM users WHERE email = ?', [guestEmail], function(error, results) {
        if (error) throw error;
        setGuestSession();
    });

    function setGuestSession() {
        request.session.isLoggedIn = true;
        request.session.username = guestEmail;
        request.session.save(function (err) {
            if (err) {
                console.error('세션 저장 오류:', err);
                response.status(500).send('서버 오류');
                return;
            }
            response.redirect('/home');
        });
    }
});

module.exports = router;
