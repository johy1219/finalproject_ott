module.exports = function(app){
    const content = require('./contentController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const path = require('path');
    const passport = require('passport');


    //content 라우트 테스트
    app.get('/content-t',content.getTest)

    //필터링 없는 컨텐츠 리스트
    app.get('/all',content.getAll)

    //필터링 컨텐츠 리스트
    app.get('/content-filter',content.getContent)

    //필터링 컨텐츠 리스트
    app.post('/content-name',content.getContentName)

    app.post('/interests',jwtMiddleware,content.postInterest);

};


