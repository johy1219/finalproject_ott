module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const path = require('path');
    const passport = require('passport');

    // 0. 테스트 API
    app.get('/test', user.getTest);

    app.get('/loginPage',user.loginPage);

    app.get('/signUpPage',user.signUpPage);

    // 1. 유저 생성 (회원가입) API
    app.post('/users', user.postUsers);

    // 로그인 하기 API (JWT 생성)
    app.post('/login', user.login);

    // 3. 카카오 로그인 API
    app.post('/kakao-login',user.kakaoLogIn);
    app.get('/kakao', passport.authenticate('kakao-login'));
    app.get('/auth/kakao/callback', passport.authenticate('kakao-login', {
        successRedirect: '/',
        failureRedirect : '/',
    }), (req, res) => {
        res.redirect('/')
        return res.sendFile(path.join(__dirname,'../../../view/index.html'));
    });

    //JWT 검증 API
    app.get('/auto-login', jwtMiddleware, user.check);

};


