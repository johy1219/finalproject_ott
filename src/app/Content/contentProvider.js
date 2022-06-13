const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const contentDao = require("./contentDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveAllContent = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const contentResult = await contentDao.selectContentAll(connection);
  connection.release();

  return contentResult;
};

exports.retrieveTag = async function (tag) {
    const connection = await pool.getConnection(async (conn) => conn);
    const TagResult = await contentDao.selectTagId(connection,tag);
    connection.release();

    return TagResult[0];
};

exports.retrieveContentByTag = async function (tagId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const contentResult = await contentDao.selectContentByTag(connection);
    connection.release();

    return contentResult;
};

exports.retrieveContentByName = async function (name) {
    const connection = await pool.getConnection(async (conn) => conn);
    const contentResult = await contentDao.selectContentByName(connection,name);
    connection.release();

    return contentResult;
};

