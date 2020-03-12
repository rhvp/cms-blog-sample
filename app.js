const express = require('express');
const app = express();
const AppError = require('./config/appError');
app.use(express.json());

const post_Routes = require('./routes/postRoutes');
const category_Routes = require('./routes/categoryRoutes');
const tag_Routes = require('./routes/tagRoutes');
const recent_posts_routes = require('./routes/recentPostsRoutes');
const email_routes = require('./routes/emailRoute');

app.use('/api/posts', post_Routes);
app.use('/api/recentPosts', recent_posts_routes)
app.use('/api/category', category_Routes);
app.use('/api/tags', tag_Routes);
app.use('/api/sendMail', email_routes);

app.use((req, res, next)=>{
    let err = new AppError(`${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`, 404);
    next(err);
});

app.use((err, req, res, next)=>{
    console.error(err.message, err.stack);
    if(process.env.NODE_ENV === 'development') {
        res.status(err.statusCode || 500).json({
            error: {
                message: err.message
            }
        });
    } else if (process.env.NODE_ENV === 'production') {
        if(err.isOperational) {
            res.status(err.statusCode).json({
                error: {
                    message: err.message
                }
            })
        }
        res.status(err.statusCode || 500).json({
            error: {
                message: "Something went wrong in the server"
            }
        });
    }
});

module.exports = app;