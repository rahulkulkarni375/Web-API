const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
        name : {
            type: String,
            required: [true, 'Please provide the name for the contact']
        },
        email : {
            type: String,
            required: [true, 'Please provide the email address for the contact']
        },
        phone : {
            type: String,
            required: [true, 'Please provide the phone number for the contact']
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Contacts', contactSchema);
