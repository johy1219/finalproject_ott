const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
var cors = require('cors');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const path = require('path');

module.exports = function () {
    const app = express();
    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    app.use(methodOverride());

    app.use(cors());
    app.use(express.static(process.cwd() + '/static'));

    require('../src/app/User/userRoute')(app);
    require('../src/app/Content/contentRoute')(app);

    return app;
};