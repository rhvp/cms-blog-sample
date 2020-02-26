require('dotenv').config();
const express = require('express');
const app = express();
const AppError = require('./config/appError');

const mongoose_connection = require('./config/mongoose');

app.use(express.json());

process.on('uncaughtException', err => {
    console.log('Uncaught Exception!! Shutting down process..', err.name, err.message, err.stack);
    process.exit(1);
})

const post_Routes = require('./routes/postRoutes');
const category_Routes = require('./routes/categoryRoutes');
const tag_Routes = require('./routes/tagRoutes');

app.use('/api/posts', post_Routes);
app.use('/api/category', category_Routes);
app.use('/api/tags', tag_Routes);


const port = process.env.PORT || 3300;

app.use((req, res, next)=>{
    let err = new AppError(`${req.ip} tried to reach ${req.originalUrl}. The resource is unavailable or does not exist.`, 404);
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
        res.status(err.statusCode || 500).json({
            error: {
                
                message: "Something went wrong in the server"
            }
        });
    }
});

app.listen(port, ()=>{
    console.log(`App listening on Port: ${port}`);
});

