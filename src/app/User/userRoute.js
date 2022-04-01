module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const path = require('path');
    const passport = require('passport');

    // 0. 테스트 API
    app.get('/test',user.getTest);

    // 혜연
    app.get('/intro',user.getIntro); // 배경이미지
    app.get('/searchicon',user.getSearch);
    app.get('/pointericon',user.getPointer);

    // 1. 메인 API
    app.get('/',user.getMain);
    app.get('/menuicon',user.getIcon);

    // 2. 로그인 페이지 HTML
    app.get('/loginPage',user.loginPage);

    // 3. 회원가입 페이지 HTML
    app.get('/signUpPage',user.signUpPage);

    // 4. 회원가입 API
    app.post('/users', user.postUsers);

    // 5. 로그인 하기 API (JWT 생성)
    app.post('/login', user.login);

    // 6. 카카오 로그인 API
    app.post('/kakao-login',user.kakaoLogIn);
    app.get('/kakao', passport.authenticate('kakao-login'));
    app.get('/auth/kakao/callback', passport.authenticate('kakao-login', {
        successRedirect: '/',
        failureRedirect : '/',
    }), (req, res) => {
        res.redirect('/')
    });

    //JWT 검증 API
    app.get('/auto-login', jwtMiddleware, user.check);

};


