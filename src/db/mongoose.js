const mongoose = require('mongoose')

// to create and connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/task-database-api', {
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify : false
}).then(() => console.log('MongoDB connected...') )
.catch( err => {throw new Error(err)} )