const express = require('express');
const cors = require('cors');
const AppError = require('./config/appError');
const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());

const post_Routes = require('./routes/postRoutes');
const category_Routes = require('./routes/categoryRoutes');
const tag_Routes = require('./routes/tagRoutes');
const user_Routes = require('./routes/userRoutes');


app.use('/api/posts', post_Routes);
app.use('/api/categories', category_Routes);
app.use('/api/tags', tag_Routes);
app.use('/api/user', user_Routes);


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