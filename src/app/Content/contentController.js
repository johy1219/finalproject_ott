const jwtMiddleware = require("../../../config/jwtMiddleware");
const contentProvider = require("../../app/Content/contentProvider");
const userProvider = require("../../app/User/userProvider");
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

// /** API No. 1 [GET]컨텐츠 리스트 API **/
exports.getAll = async function (req, res) {
    const getAllRes = await contentProvider.retrieveAllContent();
    return res.send(response(baseResponse.SUCCESS,getAllRes))
};

// /** API No. 2 [GET]컨텐츠 리스트 API **/
exports.getContent = async function (req, res) {
    const {tag} = req.body;
    const tagId = await contentProvider.retrieveTag(tag);
    const getContentRes = await contentProvider.retrieveContentByTag(tagId);
    return res.send(response(baseResponse.SUCCESS,getContentRes))
};

// /** API No. 2 [POST]유저 관심사 추가API **/
exports.postInterest = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    const tagId = req.body.tagId;
    const userIdres = await userProvider.retrieveUserId(userIdResult);
    const userId = userIdres['id']
    const postInterestResult = await contentService.userInterest(tagId,userId);
    return res.send(response(baseResponse.SUCCESS));
};

// /** API No. 2 [GET]컨텐츠 리스트 API **/
exports.getContentName = async function (req, res) {
    const name = req.body.name;
    setname = "%" + name +"%"
    const getContentRes = await contentProvider.retrieveContentByName(setname);
    return res.send(response(baseResponse.SUCCESS,getContentRes))
};


