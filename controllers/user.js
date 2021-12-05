const db = require('../db/models');
const User = db.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const register = async (req, res) => {
    const newUser = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        role: req.body.role
    }
    try {
        await User.create(newUser);
        res.status(200).send({
            code: 0,
            message: "Register success!"
        });
    } catch (error) {
        res.status(500).send({
            code: 1,
            message: error.message
        });
    }
    
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!user)  {
            res.status(404).send({
                code: 1,
                message: "User not found!"
            });
            return;
        }
        
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            res.status(401).send({
                code: 1,
                accessToken: null,
                message: "Invalid Password!"
            })
            return;
        }
        let token = jwt.sign({id: user.id, role: user.role}, process.env.SECRET_KEY);
        res.status(200).send({
            code: 0,
            accessToken: token,
            message: "Login success!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            code: 1,
            message: error.message
        });
    }
}

const user = {
    login: login,
    register: register
}
module.exports = user;