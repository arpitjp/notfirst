const express = require('express');
const router = express.Router();
const users = require('../models/users.models');

router.get('/', (req, res) => {
    users.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('CUSTOM MESSAGE: following error occured ' + err));
});

router.post('/add', (req, res) => {
    const username = req.body.username;
    const newUser = new users({username});
    newUser.save()
        .then(() => res.json('CUSTOM MESSAGE: new user added'))
        .catch(err => res.status(400).json('CUSTOM MESSAGE: following error occured ' + err));
});

module.exports = router;