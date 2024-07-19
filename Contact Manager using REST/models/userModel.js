const mongoose = require('mongoose');
const { userCurrent } = require('../controllers/userController');

const userSchema = mongoose.Schema({
        username : {
                type : String,
                required : [true, 'Please add user name']
        }, 

        email : {
            type : String,
            required : [true, 'Please add email address'],
            unique : [true, 'Email is already in use']
        },
        password : {
            type : String,
            required : [true, "Please add the user password"]
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);