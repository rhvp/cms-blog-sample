const User = require('../models/user');
const _ = require('underscore');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AppError = require('../config/appError');
const Token = require('../models/token');

module.exports = {
    signup: async(req, res, next)=>{
        try {
            let newUser = _.pick(req.body, ['firstname', 'lastname', 'email', 'password']);
            const userExists = await User.findOne({email: newUser.email});
            if(userExists) return next(new AppError('Email already signed up', 403));
            const hashed_password = bcrypt.hashSync(newUser.password, 12);
            newUser.password = hashed_password;
            const user = await User.create(newUser);
            user.password = undefined;
            res.status(201).json({
                status: 'success',
                message: 'User signed up.',
                data: user
            })
        } catch (error) {
            next(error)
        }
    },

    login: async(req, res, next)=>{
        try {
            let body = _.pick(req.body, ['email', 'password']);
            const user = await User.findOne({email: body.email}).select('+password');
            if(!user) return next(new AppError('Email not signed up.', 404));
            const correctPassword = bcrypt.compareSync(body.password, user.password);
            if(correctPassword){
                let id = user._id;
                const token = jwt.sign({user}, process.env.JWT_SECRET);
                await Token.create({user_ID: id, token: token});
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + 60 * 60 * 5
                    ),
                    httpOnly: true
                }
                if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;

                res.cookie('jwt', token, cookieOptions);
                user.password = undefined;

                res.status(200).json({
                    status: 'success',
                    message: 'User logged in.',
                    data: {user}
                })
            } else {
                return next(new AppError('Password Incorrect', 401));
            }
        } catch (error) {
            next(error)
        }
    }
}