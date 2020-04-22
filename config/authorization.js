const AppError = require('./appError');
const jwt = require('jsonwebtoken');

module.exports = {
    loggedin: (req, res, next)=>{
        const auth = req.headers['authorization'];
        try {
            if(!auth) return next(new AppError('User is unauthorized. Please Login to continue', 401));
            const authorized = jwt.verify(auth, process.env.JWT_SECRET);
            if(authorized.user) next();
            else return next(new AppError('User is unauthorized. Invalid or expired token', 401))
        } catch (error) {
            next(error)
        }
    }
}