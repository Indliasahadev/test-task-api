const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id : {
        type : Number,
        unique : true,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    qtyPerUnit : {
        type : Number,
        required : true
    },
    unitPrice: {
        type : Number,
        required : true
    },
    unitInStock: {
        type : Number,
        required : true
    },
    discontinued: {
        type : Boolean,
        required : true
    }
})

// category id (virtual)
productSchema.virtual('category', {
    ref : 'Product',
    localField : '_id',
    foreignField : 'parent'
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product