const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        reuqired : true
    },
    parent : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Product'
    }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category