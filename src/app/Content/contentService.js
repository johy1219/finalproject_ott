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
exports.userInterest = async function (tagId,userIdResult) {
    try {
        const InsertInfo = [userIdResult,tagId]
        const connection = await pool.getConnection(async (conn) => conn);
        const userInterestResult = await contentDao.insertUserInterest(connection, InsertInfo);
        connection.release();
        return response(baseResponse.SUCCESS,userInterestResult);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
