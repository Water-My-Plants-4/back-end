const express = require('express');

const Users = require('./users-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Users.find()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Cannot view users list',
            });
        });
});

module.exports = router;
