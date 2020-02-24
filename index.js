const express = require('express');
const app = express();
const post_Routes = require('./routes/postRoutes');
const comment_Routes = require('./routes/commentRoutes');

app.use(express.json());

app.use('/', (req,res,next)=>{
    res.json({message: 'Welcome to the blog'});
});

app.use('/api/posts', post_Routes);
app.use('/api/comment', comment_Routes);

const port = process.env.PORT || 3300;

app.use((req, res, next)=>{
    let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`);
    err.statusCode = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    console.error(err.message);
    res.status(err.status || 500).json({
        error: {
            message: err.message
        }
    });

});

app.listen(port, ()=>{
    console.log(`App listening on Port: ${port}`);
});