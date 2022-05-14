const jwtMiddleware = require("../../../config/jwtMiddleware");
const contentProvider = require("../../app/Content/contentProvider");
const contentService = require("../../app/Content/contentService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const axios = require('axios');
const path = require('path');
const fs = require("fs");
const {emit} = require("nodemon");

// /** API No. 0 [GET]테스트 API **/
exports.getTest = async function (req, res) {
    return res.send(response(baseResponse.SUCCESS))
};


