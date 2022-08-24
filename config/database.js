const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: 'localhost',
    user: 'master',
    port: '3306',
    password: 'master123',
    database: 'ott'
});

module.exports = {
    pool: pool
};