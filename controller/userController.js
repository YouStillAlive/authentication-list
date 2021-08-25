const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt');
const { User } = require('../models/User.js');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

class UserController {
    async registration(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const candidate = await User.findOne({ where: { email } });
            if (candidate && !candidate.isNewRecord) {
                return next(new ApiError(404, "Use another email!"));
            }
            const hashPassword = await bcrypt.hash(password, 5);
            await User.create({ email, name, password: hashPassword });
            return res.status(200).json({ "message": "Ok!" });
        }
        catch (e) {
            console.log(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return next(new ApiError(404, "Uncorrent data!"));
            }
            const comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return next(new ApiError(404, "Uncorrent data!!"));
            }
            if (user.isBlocked) {
                return next(new ApiError(404, "You got banned!"));
            }
            const token = generateJwt(user.id, user.email);
            return res.json({ token });
        } catch (e) {
            console.log(e);
        }
    }

    async check(req, res, next) {
        try {
            const user = await User.findOne({ where: { id: req.user.id } });
            if (user.isBlocked) {
                return next(new ApiError(404, "You got banned!"));
            }
            const token = generateJwt(req.user.id, req.user.email);
            return res.json({ token });
        } catch (e) {
            console.log(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await User.findAll({ attributes: ['id', 'email', 'name', 'isBlocked', 'createdAt', 'updatedAt'] });
            return res.json(users);
        } catch (e) {
            console.log(e);
        }
    }

    async deleteUsers(req, res, next) {
        try {
            const { id } = req.body;
            await User.destroy({ where: { id: { [Op.in]: [...id] } } });
            return res.status(200).json({ "message": "Ok!" });
        } catch (e) {
            console.log(e);
            return next(new ApiError(500, "Failed"));
        }
    }

    async block(req, res, next) {
        try {
            const { id, block } = req.body;
            await User.update({ isBlocked: block }, {
                where: { id: { [Op.in]: [...id] } }
            });
            return res.status(200).json({ "message": "Ok!" });
        } catch (e) {
            console.log(e);
            return next(new ApiError(500, "Failed"));
        }
    }

    // async unblock(req, res, next) {
    //     try {
    //         const { id } = req.body;
    //         await User.update({ isBlocked: false }, {
    //             where: { id: { [Op.in]: [...id] } }
    //         });
    //         return res.status(200).json({ "message": "Ok!" });
    //     } catch (e) {
    //         console.log(e);
    //         return next(new ApiError(500, "Failed"));
    //     }
    // }
}

const generateJwt = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' });
}

module.exports = new UserController();