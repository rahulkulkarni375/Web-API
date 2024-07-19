const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel');
//@desc Get all contacts
//@route GET  /api/contacts
//@access public 
const getContacts =  asyncHandler(async(req,res) => {
    const contacts = await Contact.find();
    res.status(200).json({contacts});

    // await Contact.find().then((val) => {
    // val.forEach(element => {    
    //         if(element.name === val)
    //             console.log(element.name);
    // });
    // })
});

//@desc create new contact
//@route POST  /api/contacts
//@access public
const createContact = asyncHandler(async(req,res) => {
    // console.log(req.body);
    const {name, email, phone}= req.body;
    if(!name || !phone || !email){
        res.status(400);
        throw new Error("All fields are mandantory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    });
    res.status(201).json(contact);
    console.log("The req",contact);
});

//@desc Get contact
//@route GET  /api/contacts/:id
//@access public
const getContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    console.log(contact);
    console.log(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found !!!!!");
    }
    res.status(200).json(contact);
});

//@desc update contact
//@route PUT  /api/contacts/:id
//@access public
const updateContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    console.log(contact);
    console.log(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found !!!!!");
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    console.log(updatedContact);
    res.status(200).json(updatedContact);
    
});

//@desc Get contact
//@route DELETE  /api/contacts/:id
//@access public
const deleteContact =asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    console.log(contact);
    console.log(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found !!!!!");
    }

    const deletedContact = await Contact.findByIdAndDelete(
        req.params.id
    );
    res.status(200).json(deletedContact);
}) ;

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}



