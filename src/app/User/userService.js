const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const path = require('path');

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createUser = async function (id, name, age, userSex, email, password, number) {
    try {

        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const insertUserInfoParams = [id, name, age, userSex, email, hashedPassword, number];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


// TODO: After 로그인 인증 방법 (JWT)
exports.postSignIn = async function (userId, password) {
    try {
        // 아이디 확인
        const userIdRows = await userProvider.retrieveUser(userId);
        if (userIdRows.length < 1) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);

        const selectUserId = userIdRows.userId

        // 비밀번호 확인
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const selectUserPasswordParams = [selectUserId, hashedPassword];
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams);

        if (passwordRows[0].password !== hashedPassword) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        // 계정 상태 확인
        if (passwordRows[0].status === "INACTIVE") {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } else if (passwordRows[0].status === "DELETED") {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }
        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userId: passwordRows[0].userId,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "userInfo",
            } // 유효 기간 365일
        );

        return response(baseResponse.SUCCESS, {'userId':passwordRows[0].userId, 'jwt': token});

    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return response(baseResponse.DB_ERROR);
    }
};