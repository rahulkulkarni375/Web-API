const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Product',
        required: [true, 'Please provide enter the product']
    },
    quantity : {
        type : Number,
        default : 1  //"require" is not required because by default we set it to 1;
    }
}); 

module.exports = mongoose.model('Order',orderSchema);