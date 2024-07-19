const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type : String, 
        required: [true, 'Please provide the name']
    },
    price : {
        type : Number,
        required : [true, 'Please enter the price']
    }
});

module.exports = mongoose.model('Product',productSchema);