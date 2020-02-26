const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://sody-boy:${process.env.DB_PASSWORD}@my-cluster-01-a0hk3.mongodb.net/cms-blog-test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(()=>{
    console.log('mongoatlas connected');
}).catch(err=>{
    console.log('mongoatlas connection failed', err.name, err.message)
})

module.exports = mongoose.connection