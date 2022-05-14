const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const contentProvider = require("./contentProvider");
const contentDao = require("./contentDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const path = require('path');

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");
//
// // Service: Create, Update, Delete 비즈니스 로직 처리
//
// exports.createUser = async function (id, name, age, userSex, email, password, number) {
//     try {
//
//         const hashedPassword = await crypto
//             .createHash("sha512")
//             .update(password)
//             .digest("hex");
//
//         const insertUserInfoParams = [id, name, age, userSex, email, hashedPassword, number];
//
//         const connection = await pool.getConnection(async (conn) => conn);
//
//         const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
//         console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
//         connection.release();
//         return response(baseResponse.SUCCESS);
//
//
//     } catch (err) {
//         logger.error(`App - createUser Service error\n: ${err.message}`);
//         return errResponse(baseResponse.DB_ERROR);
//     }
// };
