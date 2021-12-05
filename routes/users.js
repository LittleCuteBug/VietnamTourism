const express = require('express');
const router = express.Router();
const {verifyRegister, authJwt} = require('../middlewares');
const controller = require('../controllers');

router.get(
    '/',
    authJwt.verifyToken,
    authJwt.isAdmin,
    (req, res) => {
        res.send("Hello");
    }
)

router.post(
    '/login',
    controller.user.login
);
router.post(
    '/register', 
    verifyRegister.checkDuplicateUsername,
    controller.user.register
);

module.exports = router;