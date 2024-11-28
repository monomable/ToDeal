/**
 * 로그인 인증 미들웨어
 */
const authCheck = (req, res, next) => {
    if (req.session && req.session.isLoggedIn === true) {
        next();
    } else {
        res.send(`<script type="text/javascript">
            alert("로그인이 필요한 서비스입니다."); 
            document.location.href="/";</script>`);
    }
};

module.exports = authCheck;
