//chứa tất cả logic xử lý yêu cầu liên quan đến xác thực như đăng kí, đăng nhập
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

router.post('/signup', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')
        res.send({ token });
    } catch (err) {
        return res.status(442).send(err.message);
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(422).send({ error: 'Invalid password or email 1' });
    }

    try {
        await user.comparePassword(password);
        //nếu có thì trả về 1 token
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')
        res.send({ token });
    } catch (err) {
        return res.status(422).send({ error: 'Invalid password or email 2' });
    }
});
module.exports = router;