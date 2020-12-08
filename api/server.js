const express = require('express');
const cors = require('cors');

const restricted = require('../auth/auth-middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const plantsRouter = require('../plants/plants-router');

const server = express();

server.use(cors());
server.use(cors({ origin: '*' }));
server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
server.options('*', cors());
server.use(express.json());

server.use('/auth', authRouter);
server.use('/users', usersRouter);
server.use('/plants', plantsRouter);

// once user is authenticated, can check that the api is up at localhost:5001/
server.get('/', (req, res) => {
    res.json({
        api: 'up',
    });
});

module.exports = server;
