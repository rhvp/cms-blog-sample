require('dotenv').config();
const mongoose_connection = require('./config/mongoose');
const app = require('./app')

process.on('uncaughtException', err => {
    console.log('Uncaught Exception!! Shutting down process..', err.name, err.message, err.stack);
    process.exit(1);
})

const port = process.env.PORT || 3300;

app.listen(port, ()=>{
    console.log(`App listening on Port: ${port}`);
});

process.on('unhandledRejection', err=>{
    console.log('Unhandled Rejection!! Process shutting down...', err.name, err.message, err.stack);
})