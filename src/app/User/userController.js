const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const KakaoStrategy = require('passport-kakao').Strategy;
const passport = require('passport');
const path = require('path');

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

// /** API No. 0 [GET]테스트 API **/
exports.getTest = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view'));
}

// /** API No. 0 [GET]테스트 API **/
exports.loginPage = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/login.html'));
}

// /** API No. 0 [GET]테스트 API **/
exports.signUpPage = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/signUp.html'));
}

/** API No. 1 [POST]유저 생성 (회원가입) API **/
exports.postUsers = async function (req, res) {

    // /**Body: id, name, age, userSex, email, password, number **/
    const {id, name, age, userSex, email, password, number} = req.body;

    // 빈 값 체크
    if (!id)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    if (!name)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    //
    // // 형식 체크 (by 정규표현식)
    // if (!regexEmail.test(email))
    //     return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
    //
    const signUpResponse = await userService.createUser(
        id, name, age, userSex, email, password, number
    );

    return res.send(signUpResponse);
};

/** API No. 2 [POST]유저 로그인 API **/
exports.login = async function (req, res) {

    const {userId, password} = req.body;

    const signInResponse = await userService.postSignIn(userId, password);

    return res.send(response(signInResponse));
};

/** API No. 3 [GET]소셜 로그인 API **/
exports.kakaoLogIn = async function (req,res)
{
    const {accessToken} = req.body;
    if(!accessToken)
        return res.send(response(baseResponse.ACCESSTOKEN_EMPTY));

    let profile;
    try {
        profile = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });
        console.log(profile);
        // const name = profile.data.kakao_account.profile['nickname'];
        // const email = profile.data.kakao_account.email;
        // const password = "kakaoLogin";
        // const number = "kakaoLogin";
        // const emailRows = await userProvider.emailCheck(email);
        // if (emailRows.length > 0) {
        //     const signInResponse = await userService.postSignIn(email, password);
        //     return res.send(signInResponse);
        // } else {
        //     const signUpResponse = await userService.createUser(
        //         email,
        //         password,
        //         name,
        //         number
        //     );
        //     const signInResponse = await userService.postSignIn(email, password);
            return res.send(response(baseResponse.SUCCESS));
    }
    catch (err){
        return res.send(response(baseResponse.ACCESS_TOKEN_ERROR));
    }
};

passport.use('kakao-login', new KakaoStrategy({
        clientID: '5898d4ba2fdda040b411119996107a41',
        callbackURL: 'http://3.36.92.132:3000/auth/kakao/callback'},
    async (accessToken, refreshToken, profile, done) =>
    {
        console.log(accessToken);
    }));

/** JWT 토큰 검증 API[GET] /auto-login **/
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
