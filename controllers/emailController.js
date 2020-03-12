const sendEmail = require('../config/email');
const AppError = require('../config/appError');


exports.sendMail = async (req, res, next) => {
    try {
        await sendEmail({
            from: 'rhapabdul@gmail.com',
            email: 'abdulwahid@intellchub.com',
            subject: req.body.name,
            replyTo: req.body.email,
            message: req.body.message
        });
        res.status(200).json({
            status: 'success',
            message: 'Email Sent!!'
        })
    } catch(err){
        console.error(err);

        return next(new AppError('There was an error sending the mail', 500))
    }
}