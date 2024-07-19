const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : {
        type : String, 
        required: [true, 'Please provide the Email']
    },
    password: {
        type : String,
        required : [true, 'Please enter the password']
    }
});

module.exports = mongoose.model('User',userSchema);