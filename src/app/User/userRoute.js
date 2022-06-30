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
    app.get('/searchPage',user.searchPage);
    app.get('/searchAll',user.searchAll);
    app.get('/pointericon',user.getPointer);

    // 1. 메인 API
    app.get('/',user.getMain);
    app.get('/menuicon',user.getIcon);

    // 찜 목록
    app.get('/likeicon', user.wishlistPageIn);
    app.get('/wishListPage', user.wishListPage);
    app.get('/content_ex', user.contentImage);

    // 설문조사 페이지
    app.get('/surveyPage', user.surveyPage);

    // 2. 로그인 페이지 HTML
    app.get('/loginicon',user.getLogin);
    app.get('/logouticon',user.getLogout);
    app.get('/loginPage',user.loginPage);
    app.get('/kakaoicon',user.getkakao);

    // 3. 회원가입 페이지 HTML
    app.get('/signUpPage',user.signUpPage);


    // 4. 회원가입 API
    app.post('/users', user.postUsers);

    // 5. 로그인 하기 API (JWT 생성)
    app.post('/login', user.login);

    app.get('/logout' ,user.logout);

    app.post('/interests');

    app.get('/exampleImage',user.getExample);
    app.get('/exampleImage2',user.getExample2);
    app.get('/exampleImage3',user.getExample3);

    // 6. 카카오 로그인 API
    app.post('/kakao-login',user.kakaoLogIn);
    app.get('/kakao', passport.authenticate('kakao-login'));
    app.get('/kakao/oauth', passport.authenticate('kakao-login', {
        failureRedirect : '/',
    }), (req, res) => {
        res.redirect('/');
    });



    //JWT 검증 API
    app.get('/auto', jwtMiddleware, user.check);

};


